// import { varAlpha } from "minimal-shared/utils";
// import { useId, forwardRef, useCallback } from "react";

// import Box from "@mui/material/Box";

// import { Iconify } from "@/components/iconify";

// import {
//   HelperText,
//   CaptionText,
//   CenteredInput,
//   CounterButton,
//   InputContainer,
//   NumberInputRoot,
// } from "./styles";

// // ----------------------------------------------------------------------

// export const NumberInput = forwardRef((props, ref) => {
//   const {
//     sx,
//     error,
//     value,
//     onChange,
//     disabled,
//     slotProps,
//     helperText,
//     captionText,
//     hideDivider,
//     hideButtons,
//     disableInput,
//     min = 0,
//     max = 9999,
//     ...other
//   } = props;

//   const id = useId();

//   const currentValue = value ?? 0;

//   const isDecrementDisabled = currentValue <= min || disabled;
//   const isIncrementDisabled = currentValue >= max || disabled;

//   const handleDecrement = useCallback(
//     (event) => {
//       if (!isDecrementDisabled) {
//         onChange?.(event, currentValue - 1);
//       }
//     },
//     [isDecrementDisabled, onChange, currentValue]
//   );

//   const handleIncrement = useCallback(
//     (event) => {
//       if (!isIncrementDisabled) {
//         onChange?.(event, currentValue + 1);
//       }
//     },
//     [isIncrementDisabled, onChange, currentValue]
//   );

//   const handleChange = useCallback(
//     (event) => {
//       const transformedValue = transformNumberOnChange(event.target.value, {
//         min,
//         max,
//       });
//       onChange?.(event, transformedValue);
//     },
//     [max, min, onChange]
//   );

//   return (
//     <Box {...slotProps?.wrapper}>
//       <NumberInputRoot
//         ref={ref}
//         sx={[
//           (theme) => ({
//             "--border-color": varAlpha(
//               theme.vars.palette.grey["500Channel"],
//               0.2
//             ),
//             "--vertical-divider-color": hideDivider
//               ? "transparent"
//               : varAlpha(theme.vars.palette.grey["500Channel"], 0.2),
//             "--input-background":
//               !disabled && error
//                 ? varAlpha(theme.vars.palette.error.mainChannel, 0.08)
//                 : varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
//           }),
//           ...(Array.isArray(sx) ? sx : [sx]),
//         ]}
//         {...other}
//       >
//         {!hideButtons && (
//           <CounterButton
//             disabled={isDecrementDisabled}
//             onClick={handleDecrement}
//             {...slotProps?.button}
//           >
//             <Iconify width={16} icon="mingcute:minimize-line" />
//           </CounterButton>
//         )}

//         <InputContainer {...slotProps?.inputWrapper}>
//           <CenteredInput
//             name={id}
//             disabled={disabled || disableInput}
//             value={currentValue}
//             onChange={handleChange}
//             {...slotProps?.input}
//           />

//           {captionText && (
//             <CaptionText {...slotProps?.captionText}>{captionText}</CaptionText>
//           )}
//         </InputContainer>

//         {!hideButtons && (
//           <CounterButton
//             disabled={isIncrementDisabled}
//             onClick={handleIncrement}
//             {...slotProps?.button}
//           >
//             <Iconify width={16} icon="mingcute:add-line" />
//           </CounterButton>
//         )}
//       </NumberInputRoot>

//       {helperText && (
//         <HelperText error={error} {...slotProps?.helperText}>
//           {helperText}
//         </HelperText>
//       )}
//     </Box>
//   );
// });

// // ----------------------------------------------------------------------

// export function transformNumberOnChange(value, options) {
//   const { min = 0, max = 9999 } = options ?? {};

//   if (!value || value.trim() === "") {
//     return 0;
//   }

//   const numericValue = Number(value.trim());

//   if (!Number.isNaN(numericValue)) {
//     // Clamp the value between min and max
//     return Math.min(Math.max(numericValue, min), max);
//   }

