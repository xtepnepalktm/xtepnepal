import { useAppSelector } from "@/redux/hooks";
import { RouterLink } from "@/routes/components";
import { fDate } from "@/utils/format-time";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function BlogItem({ blog, detailsHref }) {
  const { vendor } = useAppSelector((state) => state.vendor);
  const { title, featured_image, created_at, short_description, category, reading_time } = blog || {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e2e2",
        transition: "border-color 300ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#000000";
        const img = e.currentTarget.querySelector(".blog-img");
        if (img) img.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e2e2e2";
        const img = e.currentTarget.querySelector(".blog-img");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1/1" }}>
        <img
          alt={title}
          src={featured_image}
          className="blog-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform",
          }}
        />

        {category && (
          <span
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              backgroundColor: "#E60012",
              color: "#ffffff",
              fontFamily: "Helvetica",
              fontSize: "10px",
              letterSpacing: "0.1em",
              fontWeight: 600,
              textTransform: "uppercase",
              padding: "4px 10px",
            }}
          >
            {category.name || category}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4c4546" }}>
            <Iconify icon="solar:calendar-linear" width={14} />
            {fDate(created_at)}
          </span>
          {reading_time && (
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4c4546" }}>
              <Iconify icon="solar:clock-circle-linear" width={14} />
              {reading_time} min read
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: "32px", height: "2px", backgroundColor: "#E60012" }} />

        {/* Title */}
        <RouterLink href={detailsHref} style={{ textDecoration: "none" }}>
          <h4
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "1.125rem",
              fontWeight: 700,
              lineHeight: 1.35,
              color: "#1a1c1c",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "color 250ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E60012")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1a1c1c")}
          >
            {title}
          </h4>
        </RouterLink>

        {/* Description */}
        {short_description && (
          <p
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: "14px",
              lineHeight: "22px",
              color: "#4c4546",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {short_description}
          </p>
        )}

        {/* Read more */}
        <RouterLink
          href={detailsHref}
          style={{
            marginTop: "auto",
            paddingTop: "0.75rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "Helvetica",
            fontSize: "11px",
            letterSpacing: "0.1em",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#000000",
            textDecoration: "none",
            borderTop: "1px solid #e2e2e2",
            transition: "color 250ms ease, gap 250ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#E60012";
            e.currentTarget.style.gap = "10px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#000000";
            e.currentTarget.style.gap = "6px";
          }}
        >
          Read Article
          <Iconify icon="solar:arrow-right-linear" width={16} />
        </RouterLink>
      </div>
    </div>
  );
}