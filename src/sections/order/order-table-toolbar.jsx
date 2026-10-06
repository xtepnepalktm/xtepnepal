// // import { useCallback } from "react";

// // import {
// //   Box,
// //   TextField,
// //   InputAdornment,
// //   formHelperTextClasses,
// // } from "@mui/material";
// // import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// // import { Iconify } from "@/components/iconify";

// // // ----------------------------------------------------------------------

// // export function OrderTableToolbar({ filters, onResetPage, dateError }) {
// //   const { state: currentFilters, setState: updateFilters } = filters;

// //   const handleFilterName = useCallback(
// //     (event) => {
// //       onResetPage();
// //       updateFilters({ name: event.target.value });
// //     },
// //     [onResetPage, updateFilters]
// //   );

// //   const handleFilterStartDate = useCallback(
// //     (newValue) => {
// //       onResetPage();
// //       updateFilters({ startDate: newValue });
// //     },
// //     [onResetPage, updateFilters]
// //   );

// //   const handleFilterEndDate = useCallback(
// //     (newValue) => {
// //       onResetPage();
// //       updateFilters({ endDate: newValue });
// //     },
// //     [onResetPage, updateFilters]
// //   );

// //   return (
// //     <Box
// //       sx={{
// //         p: 2.5,
// //         gap: 2,
// //         display: "flex",
// //         flexDirection: { xs: "column", md: "row" },
// //         alignItems: { xs: "flex-end", md: "center" },
// //       }}
// //     >
// //       <DatePicker
// //         label="Start date"
// //         value={currentFilters.startDate}
// //         onChange={handleFilterStartDate}
// //         slotProps={{ textField: { fullWidth: true } }}
// //         sx={{ maxWidth: { md: 200 } }}
// //       />

// //       <DatePicker
// //         label="End date"
// //         value={currentFilters.endDate}
// //         onChange={handleFilterEndDate}
// //         slotProps={{
// //           textField: {
// //             fullWidth: true,
// //             error: dateError,
// //             helperText: dateError
// //               ? "End date must be later than start date"
// //               : null,
// //           },
// //         }}
// //         sx={{
// //           maxWidth: { md: 200 },
// //           [`& .${formHelperTextClasses.root}`]: {
// //             position: { md: "absolute" },
// //             bottom: { md: -40 },
// //           },
// //         }}
// //       />

// //       <Box
// //         sx={{
// //           gap: 2,
// //           width: 1,
// //           flexGrow: 1,
// //           display: "flex",
// //           alignItems: "center",
// //         }}
// //       >
// //         <TextField
// //           fullWidth
// //           value={currentFilters.name}
// //           onChange={handleFilterName}
// //           placeholder="Search order number..."
// //           slotProps={{
// //             input: {
// //               startAdornment: (
// //                 <InputAdornment position="start">
// //                   <Iconify
// //                     icon="eva:search-fill"
// //                     sx={{ color: "text.disabled" }}
// //                   />
// //                 </InputAdornment>
// //               ),
// //             },
// //           }}
// //         />
// //       </Box>
// //     </Box>
// //   );
// // }
// import { useCallback } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// export function OrderTableToolbar({ filters, onResetPage, dateError }) {
//   const { state: currentFilters, setState: updateFilters } = filters;

//   const handleFilterName = useCallback(
//     (event) => {
//       onResetPage();
//       updateFilters({ name: event.target.value });
//     },
//     [onResetPage, updateFilters]
//   );

//   const handleFilterStartDate = useCallback(
//     (newValue) => {
//       onResetPage();
//       updateFilters({ startDate: newValue });
//     },
//     [onResetPage, updateFilters]
//   );

//   const handleFilterEndDate = useCallback(
//     (newValue) => {
//       onResetPage();
//       updateFilters({ endDate: newValue });
//     },
//     [onResetPage, updateFilters]
//   );

//   return (
//     <div className="p-3 flex flex-col md:flex-row items-end md:items-end gap-4">

