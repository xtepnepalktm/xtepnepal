// "use client";

// import { z as zod } from "zod";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useBoolean } from "minimal-shared/hooks";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setUser } from "@/redux/actions";

// import { paths } from "@/routes/paths";
// import { useRouter } from "@/routes/hooks";
// import { RouterLink } from "@/routes/components";

// import { Iconify } from "@/components/iconify";
// import { Form, Field } from "@/components/hook-form";
// import { AnimateLogoRotate } from "@/components/animate";
// import { toast } from "@/components/snackbar";

// import { FormHead } from "../components/form-head";
// import { SignUpTerms } from "../components/sign-up-terms";
// import { GoogleAuth } from "../components/google-auth";

// import { AddressNewForm } from "@/sections/address";

// import { addProductToCart, signUp, useGetStates } from "@/api";

// // ----------------------------------------------------------------------

// export const SignUpSchema = zod
//   .object({
//     name: zod.string().min(1, { message: "Name is required!" }),

//     phone_number: zod
//       .string()
//       .min(1, { message: "Phone number is required!" })
//       .regex(/^\d{10}$/, {
//         message: "Phone number must be exactly 10 digits!",
//       }),

//     email: zod
//       .string()
//       .min(1, { message: "Email is required!" })
//       .email({ message: "Email must be a valid email address!" }),

//     password: zod
//       .string()
//       .min(1, { message: "Password is required!" })
//       .min(8, { message: "Password must be at least 8 characters!" }),

//     password_confirmation: zod
//       .string()
//       .min(1, { message: "Confirm password is required!" })
//       .min(8, { message: "Confirm password must be at least 8 characters!" }),
//   })
//   .refine((data) => data.password === data.password_confirmation, {
//     message: "Passwords don't match!",
//     path: ["password_confirmation"],
//   });

// // ----------------------------------------------------------------------

// export function SignUpView() {
//   const vendor = useAppSelector((state) => state.vendor.vendor);
//   const router = useRouter();

//   const showPassword = useBoolean();
//   const showConfirmPassword = useBoolean();
//   const showAddressForm = useBoolean();

//   const [isEmailVerificationPending, setIsEmailVerificationPending] = useState(false);
//   const [registeredEmail, setRegisteredEmail] = useState("");

//   const dispatch = useAppDispatch();

//   const { items } = useAppSelector((state) => state.cart);
//   const { user, userToken } = useAppSelector((state) => state.auth);

//   const [errorMessage, setErrorMessage] = useState("");

//   // Redirect to profile if user is already logged in
//   useEffect(() => {
//     if (user?.customer?.id || userToken) {
//       router.push(paths.profile.root);
//     }
//   }, [user, userToken, router]);

//   const { states } = useGetStates();

//   const defaultValues = {
//     name: "",
//     phone_number: "",
//     email: "",
//     password: "",
//     password_confirmation: "",
//   };

//   const methods = useForm({
//     resolver: zodResolver(SignUpSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       setErrorMessage("");

//       const response = await signUp(data);

//       if (response.success && response.customer && response.token) {
//         dispatch(
//           setUser({
//             customer: response.customer,
//             token: response.token,
//             token_type: response.token_type,
//           })
//         );

//         if (items?.length > 0) {
//           await addProductToCart(items, response.token);
//         }

//         reset();

//         toast.success(
//           response.message ||
//           "Registration successful! Please verify your email to access full features."
//         );

//         setRegisteredEmail(data.email);
//         setIsEmailVerificationPending(true);

//         setTimeout(() => {
//           router.push(paths.home);
//         }, 2000);
//       }
//     } catch (error) {
//       if (error?.email) {
//         setErrorMessage(error.email[0]);
//       } else if (error?.phone_number) {
//         setErrorMessage(error.phone_number[0]);
//       } else if (error?.password) {
//         setErrorMessage(error.password[0]);
//       } else if (error?.message) {
//         setErrorMessage(error.message);
//       } else {
//         setErrorMessage("Oops! Something went wrong. Please try again");
//       }
//     }
//   });

