// import { Box, Stack, Skeleton, CircularProgress } from "@mui/material";

// // ----------------------------------------------------------------------

// export function ChatNavItemSkeleton({ sx, itemCount = 6, ...other }) {
//   return Array.from({ length: itemCount }, (_, index) => (
//     <Box
//       key={index}
//       sx={[
//         () => ({
//           gap: 2,
//           px: 2.5,
//           py: 1.5,
//           display: "flex",
//           alignItems: "center",
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Skeleton variant="circular" sx={{ width: 48, height: 48 }} />

//       <Stack spacing={1} flexGrow={1}>
//         <Skeleton sx={{ width: 0.75, height: 10 }} />
//         <Skeleton sx={{ width: 0.5, height: 10 }} />
//       </Stack>
//     </Box>
//   ));
// }

// // ----------------------------------------------------------------------

// export function ChatHeaderSkeleton({ sx, ...other }) {
//   return (
//     <Box
//       sx={[
//         { width: 1, display: "flex", alignItems: "center" },
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
//       <Stack spacing={1} flexGrow={1} sx={{ mx: 2 }}>
//         <Skeleton sx={{ width: 96, height: 10 }} />
//         <Skeleton sx={{ width: 40, height: 10 }} />
//       </Stack>

//       <Skeleton variant="circular" sx={{ width: 28, height: 28 }} />
//       <Skeleton variant="circular" sx={{ width: 28, height: 28, mx: 1 }} />
//       <Skeleton variant="circular" sx={{ width: 28, height: 28, mr: 1 }} />
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// export function ChatRoomSkeleton({ sx, ...other }) {
//   return (
//     <Box
//       sx={[
//         () => ({
//           pt: 5,
//           flexGrow: 1,
//           display: "flex",
//           flexDirection: "column",
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Stack alignItems="center">
//         <Skeleton variant="circular" sx={{ width: 96, height: 96 }} />
//         <Skeleton
//           sx={{
//             mb: 1,
//             mt: 2,
//             height: 10,
//             width: 0.65,
//           }}
//         />
//         <Skeleton sx={{ mb: 5, width: 0.35, height: 10 }} />
//         <CircularProgress color="inherit" thickness={2} />
//       </Stack>
//     </Box>
//   );
// }
// Chat Skeleton Components (Tailwind version)

export function ChatNavItemSkeleton({ itemCount = 6 }) {
  return Array.from({ length: itemCount }, (_, index) => (
    <div
      key={index}
      className="flex items-center gap-4 px-6 py-3"
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />

      {/* Text lines */}
      <div className="flex flex-col flex-grow gap-2">
        <div className="h-2 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-2 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  ));
}

// ------------------------------------------------------

export function ChatHeaderSkeleton() {
  return (
    <div className="w-full flex items-center px-4 py-2">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />

      {/* Name + subtitle */}
      <div className="flex flex-col gap-2 flex-grow mx-4">
        <div className="h-2 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-2 w-10 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Action icons */}
      <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse" />
      <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse mx-2" />
      <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse mr-2" />
    </div>
  );
}

// ------------------------------------------------------

export function ChatRoomSkeleton() {
  return (
    <div className="pt-10 flex-1 flex flex-col">
      <div className="flex flex-col items-center justify-center">

        {/* Big avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />

        {/* Title line */}
        <div className="mt-6 mb-2 h-2 w-2/3 bg-gray-200 rounded animate-pulse" />

        {/* Subtitle line */}
        <div className="mb-10 h-2 w-1/3 bg-gray-200 rounded animate-pulse" />

        {/* Loader */}
        <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}