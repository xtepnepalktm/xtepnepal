// import FormHelperText from '@mui/material/FormHelperText';

// // ----------------------------------------------------------------------

// export function HelperText({ sx, helperText, errorMessage, disableGutters, ...other }) {
//   if (errorMessage || helperText) {
//     return (
//       <FormHelperText
//         error={!!errorMessage}
//         sx={[
//           {
//             mx: disableGutters ? 0 : 1.75,
//           },
//           ...(Array.isArray(sx) ? sx : [sx]),
//         ]}
//         {...other}
//       >
//         {errorMessage || helperText}
//       </FormHelperText>
//     );
//   }

//   return null;
// }
export function HelperText({
  sx = "",
  helperText,
  errorMessage,
  disableGutters,
  className = "",
  ...other
}) {
  const text = errorMessage || helperText;

  if (!text) return null;

  return (
    <p
      className={[
        "text-xs mt-1",
        errorMessage ? "text-red-600" : "text-gray-500",
        disableGutters ? "mx-0" : "mx-7",
        className,
      ].join(" ")}
      {...other}
    >
      {text}
    </p>
  );
}