//   return 0;
// }
import { useId, forwardRef, useCallback } from "react";
import { varAlpha } from "minimal-shared/utils";
import { Iconify } from "../iconify";

// ----------------------------------------------------------------------

export const NumberInput = forwardRef((props, ref) => {
  const {
    sx,
    error,
    value,
    onChange,
    disabled,
    slotProps,
    helperText,
    captionText,
    hideDivider,
    hideButtons,
    disableInput,
    min = 0,
    max = 9999,
    className = "",
    ...other
  } = props;

  const id = useId();

  const currentValue = value ?? 0;

  const isDecrementDisabled = currentValue <= min || disabled;
  const isIncrementDisabled = currentValue >= max || disabled;

  const handleDecrement = useCallback(
    (event) => {
      if (!isDecrementDisabled) {
        onChange?.(event, currentValue - 1);
      }
    },
    [isDecrementDisabled, onChange, currentValue]
  );

  const handleIncrement = useCallback(
    (event) => {
      if (!isIncrementDisabled) {
        onChange?.(event, currentValue + 1);
      }
    },
    [isIncrementDisabled, onChange, currentValue]
  );

  const handleChange = useCallback(
    (event) => {
      const transformedValue = transformNumberOnChange(event.target.value, {
        min,
        max,
      });
      onChange?.(event, transformedValue);
    },
    [max, min, onChange]
  );

  return (
    <div className={`w-full h-full ${className}`} {...slotProps?.wrapper}>
      {/* ROOT */}
      <div
        ref={ref}
        className={[
          "flex items-center  border-2 border-black overflow-hidden h-full w-full",
          "bg-gray-50",
          error ? "border-red-500 bg-red-50" : "border-dark",
          disabled ? "opacity-60 cursor-not-allowed" : "",
        ].join(" ")}
        style={{
          borderColor: varAlpha("120 120 120", 0.2),
        }}
        {...other}
      >
        {/* DECREMENT */}
        {!hideButtons && (
          <button
            type="button"
            onClick={handleDecrement}
            disabled={isDecrementDisabled}
            className={[
              "px-3 py-2 flex items-center justify-center",
              "hover:bg-gray-200 transition",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              hideDivider ? "" : "border-r border-gray-200",
            ].join(" ")}
            {...slotProps?.button}
          >
            <Iconify width={16} icon="mingcute:minimize-line" />
          </button>
        )}

        {/* INPUT */}
        <div className="flex flex-col items-center justify-center flex-1 px-2 h-full">
          <input
            id={id}
            ref={ref}
            type="text"
            name={id}
            disabled={disabled || disableInput}
            value={currentValue}
            onChange={handleChange}
            className={[
              "w-full text-center bg-transparent outline-none",
              " text-gray-900",
              disabled ? "cursor-not-allowed" : "",
            ].join(" ")}
            {...slotProps?.input}
          />

          {captionText && (
            <span className="text-xs text-gray-500 mt-0.5">
              {captionText}
            </span>
          )}
        </div>

        {/* INCREMENT */}
        {!hideButtons && (
          <button
            type="button"
            onClick={handleIncrement}
            disabled={isIncrementDisabled}
            className={[
              "px-3 py-2 flex items-center justify-center",
              "hover:bg-gray-200 transition",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              hideDivider ? "" : "border-l border-gray-200",
            ].join(" ")}
            {...slotProps?.button}
          >
            <Iconify width={16} icon="mingcute:add-line" />
          </button>
        )}
      </div>

      {/* HELPER TEXT */}
      {helperText && (
        <p
          className={[
            "text-xs mt-1",
            error ? "text-red-500" : "text-gray-500",
          ].join(" ")}
          {...slotProps?.helperText}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

// ----------------------------------------------------------------------

export function transformNumberOnChange(value, options) {
  const { min = 0, max = 9999 } = options ?? {};

  if (!value || value.trim() === "") {
    return 0;
  }

  const numericValue = Number(value.trim());

  if (!Number.isNaN(numericValue)) {
    return Math.min(Math.max(numericValue, min), max);
  }

  return 0;
}