// import { useState } from "react";
// import { useBoolean, usePopover } from "minimal-shared/hooks";

// import { RouterLink } from "@/routes/components";
// import { fCurrency } from "@/utils/format-number";
// import { fDate, fTime } from "@/utils/format-time";

// import { OrderUpdateForm } from "./order-update-form";
// import { OrderAddressUpdateForm } from "./order-address-update-form";

// // ----------------------------------------------------------------------

// export function OrderTableRow({ row, detailsHref }) {
//   const {
//     order_date,
//     order_id,
//     id,
//     order_items = [],
//     status,
//     total_amount,
//     created_at,
//   } = row;

//   const collapseRow = useBoolean();
//   const openOrderUpdateForm = useBoolean();
//   const openOrderAddressUpdateForm = useBoolean();

//   const menuActions = usePopover();
//   const [updateStatus, setUpdateStatus] = useState("");

//   const isFinalStatus = ["delivered", "completed"].includes(status);

//   // ----------------------------------------------------------------------
//   // STATUS STYLE (frontend friendly pills)
//   // ----------------------------------------------------------------------

//   const statusStyles = {
//     completed: "bg-emerald-50 text-emerald-600",
//     delivered: "bg-emerald-50 text-emerald-600",
//     pending: "bg-amber-50 text-amber-600",
//     cancelled: "bg-red-50 text-red-600",
//   };

//   const statusColor =
//     statusStyles[status] || "bg-gray-100 text-gray-600";

//   const handleAction = (newStatus) => {
//     setUpdateStatus(newStatus);
//     openOrderUpdateForm.onTrue();
//     menuActions.onClose();
//   };

//   // ----------------------------------------------------------------------

//   return (
//     <>
//       {/* ROW */}
//       <tr className="group border-b border-gray-100 transition hover:bg-gray-50/60">

//         {/* ORDER ID */}
//         <td className="px-4 py-3">
//           {/* <RouterLink
//             href={detailsHref}
//             className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
//           >
//             #{order_id}
//           </RouterLink> */}
//         </td>
//         <td className="px-4 py-3">
//           <RouterLink
//             href={detailsHref}
//             className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
//           >
//             #{order_id}
//           </RouterLink>
//         </td>

//         {/* DATE */}
//         <td className="px-4 py-3">
//           <div className="text-sm font-medium text-gray-900">
//             {fDate(order_date)}
//           </div>
//           <div className="text-xs text-gray-500">
//             {fTime(created_at)}
//           </div>
//         </td>

//         {/* ITEMS */}
//         <td className="px-4 py-3 text-center text-sm text-gray-600">
//           {order_items.length}
//         </td>

//         {/* TOTAL */}
//         <td className="px-4 py-3 text-sm font-semibold text-gray-900">
//           {fCurrency(total_amount)}
//         </td>

//         {/* STATUS */}
//         <td className="px-4 py-3">
//           <span
//             className={[
//               "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
//               statusColor,
//             ].join(" ")}
//           >
//             {status}
//           </span>
//         </td>

//         {/* ACTIONS */}
//         <td className="px-4 py-3">
//           <div className="flex justify-end gap-2 opacity-70 transition group-hover:opacity-100">

//             {/* VIEW */}
//             <RouterLink
//               href={detailsHref}
//               className=" bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
//             >
//               View
//             </RouterLink>

//             {/* TOGGLE DETAILS */}
//             <button
//               onClick={collapseRow.onToggle}
//               className=" bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
//             >
//               Details
//             </button>

//             {/* MENU */}
//             {!isFinalStatus && (
//               <div className="relative">
//                 <button
//                   onClick={menuActions.onOpen}
//                   className=" bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
//                 >
//                   ⋯
//                 </button>

//                 {/* FLOATING MENU (modern popover style) */}
//                 {menuActions.open && (
//                   <div
//                     className="
//                       absolute right-0 mt-2 w-44
//                        border border-gray-200
//                       bg-white p-1
//                       shadow-[0_20px_50px_rgba(0,0,0,0.12)]
//                       backdrop-blur
//                       z-50
//                     "
//                   >
//                     {!isFinalStatus && (
//                       <button
//                         onClick={() => {
//                           openOrderAddressUpdateForm.onTrue();
//                           menuActions.onClose();
//                         }}
//                         className="w-full  px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Change Address
//                       </button>
//                     )}

