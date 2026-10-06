"use client";

import { z as zod } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CONFIG } from "@/global-config";
import { useRouter } from "@/routes/hooks";
import { fCurrency } from "@/utils/format-number";
import { Form, Field, schemaHelper } from "@/components/hook-form";
import { toast } from "@/components/snackbar";

import {
    useGetStates,
    submitQuickOrder,
    verifyOtpAndCreateOrder,
    getLogisticCharge,
    initiateFonepay,
} from "@/api";

import { OtpVerificationDialog } from "./otp-verification-dialog";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, resetCart } from "@/redux/actions";
import { Iconify } from "@/components/iconify";
import { rememberFonepayAttempt } from "@/utils/fonepay";
import {
    PAYMENT_METHODS,
    FonepayQrDialog,
    PaymentMethodSelector,
    toFonepayDialogData,
    useFonepayEnabled,
} from "../payment";

// ── Design tokens — mirrors CheckoutView ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const RED_DIM = "rgba(230,25,17,0.07)";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ── Shared label style ──
const labelStyle = {
    fontFamily: "Helvetica",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: TEXT_MUTED,
    display: "block",
    marginBottom: "0.6rem",
};

// ── Section heading (left-border pattern) ──
function SectionLabel({ children }) {
    return (
        <p style={{
            fontFamily: "Helvetica",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: RED,
            borderLeft: `3px solid ${RED}`,
            paddingLeft: "0.75rem",
            margin: "0 0 1rem",
        }}>
            {children}
        </p>
    );
}

// Resolves once redux-persist has written the new token (writes are async)
async function waitForPersistedToken(token, timeoutMs = 3000) {
    if (!token) return;

    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
        try {
            const persisted = JSON.parse(localStorage.getItem(`persist:${CONFIG.persistKey}`) || "{}");
            if (JSON.parse(persisted.auth || "{}").userToken === token) return;
        } catch {
            // keep waiting
        }
        await new Promise((resolve) => setTimeout(resolve, 50));
    }
}

// ── Thin divider ──
function Divider({ style }) {
    return <div style={{ height: 1, backgroundColor: BORDER, ...style }} />;
}

// ----------------------------------------------------------------------

