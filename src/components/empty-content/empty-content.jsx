import clsx from "clsx";

export function EmptyContent({
  sx,
  imgUrl,
  action,
  filled = false,
  slotProps,
  description,
  title = "No data",
  className,
  ...other
}) {
  return (
    <div
      className={clsx(className)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        height: "100%",
        padding: "3rem 1.5rem",
        ...(filled && {
          backgroundColor: "#f9f9f9",
          border: "1px dashed #ccc",
        }),
      }}
      {...other}
    >
      {/* Icon/Image */}
      <div
        style={{
          width: "72px",
          height: "72px",
          backgroundColor: "#f3f3f3",
          border: "1px solid #e2e2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
          flexShrink: 0,
        }}
      >
        <img
          alt="Empty content"
          src={imgUrl ?? "/assets/icons/empty/ic-content.svg"}
          style={{ width: "36px", height: "36px", opacity: 0.45 }}
          {...slotProps?.img}
        />
      </div>

      {/* Red divider */}
      <div
        style={{
          width: "24px",
          height: "2px",
          backgroundColor: "#E60012",
          marginBottom: "1rem",
        }}
      />

      {/* Title */}
      {title && (
        <p
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#1a1c1c",
            margin: "0 0 0.375rem",
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
          {...slotProps?.title}
        >
          {title}
        </p>
      )}

      {/* Description */}
      {description && (
        <p
          style={{
            fontFamily: "Hanken Grotesk, sans-serif",
            fontSize: "13px",
            lineHeight: "20px",
            color: "#4c4546",
            margin: 0,
            textAlign: "center",
            maxWidth: "260px",
          }}
          {...slotProps?.description}
        >
          {description}
        </p>
      )}

      {/* Action */}
      {action && <div style={{ marginTop: "1.25rem" }}>{action}</div>}
    </div>
  );
}