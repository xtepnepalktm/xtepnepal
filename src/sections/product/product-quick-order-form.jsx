// "use client";

// import { z as zod } from "zod";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Stack,
//   Box,
//   Card,
//   Typography,
//   MenuItem,
//   Divider,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Backdrop,
//   CircularProgress,
// } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";

// import { paths } from "@/routes/paths";
// import { useRouter } from "@/routes/hooks";

// import { fCurrency } from "@/utils";

// import { Form, Field, schemaHelper } from "@/components/hook-form";
// import { NumberInput } from "@/components/number-input";
// import { toast } from "@/components/snackbar";
// import { Iconify } from "@/components/iconify";

// import { useAppDispatch } from "@/redux/hooks";
// import { setUser, getCartDataRequest } from "@/redux/actions";

// import { useGetStates, submitQuickOrder, verifyOtpAndCreateOrder, getLogisticCharge } from "@/api";

// // ----------------------------------------------------------------------

// export const QuickOrderSchema = zod.object({
//   customer_name: zod
//     .string()
//     .min(1, { message: "Name is required!" })
//     .max(255, { message: "Name cannot exceed 255 characters" }),

//   customer_email: zod
//     .string()
//     .min(1, { message: "Email is required!" })
//     .email({ message: "Email must be a valid email address!" }),

//   customer_contact_info: zod
//     .string()
//     .min(1, { message: "Contact number is required!" })
//     .regex(/^\d{10}$/, {
//       message: "Contact number must be exactly 10 digits!",
//     }),

//   password: zod
//     .string()
//     .optional()
//     .refine((val) => !val || val.length >= 8, {
//       message: "Password must be at least 8 characters!",
//     }),

//   state_id: schemaHelper.nullableInput(
//     zod.string().min(1, { message: "State is required!" }),
//     {
//       message: "State is required!",
//     }
//   ),

//   district_id: schemaHelper.nullableInput(
//     zod.string().min(1, { message: "District is required!" }),
//     {
//       message: "District is required!",
//     }
//   ),

//   address: zod
//     .string()
//     .min(1, { message: "Address is required!" })
//     .max(500, { message: "Address cannot exceed 500 characters" }),

//   discount_code: zod.string().optional(),

//   remarks: zod.string().max(1000, { message: "Remarks cannot exceed 1000 characters" }).optional(),
// });

// const rowStyles = {
//   display: "flex",
//   alignItems: "center",
// };

// // ----------------------------------------------------------------------

// export function ProductQuickOrderForm({ productId, price, selling_price }) {
//   const finalPrice = selling_price?.flashSalePrice || selling_price?.regularPrice || price;

//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const { states } = useGetStates();

//   const [districts, setDistricts] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [logisticCharge, setLogisticCharge] = useState(0);
//   const [errorMessage, setErrorMessage] = useState("");

//   // OTP Dialog State
//   const [otpDialogOpen, setOtpDialogOpen] = useState(false);
//   const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
//   const [userEmail, setUserEmail] = useState("");
//   const [orderPreview, setOrderPreview] = useState(null);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [otpExpiryMinutes, setOtpExpiryMinutes] = useState(5);

//   const defaultValues = {
//     customer_name: "",
//     customer_contact_info: "",
//     customer_email: "",
//     password: "",
//     state_id: "",
//     district_id: "",
//     address: "",
//     discount_code: "",
//     remarks: "",
//   };

//   const methods = useForm({
//     resolver: zodResolver(QuickOrderSchema),
//     defaultValues,
//   });

//   const {
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = methods;

//   const subtotal = quantity * Number(finalPrice);
//   const totalAmount = logisticCharge + subtotal;

//   const handleSelectState = (stateDistricts) => {
//     setDistricts(stateDistricts);
//   };

//   const handleSelectDistrict = async (districtId) => {
//     try {
//       const charge = await getLogisticCharge(districtId);
//       setLogisticCharge(charge.charge_amount);
//     } catch (error) {
//       toast.error("Couldn't select district! Try again.");
//     }
//   };

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       setErrorMessage("");

//       const orderData = {
//         customer_name: data.customer_name,
//         customer_email: data.customer_email,
//         customer_contact_info: data.customer_contact_info,
//         password: data.password || undefined,
//         state_id: parseInt(data.state_id),
//         district_id: parseInt(data.district_id),
//         address: data.address,
//         order_items: [
//           {
//             item_type: "Product",
//             item_id: productId,
//             quantity: quantity,
//             price: parseFloat(finalPrice),
//           },
//         ],
//         logistic_charge: logisticCharge,
//         discount_code: data.discount_code?.trim().toUpperCase() || undefined,
//         remarks: data.remarks || undefined,
//       };

