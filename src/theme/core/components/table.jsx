// import { varAlpha } from 'minimal-shared/utils';

// import { tableRowClasses } from '@mui/material/TableRow';
// import { tableCellClasses } from '@mui/material/TableCell';

// // ----------------------------------------------------------------------

// const MuiTableContainer = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ theme }) => ({
//       position: 'relative',
//       scrollbarWidth: 'thin',
//       scrollbarColor: `${varAlpha(theme.vars.palette.text.disabledChannel, 0.4)} ${varAlpha(theme.vars.palette.text.disabledChannel, 0.08)}`,
//     }),
//   },
// };

// // ----------------------------------------------------------------------

// const MuiTable = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ theme }) => ({ '--palette-TableCell-border': theme.vars.palette.divider }),
//   },
// };

// // ----------------------------------------------------------------------

// const MuiTableRow = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ theme }) => ({
//       [`&.${tableRowClasses.selected}`]: {
//         backgroundColor: varAlpha(theme.vars.palette.primary.darkChannel, 0.04),
//         '&:hover': { backgroundColor: varAlpha(theme.vars.palette.primary.darkChannel, 0.08) },
//       },
//       '&:last-of-type': { [`& .${tableCellClasses.root}`]: { borderColor: 'transparent' } },
//     }),
//   },
// };

// // ----------------------------------------------------------------------

// const MuiTableCell = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: { borderBottomStyle: 'dashed' },
//     head: ({ theme }) => ({
//       fontSize: 14,
//       color: theme.vars.palette.text.secondary,
//       fontWeight: theme.typography.fontWeightSemiBold,
//       backgroundColor: theme.vars.palette.background.neutral,
//     }),
//     stickyHeader: ({ theme }) => ({
//       backgroundColor: theme.vars.palette.background.paper,
//       backgroundImage: `linear-gradient(to bottom, ${theme.vars.palette.background.neutral}, ${theme.vars.palette.background.neutral})`,
//     }),
//     paddingCheckbox: ({ theme }) => ({ paddingLeft: theme.spacing(1) }),
//   },
// };

// // ----------------------------------------------------------------------

// const MuiTablePagination = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: {
//     backIconButtonProps: { size: 'small' },
//     nextIconButtonProps: { size: 'small' },
//     slotProps: { select: { name: 'table-pagination-select' } },
//   },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: { width: '100%' },
//     toolbar: { height: 64 },
//     actions: { marginRight: 8 },
//     select: ({ theme }) => ({
//       paddingLeft: 8,
//       display: 'flex',
//       alignItems: 'center',
//       '&:focus': { borderRadius: theme.shape.borderRadius },
//     }),
//     selectIcon: {
//       right: 4,
//       width: 16,
//       height: 16,
//       top: 'calc(50% - 8px)',
//     },
//   },
// };

// // ----------------------------------------------------------------------

// export const table = {
//   MuiTable,
//   MuiTableRow,
//   MuiTableCell,
//   MuiTableContainer,
//   MuiTablePagination,
// };
'use client'
import { useState } from "react";