//                     {isFinalStatus && (
//                       <button
//                         onClick={() => handleAction("returned")}
//                         className="w-full  px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
//                       >
//                         Return
//                       </button>
//                     )}

//                     <div className="my-1 h-px bg-gray-100" />

//                     {!isFinalStatus && (
//                       <button
//                         onClick={() => handleAction("cancelled")}
//                         className="w-full  px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
//                       >
//                         Cancel Order
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </td>
//       </tr>

//       {/* COLLAPSE */}
//       {collapseRow.value && (
//         <tr>
//           <td colSpan={6} className="bg-gray-50/60 px-4 py-3">
//             <div className="space-y-2">
//               {order_items.map((item) => (
//                 <div
//                   key={item.order_item_id ?? item.item_sku}
//                   className="flex items-center gap-3  bg-white px-3 py-2 shadow-sm"
//                 >
//                   <img
//                     src={item.item_image}
//                     className="h-10 w-10 rounded-md object-cover"
//                   />

//                   <div className="flex-1">
//                     <div className="text-sm font-medium text-gray-900">
//                       {item.item_name}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {item.item_sku}
//                     </div>
//                   </div>

//                   <div className="text-sm text-gray-600">
//                     x{item.quantity}
//                   </div>

//                   <div className="w-24 text-right text-sm font-semibold text-gray-900">
//                     {fCurrency(
//                       Number(item.price) *
//                       Number(item.quantity)
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </td>
//         </tr>
//       )}

//       {/* MODALS */}
//       {openOrderUpdateForm.value && (
//         <OrderUpdateForm
//           open={openOrderUpdateForm.value}
//           onClose={openOrderUpdateForm.onFalse}
//           orderUpdateData={{
//             id,
//             status: updateStatus,
//           }}
//         />
//       )}

//       {openOrderAddressUpdateForm.value && (
//         <OrderAddressUpdateForm
//           open={openOrderAddressUpdateForm.value}
//           onClose={openOrderAddressUpdateForm.onFalse}
//           orderUpdateData={{ id }}
//         />
//       )}
//     </>
//   );
// }


import { useState } from "react";
import { useBoolean, usePopover } from "minimal-shared/hooks";

import { RouterLink } from "@/routes/components";
import { fCurrency } from "@/utils/format-number";
import { fDate, fTime } from "@/utils/format-time";
import { fixItemImageUrl } from "@/utils/format-image-url";

import { canPayOrderOnline } from "@/utils/fonepay";
import { toast } from "@/components/snackbar";
import { useGetMutateOrders } from "@/api";

import { OrderUpdateForm } from "./order-update-form";
import { OrderAddressUpdateForm } from "./order-address-update-form";
import { FonepayQrDialog, useFonepayEnabled, useFonepayPayNow } from "../payment";

// ── Design tokens ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ── Status badge config ──
const STATUS_CONFIG = {
  completed: { bg: "#f0fdf4", color: "#166534" },
  delivered: { bg: "#f0fdf4", color: "#166534" },
  confirmed: { bg: "#eff6ff", color: "#1e40af" },
  processing: { bg: "#eef2ff", color: "#3730a3" },
  pending: { bg: "#fffbeb", color: "#92400e" },
  cancelled: { bg: "rgba(230,25,17,0.07)", color: RED },
  returned: { bg: BG, color: TEXT_MUTED },
};

// ── Shared action button style ──
const actionBtn = {
  fontFamily: "Helvetica",
  fontSize: 9, fontWeight: 700,
  letterSpacing: "0.12em", textTransform: "uppercase",
  color: TEXT_MUTED,
  backgroundColor: BG,
  border: `1px solid ${BORDER}`,
  padding: "0.3rem 0.625rem",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  transition: "border-color 0.15s, color 0.15s",
};

// ----------------------------------------------------------------------

