// "use client";

// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid2";
// import Stack from "@mui/material/Stack";
// import Paper from "@mui/material/Paper";
// import Skeleton from "@mui/material/Skeleton";

// // ----------------------------------------------------------------------

// export function ProductItemSkeleton({ sx, itemCount = 16, ...other }) {
//   return Array.from({ length: itemCount }, (_, index) => (
//     <Paper
//       key={index}
//       variant="outlined"
//       sx={[
//         () => ({
//           borderRadius: 2,
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Box sx={{ p: 1 }}>
//         <Skeleton sx={{ pt: "100%" }} />
//       </Box>

//       <Stack spacing={2} sx={{ p: 2 }}>
//         <Skeleton sx={{ width: 0.5, height: 16 }} />
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box sx={{ display: "flex" }}>
//             <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
//             <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
//             <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
//           </Box>

//           <Skeleton sx={{ width: 40, height: 16 }} />
//         </Box>
//       </Stack>
//     </Paper>
//   ));
// }

// // ----------------------------------------------------------------------

// export function ProductDetailsSkeleton({ ...other }) {
//   return (
//     <Grid container spacing={8} {...other}>
//       <Grid size={{ xs: 12, md: 6, lg: 7 }}>
//         <Skeleton sx={{ pt: "100%" }} />
//       </Grid>

//       <Grid size={{ xs: 12, md: 6, lg: 5 }}>
//         <Stack spacing={3}>
//           <Skeleton sx={{ height: 16, width: 48 }} />
//           <Skeleton sx={{ height: 16, width: 80 }} />
//           <Skeleton sx={{ height: 16, width: 0.5 }} />
//           <Skeleton sx={{ height: 16, width: 0.75 }} />
//           <Skeleton sx={{ height: 120 }} />
//         </Stack>
//       </Grid>

//       <Grid size={12}>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           {Array.from({ length: 3 }, (_, index) => (
//             <Box
//               key={index}
//               sx={{
//                 gap: 2,
//                 width: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 flexDirection: "column",
//                 justifyContent: "center",
//               }}
//             >
//               <Skeleton variant="circular" sx={{ width: 80, height: 80 }} />
//               <Skeleton sx={{ height: 16, width: 160 }} />
//               <Skeleton sx={{ height: 16, width: 80 }} />
//             </Box>
//           ))}
//         </Box>
//       </Grid>
//     </Grid>
//   );
// }
"use client";

import React from "react";

// ----------------------------------------------------------------------

export function ProductItemSkeleton({
  className = "",
  itemCount = 16,
  ...other
}) {
  return (
    <>
      {Array.from({ length: itemCount }, (_, index) => (
        <div
          key={index}
          className={`overflow-hidden  border border-gray-200 bg-white ${className}`}
          {...other}
        >
          {/* Image Skeleton */}
          <div className="p-2">
            <div className="aspect-square w-full animate-pulse  bg-gray-200" />
          </div>

          {/* Content */}
          <div className="space-y-4 p-4">
            {/* Title */}
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
              {/* Rating Circles */}
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
              </div>

              {/* Price */}
              <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

export function ProductDetailsSkeleton({ className = "", ...other }) {
  return (
    <div
      className={`grid grid-cols-1 gap-10 lg:grid-cols-12 ${className}`}
      {...other}
    >
      {/* Left Image Section */}
      <div className="lg:col-span-7">
        <div className="aspect-square w-full animate-pulse  bg-gray-200" />
      </div>

      {/* Right Content Section */}
      <div className="space-y-5 lg:col-span-5">
        <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

        <div className="h-32 w-full animate-pulse  bg-gray-200" />
      </div>

      {/* Bottom Features / Reviews Section */}
      <div className="col-span-1 lg:col-span-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-center justify-center gap-3"
            >
              {/* Circle */}
              <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200" />

              {/* Title */}
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

              {/* Subtitle */}
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}