// ─── TableContainer ───────────────────────────────────────────────────────────
// MUI: position relative, thin scrollbar with themed colors
export function TableContainer({ children, className = "" }) {
  return (
    <div
      className={[
        "relative overflow-auto",
        // scrollbar-thin + themed thumb/track via Tailwind scrollbar plugin,
        // or use the inline style fallback below for broader support
        "scrollbar-thin scrollbar-thumb-gray-400/40 scrollbar-track-gray-400/10",
        className,
      ].join(" ")}
      // Fallback for browsers that support scrollbar-color (Firefox, Chrome 121+)
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(145,158,171,0.4) rgba(145,158,171,0.08)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────
// MUI: sets --palette-TableCell-border CSS var to theme divider color
export function Table({ children, className = "" }) {
  return (
    <table
      className={["w-full border-collapse text-sm", className].join(" ")}
      // Expose the border color as a CSS variable (mirrors --palette-TableCell-border)
      style={{ "--table-cell-border": "rgba(145,158,171,0.24)" }}
    >
      {children}
    </table>
  );
}

// ─── TableHead ────────────────────────────────────────────────────────────────
export function TableHead({ children }) {
  return <thead>{children}</thead>;
}

// ─── TableBody ────────────────────────────────────────────────────────────────
export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

// ─── TableRow ─────────────────────────────────────────────────────────────────
// MUI: selected state bg, hover on selected, last row transparent border
export function TableRow({ children, selected = false, isLast = false, className = "" }) {
  return (
    <tr
      className={[
        "transition-colors",
        // selected: bg primary.dark @ 4%, hover @ 8%
        selected
          ? "bg-blue-900/[0.04] hover:bg-blue-900/[0.08]"
          : "hover:bg-gray-500/[0.04]",
        // last row: cells get transparent border (applied via group + CSS var trick)
        isLast ? "[&_td]:border-transparent [&_th]:border-transparent" : "",
        className,
      ].join(" ")}
    >
      {children}
    </tr>
  );
}

// ─── TableCell ────────────────────────────────────────────────────────────────
// MUI: dashed bottom border, head = secondary text + semibold + neutral bg
export function TableCell({
  children,
  isHead = false,
  isSticky = false,
  isPaddingCheckbox = false,
  className = "",
}) {
  const Tag = isHead ? "th" : "td";

  return (
    <Tag
      className={[
        // root: dashed bottom border using the CSS var color
        "px-4 py-3 text-left align-middle",
        "border-b border-dashed",
        "[border-bottom-color:var(--table-cell-border,rgba(145,158,171,0.24))]",

        // head variant
        isHead
          ? [
            "text-[14px] font-semibold text-gray-500",
            // background.neutral ≈ light gray
            isSticky
              ? "sticky top-0 z-10 bg-gray-100 bg-gradient-to-b from-gray-100 to-gray-100"
              : "bg-gray-100",
          ].join(" ")
          : "text-gray-800 dark:text-gray-200",

        // paddingCheckbox variant
        isPaddingCheckbox ? "pl-2" : "",

        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}

// ─── TablePagination ──────────────────────────────────────────────────────────
// MUI: full-width, 64px toolbar, small icon buttons, custom select styling
export function TablePagination({
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 25],
  onPageChange,
  onRowsPerPageChange,
}) {
  const totalPages = Math.ceil(count / rowsPerPage);
  const from = count === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(count, (page + 1) * rowsPerPage);

  return (
    // root: w-full; toolbar: h-16 (64px)
    <div className="w-full flex items-center justify-between h-16 px-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
      {/* Rows per page select */}
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">Rows per page:</span>
        <div className="relative flex items-center">
          <select
            name="table-pagination-select"
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
            className={[
              // select: pl-2, flex, items-center, focus border-radius
              "appearance-none pl-2 pr-6 py-1 bg-transparent",
              "border border-gray-300 dark:border-gray-600 rounded",
              "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:rounded",
              "cursor-pointer",
            ].join(" ")}
          >
            {rowsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {/* selectIcon: right-1, w-4, h-4, top 50%-8px */}
          <svg
            className="pointer-events-none absolute right-1 w-4 h-4 top-[calc(50%-8px)] text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Range + nav — actions: mr-2 */}
      <div className="flex items-center gap-1 mr-2">
        <span className="mr-2 whitespace-nowrap">
          {from}–{to} of {count}
        </span>

        {/* Back button (size="small") */}
        <button
          onClick={() => onPageChange?.(page - 1)}
          disabled={page === 0}
          className={[
            "p-1 rounded transition-colors",
            page === 0
              ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400",
          ].join(" ")}
          aria-label="Previous page"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Next button (size="small") */}
        <button
          onClick={() => onPageChange?.(page + 1)}
          disabled={page >= totalPages - 1}
          className={[
            "p-1 rounded transition-colors",
            page >= totalPages - 1
              ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400",
          ].join(" ")}
          aria-label="Next page"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Demo ─────────────────────────────────────────────────────────────────────
const ROWS = [
  { id: 1, name: "Alice Johnson", role: "Engineer", status: "Active", joined: "Jan 2022" },
  { id: 2, name: "Bob Martinez", role: "Designer", status: "Active", joined: "Mar 2022" },
  { id: 3, name: "Carol White", role: "Product", status: "Away", joined: "Jun 2021" },
  { id: 4, name: "David Kim", role: "Engineer", status: "Inactive", joined: "Sep 2023" },
  { id: 5, name: "Eva Chen", role: "Marketing", status: "Active", joined: "Feb 2024" },
  { id: 6, name: "Frank Lee", role: "Engineer", status: "Active", joined: "Nov 2020" },
  { id: 7, name: "Grace Park", role: "Designer", status: "Away", joined: "Jul 2023" },
  { id: 8, name: "Henry Brown", role: "Product", status: "Active", joined: "Dec 2022" },
];

export default function App() {
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const toggleRow = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const visibleRows = ROWS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Team Members
      </h2>

      <div className=" border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {/* Checkbox header */}
                <TableCell isHead isPaddingCheckbox>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={visibleRows.every((r) => selected.has(r.id))}
                    onChange={() => {
                      const allSelected = visibleRows.every((r) => selected.has(r.id));
                      setSelected((prev) => {
                        const next = new Set(prev);
                        visibleRows.forEach((r) =>
                          allSelected ? next.delete(r.id) : next.add(r.id)
                        );
                        return next;
                      });
                    }}
                  />
                </TableCell>
                <TableCell isHead>Name</TableCell>
                <TableCell isHead>Role</TableCell>
                <TableCell isHead>Status</TableCell>
                <TableCell isHead>Joined</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  selected={selected.has(row.id)}
                  isLast={idx === visibleRows.length - 1}
                >
                  <TableCell isPaddingCheckbox>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selected.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <span
                      className={[
                        "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                        row.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : row.status === "Away"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-500",
                      ].join(" ")}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell>{row.joined}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          count={ROWS.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10]}
          onPageChange={setPage}
          onRowsPerPageChange={(n) => { setRowsPerPage(n); setPage(0); }}
        />
      </div>
    </div>
  );
}