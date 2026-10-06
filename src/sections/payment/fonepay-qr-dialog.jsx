"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";

import { fCurrency } from "@/utils/format-number";
import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";

import { checkFonepayStatusByPrn, initiateFonepay } from "@/api";
import {
    bankPaymentUrl,
    rememberFonepayAttempt,
    forgetFonepayAttempt,
    resolveFonepayUiState,
} from "@/utils/fonepay";

// ----------------------------------------------------------------------
// "Checkout by Fonepay" brand guideline: logo center-aligned above the QR,
// "Check Status" button in Fonepay Red (#ce2027), and the fixed
// "How to pay using this QR code" step list.
// ----------------------------------------------------------------------

export const FONEPAY_RED = "#ce2027";
export const FONEPAY_LOGO = "/assets/images/payment-vendors/CheckoutByFonepay.webp";
export const FONEPAY_LOGO1 = "/assets/images/payment-vendors/fconnect.png";

const HOW_TO_STEPS = [
    "Open your mobile banking app or digital wallet.",
    "Log in, or simply tap the scan button (login not always required).",
    "Scan the QR code.",
    "Verify the payment details.",
    "Tap Confirm to complete your payment.",
];

const POLL_INTERVAL_MS = 4000;

/**
 * @param initialData { prn, amount, qr_message, thirdparty_qr_websocket_url, banks }
 */
