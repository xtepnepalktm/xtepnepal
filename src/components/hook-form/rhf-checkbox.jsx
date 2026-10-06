// import { Controller, useFormContext } from 'react-hook-form';

// import Box from '@mui/material/Box';
// import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';

// import { HelperText } from './help-text';

// // ----------------------------------------------------------------------

// export function RHFCheckbox({ sx, name, label, slotProps, helperText, ...other }) {
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
//               <Checkbox
//                 {...field}
//                 checked={field.value}
//                 {...slotProps?.checkbox}
//                 inputProps={{
//                   id: `${name}-checkbox`,
//                   ...(!label && { 'aria-label': `${name} checkbox` }),
//                   ...slotProps?.checkbox?.inputProps,
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

// export function RHFMultiCheckbox({ name, label, options, slotProps, helperText, ...other }) {
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
//                   <Checkbox
//                     checked={field.value.includes(option.value)}
//                     onChange={() => field.onChange(getSelected(field.value, option.value))}
//                     {...slotProps?.checkbox}
//                     inputProps={{
//                       id: `${option.label}-checkbox`,
//                       ...(!option.label && { 'aria-label': `${option.label} checkbox` }),
//                       ...slotProps?.checkbox?.inputProps,
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
import { HelperText } from "./help-text";

/* -------------------------------------------------------------------------- */
/* RHF SINGLE CHECKBOX */
/* -------------------------------------------------------------------------- */

export function RHFCheckbox({
  name,
  label,
  helperText,
  className = "",
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={className} {...other}>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              id={`${name}-checkbox`}
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className={[
                "w-4 h-4 accent-blue-600",
                error ? "ring-1 ring-red-500" : "",
              ].join(" ")}
              aria-label={!label ? `${name} checkbox` : undefined}
            />

            {label && <span>{label}</span>}
          </label>

          <HelperText
            errorMessage={error?.message}
            helperText={helperText}
            disableGutters
          />
        </div>
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* RHF MULTI CHECKBOX */
/* -------------------------------------------------------------------------- */

export function RHFMultiCheckbox({
  name,
  label,
  options = [],
  helperText,
  className = "",
  ...other
}) {
  const { control } = useFormContext();

  const toggle = (selected = [], value) =>
    selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={className} {...other}>
          {/* LABEL */}
          {label && (
            <div className="mb-2 text-sm font-medium text-gray-700">
              {label}
            </div>
          )}

          {/* CHECKBOX LIST */}
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(field.value || []).includes(option.value)}
                  onChange={() =>
                    field.onChange(
                      toggle(field.value || [], option.value)
                    )
                  }
                  className="w-4 h-4 accent-blue-600"
                />

                <span>{option.label}</span>
              </label>
            ))}
          </div>

          {/* ERROR / HELPER */}
          <HelperText
            errorMessage={error?.message}
            helperText={helperText}
            disableGutters
          />
        </div>
      )}
    />
  );
}