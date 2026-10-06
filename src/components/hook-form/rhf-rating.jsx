// import { Controller, useFormContext } from 'react-hook-form';

// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';

// import { HelperText } from './help-text';

// // ----------------------------------------------------------------------

// export function RHFRating({ name, helperText, slotProps, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <Box
//           {...slotProps?.wrapper}
//           sx={[
//             { display: 'flex', flexDirection: 'column' },
//             ...(Array.isArray(slotProps?.wrapper?.sx)
//               ? (slotProps?.wrapper?.sx ?? [])
//               : [slotProps?.wrapper?.sx]),
//           ]}
//         >
//           <Rating
//             {...field}
//             onChange={(event, newValue) => field.onChange(Number(newValue))}
//             {...other}
//           />

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

export function RHFRating({ name, helperText, slotProps, max = 5, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div
          {...slotProps?.wrapper}
          className={[
            "flex flex-col gap-1",
            slotProps?.wrapperClassName || "",
          ].join(" ")}
        >
          {/* STARS */}
          <div className="flex items-center gap-1">
            {Array.from({ length: max }).map((_, index) => {
              const value = index + 1;
              const active = value <= (field.value || 0);

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => field.onChange(value)}
                  className="focus:outline-none"
                  {...other}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={[
                      "w-6 h-6 transition",
                      active ? "fill-yellow-400" : "fill-gray-300",
                    ].join(" ")}
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* HELPER / ERROR */}
          {(error?.message || helperText) && (
            <p
              className={[
                "text-xs",
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