//   const renderForm = () => (
//     <div className="flex flex-col gap-2">
//       {/* Name + Phone row */}
//       <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
//         <Field.Text
//           name="name"
//           label="Name"
//           slotProps={{ inputLabel: { shrink: true } }}
//         />
//         <Field.Text
//           name="phone_number"
//           label="Phone Number"
//           slotProps={{ inputLabel: { shrink: true } }}
//         />
//       </div>

//       <Field.Text
//         name="email"
//         label="Email address"
//         slotProps={{ inputLabel: { shrink: true } }}
//       />

//       {/* Password */}
//       <Field.Text
//         name="password"
//         label="Password"
//         type={showPassword.value ? "text" : "password"}
//         slotProps={{
//           inputLabel: { shrink: true },
//           input: {
//             endAdornment: (
//               <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                 <button
//                   type="button"
//                   onClick={showPassword.onToggle}
//                   className="p-1 rounded text-gray-500 hover:text-gray-700 focus:outline-none"
//                 >
//                   <Iconify
//                     icon={showPassword.value ? "solar:eye-bold" : "solar:eye-closed-bold"}
//                   />
//                 </button>
//               </div>
//             ),
//           },
//         }}
//       />

//       {/* Confirm Password */}
//       <Field.Text
//         name="password_confirmation"
//         label="Confirm Password"
//         type={showConfirmPassword.value ? "text" : "password"}
//         slotProps={{
//           inputLabel: { shrink: true },
//           input: {
//             endAdornment: (
//               <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                 <button
//                   type="button"
//                   onClick={showConfirmPassword.onToggle}
//                   className="p-1 rounded text-gray-500 hover:text-gray-700 focus:outline-none"
//                 >
//                   <Iconify
//                     icon={
//                       showConfirmPassword.value
//                         ? "solar:eye-bold"
//                         : "solar:eye-closed-bold"
//                     }
//                   />
//                 </button>
//               </div>
//             ),
//           },
//         }}
//       />

//       {/* Submit button */}
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full py-2 px-2 bg-gray-900 text-white text-sm font-semibold  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
//       >
//         {isSubmitting ? (
//           <>
//             <Iconify icon="svg-spinners:8-dots-rotate" className="w-4 h-4" />
//             Create account...
//           </>
//         ) : (
//           "Create account"
//         )}
//       </button>
//     </div>
//   );

//   const renderEmailVerificationPending = () => (
//     <div className="text-center py-3">
//       <Iconify
//         icon="eva:email-outline"
//         className="mx-auto mb-6 text-primary-600"
//         style={{ width: 64, height: 64 }}
//       />

//       <h2 className="text-2xl font-bold text-gray-900 mb-3">
//         Verify your email
//       </h2>

//       <p className="text-sm text-gray-500 mb-1">
//         We've sent a verification link to
//       </p>

//       <p className="text-base font-semibold text-gray-800 mb-4">
//         {registeredEmail}
//       </p>

//       <p className="text-sm text-gray-500 mb-6">
//         Please check your email and click on the verification link to activate
//         your account.
//       </p>

//       <div className="flex flex-col gap-3">
//         <RouterLink
//           href={paths.auth.signIn}
//           className="w-full py-3 px-4 bg-gray-900 text-white text-sm font-semibold  hover:bg-gray-700 text-center transition-colors duration-200"
//         >
//           Go to Login
//         </RouterLink>

//         <p className="text-xs text-gray-400">
//           Didn't receive the email? Check your spam folder.
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div className="container mx-auto max-w-screen-xl mt-10 mb-10 px-4">
//         <main className="flex justify-center items-center">
//           {isEmailVerificationPending ? (
//             <div className="w-full max-w-[500px]">
//               <AnimateLogoRotate className="mx-auto" />
//               {renderEmailVerificationPending()}
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2 w-full max-w-[420px]">
//               <AnimateLogoRotate className="mx-auto" />

