// import { Markdown } from "@/components/markdown";

// // ----------------------------------------------------------------------

// export function ProductDetailsDescription({ description, sx }) {
//   return (
//     <Markdown
//       children={description}
//       sx={[
//         () => ({
//           p: 4,
//           "& p, li, ol, table": { typography: "body2" },
//           "& table": {
//             mt: 2,
//             maxWidth: 640,
//             "& td": { px: 2 },
//             "& td:first-of-type": { color: "text.secondary" },
//             "tbody tr:nth-of-type(odd)": { bgcolor: "transparent" },
//           },
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//     />
//   );
// }

export function ProductDetailsDescription({ description }) {
  // ── Normalise ──────────────────────────────────────────────────
  // Accept both a plain string and the structured object shape.
  const isStructured =
    description &&
    typeof description === "object" &&
    ("summary" in description ||
      "features" in description ||
      "specs" in description);

  if (!isStructured) {
    // Plain HTML / string fallback — still styled consistently
    return (
      <div className="py-8">
        <SectionEyebrow label="Description" />
        <div
          className="prose prose-sm max-w-none  leading-relaxed mt-6 text-white" sytle={{ color: "#ffffff !important" }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    );
  }

  const { summary, features = [], specs = [] } = description;

  return (
    <div className="py-8 flex flex-col gap-10">

      {/* ── Summary ─────────────────────────────────────────────── */}
      {summary && (
        <div>
          <SectionEyebrow label="About this product" />
          <div className="mt-5 text-white! text-[15px] leading-7 max-w-2xl">
            {summary}
          </div>
        </div>
      )}

      {/* ── Features + Specs side-by-side on md+ ─────────────────── */}
      {(features.length > 0 || specs.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Feature Highlights */}
          {features.length > 0 && (
            <div>
              <SectionEyebrow label="Key Features" />
              <ul className="mt-5 flex flex-col divide-y divide-gray-100">
                {features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 py-3 text-[14px] text-white! leading-snug"
                  >
                    {/* Sharp check mark — no rounded badge */}
                    <span
                      className="mt-0.5 shrink-0 w-4 h-4 flex items-center justify-center  text-white"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 10 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-2.5 h-2.5"
                      >
                        <path d="M1 4l2.5 2.5L9 1" strokeLinecap="square" />
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Specs Table */}
          {specs.length > 0 && (
            <div>
              <SectionEyebrow label="Specifications" />
              <table className="mt-5 w-full text-[13px] border-collapse">
                <tbody>
                  {specs.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-2.5 px-3 font-medium text-white! uppercase tracking-wider text-[11px] w-2/5 border border-gray-100">
                        {row.label}
                      </td>
                      <td className="py-2.5 px-3 text-white! border border-gray-100">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

// ── Sub-component ────────────────────────────────────────────────
/**
 * SectionEyebrow
 * Uppercase label + full-width hairline rule — the signature
 * structural device from the Xtep mockup.
 */
function SectionEyebrow({ label }) {
  return (
    <div className="flex items-center gap-4">
      <span className="shrink-0 text-[11px] font-bold tracking-[0.15em] uppercase text-white">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}