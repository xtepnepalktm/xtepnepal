import { Toaster } from 'sonner';

// ── Design tokens ──
const SURFACE = "#ffffff";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#ebebeb";
const HOVER_BG = "#f4f4f5";

// ── Status accents (drive the icon tile + top glow line) ──
const ACCENT_DEFAULT = "#1a1a1a";
const ACCENT_SUCCESS = "#16a34a";
const ACCENT_ERROR = "#e61911";
const ACCENT_WARNING = "#d97706";
const ACCENT_INFO = "#2563eb";

// Styles target sonner's data attributes, which are stable and win over sonner's defaults.
// Positioning and width (desktop + mobile) are left to sonner.
const T = "[data-sonner-toaster] [data-sonner-toast]";

export function SnackbarRoot(props) {
  return (
    <>
      <style>{`
        @keyframes snackbar-rotate { to { transform: rotate(1turn); } }

        /* Use the site font instead of sonner's system font */
        [data-sonner-toaster] { font-family: inherit; }

        /* ── Toast base ── */
        ${T} {
          --accent: ${ACCENT_DEFAULT};
          box-sizing: border-box;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 44px 12px 12px;
          border-radius: 12px;
          overflow: hidden;
          color: ${TEXT};
          background-color: ${SURFACE};
          border: 1px solid ${BORDER};
          box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 28px -10px rgba(0,0,0,0.16);
          font-family: inherit;
        }
        ${T}[data-type="success"] { --accent: ${ACCENT_SUCCESS}; }
        ${T}[data-type="error"]   { --accent: ${ACCENT_ERROR}; }
        ${T}[data-type="warning"] { --accent: ${ACCENT_WARNING}; }
        ${T}[data-type="info"]    { --accent: ${ACCENT_INFO}; }

        /* Accent line along the top edge */
        ${T}::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0.9;
          pointer-events: none;
        }

        /* ── Icon tile ── */
        ${T} [data-icon] {
          width: 36px;
          height: 36px;
          margin: 0;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          color: var(--accent);
          background-color: color-mix(in srgb, var(--accent) 10%, transparent);
        }
        ${T} [data-icon] > * { flex-shrink: 0; }
        ${T} [data-icon] svg { width: 20px; height: 20px; }

        /* ── Content ── */
        ${T} [data-content] {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        ${T} [data-title] {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: -0.005em;
          color: ${TEXT};
          overflow-wrap: anywhere;
        }
        ${T} [data-description] {
          font-size: 12px;
          font-weight: 400;
          line-height: 1.45;
          color: ${TEXT_MUTED};
          overflow-wrap: anywhere;
        }

        /* ── Close button ── */
        ${T} [data-close-button] {
          position: absolute;
          top: 50%;
          right: 10px;
          left: auto;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 6px;
          color: #a3a3a3;
          background-color: transparent;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }
        ${T} [data-close-button]:hover {
          color: ${TEXT};
          background-color: ${HOVER_BG};
          border: 0;
        }

        /* ── Action / cancel buttons ── */
        ${T} [data-button] {
          flex-shrink: 0;
          height: 28px;
          padding: 0 12px;
          border: 0;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          color: #ffffff;
          background-color: ${TEXT};
          transition: opacity 0.15s;
        }
        ${T} [data-button]:hover { opacity: 0.85; }
        ${T} [data-button][data-cancel] {
          color: ${TEXT};
          background-color: ${HOVER_BG};
        }

        /* ── Loading spinner ── */
        ${T} .snackbar__spinner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #e5e5e5;
          border-top-color: ${TEXT};
          animation: snackbar-rotate 0.8s linear infinite;
        }
      `}</style>

      <Toaster {...props} />
    </>
  );
}
