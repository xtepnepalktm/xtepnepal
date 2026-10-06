
"use client";

import { useState, useCallback, useEffect } from "react";
import { useBoolean, useSetState } from "minimal-shared/hooks";

import { paths } from "@/routes/paths";
import { fIsAfter, fIsBetween } from "@/utils/format-time";

import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";
import { Scrollbar } from "@/components/scrollbar";
import { ConfirmDialog } from "@/components/custom-dialog";
import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import {
  useTable, emptyRows, rowInPage,
  TableNoData, getComparator, TableEmptyRows,
  TableHeadCustom, TableSelectedAction, TablePaginationCustom,
} from "@/components/table";

import { EmailVerificationBanner } from "@/auth/components";
import { OrderTableRow } from "../order-table-row";
import { OrderTableToolbar } from "../order-table-toolbar";
import { OrderTableFiltersResult } from "../order-table-filters-result";
import { useGetOrders } from "@/api";
import { canPayOrderOnline } from "@/utils/fonepay";

// ── Design tokens ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "unpaid", label: "Unpaid" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "returned", label: "Returned" },
  { value: "completed", label: "Completed" },
];

const TABLE_HEAD = [
  { id: "order_id", label: "Order", width: 88 },
  { id: "order_date", label: "Date", width: 140 },
  { id: "items", label: "Products", width: 120, align: "center" },
  { id: "total_amount", label: "Price", width: 140 },
  { id: "status", label: "Status", width: 110 },
  { id: "", width: 88 },
];

// ----------------------------------------------------------------------

