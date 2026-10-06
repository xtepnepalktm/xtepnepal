// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { CONFIG } from "@/global-config";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { updateProfile } from "@/redux/actions";

// import { fData } from "@/utils/format-number";

// import { toast } from "@/components/snackbar";
// import { Form, Field } from "@/components/hook-form";

// import { updateProfileSchema } from "./profile-schema";

// import { updateProfile as updateUserProfile } from "@/api";

// // ----------------------------------------------------------------------

// export function ProfileGeneral() {
//   const dispatch = useAppDispatch();

//   const { profile } = useAppSelector((state) => state.profile);

//   const { addresses, full_name, phone_number, email, featured_image } = profile;

//   const currentUser = {
//     full_name: full_name,
//     email: email,
//     featured_image: featured_image,
//     phone_number: phone_number,
//     addresses: addresses,
//   };

//   const defaultValues = {
//     full_name: "",
//     email: "",
//     featured_image: null,
//     phone_number: "",
//     addresses: [],
//   };

//   const methods = useForm({
//     mode: "all",
//     resolver: zodResolver(updateProfileSchema),
//     defaultValues,
//     values: currentUser,
//   });

//   const {
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const convertFileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       if (!(file instanceof File)) {
//         reject(new Error("Invalid file input"));
//         return;
//       }

//       const reader = new FileReader();

//       reader.onload = () => resolve(reader.result);

//       reader.onerror = (error) => reject(error);

//       reader.readAsDataURL(file);
//     });
//   };

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const updatedData = { ...data };

//       if (updatedData.featured_image instanceof File) {
//         updatedData.featured_image = await convertFileToBase64(
//           updatedData.featured_image
//         );
//       } else {
//         delete updatedData.featured_image;
//       }

//       const response = await updateUserProfile(updatedData);

//       dispatch(updateProfile(response[0]));

//       toast.success("Profile update success!");
//     } catch (error) {
//       toast.error("Couldn't update profile! Try again.");
//     }
//   });

//   return (
//     <Form methods={methods} onSubmit={onSubmit}>
//       {/* Card */}
//       <div className="bg-white rounded-2xl shadow-sm p-3 lg:p-4 flex flex-col gap-3 mb-5 ">

//         {/* Title */}
//         <h2 className="text-lg font-semibold">General</h2>

//         {/* Avatar Upload */}
//         <Field.UploadAvatar
//           name="featured_image"
//           maxSize={3145728}
//           helperText={
//             <div className="mt-3 text-center text-xs text-gray-400 leading-relaxed">
//               <p>Allowed *.jpeg, *.jpg, *.png</p>
//               <p>max size of {fData(3145728)}</p>
//             </div>
//           }
//         />

//         {/* Fields */}
//         <Field.Text name="full_name" label="Name" />

//         <Field.Text name="email" label="Email address" />

//         <Field.Text name="phone_number" label="Contact" />

//         {/* Addresses */}
//         {addresses && addresses.length > 0 && (
//           <div className="bg-gray-100  p-2">
//             <p className="text-sm font-semibold mb-1">Address</p>
//             {addresses.map((addr, index) => (
//               <p
//                 key={addr.address_id || index}
//                 className="text-sm text-gray-700 mb-0"
//               >
//                 {addr.address}
//                 {addr.district && `, ${addr.district.district_name}`}
//                 {addr.state && `, ${addr.state.state_name}`}
//               </p>
//             ))}
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700  transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? (
//               <span className="inline-flex items-center gap-2">
//                 <svg
//                   className="animate-spin w-4 h-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8H4z"
//                   />
//                 </svg>
//                 Saving...
//               </span>
//             ) : (
//               "Save changes"
//             )}
//           </button>
//         </div>
//       </div>
//     </Form>
//   );
// }

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateProfile } from "@/redux/actions";

import { fData } from "@/utils/format-number";

import { toast } from "@/components/snackbar";
import { Form, Field } from "@/components/hook-form";

import { updateProfileSchema } from "./profile-schema";
import { updateProfile as updateUserProfile } from "@/api";

// ── Design tokens ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function ProfileGeneral() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const { addresses, full_name, phone_number, email, featured_image } = profile;

  const currentUser = { full_name, email, featured_image, phone_number, addresses };
  const defaultValues = { full_name: "", email: "", featured_image: null, phone_number: "", addresses: [] };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
    values: currentUser,
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
    if (!(file instanceof File)) { reject(new Error("Invalid file input")); return; }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = { ...data };
      if (updatedData.featured_image instanceof File) {
        updatedData.featured_image = await convertFileToBase64(updatedData.featured_image);
      } else {
        delete updatedData.featured_image;
      }
      const response = await updateUserProfile(updatedData);
      dispatch(updateProfile(response[0]));
      toast.success("Profile updated!");
    } catch {
      toast.error("Couldn't update profile! Try again.");
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div style={{
        backgroundColor: WHITE,
        border: `1px solid ${BORDER}`,
        width: "100%",
        marginBottom: "1.25rem",
        overflow: "hidden",
      }}>

        {/* Header stripe */}
        <div style={{
          backgroundColor: BG,
          borderBottom: `1px solid ${BORDER}`,
          padding: "0.625rem 1rem",
        }}>
          <h2 style={{
            fontFamily: "Helvetica",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: TEXT, margin: 0,
          }}>
            General
          </h2>
        </div>

        {/* Body */}
        <div style={{
          padding: "1.25rem 1rem",
          display: "flex", flexDirection: "column", gap: "1rem",
        }}>

          {/* Avatar upload */}
          <div style={{ display: "flex", justifyContent: "start" }}>
            <Field.UploadAvatar
              name="featured_image"
              maxSize={3145728}
              helperText={`Allowed *.jpeg, *.jpg, *.png — max ${fData(3145728)}`}
            />
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: BORDER }} />

          {/* Fields */}
          <Field.Text name="full_name" label="Name" />
          <Field.Text name="email" label="Email address" />
          <Field.Text name="phone_number" label="Contact" />

          {/* Addresses */}
          {addresses?.length > 0 && (
            <div style={{
              backgroundColor: BG,
              border: `1px solid ${BORDER}`,
              padding: "0.75rem 1rem",
            }}>
              <p style={{
                fontFamily: "Helvetica",
                fontSize: 9, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: TEXT_MUTED, margin: "0 0 0.5rem 0",
              }}>
                Address
              </p>
              {addresses.map((addr, index) => (
                <p
                  key={addr.address_id || index}
                  style={{
                    fontFamily: "Helvetica",
                    fontSize: 11, fontWeight: 600,
                    color: TEXT, margin: "0 0 0.25rem 0",
                    lineHeight: 1.5,
                  }}
                >
                  {addr.address}
                  {addr.district && `, ${addr.district.district_name}`}
                  {addr.state && `, ${addr.state.state_name}`}
                </p>
              ))}
            </div>
          )}

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: BORDER }} />

          {/* Submit */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                fontFamily: "Helvetica",
                fontSize: 9, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: isSubmitting ? TEXT_MUTED : WHITE,
                backgroundColor: isSubmitting ? BG : TEXT,
                border: `1px solid ${isSubmitting ? BORDER : TEXT}`,
                padding: "0.4rem 1rem",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "background-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = "#333";
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = TEXT;
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