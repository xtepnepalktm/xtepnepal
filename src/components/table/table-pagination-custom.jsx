// import Box from '@mui/material/Box';
// import Switch from '@mui/material/Switch';
// import TablePagination from '@mui/material/TablePagination';
// import FormControlLabel from '@mui/material/FormControlLabel';

// // ----------------------------------------------------------------------

// export function TablePaginationCustom({
//   sx,
//   dense,
//   onChangeDense,
//   rowsPerPageOptions = [5, 10, 25],
//   ...other
// }) {
//   return (
//     <Box sx={[{ position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}>
//       <TablePagination
//         rowsPerPageOptions={rowsPerPageOptions}
//         component="div"
//         {...other}
//         sx={{ borderTopColor: 'transparent' }}
//       />

//       {onChangeDense && (
//         <FormControlLabel
//           label="Dense"
//           control={
//             <Switch checked={dense} onChange={onChangeDense} inputProps={{ id: 'dense-switch' }} />
//           }
//           sx={{
//             pl: 2,
//             py: 1.5,
//             top: 0,
//             position: { sm: 'absolute' },
//           }}
//         />
//       )}
//     </Box>
//   );
// }
// export function TablePaginationCustom({
//   dense,
//   onChangeDense,
//   rowsPerPageOptions = [5, 10, 25],
//   className = "",
//   total = 0,
//   page = 0,
//   rowsPerPage = 10,
//   onPageChange,
//   onRowsPerPageChange,
// }) {
//   return (
//     <div className={`relative w-full ${className}`}>
//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-transparent px-3 py-2">
//         {/* Left info */}
//         <div className="text-sm text-gray-600">
//           Showing {page * rowsPerPage + 1}–
//           {Math.min((page + 1) * rowsPerPage, total)} of {total}
//         </div>

//         {/* Right controls */}
//         <div className="flex items-center gap-3">
//           {/* Rows per page */}
//           <select
//             value={rowsPerPage}
//             onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
//             className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
//           >
//             {rowsPerPageOptions.map((opt) => (
//               <option key={opt} value={opt}>
//                 {opt} / page
//               </option>
//             ))}
//           </select>

//           {/* Page controls */}
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => onPageChange?.(page - 1)}
//               disabled={page === 0}
//               className="px-2 py-1 text-sm border rounded disabled:opacity-40"
//             >
//               Prev
//             </button>

//             <span className="text-sm px-2">
//               Page {page + 1}
//             </span>

//             <button
//               onClick={() => onPageChange?.(page + 1)}
//               disabled={(page + 1) * rowsPerPage >= total}
//               className="px-2 py-1 text-sm border rounded disabled:opacity-40"
//             >
//               Next
//             </button>
//           </div>

//           {/* Dense switch */}
//           {onChangeDense && (
//             <label className="flex items-center gap-2 text-sm pl-2 py-1.5 sm:absolute sm:top-0 sm:right-0">
//               <input
//                 id="dense-switch"
//                 type="checkbox"
//                 checked={dense}
//                 onChange={onChangeDense}
//                 className="h-4 w-4 accent-blue-600"
//               />
//               Dense
//             </label>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

export function TablePaginationCustom({
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  className = "",
  total = 0,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
}) {
  const totalPages = Math.max(
    1,
    Math.ceil(total / rowsPerPage)
  );

  return (
    <div
      className={[
        "flex flex-col gap-4  border border-gray-100 bg-white px-4 py-3 shadow-sm",
        "sm:flex-row sm:items-center sm:justify-between",
        className,
      ].join(" ")}
    >
      {/* LEFT: INFO */}
      <div className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-medium text-gray-900">
          {total === 0
            ? 0
            : page * rowsPerPage + 1}
        </span>
        {" – "}
        <span className="font-medium text-gray-900">
          {Math.min(
            (page + 1) * rowsPerPage,
            total
          )}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-900">
          {total}
        </span>
      </div>

      {/* RIGHT CONTROLS */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Rows per page (modern select) */}
        <select
          value={rowsPerPage}
          onChange={(e) =>
            onRowsPerPageChange?.(
              Number(e.target.value)
            )
          }
          className=" border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white"
        >
          {rowsPerPageOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt} / page
            </option>
          ))}
        </select>

        {/* Pagination buttons */}
        <div className="flex items-center gap-1  bg-gray-50 p-1">
          <button
            onClick={() =>
              onPageChange?.(page - 1)
            }
            disabled={page === 0}
            className="rounded-md px-3 py-1.5 text-sm text-gray-600 transition hover:bg-white disabled:opacity-40"
          >
            ←
          </button>

          <div className="px-2 text-sm font-medium text-gray-700">
            {page + 1} / {totalPages}
          </div>

          <button
            onClick={() =>
              onPageChange?.(page + 1)
            }
            disabled={
              page + 1 >= totalPages
            }
            className="rounded-md px-3 py-1.5 text-sm text-gray-600 transition hover:bg-white disabled:opacity-40"
          >
            →
          </button>
        </div>

        {/* Dense toggle (clean pill style) */}
        {onChangeDense && (
          <button
            onClick={onChangeDense}
            className={[
              "rounded-full px-3 py-1.5 text-sm transition",
              dense
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            ].join(" ")}
          >
            Dense
          </button>
        )}
      </div>
    </div>
  );
}