export function OrderView() {
  const table = useTable({ defaultOrderBy: "order_date", defaultOrder: "desc" });
  const confirmDialog = useBoolean();

  const { orders, emailVerified, hasHiddenOrders, hiddenOrdersCount, visibleOrdersCount, message } = useGetOrders();
  const [tableData, setTableData] = useState([]);

  const filters = useSetState({ name: "", status: "all", startDate: null, endDate: null });
  const { state: currentFilters, setState: updateFilters } = filters;

  useEffect(() => { setTableData(orders); }, [orders]);

  const dateError = fIsAfter(currentFilters.startDate, currentFilters.endDate);
  const dataFiltered = applyFilter({ inputData: tableData, comparator: getComparator(table.order, table.orderBy), filters: currentFilters, dateError });
  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = !!currentFilters.name || currentFilters.status !== "all" || (!!currentFilters.startDate && !!currentFilters.endDate);
  const notFound = (!dataFiltered?.length && canReset) || !dataFiltered?.length;

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    toast.success("Delete success!");
    setTableData(deleteRows);
    table.onUpdatePageDeleteRows(dataInPage.length, dataFiltered.length);
  }, [dataFiltered?.length, dataInPage.length, table, tableData]);

  const handleFilterStatus = useCallback((newValue) => {
    table.onResetPage();
    updateFilters({ status: newValue });
  }, [updateFilters, table]);

  return (
    <>
      <div className="mx-auto mb-10 container lg:px-5 px-2 py-5">

        {/* Breadcrumbs */}
        {/* <CustomBreadcrumbs
          heading="List"
          links={[{ name: "Order", href: paths.order.root }, { name: "List" }]}
          className="mb-1 md:mb-0"
        /> */}

        <EmailVerificationBanner />

        {/* Page heading */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{
            fontFamily: "Helvetica",
            fontSize: 10, fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: RED, margin: "0 0 4px",
          }}>
            — Orders
          </p>
          <h1 style={{
            fontFamily: "Helvetica",
            fontSize: 28, fontWeight: 800,
            letterSpacing: "-0.01em", textTransform: "uppercase",
            color: TEXT, margin: "0 0 0.75rem", lineHeight: 1.1,
          }}>
            Order List
          </h1>
          <div style={{ height: 2, width: 48, backgroundColor: RED }} />
        </div>

        {/* Main card */}
        <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, overflow: "hidden" }}>

          {/* Status tabs */}
          <div style={{ borderBottom: `1px solid ${BORDER}`, overflowX: "auto", padding: "0.75rem 1rem" }}>
            <div style={{ display: "flex", gap: "0.375rem", flexWrap: "nowrap" }}>
              {STATUS_OPTIONS.map((tab) => {
                const isActive = currentFilters.status === tab.value;
                const count = tab.value !== "all"
                  ? tableData?.filter((o) => matchesStatusTab(o, tab.value)).length
                  : orders.length;

                return (
                  <button
                    key={tab.value}
                    onClick={() => handleFilterStatus(tab.value)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontFamily: "Helvetica",
                      fontSize: 10, fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      padding: "0.5rem 0.875rem",
                      border: isActive ? `1px solid ${RED}` : `1px solid ${BORDER}`,
                      backgroundColor: isActive ? RED : BG,
                      color: isActive ? WHITE : TEXT_MUTED,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = TEXT_MUTED; e.currentTarget.style.color = TEXT; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT_MUTED; } }}
                  >
                    {tab.label}
                    <span style={{
                      fontFamily: "Helvetica",
                      fontSize: 9, fontWeight: 700,
                      padding: "1px 5px",
                      backgroundColor: isActive ? "rgba(255,255,255,0.25)" : BORDER,
                      color: isActive ? WHITE : TEXT_MUTED,
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toolbar */}
          <OrderTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
          />

          {/* Filter results */}
          {canReset && (
            <div style={{ padding: "0 1.25rem" }}>
              <OrderTableFiltersResult
                filters={filters}
                totalResults={dataFiltered?.length}
                onResetPage={table.onResetPage}
              />
            </div>
          )}

          {/* Table */}
          <div style={{ position: "relative" }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered?.length}
              onSelectAllRows={(checked) => table.onSelectAllRows(checked, dataFiltered?.map((row) => row.id))}
              action={
                <button
                  title="Delete"
                  onClick={confirmDialog.onTrue}
                  style={{
                    background: "none", border: "none",
                    padding: 6, cursor: "pointer", color: RED,
                  }}
                >
                  <Iconify icon="solar:trash-bin-trash-bold" width={20} />
                </button>
              }
            />

            <Scrollbar>
              <table style={{ minWidth: 800, width: "100%", borderCollapse: "collapse" }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD}
                  rowCount={dataFiltered?.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) => table.onSelectAllRows(checked, dataFiltered?.map((row) => row.id))}
                />
                <tbody>
                  {dataFiltered
                    ?.slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
                    ?.map((row) => (
                      <OrderTableRow
                        key={row.order_id}
                        row={row}
                        selected={table.selected.includes(row.order_id)}
                        onSelectRow={() => table.onSelectRow(row.order_id)}
                        detailsHref={paths.order.details(row.order_id)}
                      />
                    ))}
                  <TableEmptyRows height={table.dense ? 56 : 76} emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered?.length)} />
                  <TableNoData notFound={notFound} />
                </tbody>
              </table>
            </Scrollbar>
          </div>

          {/* Pagination */}
          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered?.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </div>
      </div>

      {/* Confirm delete dialog */}
      <ConfirmDialog
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        title="Delete"
        content={<>Are you sure you want to delete <strong>{table.selected.length}</strong> items?</>}
        action={
          <button
            onClick={() => { handleDeleteRows(); confirmDialog.onFalse(); }}
            style={{
              fontFamily: "Helvetica",
              fontSize: 10, fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: WHITE, backgroundColor: RED,
              border: "none", padding: "0.5rem 1.25rem", cursor: "pointer",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c41510"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = RED}
          >
            Delete
          </button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function matchesStatusTab(order, tab) {
  return tab === "unpaid" ? canPayOrderOnline(order) : order.status === tab;
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  const stabilizedThis = inputData?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  inputData = stabilizedThis.map((el) => el[0]);

  if (name) inputData = inputData.filter(({ order_id }) => String(order_id).toLowerCase().includes(name.toLowerCase()));
  if (status !== "all") inputData = inputData.filter((o) => matchesStatusTab(o, status));
  if (!dateError && startDate && endDate) inputData = inputData.filter((o) => fIsBetween(o.order_date, startDate, endDate));

  return inputData;
}