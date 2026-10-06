import { Scrollbar } from "@/components/scrollbar";
import { WishlistProduct } from "./wishlist-product";

// ── Design tokens (mirrored from OrderTableRow) ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "product", label: "Product" },
  { id: "price", label: "Price" },
  { id: "cartButton", label: "" },
  { id: "deleteButton", label: "" },
];

// ----------------------------------------------------------------------

export function WishlistProductList({ items, onMoveToCart, onDelete }) {
  return (
    <Scrollbar>
      <div style={{ overflowX: "auto" }}>
        <table style={{ minWidth: 720, width: "100%", borderCollapse: "collapse" }}>

          {/* Header */}
          <thead>
            <tr style={{ backgroundColor: BG }}>
              {TABLE_HEAD.map((col, index) => (
                <th
                  key={col.id}
                  style={{
                    fontFamily: "Helvetica",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: TEXT_MUTED,
                    backgroundColor: BG,
                    borderBottom: `1px solid ${BORDER}`,
                    padding: index === 0 ? "0.625rem 0.75rem 0.625rem 1rem" : "0.625rem 0.75rem",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody style={{ backgroundColor: WHITE }}>
            {items?.map((row, index) => (
              <WishlistProduct
                key={row.wishlist_id}
                row={row}
                onMoveToCart={onMoveToCart}
                onDelete={onDelete}
                isLast={index === items.length - 1}
              />
            ))}
          </tbody>

        </table>
      </div>
    </Scrollbar>
  );
}