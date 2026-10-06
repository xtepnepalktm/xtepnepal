// import { Controller, useFormContext } from 'react-hook-form';

// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

// import { HelperText } from './help-text';

// // ----------------------------------------------------------------------

// export function RHFSlider({ name, helperText, slotProps, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <Box {...slotProps?.wrapper}>
//           <Slider {...field} valueLabelDisplay="auto" {...other} />

//           <HelperText
//             {...slotProps?.helperText}
//             disableGutters
//             errorMessage={error?.message}
//             helperText={helperText}
//           />
//         </Box>
//       )}
//     />
//   );
// }
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

export function RHFSlider({ name, helperText, slotProps, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = Array.isArray(field.value)
          ? field.value[0]
          : field.value ?? 0;

        return (
          <div {...slotProps?.wrapper} className="w-full">
            {/* SLIDER */}
            <input
              type="range"
              value={value}
              onChange={(e) =>
                field.onChange(Number(e.target.value))
              }
              className={[
                "w-full h-2 bg-gray-200  appearance-none cursor-pointer",
                "accent-blue-600",
                "focus:outline-none",
                slotProps?.className || "",
              ].join(" ")}
              {...other}
            />

            {/* VALUE DISPLAY (like MUI valueLabelDisplay="auto") */}
            <div className="mt-1 text-xs text-gray-600">
              Value: {value}
            </div>

            {/* HELPER / ERROR */}
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
        );
      }}
    />
  );
}