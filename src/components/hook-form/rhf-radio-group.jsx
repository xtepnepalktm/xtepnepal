// import { Controller, useFormContext } from 'react-hook-form';

// import Radio from '@mui/material/Radio';
// import FormLabel from '@mui/material/FormLabel';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';

// import { HelperText } from './help-text';

// // ----------------------------------------------------------------------

// export function RHFRadioGroup({ sx, name, label, options, helperText, slotProps, ...other }) {
//   const { control } = useFormContext();

//   const labelledby = `${name}-radios`;

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <FormControl component="fieldset" {...slotProps?.wrapper}>
//           {label && (
//             <FormLabel
//               id={labelledby}
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

//           <RadioGroup {...field} aria-labelledby={labelledby} sx={sx} {...other}>
//             {options.map((option) => (
//               <FormControlLabel
//                 key={option.value}
//                 value={option.value}
//                 control={
//                   <Radio
//                     {...slotProps?.radio}
//                     inputProps={{
//                       id: `${option.label}-radio`,
//                       ...(!option.label && { 'aria-label': `${option.label} radio` }),
//                       ...slotProps?.radio?.inputProps,
//                     }}
//                   />
//                 }
//                 label={option.label}
//               />
//             ))}
//           </RadioGroup>

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

export function RHFRadioGroup({
  sx,
  name,
  label,
  options,
  helperText,
  slotProps,
  ...other
}) {
  const { control } = useFormContext();
  const labelledby = `${name}-radios`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div {...slotProps?.wrapper} className="w-full">
          {/* LABEL */}
          {label && (
            <p
              id={labelledby}
              className={[
                "mb-2 text-sm font-medium text-gray-700",
                slotProps?.formLabelClassName || "",
              ].join(" ")}
              {...slotProps?.formLabel}
            >
              {label}
            </p>
          )}

          {/* RADIO GROUP */}
          <div
            role="radiogroup"
            aria-labelledby={labelledby}
            className={[
              "flex flex-col gap-2",
              slotProps?.groupClassName || "",
            ].join(" ")}
            {...other}
          >
            {options.map((option) => (
              <label
                key={option.value}
                htmlFor={`${option.label}-radio`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  id={`${option.label}-radio`}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  className={[
                    "h-4 w-4 accent-blue-600 cursor-pointer",
                    slotProps?.radioClassName || "",
                  ].join(" ")}
                  {...slotProps?.radio?.inputProps}
                />

                <span className="text-sm text-gray-800">
                  {option.label}
                </span>
              </label>
            ))}
          </div>

          {/* HELPER / ERROR TEXT */}
          {(error?.message || helperText) && (
            <p
              className={[
                "mt-1 text-xs",
                error?.message ? "text-red-500" : "text-gray-500",
              ].join(" ")}
              {...slotProps?.helperText}
            >
              {error?.message || helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}