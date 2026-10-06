// "use client";

// export function ConfirmDialog({
//   open,
//   title,
//   action,
//   content,
//   onClose,
//   children,
//   ...other
// }) {
//   if (!open) return null;

//   return (
//     <div
//       className="fixed inset-0 z-[1300] flex items-center justify-center"
//       {...other}
//     >
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/50"
//         onClick={onClose}
//       />

//       {/* Dialog */}
//       <div className="relative w-full max-w-xs mx-4 overflow-hidden rounded-[4px] bg-white shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)]">
//         {/* Title */}
//         <div className="px-6 pt-5 pb-2">
//           <h2 className="text-xl font-medium text-gray-900">
//             {title}
//           </h2>
//         </div>

//         {/* Content */}
//         {content && (
//           <div className="px-6 pb-5 text-sm text-gray-700">
//             {content}
//           </div>
//         )}

//         {children}

//         {/* Actions */}
//         <div className="flex items-center justify-end gap-2 px-6 py-2">
//           {action}

//           <button
//             type="button"
//             onClick={onClose}
//             className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-[6px] text-sm font-medium text-gray-700 transition hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

const cancelBtn = {
  fontFamily: "Helvetica",
  fontSize: 9, fontWeight: 700,
  letterSpacing: "0.12em", textTransform: "uppercase",
  color: TEXT_MUTED,
  backgroundColor: BG,
  border: `1px solid ${BORDER}`,
  padding: "0.3rem 0.75rem",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "border-color 0.15s, color 0.15s",
};

export function ConfirmDialog({
  open,
  title,
  action,
  content,
  onClose,
  children,
  ...other
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        zIndex: 1300,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      {...other}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Dialog */}
      <div style={{
        position: "relative",
        width: "100%", maxWidth: 320,
        margin: "0 1rem",
        backgroundColor: WHITE,
        border: `1px solid ${BORDER}`,
        boxShadow: "0 24px 48px rgba(0,0,0,0.16)",
        overflow: "hidden",
      }}>

        {/* Header stripe */}
        <div style={{
          backgroundColor: BG,
          borderBottom: `1px solid ${BORDER}`,
          padding: "0.75rem 1rem",
        }}>
          <h2 style={{
            fontFamily: "Helvetica",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: TEXT, margin: 0,
          }}>
            {title}
          </h2>
        </div>

        {/* Content */}
        {content && (
          <div style={{
            padding: "0.875rem 1rem",
            fontFamily: "Helvetica",
            fontSize: 11, fontWeight: 600,
            color: TEXT_MUTED, lineHeight: 1.6,
            borderBottom: `1px solid ${BORDER}`,
          }}>
            {content}
          </div>
        )}

        {children}

        {/* Actions */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          gap: "0.5rem",
          padding: "0.625rem 1rem",
          backgroundColor: BG,
        }}>
          {action}

          <button
            type="button"
            onClick={onClose}
            style={cancelBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = TEXT_MUTED;
              e.currentTarget.style.color = TEXT;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = BORDER;
              e.currentTarget.style.color = TEXT_MUTED;
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}