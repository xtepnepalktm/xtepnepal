// "use client";

// import { useEffect, useState } from "react";

// import { Box, CircularProgress, Typography, Button } from "@mui/material";

// import { paths } from "@/routes/paths";
// import { useRouter, useSearchParams } from "@/routes/hooks";
// import { RouterLink } from "@/routes/components";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setUser } from "@/redux/actions";

// import { Iconify } from "@/components/iconify";
// import { toast } from "@/components/snackbar";

// import { resendVerification } from "@/api";

// export function EmailVerificationView() {
//     const dispatch = useAppDispatch();
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const user = useAppSelector((state) => state.user);

//     const [isProcessing, setIsProcessing] = useState(true);
//     const [canResend, setCanResend] = useState(true);
//     const [resendCooldown, setResendCooldown] = useState(0);

//     const status = searchParams.get("status");
//     const message = searchParams.get("message");

//     useEffect(() => {
//         // Handle redirect from backend
//         if (status === "success") {
//             // Update user's email_verified status
//             if (user?.customer) {
//                 dispatch(
//                     setUser({
//                         ...user,
//                         customer: {
//                             ...user.customer,
//                             email_verified: true,
//                         },
//                     })
//                 );
//             }

//             toast.success(decodeURIComponent(message || "Email verified successfully!"));

//             setIsProcessing(false);

//             // Auto-redirect after 3 seconds
//             setTimeout(() => {
//                 router.push(paths.home);
//             }, 3000);
//         } else if (status === "error") {
//             toast.error(decodeURIComponent(message || "Verification link has expired"));
//             setIsProcessing(false);
//         } else {
//             // No status params - show verification pending message
//             setIsProcessing(false);
//         }
//     }, [status, message, router, dispatch, user]);

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
//                 toast.error("Email address not found. Please sign in again.");
//                 router.push(paths.auth.signIn);
//                 return;
//             }

//             await resendVerification(email);
//             toast.success("Verification email has been resent. Please check your email.");

//             // Start cooldown
//             setCanResend(false);
//             setResendCooldown(60);
//         } catch (error) {
//             toast.error(error?.message || "Failed to resend verification email");
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 minHeight: "60vh",
//                 gap: 3,
//                 px: 2,
//                 textAlign: "center",
//             }}
//         >
//             {isProcessing && (
//                 <>
//                     <CircularProgress size={48} />
//                     <Typography variant="h6" color="text.secondary">
//                         Verifying your email...
//                     </Typography>
//                 </>
//             )}

//             {!isProcessing && status === "success" && (
//                 <>
//                     <Iconify
//                         icon="eva:checkmark-circle-2-fill"
//                         width={80}
//                         sx={{ color: "success.main" }}
//                     />
//                     <Typography variant="h4">Email Verified!</Typography>
//                     <Typography variant="body1" color="text.secondary">
//                         {decodeURIComponent(message || "Your email has been successfully verified.")}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         Redirecting to homepage...
//                     </Typography>
//                 </>
//             )}

//             {!isProcessing && status === "error" && (
//                 <>
//                     <Iconify
//                         icon="eva:alert-circle-fill"
//                         width={80}
//                         sx={{ color: "error.main" }}
//                     />
//                     <Typography variant="h4">Verification Failed</Typography>
//                     <Typography variant="body1" color="text.secondary">
//                         {decodeURIComponent(message || "Verification link has expired")}
//                     </Typography>
//                     <Box
//                         sx={{
//                             display: "flex",
//                             gap: 2,
//                             mt: 2,
//                         }}
//                     >
//                         <Button
//                             onClick={handleResendVerification}
//                             variant="contained"
//                             disabled={!canResend}
//                         >
//                             {canResend
//                                 ? "Resend Verification"
//                                 : `Resend in ${resendCooldown}s`}
//                         </Button>
//                         <Button
//                             component={RouterLink}
//                             href={paths.auth.signIn}
//                             variant="outlined"
//                         >
//                             Back to Sign In
//                         </Button>
//                     </Box>
//                 </>
//             )}

//             {!isProcessing && !status && (
//                 <>
//                     <Iconify
//                         icon="eva:email-outline"
//                         width={80}
//                         sx={{ color: "primary.main" }}
//                     />
//                     <Typography variant="h4">Verify Your Email</Typography>
//                     <Typography variant="body1" color="text.secondary">
//                         Please check your email inbox for a verification link.
//                     </Typography>
//                     <Box
//                         sx={{
//                             display: "flex",
//                             gap: 2,
//                             mt: 2,
//                         }}
//                     >
//                         <Button
//                             onClick={handleResendVerification}
//                             variant="contained"
//                             disabled={!canResend}
//                         >
//                             {canResend
//                                 ? "Resend Verification Email"
//                                 : `Resend in ${resendCooldown}s`}
//                         </Button>
//                         <Button
//                             component={RouterLink}
//                             href={paths.home}
//                             variant="outlined"
//                         >
//                             Back to Home
//                         </Button>
//                     </Box>
//                 </>
//             )}
//         </Box>
//     );
// }