export function FonepayQrDialog({ open, orderId, initialData, onClose, onSuccess }) {
    const [prn, setPrn] = useState(initialData?.prn || "");
    const [amount, setAmount] = useState(initialData?.amount || 0);
    const [qrMessage, setQrMessage] = useState(initialData?.qr_message || "");
    const [banks, setBanks] = useState(initialData?.banks || []);
    const [status, setStatus] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [isRestarting, setIsRestarting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [wsUrl, setWsUrl] = useState(initialData?.thirdparty_qr_websocket_url || "");
    const [isScanned, setIsScanned] = useState(false);

    const pollTimeoutRef = useRef(null);
    const resolvedRef = useRef(false);

    // Reset local state whenever a fresh attempt is opened
    const initialDataRef = useRef(initialData);
    initialDataRef.current = initialData;

    useEffect(() => {
        if (!open) return;

        const data = initialDataRef.current;
        setPrn(data?.prn || "");
        setAmount(data?.amount || 0);
        setQrMessage(data?.qr_message || "");
        setBanks(Array.isArray(data?.banks) ? data.banks : []);
        setWsUrl(data?.thirdparty_qr_websocket_url || "");
        setIsScanned(false);
        setStatus(null);
        setErrorMessage("");
        resolvedRef.current = false;
    }, [open]);

    // Fonepay reports an unscanned/unpaid QR as "failed", and a later status
    // check still re-queries the gateway — so while the QR is open, "failed"
    // just means "not paid yet": keep showing the QR.
    const resolvedUiState = resolveFonepayUiState(status);
    const uiState = resolvedUiState.key === "failed" ? { key: "pending" } : resolvedUiState;

    const checkStatus = useCallback(
        async ({ silent } = {}) => {
            if (!prn) return null;

            if (!silent) setIsChecking(true);
            setErrorMessage("");

            try {
                const data = await checkFonepayStatusByPrn(prn);

                setStatus(data);

                return data;
            } catch (err) {
                setErrorMessage(
                    typeof err?.message === "string"
                        ? err.message
                        : "Verification unavailable. Please try again."
                );

                return null;
            } finally {
                setIsChecking(false);
            }
        },
        [prn]
    );

    // Latest callbacks in refs so the websocket isn't reconnected on every
    // parent render (onSuccess is an inline handler there).
    const checkStatusRef = useRef(checkStatus);
    const onSuccessRef = useRef(onSuccess);
    useEffect(() => {
        checkStatusRef.current = checkStatus;
        onSuccessRef.current = onSuccess;
    }, [checkStatus, onSuccess]);

    const verifyAndFinish = useCallback(async ({ silent } = {}) => {
        const data = await checkStatusRef.current({ silent });

        if (data?.payment_status === "paid" && data?.accounting_finalized && !resolvedRef.current) {
            resolvedRef.current = true;
            onSuccessRef.current?.(data);
        }
    }, []);

    // Only ask the backend for status once Fonepay's websocket reports the
    // payment succeeded. Checking an unscanned QR makes the backend record
    // Fonepay's "failed" as the final result. The websocket event is only a
    // trigger; the backend status response is the proof of payment.
    useEffect(() => {
        if (!open || !wsUrl) return undefined;

        let ws;
        try {
            ws = new WebSocket(wsUrl);
        } catch {
            return undefined;
        }

        ws.onmessage = (event) => {
            let tx;
            try {
                const message = JSON.parse(event.data);
                tx =
                    typeof message?.transactionStatus === "string"
                        ? JSON.parse(message.transactionStatus)
                        : message?.transactionStatus;
            } catch {
                return;
            }

            if (!tx) return;

            if (tx.qrVerified) setIsScanned(true);

            const paid =
                tx.paymentSuccess === true ||
                (tx.success === true && tx.message === "Request Complete");

            if (paid && !resolvedRef.current) verifyAndFinish();
        };

        return () => ws.close();
    }, [open, wsUrl, verifyAndFinish]);

    // Once the backend says "paid" but accounting isn't finalized yet, keep
    // checking until it is — a paid attempt can't be wrongly marked failed.
    useEffect(() => {
        if (!open || uiState.key !== "paid_pending_finalize" || resolvedRef.current) {
            return undefined;
        }

        pollTimeoutRef.current = setTimeout(() => verifyAndFinish({ silent: true }), POLL_INTERVAL_MS);

        return () => clearTimeout(pollTimeoutRef.current);
    }, [open, uiState.key, status, verifyAndFinish]);

    // A resolved attempt no longer needs to be recoverable from storage
    useEffect(() => {
        if (uiState.key === "success") {
            forgetFonepayAttempt();
        }
    }, [uiState.key]);

    // Escape closes
    useEffect(() => {
        if (!open) return undefined;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    const handleManualCheck = () => verifyAndFinish();

    const handleRestart = async () => {
        if (!orderId || isRestarting) return;

        setIsRestarting(true);

        try {
            const data = await initiateFonepay(orderId);

            if (!data?.qr_message || !data?.prn) {
                throw new Error("Couldn't get a new QR code.");
            }

            rememberFonepayAttempt({ orderId, prn: data.prn });

            setPrn(data.prn);
            setAmount(data.amount);
            setQrMessage(data.qr_message);
            setBanks(Array.isArray(data.banks) ? data.banks : []);
            setWsUrl(data.thirdparty_qr_websocket_url || "");
            setIsScanned(false);
            setStatus(null);
            resolvedRef.current = false;
        } catch (err) {
            toast.error(
                typeof err?.message === "string"
                    ? err.message
                    : "Couldn't start a new payment attempt."
            );
        } finally {
            setIsRestarting(false);
        }
    };

    // Portal: the dialog is also opened from inside order table rows
    if (!open || typeof document === "undefined") return null;

    const renderHeader = () => (
        <>
            <div className="mb-1 flex justify-center">
                <img src={FONEPAY_LOGO1} alt="Checkout by Fonepay" className="h-7 w-auto" />
                <img src={FONEPAY_LOGO} alt="Checkout by Fonepay" className="h-7 w-auto" />
            </div>
            <p className="mb-4 text-center text-sm text-gray-500">
                Use your <span className="font-semibold text-gray-700">Mobile Banking or Wallets App</span> to
                scan
            </p>
        </>
    );

    const renderBody = () => {
        if (uiState.key === "success") {
            return (
                <div className="flex flex-col items-center py-4 text-center">
                    <div
                        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                        style={{ backgroundColor: "#e9f9ef" }}
                    >
                        <Iconify icon="solar:check-circle-bold" className="h-9 w-9 text-emerald-600" />
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">Payment successful</h3>
                    <p className="text-sm text-gray-500">Your Fonepay payment has been verified.</p>
                </div>
            );
        }

        if (!qrMessage) {
            return (
                <div className="flex flex-col items-center py-4 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <Iconify icon="solar:qr-code-bold" className="h-9 w-9 text-gray-400" />
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">QR unavailable</h3>
                    <p className="mb-5 text-sm text-gray-500">
                        We couldn&apos;t get a QR code for this payment. Your order is saved — you can try again.
                    </p>
                    <button
                        type="button"
                        onClick={handleRestart}
                        disabled={isRestarting}
                        className="w-full px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-90 disabled:opacity-60"
                        style={{ backgroundColor: FONEPAY_RED }}
                    >
                        {isRestarting ? "Starting..." : "Get QR code"}
                    </button>
                </div>
            );
        }

        const bankLinks = banks
            .map((bank) => ({ bank, url: bankPaymentUrl(bank, qrMessage) }))
            .filter(({ url }) => url);

        return (
            <>
                <div className="mb-4 flex justify-center">
                    <div className="border border-gray-100 p-2">
                        <QRCodeSVG value={qrMessage} size={192} level="M" marginSize={1} />
                    </div>
                </div>

                <p className="mb-4 text-center text-lg font-semibold text-gray-900">
                    {fCurrency(amount)}
                </p>

                {isScanned && uiState.key === "pending" && (
                    <div className="mb-4 bg-blue-50 px-3 py-2 text-center text-xs text-blue-700">
                        QR scanned — confirm the payment in your app.
                    </div>
                )}

                {uiState.key === "paid_pending_finalize" && (
                    <div className="mb-4 bg-amber-50 px-3 py-2 text-center text-xs text-amber-700">
                        Payment received — finishing verification. No need to pay again.
                    </div>
                )}

                {uiState.key === "errors_pending" && (
                    <div className="mb-4 bg-red-50 px-3 py-2 text-center text-xs text-red-600">
                        Verification unavailable right now. Try checking again.
                    </div>
                )}

                {uiState.key === "abandoned" && (
                    <div className="mb-4 bg-gray-100 px-3 py-2 text-center text-xs text-gray-600">
                        Automatic checks stopped. This isn&apos;t proof of failure — you can still check manually.
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-4 bg-red-50 px-3 py-2 text-center text-xs text-red-600">
                        {errorMessage}
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleManualCheck}
                    disabled={isChecking}
                    className="w-full px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-90 disabled:opacity-60"
                    style={{ backgroundColor: FONEPAY_RED }}
                >
                    {isChecking ? "Checking..." : "Check Status"}
                </button>

                {/* v2 bank-app shortcuts — the QR above always works without them */}
                {bankLinks.length > 0 && (
                    <div className="mt-5">
                        <p className="mb-2 text-xs font-semibold text-gray-700">Or pay in your bank app:</p>
                        <div className="grid grid-cols-2 gap-2">
                            {bankLinks.map(({ bank, url }) => (
                                <a
                                    key={bank.bankCode || bank.bankName}
                                    href={url}
                                    className="flex items-center gap-2 border border-gray-200 px-2.5 py-2 text-xs text-gray-800 transition hover:border-gray-400"
                                >
                                    <BankIcon bank={bank} />
                                    <span className="truncate">{bank.bankName}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold text-gray-700">
                        How to pay using this QR code:
                    </p>
                    <ul className="list-disc space-y-1 pl-4 text-xs text-gray-500">
                        {HOW_TO_STEPS.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ul>
                </div>
            </>
        );
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/50 px-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose?.();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Checkout by Fonepay"
                className="max-h-[92vh] w-full max-w-sm overflow-y-auto bg-white p-6 shadow-xl"
            >
                <div className="mb-1 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="text-gray-400 transition hover:text-gray-600"
                    >
                        <Iconify icon="mdi:close" className="h-5 w-5" />
                    </button>
                </div>

                {renderHeader()}
                {renderBody()}
            </div>
        </div>,
        document.body
    );
}

// ----------------------------------------------------------------------

function BankIcon({ bank }) {
    const [failed, setFailed] = useState(false);

    if (!bank.bankIcon || failed) {
        return (
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center bg-gray-100 text-[12px] font-bold uppercase text-gray-500">
                {(bank.bankCode || bank.bankName || "").slice(0, 2)}
            </span>
        );
    }

    return (
        <img
            src={bank.bankIcon}
            alt=""
            onError={() => setFailed(true)}
            className="h-6 w-6 flex-shrink-0 object-contain"
        />
    );
}
