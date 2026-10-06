
"use client";

import { useAppSelector } from "@/redux/hooks";
import { Markdown } from "@/components/markdown";
import { useGetAboutData } from "@/api/about";

// ----------------------------------------------------------------------

export function AboutHero() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const { aboutData } = useGetAboutData();
  const primaryColor = vendor?.primary_color;

  const { title, subtitle, description, hero_image } = aboutData || {};

  return (
    <section
      style={{
        position: "relative",
        minHeight: "75vh",
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        paddingTop: "50px",
        marginTop: "10px"
      }}
    >
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src={hero_image || "/assets/background/banner-home.webp"}
          alt={title || "About Us"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 20%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 0%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.06) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <div
        className="container mx-auto"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",

          margin: "0 auto",
          paddingLeft: "clamp(20px, 5vw, 64px)",
          paddingRight: "clamp(20px, 5vw, 64px)",
          paddingBottom: "clamp(3rem, 6vw, 6rem)",
          paddingLeft: "calc(clamp(20px, 5vw, 64px) + 20px)",
        }}
      >
        {/* Eyebrow */}
        {subtitle && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "2px",
                backgroundColor: primaryColor,
              }}
            />
            <p
              style={{
                fontFamily: "Helvetica",
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "0.2em",
                fontWeight: 600,
                color: "white",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </p>
          </div>
        )}

        {/* Title */}
        <h1
          className="text-4xl md:text-7xl  text-white"
          style={{
            fontFamily: "Sora, sans-serif",
            // lineHeight: "clamp(2.75rem, 8.5vw, 90px)",
            // letterSpacing: "-0.04em",
            // fontWeight: 800,
            color: "#ffffff",
            margin: "0 0 1.5rem",
            maxWidth: "16ch",
          }}
        >
          {title || "About Us"}
        </h1>

        {/* Divider */}
        <div
          style={{
            width: "80px",
            height: "3px",
            backgroundColor: "#E60012",
            marginBottom: "1.5rem",
          }}
        />

        {/* Description */}
        {/* {description && (
          <div
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: "18px",
              lineHeight: "28px",
              color: "rgba(255,255,255,0.85)",
              maxWidth: "560px",
            }}
          >
            <Markdown>{description}</Markdown>
          </div>
        )} */}

        {/* Brand tag */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "10px 20px",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#E60012",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "Helvetica",
              fontSize: "11px",
              letterSpacing: "0.15em",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
            }}
          >
            {vendor?.name || "Xtep Nepal"} — Official Store
          </span>
        </div>
      </div>

      {/* Bottom edge rule */}
      {/* <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(to right, #E60012, #D1FF00, transparent)",
                    zIndex: 10,
                }}
            /> */}
    </section>
  );
}
