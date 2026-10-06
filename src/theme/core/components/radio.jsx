'use client';

import { useState } from "react";

// ----------------------------------------------------------------------
// SVG Icons (no MUI dependency)
// ----------------------------------------------------------------------

const RadioIcon = ({ className = "" }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C13.9778 2 15.9112 2.58649 17.5557 3.6853C19.2002 4.78412 20.4819 6.3459 21.2388 8.17317C21.9957 10.0004 22.1937 12.0111 21.8079 13.9509C21.422 15.8907 20.4696 17.6725 19.0711 19.0711C17.6725 20.4696 15.8907 21.422 13.9509 21.8079C12.0111 22.1937 10.0004 21.9957 8.17317 21.2388C6.3459 20.4819 4.78412 19.2002 3.6853 17.5557C2.58649 15.9112 2 13.9778 2 12C2 6.477 6.477 2 12 2ZM12 3.5C9.74566 3.5 7.58365 4.39553 5.98959 5.98959C4.39553 7.58365 3.5 9.74566 3.5 12C3.5 14.2543 4.39553 16.4163 5.98959 18.0104C7.58365 19.6045 9.74566 20.5 12 20.5C14.2543 20.5 16.4163 19.6045 18.0104 18.0104C19.6045 16.4163 20.5 14.2543 20.5 12C20.5 9.74566 19.6045 7.58365 18.0104 5.98959C16.4163 4.39553 14.2543 3.5 12 3.5Z"
      fill="currentColor"
    />
  </svg>
);

const RadioCheckedIcon = ({ className = "" }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8Z"
      fill="currentColor"
    />
  </svg>
);

// ----------------------------------------------------------------------
// Radio Component
// ----------------------------------------------------------------------

const Radio = ({
  checked,
  onChange,
  disabled = false,
  color = "primary",   // "primary" | "default"
  size = "small",      // "small" | "medium"
  label,
  value,
  name,
}) => {
  const isDefault = color === "default";

  // Color classes when checked
  const colorClasses = {
    primary: "text-blue-600  dark:text-blue-400",
    secondary: "text-purple-600 dark:text-purple-400",
    error: "text-red-600   dark:text-red-400",
    warning: "text-yellow-500 dark:text-yellow-400",
    info: "text-sky-500   dark:text-sky-400",
    success: "text-green-600 dark:text-green-400",
    // "default" → text-primary (neutral dark/light)
    default: "text-neutral-900 dark:text-neutral-100",
  };

  const iconColor = disabled
    ? "text-neutral-300 dark:text-neutral-600"         // action.disabled
    : checked
      ? (colorClasses[color] ?? colorClasses.primary)
      : "text-neutral-400 dark:text-neutral-500";       // unchecked idle

  // padding: theme.spacing(1) = 8px
  const paddingClass = "p-2";

  // Size: small → icon w-5 h-5 (default in icons), medium → w-6 h-6
  const sizeClass = size === "medium" ? "[&_svg]:w-6 [&_svg]:h-6" : "";

  return (
    <label
      className={[
        "inline-flex items-center gap-2 cursor-pointer select-none",
        disabled ? "cursor-not-allowed opacity-60" : "",
      ].join(" ")}
    >
      {/* Hidden native input keeps accessibility + form support */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
      />

      {/* Icon wrapper — matches root padding + focus ring */}
      <span
        className={[
          "relative inline-flex items-center justify-center rounded-full",
          "transition-colors duration-150",
          paddingClass,
          sizeClass,
          iconColor,
          !disabled && "hover:bg-black/5 dark:hover:bg-white/10",
          "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-blue-500",
        ].join(" ")}
      >
        {checked ? <RadioCheckedIcon /> : <RadioIcon />}
      </span>

      {label && (
        <span className={`text-sm ${disabled ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-900 dark:text-neutral-100"}`}>
          {label}
        </span>
      )}
    </label>
  );
};

// ----------------------------------------------------------------------
// Demo
// ----------------------------------------------------------------------

export default function App() {
  const [selected, setSelected] = useState("option1");

  const options = [
    { value: "option1", label: "Option One", color: "primary" },
    { value: "option2", label: "Option Two", color: "secondary" },
    { value: "option3", label: "Default color", color: "default" },
    { value: "option4", label: "Disabled", color: "primary", disabled: true },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col items-center justify-center gap-4 p-8">
      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2 tracking-widest uppercase">
        Radio Group
      </p>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name="demo"
          value={opt.value}
          label={opt.label}
          color={opt.color}
          disabled={opt.disabled}
          checked={selected === opt.value}
          onChange={() => setSelected(opt.value)}
        />
      ))}
      <p className="mt-4 text-xs text-neutral-400">Selected: <strong>{selected}</strong></p>
    </div>
  );
}