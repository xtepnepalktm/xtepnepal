// "use client";

// import { useEffect, useState } from "react";

// import { Box, CircularProgress, Typography, Button } from "@mui/material";

// import { paths } from "@/routes/paths";
// import { useRouter, useSearchParams } from "@/routes/hooks";
// import { RouterLink } from "@/routes/components";

// import { useAppDispatch } from "@/redux/hooks";
// import { setUser } from "@/redux/actions";

// import { Iconify } from "@/components/iconify";
// import { toast } from "@/components/snackbar";

// export function EmailChangeVerificationView() {
//     const dispatch = useAppDispatch();
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const [isProcessing, setIsProcessing] = useState(true);

//     const status = searchParams.get("status");
//     const message = searchParams.get("message");

//     useEffect(() => {
//         if (status === "success") {
//             // Email changed successfully - clear user data and force re-login
//             dispatch(setUser(null));

//             toast.success(
//                 decodeURIComponent(message || "Email changed successfully! Please sign in with your new email.")
//             );

//             setIsProcessing(false);

//             // Auto-redirect to login after 3 seconds
//             setTimeout(() => {
//                 router.push(paths.auth.signIn);
//             }, 3000);
//         } else if (status === "error") {
//             toast.error(
//                 decodeURIComponent(message || "Verification link has expired")
//             );
//             setIsProcessing(false);
//         } else {
//             // No status params
//             setIsProcessing(false);
//         }
//     }, [status, message, router, dispatch]);

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
//                         Verifying your new email...
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
//                     <Typography variant="h4">Email Changed Successfully!</Typography>
//                     <Typography variant="body1" color="text.secondary">
//                         {decodeURIComponent(
//                             message || "Your email has been updated successfully."
//                         )}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         Please sign in with your new email address.
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                         Redirecting to sign in page...
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
//                         {decodeURIComponent(
//                             message || "Verification link has expired or is invalid"
//                         )}
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
//                             href={paths.profile.root}
//                             variant="contained"
//                         >
//                             Go to Profile Settings
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

//             {!isProcessing && !status && (
//                 <>
//                     <Iconify
//                         icon="eva:email-outline"
//                         width={80}
//                         sx={{ color: "primary.main" }}
//                     />
//                     <Typography variant="h4">Invalid Link</Typography>
//                     <Typography variant="body1" color="text.secondary">
//                         This email verification link is invalid or has expired.
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
//                             href={paths.profile.root}
//                             variant="contained"
//                         >
//                             Go to Profile Settings
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

import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/actions";

import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";

export function EmailChangeVerificationView() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isProcessing, setIsProcessing] = useState(true);

    const status = searchParams.get("status");
    const message = searchParams.get("message");

    useEffect(() => {
        if (status === "success") {
            dispatch(setUser(null));

            toast.success(
                decodeURIComponent(
                    message || "Email changed successfully! Please sign in again."
                )
            );

            setIsProcessing(false);

            setTimeout(() => {
                router.push(paths.auth.signIn);
            }, 3000);
        } else if (status === "error") {
            toast.error(
                decodeURIComponent(message || "Verification link expired")
            );
            setIsProcessing(false);
        } else {
            setIsProcessing(false);
        }
    }, [status, message, router, dispatch]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center gap-6">

            {/* LOADING */}
            {isProcessing && (
                <>
                    <div className="h-12 w-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
                    <p className="text-gray-600 font-medium">
                        Verifying your new email...
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

                    <h1 className="text-2xl font-bold">
                        Email Changed Successfully!
                    </h1>

                    <p className="text-gray-600">
                        {decodeURIComponent(
                            message || "Your email has been updated successfully."
                        )}
                    </p>

                    <p className="text-gray-500">
                        Please sign in with your new email address.
                    </p>

                    <p className="text-gray-400 text-sm">
                        Redirecting to sign in page...
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
                            message || "Verification link is invalid or expired"
                        )}
                    </p>

                    <div className="flex gap-3 mt-4 flex-wrap justify-center">
                        <a
                            href={paths.profile.root}
                            className="px-4 py-2 bg-black text-white rounded-md text-sm"
                        >
                            Go to Profile Settings
                        </a>

                        <a
                            href={paths.home}
                            className="px-4 py-2 border rounded-md text-sm"
                        >
                            Back to Home
                        </a>
                    </div>
                </>
            )}

            {/* INVALID */}
            {!isProcessing && !status && (
                <>
                    <Iconify
                        icon="eva:email-outline"
                        className="text-blue-600 text-[80px]"
                    />

                    <h1 className="text-2xl font-bold">
                        Invalid Link
                    </h1>

                    <p className="text-gray-600">
                        This verification link is invalid or expired.
                    </p>

                    <div className="flex gap-3 mt-4 flex-wrap justify-center">
                        <a
                            href={paths.profile.root}
                            className="px-4 py-2 bg-black text-white rounded-md text-sm"
                        >
                            Go to Profile Settings
                        </a>

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