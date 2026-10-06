// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import {
//   Box,
//   Card,
//   Typography,
//   Stack,
//   Button,
//   TextField,
//   CircularProgress,
//   useTheme,
// } from "@mui/material";
// import toast, { Toaster } from "react-hot-toast";

// import { useAppSelector } from "@/redux/hooks";
// import { Iconify } from "@/components/iconify";
// import { varAlpha } from "minimal-shared/utils";
// import { sendServiceInquiry } from "@/api/service";

// // ---------------- Validation Schema ----------------
// const inquirySchema = z.object({
//   full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
//   email: z.string().email("Please enter a valid email address"),
//   phone_number: z.string().min(10, "Phone number must be 10 digits"),
//   // .regex(
//   //   /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
//   //   "Please enter a valid phone number"
//   // ),
//   subject: z.string().min(5).max(200),
//   message: z.string().min(20).max(1000),
// });

// // ---------------- Component ----------------
// export function ServiceInquiryForm({ serviceTitle, serviceSlug }) {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;
//   const secondaryColor =
//     vendor?.secondary_color || theme.palette.secondary.main;

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(inquirySchema),
//     defaultValues: {
//       full_name: "",
//       email: "",
//       phone_number: "",
//       subject: `Inquiry about ${serviceTitle}`,
//       message: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     try {
//       await sendServiceInquiry({
//         ...data,
//         service: serviceSlug,
//       });

//       toast.success("Inquiry submitted successfully!", {
//         duration: 5000,
//         style: { borderRadius: "10px", background: "#4caf50", color: "#fff" },
//       });

//       reset();
//     } catch (err) {
//       // console.error("Inquiry submission error:", err);
//       toast.error(err?.message || "Failed to submit inquiry", {
//         duration: 5000,
//         style: { borderRadius: "10px", background: "#ef4444", color: "#fff" },
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-right" />
//       <Card
//         sx={{
//           p: { xs: 3, md: 4 },
//           borderRadius: 3,
//           border: `1px solid ${varAlpha(
//             theme.vars.palette.grey["500Channel"],
//             0.12
//           )}`,
//           boxShadow: "none",
//         }}
//       >
//         <Stack spacing={3}>
//           {/* Header */}
//           <Box>
//             <Stack
//               direction="row"
//               spacing={2}
//               alignItems="center"
//               sx={{ mb: 1 }}
//             >
//               <Box
//                 sx={{
//                   p: 1.5,
//                   borderRadius: 2,
//                   bgcolor: varAlpha(
//                     theme.vars.palette.primary.mainChannel,
//                     0.12
//                   ),
//                   color: "primary.main",
//                 }}
//               >
//                 <Iconify icon="solar:letter-bold-duotone" width={24} />
//               </Box>
//               <Typography variant="body1" sx={{ fontWeight: 700 }}>
//                 Send Inquiry
//               </Typography>
//             </Stack>
//             <Typography variant="body2" sx={{ color: "text.secondary" }}>
//               Have questions about this service? Fill out the form below and
//               we'll get back to you shortly.
//             </Typography>
//           </Box>

//           {/* Form */}
//           <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
//             <Stack spacing={2.5}>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 placeholder="Enter your full name"
//                 {...register("full_name")}
//                 error={!!errors.full_name}
//                 helperText={errors.full_name?.message}
//               />
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 placeholder="Enter your email"
//                 type="email"
//                 {...register("email")}
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//               />
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 placeholder="Enter your phone number"
//                 {...register("phone_number")}
//                 error={!!errors.phone_number}
//                 helperText={errors.phone_number?.message}
//               />
//               <TextField
//                 fullWidth
//                 label="Subject"
//                 placeholder="Enter inquiry subject"
//                 {...register("subject")}
//                 error={!!errors.subject}
//                 helperText={errors.subject?.message}
//               />
//               <TextField
//                 fullWidth
//                 label="Message"
//                 placeholder="Describe your inquiry in detail..."
//                 multiline
//                 rows={4}
//                 {...register("message")}
//                 error={!!errors.message}
//                 helperText={errors.message?.message}
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 disabled={isSubmitting}
//                 sx={{
//                   py: 1.5,
//                   borderRadius: 2,
//                   fontWeight: 700,
//                   background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
//                   "&:hover": {
//                     background: `linear-gradient(135deg, ${primaryColor} 20%, ${secondaryColor} 100%)`,
//                   },
//                 }}
//               >
//                 {isSubmitting ? (
//                   <CircularProgress size={20} color="inherit" />
//                 ) : (
//                   "Submit Inquiry"
//                 )}
//               </Button>
//             </Stack>
//           </Box>

//           {/* Privacy Note */}
//           <Typography
//             variant="caption"
//             sx={{
//               color: "text.secondary",
//               textAlign: "center",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 0.5,
//             }}
//           >
//             <Iconify icon="solar:shield-check-bold" width={14} />
//             Your information is secure and will never be shared.
//           </Typography>
//         </Stack>
//       </Card>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { sendServiceInquiry } from "@/api/service";

// ----------------------------------------------------------------------

const inquirySchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone_number: z.string().min(10, "Phone number must be 10 digits"),
  subject: z.string().min(5).max(200),
  message: z.string().min(20).max(1000),
});

// ----------------------------------------------------------------------

export function ServiceInquiryForm({ serviceTitle, serviceSlug }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#2563eb";
  const secondaryColor = vendor?.secondary_color || "#7c3aed";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      subject: `Inquiry about ${serviceTitle}`,
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await sendServiceInquiry({
        ...data,
        service: serviceSlug,
      });

      toast.success("Inquiry submitted successfully!", {
        duration: 5000,
      });

      reset();
    } catch (err) {
      toast.error(err?.message || "Failed to submit inquiry", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className=" border border-gray-200 bg-white p-6 shadow-none md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div
                className=" p-3"
                style={{
                  backgroundColor: `${primaryColor}20`,
                  color: primaryColor,
                }}
              >
                <Iconify
                  icon="solar:letter-bold-duotone"
                  width={24}
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                Send Inquiry
              </h3>
            </div>

            <p className="text-sm text-gray-500">
              Have questions about this service? Fill out the form below and
              we'll get back to you shortly.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("full_name")}
                className={`w-full  border px-4 py-3 outline-none transition-all
                  ${errors.full_name
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
              />

              {errors.full_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={`w-full  border px-4 py-3 outline-none transition-all
                  ${errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="text"
                placeholder="Enter your phone number"
                {...register("phone_number")}
                className={`w-full  border px-4 py-3 outline-none transition-all
                  ${errors.phone_number
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
              />

              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <input
                type="text"
                placeholder="Enter inquiry subject"
                {...register("subject")}
                className={`w-full  border px-4 py-3 outline-none transition-all
                  ${errors.subject
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
              />

              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <textarea
                rows={4}
                placeholder="Describe your inquiry in detail..."
                {...register("message")}
                className={`w-full  border px-4 py-3 outline-none transition-all
                  ${errors.message
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
              />

              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center  py-4 font-bold text-white transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              }}
            >
              {isSubmitting ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-20"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-80"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : (
                "Submit Inquiry"
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-center text-xs text-gray-500">
            <Iconify
              icon="solar:shield-check-bold"
              width={14}
            />
            <span>
              Your information is secure and will never be shared.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}