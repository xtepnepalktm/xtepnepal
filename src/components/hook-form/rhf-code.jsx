// import { MuiOtpInput } from 'mui-one-time-password-input';
// import { Controller, useFormContext } from 'react-hook-form';

// import Box from '@mui/material/Box';
// import { inputBaseClasses } from '@mui/material/InputBase';

// import { HelperText } from './help-text';

// // ----------------------------------------------------------------------

// export function RHFCode({
//   name,
//   slotProps,
//   helperText,
//   maxSize = 56,
//   placeholder = '-',
//   ...other
// }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <Box
//           {...slotProps?.wrapper}
//           sx={[
//             {
//               display: 'flex',
//               justifyContent: 'center',
//               [`& .${inputBaseClasses.input}`]: {
//                 p: 0,
//                 height: 'auto',
//                 aspectRatio: '1/1',
//                 maxWidth: maxSize,
//               },
//             },
//             ...(Array.isArray(slotProps?.wrapper?.sx)
//               ? (slotProps?.wrapper?.sx ?? [])
//               : [slotProps?.wrapper?.sx]),
//           ]}
//         >
//           <MuiOtpInput
//             {...field}
//             autoFocus
//             gap={1.5}
//             length={6}
//             TextFieldsProps={{
//               placeholder,
//               error: !!error,
//               ...slotProps?.textfield,
//             }}
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
import { Controller, useFormContext } from "react-hook-form";
import { useRef } from "react";
import { HelperText } from "./help-text";

export function RHFCode({
  name,
  helperText,
  length = 6,
  maxSize = 56,
  placeholder = "-",
  className = "",
  ...other
}) {
  const { control } = useFormContext();
  const inputsRef = useRef([]);

  const focusNext = (index) => {
    if (inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const focusPrev = (index) => {
    if (inputsRef.current[index - 1]) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = field.value ? field.value.split("") : [];

        const handleChange = (val, index) => {
          const newValue = [...value];
          newValue[index] = val;

          const finalValue = newValue.join("");
          field.onChange(finalValue);

          if (val) focusNext(index);
        };

        return (
          <div className={className}>
            {/* OTP container */}
            <div className="flex justify-center gap-3">
              {Array.from({ length }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value[index] || ""}
                  placeholder={placeholder}
                  onChange={(e) =>
                    handleChange(e.target.value.replace(/\D/g, ""), index)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !value[index]) {
                      focusPrev(index);
                    }
                  }}
                  className={[
                    "text-center border rounded-md outline-none",
                    "w-12 h-12 text-lg",
                    "focus:ring-2 focus:ring-blue-300",
                    error
                      ? "border-red-500"
                      : "border-gray-300",
                  ].join(" ")}
                  style={{
                    maxWidth: maxSize,
                    aspectRatio: "1 / 1",
                  }}
                  {...other}
                />
              ))}
            </div>

            {/* Helper / Error */}
            <HelperText
              errorMessage={error?.message}
              helperText={helperText}
              disableGutters
            />
          </div>
        );
      }}
    />
  );
}