"use client";

import { z as zod } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Box,
    Typography,
    MenuItem,
    Divider,
    Alert,
    TextField,
    Button,
    IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { fCurrency } from "@/utils";

import { Form, Field, schemaHelper } from "@/components/hook-form";
import { NumberInput } from "@/components/number-input";
import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";

import { useAppDispatch } from "@/redux/hooks";
import { setUser, getCartDataRequest } from "@/redux/actions";

import { useGetStates, submitQuickOrder, verifyOtpAndCreateOrder, getLogisticCharge } from "@/api";

// ----------------------------------------------------------------------

const QuickOrderSchema = zod.object({
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
        .regex(/^\d{10}$/, { message: "Contact number must be exactly 10 digits!" }),

    password: zod.string().optional(),

    state_id: schemaHelper.nullableInput(
        zod.string().min(1, { message: "State is required!" }),
        { message: "State is required!" }
    ),

    district_id: schemaHelper.nullableInput(
        zod.string().min(1, { message: "District is required!" }),
        { message: "District is required!" }
    ),

    address: zod
        .string()
        .min(1, { message: "Address is required!" })
        .max(500, { message: "Address cannot exceed 500 characters" }),

    discount_code: zod.string().optional(),
    remarks: zod.string().max(1000).optional(),
});

// ----------------------------------------------------------------------

