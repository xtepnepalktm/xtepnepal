// "use client";

// import { useState, useEffect } from "react";

// import { Alert, Button, Box, IconButton } from "@mui/material";

// import { useAppSelector } from "@/redux/hooks";

// import { Iconify } from "@/components/iconify";
// import { toast } from "@/components/snackbar";

// import { resendVerification } from "@/api";

// // ----------------------------------------------------------------------

// export function EmailVerificationBanner() {
//     const user = useAppSelector((state) => state.user);

//     const [isVisible, setIsVisible] = useState(true);
//     const [canResend, setCanResend] = useState(true);
//     const [resendCooldown, setResendCooldown] = useState(0);

//     // Check if user is logged in and email is not verified
//     const shouldShow =
//         isVisible &&
//         user?.customer &&
//         user.customer.email_verified === false;

//     // Cooldown timer for resend button
//     useEffect(() => {
//         if (resendCooldown > 0) {
//             const timer = setTimeout(() => {
//                 setResendCooldown(resendCooldown - 1);
//             }, 1000);
//             return () => clearTimeout(timer);
//         } else {
//             setCanResend(true);
//         }
//     }, [resendCooldown]);

//     const handleResendVerification = async () => {
//         try {
//             const email = user?.customer?.email;
//             if (!email) {
//                 toast.error("Email address not found");
//                 return;
//             }

//             await resendVerification(email);
//             toast.success(
//                 "Verification email has been resent. Please check your email."
//             );

//             // Start cooldown
//             setCanResend(false);
//             setResendCooldown(60);
//         } catch (error) {
//             toast.error(error?.message || "Failed to resend verification email");
//         }
//     };

//     const handleDismiss = () => {
//         setIsVisible(false);
//     };

//     if (!shouldShow) {
//         return null;
//     }

//     return (
//         <Alert
//             severity="warning"
//             sx={{
//                 mb: 3,
//                 alignItems: "center",
//             }}
//             action={
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Button
//                         color="inherit"
//                         size="small"
//                         variant="outlined"
//                         onClick={handleResendVerification}
//                         disabled={!canResend}
//                         sx={{
//                             whiteSpace: "nowrap",
//                             minWidth: "fit-content",
//                         }}
//                     >
//                         {canResend
//                             ? "Resend Verification"
//                             : `Resend in ${resendCooldown}s`}
//                     </Button>
//                     <IconButton
//                         size="small"
//                         color="inherit"
//                         onClick={handleDismiss}
//                         sx={{ ml: 1 }}
//                     >
//                         <Iconify icon="eva:close-fill" />
//                     </IconButton>
//                 </Box>
//             }
//         >
//             Please verify your email to access your complete order history and all
//             features.
//         </Alert>
//     );
// }
"use client";

import { useState, useEffect } from "react";

import { useAppSelector } from "@/redux/hooks";
import { toast } from "@/components/snackbar";

import { resendVerification } from "@/api";

export function EmailVerificationBanner() {
    const user = useAppSelector((state) => state.user);

    const [isVisible, setIsVisible] = useState(true);
    const [canResend, setCanResend] = useState(true);
    const [resendCooldown, setResendCooldown] = useState(0);

    const shouldShow =
        isVisible &&
        user?.customer &&
        user.customer.email_verified === false;

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                setResendCooldown((s) => s - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendCooldown]);

    const handleResendVerification = async () => {
        try {
            const email = user?.customer?.email;

            if (!email) {
                toast.error("Email address not found");
                return;
            }

            await resendVerification(email);

            toast.success(
                "Verification email has been resent. Please check your email."
            );

            setCanResend(false);
            setResendCooldown(60);
        } catch (error) {
            toast.error(
                (error && error.message) || "Failed to resend verification email"
            );
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!shouldShow) return null;

    return (
        <div className="mb-4 flex items-start justify-between gap-4 rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-800">
            <div className="text-sm leading-relaxed">
                Please verify your email to access your complete order history and all
                features.
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap">
                <button
                    onClick={handleResendVerification}
                    disabled={!canResend}
                    className={`rounded border px-3 py-1 text-sm transition ${canResend
                        ? "border-yellow-400 hover:bg-yellow-100"
                        : "cursor-not-allowed border-yellow-300 opacity-60"
                        }`}
                >
                    {canResend
                        ? "Resend Verification"
                        : `Resend in ${resendCooldown}s`}
                </button>

                <button
                    onClick={handleDismiss}
                    className="rounded p-1 text-yellow-700 hover:bg-yellow-100"
                    aria-label="close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
    );
}