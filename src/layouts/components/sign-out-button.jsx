// import { useCallback } from "react";

// import Button from "@mui/material/Button";

// import { useRouter } from "@/routes/hooks";
// import { paths } from "@/routes/paths";

// import { clearUser, resetCart, resetProfile, clearWishlist } from "@/redux/actions";
// import { useAppDispatch } from "@/redux/hooks";

// import { toast } from "@/components/snackbar";

// import { signOut } from "@/api/auth";

// // ----------------------------------------------------------------------

// export function SignOutButton({ onClose, sx, ...other }) {
//   const router = useRouter();

//   const dispatch = useAppDispatch();

//   const handleLogout = useCallback(async () => {
//     try {
//       // Attempt to logout on server, but don't block client-side logout if it fails
//       await signOut();
//     } catch (error) {
//       console.error("Server logout failed (non-critical):", error);
//       // Continue with client-side logout even if server logout fails
//     }

//     // Always clear user state and logout on client side
//     dispatch(clearUser());

//     dispatch(resetCart());

//     dispatch(resetProfile());

//     dispatch(clearWishlist());

//     router.push(paths.home);

//     toast.success("You have been logged out!");

//     if (onClose) {
//       onClose();
//     }
//   }, [onClose, router, dispatch]);

//   return (
//     <Button
//       fullWidth
//       variant="soft"
//       size="large"
//       color="error"
//       onClick={handleLogout}
//       sx={sx}
//       {...other}
//     >
//       Logout
//     </Button>
//   );
// }
"use client";

import { useCallback } from "react";

import { useRouter } from "@/routes/hooks";
import { paths } from "@/routes/paths";

import {
  clearUser,
  resetCart,
  resetProfile,
  clearWishlist,
} from "@/redux/actions";
import { useAppDispatch } from "@/redux/hooks";

import { toast } from "@/components/snackbar";
import { signOut } from "@/api/auth";

export function SignOutButton({ onClose, className = "", ...other }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Server logout failed (non-critical):", error);
    }

    dispatch(clearUser());
    dispatch(resetCart());
    dispatch(resetProfile());
    dispatch(clearWishlist());

    router.push(paths.home);

    toast.success("You have been logged out!");

    onClose?.();
  }, [onClose, router, dispatch]);

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`
        w-full
        px-4 py-3
        rounded-md
        text-red-600
        bg-red-50
        hover:bg-red-100
        active:bg-red-200
        font-medium
        text-sm
        transition-colors
        focus:outline-none focus:ring-2 focus:ring-red-300
        ${className}
      `}
      {...other}
    >
      Logout
    </button>
  );
}