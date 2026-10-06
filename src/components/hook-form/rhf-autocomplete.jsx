// import { Controller, useFormContext } from 'react-hook-form';

// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// // ----------------------------------------------------------------------

// export function RHFAutocomplete({ name, label, slotProps, helperText, placeholder, ...other }) {
//   const { control, setValue } = useFormContext();

//   const { textfield, ...otherSlotProps } = slotProps ?? {};

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <Autocomplete
//           {...field}
//           id={`rhf-autocomplete-${name}`}
//           onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               {...textfield}
//               label={label}
//               placeholder={placeholder}
//               error={!!error}
//               helperText={error?.message ?? helperText}
//               slotProps={{
//                 ...textfield?.slotProps,
//                 htmlInput: {
//                   ...params.inputProps,
//                   autoComplete: 'new-password',
//                   ...textfield?.slotProps?.htmlInput,
//                 },
//               }}
//             />
//           )}
//           {...other}
//           {...otherSlotProps}
//         />
//       )}
//     />
//   );
// }
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";

export function RHFAutocomplete({
  name,
  label,
  helperText,
  placeholder,
  options = [],
  getOptionLabel = (opt) => opt,
  ...other
}) {
  const { control, setValue } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative w-full" {...other}>
          {/* Label */}
          {label && (
            <label className="block text-sm mb-1 text-gray-700">
              {label}
            </label>
          )}

          {/* Input */}
          <input
            value={field.value || ""}
            placeholder={placeholder}
            onChange={(e) => {
              setValue(name, e.target.value, {
                shouldValidate: true,
              });
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            className={[
              "w-full px-3 py-2 border rounded-md text-sm outline-none",
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:ring-2 focus:ring-blue-200",
            ].join(" ")}
            autoComplete="off"
          />

          {/* Dropdown */}
          {open && options.length > 0 && (
            <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-auto">
              {options
                .filter((opt) =>
                  getOptionLabel(opt)
                    .toLowerCase()
                    .includes((field.value || "").toLowerCase())
                )
                .map((option, index) => (
                  <li
                    key={index}
                    onMouseDown={() => {
                      setValue(name, option, {
                        shouldValidate: true,
                      });
                      setOpen(false);
                    }}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  >
                    {getOptionLabel(option)}
                  </li>
                ))}
            </ul>
          )}

          {/* Helper / Error */}
          {(error?.message || helperText) && (
            <p
              className={[
                "text-xs mt-1",
                error ? "text-red-600" : "text-gray-500",
              ].join(" ")}
            >
              {error?.message || helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}