"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "@/routes/hooks";
import { paths } from "@/routes/paths";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/actions";

import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";

import { resendVerification } from "@/api";

export function EmailVerificationView() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const user = useAppSelector((state) => state.user);

    const [isProcessing, setIsProcessing] = useState(true);
    const [canResend, setCanResend] = useState(true);
    const [resendCooldown, setResendCooldown] = useState(0);

    const status = searchParams.get("status");
    const message = searchParams.get("message");

    /* ---------------- Verify flow ---------------- */

    useEffect(() => {
        if (status === "success") {
            if (user?.customer) {
                dispatch(
                    setUser({
                        ...user,
                        customer: {
                            ...user.customer,
                            email_verified: true,
                        },
                    })
                );
            }

            toast.success(
                decodeURIComponent(message || "Email verified successfully!")
            );

            setIsProcessing(false);

            setTimeout(() => {
                router.push(paths.home);
            }, 3000);
        } else if (status === "error") {
            toast.error(
                decodeURIComponent(message || "Verification link expired")
            );
            setIsProcessing(false);
        } else {
            setIsProcessing(false);
        }
    }, [status, message, router, dispatch, user]);

    /* ---------------- Resend cooldown ---------------- */

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendCooldown]);

    /* ---------------- Resend handler ---------------- */

    const handleResendVerification = async () => {
        try {
            const email = user?.customer?.email;

            if (!email) {
                toast.error("Email not found. Please sign in again.");
                router.push(paths.auth.signIn);
                return;
            }

            await resendVerification(email);

            toast.success("Verification email sent!");

            setCanResend(false);
            setResendCooldown(60);
        } catch (err) {
            toast.error(err?.message || "Failed to resend email");
        }
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center gap-6">

            {/* LOADING */}
            {isProcessing && (
                <>
                    <div className="h-12 w-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
                    <p className="text-gray-600 font-medium">
                        Verifying your email...
                    </p>
                </>
            )}

            {/* SUCCESS */}
            {!isProcessing && status === "success" && (
                <>
                    <Iconify
                        icon="eva:checkmark-circle-2-fill"
                        className="text-green-600 text-[80px]"
                    />

                    <h1 className="text-2xl font-bold">Email Verified!</h1>

                    <p className="text-gray-600">
                        {decodeURIComponent(
                            message || "Your email has been successfully verified."
                        )}
                    </p>

                    <p className="text-gray-500">
                        Redirecting to homepage...
                    </p>
                </>
            )}

            {/* ERROR */}
            {!isProcessing && status === "error" && (
                <>
                    <Iconify
                        icon="eva:alert-circle-fill"
                        className="text-red-600 text-[80px]"
                    />

                    <h1 className="text-2xl font-bold">
                        Verification Failed
                    </h1>

                    <p className="text-gray-600">
                        {decodeURIComponent(
                            message || "Verification link has expired"
                        )}
                    </p>

                    <div className="flex gap-3 mt-4 flex-wrap justify-center">
                        <button
                            onClick={handleResendVerification}
                            disabled={!canResend}
                            className="
                px-4 py-2 bg-black text-white rounded-md text-sm
                disabled:opacity-50 disabled:cursor-not-allowed
              "
                        >
                            {canResend
                                ? "Resend Verification"
                                : `Resend in ${resendCooldown}s`}
                        </button>

                        <a
                            href={paths.auth.signIn}
                            className="px-4 py-2 border rounded-md text-sm"
                        >
                            Back to Sign In
                        </a>
                    </div>
                </>
            )}

            {/* PENDING */}
            {!isProcessing && !status && (
                <>
                    <Iconify
                        icon="eva:email-outline"
                        className="text-blue-600 text-[80px]"
                    />

                    <h1 className="text-2xl font-bold">
                        Verify Your Email
                    </h1>

                    <p className="text-gray-600">
                        Please check your email inbox for verification link.
                    </p>

                    <div className="flex gap-3 mt-4 flex-wrap justify-center">
                        <button
                            onClick={handleResendVerification}
                            disabled={!canResend}
                            className="
                px-4 py-2 bg-black text-white rounded-md text-sm
                disabled:opacity-50 disabled:cursor-not-allowed
              "
                        >
                            {canResend
                                ? "Resend Email"
                                : `Resend in ${resendCooldown}s`}
                        </button>

                        <a
                            href={paths.home}
                            className="px-4 py-2 border rounded-md text-sm"
                        >
                            Back to Home
                        </a>
                    </div>
                </>
            )}
        </div>
    );
}