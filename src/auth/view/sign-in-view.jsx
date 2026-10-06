"use client";

import { z as zod } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, getCartDataRequest } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { Form, Field } from "@/components/hook-form";
import { AnimateLogoRotate } from "@/components/animate";
import { toast } from "@/components/snackbar";

import { GoogleAuth } from "../components/google-auth";
import { syncCartToServer, signIn, requestOtp, verifyOtp, resendOtp } from "@/api";

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  email: zod.string().min(1, { message: "Email is required!" }).email({ message: "Email must be a valid email address!" }),
  password: zod.string().min(1, { message: "Password is required!" }).min(6, { message: "Password must be at least 6 characters!" }),
});

export const OtpSignInSchema = zod.object({
  email: zod.string().min(1, { message: "Email is required!" }).email({ message: "Email must be a valid email address!" }),
});

// ----------------------------------------------------------------------

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1px solid #e2e2e2",
  backgroundColor: "#ffffff",
  fontFamily: "Hanken Grotesk, sans-serif",
  fontSize: "14px",
  color: "#1a1c1c",
  outline: "none",
  transition: "border-color 200ms ease",
};

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

// ----------------------------------------------------------------------

export function SignInView() {
  const vendor = useAppSelector((state) => state.vendor.vendor);
  const router = useRouter();

  const showPassword = useBoolean();
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [userEmail, setUserEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [otpExpiryMinutes, setOtpExpiryMinutes] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { user, userToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.customer?.id || userToken) router.push(paths.profile.root);
  }, [user, userToken, router]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const methods = useForm({
    resolver: zodResolver(isOtpMode ? OtpSignInSchema : SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMessage("");
      if (isOtpMode) {
        const response = await requestOtp(data.email);
        if (response?.success && response?.data) {
          setOtpExpiryMinutes(response.data.expires_in_minutes || 5);
          toast.success(response.message || "OTP sent to your email!");
          setUserEmail(data.email);
          setOtpDialogOpen(true);
          setResendCountdown(60);
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
        return;
      }
      const user = await signIn(data);
      dispatch(setUser(user));
      if (items?.length > 0) {
        try {
          const { failed } = await syncCartToServer(items, user.token);
          if (failed.length > 0) {
            toast.error(
              `${failed.length} item(s) from your cart couldn't be added and were skipped.`
            );
          }
        } catch (e) {
          console.error(e);
        }
      }
      setTimeout(() => dispatch(getCartDataRequest()), 300);
      reset();
      toast.success("Login successful!");
      router.back();
    } catch (error) {
      const msg = error?.message;
      if (typeof msg === "object") setErrorMessage(Object.values(msg).flat().join(", "));
      else if (typeof msg === "string") setErrorMessage(msg);
      else setErrorMessage("Oops! Something went wrong. Please try again.");
    }
  });

  const handleOtpChange = (index, value) => {
    if (value && !/^[0-9]$/.test(value)) return;
    const next = [...otpValues];
    next[index] = value;
    setOtpValues(next);
    if (value && index < 5) document.getElementById(`otp-input-${index + 1}`)?.focus();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      setOtpValues(pasted.split(""));
      document.getElementById("otp-input-5")?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0)
      document.getElementById(`otp-input-${index - 1}`)?.focus();
  };

  const handleVerifyOtp = async () => {
    try {
      setIsVerifying(true);
      setErrorMessage("");
      const otp = otpValues.join("");
      if (otp.length !== 6) { toast.error("Please enter complete 6-digit OTP"); return; }
      const user = await verifyOtp(userEmail, otp);
      dispatch(setUser(user));
      if (items?.length > 0) {
        try {
          const { failed } = await syncCartToServer(items, user.token);
          if (failed.length > 0) {
            toast.error(
              `${failed.length} item(s) from your cart couldn't be added and were skipped.`
            );
          }
        } catch (e) {
          console.error(e);
        }
      }
      setTimeout(() => dispatch(getCartDataRequest()), 300);
      reset();
      setOtpDialogOpen(false);
      setOtpValues(["", "", "", "", "", ""]);
      toast.success("Login successful!");
      router.back();
    } catch (error) {
      const msg = error?.message;
      if (typeof msg === "string") setErrorMessage(msg);
      else setErrorMessage("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCloseOtpDialog = () => {
    setOtpDialogOpen(false);
    setOtpValues(["", "", "", "", "", ""]);
    setErrorMessage("");
    setResendCountdown(0);
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      setErrorMessage("");
      const response = await resendOtp(userEmail);
      if (response?.success) {
        setOtpExpiryMinutes(response.data?.expires_in_minutes || 5);
        toast.success(response.message || "OTP resent!");
        setOtpValues(["", "", "", "", "", ""]);
        setResendCountdown(60);
        document.getElementById("otp-input-0")?.focus();
      }
    } catch (error) {
      toast.error(error?.message || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
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
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e2e2",
        }}
      >
        <div className="lg:p-6 p-3">
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
            <AnimateLogoRotate />
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
              <span style={{ display: "inline-block", width: "20px", height: "2px", backgroundColor: "#E60012" }} />
              <span
                style={{
                  fontFamily: "Helvetica",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                  color: "#E60012",
                  textTransform: "uppercase",
                }}
              >
                {isOtpMode ? "OTP Login" : "Sign In"}
              </span>
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
              Welcome back.
            </h1>
            <p
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: "14px",
                color: "#4c4546",
                margin: "0.35rem 0 0",
              }}
            >
              Sign in to continue to your account.
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
              <Iconify icon="mdi:alert-circle-outline" style={{ color: "#E60012", flexShrink: 0, marginTop: "1px" }} />
              <span style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "13px", color: "#E60012" }}>
                {errorMessage}
              </span>
            </div>
          )}

          {/* Form */}
          <Form methods={methods} onSubmit={onSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Field.Text
                name="email"
                label="Email address"
                slotProps={{ inputLabel: { shrink: true } }}
              />

              {!isOtpMode && (
                // <div style={{ position: "relative" }}>
                //   <Field.Text
                //     name="password"
                //     label="Password"
                //     type={showPassword.value ? "text" : "password"}
                //     slotProps={{
                //       inputLabel: { shrink: true },
                //       input: {
                //         endAdornment: (
                //           <button
                //             type="button"
                //             onClick={showPassword.onToggle}
                //             style={{
                //               position: "absolute",
                //               right: "12px",
                //               top: "50%",
                //               transform: "translateY(-50%)",
                //               background: "none",
                //               border: "none",
                //               cursor: "pointer",
                //               color: "#4c4546",
                //               display: "flex",
                //               padding: 0,
                //               zIndex: 10,
                //             }}
                //           >
                //             <Iconify icon={showPassword.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
                //           </button>
                //         ),
                //       },
                //     }}
                //   />
                // </div>
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
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      // transform: "translateY(-50%)", // Centers it vertically
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
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ ...btnPrimaryStyle, opacity: isSubmitting ? 0.6 : 1 }}
                onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = "#E60012"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#000000"; }}
              >
                {isSubmitting ? (
                  <><Iconify icon="svg-spinners:8-dots-rotate" />{isOtpMode ? "Requesting..." : "Signing in..."}</>
                ) : (
                  isOtpMode ? "Request OTP" : "Sign In"
                )}
              </button>
            </div>
          </Form>

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

          {/* Toggle OTP / Password */}
          <button
            type="button"
            onClick={() => { setIsOtpMode(!isOtpMode); setErrorMessage(""); }}
            style={btnSecondaryStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#000000";
              e.currentTarget.style.backgroundColor = "#f9f9f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e2e2";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Iconify icon={isOtpMode ? "mdi:lock-outline" : "mdi:email-lock-outline"} />
            {isOtpMode ? "Sign In with Password" : "Sign In with OTP"}
          </button>

          {/* Google */}
          {vendor?.has_oauth && (
            <div style={{ marginTop: "0.75rem" }}>
              <GoogleAuth type="Sign in" />
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid #e2e2e2",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: "13px",
                color: "#4c4546",
              }}
            >
              Don't have an account?
            </span>
            <RouterLink
              href={paths.auth.signUp}
              style={{
                fontFamily: "Helvetica",
                fontSize: "11px",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "#E60012",
                textDecoration: "none",
                transition: "opacity 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Get Started →
            </RouterLink>
          </div>
        </div>
      </div>

      {/* ── OTP Dialog ── */}
      {otpDialogOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "1rem",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseOtpDialog(); }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              maxWidth: "400px",
              position: "relative",
            }}
          >
            {/* Top rule */}
            <div style={{ height: "3px", background: "linear-gradient(to right, #E60012, #D1FF00)" }} />

            <div style={{ padding: "2rem" }}>
              {/* Header */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "20px", height: "2px", backgroundColor: "#E60012" }} />
                  <span
                    style={{
                      fontFamily: "Helvetica",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      fontWeight: 600,
                      color: "#E60012",
                      textTransform: "uppercase",
                    }}
                  >
                    Verification
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "1.375rem",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "#1a1c1c",
                    margin: "0 0 0.35rem",
                  }}
                >
                  Enter OTP Code
                </h2>
                <p
                  style={{
                    fontFamily: "Hanken Grotesk, sans-serif",
                    fontSize: "13px",
                    color: "#4c4546",
                    margin: 0,
                  }}
                >
                  6-digit code sent to{" "}
                  <span style={{ fontWeight: 600, color: "#1a1c1c" }}>{userEmail}</span>
                </p>
                <p
                  style={{
                    fontFamily: "Helvetica",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    color: "#E60012",
                    marginTop: "0.35rem",
                  }}
                >
                  Expires in {otpExpiryMinutes} {otpExpiryMinutes === 1 ? "minute" : "minutes"}
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
                  <Iconify icon="mdi:alert-circle-outline" style={{ color: "#E60012", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "13px", color: "#E60012" }}>
                    {errorMessage}
                  </span>
                </div>
              )}

              {/* OTP inputs */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    autoFocus={index === 0}
                    style={{
                      width: "48px",
                      height: "56px",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 800,
                      border: value ? "1px solid #000000" : "1px solid #e2e2e2",
                      backgroundColor: value ? "#f9f9f9" : "#ffffff",
                      color: "#1a1c1c",
                      outline: "none",
                      transition: "border-color 150ms ease, background-color 150ms ease",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#000000")}
                    onBlur={(e) => { if (!value) e.currentTarget.style.borderColor = "#e2e2e2"; }}
                  />
                ))}
              </div>

              {/* Resend */}
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                {resendCountdown > 0 ? (
                  <p
                    style={{
                      fontFamily: "Hanken Grotesk, sans-serif",
                      fontSize: "13px",
                      color: "#4c4546",
                      margin: 0,
                    }}
                  >
                    Resend in{" "}
                    <span style={{ fontWeight: 700, color: "#1a1c1c" }}>{resendCountdown}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: isResending ? "not-allowed" : "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "Helvetica",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: "#4c4546",
                      opacity: isResending ? 0.5 : 1,
                      transition: "color 200ms ease",
                    }}
                    onMouseEnter={(e) => { if (!isResending) e.currentTarget.style.color = "#E60012"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#4c4546"; }}
                  >
                    <Iconify icon={isResending ? "svg-spinners:8-dots-rotate" : "mdi:email-fast-outline"} />
                    {isResending ? "Resending..." : "Resend OTP"}
                  </button>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isVerifying}
                  style={{ ...btnPrimaryStyle, opacity: isVerifying ? 0.6 : 1 }}
                  onMouseEnter={(e) => { if (!isVerifying) e.currentTarget.style.backgroundColor = "#E60012"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#000000"; }}
                >
                  {isVerifying ? (
                    <><Iconify icon="svg-spinners:8-dots-rotate" />Verifying...</>
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCloseOtpDialog}
                  style={btnSecondaryStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#000000";
                    e.currentTarget.style.backgroundColor = "#f9f9f9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e2e2";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}