// "use client";

// import { useState } from "react";

// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Button,
//     Box,
//     Typography,
//     Alert,
//     Stack,
//     Backdrop,
//     CircularProgress,
// } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";

// // ----------------------------------------------------------------------

// export function OtpVerificationDialog({
//     open,
//     onClose,
//     email,
//     expiryMinutes = 5,
//     onVerify,
//     isVerifying = false,
//     error = "",
// }) {
//     const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

//     const handleOtpChange = (index, value) => {
//         if (value && !/^[0-9]$/.test(value)) return;

//         const newOtpValues = [...otpValues];
//         newOtpValues[index] = value;
//         setOtpValues(newOtpValues);

//         // Auto-focus next input
//         if (value && index < 5) {
//             const nextInput = document.getElementById(`otp-input-${index + 1}`);
//             if (nextInput) nextInput.focus();
//         }
//     };

//     const handleOtpPaste = (e) => {
//         e.preventDefault();
//         const pastedData = e.clipboardData.getData("text").trim();

//         if (/^\d{6}$/.test(pastedData)) {
//             const newOtpValues = pastedData.split("");
//             setOtpValues(newOtpValues);

//             const lastInput = document.getElementById("otp-input-5");
//             if (lastInput) lastInput.focus();
//         }
//     };

//     const handleOtpKeyDown = (index, e) => {
//         if (e.key === "Backspace" && !otpValues[index] && index > 0) {
//             const prevInput = document.getElementById(`otp-input-${index - 1}`);
//             if (prevInput) prevInput.focus();
//         }
//     };

//     const handleVerifyClick = () => {
//         const otp = otpValues.join("");
//         if (otp.length === 6) {
//             onVerify(otp);
//         }
//     };

//     const handleClose = () => {
//         setOtpValues(["", "", "", "", "", ""]);
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//             <DialogTitle>
//                 <Box sx={{ textAlign: "center" }}>
//                     <Typography variant="h4">Verify OTP</Typography>
//                     <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
//                         Enter the 6-digit code sent to
//                     </Typography>
//                     <Typography variant="subtitle2" sx={{ color: "primary.main", mt: 0.5 }}>
//                         {email}
//                     </Typography>
//                     <Typography variant="caption" sx={{ color: "warning.main", mt: 0.5, display: "block" }}>
//                         OTP expires in {expiryMinutes} {expiryMinutes === 1 ? "minute" : "minutes"}
//                     </Typography>
//                 </Box>
//             </DialogTitle>

//             <DialogContent>
//                 <Stack spacing={3}>
//                     {error && <Alert severity="error">{error}</Alert>}

//                     <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", mt: 2 }}>
//                         {otpValues.map((value, index) => (
//                             <TextField
//                                 key={index}
//                                 id={`otp-input-${index}`}
//                                 value={value}
//                                 onChange={(e) => handleOtpChange(index, e.target.value)}
//                                 onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                                 onPaste={handleOtpPaste}
//                                 inputProps={{
//                                     maxLength: 1,
//                                     style: { textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" },
//                                 }}
//                                 sx={{ width: 56, "& input": { padding: "12px" } }}
//                                 autoFocus={index === 0}
//                             />
//                         ))}
//                     </Box>
//                 </Stack>
//             </DialogContent>

//             <DialogActions sx={{ px: 3, pb: 3, flexDirection: "column", gap: 1 }}>
//                 <LoadingButton
//                     fullWidth
//                     size="large"
//                     variant="contained"
//                     onClick={handleVerifyClick}
//                     loading={isVerifying}
//                     disabled={otpValues.join("").length !== 6}
//                 >
//                     Verify OTP & Complete Order
//                 </LoadingButton>
//                 <Button fullWidth size="large" variant="outlined" onClick={handleClose} disabled={isVerifying}>
//                     Cancel
//                 </Button>
//             </DialogActions>

