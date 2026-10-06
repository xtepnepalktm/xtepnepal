// import { sumBy } from "es-toolkit";
// import { useBoolean } from "minimal-shared/hooks";

// import {
//   Box,
//   Stack,
//   Rating,
//   Button,
//   Divider,
//   Typography,
//   LinearProgress,
// } from "@mui/material";

// import { useAppSelector } from "@/redux/hooks";
// import { selectAuthState, selectProductState } from "@/redux/selectors";

// import { fShortenNumber } from "@/utils/format-number";

// import { Iconify } from "@/components/iconify";
// import { toast } from "@/components/snackbar";

// import { ProductReviewList } from "./product-review-list";
// import { ProductReviewNewForm } from "./product-review-new-form";

// // ----------------------------------------------------------------------

// export function ProductDetailsReview({ productId }) {
//   const { isLogin } = useAppSelector(selectAuthState);

//   const { reviews } = useAppSelector(selectProductState);

//   const review = useBoolean();

//   const totalReviews = reviews.length;

//   const averageRating = totalReviews
//     ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / totalReviews
//     : 0;

//   const ratings = [5, 4, 3, 2, 1].map((star) => ({
//     star: `${star} star`,
//     count: reviews.filter((r) => r.rating == star).length,
//   }));

//   const total = sumBy(ratings, (star) => star.count);

//   const handleOpenReviewForm = () => {
//     if (!isLogin) {
//       toast.error("Please login to write review!");

//       return;
//     }

//     review.onTrue();
//   };

//   const renderSummary = () => (
//     <Stack spacing={1} sx={{ alignItems: "center", justifyContent: "center" }}>
//       <Typography variant="subtitle2">Average rating</Typography>

//       <Typography variant="h2">
//         {averageRating.toFixed(1)}
//         /5
//       </Typography>

//       <Rating readOnly value={averageRating.toFixed(1)} precision={0.1} />

//       <Typography variant="caption" sx={{ color: "text.secondary" }}>
//         ({fShortenNumber(totalReviews)} reviews)
//       </Typography>
//     </Stack>
//   );

//   const renderProgress = () => (
//     <Stack
//       spacing={1.5}
//       sx={[
//         (theme) => ({
//           py: 5,
//           px: { xs: 3, md: 5 },
//           borderLeft: { md: `dashed 1px ${theme.vars.palette.divider}` },
//           borderRight: { md: `dashed 1px ${theme.vars.palette.divider}` },
//         }),
//       ]}
//     >
//       {ratings.map((rating) => (
//         <Box key={rating.star} sx={{ display: "flex", alignItems: "center" }}>
//           <Typography variant="subtitle2" component="span" sx={{ width: 42 }}>
//             {rating.star}
//           </Typography>

//           <LinearProgress
//             color="inherit"
//             variant="determinate"
//             value={(rating.count / total) * 100}
//             sx={{ mx: 2, flexGrow: 1 }}
//           />

//           <Typography
//             variant="body2"
//             component="span"
//             sx={{ minWidth: 48, color: "text.secondary" }}
//           >
//             {fShortenNumber(rating.count)}
//           </Typography>
//         </Box>
//       ))}
//     </Stack>
//   );

//   const renderReviewButton = () => (
//     <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
//       <Button
//         size="large"
//         variant="soft"
//         color="inherit"
//         onClick={handleOpenReviewForm}
//         startIcon={<Iconify icon="solar:pen-bold" />}
//       >
//         Write your review
//       </Button>
//     </Stack>
//   );

//   return (
//     <>
//       <Box
//         sx={{
//           py: { xs: 5, md: 0 },
//           display: "grid",
//           gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
//         }}
//       >
//         {renderSummary()}

//         {renderProgress()}

//         {renderReviewButton()}
//       </Box>

//       <Divider sx={{ borderStyle: "dashed" }} />

//       <ProductReviewList reviews={reviews} />

