"use client";

// ----------------------------------------------------------------------

export function ThemeProvider({ children, ...other }) {
  return (
    <>
      {children}
    </>
  );
}

// ----------------------------------------------------------------------
// Add the following to your global.css to replicate the CSS variables
// that MUI's ThemeVarsProvider injected (adjust values to match your
// previous createTheme() config):
//
// :root {
//   /* Palette */
//   --palette-primary-main: #1976d2;
//   --palette-primary-light: #42a5f5;
//   --palette-primary-dark: #1565c0;
//   --palette-primary-main-channel: 25 118 210;   /* for alpha usage */
//
//   --palette-secondary-main: #9c27b0;
//
//   --palette-error-main: #d32f2f;
//   --palette-warning-main: #ed6c02;
//   --palette-success-main: #2e7d32;
//   --palette-info-main: #0288d1;
//
//   /* Text */
//   --text-primary: rgba(0, 0, 0, 0.87);
//   --text-secondary: rgba(0, 0, 0, 0.60);
//   --text-disabled: rgba(0, 0, 0, 0.38);
//
//   /* Background */
//   --background-paper: #ffffff;
//   --background-default: #f5f5f5;
//
//   /* Action */
//   --action-hover: rgba(0, 0, 0, 0.04);
//   --action-selected: rgba(0, 0, 0, 0.08);
//   --action-disabled: rgba(0, 0, 0, 0.26);
//
//   /* Divider */
//   --divider: rgba(0, 0, 0, 0.12);
//
//   /* Vendor override (set by vendor details API) */
//   /* --vendor-primary-color: #1976d2; */
// }
//
// /* Dark mode */
// [data-color-scheme="dark"] {
//   --text-primary: rgba(255, 255, 255, 0.87);
//   --text-secondary: rgba(255, 255, 255, 0.60);
//   --text-disabled: rgba(255, 255, 255, 0.38);
//   --background-paper: #1e1e1e;
//   --background-default: #121212;
//   --action-hover: rgba(255, 255, 255, 0.08);
//   --divider: rgba(255, 255, 255, 0.12);
// }