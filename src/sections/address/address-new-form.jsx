import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

import { Form, Field, schemaHelper } from "@/components/hook-form";
import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";

import { useAppDispatch } from "@/redux/hooks";
import { setProfileAddresses } from "@/redux/actions";

import { addAddress } from "@/api/profile";

// ── Design tokens ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export const NewAddressSchema = zod.object({
  address: zod.string().min(1, { message: "Address is required!" }),
  state_id: schemaHelper.nullableInput(
    zod.string().min(1, { message: "State is required!" }),
    { message: "State is required!" }
  ),
  district_id: schemaHelper.nullableInput(
    zod.string().min(1, { message: "District is required!" }),
    { message: "District is required!" }
  ),
});

// ----------------------------------------------------------------------

export function AddressNewForm({
  open,
  onClose,
  states,
  isLogin = true,
  isInline = false,
  initialData = null,
  onAddressAddSuccess,
}) {
  const dispatch = useAppDispatch();
  const [districts, setDistricts] = useState([]);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [cancelHovered, setCancelHovered] = useState(false);

  const defaultValues = {
    state_id: initialData?.state?.state_id ? String(initialData.state.state_id) : "",
    district_id: initialData?.district?.district_id ? String(initialData.district.district_id) : "",
    address: initialData?.address || "",
  };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(NewAddressSchema),
    defaultValues,
  });

  const { handleSubmit, reset, watch, formState: { isSubmitting } } = methods;
  const selectedStateId = watch("state_id");

  useEffect(() => {
    if (selectedStateId && states) {
      const selectedState = states.find((s) => String(s.state_id) === selectedStateId);
      setDistricts(selectedState?.districts || []);
    } else if (!initialData) {
      setDistricts([]);
    }
  }, [selectedStateId, states, initialData]);

  useEffect(() => {
    if (initialData?.state?.districts) setDistricts(initialData.state.districts);
  }, [initialData]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isLogin) {
        const response = await addAddress(data);
        const addresses = response[0].addresses;
        dispatch(setProfileAddresses(addresses));
        reset();
        onClose();
        onAddressAddSuccess?.(addresses[addresses.length - 1]);
        toast.success("Address added!");
      } else {
        const selectedState = states.find((s) => s.state_id === parseInt(data.state_id));
        const selectedDistrict = districts.find((d) => d.district_id === parseInt(data.district_id));
        const guestAddressData = {
          address_id: "guest-address",
          address: data.address,
          state: selectedState,
          district: selectedDistrict,
        };
        reset();
        onClose();
        onAddressAddSuccess?.(guestAddressData);
        toast.success(initialData ? "Order details updated!" : "Order details added!");
      }
    } catch (error) {
      toast.error("Failed to add address!");
      console.error(error);
    }
  });

  // ── Shared button styles ──
  const cancelBtn = {
    fontFamily: "Helvetica",
    fontSize: 9, fontWeight: 700,
    letterSpacing: "0.12em", textTransform: "uppercase",
    color: cancelHovered ? TEXT : TEXT_MUTED,
    backgroundColor: cancelHovered ? BG : WHITE,
    border: `1px solid ${cancelHovered ? TEXT_MUTED : BORDER}`,
    padding: "0.4rem 0.875rem",
    cursor: "pointer",
    display: "inline-flex", alignItems: "center",
    transition: "all 0.15s",
  };

  const submitBtn = {
    fontFamily: "Helvetica",
    fontSize: 9, fontWeight: 700,
    letterSpacing: "0.12em", textTransform: "uppercase",
    color: isSubmitting ? TEXT_MUTED : WHITE,
    backgroundColor: isSubmitting ? BG : submitHovered ? "#333" : TEXT,
    border: `1px solid ${isSubmitting ? BORDER : submitHovered ? "#333" : TEXT}`,
    padding: "0.4rem 1rem",
    cursor: isSubmitting ? "not-allowed" : "pointer",
    display: "inline-flex", alignItems: "center",
    justifyContent: "center", gap: "0.375rem",
    opacity: isSubmitting ? 0.7 : 1,
    transition: "all 0.15s",
    ...(isInline && { width: "100%", padding: "0.625rem 1rem" }),
  };

  const formContent = (
    <Form methods={methods} onSubmit={onSubmit}>
      <div style={isInline ? {} : { padding: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Header stripe — modal only */}
          {!isInline && (
            <div style={{
              backgroundColor: BG,
              borderBottom: `1px solid ${BORDER}`,
              padding: "0.625rem 1rem",
            }}>
              <h6 style={{
                fontFamily: "Helvetica",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: TEXT, margin: 0,
              }}>
                Add a new address
              </h6>
            </div>
          )}

          {/* Fields */}
          <div style={{ padding: isInline ? 0 : "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* State + District */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1rem",
            }}>
              <Field.Select name="state_id" label="State" placeholder="Choose a state">
                <option value="">None</option>
                <hr />
                {states?.map(({ state_id, state_name }) => (
                  <option key={state_id} value={String(state_id)}>{state_name}</option>
                ))}
              </Field.Select>

              <Field.Select name="district_id" label="District" placeholder="Choose a district">
                <option value="">None</option>
                <hr />
                {districts?.map(({ district_id, district_name }) => (
                  <option key={district_id} value={String(district_id)}>{district_name}</option>
                ))}
              </Field.Select>
            </div>

            {/* Address */}
            <Field.Text name="address" label="Address" />

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: BORDER }} />

            {/* Actions */}
            <div style={{
              display: "flex", gap: "0.5rem",
              justifyContent: isInline ? "flex-start" : "flex-end",
            }}>
              {!isInline && (
                <button
                  type="button"
                  onClick={onClose}
                  style={cancelBtn}
                  onMouseEnter={() => setCancelHovered(true)}
                  onMouseLeave={() => setCancelHovered(false)}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={submitBtn}
                onMouseEnter={() => { if (!isSubmitting) setSubmitHovered(true); }}
                onMouseLeave={() => setSubmitHovered(false)}
              >
                {isSubmitting ? (
                  <>
                    <Iconify icon="svg-spinners:8-dots-rotate" style={{ width: 12, height: 12 }} />
                    {isInline ? "Continuing…" : "Adding…"}
                  </>
                ) : (
                  isInline ? "Continue" : "Add address"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );

  if (isInline) return formContent;

  return (
    <>
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          style={{
            position: "fixed", inset: 0,
            zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "0 1rem",
          }}
        >
          <div style={{
            backgroundColor: WHITE,
            border: `1px solid ${BORDER}`,
            width: "100%", maxWidth: 480,
            boxShadow: "0 24px 48px rgba(0,0,0,0.16)",
            overflow: "hidden",
          }}>
            {formContent}
          </div>
        </div>
      )}
    </>
  );
}