//             {/* Backdrop loader during OTP verification */}
//             <Backdrop
//                 open={isVerifying}
//                 sx={{
//                     color: '#fff',
//                     zIndex: (theme) => theme.zIndex.modal + 1,
//                     position: 'absolute',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: 2,
//                 }}
//             >
//                 <CircularProgress color="inherit" size={60} />
//                 <Typography variant="h6">Verifying OTP...</Typography>
//             </Backdrop>
//         </Dialog>
//     );
// }
"use client";

import { useState, useEffect } from "react";

// ----------------------------------------------------------------------

export function OtpVerificationDialog({
    open,
    onClose,
    email,
    expiryMinutes = 5,
    onVerify,
    isVerifying = false,
    error = "",
}) {
    const [otpValues, setOtpValues] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const [timeLeft, setTimeLeft] = useState(expiryMinutes * 60);

    useEffect(() => {
        if (!open) return;
        setTimeLeft(expiryMinutes * 60);
    }, [open, expiryMinutes]);

    useEffect(() => {
        if (!open || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [open, timeLeft]);

    if (!open) return null;

    const handleChange = (index, value) => {
        if (value && !/^[0-9]$/.test(value)) return;

        const newOtp = [...otpValues];
        newOtp[index] = value;
        setOtpValues(newOtp);

        if (value && index < 5) {
            document
                .getElementById(`otp-${index + 1}`)
                ?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").trim();

        if (/^\d{6}$/.test(data)) {
            setOtpValues(data.split(""));
            document.getElementById("otp-5")?.focus();
        }
    };

    const handleBackspace = (index, e) => {
        if (
            e.key === "Backspace" &&
            !otpValues[index] &&
            index > 0
        ) {
            document
                .getElementById(`otp-${index - 1}`)
                ?.focus();
        }
    };

    const otp = otpValues.join("");

    const handleVerify = () => {
        if (otp.length === 6) onVerify(otp);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

            {/* CARD */}
            <div className="w-full max-w-md  bg-white shadow-2xl border border-gray-100">

                {/* HEADER */}
                <div className="text-center px-6 pt-6 pb-4 border-b border-gray-100">

                    <h2 className="text-xl font-semibold text-gray-900">
                        Verify OTP
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Enter the 6-digit code sent to
                    </p>

                    <p className="text-sm font-medium text-purple-700 mt-1">
                        {email}
                    </p>

                    <p className="text-xs text-purple-500 mt-2">
                        {timeLeft > 0
                            ? `OTP expires in: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, "0")}`
                            : "OTP has expired. Please submit the order again."
                        }
                    </p>
                </div>

                {/* BODY */}
                <div className="px-6 py-6 space-y-4">

                    {error && (
                        <div className=" bg-red-50 px-3 py-2 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* OTP BOXES */}
                    <div className="flex justify-center gap-2">
                        {otpValues.map((val, i) => (
                            <input
                                key={i}
                                id={`otp-${i}`}
                                value={val}
                                onChange={(e) =>
                                    handleChange(i, e.target.value)
                                }
                                onKeyDown={(e) => handleBackspace(i, e)}
                                onPaste={handlePaste}
                                maxLength={1}
                                className="
                  w-12 h-12 text-center text-lg font-bold
                  border border-gray-200 
                  outline-none transition
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                "
                            />
                        ))}
                    </div>

                    {/* VERIFY BUTTON (DARK PURPLE PRIMARY) */}
                    <button
                        onClick={handleVerify}
                        disabled={otp.length !== 6 || isVerifying}
                        className="
              w-full  py-3 text-white font-medium
              bg-purple-900 hover:bg-purple-800
              transition disabled:opacity-50 disabled:cursor-not-allowed
            "
                    >
                        {isVerifying ? "Verifying..." : "Verify OTP & Complete Order"}
                    </button>

                    {/* CANCEL BUTTON */}
                    <button
                        onClick={onClose}
                        disabled={isVerifying}
                        className="
              w-full  py-3 font-medium
              border border-gray-200 text-gray-700
              hover:bg-gray-50 transition
            "
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
}