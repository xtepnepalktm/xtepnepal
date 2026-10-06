
// export function TableHeadCustom({
//   order,
//   onSort,
//   orderBy,
//   headCells,
//   rowCount = 0,
//   numSelected = 0,
//   onSelectAllRows,
// }) {
//   const isAllSelected = !!rowCount && numSelected === rowCount;
//   const isIndeterminate = !!numSelected && numSelected < rowCount;

//   return (
//     <thead>
//       <tr className="border-b border-gray-200 bg-white">
//         {onSelectAllRows && (
//           <th className="w-10 px-3 py-3 text-left">
//             <input
//               type="checkbox"
//               checked={isAllSelected}
//               ref={(el) => {
//                 if (el) el.indeterminate = isIndeterminate;
//               }}
//               onChange={(e) => onSelectAllRows(e.target.checked)}
//               className="h-4 w-4 cursor-pointer accent-blue-600"
//               aria-label="All row Checkbox"
//               id="all-row-checkbox"
//             />
//           </th>
//         )}

//         {headCells.map((headCell) => {
//           const active = orderBy === headCell.id;

//           return (
//             <th
//               key={headCell.id}
//               style={{ width: headCell.width }}
//               className={[
//                 "px-3 py-3 text-sm font-medium text-gray-700",
//                 headCell.align === "right" && "text-right",
//                 headCell.align === "center" && "text-center",
//                 headCell.align === "left" || !headCell.align
//                   ? "text-left"
//                   : "",
//               ]
//                 .filter(Boolean)
//                 .join(" ")}
//             >
//               {onSort ? (
//                 <button
//                   type="button"
//                   onClick={() => onSort(headCell.id)}
//                   className={[
//                     "inline-flex items-center gap-1 select-none",
//                     "hover:text-gray-900 transition",
//                   ].join(" ")}
//                 >
//                   <span>{headCell.label}</span>

//                   {/* Sort indicator */}
//                   {active && (
//                     <span className="text-xs text-gray-500">
//                       {order === "desc" ? "▼" : "▲"}
//                     </span>
//                   )}
//                 </button>
//               ) : (
//                 headCell.label
//               )}
//             </th>
//           );
//         })}
//       </tr>
//     </thead>
//   );
// }

// ── Design tokens ──
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function TableHeadCustom({ order, onSort, orderBy, headCells, rowCount = 0, numSelected = 0, onSelectAllRows }) {
  const isAllSelected = !!rowCount && numSelected === rowCount;
  const isIndeterminate = !!numSelected && numSelected < rowCount;

  return (
    <thead>
      <tr style={{ backgroundColor: BG, borderBottom: `2px solid ${BORDER}` }}>

        {onSelectAllRows && (
          <th style={{ width: 40, padding: "0 0.75rem" }}>
            <input
              id="all-row-checkbox"
              type="checkbox"
              checked={isAllSelected}
              ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
              onChange={(e) => onSelectAllRows(e.target.checked)}
              aria-label="All row Checkbox"
              style={{ width: 15, height: 15, cursor: "pointer", accentColor: RED }}
            />
          </th>
        )}

        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          const align = headCell.align || "left";

          return (
            <th
              key={headCell.id}
              style={{
                width: headCell.width,
                padding: "0.75rem",
                textAlign: align,
              }}
            >
              {onSort && headCell.id ? (
                <button
                  type="button"
                  onClick={() => onSort(headCell.id)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontFamily: "Helvetica",
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: active ? RED : TEXT_MUTED,
                    background: "none", border: "none",
                    cursor: "pointer", padding: 0,
                    userSelect: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = TEXT}
                  onMouseLeave={(e) => e.currentTarget.style.color = active ? RED : TEXT_MUTED}
                >
                  {headCell.label}
                  {active && (
                    <span style={{ fontSize: 8, color: RED }}>
                      {order === "desc" ? "▼" : "▲"}
                    </span>
                  )}
                </button>
              ) : (
                <span style={{
                  fontFamily: "Helvetica",
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: TEXT_MUTED,
                }}>
                  {headCell.label}
                </span>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}