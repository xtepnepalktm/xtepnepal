// "use client";

// import { Scrollbar } from "@/components/scrollbar";
// import { Iconify } from "@/components/iconify";
// import { fCurrency } from "@/utils/format-number";

// export function OrderDetailsItems({
//   taxDetails,
//   shipping,
//   discount,
//   discountDetails,
//   subtotal,
//   items = [],
//   totalAmount,
//   className = "",
//   ...other
// }) {
//   return (
//     <div
//       className={`bg-white  shadow-sm border border-gray-100 ${className}`}
//       {...other}
//     >
//       {/* Header */}
//       <div className="px-4 py-3 border-b">
//         <h3 className="text-base font-semibold text-gray-800">Details</h3>
//       </div>

//       {/* Items */}
//       <div className="max-h-[400px] overflow-y-auto">
//         <Scrollbar>
//           {items?.map((item) => {
//             const itemTotal = Number(item.unit_price || item.price || 0);

//             let displayAmount = itemTotal;
//             if (taxDetails?.price_includes_tax && taxDetails?.percentage) {
//               displayAmount = itemTotal / (1 + taxDetails.percentage / 100);
//             }

//             return (
//               <div
//                 key={item.order_item_id}
//                 className="flex items-center gap-3 px-4 py-3 border-b border-dashed border-gray-200 min-w-[640px]"
//               >
//                 {/* Image */}
//                 <img
//                   src={item.item_image}
//                   alt={item.item_name}
//                   className="w-12 h-12 rounded-md object-cover"
//                 />

//                 {/* Name */}
//                 <div className="flex-1 text-sm text-gray-700">
//                   {item.item_name}
//                 </div>

//                 {/* Qty */}
//                 <div className="text-sm text-gray-600">
//                   x{item.quantity}
//                 </div>

//                 {/* Price */}
//                 <div className="w-[110px] text-right font-semibold text-gray-800">
//                   {fCurrency(displayAmount)}
//                 </div>
//               </div>
//             );
//           })}
//         </Scrollbar>
//       </div>

//       {/* Totals */}
//       <div className="p-4 space-y-3 text-sm text-right">
//         {/* Subtotal */}
//         <div className="flex justify-end">
//           <span className="text-gray-500 w-32 text-left">Subtotal</span>
//           <span className="w-40 font-medium text-gray-800 text-right">
//             {fCurrency(subtotal) || "-"}
//           </span>
//         </div>

//         {/* Tax */}
//         <div className="flex justify-end">
//           <span className="text-gray-500 w-32 text-left">
//             {taxDetails?.tax_name || "VAT"}
//             {taxDetails?.percentage && ` (${taxDetails.percentage}%)`}
//             {taxDetails?.price_includes_tax ? " (Included)" : ""}
//           </span>

//           <span
//             className={`w-40 text-right ${(taxDetails?.tax_amount || 0) > 0
//               ? "text-green-600"
//               : "text-gray-400"
//               }`}
//           >
//             {(taxDetails?.tax_amount || 0) > 0
//               ? `+ ${fCurrency(taxDetails.tax_amount)}`
//               : "-"}
//           </span>
//         </div>

//         {/* Shipping */}
//         <div className="flex justify-end">
//           <span className="text-gray-500 w-32 text-left">Shipping</span>
//           <span
//             className={`w-40 text-right ${shipping > 0 ? "text-green-600" : "text-gray-400"
//               }`}
//           >
//             {shipping > 0 ? `+ ${fCurrency(shipping)}` : "-"}
//           </span>
//         </div>

//         {/* Discount */}
//         <div className="flex justify-end">
//           <span className="text-gray-500 w-32 text-left">Discount</span>
//           <span
//             className={`w-40 text-right ${discount > 0 ? "text-red-500" : "text-gray-400"
//               }`}
//           >
//             {discount > 0 ? `- ${fCurrency(discount)}` : "-"}
//           </span>
//         </div>

