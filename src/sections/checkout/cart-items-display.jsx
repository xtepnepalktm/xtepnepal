
"use client";

import { fCurrency } from "@/utils/format-number";

// ── Design tokens ──
const RED = "#e61911";
const BORDER = "#e8e8e8";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";

// ----------------------------------------------------------------------

export function CartItemsDisplay({ items }) {
    if (!items || items.length === 0) return null;

    const subtotal = items.reduce((total, item) => {
        return total + parseFloat(item.price || 0) * parseInt(item.quantity || 0);
    }, 0);

    return (
        <div style={{ backgroundColor: "#fff", border: `1px solid ${BORDER}` }}>

            {/* Items */}
            <div>
                {items.map((item, index) => (
                    <div key={item.cart_id || index}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 1.5rem" }}>

                            {/* Image */}
                            <div style={{
                                width: 72, height: 72, flexShrink: 0,
                                overflow: "hidden",
                                border: `1px solid ${BORDER}`,
                                backgroundColor: "#f5f5f5",
                            }}>
                                <img
                                    alt={item.product_name || item.name}
                                    src={item.featured_image || ""}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontFamily: "Helvetica",
                                    fontSize: 13, fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.04em",
                                    color: TEXT, margin: "0 0 4px",
                                }}>
                                    {item.product_name || item.name}
                                </h3>

                                {item.variant_name && (
                                    <p style={{
                                        fontFamily: "Helvetica",
                                        fontSize: 11, color: TEXT_MUTED,
                                        margin: "0 0 4px", letterSpacing: "0.03em",
                                    }}>
                                        Variant: {item.variant_name}
                                    </p>
                                )}

                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <span style={{
                                        fontFamily: "Helvetica",
                                        fontSize: 11, color: TEXT_MUTED,
                                        letterSpacing: "0.05em",
                                    }}>
                                        QTY: {item.quantity}
                                    </span>
                                    <span style={{
                                        fontFamily: "Helvetica",
                                        fontSize: 12, fontWeight: 600,
                                        color: TEXT_MUTED,
                                    }}>
                                        {fCurrency(item.price)} each
                                    </span>
                                </div>
                            </div>

                            {/* Line total */}
                            <div style={{
                                fontFamily: "Helvetica",
                                fontSize: 14, fontWeight: 800,
                                color: RED, whiteSpace: "nowrap",
                            }}>
                                {fCurrency(parseFloat(item.price) * parseInt(item.quantity))}
                            </div>

                        </div>

                        {/* Divider */}
                        {index < items.length - 1 && (
                            <div style={{ height: 1, backgroundColor: BORDER, margin: "0 1.5rem" }} />
                        )}
                    </div>
                ))}
            </div>

            {/* Subtotal row */}
            <div style={{
                borderTop: `2px solid ${BORDER}`,
                padding: "1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fafafa",
            }}>
                <span style={{
                    fontFamily: "Helvetica",
                    fontSize: 11, fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: TEXT_MUTED,
                }}>
                    Cart Subtotal
                </span>
                <span style={{
                    fontFamily: "Helvetica",
                    fontSize: 18, fontWeight: 800,
                    color: RED,
                }}>
                    {fCurrency(subtotal)}
                </span>
            </div>

        </div>
    );
}