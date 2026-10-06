// import { useBoolean } from "minimal-shared/hooks";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setProfileAddresses } from "@/redux/actions";

// import { toast } from "@/components/snackbar";
// import { Iconify } from "@/components/iconify";
// import { EmptyContent } from "@/components/empty-content";

// import { AddressNewForm } from "../address";

// import { useGetStates, removeAddress } from "@/api";

// // ----------------------------------------------------------------------

// export function ProfileAddress() {
//   const addressForm = useBoolean();

//   const dispatch = useAppDispatch();

//   const { addresses } = useAppSelector((state) => state.profile);

//   const { states } = useGetStates();

//   const handleDelete = async (id) => {
//     try {
//       await removeAddress(id);

//       const updatedAddresses = addresses.filter(
//         (address) => address.address_id !== id
//       );

//       dispatch(setProfileAddresses(updatedAddresses));

//       toast.success("Address deleted!");
//     } catch (error) {
//       toast.error("Couldn't remove address! Try again.");
//     }
//   };

//   const renderNoAddress = () => (
//     <EmptyContent
//       title="Address not found"
//       description="Please, add your address to proceed the checkout process!"
//       sx={{ py: 2 }}
//     />
//   );

//   return (
//     <>
//       <div className="flex flex-col gap-2">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h4 className="text-2xl font-bold">Your addresses</h4>
//             <p className="mt-1 text-sm text-gray-500">
//               Manage your shipping address
//             </p>
//           </div>

//           <button
//             onClick={addressForm.onTrue}
//             className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700  transition-colors"
//           >
//             <Iconify icon="mingcute:add-line" className="w-4 h-4" />
//             New address
//           </button>
//         </div>

//         {/* Address Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-5">
//           {!!addresses?.length
//             ? addresses.map((address) => (
//               <AddressItem
//                 key={address.address_id}
//                 addressItem={address}
//                 action={
//                   <button
//                     onClick={() => handleDelete(address.address_id)}
//                     className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
//                   >
//                     Delete
//                   </button>
//                 }
//               />
//             ))
//             : renderNoAddress()}
//         </div>
//       </div>

//       <AddressNewForm
//         open={addressForm.value}
//         onClose={addressForm.onFalse}
//         states={states}
//       />
//     </>
//   );
// }

// // ----------------------------------------------------------------------

// export function AddressItem({ addressItem, action }) {
//   const { address, district, state } = addressItem;

//   return (
//     <div className="flex gap-4 p-3 rounded-2xl shadow-md bg-white">
//       <div className="flex flex-col gap-1 flex-1">
//         <p className="text-sm font-semibold text-gray-900">
//           {address}, {district?.district_name}
//         </p>

//         <p className="text-sm text-gray-500">{state?.state_name}</p>
//       </div>

//       {action && action}
//     </div>
//   );
// }

import { useState } from "react";
import { useBoolean } from "minimal-shared/hooks";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProfileAddresses } from "@/redux/actions";

import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";

import { AddressNewForm } from "../address";
import { useGetStates, removeAddress } from "@/api";

// ── Design tokens ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function ProfileAddress() {
  const addressForm = useBoolean();
  const dispatch = useAppDispatch();
  const [addHovered, setAddHovered] = useState(false);

  const { addresses } = useAppSelector((state) => state.profile);
  const { states } = useGetStates();

  const handleDelete = async (id) => {
    try {
      await removeAddress(id);
      dispatch(setProfileAddresses(addresses.filter((a) => a.address_id !== id)));
      toast.success("Address deleted!");
    } catch {
      toast.error("Couldn't remove address! Try again.");
    }
  };

  const renderNoAddress = () => (
    <div style={{
      gridColumn: "1 / -1",
      padding: "2.5rem 1rem",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "0.5rem",
      border: `1px dashed ${BORDER}`,
      backgroundColor: BG,
    }}>
      <Iconify
        icon="mingcute:location-fill"
        style={{ width: 28, height: 28, color: TEXT_MUTED, opacity: 0.4 }}
      />
      <p style={{
        fontFamily: "Helvetica",
        fontSize: 11, fontWeight: 700,
        color: TEXT, margin: 0,
      }}>
        No addresses yet
      </p>
      <p style={{
        fontFamily: "Helvetica",
        fontSize: 9, fontWeight: 600,
        letterSpacing: "0.06em",
        color: TEXT_MUTED, margin: 0, textAlign: "center", maxWidth: 200,
      }}>
        Add an address to use during checkout
      </p>
    </div>
  );

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", gap: "1rem",
        }}>
          <div>
            <h4 style={{
              fontFamily: "Helvetica",
              fontSize: 14, fontWeight: 800,
              letterSpacing: "0.02em",
              color: TEXT, margin: "0 0 0.25rem 0",
            }}>
              Your addresses
            </h4>
            <p style={{
              fontFamily: "Helvetica",
              fontSize: 10, fontWeight: 600,
              color: TEXT_MUTED, margin: 0,
            }}>
              Manage your shipping addresses
            </p>
          </div>

          {/* Add button */}
          <button
            onClick={addressForm.onTrue}
            onMouseEnter={() => setAddHovered(true)}
            onMouseLeave={() => setAddHovered(false)}
            style={{
              fontFamily: "Helvetica",
              fontSize: 9, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: addHovered ? WHITE : TEXT_MUTED,
              backgroundColor: addHovered ? TEXT : BG,
              border: `1px solid ${addHovered ? TEXT : BORDER}`,
              padding: "0.375rem 0.75rem",
              cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              flexShrink: 0,
              transition: "all 0.15s",
            }}
          >
            <Iconify icon="mingcute:add-line" style={{ width: 13, height: 13 }} />
            New address
          </button>
        </div>

        {/* Address grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "0.75rem",
          marginBottom: "1.25rem",
        }}>
          {addresses?.length
            ? addresses.map((address) => (
              <AddressItem
                key={address.address_id}
                addressItem={address}
                action={
                  <DeleteButton onClick={() => handleDelete(address.address_id)} />
                }
              />
            ))
            : renderNoAddress()
          }
        </div>
      </div>

      <AddressNewForm
        open={addressForm.value}
        onClose={addressForm.onFalse}
        states={states}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function AddressItem({ addressItem, action }) {
  const { address, district, state } = addressItem;

  return (
    <div style={{
      backgroundColor: WHITE,
      border: `1px solid ${BORDER}`,
      padding: "0.75rem 1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "0.75rem",
    }}>
      {/* Left accent bar */}
      <div style={{
        width: 2, flexShrink: 0,
        alignSelf: "stretch",
        backgroundColor: BORDER,
      }} />

      {/* Text */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <p style={{
          fontFamily: "Helvetica",
          fontSize: 11, fontWeight: 700,
          color: TEXT, margin: 0, lineHeight: 1.5,
        }}>
          {address}{district?.district_name ? `, ${district.district_name}` : ""}
        </p>
        <p style={{
          fontFamily: "Helvetica",
          fontSize: 9, fontWeight: 600,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: TEXT_MUTED, margin: 0,
        }}>
          {state?.state_name}
        </p>
      </div>

      {action && action}
    </div>
  );
}

// ----------------------------------------------------------------------

function DeleteButton({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "Helvetica",
        fontSize: 9, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: hovered ? RED : TEXT_MUTED,
        background: "none", border: "none",
        padding: 0, cursor: "pointer",
        flexShrink: 0,
        transition: "color 0.15s",
      }}
    >
      Delete
    </button>
  );
}