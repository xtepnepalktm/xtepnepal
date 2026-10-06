// import { Box, Link } from "@mui/material";

// // ----------------------------------------------------------------------

// export function SignUpTerms({ sx, ...other }) {
//   return (
//     <Box
//       component="span"
//       sx={[
//         () => ({
//           display: "block",
//           textAlign: "center",
//           typography: "caption",
//           color: "text.secondary",
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       {"By signing up, I agree to "}
//       <Link href="#" underline="always" color="text.primary">
//         Terms of service
//       </Link>
//       {" and "}
//       <Link href="#" underline="always" color="text.primary">
//         Privacy policy
//       </Link>
//       .
//     </Box>
//   );
// }
"use client";

export function SignUpTerms({ className = "" }) {
  return (
    <p
      className={`
        block text-center text-xs text-gray-500 leading-relaxed
        ${className}
      `}
    >
      By signing up, I agree to{" "}
      <a
        href="#"
        className="text-gray-900 underline hover:opacity-70 transition"
      >
        Terms of service
      </a>{" "}
      and{" "}
      <a
        href="#"
        className="text-gray-900 underline hover:opacity-70 transition"
      >
        Privacy policy
      </a>
      .
    </p>
  );
}