export function ProductQuickOrderModal({ open, onClose, product }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { states } = useGetStates();

    const [districts, setDistricts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [logisticCharge, setLogisticCharge] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    // OTP State
    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const [userEmail, setUserEmail] = useState("");
    const [orderPreview, setOrderPreview] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [otpExpiryMinutes, setOtpExpiryMinutes] = useState(5);

    const finalPrice =
        product?.selling_price?.flashSalePrice ||
        product?.selling_price?.regularPrice ||
        product?.price;

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

    const handleClose = () => {
        reset();
        setQuantity(1);
        setLogisticCharge(0);
        setDistricts([]);
        setErrorMessage("");
        onClose();
    };

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
                        item_id: product.product_id,
                        quantity: quantity,
                        price: parseFloat(finalPrice),
                    },
                ],
                logistic_charge: logisticCharge,
                discount_code: data.discount_code?.trim().toUpperCase() || undefined,
                remarks: data.remarks || undefined,
            };

            const response = await submitQuickOrder(orderData);

            if (response.success) {
                if (response.data.requires_otp) {
                    setUserEmail(response.data.email);
                    setOrderPreview(response.data.order_preview);
                    setOtpExpiryMinutes(response.data.expires_in_minutes || 5);
                    setOtpDialogOpen(true);
                    toast.success(response.message || "OTP sent to your email!");
                } else {
                    handleOrderSuccess(response.data);
                }
            }
        } catch (error) {
            console.error("Quick order error:", error);
            handleError(error);
        }
    });

    const handleOrderSuccess = (data) => {
        dispatch(setUser(data));
        dispatch(getCartDataRequest());

        handleClose();
        toast.success("Order placed successfully! You are now logged in.");

        setTimeout(() => {
            router.push(paths.order.details(data.order.order_id));
        }, 2000);
    };

    const handleError = (error) => {
        if (error?.status === 422 || error?.status === 400) {
            if (error?.message && typeof error.message === "object") {
                const errorMessages = Object.values(error.message)
                    .flat()
                    .filter((msg) => typeof msg === "string");
                setErrorMessage(errorMessages.join(", "));
            } else if (error?.errors && typeof error.errors === "object") {
                const errorMessages = Object.values(error.errors)
                    .flat()
                    .filter((msg) => typeof msg === "string");
                setErrorMessage(errorMessages.join(", "));
            } else if (error?.message && typeof error.message === "string") {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Please check your form inputs and try again.");
            }
        } else if (error?.message && typeof error.message === "string") {
            setErrorMessage(error.message);
        } else {
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    // OTP Handlers
    const handleOtpChange = (index, value) => {
        if (value && !/^[0-9]$/.test(value)) return;

        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        if (value && index < 5) {
            const nextInput = document.getElementById(`quick-otp-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        if (/^\d{6}$/.test(pastedData)) {
            const newOtpValues = pastedData.split("");
            setOtpValues(newOtpValues);

            const lastInput = document.getElementById("quick-otp-input-5");
            if (lastInput) lastInput.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            const prevInput = document.getElementById(`quick-otp-input-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerifyOtp = async () => {
        try {
            setIsVerifying(true);
            setErrorMessage("");

            const otp = otpValues.join("");
            if (otp.length !== 6) {
                toast.error("Please enter complete 6-digit OTP");
                return;
            }

            if (!orderPreview) {
                toast.error("Order data not found. Please try again.");
                return;
            }

            const verifyData = {
                email: userEmail,
                otp_code: otp,
                ...orderPreview,
            };

            const response = await verifyOtpAndCreateOrder(verifyData);

            if (response.success) {
                setOtpDialogOpen(false);
                setOtpValues(["", "", "", "", "", ""]);
                handleOrderSuccess(response.data);
            }
        } catch (error) {
            console.error("OTP verification error:", error);

            if (error?.status === 422 || error?.status === 400) {
                if (error?.message && typeof error.message === "object") {
                    const errorMessages = Object.values(error.message)
                        .flat()
                        .filter((msg) => typeof msg === "string");
                    setErrorMessage(errorMessages.join(", "));
                } else if (error?.message && typeof error.message === "string") {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("Invalid OTP. Please try again.");
                }
            } else if (error?.message && typeof error.message === "string") {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Invalid OTP. Please try again.");
            }
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

    return (
        <>
            {/* Main Quick Order Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="h5">Quick Order - {product?.name}</Typography>
                        <IconButton onClick={handleClose} size="small">
                            <Iconify icon="mingcute:close-line" />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <Form methods={methods} onSubmit={onSubmit}>
                    <DialogContent dividers>
                        <Stack spacing={3}>
                            {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                            {/* Customer Info */}
                            <Box>
                                <Typography variant="subtitle1" gutterBottom>
                                    Customer Information
                                </Typography>
                                <Stack spacing={2}>
                                    <Field.Text name="customer_name" label="Full Name" size="small" />
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Field.Text name="customer_email" label="Email" type="email" size="small" />
                                        <Field.Text name="customer_contact_info" label="Phone" size="small" />
                                    </Box>
                                    <Field.Text
                                        name="password"
                                        label="Password (for new customers)"
                                        type="password"
                                        size="small"
                                        helperText="Required only for first-time customers"
                                    />
                                </Stack>
                            </Box>

                            <Divider />

                            {/* Delivery Address */}
                            <Box>
                                <Typography variant="subtitle1" gutterBottom>
                                    Delivery Address
                                </Typography>
                                <Stack spacing={2}>
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Field.Select name="state_id" label="State" size="small">
                                            <MenuItem value="">Select State</MenuItem>
                                            <Divider />
                                            {states?.map(({ state_id, state_name, districts }) => (
                                                <MenuItem
                                                    key={state_id}
                                                    value={String(state_id)}
                                                    onClick={() => handleSelectState(districts)}
                                                >
                                                    {state_name}
                                                </MenuItem>
                                            ))}
                                        </Field.Select>

                                        <Field.Select name="district_id" label="District" size="small">
                                            <MenuItem value="">Select District</MenuItem>
                                            <Divider />
                                            {districts?.map(({ district_id, district_name }) => (
                                                <MenuItem
                                                    key={district_id}
                                                    value={String(district_id)}
                                                    onClick={() => handleSelectDistrict(district_id)}
                                                >
                                                    {district_name}
                                                </MenuItem>
                                            ))}
                                        </Field.Select>
                                    </Box>
                                    <Field.Text name="address" label="Detailed Address" multiline rows={2} size="small" />
                                </Stack>
                            </Box>

                            <Divider />

                            {/* Order Summary */}
                            <Box>
                                <Typography variant="subtitle1" gutterBottom>
                                    Order Summary
                                </Typography>
                                <Stack spacing={2}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Quantity:
                                            </Typography>
                                            <NumberInput
                                                hideDivider
                                                value={quantity}
                                                onChange={(event, qty) => setQuantity(qty)}
                                                min={1}
                                                max={100}
                                                sx={{ maxWidth: 100 }}
                                            />
                                        </Box>
                                        <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Shipping:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            {logisticCharge ? fCurrency(logisticCharge) : "Free"}
                                        </Typography>
                                    </Box>

                                    <Divider />

                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="subtitle1">Total:</Typography>
                                        <Typography variant="h6" color="error">
                                            {fCurrency(totalAmount)}
                                        </Typography>
                                    </Box>

                                    <Field.Text
                                        name="discount_code"
                                        label="Discount Code (optional)"
                                        size="small"
                                        placeholder="Enter code"
                                    />
                                    <Field.Text
                                        name="remarks"
                                        label="Special Instructions (optional)"
                                        multiline
                                        rows={2}
                                        size="small"
                                    />
                                </Stack>
                            </Box>
                        </Stack>
                    </DialogContent>

                    <DialogActions sx={{ p: 2.5 }}>
                        <Button onClick={handleClose} variant="outlined" color="inherit">
                            Cancel
                        </Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            loading={isSubmitting}
                            loadingIndicator="Placing order..."
                        >
                            Place Order
                        </LoadingButton>
                    </DialogActions>
                </Form>
            </Dialog>

            {/* OTP Verification Dialog */}
            <Dialog open={otpDialogOpen} onClose={handleCloseOtpDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h4">Verify OTP</Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                            Enter the 6-digit code sent to {userEmail}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "warning.main", mt: 0.5, display: "block" }}>
                            OTP expires in {otpExpiryMinutes} {otpExpiryMinutes === 1 ? "minute" : "minutes"}
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {!!errorMessage && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {errorMessage}
                        </Alert>
                    )}
                    <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", mt: 2 }}>
                        {otpValues.map((value, index) => (
                            <TextField
                                key={index}
                                id={`quick-otp-input-${index}`}
                                value={value}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                onPaste={handleOtpPaste}
                                inputProps={{
                                    maxLength: 1,
                                    style: { textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" },
                                }}
                                sx={{ width: 56, "& input": { padding: "12px" } }}
                                autoFocus={index === 0}
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, flexDirection: "column", gap: 1 }}>
                    <LoadingButton
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={handleVerifyOtp}
                        loading={isVerifying}
                    >
                        Verify OTP & Complete Order
                    </LoadingButton>
                    <Button fullWidth size="large" variant="outlined" onClick={handleCloseOtpDialog}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
