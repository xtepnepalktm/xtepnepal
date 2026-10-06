// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// // ----------------------------------------------------------------------

// export function SearchNotFound({ query, sx, slotProps, ...other }) {
//   if (!query) {
//     return (
//       <Typography variant="body2" {...slotProps?.description}>
//         Please enter keywords
//       </Typography>
//     );
//   }

//   return (
//     <Box
//       sx={[
//         {
//           gap: 1,
//           display: 'flex',
//           borderRadius: 1.5,
//           textAlign: 'center',
//           flexDirection: 'column',
//         },
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Typography
//         variant="h6"
//         {...slotProps?.title}
//         sx={[
//           { color: 'text.primary' },
//           ...(Array.isArray(slotProps?.title?.sx)
//             ? (slotProps?.title?.sx ?? [])
//             : [slotProps?.title?.sx]),
//         ]}
//       >
//         Not found
//       </Typography>

//       <Typography variant="body2" {...slotProps?.description}>
//         No results found for &nbsp;
//         <strong>{`"${query}"`}</strong>
//         .
//         <br /> Try checking for typos or using complete words.
//       </Typography>
//     </Box>
//   );
// }
'use client';

export function SearchNotFound({ query, className = '', ...other }) {
  if (!query) {
    return (
      <p
        className="text-sm text-gray-500 dark:text-gray-400"
        {...other}
      >
        Please enter keywords
      </p>
    );
  }

  return (
    <div
      className={`flex flex-col gap-1.5 text-center  ${className}`}
      {...other}
    >
      {/* TITLE */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Not found
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        No results found for{' '}
        <strong className="text-gray-900 dark:text-white">
          "{query}"
        </strong>
        .<br />
        Try checking for typos or using complete words.
      </p>
    </div>
  );
}