//       const response = await submitQuickOrder(orderData);

//       if (response.success) {
//         // Check if OTP is required (existing customer)
//         if (response.data.requires_otp) {
//           // Scenario B: Existing customer - show OTP modal
//           setUserEmail(response.data.email);
//           setOrderPreview(response.data.order_preview);
//           setOtpExpiryMinutes(response.data.expires_in_minutes || 5);
//           setOtpDialogOpen(true);
//           toast.success(response.message || "OTP sent to your email!");
//         } else {
//           // Scenario A: New customer - order created, auto-login
//           handleOrderSuccess(response.data);
//         }
//       }
//     } catch (error) {
//       console.error("Quick order error:", error);
//       handleError(error);
//     }
//   });

//   const handleOrderSuccess = (data) => {
//     // Store authentication token
//     dispatch(setUser(data));

//     // Refresh cart from server
//     dispatch(getCartDataRequest());

//     reset();
//     setQuantity(1);
//     setLogisticCharge(0);
//     setDistricts([]);

//     toast.success("Order placed successfully! You are now logged in.");

//     // Redirect to order details
//     setTimeout(() => {
//       router.push(paths.order.details(data.order.order_id));
//     }, 2000);
//   };

//   const handleError = (error) => {
//     if (error?.status === 422 || error?.status === 400) {
//       // Validation errors
//       if (error?.message && typeof error.message === "object") {
//         const errorMessages = Object.values(error.message)
//           .flat()
//           .filter((msg) => typeof msg === "string");
//         setErrorMessage(errorMessages.join(", "));
//       } else if (error?.errors && typeof error.errors === "object") {
//         const errorMessages = Object.values(error.errors)
//           .flat()
//           .filter((msg) => typeof msg === "string");
//         setErrorMessage(errorMessages.join(", "));
//       } else if (error?.message && typeof error.message === "string") {
//         setErrorMessage(error.message);
//       } else {
//         setErrorMessage("Please check your form inputs and try again.");
//       }
//     } else if (error?.message && typeof error.message === "string") {
//       setErrorMessage(error.message);
//     } else {
//       setErrorMessage("An unexpected error occurred. Please try again.");
//     }
//   };

//   // OTP Handlers
//   const handleOtpChange = (index, value) => {
//     if (value && !/^[0-9]$/.test(value)) return;

//     const newOtpValues = [...otpValues];
//     newOtpValues[index] = value;
//     setOtpValues(newOtpValues);

//     if (value && index < 5) {
//       const nextInput = document.getElementById(`otp-input-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleOtpPaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").trim();

//     if (/^\d{6}$/.test(pastedData)) {
//       const newOtpValues = pastedData.split("");
//       setOtpValues(newOtpValues);

//       const lastInput = document.getElementById("otp-input-5");
//       if (lastInput) lastInput.focus();
//     }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otpValues[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-input-${index - 1}`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       setIsVerifying(true);
//       setErrorMessage("");

//       const otp = otpValues.join("");
//       if (otp.length !== 6) {
//         toast.error("Please enter complete 6-digit OTP");
//         return;
//       }

//       if (!orderPreview) {
//         toast.error("Order data not found. Please try again.");
//         return;
//       }

//       const verifyData = {
//         email: userEmail,
//         otp_code: otp,
//         ...orderPreview,
//       };

//       const response = await verifyOtpAndCreateOrder(verifyData);

//       if (response.success) {
//         setOtpDialogOpen(false);
//         setOtpValues(["", "", "", "", "", ""]);
//         handleOrderSuccess(response.data);
//       }
//     } catch (error) {
//       console.error("OTP verification error:", error);