//       <ProductReviewNewForm
//         open={review.value}
//         onClose={review.onFalse}
//         //
//         productId={productId}
//       />
//     </>
//   );
// }
import { sumBy } from "es-toolkit";
import { useBoolean } from "minimal-shared/hooks";

import { useAppSelector } from "@/redux/hooks";
import { selectAuthState, selectProductState } from "@/redux/selectors";

import { fShortenNumber } from "@/utils/format-number";

import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";

import { ProductReviewList } from "./product-review-list";
import { ProductReviewNewForm } from "./product-review-new-form";

// ----------------------------------------------------------------------

export function ProductDetailsReview({ productId }) {
  const { isLogin } = useAppSelector(selectAuthState);

  const { reviews } = useAppSelector(selectProductState);

  const review = useBoolean();

  const totalReviews = reviews.length;

  const averageRating = totalReviews
    ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / totalReviews
    : 0;

  const ratings = [5, 4, 3, 2, 1].map((star) => ({
    star: `${star} star`,
    count: reviews.filter((r) => r.rating == star).length,
  }));

  const total = sumBy(ratings, (star) => star.count);

  const handleOpenReviewForm = () => {
    if (!isLogin) {
      toast.error("Please login to write review!");
      return;
    }

    review.onTrue();
  };

  // ----------------------------------------------------------------------

  const renderSummary = () => (
    <div className="flex flex-col items-center justify-center gap-2">
      <h6 className="text-sm font-semibold text-gray-800">
        Average rating
      </h6>

      <h2 className="text-4xl font-bold text-gray-900">
        {averageRating.toFixed(1)}
        <span className="text-2xl font-medium">/5</span>
      </h2>

      {/* Rating Stars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Iconify
            key={star}
            icon={
              star <= Math.round(averageRating)
                ? "solar:star-bold"
                : "solar:star-outline"
            }
            className={`w-5 h-5 ${star <= Math.round(averageRating)
              ? "text-yellow-400"
              : "text-gray-300"
              }`}
          />
        ))}
      </div>

      <p className="text-xs text-gray-500">
        ({fShortenNumber(totalReviews)} reviews)
      </p>
    </div>
  );

  // ----------------------------------------------------------------------

  const renderProgress = () => (
    <div
      className="
        py-10 px-5
        border-y md:border-y-0
        md:border-l md:border-r
        border-dashed border-gray-300
        flex flex-col gap-6
      "
    >
      {ratings.map((rating) => {
        const progress =
          total > 0 ? (rating.count / total) * 100 : 0;

        return (
          <div
            key={rating.star}
            className="flex items-center"
          >
            <span className="w-[42px] text-sm font-semibold text-gray-700">
              {rating.star}
            </span>

            {/* Progress */}
            <div className="mx-4 flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-gray-700 rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <span className="min-w-[48px] text-sm text-gray-500">
              {fShortenNumber(rating.count)}
            </span>
          </div>
        );
      })}
    </div>
  );

  // ----------------------------------------------------------------------

  const renderReviewButton = () => (
    <div className="flex items-center justify-center">
      <button
        onClick={handleOpenReviewForm}
        className="
          inline-flex items-center gap-2
          
          bg-gray-100
          hover:bg-gray-200
          transition-colors
          px-5 py-3
          text-sm font-semibold
          text-gray-800
        "
      >
        <Iconify
          icon="solar:pen-bold"
          className="w-5 h-5"
        />

        Write your review
      </button>
    </div>
  );

  // ----------------------------------------------------------------------

  return (
    <>
      {/* TOP REVIEW SECTION */}
      <div
        className="
          py-10 md:py-0
          grid grid-cols-1 md:grid-cols-3
          gap-10 md:gap-0
        "
      >
        {renderSummary()}

        {renderProgress()}

        {renderReviewButton()}
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-8" />

      {/* Review List */}
      <ProductReviewList reviews={reviews} />

      {/* Review Form Modal */}
      <ProductReviewNewForm
        open={review.value}
        onClose={review.onFalse}
        productId={productId}
      />
    </>
  );
}