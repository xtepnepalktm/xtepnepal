// import { useMemo, useCallback } from "react";

// import Chip from "@mui/material/Chip";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import InputAdornment from "@mui/material/InputAdornment";
// import { filledInputClasses } from "@mui/material/FilledInput";
// import { outlinedInputClasses } from "@mui/material/OutlinedInput";

// import { countries } from "@/assets/data";

// import { FlagIcon, flagIconClasses } from "@/components/flag-icon";

// // ----------------------------------------------------------------------

// export function CountrySelect({
//   id,
//   label,
//   error,
//   variant,
//   multiple,
//   helperText,
//   hiddenLabel,
//   placeholder,
//   getValue = "label",
//   ...other
// }) {
//   const options = useMemo(
//     () =>
//       countries.map((country) =>
//         getValue === "label" ? country.label : country.code
//       ),
//     [getValue]
//   );

//   const getCountry = useCallback((inputValue) => {
//     const country = countries.find(
//       (op) =>
//         op.label === inputValue ||
//         op.code === inputValue ||
//         op.phone === inputValue
//     );
//     return {
//       code: country?.code || "",
//       label: country?.label || "",
//       phone: country?.phone || "",
//     };
//   }, []);

//   const renderOption = useCallback(
//     (props, option) => {
//       const country = getCountry(option);

//       return (
//         <li {...props} key={country.label}>
//           <FlagIcon
//             key={country.label}
//             code={country.code}
//             sx={{
//               mr: 1,
//               width: 22,
//               height: 22,
//               borderRadius: "50%",
//             }}
//           />
//           {country.label} ({country.code}) +{country.phone}
//         </li>
//       );
//     },
//     [getCountry]
//   );

//   const renderInput = useCallback(
//     (params) => {
//       const country = getCountry(params.inputProps.value);

//       const baseField = {
//         ...params,
//         label,
//         variant,
//         placeholder,
//         helperText,
//         hiddenLabel,
//         error: !!error,
//         inputProps: { ...params.inputProps, autoComplete: "new-password" },
//       };

//       if (multiple) {
//         return <TextField {...baseField} />;
//       }

//       return (
//         <TextField
//           {...baseField}
//           slotProps={{
//             input: {
//               ...params.InputProps,
//               startAdornment: (
//                 <InputAdornment
//                   position="start"
//                   sx={{ ...(!country.code && { display: "none" }) }}
//                 >
//                   <FlagIcon
//                     key={country.label}
//                     code={country.code}
//                     sx={{ width: 22, height: 22, borderRadius: "50%" }}
//                   />
//                 </InputAdornment>
//               ),
//             },
//           }}
//           sx={{
//             [`& .${outlinedInputClasses.root}`]: {
//               [`& .${flagIconClasses.root}`]: { ml: 0.5, mr: -0.5 },
//             },
//             [`& .${filledInputClasses.root}`]: {
//               [`& .${flagIconClasses.root}`]: {
//                 ml: 0.5,
//                 mr: -0.5,
//                 mt: hiddenLabel ? 0 : -2,
//               },
//             },
//           }}
//         />
//       );
//     },
//     [
//       getCountry,
//       label,
//       variant,
//       placeholder,
//       helperText,
//       hiddenLabel,
//       error,
//       multiple,
//     ]
//   );

//   const renderTags = useCallback(
//     (selected, getTagProps) =>
//       selected.map((option, index) => {
//         const country = getCountry(option);

//         return (
//           <Chip
//             {...getTagProps({ index })}
//             key={country.label}
//             label={country.label}
//             size="small"
//             variant="soft"
//             icon={
//               <FlagIcon
//                 key={country.label}
//                 code={country.code}
//                 sx={{ width: 16, height: 16, borderRadius: "50%" }}
//               />
//             }
//           />
//         );
//       }),
//     [getCountry]
//   );

//   const getOptionLabel = useCallback(
//     (option) => {
//       if (getValue === "code") {
//         const country = countries.find((op) => op.code === option);
//         return country?.label ?? "";
//       }
//       return option;
//     },
//     [getValue]
//   );

//   return (
//     <Autocomplete
//       id={`${id}-country-select`}
//       multiple={multiple}
//       options={options}
//       autoHighlight={!multiple}
//       disableCloseOnSelect={multiple}
//       renderOption={renderOption}
//       renderInput={renderInput}
//       renderTags={multiple ? renderTags : undefined}
//       getOptionLabel={getOptionLabel}
//       {...other}
//     />
//   );
// }
'use client';

import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { countries } from '@/assets/data';
import { FlagIcon } from '@/components/flag-icon';
import clsx from 'clsx';

export function CountrySelect({
  id,
  label = 'Select country',
  multiple = false,
  placeholder = 'Search country...',
  value,
  onChange,
  getValue = 'label', // 'label' | 'code'
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const options = useMemo(() => {
    return countries.map((c) =>
      getValue === 'label' ? c.label : c.code
    );
  }, [getValue]);

  const getCountry = useCallback((input) => {
    return (
      countries.find(
        (c) =>
          c.label === input ||
          c.code === input ||
          c.phone === input
      ) || { code: '', label: '', phone: '' }
    );
  }, []);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  const isSelected = (option) => {
    if (!value) return false;
    if (multiple) return value.includes(option);
    return value === option;
  };

  const toggleValue = (option) => {
    if (multiple) {
      const exists = value?.includes(option);
      const newValue = exists
        ? value.filter((v) => v !== option)
        : [...(value || []), option];

      onChange?.(newValue);
    } else {
      onChange?.(option);
      setOpen(false);
    }
  };

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="w-full relative">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}

      {/* Input */}
      <div
        onClick={() => setOpen(true)}
        className="flex flex-wrap items-center gap-2 w-full min-h-[44px] px-3 py-2 border border-gray-300  cursor-text focus-within:ring-2 focus-within:ring-black"
      >
        {multiple && value?.length > 0 ? (
          value.map((v) => {
            const c = getCountry(v);
            return (
              <span
                key={v}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100  text-sm"
              >
                <FlagIcon code={c.code} className="w-4 h-4 rounded-full" />
                {c.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleValue(v);
                  }}
                  className="ml-1 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            );
          })
        ) : (
          <span className="text-gray-400">
            {value ? getCountry(value).label : placeholder}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200  shadow-lg max-h-60 overflow-auto">
          {/* Search */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-2 border-b outline-none text-sm"
          />

          {/* Options */}
          <ul className="py-1">
            {filteredOptions.map((opt) => {
              const country = getCountry(opt);
              const active = isSelected(opt);

              return (
                <li
                  key={opt}
                  onClick={() => toggleValue(opt)}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 cursor-pointer text-sm hover:bg-gray-100',
                    active && 'bg-gray-100 font-medium'
                  )}
                >
                  <FlagIcon
                    code={country.code}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="flex-1">
                    {country.label} ({country.code}) +{country.phone}
                  </span>

                  {active && (
                    <span className="text-green-600 text-xs">✓</span>
                  )}
                </li>
              );
            })}

            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-400">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}