//       if (error?.status === 422 || error?.status === 400) {
//         if (error?.message && typeof error.message === "object") {
//           const errorMessages = Object.values(error.message)
//             .flat()
//             .filter((msg) => typeof msg === "string");
//           setErrorMessage(errorMessages.join(", "));
//         } else if (error?.message && typeof error.message === "string") {
//           setErrorMessage(error.message);
//         } else {
//           setErrorMessage("Invalid OTP. Please try again.");
//         }
//       } else if (error?.message && typeof error.message === "string") {
//         setErrorMessage(error.message);
//       } else {
//         setErrorMessage("Invalid OTP. Please try again.");
//       }
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const handleCloseOtpDialog = () => {
//     setOtpDialogOpen(false);
//     setOtpValues(["", "", "", "", "", ""]);
//     setErrorMessage("");
//     setOrderPreview(null);
//   };

//   const renderForm = () => (
//     <Card>
//       <Stack spacing={3} sx={{ p: 3 }}>
//         <Typography variant="h6">Customer Information</Typography>

//         {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}

//         <Field.Text name="customer_name" label="Full Name" />

//         <Box
//           sx={{
//             display: "flex",
//             gap: { xs: 3, sm: 2 },
//             flexDirection: { xs: "column", sm: "row" },
//           }}
//         >
//           <Field.Text name="customer_email" label="Email Address" type="email" />
//           <Field.Text name="customer_contact_info" label="Phone Number" />
//         </Box>

//         <Field.Text
//           name="password"
//           label="Password (for new customers)"
//           type="password"
//           helperText="Required only for first-time customers"
//         />

//         <Divider sx={{ my: 2 }} />

//         <Typography variant="h6">Delivery Address</Typography>

//         <Box
//           sx={{
//             display: "flex",
//             gap: { xs: 3, sm: 2 },
//             flexDirection: { xs: "column", sm: "row" },
//           }}
//         >
//           <Field.Select name="state_id" label="State" placeholder="Choose a state">
//             <MenuItem value="" sx={{ fontStyle: "italic", color: "text.secondary" }}>
//               None
//             </MenuItem>
//             <Divider sx={{ borderStyle: "dashed" }} />
//             {states?.map(({ state_id, state_name, districts }) => (
//               <MenuItem
//                 key={state_id}
//                 value={String(state_id)}
//                 onClick={() => handleSelectState(districts)}
//               >
//                 {state_name}
//               </MenuItem>
//             ))}
//           </Field.Select>

//           <Field.Select name="district_id" label="District" placeholder="Choose a district">
//             <MenuItem value="" sx={{ fontStyle: "italic", color: "text.secondary" }}>
//               None
//             </MenuItem>
//             <Divider sx={{ borderStyle: "dashed" }} />
//             {districts?.map(({ district_id, district_name }) => (
//               <MenuItem
//                 key={district_id}
//                 value={String(district_id)}
//                 onClick={() => handleSelectDistrict(district_id)}
//               >
//                 {district_name}
//               </MenuItem>
//             ))}
//           </Field.Select>
//         </Box>

//         <Field.Text name="address" label="Detailed Address" multiline rows={2} />

//         <Divider sx={{ my: 2 }} />

//         <Typography variant="h6">Additional Information</Typography>

//         <Field.Text
//           name="discount_code"
//           label="Discount Code (optional)"
//           placeholder="Enter discount code"
//         />

//         <Field.Text
//           name="remarks"
//           label="Special Instructions (optional)"
//           placeholder="e.g., Please deliver in the morning"
//           multiline
//           rows={3}
//         />
//       </Stack>
//     </Card>
//   );

//   const renderSummary = () => (
//     <Card>
//       <Stack spacing={3} sx={{ p: 3 }}>
//         <Typography variant="h6">Order Summary</Typography>

//         <Box sx={{ ...rowStyles }}>
//           <Box
//             sx={{
//               gap: 1,
//               display: "flex",
//               alignItems: "center",
//               flexGrow: 1,
//             }}
//           >
//             <Typography component="span" variant="body2" sx={{ color: "text.secondary" }}>
//               Quantity
//             </Typography>

//             <NumberInput
//               hideDivider
//               value={quantity}
//               onChange={(event, qty) => setQuantity(qty)}
//               min={1}
//               max={100}
//               sx={{ maxWidth: 112 }}
//             />
//           </Box>

//           <Typography component="span" variant="subtitle2">
//             {fCurrency(subtotal)}
//           </Typography>
//         </Box>

//         <Box sx={{ ...rowStyles }}>
//           <Typography component="span" variant="body2" sx={{ flexGrow: 1, color: "text.secondary" }}>
//             Shipping
//           </Typography>

//           <Typography component="span" variant="subtitle2">
//             {logisticCharge ? fCurrency(logisticCharge) : "Free"}
//           </Typography>
//         </Box>

//         <Divider sx={{ borderStyle: "dashed" }} />

//         <Box sx={{ ...rowStyles }}>
//           <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
//             Total
//           </Typography>

//           <Typography component="span" variant="subtitle1" sx={{ display: "block", color: "error.main" }}>
//             {fCurrency(totalAmount)}
//           </Typography>
//         </Box>

//         <LoadingButton
//           fullWidth
//           color="inherit"
//           size="large"
//           type="submit"
//           variant="contained"
//           loading={isSubmitting}
//           loadingIndicator="Placing order..."
//         >
//           Place Order
//         </LoadingButton>
//       </Stack>
//     </Card>
//   );

//   const renderOtpDialog = () => (
//     <Dialog open={otpDialogOpen} onClose={handleCloseOtpDialog} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         <Box sx={{ textAlign: "center" }}>
//           <Typography variant="h4">Verify OTP</Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
//             Enter the 6-digit code sent to {userEmail}
//           </Typography>
//           <Typography variant="caption" sx={{ color: "warning.main", mt: 0.5, display: "block" }}>
//             OTP expires in {otpExpiryMinutes} {otpExpiryMinutes === 1 ? "minute" : "minutes"}
//           </Typography>
//         </Box>
//       </DialogTitle>
//       <DialogContent>
//         {!!errorMessage && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {errorMessage}
//           </Alert>
//         )}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 1.5,
//             justifyContent: "center",
//             mt: 2,
//           }}
//         >
//           {otpValues.map((value, index) => (
//             <TextField
//               key={index}
//               id={`otp-input-${index}`}
//               value={value}
//               onChange={(e) => handleOtpChange(index, e.target.value)}
//               onKeyDown={(e) => handleOtpKeyDown(index, e)}
//               onPaste={handleOtpPaste}
//               inputProps={{
//                 maxLength: 1,
//                 style: {
//                   textAlign: "center",
//                   fontSize: "1.5rem",
//                   fontWeight: "bold",
//                 },
//               }}
//               sx={{
//                 width: 56,
//                 "& input": {
//                   padding: "12px",
//                 },
//               }}
//               autoFocus={index === 0}
//             />
//           ))}
//         </Box>
//       </DialogContent>
//       <DialogActions sx={{ px: 3, pb: 3, flexDirection: "column", gap: 1 }}>
//         <LoadingButton
//           fullWidth
//           size="large"
//           variant="contained"
//           color="inherit"
//           onClick={handleVerifyOtp}
//           loading={isVerifying}
//           loadingIndicator="Verifying..."
//         >
//           Verify OTP & Complete Order
//         </LoadingButton>
//         <Button fullWidth size="large" variant="outlined" onClick={handleCloseOtpDialog}>
//           Cancel
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

//   return (
//     <>
//       <Form methods={methods} onSubmit={onSubmit}>
//         <Stack spacing={3}>
//           {renderForm()}
//           {renderSummary()}
//         </Stack>
//       </Form>

//       {renderOtpDialog()}

//       {/* Full page loader during order creation */}
//       <Backdrop
//         open={isSubmitting}
//         sx={{
//           color: '#fff',
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//         }}
//       >
//         <CircularProgress color="inherit" size={60} />
//         <Typography variant="h6">Creating your order...</Typography>
//       </Backdrop>
//     </>
//   );
// }
"use client";

import { z as zod } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { fCurrency } from "@/utils";

import { Form, Field, schemaHelper } from "@/components/hook-form";
import { NumberInput } from "@/components/number-input";
import { toast } from "@/components/snackbar";

import { useAppDispatch } from "@/redux/hooks";
import { setUser, getCartDataRequest } from "@/redux/actions";

import {
  useGetStates,
  submitQuickOrder,
  verifyOtpAndCreateOrder,
  getLogisticCharge,
} from "@/api";

// ----------------------------------------------------------------------

export const QuickOrderSchema = zod.object({
  customer_name: zod
    .string()
    .min(1, { message: "Name is required!" })
    .max(255, { message: "Name cannot exceed 255 characters" }),

  customer_email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),

  customer_contact_info: zod
    .string()
    .min(1, { message: "Contact number is required!" })
    .regex(/^\d{10}$/, {
      message: "Contact number must be exactly 10 digits!",
    }),

  password: zod
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters!",
    }),

  state_id: schemaHelper.nullableInput(
    zod.string().min(1, { message: "State is required!" }),
    {
      message: "State is required!",
    }
  ),

  district_id: schemaHelper.nullableInput(
    zod.string().min(1, { message: "District is required!" }),
    {
      message: "District is required!",
    }
  ),

  address: zod
    .string()
    .min(1, { message: "Address is required!" })
    .max(500, { message: "Address cannot exceed 500 characters" }),

  discount_code: zod.string().optional(),

  remarks: zod
    .string()
    .max(1000, { message: "Remarks cannot exceed 1000 characters" })
    .optional(),
});