export function OrderTableRow({ row, detailsHref }) {
  const { order_date, order_id, id, order_items = [], status, total_amount, created_at } = row;

  const fonepayEnabled = useFonepayEnabled();
  const isUnpaid = canPayOrderOnline(row);
  const payNow = useFonepayPayNow(order_id);
  const mutateOrders = useGetMutateOrders();

  const handlePaySuccess = () => {
    payNow.close();
    toast.success("Payment successful!");
    mutateOrders();
  };

  const handlePayDialogClose = () => {
    payNow.close();
    mutateOrders();
  };

  const collapseRow = useBoolean();
  const openOrderUpdateForm = useBoolean();
  const openOrderAddressUpdateForm = useBoolean();
  const menuActions = usePopover();
  const [updateStatus, setUpdateStatus] = useState("");

  const isFinalStatus = ["delivered", "completed"].includes(status);
  const badge = STATUS_CONFIG[status] || { bg: BG, color: TEXT_MUTED };

  const handleAction = (newStatus) => {
    setUpdateStatus(newStatus);
    openOrderUpdateForm.onTrue();
    menuActions.onClose();
  };

  return (
    <>
      {/* ── Main row ── */}
      <tr style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: WHITE }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = BG}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = WHITE}
      >
        {/* Empty first cell (commented-out RouterLink in original) */}
        <td style={{ padding: "0.75rem" }} />

        {/* Order ID */}
        <td style={{ padding: "0.75rem" }}>
          <RouterLink href={detailsHref} style={{
            fontFamily: "Helvetica",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.05em",
            color: RED, textDecoration: "none",
          }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
          >
            #{order_id}
          </RouterLink>
        </td>

        {/* Date */}
        <td style={{ padding: "0.75rem" }}>
          <div style={{ fontFamily: "Helvetica", fontSize: 11, fontWeight: 700, color: TEXT }}>
            {fDate(order_date)}
          </div>
          <div style={{ fontFamily: "Helvetica", fontSize: 10, fontWeight: 600, color: TEXT_MUTED, marginTop: 2 }}>
            {fTime(created_at)}
          </div>
        </td>

        {/* Items count */}
        <td style={{ padding: "0.75rem", textAlign: "center" }}>
          <span style={{ fontFamily: "Helvetica", fontSize: 11, fontWeight: 700, color: TEXT_MUTED }}>
            {order_items.length}
          </span>
        </td>

        {/* Total */}
        <td style={{ padding: "0.75rem" }}>
          <span style={{ fontFamily: "Helvetica", fontSize: 12, fontWeight: 800, color: TEXT }}>
            {fCurrency(total_amount)}
          </span>
        </td>

        {/* Status */}
        <td style={{ padding: "0.75rem" }}>
          <span style={{
            fontFamily: "Helvetica",
            fontSize: 9, fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            backgroundColor: badge.bg,
            color: badge.color,
            border: `1px solid ${badge.color}22`,
            padding: "3px 8px",
            display: "inline-block",
          }}>
            {status}
          </span>

          {isUnpaid && (
            <span style={{
              fontFamily: "Helvetica",
              fontSize: 9, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              backgroundColor: "#fffbeb",
              color: "#92400e",
              border: "1px solid #92400e22",
              padding: "3px 8px",
              display: "inline-block",
              marginTop: 4,
            }}>
              Unpaid
            </span>
          )}
        </td>

        {/* Actions */}
        <td style={{ padding: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.375rem", alignItems: "center" }}>

            {/* Pay Now */}
            {isUnpaid && fonepayEnabled && (
              <button
                onClick={() => payNow.start(row.fonepay_payment)}
                disabled={payNow.isStarting}
                style={{ ...actionBtn, color: WHITE, backgroundColor: RED, borderColor: RED }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = 0.85; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = 1; }}
              >
                {payNow.isStarting ? "Starting…" : "Pay Now"}
              </button>
            )}

            {/* View */}
            <RouterLink href={detailsHref} style={actionBtn}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = TEXT_MUTED; e.currentTarget.style.color = TEXT; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT_MUTED; }}
            >
              View
            </RouterLink>

            {/* Details toggle */}
            <button
              onClick={collapseRow.onToggle}
              style={{
                ...actionBtn,
                borderColor: collapseRow.value ? TEXT_MUTED : BORDER,
                color: collapseRow.value ? TEXT : TEXT_MUTED,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = TEXT_MUTED; e.currentTarget.style.color = TEXT; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = collapseRow.value ? TEXT_MUTED : BORDER; e.currentTarget.style.color = collapseRow.value ? TEXT : TEXT_MUTED; }}
            >
              {collapseRow.value ? "Hide" : "Details"}
            </button>

            {/* Menu */}
            {!isFinalStatus && (
              <div style={{ position: "relative" }}>
                <button
                  onClick={menuActions.onOpen}
                  style={{ ...actionBtn, padding: "0.3rem 0.5rem", letterSpacing: 0, fontSize: 13 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = TEXT_MUTED; e.currentTarget.style.color = TEXT; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT_MUTED; }}
                >
                  ⋯
                </button>

                {menuActions.open && (
                  <div style={{
                    position: "absolute", right: 0, top: "calc(100% + 4px)",
                    zIndex: 50, width: 160,
                    backgroundColor: WHITE,
                    border: `1px solid ${BORDER}`,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  }}>
                    <MenuBtn onClick={() => { openOrderAddressUpdateForm.onTrue(); menuActions.onClose(); }}>
                      Change Address
                    </MenuBtn>
                    <div style={{ height: 1, backgroundColor: BORDER }} />
                    <MenuBtn onClick={() => handleAction("cancelled")} danger>
                      Cancel Order
                    </MenuBtn>
                  </div>
                )}
              </div>
            )}

            {isFinalStatus && (
              <button
                onClick={() => handleAction("returned")}
                style={{ ...actionBtn, color: RED, borderColor: `${RED}44` }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = RED; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${RED}44`; }}
              >
                Return
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* ── Collapse: item details ── */}
      {collapseRow.value && (
        <tr>
          <td colSpan={7} style={{ backgroundColor: BG, padding: "0.75rem 1rem", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {order_items.map((item) => (
                <div
                  key={item.order_item_id ?? item.item_sku}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    backgroundColor: WHITE,
                    border: `1px solid ${BORDER}`,
                    padding: "0.625rem 0.75rem",
                  }}
                >
                  {/* Image */}
                  <div style={{ width: 40, height: 40, flexShrink: 0, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                    <img src={fixItemImageUrl(item.item_image)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>

                  {/* Name + SKU */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Helvetica", fontSize: 11, fontWeight: 700, color: TEXT }}>
                      {item.item_name}
                    </div>
                    <div style={{ fontFamily: "Helvetica", fontSize: 10, fontWeight: 600, color: TEXT_MUTED, marginTop: 2 }}>
                      {item.item_sku}
                    </div>
                  </div>

                  {/* Qty */}
                  <span style={{ fontFamily: "Helvetica", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: TEXT_MUTED }}>
                    ×{item.quantity}
                  </span>

                  {/* Line total */}
                  <span style={{ fontFamily: "Helvetica", fontSize: 12, fontWeight: 800, color: TEXT, width: 80, textAlign: "right" }}>
                    {fCurrency(Number(item.price) * Number(item.quantity))}
                  </span>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}

      {/* Modals */}
      {openOrderUpdateForm.value && (
        <OrderUpdateForm
          open={openOrderUpdateForm.value}
          onClose={openOrderUpdateForm.onFalse}
          orderUpdateData={{ id, status: updateStatus }}
        />
      )}
      {openOrderAddressUpdateForm.value && (
        <OrderAddressUpdateForm
          open={openOrderAddressUpdateForm.value}
          onClose={openOrderAddressUpdateForm.onFalse}
          orderUpdateData={{ id }}
        />
      )}
      <FonepayQrDialog
        open={Boolean(payNow.dialogData)}
        orderId={order_id}
        initialData={payNow.dialogData}
        onClose={handlePayDialogClose}
        onSuccess={handlePaySuccess}
      />
    </>
  );
}

// ── Dropdown menu item ──
function MenuBtn({ onClick, danger, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "block", width: "100%", textAlign: "left",
        fontFamily: "Helvetica",
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: danger ? RED : TEXT_MUTED,
        backgroundColor: "transparent",
        border: "none", padding: "0.625rem 0.875rem",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = BG}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
    >
      {children}
    </button>
  );
}