//         {/* Discount Details */}
//         {discountDetails && discount > 0 && (
//           <div className="p-3  border border-dashed border-green-500 bg-green-50 text-left">
//             <div className="flex items-center gap-2">
//               <Iconify
//                 icon="solar:ticket-sale-bold"
//                 className="text-green-600"
//               />

//               <span className="font-semibold text-green-700 text-sm">
//                 {discountDetails.discount_code}
//               </span>

//               <span className="text-xs font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded">
//                 {discountDetails.discount_type === "percentage"
//                   ? `${discountDetails.discount_value}% OFF`
//                   : `${fCurrency(discountDetails.discount_value)} OFF`}
//               </span>
//             </div>

//             {discountDetails.description && (
//               <p className="text-xs text-gray-500 mt-1 pl-6">
//                 {discountDetails.description}
//               </p>
//             )}

//             <p className="text-xs text-green-700 font-medium mt-1 pl-6">
//               Applied to:{" "}
//               {discountDetails.applies_to === "all"
//                 ? "All items"
//                 : discountDetails.applies_to === "category"
//                   ? "Category items"
//                   : "Specific product"}
//             </p>
//           </div>
//         )}

//         {/* Total */}
//         <div className="flex justify-end pt-2 border-t">
//           <span className="w-32 text-left font-semibold text-gray-800">
//             Total
//           </span>
//           <span className="w-40 font-bold text-gray-900">
//             {fCurrency(totalAmount) || "-"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Scrollbar } from "@/components/scrollbar";
import { Iconify } from "@/components/iconify";
import { fCurrency } from "@/utils/format-number";
import { fixItemImageUrl } from "@/utils/format-image-url";

// ── Design tokens ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

const label = (extra) => ({
  fontFamily: "Helvetica",
  fontSize: 10, fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: TEXT_MUTED,
  ...extra,
});

// ----------------------------------------------------------------------

