// import dayjs from "dayjs";
// import { Controller, useFormContext } from "react-hook-form";

// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

// import { formatPatterns } from "@/utils/format-time";

// // ----------------------------------------------------------------------

// export function RHFDatePicker({ name, slotProps, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <DatePicker
//           {...field}
//           value={dayjs(field.value)}
//           onChange={(newValue) => field.onChange(dayjs(newValue).format())}
//           format={formatPatterns.split.date}
//           slotProps={{
//             ...slotProps,
//             textField: {
//               fullWidth: true,
//               error: !!error,
//               helperText: error?.message ?? slotProps?.textField?.helperText,
//               ...slotProps?.textField,
//             },
//           }}
//           {...other}
//         />
//       )}
//     />
//   );
// }

// // ----------------------------------------------------------------------

// export function RHFMobileDateTimePicker({ name, slotProps, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <MobileDateTimePicker
//           {...field}
//           value={dayjs(field.value)}
//           onChange={(newValue) => field.onChange(dayjs(newValue).format())}
//           format={formatPatterns.split.dateTime}
//           slotProps={{
//             textField: {
//               fullWidth: true,
//               error: !!error,
//               helperText: error?.message ?? slotProps?.textField?.helperText,
//               ...slotProps?.textField,
//             },
//             ...slotProps,
//           }}
//           {...other}
//         />
//       )}
//     />
//   );
// }
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

export function RHFDatePicker({ name, slotProps, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div {...slotProps?.wrapper} className="w-full">
          <input
            {...field}
            type="date"
            value={
              field.value ? dayjs(field.value).format("YYYY-MM-DD") : ""
            }
            onChange={(e) =>
              field.onChange(dayjs(e.target.value).toISOString())
            }
            className={[
              "w-full rounded-md border px-3 py-2 text-sm outline-none transition",
              "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              error ? "border-red-500" : "border-gray-300",
              slotProps?.inputClassName || "",
            ].join(" ")}
            {...other}
          />

          {(error?.message || slotProps?.helperText) && (
            <p className="mt-1 text-xs text-red-500">
              {error?.message || slotProps?.helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFMobileDateTimePicker({ name, slotProps, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div {...slotProps?.wrapper} className="w-full">
          <input
            {...field}
            type="datetime-local"
            value={
              field.value
                ? dayjs(field.value).format("YYYY-MM-DDTHH:mm")
                : ""
            }
            onChange={(e) =>
              field.onChange(dayjs(e.target.value).toISOString())
            }
            className={[
              "w-full rounded-md border px-3 py-2 text-sm outline-none transition",
              "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              error ? "border-red-500" : "border-gray-300",
              slotProps?.inputClassName || "",
            ].join(" ")}
            {...other}
          />

          {(error?.message || slotProps?.helperText) && (
            <p className="mt-1 text-xs text-red-500">
              {error?.message || slotProps?.helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}