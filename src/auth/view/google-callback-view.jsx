// "use client";

// import { useEffect, useState, useRef } from "react";

// import { Box, CircularProgress, Typography, Button } from "@mui/material";

// import { paths } from "@/routes/paths";
// import { useRouter, useSearchParams } from "@/routes/hooks";
// import { RouterLink } from "@/routes/components";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setUser } from "@/redux/actions";

// import { Iconify } from "@/components/iconify";
// import { toast } from "@/components/snackbar";

// import { addProductToCart, googleExchange } from "@/api";

// export function GoogleCallbackView() {
//     const dispatch = useAppDispatch();
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const { items } = useAppSelector((state) => state.cart);

//     const [isProcessing, setIsProcessing] = useState(true);
//     const [error, setError] = useState(null);
//     const hasProcessedRef = useRef(false);

//     useEffect(() => {
//         const handleGoogleCallback = async () => {
//             // Get the code/token from URL to create unique session key
//             const code = searchParams.get("code");
//             const token = searchParams.get("token");
//             const sessionKey = `google_oauth_processed_${code || token}`;

//             // Check if this exact code/token was already processed
//             if (typeof window !== 'undefined' && window.sessionStorage.getItem(sessionKey)) {
//                 console.log('[Google OAuth] Already processed this code/token in this session, skipping...');
//                 setIsProcessing(false);
//                 return;
//             }

//             // Prevent duplicate execution using ref (more reliable than state)
//             if (hasProcessedRef.current) {
//                 console.log('[Google OAuth] Already processed, skipping...');
//                 return;
//             }
//             hasProcessedRef.current = true;
//             console.log('[Google OAuth] Processing callback...');

//             // Mark this code/token as processed in session storage
//             if (typeof window !== 'undefined' && (code || token)) {
//                 window.sessionStorage.setItem(sessionKey, 'true');
//             }

//             try {
//                 // Check for error from Google OAuth
//                 const errorParam = searchParams.get("error");
//                 if (errorParam) {
//                     setError(decodeURIComponent(errorParam));
//                     toast.error(
//                         decodeURIComponent(errorParam) ||
//                         "Google authentication failed. Please try again."
//                     );
//                     setIsProcessing(false);
//                     setTimeout(() => {
//                         router.push(paths.auth.signIn);
//                     }, 3000);
//                     return;
//                 }

//                 // Check if backend already provided a token (direct flow)
//                 const tokenParam = searchParams.get("token");
//                 const customerIdParam = searchParams.get("customer_id");
//                 const messageParam = searchParams.get("message");

//                 if (tokenParam) {
//                     // Backend already handled OAuth and provided token directly
//                     dispatch(
//                         setUser({
//                             customer: { id: customerIdParam },
//                             token: tokenParam,
//                             token_type: "Bearer",
//                         })
//                     );

//                     // Sync cart items if any
//                     if (items?.length > 0) {
//                         try {
//                             await addProductToCart(items, tokenParam);
//                         } catch (cartError) {
//                             console.error("Failed to sync cart:", cartError);
//                         }
//                     }

//                     toast.success(
//                         messageParam || "Successfully signed in with Google!"
//                     );

//                     setTimeout(() => {
//                         router.push(paths.home);
//                     }, 1500);
//                     return;
//                 }

//                 // Get exchange code (if using code exchange flow)
//                 const code = searchParams.get("code");
//                 if (!code) {
//                     setError("No authorization code or token received");
//                     toast.error("No authorization code or token received");
//                     setIsProcessing(false);
//                     setTimeout(() => {
//                         router.push(paths.auth.signIn);
//                     }, 3000);
//                     return;
//                 }

//                 console.log('[Google OAuth] Attempting to exchange code...');

//                 // Exchange code for token (fallback flow - should not normally be used)
//                 const response = await googleExchange(code);
//                 console.log('[Google OAuth] Code exchange successful');

//                 if (response.success && response.customer && response.token) {
//                     // Store user data and token
//                     dispatch(
//                         setUser({
//                             customer: response.customer,
//                             token: response.token,
//                             token_type: response.token_type,
//                         })
//                     );

//                     // Sync cart items if any
//                     if (items?.length > 0) {
//                         try {
//                             await addProductToCart(items, response.token);
//                         } catch (cartError) {
//                             console.error("Failed to sync cart:", cartError);
//                         }
//                     }

//                     toast.success(
//                         response.message || "Successfully signed in with Google!"
//                     );

//                     // Check if phone number is missing
//                     if (!response.customer.phone_number) {
//                         // Redirect to complete profile page
//                         setTimeout(() => {
//                             router.push(paths.profile.root);
//                         }, 1500);
//                     } else {
//                         // Redirect to home
//                         setTimeout(() => {
//                             router.push(paths.home);
//                         }, 1500);
//                     }
//                 } else {
//                     throw new Error("Invalid response from server");
//                 }
//             } catch (err) {
//                 console.error("[Google OAuth] Error:", err);

//                 // Handle specific error for "code already used"
//                 const errorMessage = err?.message || "Failed to complete Google sign-in";

