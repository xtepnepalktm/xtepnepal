// import { varAlpha } from "minimal-shared/utils";

// import {
//   useTheme,
//   Box,
//   Container,
//   Typography,
//   ListItemText,
// } from "@mui/material";

// import { CONFIG } from "@/global-config";

// import { fDate } from "@/utils/format-time";

// // ----------------------------------------------------------------------

// export function BlogDetailsHero({
//   sx,
//   title,
//   createdBy,
//   coverUrl,
//   createdAt,
//   ...other
// }) {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={[
//         {
//           ...theme.mixins.bgGradient({
//             images: [
//               `linear-gradient(0deg, ${varAlpha(
//                 theme.vars.palette.grey["900Channel"],
//                 0.64
//               )}, ${varAlpha(theme.vars.palette.grey["900Channel"], 0.64)})`,
//               `url(${coverUrl})`,
//             ],
//           }),
//           mt: 5,
//           height: 480,
//           overflow: "hidden",
//         },
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Container sx={{ height: 1, position: "relative" }}>
//         <Typography
//           variant="h3"
//           component="h1"
//           sx={{
//             zIndex: 9,
//             maxWidth: 480,
//             position: "absolute",
//             pt: { xs: 2, md: 8 },
//             color: "common.white",
//           }}
//         >
//           {title}
//         </Typography>

//         <Box
//           sx={{
//             left: 0,
//             width: 1,
//             bottom: 0,
//             position: "absolute",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               px: { xs: 2, md: 3 },
//               pb: { xs: 3, md: 8 },
//             }}
//           >
//             <ListItemText
//               sx={{ color: "common.white" }}
//               primary={createdBy}
//               secondary={fDate(createdAt)}
//               slotProps={{
//                 primary: { sx: { typography: "subtitle1" } },
//                 secondary: {
//                   sx: { mt: 0.5, opacity: 0.64, color: "inherit" },
//                 },
//               }}
//             />
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// }
import { fDate } from "@/utils/format-time";

// ----------------------------------------------------------------------

export function BlogDetailsHero({
  className,
  title,
  createdBy,
  coverUrl,
  createdAt,
  ...other
}) {
  return (
    <div
      className={[
        "mt-5 h-[480px] overflow-hidden relative bg-cover bg-center bg-no-repeat",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(33,43,54,0.64), rgba(33,43,54,0.64)), url(${coverUrl})`,
      }}
      {...other}
    >
      {/* Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full relative">
        {/* Title */}
        <h1 className="absolute z-10 max-w-[480px] pt-4 md:pt-16 text-white text-3xl font-bold leading-tight">
          {title}
        </h1>

        {/* Author info pinned to bottom */}
        <div className="absolute left-0 bottom-0 w-full">
          <div className="flex items-center px-4 md:px-6 pb-6 md:pb-16">
            <div className="text-white">
              <p className="text-sm font-semibold leading-snug">{createdBy}</p>
              <p className="mt-[2px] text-sm opacity-60">{fDate(createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}