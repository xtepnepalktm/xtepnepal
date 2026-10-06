// import { Badge, IconButton, useTheme } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { RouterLink } from "@/routes/components";
// import { paths } from "@/routes/paths";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// export function WishlistButton({ sx, ...other }) {
//   const theme = useTheme();
//   const { totalItems } = useAppSelector((state) => state.wishlist);

//   return (
//     <IconButton
//       component={RouterLink}
//       href={paths.wishlist}
//       aria-label="Wishlist button"
//       sx={[
//         { 
//           p: 1,
//           borderRadius: 2,
//           transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//           "&:hover": {
//             bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
//             transform: "scale(1.05)",
//             "& svg": {
//               color: "error.main",
//             },
//           },
//           "&:active": {
//             transform: "scale(0.95)",
//           },
//         },
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Badge 
//         badgeContent={totalItems} 
//         color="error"
//         sx={{
//           "& .MuiBadge-badge": {
//             fontSize: "0.7rem",
//             fontWeight: 700,
//             minWidth: 18,
//             height: 18,
//             padding: "0 4px",
//           },
//         }}
//       >
//         <Iconify 
//           icon="solar:heart-bold" 
//           width={24}
//           sx={{
//             transition: "color 0.3s ease",
//           }}
//         />
//       </Badge>
//     </IconButton>
//   );
// }
"use client";

import { useAppSelector } from "@/redux/hooks";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { Iconify } from "@/components/iconify";

export function WishlistButton({ className = "", ...other }) {
  const { totalItems } = useAppSelector((state) => state.wishlist);

  return (
    <RouterLink
      href={paths.wishlist}
      aria-label="Wishlist button"
      className={`
        relative
        inline-flex items-center justify-center
        p-2
        
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:bg-red-50
        hover:scale-105
        active:scale-95
        group
        ${className}
      `}
      {...other}
    >
      {/* Badge */}
      {totalItems > 0 && (
        <span
          className="
            absolute -top-1 -right-1
            min-w-[18px] h-[18px]
            px-1
            flex items-center justify-center
            text-[11px] font-bold
            text-white
            bg-red-500
            rounded-full
            leading-none
          "
        >
          {totalItems}
        </span>
      )}

      {/* Icon */}
      <Iconify
        icon="eva:heart-outline"
        width={24}
        className="
          transition-colors duration-300
          group-hover:text-red-500
        "
      />
    </RouterLink>
  );
}