//               <FormHead
//                 title="Create new account"
//                 description={
//                   <>
//                     {`Already have an account? `}
//                     <RouterLink
//                       href={paths.auth.signIn}
//                       className="text-sm font-semibold text-gray-900 hover:underline"
//                     >
//                       Get started
//                     </RouterLink>
//                   </>
//                 }
//                 sx={{ textAlign: { xs: "center", md: "left" }, mb: 2 }}
//               />

//               {!!errorMessage && (
//                 <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 ">
//                   <Iconify
//                     icon="mdi:alert-circle-outline"
//                     className="w-5 h-5 mt-0.5 shrink-0"
//                   />
//                   <span>{errorMessage}</span>
//                 </div>
//               )}

//               <Form methods={methods} onSubmit={onSubmit}>
//                 {renderForm()}
//               </Form>

//               {vendor?.has_oauth && (
//                 <>
//                   {/* Divider */}
//                   <div className="flex items-center gap-3">
//                     <div className="flex-1 border-t border-dashed border-gray-300" />
//                     <span className="text-xs text-gray-400">or</span>
//                     <div className="flex-1 border-t border-dashed border-gray-300" />
//                   </div>

//                   <GoogleAuth type="Sign up" />
//                 </>
//               )}

//               <SignUpTerms />
//             </div>
//           )}
//         </main>
//       </div>

//       <AddressNewForm
//         open={showAddressForm.value}
//         onClose={() => {
//           showAddressForm.onFalse();
//           router.push(paths.home);
//         }}
//         states={states}
//       />
//     </>
//   );
// }

"use client";

import { z as zod } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { Form, Field } from "@/components/hook-form";
import { AnimateLogoRotate } from "@/components/animate";
import { toast } from "@/components/snackbar";

import { FormHead } from "../components/form-head";
import { SignUpTerms } from "../components/sign-up-terms";
import { GoogleAuth } from "../components/google-auth";

import { AddressNewForm } from "@/sections/address";

import { addProductToCart, signUp, useGetStates } from "@/api";

// ----------------------------------------------------------------------