export function QuickOrderForm({ mode, buyNowProduct, buyNowVariant, buyNowQuantity, cartItems }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { states } = useGetStates();

    const [districts, setDistricts] = useState([]);
    const [logisticCharge, setLogisticCharge] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [orderPreview, setOrderPreview] = useState(null);
    const [otpExpiryMinutes, setOtpExpiryMinutes] = useState(5);

    const fonepayEnabled = useFonepayEnabled();
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.cod);
    const [fonepayCheckout, setFonepayCheckout] = useState(null); // { orderId, prn, amount, qr_message, ... }
    const payWithFonepay = fonepayEnabled && paymentMethod === PAYMENT_METHODS.fonepay;

    const defaultValues = {
        customer_name: "",
        customer_contact_info: "",
        customer_email: "",
        password: "",
        state_id: "",
        district_id: "",
        address: "",
        discount_code: "",
        remarks: "",
    };

    const methods = useForm({
        resolver: zodResolver(
            zod.object({
                customer_name: zod.string().min(1),
                customer_email: zod.string().email(),
                customer_contact_info: zod.string().min(10),
                state_id: schemaHelper.nullableInput(zod.string().min(1)),
                district_id: schemaHelper.nullableInput(zod.string().min(1)),
                address: zod.string().min(1),
                password: zod.string().optional(),
                discount_code: zod.string().optional(),
                remarks: zod.string().optional(),
            })
        ),
        defaultValues,
    });

    const { handleSubmit, formState, watch, setValue, setError } = methods;

    const selectedStateId = watch("state_id");
    const selectedDistrictId = watch("district_id");

    useEffect(() => {
        if (selectedStateId && states) {
            const selectedState = states.find((s) => String(s.state_id) === String(selectedStateId));
            setDistricts(selectedState?.districts || []);
        } else {
            setDistricts([]);
        }
        setValue("district_id", "");
    }, [selectedStateId, states, setValue]);

    useEffect(() => {
        const fetchLogisticCharge = async () => {
            if (selectedDistrictId) {
                try {
                    const charge = await getLogisticCharge(selectedDistrictId);
                    if (charge && typeof charge.charge_amount !== "undefined") {
                        setLogisticCharge(charge.charge_amount);
                    }
                } catch {
                    toast.error("Couldn't fetch shipping charge! Try again.");
                }
            } else {
                setLogisticCharge(0);
            }
        };
        fetchLogisticCharge();
    }, [selectedDistrictId]);

    const calculateSubtotal = () => {
        if (mode === "buyNow" && buyNowProduct) {
            const regularPrice = buyNowVariant?.price || buyNowProduct.selling_price?.regularPrice || buyNowProduct.price;
            const flashSalePrice = buyNowProduct.selling_price?.flashSalePrice || buyNowProduct.price;
            const hasFlashSale = buyNowProduct.flash_sale_products?.length > 0;
            const finalPrice = hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice)
                ? flashSalePrice : regularPrice;
            return buyNowQuantity * parseFloat(finalPrice);
        }
        if (mode === "cart" && cartItems) {
            return cartItems.reduce((t, item) => t + parseFloat(item.price || 0) * parseInt(item.quantity || 0), 0);
        }
        return 0;
    };

    const subtotal = calculateSubtotal();
    const totalAmount = logisticCharge + subtotal;

    const buildOrderItems = () => {
        if (mode === "buyNow" && buyNowProduct) {
            const regularPrice = buyNowVariant?.price || buyNowProduct.selling_price?.regularPrice || buyNowProduct.price;
            const flashSalePrice = buyNowProduct.selling_price?.flashSalePrice || buyNowProduct.price;
            const hasFlashSale = buyNowProduct.flash_sale_products?.length > 0;
            const finalPrice = hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice)
                ? flashSalePrice : regularPrice;
            return [{
                item_type: buyNowVariant ? "ProductVariant" : "Product",
                item_id: buyNowVariant?.variant_id || buyNowProduct.product_id,
                quantity: buyNowQuantity,
                price: parseFloat(finalPrice),
            }];
        }
        if (mode === "cart" && cartItems) {
            return cartItems.map((item) => ({
                item_type: item.variant_id ? "ProductVariant" : "Product",
                item_id: item.variant_id || item.product_id,
                quantity: parseInt(item.quantity),
                price: parseFloat(item.price),
            }));
        }
        return [];
    };

    const handleOrderSuccess = async (orderData) => {
        dispatch(setUser(orderData));

        const orderId = orderData.order?.order_id || orderData.order_id;

        if (payWithFonepay && orderId) {
            // Don't resetCart() yet: an empty cart makes CheckoutView redirect
            // away, unmounting this form (and the QR dialog with it).
            toast.success("Order placed! Generating your Fonepay QR…");

            try {
                // The axios client reads the token from persisted redux state
                await waitForPersistedToken(orderData.token);

                const data = await initiateFonepay(orderId);

                if (!data?.qr_message || !data?.prn) {
                    throw new Error("Couldn't get a Fonepay QR code.");
                }

                rememberFonepayAttempt({ orderId, prn: data.prn });

                // Stay on this page — the QR dialog tracks the payment
                setFonepayCheckout({ orderId, ...toFonepayDialogData(data) });
            } catch (fonepayError) {
                if (mode === "cart") dispatch(resetCart());
                toast.error(
                    fonepayError?.message ||
                    "Order saved, but the Fonepay QR couldn't be generated. You can retry payment from your order page."
                );
                router.push(`/order/${orderId}`);
            }

            return;
        }

        if (mode === "cart") dispatch(resetCart());
        toast.success("Order placed successfully! You are now logged in.");
        setTimeout(() => {
            router.push(orderId ? `/order/${orderId}` : "/order");
        }, 1500);
    };

    // Closing the dialog doesn't cancel the attempt — the order is already
    // saved and payment can be retried from the order details page.
    const finishFonepayCheckout = () => {
        const orderId = fonepayCheckout?.orderId;
        setFonepayCheckout(null);
        if (mode === "cart") dispatch(resetCart());
        router.push(orderId ? `/order/${orderId}` : "/order");
    };

    const handleFonepaySuccess = () => {
        toast.success("Payment successful!");
        finishFonepayCheckout();
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            setErrorMessage("");
            const orderItems = buildOrderItems();
            if (!orderItems.length) { setErrorMessage("No items to checkout"); return; }

            const orderData = {
                customer_name: data.customer_name,
                customer_email: data.customer_email,
                customer_contact_info: data.customer_contact_info,
                password: data.password || undefined,
                state_id: parseInt(data.state_id),
                district_id: parseInt(data.district_id),
                address: data.address,
                order_items: orderItems,
                logistic_charge: logisticCharge,
                discount_code: data.discount_code?.trim()?.toUpperCase() || undefined,
                remarks: data.remarks || undefined,
            };

            const res = await submitQuickOrder(orderData);

            if (res.success) {
                if (res.data.requires_otp) {
                    setUserEmail(res.data.email);
                    setOrderPreview(res.data.order_preview);
                    setOtpExpiryMinutes(res.data.expires_in_minutes || 5);
                    setOtpDialogOpen(true);
                    toast.success("OTP sent to your email!");
                } else {
                    await handleOrderSuccess(res.data);
                }
            }
        } catch (err) {
            if (err?.status === 422 && err?.data && typeof err.data === "object") {
                Object.keys(err.data).forEach((field) => {
                    const messages = err.data[field];
                    if (Array.isArray(messages) && messages.length > 0) {
                        setError(field, { type: "server", message: messages[0] });
                    }
                });
                setErrorMessage("Validation failed. Please check the errors below.");
            } else {
                setErrorMessage(err?.message || "Something went wrong");
            }
        }
    });

    const handleVerifyOtp = async (otp) => {
        try {
            setIsVerifying(true);
            setOtpError("");
            if (!orderPreview) { setOtpError("Order data not found. Please try again."); return; }
            const response = await verifyOtpAndCreateOrder({ email: userEmail, otp_code: otp, ...orderPreview });
            if (response.success) { setOtpDialogOpen(false); await handleOrderSuccess(response.data); }
        } catch (error) {
            setOtpError(error?.message || "Invalid OTP. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };

    // ── shared two-column grid ──
    const twoCol = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
    };

    return (
        <>
            <Form methods={methods} onSubmit={onSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

                    {/* Error banner */}
                    {errorMessage && (
                        <div style={{
                            backgroundColor: "rgba(230,25,17,0.07)",
                            borderLeft: `4px solid ${RED}`,
                            padding: "0.875rem 1rem",
                            display: "flex", alignItems: "center", gap: "0.625rem",
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                                <circle cx="12" cy="12" r="10" stroke={RED} strokeWidth="2" />
                                <path d="M12 8v4M12 16h.01" stroke={RED} strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <p style={{ fontFamily: "Helvetica", fontSize: 12, fontWeight: 600, color: RED, margin: 0 }}>
                                {errorMessage}
                            </p>
                        </div>
                    )}

                    {/* ── Customer Info ── */}
                    <section>
                        <SectionLabel>Customer Info</SectionLabel>
                        <div style={twoCol}>
                            <Field.Text name="customer_name" label="Full Name"
                                sx={{
                                    border: `1px solid ${BORDER}`,
                                }} />
                            <Field.Text name="customer_contact_info" label="Phone"
                                sx={{
                                    border: `1px solid ${BORDER}`,
                                }} />

                        </div>
                        <div style={twoCol}>
                            <Field.Text

                                sx={{
                                    border: `1px solid ${BORDER}`,
                                }}
                                name="customer_email" label="Email" />

                            {/* Password with show/hide */}
                            <div style={{ position: "relative" }}>
                                <Field.Text
                                    sx={{
                                        border: `1px solid ${BORDER}`,
                                    }}
                                    name="password"
                                    label="Password (required for new customers)"
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute", right: 12, top: 36,
                                        background: "none", border: "none", cursor: "pointer",
                                        fontFamily: "Helvetica",
                                        fontSize: 10, fontWeight: 700,
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase",
                                        color: TEXT_MUTED,
                                        padding: 0,
                                    }}
                                >
                                    {showPassword ? <Iconify icon="solar:eye-linear" /> : <Iconify icon="solar:eye-closed-bold" />}
                                </button>
                            </div>
                        </div>
                    </section>

                    <Divider />

                    {/* ── Delivery Address ── */}
                    <section>
                        <SectionLabel>Delivery Address</SectionLabel>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={twoCol}>
                                <Field.Select name="state_id" label="State">
                                    <option value="">Select State</option>
                                    {states?.map((s) => (
                                        <option key={s.state_id} value={s.state_id}>{s.state_name}</option>
                                    ))}
                                </Field.Select>

                                <Field.Select name="district_id" label="District">
                                    <option value="">Select District</option>
                                    {districts?.map((d) => (
                                        <option key={d.district_id} value={d.district_id}>{d.district_name}</option>
                                    ))}
                                </Field.Select>
                            </div>

                            <Field.Text name="address" label="Full Address" multiline rows={3} />
                        </div>
                    </section>

                    <Divider />

                    {/* ── Discount & Instructions ── */}
                    <section>
                        <SectionLabel>Discount &amp; Instructions</SectionLabel>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={twoCol}>
                                <Field.Text
                                    name="discount_code"
                                    label="Discount Code (Optional)"
                                    placeholder="e.g. SAVE10"
                                    onChange={(e) => {
                                        setValue("discount_code", e.target.value.toUpperCase(), {
                                            shouldValidate: true,
                                        });
                                    }}
                                    sx={{
                                        border: `1px solid ${BORDER}`,
                                    }}
                                />
                            </div>
                            <Field.Text
                                name="remarks"
                                label="Special Instructions (Optional)"
                                placeholder="e.g. Please deliver in the morning"
                                multiline
                                rows={2}
                                sx={{
                                    border: `1px solid ${BORDER}`,
                                }}
                            />
                        </div>
                    </section>

                    <Divider />

                    {/* ── Payment ── */}
                    <section>
                        <SectionLabel>Payment Method</SectionLabel>
                        <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
                    </section>

                    <Divider />

                    {/* ── Order Summary ── */}
                    <section>
                        <SectionLabel>Order Summary</SectionLabel>

                        <div style={{ backgroundColor: BG, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>

                            {/* Subtotal row */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontFamily: "Helvetica", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: TEXT_MUTED }}>
                                    Subtotal
                                </span>
                                <span style={{ fontFamily: "Helvetica", fontSize: 14, fontWeight: 700, color: TEXT }}>
                                    {fCurrency(subtotal)}
                                </span>
                            </div>

                            {/* Shipping row */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontFamily: "Helvetica", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: TEXT_MUTED }}>
                                    Shipping
                                </span>
                                <span style={{ fontFamily: "Helvetica", fontSize: 14, fontWeight: 700, color: logisticCharge ? TEXT : TEXT_MUTED }}>
                                    {logisticCharge ? fCurrency(logisticCharge) : "Free"}
                                </span>
                            </div>

                            {/* Divider */}
                            <div style={{ height: 1, backgroundColor: BORDER }} />

                            {/* Total row */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ fontFamily: "Helvetica", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: TEXT }}>
                                    Total
                                </span>
                                <span style={{ fontFamily: "Helvetica", fontSize: 24, fontWeight: 800, color: RED, letterSpacing: "-0.01em" }}>
                                    {fCurrency(totalAmount)}
                                </span>
                            </div>

                            {/* Red accent bar */}
                            <div style={{ height: 2, backgroundColor: RED, width: 32, marginTop: "0.25rem" }} />
                        </div>
                    </section>

                    {/* ── Actions ── */}
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.25rem" }}>

                        {/* Cancel */}
                        <button
                            type="button"
                            onClick={() => router.back()}
                            style={{
                                fontFamily: "Helvetica",
                                fontSize: 11, fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: TEXT_MUTED,
                                backgroundColor: "transparent",
                                border: `1px solid ${BORDER}`,
                                padding: "0.625rem 1.25rem",
                                cursor: "pointer",
                                transition: "border-color 0.15s",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = TEXT_MUTED}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = BORDER}
                        >
                            Cancel
                        </button>

                        {/* Place Order */}
                        <button
                            type="submit"
                            disabled={formState.isSubmitting || Boolean(fonepayCheckout)}
                            style={{
                                fontFamily: "Helvetica",
                                fontSize: 11, fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: WHITE,
                                backgroundColor: formState.isSubmitting ? TEXT_MUTED : RED,
                                border: "none",
                                padding: "0.625rem 1.75rem",
                                cursor: formState.isSubmitting ? "not-allowed" : "pointer",
                                transition: "background-color 0.15s",
                                opacity: formState.isSubmitting ? 0.7 : 1,
                            }}
                            onMouseEnter={(e) => { if (!formState.isSubmitting) e.currentTarget.style.backgroundColor = "#c41510"; }}
                            onMouseLeave={(e) => { if (!formState.isSubmitting) e.currentTarget.style.backgroundColor = RED; }}
                        >
                            {formState.isSubmitting
                                ? "Placing Order…"
                                : payWithFonepay ? "Pay with Fonepay" : "Place Order"}
                        </button>
                    </div>

                </div>
            </Form>

            <FonepayQrDialog
                open={Boolean(fonepayCheckout)}
                orderId={fonepayCheckout?.orderId}
                initialData={fonepayCheckout}
                onClose={finishFonepayCheckout}
                onSuccess={handleFonepaySuccess}
            />

            <OtpVerificationDialog
                open={otpDialogOpen}
                onClose={() => setOtpDialogOpen(false)}
                email={userEmail}
                onVerify={handleVerifyOtp}
                isVerifying={isVerifying}
                error={otpError}
            />
        </>
    );
}