// ----------------------------------------------------------------------

export function ProductQuickOrderForm({
  productId,
  price,
  selling_price,
}) {
  const finalPrice =
    selling_price?.flashSalePrice ||
    selling_price?.regularPrice ||
    price;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { states } = useGetStates();

  const [districts, setDistricts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [logisticCharge, setLogisticCharge] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // OTP
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpValues, setOtpValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [userEmail, setUserEmail] = useState("");
  const [orderPreview, setOrderPreview] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpExpiryMinutes, setOtpExpiryMinutes] = useState(5);

  const defaultValues = {
    customer_name: "",
    customer_contact_info: "",
    customer_email: "",
    password: "",
    state_id: "",
    district_id: "",
    address: "",
    discount_code: "",
    remarks: "",
  };

  const methods = useForm({
    resolver: zodResolver(QuickOrderSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const subtotal = quantity * Number(finalPrice);
  const totalAmount = logisticCharge + subtotal;

  // ----------------------------------------------------------------------

  const handleSelectState = (stateDistricts) => {
    setDistricts(stateDistricts);
  };

  const handleSelectDistrict = async (districtId) => {
    try {
      const charge = await getLogisticCharge(districtId);
      setLogisticCharge(charge.charge_amount);
    } catch (error) {
      toast.error("Couldn't select district! Try again.");
    }
  };

  // ----------------------------------------------------------------------

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMessage("");

      const orderData = {
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_contact_info: data.customer_contact_info,
        password: data.password || undefined,
        state_id: parseInt(data.state_id),
        district_id: parseInt(data.district_id),
        address: data.address,
        order_items: [
          {
            item_type: "Product",
            item_id: productId,
            quantity,
            price: parseFloat(finalPrice),
          },
        ],
        logistic_charge: logisticCharge,
        discount_code:
          data.discount_code?.trim().toUpperCase() || undefined,
        remarks: data.remarks || undefined,
      };

      const response = await submitQuickOrder(orderData);

      if (response.success) {
        if (response.data.requires_otp) {
          setUserEmail(response.data.email);
          setOrderPreview(response.data.order_preview);
          setOtpExpiryMinutes(
            response.data.expires_in_minutes || 5
          );

          setOtpDialogOpen(true);

          toast.success(
            response.message || "OTP sent to your email!"
          );
        } else {
          handleOrderSuccess(response.data);
        }
      }
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  });

  // ----------------------------------------------------------------------

  const handleOrderSuccess = (data) => {
    dispatch(setUser(data));

    dispatch(getCartDataRequest());

    reset();

    setQuantity(1);
    setLogisticCharge(0);
    setDistricts([]);

    toast.success(
      "Order placed successfully! You are now logged in."
    );

    setTimeout(() => {
      router.push(paths.order.details(data.order.order_id));
    }, 2000);
  };

  // ----------------------------------------------------------------------

  const handleError = (error) => {
    if (error?.message && typeof error.message === "string") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(
        "An unexpected error occurred. Please try again."
      );
    }
  };

  // ----------------------------------------------------------------------
  // OTP

  const handleOtpChange = (index, value) => {
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    setOtpValues(newOtpValues);

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-input-${index + 1}`
      );

      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pastedData)) {
      setOtpValues(pastedData.split(""));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otpValues[index] &&
      index > 0
    ) {
      const prevInput = document.getElementById(
        `otp-input-${index - 1}`
      );

      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsVerifying(true);

      const otp = otpValues.join("");

      if (otp.length !== 6) {
        toast.error("Please enter complete 6-digit OTP");
        return;
      }

      const verifyData = {
        email: userEmail,
        otp_code: otp,
        ...orderPreview,
      };

      const response = await verifyOtpAndCreateOrder(
        verifyData
      );

      if (response.success) {
        setOtpDialogOpen(false);

        setOtpValues(["", "", "", "", "", ""]);

        handleOrderSuccess(response.data);
      }
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCloseOtpDialog = () => {
    setOtpDialogOpen(false);

    setOtpValues(["", "", "", "", "", ""]);

    setErrorMessage("");
    setOrderPreview(null);
  };

  // ----------------------------------------------------------------------

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="space-y-6">

          {/* FORM */}
          <div className=" border border-gray-200 bg-white shadow-sm">
            <div className="space-y-6 p-6">

              <h2 className="text-xl font-semibold text-gray-900">
                Customer Information
              </h2>

              {!!errorMessage && (
                <div className=" border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errorMessage}
                </div>
              )}

              <Field.Text
                name="customer_name"
                label="Full Name"
              />

              <div className="flex flex-col gap-4 sm:flex-row">
                <Field.Text
                  name="customer_email"
                  label="Email Address"
                  type="email"
                />

                <Field.Text
                  name="customer_contact_info"
                  label="Phone Number"
                />
              </div>

              <Field.Text
                name="password"
                label="Password (for new customers)"
                type="password"
                helperText="Required only for first-time customers"
              />

              <div className="border-t border-dashed border-gray-300" />

              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Address
              </h2>

              <div className="flex flex-col gap-4 sm:flex-row">

                {/* STATE */}
                <Field.Select
                  name="state_id"
                  label="State"
                >
                  <option value="">Choose State</option>

                  {states?.map(
                    ({ state_id, state_name, districts }) => (
                      <option
                        key={state_id}
                        value={String(state_id)}
                        onClick={() =>
                          handleSelectState(districts)
                        }
                      >
                        {state_name}
                      </option>
                    )
                  )}
                </Field.Select>

                {/* DISTRICT */}
                <Field.Select
                  name="district_id"
                  label="District"
                >
                  <option value="">Choose District</option>

                  {districts?.map(
                    ({ district_id, district_name }) => (
                      <option
                        key={district_id}
                        value={String(district_id)}
                        onClick={() =>
                          handleSelectDistrict(district_id)
                        }
                      >
                        {district_name}
                      </option>
                    )
                  )}
                </Field.Select>
              </div>

              <Field.Text
                name="address"
                label="Detailed Address"
                multiline
                rows={3}
              />

              <div className="border-t border-dashed border-gray-300" />

              <h2 className="text-xl font-semibold text-gray-900">
                Additional Information
              </h2>

              <Field.Text
                name="discount_code"
                label="Discount Code"
              />

              <Field.Text
                name="remarks"
                label="Special Instructions"
                multiline
                rows={3}
              />
            </div>
          </div>

          {/* SUMMARY */}
          <div className=" border border-gray-200 bg-white shadow-sm">
            <div className="space-y-5 p-6">

              <h2 className="text-xl font-semibold text-gray-900">
                Order Summary
              </h2>

              <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center gap-3">
                  <span className="text-sm text-gray-500">
                    Quantity
                  </span>

                  <NumberInput
                    hideDivider
                    value={quantity}
                    onChange={(event, qty) =>
                      setQuantity(qty)
                    }
                    min={1}
                    max={100}
                    className="max-w-[120px]"
                  />
                </div>

                <span className="font-semibold">
                  {fCurrency(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Shipping
                </span>

                <span className="font-semibold">
                  {logisticCharge
                    ? fCurrency(logisticCharge)
                    : "Free"}
                </span>
              </div>

              <div className="border-t border-dashed border-gray-300" />

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold text-red-500">
                  {fCurrency(totalAmount)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center  bg-black text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? "Placing order..."
                  : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </Form>

      {/* OTP MODAL */}
      {otpDialogOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md  bg-white p-6 shadow-2xl">

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Verify OTP
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Enter the 6-digit code sent to
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {userEmail}
              </p>

              <p className="mt-2 text-xs text-orange-500">
                OTP expires in {otpExpiryMinutes} minutes
              </p>
            </div>

            {!!errorMessage && (
              <div className="mt-4  border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            <div className="mt-6 flex justify-center gap-2">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={value}
                  maxLength={1}
                  onPaste={handleOtpPaste}
                  onKeyDown={(e) =>
                    handleOtpKeyDown(index, e)
                  }
                  onChange={(e) =>
                    handleOtpChange(index, e.target.value)
                  }
                  className="h-14 w-12  border border-gray-300 text-center text-xl font-bold outline-none transition focus:border-black"
                />
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">

              <button
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className="flex h-12 items-center justify-center  bg-black font-semibold text-white transition hover:bg-gray-800"
              >
                {isVerifying
                  ? "Verifying..."
                  : "Verify OTP & Complete Order"}
              </button>

              <button
                onClick={handleCloseOtpDialog}
                className="h-12  border border-gray-300 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL PAGE LOADER */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-white border-t-transparent" />

          <p className="text-lg font-semibold text-white">
            Creating your order...
          </p>
        </div>
      )}
    </>
  );
}