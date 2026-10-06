// import { varAlpha } from 'minimal-shared/utils';

// import { switchClasses } from '@mui/material/Switch';

// // ----------------------------------------------------------------------

// const MuiSwitch = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: { alignItems: 'center' },
//     switchBase: ({ ownerState, theme }) => ({
//       top: 'unset',
//       transform: 'translateX(6px)',
//       [`&.${switchClasses.checked}`]: {
//         [`& .${switchClasses.thumb}`]: {
//           ...(ownerState.color === 'default' && {
//             ...theme.applyStyles('dark', {
//               color: theme.vars.palette.grey[800],
//             }),
//           }),
//         },
//         [`&+.${switchClasses.track}`]: {
//           opacity: 1,
//           ...(ownerState.color === 'default' && {
//             backgroundColor: theme.vars.palette.text.primary,
//           }),
//         },
//       },
//       [`&.${switchClasses.disabled}`]: {
//         [`& .${switchClasses.thumb}`]: {
//           opacity: 1,
//           ...theme.applyStyles('dark', {
//             opacity: 0.48,
//           }),
//         },
//         [`&+.${switchClasses.track}`]: { opacity: 0.48 },
//       },
//     }),
//     track: ({ theme }) => ({
//       opacity: 1,
//       borderRadius: 10,
//       backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.48),
//     }),
//     thumb: ({ theme }) => ({ color: theme.vars.palette.common.white }),
//     sizeMedium: {
//       [`& .${switchClasses.track}`]: { height: 20 },
//       [`& .${switchClasses.thumb}`]: { width: 14, height: 14 },
//     },
//     sizeSmall: {
//       [`& .${switchClasses.track}`]: { height: 16 },
//       [`& .${switchClasses.thumb}`]: { width: 10, height: 10 },
//     },
//   },
// };

// // ----------------------------------------------------------------------

// export const switches = { MuiSwitch };
'use client'
import { useState } from "react";

/**
 * Switch component — Tailwind CSS conversion of the MUI Switch styleOverrides.
 *
 * Props:
 *   checked       boolean
 *   onChange      (checked: boolean) => void
 *   size          "medium" | "small"   (default: "medium")
 *   color         "default" | "primary" | "secondary" | ...  (default: "primary")
 *   disabled      boolean
 *   label         string   (optional)
 */
export function Switch({
  checked = false,
  onChange,
  size = "medium",
  color = "primary",
  disabled = false,
  label,
}) {
  const isMedium = size === "medium";

  // Track (background pill)
  const trackBase =
    "relative rounded-[10px] transition-colors duration-200 ease-in-out flex-shrink-0";
  const trackSize = isMedium ? "w-[38px] h-[20px]" : "w-[30px] h-[16px]";

  const trackColor = checked
    ? color === "default"
      ? "bg-gray-900 dark:bg-gray-200"         // default color = text.primary
      : "bg-blue-600"                           // primary / other
    : "bg-gray-500/[0.48]";                     // unchecked = grey 500 @ 48% opacity

  const trackDisabled = disabled ? "opacity-[0.48]" : "";

  // Thumb (white circle)
  const thumbBase =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow transition-transform duration-200 ease-in-out";
  const thumbSize = isMedium ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]";

  // translateX(6px) unchecked, translateX(track - thumb - 6px) checked
  // medium: unchecked = 6px, checked = 38-14-6 = 18px
  // small:  unchecked = 6px, checked = 30-10-6 = 14px
  const thumbTranslate = checked
    ? isMedium
      ? "translate-x-[18px]"
      : "translate-x-[14px]"
    : "translate-x-[6px]";

  const thumbDisabled = disabled ? "opacity-100 dark:opacity-[0.48]" : "";

  return (
    <label
      className={[
        "inline-flex items-center gap-2 select-none",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      {/* Hidden native checkbox for a11y */}
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />

      {/* Track */}
      <span
        className={[trackBase, trackSize, trackColor, trackDisabled].join(" ")}
      >
        {/* Thumb */}
        <span
          className={[thumbBase, thumbSize, thumbTranslate, thumbDisabled].join(" ")}
        />
      </span>

      {label && (
        <span
          className={[
            "text-sm",
            disabled ? "text-gray-400" : "text-gray-800 dark:text-gray-200",
          ].join(" ")}
        >
          {label}
        </span>
      )}
    </label>
  );
}

// ---------------------------------------------------------------------------
// Demo
// ---------------------------------------------------------------------------
export default function App() {
  const [states, setStates] = useState({
    a: true,
    b: false,
    c: true,
    d: false,
  });

  const toggle = (key) =>
    setStates((prev) => ({ ...prev, [key]: !prev[key] }));

  const Row = ({ label, children }) => (
    <div className="flex items-center gap-4">
      <span className="w-36 text-sm text-gray-500 dark:text-gray-400">{label}</span>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-10">
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-8">
          Switch Component
        </h2>

        <Row label="Medium – checked">
          <Switch checked={states.a} onChange={() => toggle("a")} size="medium" label="On" />
        </Row>

        <Row label="Medium – unchecked">
          <Switch checked={states.b} onChange={() => toggle("b")} size="medium" label="Off" />
        </Row>

        <Row label="Small – checked">
          <Switch checked={states.c} onChange={() => toggle("c")} size="small" label="On" />
        </Row>

        <Row label="Small – unchecked">
          <Switch checked={states.d} onChange={() => toggle("d")} size="small" label="Off" />
        </Row>

        <Row label="Disabled – on">
          <Switch checked={true} size="medium" disabled label="Disabled" />
        </Row>

        <Row label="Disabled – off">
          <Switch checked={false} size="medium" disabled label="Disabled" />
        </Row>

        <Row label="Default color">
          <Switch checked={states.a} onChange={() => toggle("a")} size="medium" color="default" label="Default" />
        </Row>
      </div>
    </div>
  );
}