export const SignUpSchema = zod
  .object({
    name: zod.string().min(1, { message: "Name is required!" }),

    phone_number: zod
      .string()
      .min(1, { message: "Phone number is required!" })
      .regex(/^\d{10}$/, {
        message: "Phone number must be exactly 10 digits!",
      }),

    email: zod
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email must be a valid email address!" }),

    password: zod
      .string()
      .min(1, { message: "Password is required!" })
      .min(8, { message: "Password must be at least 8 characters!" }),

    password_confirmation: zod
      .string()
      .min(1, { message: "Confirm password is required!" })
      .min(8, { message: "Confirm password must be at least 8 characters!" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match!",
    path: ["password_confirmation"],
  });

// ----------------------------------------------------------------------

const btnPrimaryStyle = {
  width: "100%",
  padding: "0.875rem 1.5rem",
  backgroundColor: "#000000",
  color: "#ffffff",
  fontFamily: "Helvetica",
  fontSize: "11px",
  letterSpacing: "0.12em",
  fontWeight: 600,
  textTransform: "uppercase",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "background-color 200ms ease",
};

const btnSecondaryStyle = {
  width: "100%",
  padding: "0.75rem 1.5rem",
  backgroundColor: "transparent",
  color: "#1a1c1c",
  fontFamily: "Helvetica",
  fontSize: "11px",
  letterSpacing: "0.12em",
  fontWeight: 600,
  textTransform: "uppercase",
  border: "1px solid #e2e2e2",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "border-color 200ms ease, background-color 200ms ease",
};

const eyebrowWrapStyle = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" };

const eyebrowDashStyle = { display: "inline-block", width: "20px", height: "2px", backgroundColor: "#E60012" };

const eyebrowTextStyle = {
  fontFamily: "Helvetica",
  fontSize: "10px",
  letterSpacing: "0.2em",
  fontWeight: 600,
  color: "#E60012",
  textTransform: "uppercase",
};

// ----------------------------------------------------------------------

export function SignUpView() {
  const vendor = useAppSelector((state) => state.vendor.vendor);
  const router = useRouter();

  const showPassword = useBoolean();
  const showConfirmPassword = useBoolean();
  const showAddressForm = useBoolean();

  const [isEmailVerificationPending, setIsEmailVerificationPending] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.cart);
  const { user, userToken } = useAppSelector((state) => state.auth);

  const [errorMessage, setErrorMessage] = useState("");

  // Redirect to profile if user is already logged in
  useEffect(() => {
    if (user?.customer?.id || userToken) {
      router.push(paths.profile.root);
    }
  }, [user, userToken, router]);

  const { states } = useGetStates();

  const defaultValues = {
    name: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMessage("");

      const response = await signUp(data);

      if (response.success && response.customer && response.token) {
        dispatch(
          setUser({
            customer: response.customer,
            token: response.token,
            token_type: response.token_type,
          })
        );

        if (items?.length > 0) {
          await addProductToCart(items, response.token);
        }

        reset();

        toast.success(
          response.message ||
          "Registration successful! Please verify your email to access full features."
        );

        setRegisteredEmail(data.email);
        setIsEmailVerificationPending(true);

        setTimeout(() => {
          router.push(paths.home);
        }, 2000);
      }
    } catch (error) {
      if (error?.email) {
        setErrorMessage(error.email[0]);
      } else if (error?.phone_number) {
        setErrorMessage(error.phone_number[0]);
      } else if (error?.password) {
        setErrorMessage(error.password[0]);
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Oops! Something went wrong. Please try again");
      }
    }
  });

  const renderForm = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Name + Phone row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
        <div className="w-full">
          <Field.Text
            name="name"
            label="Full name"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </div>
        <div className="w-full">
          <Field.Text
            name="phone_number"
            label="Phone number"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </div>
      </div>

      <Field.Text
        name="email"
        label="Email address"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      {/* Password */}
      <div style={{ position: "relative" }}>
        <Field.Text
          name="password"
          label="Password"
          type={showPassword.value ? "text" : "password"}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <button
          type="button"
          onClick={showPassword.onToggle}
          aria-label={showPassword.value ? "Hide password" : "Show password"}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            // transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#4c4546",
            display: "flex",
            padding: 0,
            zIndex: 10,
          }}
        >
          <Iconify icon={showPassword.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
        </button>
      </div>

      {/* Confirm Password */}
      <div style={{ position: "relative" }}>
        <Field.Text
          name="password_confirmation"
          label="Confirm password"
          type={showConfirmPassword.value ? "text" : "password"}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <button
          type="button"
          onClick={showConfirmPassword.onToggle}
          aria-label={showConfirmPassword.value ? "Hide password" : "Show password"}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            // transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#4c4546",
            display: "flex",
            padding: 0,
            zIndex: 10,
          }}
        >
          <Iconify
            icon={showConfirmPassword.value ? "solar:eye-bold" : "solar:eye-closed-bold"}
          />
        </button>
      </div>

      <p
        style={{
          fontFamily: "Hanken Grotesk, sans-serif",
          fontSize: "12px",
          color: "#4c4546",
          margin: "-0.25rem 0 0",
        }}
      >
        Use at least 8 characters, mixing letters and numbers.
      </p>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{ ...btnPrimaryStyle, opacity: isSubmitting ? 0.6 : 1 }}
        onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = "#E60012"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#000000"; }}
      >
        {isSubmitting ? (
          <>
            <Iconify icon="svg-spinners:8-dots-rotate" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </div>
  );

  const renderEmailVerificationPending = () => (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            border: "1px solid #e2e2e2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Iconify icon="solar:letter-unread-bold" width={26} style={{ color: "#E60012" }} />
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ ...eyebrowWrapStyle, justifyContent: "center" }}>
          <span style={eyebrowDashStyle} />
          <span style={eyebrowTextStyle}>Verification</span>
        </div>
        <h1
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "1.625rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#1a1c1c",
            margin: 0,
          }}
        >
          Check your inbox.
        </h1>
        <p
          style={{
            fontFamily: "Hanken Grotesk, sans-serif",
            fontSize: "14px",
            color: "#4c4546",
            margin: "0.5rem 0 0",
          }}
        >
          We've sent a verification link to
        </p>
        <p
          style={{
            fontFamily: "Helvetica",
            fontSize: "12px",
            fontWeight: 700,
            color: "#1a1c1c",
            margin: "0.35rem 0 0",
            wordBreak: "break-all",
          }}
        >
          {registeredEmail}
        </p>
      </div>

      <p
        style={{
          fontFamily: "Hanken Grotesk, sans-serif",
          fontSize: "13px",
          color: "#4c4546",
          margin: "0 0 1.5rem",
        }}
      >
        Click the link in that email to activate your account. Didn't get it?
        Check your spam folder.
      </p>

      <RouterLink
        href={paths.auth.signIn}
        style={{ ...btnPrimaryStyle, textDecoration: "none" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E60012")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000000")}
      >
        Go to Login
      </RouterLink>
    </div>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9f9f9",
          position: "relative",
          overflow: "hidden",
        }}
        className="lg:py-20 py-10"
      >
        {/* Card */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "460px",
            backgroundColor: "#ffffff",
            border: "1px solid #e2e2e2",
          }}
        >
          <div className="lg:p-6 p-3">
            {/* Logo */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <AnimateLogoRotate />
            </div>

            {isEmailVerificationPending ? (
              renderEmailVerificationPending()
            ) : (
              <>
                {/* Heading */}
                <div style={{ marginBottom: "2rem" }}>
                  <div style={eyebrowWrapStyle}>
                    <span style={eyebrowDashStyle} />
                    <span style={eyebrowTextStyle}>Sign Up</span>
                  </div>
                  <h1
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "1.625rem",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "#1a1c1c",
                      margin: 0,
                    }}
                  >
                    Create your account.
                  </h1>
                  <p
                    style={{
                      fontFamily: "Hanken Grotesk, sans-serif",
                      fontSize: "14px",
                      color: "#4c4546",
                      margin: "0.35rem 0 0",
                    }}
                  >
                    Already have an account?{" "}
                    <RouterLink
                      href={paths.auth.signIn}
                      style={{
                        fontFamily: "Helvetica",
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "#E60012",
                        textDecoration: "none",
                      }}
                    >
                      Log In
                    </RouterLink>
                  </p>
                </div>

                {/* Error */}
                {!!errorMessage && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      backgroundColor: "rgba(230,0,18,0.06)",
                      border: "1px solid rgba(230,0,18,0.2)",
                      padding: "0.75rem 1rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <Iconify
                      icon="mdi:alert-circle-outline"
                      style={{ color: "#E60012", flexShrink: 0, marginTop: "1px" }}
                    />
                    <span style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "13px", color: "#E60012" }}>
                      {errorMessage}
                    </span>
                  </div>
                )}

                {/* Form */}
                <Form methods={methods} onSubmit={onSubmit}>
                  {renderForm()}
                </Form>

                {vendor?.has_oauth && (
                  <>
                    {/* Divider */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        margin: "1.25rem 0",
                      }}
                    >
                      <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e2e2" }} />
                      <span
                        style={{
                          fontFamily: "Helvetica",
                          fontSize: "10px",
                          letterSpacing: "0.1em",
                          color: "#4c4546",
                        }}
                      >
                        OR
                      </span>
                      <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e2e2" }} />
                    </div>

                    <GoogleAuth type="Sign up" />
                  </>
                )}

                <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #e2e2e2" }}>
                  <SignUpTerms />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <AddressNewForm
        open={showAddressForm.value}
        onClose={() => {
          showAddressForm.onFalse();
          router.push(paths.home);
        }}
        states={states}
      />
    </>
  );
}