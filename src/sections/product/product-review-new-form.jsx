// import { z as zod } from "zod";
// import { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Box, Button, Typography, Stack, Dialog } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";

// import { useAppDispatch } from "@/redux/hooks";
// import { addProductReview as addProductReviewAction } from "@/redux/actions";

// import { Form, Field } from "@/components/hook-form";
// import { toast } from "@/components/snackbar";

// import { addProductReview } from "@/api";

// // ----------------------------------------------------------------------

// export const ReviewSchema = zod.object({
//   rating: zod.number().min(1, "Rating must be greater than or equal to 1!"),
//   title: zod.string().min(1, { message: "Title is required!" }),
//   description: zod.string().min(1, { message: "Description is required!" }),
// });

// // ----------------------------------------------------------------------

// export function ProductReviewNewForm({ productId, onClose, ...other }) {
//   const dispatch = useAppDispatch();

//   const defaultValues = {
//     rating: 0,
//     title: "",
//     description: "",
//   };

//   const methods = useForm({
//     mode: "all",
//     resolver: zodResolver(ReviewSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       reset();

//       onClose();

//       const response = await addProductReview(productId, data);

//       dispatch(addProductReviewAction(response));

//       toast.success("Review posted successfully!");
//     } catch (error) {
//       console.error(error);

//       toast.error("Couldn't post review. Please try again later.");
//     }
//   });

//   const onCancel = useCallback(() => {
//     onClose();
//     reset();
//   }, [onClose, reset]);

//   return (
//     <Dialog fullWidth maxWidth="xs" onClose={onClose} {...other}>
//       <Form methods={methods} onSubmit={onSubmit}>
//         <Stack spacing={3} sx={{ p: 3 }}>
//           <Typography variant="h6"> Add Review </Typography>

//           <Stack spacing={1}>
//             <Typography variant="body2">
//               Your review about this product:
//             </Typography>

//             <Field.Rating name="rating" />
//           </Stack>

//           <Field.Text name="title" label="Title *" />

//           <Field.Text
//             name="description"
//             label="Description *"
//             multiline
//             rows={3}
//           />

//           <Box sx={{ gap: 2, display: "flex", justifyContent: "flex-end" }}>
//             <Button color="inherit" variant="outlined" onClick={onCancel}>
//               Cancel
//             </Button>

//             <LoadingButton
//               type="submit"
//               variant="contained"
//               loading={isSubmitting}
//             >
//               Post
//             </LoadingButton>
//           </Box>
//         </Stack>
//       </Form>
//     </Dialog>
//   );
// }
"use client";

import { z as zod } from "zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "@/redux/hooks";
import { addProductReview as addProductReviewAction } from "@/redux/actions";

import { Form, Field } from "@/components/hook-form";
import { toast } from "@/components/snackbar";

import { addProductReview } from "@/api";

// ----------------------------------------------------------------------

export const ReviewSchema = zod.object({
  rating: zod
    .number()
    .min(1, "Rating must be greater than or equal to 1!"),

  title: zod.string().min(1, {
    message: "Title is required!",
  }),

  description: zod.string().min(1, {
    message: "Description is required!",
  }),
});

// ----------------------------------------------------------------------

export function ProductReviewNewForm({
  productId,
  onClose,
  open,
}) {
  const dispatch = useAppDispatch();

  const defaultValues = {
    rating: 0,
    title: "",
    description: "",
  };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      reset();

      onClose();

      const response = await addProductReview(productId, data);

      dispatch(addProductReviewAction(response));

      toast.success("Review posted successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        "Couldn't post review. Please try again later."
      );
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md  bg-white shadow-2xl">
        <Form methods={methods} onSubmit={onSubmit}>
          <div className="space-y-6 p-6">
            {/* Header */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Add Review
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your review about this product:
              </p>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Field.Rating name="rating" />
            </div>

            {/* Title */}
            <Field.Text
              name="title"
              label="Title *"
            />

            {/* Description */}
            <Field.Text
              name="description"
              label="Description *"
              multiline
              rows={3}
            />

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className=" border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center  bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}