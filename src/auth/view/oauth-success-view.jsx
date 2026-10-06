// "use client";

// import { useEffect } from "react";

// import { Box, CircularProgress, Typography } from "@mui/material";

// import { paths } from "@/routes/paths";
// import { useRouter, useSearchParams } from "@/routes/hooks";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setUserToken } from "@/redux/actions";

// import { toast } from "@/components/snackbar";

// import { addProductToCart } from "@/api";

// export function OAuthSuccessView() {
//   const dispatch = useAppDispatch();

//   const router = useRouter();

//   const searchParams = useSearchParams();

//   const { items } = useAppSelector((state) => state.cart);

//   const token = searchParams.get("token");
//   const customerId = searchParams.get("customer_id");
//   const error = searchParams.get("error");
//   const message = searchParams.get("message");

//   useEffect(() => {
//     const handleOAuthCallback = async () => {
//       if (error) {
//         toast.error(
//           error || "Google authentication failed. Please try again."
//         );
//         setTimeout(() => {
//           router.push(paths.auth.signIn);
//         }, 2000);
//         return;
//       }

//       if (token) {
//         // Store token in Redux
//         dispatch(setUserToken(token));

//         // Sync cart if there are items
//         if (items?.length > 0) {
//           try {
//             await addProductToCart(items, token);
//           } catch (cartError) {
//             console.error("Failed to sync cart:", cartError);
//           }
//         }

//         // Show success message
//         if (message) {
//           toast.success(message);
//         } else {
//           toast.success("Successfully signed in with Google!");
//         }

//         // Redirect to home after a short delay
//         setTimeout(() => {
//           router.push(paths.home);
//         }, 1500);
//       } else {
//         toast.error("Authentication failed. No token received.");
//         setTimeout(() => {
//           router.push(paths.auth.signIn);
//         }, 2000);
//       }
//     };

//     handleOAuthCallback();
//   }, [token, customerId, error, message, router, dispatch, items]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "60vh",
//         gap: 3,
//       }}
//     >
//       <CircularProgress size={48} />
//       <Typography variant="h6" color="text.secondary">
//         {error ? "Redirecting..." : "Completing sign in..."}
//       </Typography>
//     </Box>
//   );
// }
"use client";

import { useEffect } from "react";

import { paths } from "@/routes/paths";
import { useRouter, useSearchParams } from "@/routes/hooks";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUserToken } from "@/redux/actions";

import { toast } from "@/components/snackbar";

import { addProductToCart } from "@/api";

export function OAuthSuccessView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { items } = useAppSelector((state) => state.cart);

  const token = searchParams.get("token");
  const customerId = searchParams.get("customer_id");
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (error) {
        toast.error(error || "Google authentication failed. Please try again.");

        setTimeout(() => {
          router.push(paths.auth.signIn);
        }, 2000);

        return;
      }

      if (token) {
        dispatch(setUserToken(token));

        if (items?.length > 0) {
          try {
            await addProductToCart(items, token);
          } catch (cartError) {
            console.error("Failed to sync cart:", cartError);
          }
        }

        toast.success(message || "Successfully signed in with Google!");

        setTimeout(() => {
          router.push(paths.home);
        }, 1500);

        return;
      }

      toast.error("Authentication failed. No token received.");

      setTimeout(() => {
        router.push(paths.auth.signIn);
      }, 2000);
    };

    handleOAuthCallback();
  }, [token, customerId, error, message, router, dispatch, items]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      {/* Spinner */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

      <p className="text-lg text-gray-600">
        {error ? "Redirecting..." : "Completing sign in..."}
      </p>
    </div>
  );
}