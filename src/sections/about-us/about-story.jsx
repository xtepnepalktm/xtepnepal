"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { paths } from "@/routes/paths";
import { useGetOurStory } from "@/api";
import { Markdown } from "@/components/markdown";

export function AboutStory() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const primaryColor = vendor?.primary_color;
  const { ourStoryData } = useGetOurStory();
  const { title = "", subtitle, description, featured_image } = ourStoryData || {};
  // const storyImage = vendor?.story_image || vendor?.banner_image || undefined;
  const vendorName = vendor?.vendor_name;
  const vendorEstdDate = vendor?.estd_date;
  const year = new Date(vendorEstdDate).getFullYear();
  console.log(year, "year");
  return (
    <section
      style={{
        padding: "clamp(4rem, 10vw, 100px) clamp(20px, 5vw, 64px)",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Dot-grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.04) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      {/* Large ghost text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-2rem",
          transform: "translateY(-50%)",

          fontSize: "clamp(6rem, 18vw, 18rem)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          color: "rgba(0,0,0,0.03)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        STORY
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="story-grid"
        >
          {/* Image Side */}
          <div
            style={{ position: "relative" }}
            className="story-image-col"
          >
            {/* Offset border frame */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                right: "-1.5rem",
                bottom: "-1.5rem",
                border: `2px solid ${primaryColor}`,
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                aspectRatio: "4/5",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector("img");
                // if (img) img.style.filter = "grayscale(0%)";
                if (img) img.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector("img");
                // if (img) img.style.filter = "grayscale(100%)";
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <img
                src={featured_image || "/assets/images/about/brand.jpeg"}
                alt={title}
                title={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "grayscale(0%)",
                  transform: "scale(1)",
                  transition: "filter 700ms ease, transform 700ms ease",
                }}
              />

              {/* Bottom brand tag */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.25rem 1.5rem",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    letterSpacing: "0.15em",
                    fontWeight: 600,
                    color: "#ffffff",
                    textTransform: "uppercase",
                  }}
                >
                  {vendorName.toUpperCase()}
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    letterSpacing: "0.1em",
                    color: "#D1FF00",
                    fontWeight: 600,

                  }}
                >
                  ESTD. {year}
                </span>
              </div>
            </div>

            {/* Floating stat card */}
            <div
              style={{
                position: "absolute",
                bottom: "-2rem",
                right: "-2rem",
                zIndex: 2,
                backgroundColor: primaryColor,
                padding: "1.25rem 1.5rem",
                minWidth: "140px",
              }}
            >
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {new Date().getFullYear() - year}+
              </p>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.75)",
                  margin: "0.4rem 0 0",
                  textTransform: "uppercase",
                }}
              >
                Years of Innovation
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div
            className="story-content-col"
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "32px",
                  height: "2px",
                  backgroundColor: "#E60012",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                  color: "#E60012",
                  textTransform: "uppercase",
                }}
              >
                {subtitle}
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1,
                color: "#1a1c1c",
                margin: 0,
              }}
            >
              {title.split(", ")[0]},
              <br />
              <span style={{ color: "#E60012" }}>
                {title.split(", ")[1]?.split(" &")[0]}
              </span>
              <br />
              &amp; {title.split(" &")[1]}
            </h2>

            {/* Body */}
            <Markdown
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#4c4546",
                margin: 0,
              }}
              children={description}
            />

            {/* Pull quote */}
            <div
              style={{
                position: "relative",
                padding: "1.5rem 1.5rem 1.5rem 2rem",
                backgroundColor: "#000000",
                marginTop: "0.5rem",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "3px",
                  height: "100%",
                  backgroundColor: primaryColor,
                }}
              />
              <p
                style={{
                  // 
                  fontSize: "15px",
                  lineHeight: "24px",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                  letterSpacing: "0.01em",
                }}
              >
                &quot;We don&apos;t just create products; we engineer experiences
                that allow our customers to transcend their expectations.&quot;
              </p>
            </div>

            {/* Commitment block */}
            <div style={{ marginTop: "0.5rem" }}>
              <h4
                style={{
                  // 
                  fontSize: "20px",
                  // fontWeight: 700,
                  color: "#1a1c1c",
                  margin: "0 0 0.5rem",
                }}
              >
                Our Commitment
              </h4>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#4c4546",
                  margin: 0,
                }}
              >
                Combining cutting-edge technology with deep market insights to
                deliver exceptional experiences across every touchpoint.
              </p>
            </div>

            {/* CTA */}
            <div style={{ marginTop: "0.5rem" }}>
              <Link
                href={paths.category}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: "#000000",
                  color: "white",
                  padding: "1rem 2rem",
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                  // textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background-color 200ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E60012";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#000000";
                  e.currentTarget.style.color = "white";
                }}
              >
                Explore Products
                <span style={{ fontSize: "1rem" }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .story-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}