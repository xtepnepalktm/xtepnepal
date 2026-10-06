"use client";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { fDate } from "@/utils/format-time";
import { Markdown } from "@/components/markdown";
import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import { EmptyContent } from "@/components/empty-content";
import { Iconify } from "@/components/iconify";
import { BlogDetailsSkeleton } from "../blog-skeleton";
import { useGetBlogDetail, useGetBlogs } from "@/api";

// ----------------------------------------------------------------------

function RecentBlogCard({ blog }) {
  const { title, featured_image, created_at, slug } = blog;

  return (
    <RouterLink
      href={paths.blog.details(slug)}
      style={{ textDecoration: "none" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#000000";
        const img = e.currentTarget.querySelector(".recent-img");
        if (img) img.style.transform = "scale(1.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e2e2e2";
        const img = e.currentTarget.querySelector(".recent-img");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          padding: "0.75rem",
          border: "1px solid #e2e2e2",
          backgroundColor: "#ffffff",
          transition: "border-color 250ms ease",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <img
            src={featured_image}
            alt={title}
            className="recent-img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 500ms cubic-bezier(0.4,0,0.2,1)",
              willChange: "transform",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              lineHeight: 1.4,
              color: "#1a1c1c",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </p>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11px",
              color: "#4c4546",
              fontFamily: "Hanken Grotesk, sans-serif",
            }}
          >
            <Iconify icon="solar:calendar-linear" width={12} />
            {fDate(created_at)}
          </span>
        </div>
      </div>
    </RouterLink>
  );
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

function SidebarSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", border: "1px solid #e2e2e2" }}>
          <div style={{ width: "72px", height: "72px", backgroundColor: "#e2e2e2", flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", justifyContent: "center" }}>
            <div style={{ height: "12px", backgroundColor: "#e2e2e2", width: "100%" }} />
            <div style={{ height: "12px", backgroundColor: "#e2e2e2", width: "60%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------

export function BlogDetailsView({ slug }) {
  const { blog, isLoading, error } = useGetBlogDetail(slug);
  const { blogs: allBlogs, isLoading: blogsLoading } = useGetBlogs();

  const { title, description, featured_image, created_by, created_at, category } = blog || {};

  // const recentBlogs = allBlogs.filter((b) => b.slug !== slug).slice(0, 5);
  const recentBlogs = allBlogs
    .filter((b) => {
      if (!slug || !b.title || !title) return true;
      return b.title.toString().trim() !== title.toString().trim();
    })
    .slice(0, 5);

  const isBlogFound = !isLoading && !error && title;
  const isBlogMissing = !isLoading && (error || !title);

  const readingTime = description
    ? Math.ceil(description.replace(/<[^>]*>/g, "").split(/\s+/).length / 200)
    : 3;

  const renderError = () => (
    <EmptyContent
      title="Blog Not Found"
      description="The article you're looking for isn't available."
      action={
        <RouterLink
          href={paths.blog.root}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "1rem",
            padding: "0.625rem 1.25rem",
            border: "1px solid #000000",
            backgroundColor: "transparent",
            fontFamily: "Helvetica",
            fontSize: "11px",
            letterSpacing: "0.1em",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#000000",
            textDecoration: "none",
            transition: "background-color 200ms, color 200ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#000000";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#000000";
          }}
        >
          <Iconify icon="solar:arrow-left-linear" width={16} />
          Back to Blog
        </RouterLink>
      }
      className="py-20"
    />
  );

  const renderBlog = () => (
    <>
      {/* ── Hero ── */}
      <div className="" style={{ position: "relative", height: "clamp(320px, 55vh, 560px)", overflow: "hidden" }}>
        {/* Layered overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
          }}
        />

        {/* Dot texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />

        <img
          src={featured_image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px) clamp(2rem, 4vw, 3.5rem)",
          }}
        >
          {/* Category */}
          {category && (
            <div style={{ marginBottom: "1rem" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#E60012",
                  color: "#ffffff",
                  fontFamily: "Helvetica",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  padding: "5px 12px",
                }}
              >
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              margin: "0 0 1.25rem",
              maxWidth: "800px",
            }}
          >
            {title}
          </h1>

          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            {/* Author avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#E60012",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Sora, sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#ffffff",
                  flexShrink: 0,
                }}
              >
                {created_by?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <span
                style={{
                  fontFamily: "Hanken Grotesk, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                {created_by || "Admin"}
              </span>
            </div>

            <span style={{ width: "1px", height: "16px", backgroundColor: "rgba(255,255,255,0.3)" }} />

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <Iconify icon="solar:calendar-linear" width={14} />
              {fDate(created_at)}
            </span>

            <span style={{ width: "1px", height: "16px", backgroundColor: "rgba(255,255,255,0.3)" }} />


          </div>
        </div>

        {/* Bottom red rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(to right, #E60012, #D1FF00, transparent)",
            zIndex: 4,
          }}
        />
      </div>

      {/* ── Breadcrumbs ── */}
      <div
        className="container w-full mx-auto"
        style={{
          // maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 64px)",
          borderBottom: "1px solid #e2e2e2",
        }}
      >
        <CustomBreadcrumbs
          links={[
            { name: "Home", href: paths.home },
            { name: "Blog", href: paths.blog.root },
            { name: title },
          ]}
          sx={{ py: 2.5 }}
        />
      </div>

      {/* ── Body ── */}
      <div

        style={{
          // maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem clamp(20px, 5vw, 64px) 5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
        }}
        className="blog-layout container w-full mx-auto"
      >
        {/* Article */}
        <div className="blog-main">
          {/* Article body */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e2e2",
              padding: "2rem",
            }}
          >
            <Markdown children={description} />
          </div>

          {/* Share + back row */}
          <div
            style={{
              marginTop: "1.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #e2e2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* <ShareButtons title={title} /> */}

            <RouterLink
              href={paths.blog.root}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "Helvetica",
                fontSize: "11px",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "#4c4546",
                textDecoration: "none",
                transition: "color 200ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E60012")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4c4546")}
            >
              <Iconify icon="solar:arrow-left-linear" width={16} />
              All Articles
            </RouterLink>
          </div>
        </div>

        {/* Sidebar */}
        <div className="blog-sidebar">
          <div style={{ position: "sticky", top: "6rem", display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Recent posts */}
            <div>
              {/* Sidebar header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "1rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid #e2e2e2",
                }}
              >
                <span style={{ display: "inline-block", width: "20px", height: "2px", backgroundColor: "#E60012" }} />
                <h3
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "#1a1c1c",
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  Recent Posts
                </h3>
              </div>

              {blogsLoading ? (
                <SidebarSkeleton />
              ) : recentBlogs.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {recentBlogs.map((b) => (
                    <RecentBlogCard key={b.id} blog={b} />
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    fontFamily: "Hanken Grotesk, sans-serif",
                    fontSize: "13px",
                    color: "#4c4546",
                    textAlign: "center",
                    padding: "1.5rem 0",
                  }}
                >
                  No other posts available
                </p>
              )}

              {recentBlogs.length > 0 && (
                <RouterLink
                  href={paths.blog.root}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    marginTop: "1rem",
                    padding: "0.75rem",
                    border: "1px solid #000000",
                    backgroundColor: "transparent",
                    fontFamily: "Helvetica",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#000000",
                    textDecoration: "none",
                    transition: "background-color 200ms ease, color 200ms ease",
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
                  View All Posts
                  <Iconify icon="solar:arrow-right-linear" width={16} />
                </RouterLink>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .blog-layout {
            grid-template-columns: 1fr 340px !important;
          }
        }
      `}</style>
    </>
  );

  return (
    <>
      {isLoading && <BlogDetailsSkeleton />}
      {isBlogFound && renderBlog()}
      {isBlogMissing && renderError()}
    </>
  );
}