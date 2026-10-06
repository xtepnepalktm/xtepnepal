// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";

// import { toast } from "@/components/snackbar";
// import { Iconify } from "@/components/iconify";
// import { Form, Field } from "@/components/hook-form";

// import { changePassWordSchema } from "./profile-schema";

// import { updatePassword } from "@/api";

// // ----------------------------------------------------------------------

// export function ProfileSecurity() {
//   const [showPassword, setShowPassword] = useState(false);

//   const defaultValues = {
//     old_password: "",
//     new_password: "",
//     confirm_new_password: "",
//   };

//   const methods = useForm({
//     mode: "all",
//     resolver: zodResolver(changePassWordSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await updatePassword(data);

//       reset();

//       toast.success("Password update success!");
//     } catch (error) {
//       toast.error("Couldn't update password! Try again.");
//     }
//   });

//   return (
//     <Form methods={methods} onSubmit={onSubmit}>
//       <div className="flex flex-col gap-3 rounded-2xl border-0  bg-white p-3 lg:p-4 shadow-md">
//         <h3 className="text-lg font-semibold text-gray-900">Security</h3>

//         {/* Old Password */}
//         <div className="relative">
//           <Field.Text
//             name="old_password"
//             type={showPassword ? "text" : "password"}
//             label="Old password"
//             className="w-full"
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
//           >
//             <Iconify
//               icon={
//                 showPassword
//                   ? "solar:eye-bold"
//                   : "solar:eye-closed-bold"
//               }
//               width={20}
//             />
//           </button>
//         </div>

//         {/* New Password */}
//         <div className="relative">
//           <Field.Text
//             name="new_password"
//             label="New password"
//             type={showPassword ? "text" : "password"}
//             className="w-full"
//             helperText={
//               <span className="mt-1 flex items-center gap-1 text-sm text-gray-500">
//                 <Iconify icon="eva:info-fill" width={16} />
//                 Password must be minimum 8+
//               </span>
//             }
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-3.5 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
//           >
//             <Iconify
//               icon={
//                 showPassword
//                   ? "solar:eye-bold"
//                   : "solar:eye-closed-bold"
//               }
//               width={20}
//             />
//           </button>
//         </div>

//         {/* Confirm Password */}
//         <div className="relative">
//           <Field.Text
//             name="confirm_new_password"
//             type={showPassword ? "text" : "password"}
//             label="Confirm new password"
//             className="w-full"
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
//           >
//             <Iconify
//               icon={
//                 showPassword
//                   ? "solar:eye-bold"
//                   : "solar:eye-closed-bold"
//               }
//               width={20}
//             />
//           </button>
//         </div>

//         {/* Submit */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="inline-flex items-center justify-center  bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             {isSubmitting ? "Saving..." : "Save changes"}
//           </button>
//         </div>
//       </div>
//     </Form>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";
import { Form, Field } from "@/components/hook-form";

import { changePassWordSchema } from "./profile-schema";
import { updatePassword } from "@/api";

// ── Design tokens ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function ProfileSecurity() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

  const defaultValues = {
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(changePassWordSchema),
    defaultValues,
  });

  const { reset, handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updatePassword(data);
      reset();
      toast.success("Password updated!");
    } catch {
      toast.error("Couldn't update password! Try again.");
    }
  });

  const EyeToggle = ({ top = "50%", translateY = "-50%" }) => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      style={{
        position: "absolute",
        right: "0.75rem",
        top,
        transform: `translateY(${translateY})`,
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        color: TEXT_MUTED,
        display: "flex",
        alignItems: "center",
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = TEXT}
      onMouseLeave={(e) => e.currentTarget.style.color = TEXT_MUTED}
    >
      <Iconify
        icon={showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"}
        style={{ width: 18, height: 18 }}
      />
    </button>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div style={{
        backgroundColor: WHITE,
        border: `1px solid ${BORDER}`,
        overflow: "hidden",
        marginBottom: "1.25rem",
      }}>

        {/* Header stripe */}
        <div style={{
          backgroundColor: BG,
          borderBottom: `1px solid ${BORDER}`,
          padding: "0.625rem 1rem",
        }}>
          <h3 style={{
            fontFamily: "Helvetica",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: TEXT, margin: 0,
          }}>
            Security
          </h3>
        </div>

        {/* Body */}
        <div style={{
          padding: "1.25rem 1rem",
          display: "flex", flexDirection: "column", gap: "1rem",
        }}>

          {/* Old password */}
          <div style={{ position: "relative" }}>
            <Field.Text
              name="old_password"
              type={showPassword ? "text" : "password"}
              label="Old password"
            />
            <EyeToggle />
          </div>

          {/* New password */}
          <div style={{ position: "relative" }}>
            <Field.Text
              name="new_password"
              type={showPassword ? "text" : "password"}
              label="New password"
              helperText={
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.25rem",
                  marginTop: "0.25rem",
                  fontFamily: "Helvetica",
                  fontSize: 9, fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: TEXT_MUTED,
                }}>
                  <Iconify icon="eva:info-fill" style={{ width: 12, height: 12 }} />
                  Minimum 8 characters
                </span>
              }
            />
            <EyeToggle top="1.75rem" translateY="0" />
          </div>

          {/* Confirm password */}
          <div style={{ position: "relative" }}>
            <Field.Text
              name="confirm_new_password"
              type={showPassword ? "text" : "password"}
              label="Confirm new password"
            />
            <EyeToggle />
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: BORDER }} />

          {/* Submit */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => setSubmitHovered(true)}
              onMouseLeave={() => setSubmitHovered(false)}
              style={{
                fontFamily: "Helvetica",
                fontSize: 9, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: isSubmitting ? TEXT_MUTED : WHITE,
                backgroundColor: isSubmitting ? BG : submitHovered ? "#333" : TEXT,
                border: `1px solid ${isSubmitting ? BORDER : submitHovered ? "#333" : TEXT}`,
                padding: "0.4rem 1rem",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "background-color 0.15s, border-color 0.15s",
              }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    style={{ width: 12, height: 12, animation: "spin 0.8s linear infinite" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" style={{ opacity: 0.75 }} />
                  </svg>
                  Saving…
                </>
              ) : "Save changes"}
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </button>
          </div>

        </div>
      </div>
    </Form>
  );
}