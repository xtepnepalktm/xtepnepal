'use client'
import { useState, forwardRef } from "react";

// ─── Shared base classes ───────────────────────────────────────────────────────
// MuiInputBase:
//   font-size: 15px (rem), sm: 16px (prevents Safari zoom)
//   placeholder: opacity 1, color: text.disabled
//   disabled svg: color text.disabled
//   input:focus → borderRadius: inherit
const inputBaseClasses = [
  "w-full bg-transparent outline-none",
  "text-[15px] sm:text-[16px] md:text-[0.9375rem]", // 15px desktop, 16px mobile (Safari zoom fix)
  "text-gray-900 dark:text-gray-100",
  "placeholder:text-gray-400 placeholder:opacity-100",
  "disabled:cursor-not-allowed",
  "focus:rounded-[inherit]",
].join(" ");

// ─── Outlined Input ────────────────────────────────────────────────────────────
// MuiOutlinedInput:
//   notchedOutline: borderColor grey/500 @ 20%, transition border-color shortest
//   focused → border text.primary
//   error   → border error.main
//   disabled→ border action.disabledBackground
const OutlinedInput = forwardRef(function OutlinedInput(
  { value, onChange, placeholder, disabled, error, type = "text", startAdornment, endAdornment, ...props },
  ref
) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? "border-red-500"
    : disabled
      ? "border-gray-200 dark:border-gray-700"
      : focused
        ? "border-gray-900 dark:border-gray-100"
        : "border-gray-500/20";

  return (
    <div
      className={[
        "relative flex items-center rounded",
        "border transition-[border-color] duration-[150ms] ease-in-out",
        borderColor,
        disabled ? "bg-transparent" : "",
      ].join(" ")}
    >
      {startAdornment && (
        <span className="pl-3 text-gray-500 dark:text-gray-400 flex items-center shrink-0">
          {startAdornment}
        </span>
      )}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[inputBaseClasses, "px-3 py-2.5 rounded-[inherit]"].join(" ")}
        {...props}
      />
      {endAdornment && (
        <span className={["pr-3 flex items-center shrink-0", disabled ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"].join(" ")}>
          {endAdornment}
        </span>
      )}
    </div>
  );
});