//                 if (errorMessage.includes("already been used")) {
//                     setError("OAuth error: Please contact support or try signing in again.");
//                     toast.error("Authentication session expired. Please try signing in again.");
//                 } else {
//                     setError(errorMessage);
//                     toast.error(errorMessage);
//                 }

//                 setIsProcessing(false);
//                 setTimeout(() => {
//                     router.push(paths.auth.signIn);
//                 }, 3000);
//             }
//         };

//         handleGoogleCallback();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

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
//             {isProcessing && !error && (
//                 <>
//                     <CircularProgress size={48} />
//                     <Typography variant="h6" color="text.secondary">
//                         Completing Google sign-in...
//                     </Typography>
//                 </>
//             )}

//             {error && (
//                 <>
//                     <Iconify
//                         icon="eva:alert-circle-fill"
//                         width={80}
//                         sx={{ color: "error.main" }}
//                     />
//                     <Typography variant="h4">Authentication Failed</Typography>
//                     <Typography variant="body1" color="text.secondary">
//                         {error}
//                     </Typography>
//                     <Box
//                         sx={{
//                             display: "flex",
//                             gap: 2,
//                             mt: 2,
//                         }}
//                     >
//                         <Button
//                             component={RouterLink}
//                             href={paths.auth.signIn}
//                             variant="contained"
//                         >
//                             Back to Sign In
//                         </Button>
//                     </Box>
//                 </>
//             )}
//         </Box>
//     );
// }
"use client";

import { useEffect, useState, useRef } from "react";

import { paths } from "@/routes/paths";
import { useRouter, useSearchParams } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/actions";

import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";

import { addProductToCart, googleExchange } from "@/api";

export function GoogleCallbackView() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { items } = useAppSelector((state) => state.cart);

    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const hasProcessedRef = useRef(false);

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const code = searchParams.get("code");
            const token = searchParams.get("token");
            const sessionKey = `google_oauth_processed_${code || token}`;

            if (
                typeof window !== "undefined" &&
                window.sessionStorage.getItem(sessionKey)
            ) {
                setIsProcessing(false);
                return;
            }

            if (hasProcessedRef.current) return;
            hasProcessedRef.current = true;

            if (typeof window !== "undefined" && (code || token)) {
                window.sessionStorage.setItem(sessionKey, "true");
            }

            try {
                const errorParam = searchParams.get("error");

                if (errorParam) {
                    const msg = decodeURIComponent(errorParam);
                    setError(msg);
                    toast.error(msg || "Google authentication failed.");
                    setIsProcessing(false);

                    setTimeout(() => router.push(paths.auth.signIn), 3000);
                    return;
                }

                const tokenParam = searchParams.get("token");
                const customerIdParam = searchParams.get("customer_id");
                const messageParam = searchParams.get("message");

                if (tokenParam) {
                    dispatch(
                        setUser({
                            customer: { id: customerIdParam },
                            token: tokenParam,
                            token_type: "Bearer",
                        })
                    );

                    if (items?.length > 0) {
                        try {
                            await addProductToCart(items, tokenParam);
                        } catch (e) {
                            console.error(e);
                        }
                    }

                    toast.success(messageParam || "Successfully signed in with Google!");

                    setTimeout(() => router.push(paths.home), 1500);
                    return;
                }

                if (!code) {
                    const msg = "No authorization code or token received";
                    setError(msg);
                    toast.error(msg);
                    setIsProcessing(false);

                    setTimeout(() => router.push(paths.auth.signIn), 3000);
                    return;
                }

                const response = await googleExchange(code);

                if (response.success && response.customer && response.token) {
                    dispatch(
                        setUser({
                            customer: response.customer,
                            token: response.token,
                            token_type: response.token_type,
                        })
                    );

                    if (items?.length > 0) {
                        try {
                            await addProductToCart(items, response.token);
                        } catch (e) {
                            console.error(e);
                        }
                    }

                    toast.success(
                        response.message || "Successfully signed in with Google!"
                    );

                    setTimeout(() => {
                        router.push(
                            response.customer.phone_number
                                ? paths.home
                                : paths.profile.root
                        );
                    }, 1500);
                } else {
                    throw new Error("Invalid response from server");
                }
            } catch (err) {
                const msg =
                    err?.message || "Failed to complete Google sign-in";

                setError(msg);
                toast.error(msg);

                setIsProcessing(false);

                setTimeout(() => router.push(paths.auth.signIn), 3000);
            }
        };

        handleGoogleCallback();
    }, []);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
            {isProcessing && !error && (
                <>
                    {/* Spinner */}
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

                    <p className="text-lg text-gray-600">
                        Completing Google sign-in...
                    </p>
                </>
            )}

            {error && (
                <>
                    <Iconify
                        icon="eva:alert-circle-fill"
                        width={80}
                        className="text-red-500"
                    />

                    <h2 className="text-2xl font-semibold">
                        Authentication Failed
                    </h2>

                    <p className="text-gray-600">{error}</p>

                    <div className="mt-4 flex gap-3">
                        <RouterLink
                            href={paths.auth.signIn}
                            className=" bg-black px-4 py-2 text-white"
                        >
                            Back to Sign In
                        </RouterLink>
                    </div>
                </>
            )}
        </div>
    );
}