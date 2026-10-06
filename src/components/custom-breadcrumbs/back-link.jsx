// import Link from "@mui/material/Link";

// import { RouterLink } from "@/routes/components";

// import { Iconify, iconifyClasses } from "@/components/iconify";

// // ----------------------------------------------------------------------

// export function BackLink({ sx, label, ...other }) {
//   return (
//     <Link
//       component={RouterLink}
//       color="inherit"
//       underline="none"
//       sx={[
//         (theme) => ({
//           verticalAlign: "middle",
//           [`& .${iconifyClasses.root}`]: {
//             verticalAlign: "inherit",
//             transform: "translateY(-2px)",
//             ml: {
//               xs: "-14px",
//               md: "-18px",
//             },
//             transition: theme.transitions.create(["opacity"], {
//               duration: theme.transitions.duration.shorter,
//               easing: theme.transitions.easing.sharp,
//             }),
//           },
//           "&:hover": {
//             [`& .${iconifyClasses.root}`]: {
//               opacity: 0.48,
//             },
//           },
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Iconify width={18} icon="eva:arrow-ios-back-fill" />
//       {label}
//     </Link>
//   );
// }
'use client';

import clsx from 'clsx';
import { RouterLink } from '@/routes/components';
import { Iconify } from '@/components/iconify';

export function BackLink({ label, className = '', ...props }) {
  return (
    <RouterLink
      {...props}
      className={clsx(
        'inline-flex items-center gap-1 text-inherit no-underline group transition',
        className
      )}
    >
      {/* Icon */}
      <span
        className="
          -ml-3 md:-ml-4
          transition-opacity duration-200 ease-in-out
          group-hover:opacity-50
          translate-y-[-2px]
        "
      >
        <Iconify width={18} icon="eva:arrow-ios-back-fill" />
      </span>

      {/* Label */}
      <span className="text-sm md:text-base">
        {label}
      </span>
    </RouterLink>
  );
}