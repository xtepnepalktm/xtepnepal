// import { merge } from 'es-toolkit';
// import { Controller, useFormContext } from 'react-hook-form';

// import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';

// import { HelperText } from './help-text';

// // ----------------------------------------------------------------------

// export function RHFSelect({ name, children, helperText, slotProps = {}, ...other }) {
//   const { control } = useFormContext();

//   const labelId = `${name}-select`;

//   const baseSlotProps = {
//     select: {
//       sx: { textTransform: 'capitalize' },
//       MenuProps: {
//         slotProps: {
//           paper: {
//             sx: [{ maxHeight: 220 }],
//           },
//         },
//       },
//     },
//     htmlInput: { id: labelId },
//     inputLabel: { htmlFor: labelId },
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <TextField
//           {...field}
//           value={field.value ?? ''}
//           select
//           fullWidth
//           error={!!error}
//           helperText={error?.message ?? helperText}
//           slotProps={merge(baseSlotProps, slotProps)}
//           {...other}
//         >
//           {children}
//         </TextField>
//       )}
//     />
//   );
// }

// // ----------------------------------------------------------------------

// export function RHFMultiSelect({
//   name,
//   chip,
//   label,
//   options,
//   checkbox,
//   placeholder,
//   slotProps,
//   helperText,
//   ...other
// }) {
//   const { control } = useFormContext();

//   const labelId = `${name}-multi-select`;

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => {
//         const renderLabel = () => (
//           <InputLabel htmlFor={labelId} {...slotProps?.inputLabel}>
//             {label}
//           </InputLabel>
//         );

//         const renderOptions = () =>
//           options.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {checkbox && (
//                 <Checkbox
//                   size="small"
//                   disableRipple
//                   checked={field.value.includes(option.value)}
//                   {...slotProps?.checkbox}
//                 />
//               )}

//               {option.label}
//             </MenuItem>
//           ));

//         return (
//           <FormControl error={!!error} {...other}>
//             {label && renderLabel()}

//             <Select
//               {...field}
//               value={field.value ?? []}
//               multiple
//               displayEmpty={!!placeholder}
//               label={label}
//               renderValue={(selected) => {
//                 const selectedItems = options.filter((item) => selected.includes(item.value));

//                 if (!selectedItems.length && placeholder) {
//                   return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
//                 }

//                 if (chip) {
//                   return (
//                     <Box sx={{ gap: 0.5, display: 'flex', flexWrap: 'wrap' }}>
//                       {selectedItems.map((item) => (
//                         <Chip
//                           key={item.value}
//                           size="small"
//                           variant="soft"
//                           label={item.label}
//                           {...slotProps?.chip}
//                         />
//                       ))}
//                     </Box>
//                   );
//                 }

//                 return selectedItems.map((item) => item.label).join(', ');
//               }}
//               {...slotProps?.select}
//               inputProps={{
//                 id: labelId,
//                 ...slotProps?.select?.inputProps,
//               }}
//             >
//               {renderOptions()}
//             </Select>

//             <HelperText
//               {...slotProps?.helperText}
//               errorMessage={error?.message}
//               helperText={helperText}
//             />
//           </FormControl>
//         );
//       }}
//     />
//   );
// }
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------
// SINGLE SELECT (TAILWIND)

export function RHFSelect({
  name,
  children,
  helperText,
  slotProps = {},
  ...other
}) {
  const { control } = useFormContext();
  const labelId = `${name}-select`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <select
            {...field}
            id={labelId}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
            className={[
              "w-full rounded-md border px-3 py-2 text-sm outline-none transition bg-white",
              "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              error ? "border-red-500" : "border-gray-300",
              slotProps?.className || "",
            ].join(" ")}
            {...other}
          >
            {children}
          </select>

          {(error?.message || helperText) && (
            <p className="mt-1 text-xs text-gray-500">
              {error?.message || helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------
// MULTI SELECT (CUSTOM TAILWIND DROPDOWN)

export function RHFMultiSelect({
  name,
  label,
  options,
  chip,
  checkbox,
  placeholder,
  helperText,
  slotProps = {},
  ...other
}) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const toggleValue = (value, current) =>
    current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selected = field.value || [];
        const selectedItems = options.filter((o) =>
          selected.includes(o.value)
        );

        return (
          <div className="w-full relative">
            {/* LABEL */}
            {label && (
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
              </label>
            )}

            {/* SELECT BOX */}
            <div
              onClick={() => setOpen(!open)}
              className={[
                "w-full min-h-[42px] flex items-center justify-between",
                "rounded-md border px-3 py-2 cursor-pointer bg-white",
                "transition",
                "focus:ring-2 focus:ring-blue-500",
                error ? "border-red-500" : "border-gray-300",
                slotProps?.className || "",
              ].join(" ")}
            >
              {/* VALUE DISPLAY */}
              <div className="flex flex-wrap gap-1">
                {!selectedItems.length && (
                  <span className="text-gray-400 text-sm">
                    {placeholder || "Select..."}
                  </span>
                )}

                {chip
                  ? selectedItems.map((item) => (
                    <span
                      key={item.value}
                      className="px-2 py-1 text-xs bg-gray-200 rounded-full"
                    >
                      {item.label}
                    </span>
                  ))
                  : selectedItems.map((item) => item.label).join(", ")}
              </div>

              <span className="text-gray-500">▾</span>
            </div>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {options.map((option) => {
                  const isChecked = selected.includes(option.value);

                  return (
                    <div
                      key={option.value}
                      onClick={() => {
                        const newValue = toggleValue(option.value, selected);
                        field.onChange(newValue);
                      }}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {checkbox && (
                        <input
                          type="checkbox"
                          readOnly
                          checked={isChecked}
                          className="h-4 w-4 accent-blue-600"
                        />
                      )}

                      <span className="text-sm">{option.label}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ERROR / HELPER */}
            {(error?.message || helperText) && (
              <p
                className={[
                  "mt-1 text-xs",
                  error?.message ? "text-red-500" : "text-gray-500",
                ].join(" ")}
              >
                {error?.message || helperText}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}