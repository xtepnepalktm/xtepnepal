// import {
//   Box,
//   Stack,
//   Rating,
//   Avatar,
//   Typography,
//   ListItemText,
// } from "@mui/material";

// import { CONFIG } from "@/global-config";

// import { fDate } from "@/utils/format-time";

// // ----------------------------------------------------------------------

// export function ProductReviewItem({ review }) {
//   const { created_at, title, customer, rating, description } = review || {};

//   const renderInfo = () => (
//     <Box
//       sx={{
//         gap: 2,
//         display: "flex",
//         width: { md: 240 },
//         alignItems: "center",
//         textAlign: { md: "center" },
//         flexDirection: { xs: "row", md: "column" },
//       }}
//     >
//       <Avatar
//         src={`${customer?.profile_image}`}
//         sx={{ width: { xs: 48, md: 64 }, height: { xs: 48, md: 64 } }}
//       />

//       <ListItemText
//         primary={customer?.name}
//         secondary={fDate(created_at)}
//         slotProps={{
//           primary: { noWrap: true },
//           secondary: {
//             noWrap: true,
//             sx: { mt: 0.5, typography: "caption" },
//           },
//         }}
//       />
//     </Box>
//   );

//   const renderContent = () => (
//     <Stack spacing={1} flexGrow={1}>
//       <Rating size="small" value={rating} precision={0.1} readOnly />

//       <Typography variant="subtitle2">{title}</Typography>

//       <Typography variant="body2">{description}</Typography>
//     </Stack>
//   );

//   return (
//     <Box
//       sx={{
//         mt: 5,
//         gap: 2,
//         display: "flex",
//         px: { xs: 2.5, md: 0 },
//         flexDirection: { xs: "column", md: "row" },
//       }}
//     >
//       {renderInfo()}

//       {renderContent()}
//     </Box>
//   );
// }
import { fDate } from "@/utils/format-time";

// ----------------------------------------------------------------------

export function ProductReviewItem({ review }) {
  const {
    created_at,
    title,
    customer,
    rating,
    description,
  } = review || {};

  return (
    <div className="mt-5 flex flex-col gap-4 px-4 md:flex-row md:px-0">

      {/* USER INFO */}
      <div className="flex w-full items-center gap-4 md:w-[240px] md:flex-col md:text-center">

        <img
          src={customer?.profile_image}
          alt={customer?.name}
          className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
        />

        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold text-gray-900">
            {customer?.name}
          </h4>

          <p className="mt-1 truncate text-xs text-gray-500">
            {fDate(created_at)}
          </p>
        </div>
      </div>

      {/* REVIEW CONTENT */}
      <div className="flex flex-1 flex-col gap-2">

        {/* RATING */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={
                index < Math.round(rating)
                  ? "#facc15"
                  : "#d1d5db"
              }
              className="h-4 w-4"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* TITLE */}
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}