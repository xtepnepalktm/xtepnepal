// Tailwind equivalent of MuiPopover styleOverrides

// 1. Tailwind class string to apply to your Popover <Paper> / container element
const popoverPaperClasses = [
  // paperStyles(theme, { dropdown: true }) — typical MUI paper + dropdown shadow/border
  "bg-white dark:bg-neutral-800",          // background
  "text-neutral-900 dark:text-neutral-100", // foreground
  "",                             // border-radius
  "shadow-lg",                              // dropdown elevation shadow
  "border border-neutral-200 dark:border-neutral-700", // subtle border (dropdown variant)
  "overflow-hidden",                        // clip children to rounded corners

  // & .MuiList-root — remove list padding
  "[&_.MuiList-root]:pt-0",
  "[&_.MuiList-root]:pb-0",
].join(" ");

// 2. Usage in JSX — apply to whatever wraps your popover content
function MyPopover({ children }) {
  return (
    <div className={popoverPaperClasses}>
      {children}
    </div>
  );
}