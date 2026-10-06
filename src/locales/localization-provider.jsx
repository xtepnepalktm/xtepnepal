// "use client";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider as Provider } from "@mui/x-date-pickers/LocalizationProvider";

// // ----------------------------------------------------------------------

// export function LocalizationProvider({ children }) {
//   return <Provider dateAdapter={AdapterDayjs}>{children}</Provider>;
// }
"use client";

import dayjs from "dayjs";

// ----------------------------------------------------------------------

export function LocalizationProvider({ children }) {
  // Optional global configuration
  dayjs.locale("en");

  return <>{children}</>;
}