export function OrderDetailsItems({
  taxDetails,
  shipping,
  discount,
  discountDetails,
  subtotal,
  items = [],
  totalAmount,
  className = "",
  ...other
}) {
  return (
    <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}` }} className={className} {...other}>

      {/* Header */}
      <div style={{ padding: "1rem 1.25rem", borderBottom: `1px solid ${BORDER}` }}>
        <p style={{
          fontFamily: "Helvetica",
          fontSize: 11, fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: RED,
          borderLeft: `3px solid ${RED}`,
          paddingLeft: "0.75rem",
          margin: 0,
        }}>
          Order Items
        </p>
      </div>

      {/* Items list */}
      <div style={{ maxHeight: 400, overflowY: "auto" }}>
        <Scrollbar>
          {items?.map((item) => {
            const itemTotal = Number(item.unit_price || item.price || 0);
            const displayAmount = taxDetails?.price_includes_tax && taxDetails?.percentage
              ? itemTotal / (1 + taxDetails.percentage / 100)
              : itemTotal;

            return (
              <div
                key={item.order_item_id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.875rem 1.25rem",
                  borderBottom: `1px dashed ${BORDER}`,
                  minWidth: 640,
                }}
              >
                {/* Image */}
                <div style={{ width: 55, height: 55, flexShrink: 0, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                  <img
                    src={fixItemImageUrl(item.item_image)}
                    alt={item.item_name}
                    title={item.item_name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                {/* Name */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontFamily: "Helvetica", fontSize: 14, fontWeight: 600, color: TEXT }}>
                    {item.item_name}
                  </span>

                  {item.variant_values?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                      {item.variant_values.map((variant) => (
                        <span
                          key={variant.id}
                          style={{
                            fontFamily: "Helvetica",
                            fontSize: 12,
                            fontWeight: 600,
                            color: TEXT_MUTED,
                            border: `1px solid ${BORDER}`,
                            padding: "1px 6px",
                          }}
                        >
                          {variant.variant_type?.name}: {variant.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Qty */}
                <div style={{ ...label(), minWidth: 40, textAlign: "center" }}>
                  ×{item.quantity}
                </div>

                {/* Price */}
                <div style={{ width: 110, textAlign: "right", fontFamily: "Helvetica", fontSize: 13, fontWeight: 700, color: TEXT }}>
                  {fCurrency(displayAmount)}
                </div>
              </div>
            );
          })}
        </Scrollbar>
      </div>

      {/* Totals */}
      <div style={{ padding: "1rem 1.25rem", backgroundColor: BG, display: "flex", flexDirection: "column", gap: "0.625rem" }}>

        <TotalRow label="Subtotal" value={fCurrency(subtotal) || "—"} />

        <TotalRow
          label={`${taxDetails?.tax_name || "VAT"}${taxDetails?.percentage ? ` (${taxDetails.percentage}%)` : ""}${taxDetails?.price_includes_tax ? " incl." : ""}`}
          value={(taxDetails?.tax_amount || 0) > 0 ? `+ ${fCurrency(taxDetails.tax_amount)}` : "—"}
          valueColor={(taxDetails?.tax_amount || 0) > 0 ? "#166534" : TEXT_MUTED}
        />

        <TotalRow
          label="Shipping"
          value={shipping > 0 ? `+ ${fCurrency(shipping)}` : "—"}
          valueColor={shipping > 0 ? "#166534" : TEXT_MUTED}
        />

        <TotalRow
          label="Discount"
          value={discount > 0 ? `− ${fCurrency(discount)}` : "—"}
          valueColor={discount > 0 ? RED : TEXT_MUTED}
        />

        {/* Discount badge */}
        {discountDetails && discount > 0 && (
          <div style={{
            padding: "0.75rem",
            border: `1px dashed #166534`,
            backgroundColor: "#f0fdf4",
            marginTop: "0.25rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <Iconify icon="solar:ticket-sale-bold" style={{ color: "#166534", fontSize: 16 }} />
              <span style={{ fontFamily: "Helvetica", fontSize: 11, fontWeight: 700, color: "#166534" }}>
                {discountDetails.discount_code}
              </span>
              <span style={{
                fontFamily: "Helvetica",
                fontSize: 9, fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                backgroundColor: "#dcfce7",
                color: "#166534",
                padding: "2px 6px",
              }}>
                {discountDetails.discount_type === "percentage"
                  ? `${discountDetails.discount_value}% OFF`
                  : `${fCurrency(discountDetails.discount_value)} OFF`}
              </span>
            </div>

            {discountDetails.description && (
              <p style={{ fontFamily: "Helvetica", fontSize: 11, color: TEXT_MUTED, margin: "4px 0 0 22px" }}>
                {discountDetails.description}
              </p>
            )}

            <p style={{ fontFamily: "Helvetica", fontSize: 11, fontWeight: 600, color: "#166534", margin: "4px 0 0 22px" }}>
              Applied to:{" "}
              {discountDetails.applies_to === "all"
                ? "All items"
                : discountDetails.applies_to === "category"
                  ? "Category items"
                  : "Specific product"}
            </p>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: BORDER, margin: "0.25rem 0" }} />

        {/* Total */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: "Helvetica", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: TEXT }}>
            Total
          </span>
          <span style={{ fontFamily: "Helvetica", fontSize: 22, fontWeight: 800, color: RED, letterSpacing: "-0.01em" }}>
            {fCurrency(totalAmount) || "—"}
          </span>
        </div>

        <div style={{ height: 2, backgroundColor: RED, width: 32, marginTop: "0.25rem" }} />
      </div>
    </div>
  );
}

// ── Row helper ──
function TotalRow({ label: lbl, value, valueColor = "#1a1a1a" }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{
        fontFamily: "Helvetica",
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#6b6b6b",
      }}>
        {lbl}
      </span>
      <span style={{
        fontFamily: "Helvetica",
        fontSize: 13, fontWeight: 700,
        color: valueColor,
      }}>
        {value}
      </span>
    </div>
  );
}