//       {/* Start Date */}
//       <div className="w-full md:max-w-[200px]">
//         <label className="block text-xs text-gray-500 mb-1 ml-1">Start date</label>
//         <DatePicker
//           selected={currentFilters.startDate}
//           onChange={handleFilterStartDate}
//           placeholderText="MM/DD/YYYY"
//           customInput={
//             <input
//               className="w-full  border border-gray-300 dark:border-gray-600 bg-transparent
//                          px-3 py-[13px] text-sm text-gray-900 dark:text-gray-100
//                          outline-none focus:border-gray-900 dark:focus:border-white
//                          transition-colors placeholder:text-gray-400 cursor-pointer"
//             />
//           }
//         />
//       </div>

//       {/* End Date */}
//       <div className="relative w-full md:max-w-[200px]">
//         <label
//           className={[
//             "block text-xs mb-1 ml-1",
//             dateError ? "text-red-500" : "text-gray-500",
//           ].join(" ")}
//         >
//           End date
//         </label>
//         <DatePicker
//           selected={currentFilters.endDate}
//           onChange={handleFilterEndDate}
//           placeholderText="MM/DD/YYYY"
//           minDate={currentFilters.startDate}
//           customInput={
//             <input
//               className={[
//                 "w-full  border bg-transparent",
//                 "px-3 py-[13px] text-sm text-gray-900 dark:text-gray-100",
//                 "outline-none transition-colors placeholder:text-gray-400 cursor-pointer",
//                 dateError
//                   ? "border-red-500 focus:border-red-500"
//                   : "border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-white",
//               ].join(" ")}
//             />
//           }
//         />
//         {/* Helper text — absolutely positioned below on md+ */}
//         {dateError && (
//           <p className="text-xs text-red-500 mt-1 md:absolute md:bottom-[-28px] md:left-0 whitespace-nowrap">
//             End date must be later than start date
//           </p>
//         )}
//       </div>

//       {/* Search field */}
//       <div className="flex items-center gap-4 w-full flex-1">
//         <div className="relative w-full">
//           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
//             <Iconify icon="eva:search-fill" width={20} />
//           </span>
//           <input
//             type="text"
//             value={currentFilters.name}
//             onChange={handleFilterName}
//             placeholder="Search order number..."
//             className="w-full  border border-gray-300 dark:border-gray-600 bg-transparent
//                        pl-10 pr-4 py-[13px] text-sm text-gray-900 dark:text-gray-100
//                        outline-none focus:border-gray-900 dark:focus:border-white
//                        transition-colors placeholder:text-gray-400"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function OrderTableToolbar({
  filters,
  onResetPage,
  dateError,
}) {
  const { state: currentFilters, setState: updateFilters } =
    filters;

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      updateFilters({ name: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterStartDate = useCallback(
    (date) => {
      onResetPage();
      updateFilters({ startDate: date });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterEndDate = useCallback(
    (date) => {
      onResetPage();
      updateFilters({ endDate: date });
    },
    [onResetPage, updateFilters]
  );

  // ----------------------------------------------------------------------

  return (
    <div className="flex flex-col gap-4  border border-gray-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* LEFT: Date filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">

        {/* Start */}
        <div className="w-full md:w-[180px]">
          <label className="mb-1 ml-1 block text-[11px] font-medium text-gray-500">
            Start date
          </label>

          <DatePicker
            selected={currentFilters.startDate}
            onChange={handleFilterStartDate}
            placeholderText="Start date"
            className="w-full  bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* End */}
        <div className="relative w-full md:w-[180px]">
          <label className="mb-1 ml-1 block text-[11px] font-medium text-gray-500">
            End date
          </label>

          <DatePicker
            selected={currentFilters.endDate}
            onChange={handleFilterEndDate}
            placeholderText="End date"
            minDate={currentFilters.startDate}
            className={[
              "w-full  bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition",
              "focus:bg-white focus:ring-2 focus:ring-gray-200",
              dateError ? "ring-1 ring-red-400" : "",
            ].join(" ")}
          />

          {dateError && (
            <p className="absolute left-0 mt-1 text-[11px] text-red-500">
              End date must be later than start date
            </p>
          )}
        </div>
      </div>

      {/* RIGHT: Search */}
      <div className="relative w-full md:max-w-sm">
        <Iconify
          icon="eva:search-fill"
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={currentFilters.name}
          onChange={handleFilterName}
          placeholder="Search order number..."
          className="w-full  bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-gray-200"
        />
      </div>
    </div>
  );
}