// import { Badge, IconButton, useTheme } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { RouterLink } from "@/routes/components";
// import { paths } from "@/routes/paths";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// export function CartButton({ sx, ...other }) {
//   const theme = useTheme();
//   const { totalItems } = useAppSelector((state) => state.cart);

//   return (
//     <IconButton
//       component={RouterLink}
//       href={paths.cart}
//       aria-label="Cart button"
//       sx={[
//         { 
//           p: 1,
//           borderRadius: 2,
//           position: "relative",
//           transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//           "&:hover": {
//             bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
//             transform: "scale(1.05)",
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
//             animation: totalItems > 0 ? "pulse 2s infinite" : "none",
//           },
//         }}
//       >
//         <Iconify icon="solar:cart-3-bold" width={24} />
//       </Badge>
//     </IconButton>
//   );
// }
import { useAppSelector } from "@/redux/hooks";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function CartButton({ className, ...other }) {
  const { totalItems } = useAppSelector((state) => state.cart);

  return (
    <>
      {/*
        Keyframe for badge pulse animation — injected once via a <style> tag.
        MUI's sx animation: totalItems > 0 ? "pulse 2s infinite" : "none"
      */}
      <style>{`
        @keyframes cart-badge-pulse {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%       { transform: scale(1.2); opacity: 0.8; }
        }
      `}</style>

      {/*
        IconButton component={RouterLink}
        p: 1 (8px)        → p-2
        borderRadius: 2 (16px) → rounded-2xl
        position: relative → relative
        transition: all 0.3s cubic-bezier(0.4,0,0.2,1) → transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        hover: bgcolor varAlpha(primary.mainChannel, 0.08) → hover:bg-primary/[0.08]
        hover: transform scale(1.05) → hover:scale-105
        active: transform scale(0.95) → active:scale-95
      */}
      <RouterLink
        href={paths.cart}
        aria-label="Cart button"
        className={[
          "relative inline-flex items-center justify-center",
          " p-2",
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "hover:bg-primary/[0.08] hover:scale-105",
          "active:scale-95",
          "outline-none",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...other}
      >
        {/*
          Badge wrapper — relative container so the badge dot can be
          positioned absolutely at the top-right of the icon.
        */}
        <span className="relative inline-flex">
          <Iconify icon="eva:shopping-bag-outline" width={24} className=" text-[#000000]" />

          {/*
            Badge:
            badgeContent={totalItems} color="error"
          fontSize: 0.7rem → text-[0.7rem]
          fontWeight: 700  → font-bold
          minWidth: 18     → min-w-[18px]
          height: 18       → h-[18px]
          padding: 0 4px   → px-1
            animation pulse when totalItems > 0
          Positioned at top-right corner (MUI Badge default anchor)
          */}
          {totalItems > 0 && (
            <span
              className="absolute -right-1.5 -top-1.5 inline-flex min-w-[15px] h-[15px] items-center justify-center rounded-full bg-red-500 px-1 text-[0.7rem] font-bold leading-none text-white"
              style={{
                animation: "cart-badge-pulse 2s infinite",
              }}
            >
              {totalItems}
            </span>
          )}
        </span>
      </RouterLink>
    </>
  );
}