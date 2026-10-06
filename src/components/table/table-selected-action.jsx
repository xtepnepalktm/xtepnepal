// export function TableSelectedAction({
//   dense,
//   action,
//   rowCount = 0,
//   numSelected = 0,
//   onSelectAllRows,
//   className = "",
// }) {
//   if (!numSelected) return null;

//   const isAllSelected = !!rowCount && numSelected === rowCount;
//   const isIndeterminate = !!numSelected && numSelected < rowCount;

//   return (
//     <div
//       className={[
//         "absolute top-0 left-0 z-10 w-full flex items-center",
//         "bg-blue-50 px-3 pr-4",
//         dense ? "h-[38px]" : "h-[58px]",
//         className,
//       ].join(" ")}
//     >
//       {/* Checkbox */}
//       <input
//         id="deselect-all-checkbox"
//         type="checkbox"
//         checked={isAllSelected}
//         ref={(el) => {
//           if (el) el.indeterminate = isIndeterminate;
//         }}
//         onChange={(e) => onSelectAllRows?.(e.target.checked)}
//         className="h-4 w-4 cursor-pointer accent-blue-600"
//         aria-label="Deselect all checkbox"
//       />

//       {/* Selected text */}
//       <span
//         className={[
//           "ml-4 flex-1 font-medium text-blue-600",
//           dense ? "ml-6" : "",
//         ].join(" ")}
//       >
//         {numSelected} selected
//       </span>

//       {/* Action buttons */}
//       {action && <div>{action}</div>}
//     </div>
//   );
// }

// ── Design tokens ──
const RED = "#e61911";
const RED_DIM = "rgba(230,25,17,0.07)";
const TEXT = "#1a1a1a";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function TableSelectedAction({ dense, action, rowCount = 0, numSelected = 0, onSelectAllRows, className = "" }) {
  if (!numSelected) return null;

  const isAllSelected = !!rowCount && numSelected === rowCount;
  const isIndeterminate = !!numSelected && numSelected < rowCount;

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, zIndex: 10,
      width: "100%",
      display: "flex", alignItems: "center",
      backgroundColor: RED_DIM,
      borderBottom: `2px solid ${RED}`,
      padding: "0 1rem",
      height: dense ? 38 : 58,
    }}
      className={className}
    >
      {/* Checkbox */}
      <input
        id="deselect-all-checkbox"
        type="checkbox"
        checked={isAllSelected}
        ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
        onChange={(e) => onSelectAllRows?.(e.target.checked)}
        aria-label="Deselect all checkbox"
        style={{ width: 15, height: 15, cursor: "pointer", accentColor: RED, flexShrink: 0 }}
      />

      {/* Count */}
      <span style={{
        fontFamily: "Helvetica",
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.15em", textTransform: "uppercase",
        color: RED,
        marginLeft: dense ? 20 : 16,
        flex: 1,
      }}>
        {numSelected} selected
      </span>

      {/* Actions */}
      {action && <div>{action}</div>}
    </div>
  );
}