// ─── Filled Input ──────────────────────────────────────────────────────────────
// MuiFilledInput (disableUnderline: true):
//   bg: grey/500 @ 8%, hover: 16%, focused: 16%
//   error: bg error.main @ 8%, focused-error: 16%
//   disabled: action.disabledBackground
const FilledInput = forwardRef(function FilledInput(
  { value, onChange, placeholder, disabled, error, type = "text", startAdornment, endAdornment, ...props },
  ref
) {
  const [focused, setFocused] = useState(false);

  const bg = disabled
    ? "bg-gray-200/60 dark:bg-gray-700/60"
    : error
      ? focused
        ? "bg-red-500/[0.16]"
        : "bg-red-500/[0.08] hover:bg-red-500/[0.12]"
      : focused
        ? "bg-gray-500/[0.16]"
        : "bg-gray-500/[0.08] hover:bg-gray-500/[0.16]";

  return (
    <div
      className={[
        "relative flex items-center rounded transition-colors duration-150",
        bg,
        // no underline (disableUnderline: true)
      ].join(" ")}
    >
      {startAdornment && (
        <span className="pl-3 text-gray-500 dark:text-gray-400 flex items-center shrink-0">
          {startAdornment}
        </span>
      )}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[inputBaseClasses, "px-3 py-2.5 rounded-[inherit]"].join(" ")}
        {...props}
      />
      {endAdornment && (
        <span className={["pr-3 flex items-center shrink-0", disabled ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"].join(" ")}>
          {endAdornment}
        </span>
      )}
    </div>
  );
});

// ─── Standard (Underline) Input ────────────────────────────────────────────────
// MuiInput underline:
//   ::before (idle): borderBottomColor grey/500 @ 32%
//   ::after  (focused): borderBottomColor text.primary
const StandardInput = forwardRef(function StandardInput(
  { value, onChange, placeholder, disabled, error, type = "text", startAdornment, endAdornment, ...props },
  ref
) {
  const [focused, setFocused] = useState(false);

  const underline = error
    ? "after:border-red-500 before:border-red-400"
    : disabled
      ? "before:border-gray-300 dark:before:border-gray-600"
      : focused
        ? "after:scale-x-100 after:border-gray-900 dark:after:border-gray-100"
        : "before:border-gray-500/[0.32] after:scale-x-0";

  return (
    <div
      className={[
        // underline via pseudo — use box-shadow trick via CSS, or two absolute divs:
        "relative flex items-center pb-px",
      ].join(" ")}
    >
      {startAdornment && (
        <span className="pr-2 text-gray-500 dark:text-gray-400 flex items-center shrink-0">
          {startAdornment}
        </span>
      )}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[inputBaseClasses, "px-0 py-2"].join(" ")}
        {...props}
      />
      {endAdornment && (
        <span className={["pl-2 flex items-center shrink-0", disabled ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"].join(" ")}>
          {endAdornment}
        </span>
      )}
      {/* ::before — idle underline */}
      <span className="absolute bottom-0 left-0 right-0 h-px bg-gray-500/[0.32]" />
      {/* ::after — active underline */}
      <span
        className={[
          "absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-[150ms] origin-center",
          error ? "bg-red-500 scale-x-100" : "bg-gray-900 dark:bg-gray-100",
          focused && !error ? "scale-x-100" : "scale-x-0",
        ].join(" ")}
      />
    </div>
  );
});

// ─── TextField ─────────────────────────────────────────────────────────────────
// MuiTextField defaultProps: variant="outlined"
// Wraps label + helper text + input variant
export const TextField = forwardRef(function TextField(
  {
    label,
    helperText,
    error = false,
    disabled = false,
    required = false,
    variant = "outlined", // "outlined" | "filled" | "standard"
    type = "text",
    value,
    onChange,
    placeholder,
    startAdornment,
    endAdornment,
    fullWidth = true,
    className = "",
    ...props
  },
  ref
) {
  const InputComponent =
    variant === "filled"
      ? FilledInput
      : variant === "standard"
        ? StandardInput
        : OutlinedInput;

  return (
    <div className={["flex flex-col gap-1", fullWidth ? "w-full" : "w-fit", className].join(" ")}>
      {label && (
        <label
          className={[
            "text-[0.8125rem] font-medium leading-tight",
            error
              ? "text-red-500"
              : disabled
                ? "text-gray-300 dark:text-gray-600"
                : "text-gray-600 dark:text-gray-400",
          ].join(" ")}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <InputComponent
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        {...props}
      />

      {helperText && (
        <p
          className={[
            "text-xs leading-tight",
            error ? "text-red-500" : "text-gray-400 dark:text-gray-500",
          ].join(" ")}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

// ─── Demo ─────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
  </svg>
);
const EyeIcon = () => (
  <svg className="w-4 h-4 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd" />
  </svg>
);

export default function App() {
  const [vals, setVals] = useState({
    outlined: "",
    filled: "",
    standard: "",
    search: "",
    password: "",
    error: "bad input",
    disabled: "can't touch this",
  });
  const set = (k) => (e) => setVals((p) => ({ ...p, [k]: e.target.value }));

  const Section = ({ title, children }) => (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        {title}
      </p>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 max-w-2xl mx-auto space-y-8">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        TextField Component
      </h2>

      <Section title="Outlined (default)">
        <TextField
          label="Email"
          placeholder="you@example.com"
          value={vals.outlined}
          onChange={set("outlined")}
          required
        />
        <TextField
          label="Search"
          placeholder="Search…"
          value={vals.search}
          onChange={set("search")}
          startAdornment={<SearchIcon />}
        />
      </Section>

      <Section title="Filled">
        <TextField
          variant="filled"
          label="Username"
          placeholder="johndoe"
          value={vals.filled}
          onChange={set("filled")}
        />
        <TextField
          variant="filled"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={vals.password}
          onChange={set("password")}
          endAdornment={<EyeIcon />}
        />
      </Section>

      <Section title="Standard">
        <TextField
          variant="standard"
          label="Full name"
          placeholder="Jane Smith"
          value={vals.standard}
          onChange={set("standard")}
        />
        <TextField
          variant="standard"
          label="With icon"
          placeholder="Search…"
          value={vals.search}
          onChange={set("search")}
          startAdornment={<SearchIcon />}
        />
      </Section>

      <Section title="States">
        <TextField
          label="Error state"
          value={vals.error}
          onChange={set("error")}
          error
          helperText="This field contains an error."
        />
        <TextField
          label="Disabled"
          value={vals.disabled}
          disabled
          helperText="This field is disabled."
        />
        <TextField
          variant="filled"
          label="Filled error"
          value={vals.error}
          onChange={set("error")}
          error
          helperText="Something went wrong."
        />
        <TextField
          variant="standard"
          label="Standard error"
          value={vals.error}
          onChange={set("error")}
          error
        />
      </Section>
    </div>
  );
}