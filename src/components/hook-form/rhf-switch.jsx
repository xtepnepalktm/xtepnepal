// import { Controller, useFormContext } from 'react-hook-form';

// import Box from '@mui/material/Box';
// import Switch from '@mui/material/Switch';
// import FormGroup from '@mui/material/FormGroup';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';

// import { HelperText } from './help-text';

// // ----------------------------------------------------------------------

// export function RHFSwitch({ name, helperText, label, slotProps, sx, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <Box {...slotProps?.wrapper}>
//           <FormControlLabel
//             label={label}
//             control={
//               <Switch
//                 {...field}
//                 checked={field.value}
//                 {...slotProps?.switch}
//                 inputProps={{
//                   id: `${name}-switch`,
//                   ...(!label && { 'aria-label': `${name} switch` }),
//                   ...slotProps?.switch?.inputProps,
//                 }}
//               />
//             }
//             sx={[{ mx: 0 }, ...(Array.isArray(sx) ? (sx ?? []) : [sx])]}
//             {...other}
//           />

//           <HelperText
//             {...slotProps?.helperText}
//             errorMessage={error?.message}
//             helperText={helperText}
//           />
//         </Box>
//       )}
//     />
//   );
// }

// // ----------------------------------------------------------------------

// export function RHFMultiSwitch({ name, label, options, helperText, slotProps, ...other }) {
//   const { control } = useFormContext();

//   const getSelected = (selectedItems, item) =>
//     selectedItems.includes(item)
//       ? selectedItems.filter((value) => value !== item)
//       : [...selectedItems, item];

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <FormControl component="fieldset" {...slotProps?.wrapper}>
//           {label && (
//             <FormLabel
//               component="legend"
//               {...slotProps?.formLabel}
//               sx={[
//                 { mb: 1, typography: 'body2' },
//                 ...(Array.isArray(slotProps?.formLabel?.sx)
//                   ? (slotProps?.formLabel?.sx ?? [])
//                   : [slotProps?.formLabel?.sx]),
//               ]}
//             >
//               {label}
//             </FormLabel>
//           )}

//           <FormGroup {...other}>
//             {options.map((option) => (
//               <FormControlLabel
//                 key={option.value}
//                 control={
//                   <Switch
//                     checked={field.value.includes(option.value)}
//                     onChange={() => field.onChange(getSelected(field.value, option.value))}
//                     {...slotProps?.switch}
//                     inputProps={{
//                       id: `${option.label}-switch`,
//                       ...(!option.label && { 'aria-label': `${option.label} switch` }),
//                       ...slotProps?.switch?.inputProps,
//                     }}
//                   />
//                 }
//                 label={option.label}
//               />
//             ))}
//           </FormGroup>

//           <HelperText
//             {...slotProps?.helperText}
//             disableGutters
//             errorMessage={error?.message}
//             helperText={helperText}
//           />
//         </FormControl>
//       )}
//     />
//   );
// }
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------
// SINGLE SWITCH

export function RHFSwitch({
  name,
  helperText,
  label,
  slotProps,
  sx,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div {...slotProps?.wrapper} className="w-full">
          <label className="flex items-center gap-3 cursor-pointer">
            {/* SWITCH */}
            <input
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className={[
                "w-10 h-5 rounded-full appearance-none relative",
                "bg-gray-300 checked:bg-blue-600 transition",
                "before:content-[''] before:absolute before:top-0.5 before:left-0.5",
                "before:w-4 before:h-4 before:bg-white before:rounded-full",
                "before:transition-transform checked:before:translate-x-5",
                slotProps?.switchClassName || "",
              ].join(" ")}
              {...slotProps?.switch?.inputProps}
              {...other}
            />

            {label && (
              <span className="text-sm text-gray-700">{label}</span>
            )}
          </label>

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
// MULTI SWITCH

export function RHFMultiSwitch({
  name,
  label,
  options,
  helperText,
  slotProps,
  ...other
}) {
  const { control } = useFormContext();

  const toggleValue = (selected, value) =>
    selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selected = field.value || [];

        return (
          <div {...slotProps?.wrapper} className="w-full">
            {/* LABEL */}
            {label && (
              <p className="mb-2 text-sm font-medium text-gray-700">
                {label}
              </p>
            )}

            {/* SWITCH LIST */}
            <div className="flex flex-col gap-3">
              {options.map((option) => {
                const checked = selected.includes(option.value);

                return (
                  <label
                    key={option.value}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-sm text-gray-700">
                      {option.label}
                    </span>

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        field.onChange(
                          toggleValue(selected, option.value)
                        )
                      }
                      className={[
                        "w-10 h-5 rounded-full appearance-none relative",
                        "bg-gray-300 checked:bg-blue-600 transition",
                        "before:content-[''] before:absolute before:top-0.5 before:left-0.5",
                        "before:w-4 before:h-4 before:bg-white before:rounded-full",
                        "before:transition-transform checked:before:translate-x-5",
                        slotProps?.switchClassName || "",
                      ].join(" ")}
                      {...slotProps?.switch?.inputProps}
                      {...other}
                    />
                  </label>
                );
              })}
            </div>

            {(error?.message || helperText) && (
              <p className="mt-2 text-xs text-gray-500">
                {error?.message || helperText}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}