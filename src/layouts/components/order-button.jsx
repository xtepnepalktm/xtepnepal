// import { IconButton } from "@mui/material";

// import { useAppSelector } from "@/redux/hooks";

// import { RouterLink } from "@/routes/components";
// import { paths } from "@/routes/paths";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// export function OrderButton({ sx, ...other }) {
//   const { isLogin } = useAppSelector((state) => state.auth);

//   if (!isLogin) {
//     return null;
//   }

//   return (
//     <IconButton
//       component={RouterLink}
//       href={paths.order.root}
//       aria-label="Order button"
//       sx={[{ p: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
//       {...other}
//     >
//       <Iconify icon="solar:bill-list-bold" width={24} />
//     </IconButton>
//   );
// }
"use client";

import { useAppSelector } from "@/redux/hooks";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { Iconify } from "@/components/iconify";

export function OrderButton({ className = "", ...other }) {
  const { isLogin } = useAppSelector((state) => state.auth);

  if (!isLogin) return null;

  return (
    <RouterLink
      href={paths.order.root}
      aria-label="Order button"
      className={`
        inline-flex items-center justify-center
        w-10 h-10
        rounded-md
        text-gray-700
        hover:bg-gray-100
        active:bg-gray-200
        transition-colors
        ${className}
      `}
      {...other}
    >
      <Iconify icon="solar:bill-list-bold" width={24} />
    </RouterLink>
  );
}