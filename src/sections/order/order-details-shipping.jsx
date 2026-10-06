// "use client";

// import { Iconify } from "@/components/iconify";

// export function OrderDetailsShipping({ address }) {
//   return (
//     <div className="bg-white  shadow-sm border border-gray-100">
//       {/* Header (CardHeader replacement) */}
//       <div className="px-4 py-3 border-b">
//         <h3 className="text-base font-semibold text-gray-800">
//           Shipping
//         </h3>
//       </div>

//       {/* Content */}
//       <div className="p-4 space-y-3 text-sm text-gray-700">
//         {/* Address */}
//         <div className="flex">
//           <span className="w-[120px] flex-shrink-0 text-gray-500">
//             Address
//           </span>
//           <span className="text-gray-800">
//             {address?.address}
//             {address?.district && `, ${address?.district}`}
//           </span>
//         </div>

//         {/* State */}
//         <div className="flex">
//           <span className="w-[120px] flex-shrink-0 text-gray-500">
//             State
//           </span>
//           <span className="text-gray-800">
//             {address?.state}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

// ── Design tokens ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function OrderDetailsShipping({ address }) {
  return (
    <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}` }}>

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
          Shipping
        </p>
      </div>

      {/* Rows */}
      <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Row label="Address">
          {address?.address}
          {address?.district && `, ${address.district}`}
        </Row>
        <Row label="State">{address?.state}</Row>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <span style={{
        fontFamily: "Helvetica",
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: TEXT_MUTED,
        width: 80,
        flexShrink: 0,
        paddingTop: 2,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "Helvetica",
        fontSize: 13, fontWeight: 600,
        color: TEXT,
        lineHeight: 1.5,
      }}>
        {children || "—"}
      </span>
    </div>
  );
}