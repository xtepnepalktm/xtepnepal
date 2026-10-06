"use client";

import { useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetAboutData } from "@/api/about";

// ----------------------------------------------------------------------

const AMBASSADOR_COLORS = [
  { bg: "rgba(33,150,243,0.12)", color: "#2196f3" },
  { bg: "rgba(156,39,176,0.12)", color: "#9c27b0" },
  { bg: "rgba(3,169,244,0.12)", color: "#03a9f4" },
  { bg: "rgba(76,175,80,0.12)", color: "#4caf50" },
  { bg: "rgba(255,152,0,0.12)", color: "#ff9800" },
  { bg: "rgba(244,67,54,0.12)", color: "#f44336" },
];

const getInitials = (name) => {
  if (!name) return "??";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
};

export function AboutTeam() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const { aboutData } = useGetAboutData();
  const ambassadors = aboutData?.teams || [];
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector(".swiper-card")?.offsetWidth || 320;
    trackRef.current.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <section
      className="container mx-auto lg:px-14 px-4"
      style={{
        paddingTop: "var(--section-gap, 5rem)",
        paddingBottom: "var(--section-gap, 5rem)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header row with nav buttons */}
      <div
        style={{
          marginBottom: "3rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
            <span style={{ display: "inline-block", width: "28px", height: "2px", backgroundColor: "#E60012" }} />
            <span
              style={{
                fontFamily: "Helvetica",
                fontSize: "11px",
                letterSpacing: "0.2em",
                fontWeight: 600,
                color: "#E60012",
                textTransform: "uppercase",
              }}
            >
              Champions
            </span>
          </div>

          <h2
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              textTransform: "uppercase",
              margin: "0 0 0.75rem",
              color: "#1a1c1c",
            }}
          >
            Worn by Champions.
          </h2>
          <p
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              color: "#4c4546",
              maxWidth: "36rem",
              margin: 0,
            }}
          >
            From basketball courts to professional marathons,{" "}
            {vendor?.name || "Xtep"} is the choice of elite athletes
            worldwide—now available in Nepal.
          </p>
        </div>

        {/* Prev / Next buttons */}
        <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
          {[{ dir: -1, label: "←" }, { dir: 1, label: "→" }].map(({ dir, label }) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              style={{
                width: "48px",
                height: "48px",
                border: "2px solid #000000",
                backgroundColor: "transparent",
                color: "#000000",
                fontFamily: "Sora, sans-serif",
                fontSize: "1.1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 200ms, color 200ms",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#000000";
                e.currentTarget.style.color = "#D1FF00";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#000000";
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "1rem",
          // paddingLeft: "clamp(1rem, 5vw, 5rem)",
          // paddingRight: "clamp(1rem, 5vw, 5rem)",
          paddingBottom: "2rem",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {ambassadors.map(({ id, name, designation, featured_image }, index) => (
          <AmbassadorCard
            key={id}
            name={name}
            designation={designation}
            featured_image={featured_image}
            color={AMBASSADOR_COLORS[index % AMBASSADOR_COLORS.length]}
            initials={getInitials(name)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function AmbassadorCard({ name, designation, featured_image, color, initials, index }) {
  return (
    <div
      className="swiper-card"
      style={{
        flexShrink: 0,
        width: "20rem",
        height: "28rem",
        position: "relative",
        overflow: "hidden",
        scrollSnapAlign: "start",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const media = e.currentTarget.querySelector(".card-media");
        if (media) media.style.transform = "scale(1.08)";
        const bar = e.currentTarget.querySelector(".neon-bar");
        if (bar) bar.style.transform = "scaleX(1)";
      }}
      onMouseLeave={(e) => {
        const media = e.currentTarget.querySelector(".card-media");
        if (media) media.style.transform = "scale(1)";
        const bar = e.currentTarget.querySelector(".neon-bar");
        if (bar) bar.style.transform = "scaleX(0)";
      }}
    >
      {/* Index label */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 3,
          fontFamily: "Helvetica",
          fontSize: "10px",
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Media */}
      {featured_image ? (
        <img
          alt={name}
          src={featured_image}
          className="card-media"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      ) : (
        <div
          className="card-media"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "4rem",
            fontWeight: 700,
            textTransform: "uppercase",
            backgroundColor: color.bg,
            color: color.color,
            transition: "transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {initials}
        </div>
      )}

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.1) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Neon top bar (hover reveal) */}
      <div
        className="neon-bar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          backgroundColor: "#D1FF00",
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          zIndex: 4,
        }}
      />

      {/* Text */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "1.5rem",
          right: "1.5rem",
          zIndex: 3,
        }}
      >
        <p
          style={{
            fontFamily: "Helvetica",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#D1FF00",
            margin: "0 0 0.35rem",
          }}
        >
          {designation || "AMBASSADOR"}
        </p>
        <p
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "1.375rem",
            fontWeight: 800,
            textTransform: "uppercase",
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            wordBreak: "break-words",
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
}