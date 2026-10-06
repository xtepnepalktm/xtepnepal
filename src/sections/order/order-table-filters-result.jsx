// "use client";

// import { useCallback } from "react";
// import { fDateRangeShortLabel } from "@/utils/format-time";

// export function OrderTableFiltersResult({
//   filters,
//   totalResults,
//   onResetPage,
//   className = "",
// }) {
//   const {
//     state: currentFilters,
//     setState: updateFilters,
//     resetState: resetFilters,
//   } = filters;

//   const handleRemoveKeyword = useCallback(() => {
//     onResetPage();
//     updateFilters({ name: "" });
//   }, [onResetPage, updateFilters]);

//   const handleRemoveStatus = useCallback(() => {
//     onResetPage();
//     updateFilters({ status: "all" });
//   }, [onResetPage, updateFilters]);

//   const handleRemoveDate = useCallback(() => {
//     onResetPage();
//     updateFilters({ startDate: null, endDate: null });
//   }, [onResetPage, updateFilters]);

//   const handleReset = useCallback(() => {
//     onResetPage();
//     resetFilters();
//   }, [onResetPage, resetFilters]);

//   const hasStatus = currentFilters.status !== "all";
//   const hasDate = Boolean(currentFilters.startDate && currentFilters.endDate);
//   const hasKeyword = Boolean(currentFilters.name);

//   const activeCount =
//     (hasStatus ? 1 : 0) + (hasDate ? 1 : 0) + (hasKeyword ? 1 : 0);

//   if (!activeCount) return null;

//   return (
//     <div className={`mb-4 ${className}`}>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-2">
//         <p className="text-sm text-gray-500">
//           {totalResults} results
//         </p>

//         <button
//           onClick={handleReset}
//           className="text-sm text-red-500 hover:text-red-600 transition"
//         >
//           Reset all
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-2">

//         {/* STATUS */}
//         {hasStatus && (
//           <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm gap-2">
//             <span className="capitalize">
//               Status: {currentFilters.status}
//             </span>

//             <button
//               onClick={handleRemoveStatus}
//               className="text-gray-500 hover:text-red-500"
//             >
//               ✕
//             </button>
//           </div>
//         )}

//         {/* DATE */}
//         {hasDate && (
//           <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm gap-2">
//             <span>
//               Date:{" "}
//               {fDateRangeShortLabel(
//                 currentFilters.startDate,
//                 currentFilters.endDate
//               )}
//             </span>

//             <button
//               onClick={handleRemoveDate}
//               className="text-gray-500 hover:text-red-500"
//             >
//               ✕
//             </button>
//           </div>
//         )}

//         {/* KEYWORD */}
//         {hasKeyword && (
//           <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm gap-2">
//             <span>Keyword: {currentFilters.name}</span>

//             <button
//               onClick={handleRemoveKeyword}
//               className="text-gray-500 hover:text-red-500"
//             >
//               ✕
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useCallback } from "react";
import { fDateRangeShortLabel } from "@/utils/format-time";

// ── Design tokens ──
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function OrderTableFiltersResult({ filters, totalResults, onResetPage, className = "" }) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveKeyword = useCallback(() => { onResetPage(); updateFilters({ name: "" }); }, [onResetPage, updateFilters]);
  const handleRemoveStatus = useCallback(() => { onResetPage(); updateFilters({ status: "all" }); }, [onResetPage, updateFilters]);
  const handleRemoveDate = useCallback(() => { onResetPage(); updateFilters({ startDate: null, endDate: null }); }, [onResetPage, updateFilters]);
  const handleReset = useCallback(() => { onResetPage(); resetFilters(); }, [onResetPage, resetFilters]);

  const hasStatus = currentFilters.status !== "all";
  const hasDate = Boolean(currentFilters.startDate && currentFilters.endDate);
  const hasKeyword = Boolean(currentFilters.name);
  const activeCount = (hasStatus ? 1 : 0) + (hasDate ? 1 : 0) + (hasKeyword ? 1 : 0);

  if (!activeCount) return null;

  return (
    <div style={{ marginBottom: "1rem" }} className={className}>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
        <span style={{
          fontFamily: "Helvetica",
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: TEXT_MUTED,
        }}>
          {totalResults} results
        </span>

        <button
          onClick={handleReset}
          style={{
            fontFamily: "Helvetica",
            fontSize: 10, fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: RED, background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          Reset all
        </button>
      </div>

      {/* Chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {hasStatus && <Chip label={`Status: ${currentFilters.status}`} onRemove={handleRemoveStatus} />}
        {hasDate && <Chip label={`Date: ${fDateRangeShortLabel(currentFilters.startDate, currentFilters.endDate)}`} onRemove={handleRemoveDate} />}
        {hasKeyword && <Chip label={`Keyword: ${currentFilters.name}`} onRemove={handleRemoveKeyword} />}
      </div>
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      backgroundColor: BG,
      border: `1px solid ${BORDER}`,
      padding: "0.3rem 0.625rem",
    }}>
      <span style={{
        fontFamily: "Helvetica",
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.08em", textTransform: "uppercase",
        color: TEXT,
      }}>
        {label}
      </span>
      <button
        onClick={onRemove}
        style={{
          fontFamily: "Helvetica",
          fontSize: 10, fontWeight: 700,
          color: TEXT_MUTED, background: "none", border: "none",
          cursor: "pointer", padding: 0, lineHeight: 1,
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = RED}
        onMouseLeave={(e) => e.currentTarget.style.color = TEXT_MUTED}
      >
        ✕
      </button>
    </div>
  );
}