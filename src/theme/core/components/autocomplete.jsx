// import { varAlpha } from 'minimal-shared/utils';

// import SvgIcon, { svgIconClasses } from '@mui/material/SvgIcon';
// import { autocompleteClasses } from '@mui/material/Autocomplete';

// // ----------------------------------------------------------------------

// /**
//  * Icons
//  * https://icon-sets.iconify.design/eva/arrow-ios-downward-fill/
//  */
// const ArrowDownIcon = (props) => (
//   <SvgIcon {...props}>
//     <path
//       fill="currentColor"
//       d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15a1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16"
//     />
//   </SvgIcon>
// );

// // ----------------------------------------------------------------------

// const MuiAutocomplete = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: { popupIcon: <ArrowDownIcon /> },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ theme }) => ({
//       [`& span.${autocompleteClasses.tag}`]: {
//         ...theme.typography.subtitle2,
//         height: 24,
//         minWidth: 24,
//         lineHeight: '24px',
//         textAlign: 'center',
//         padding: theme.spacing(0, 0.75),
//         color: theme.vars.palette.text.secondary,
//         borderRadius: theme.shape.borderRadius,
//         backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
//       },
//     }),
//     paper: ({ theme }) => ({ ...theme.mixins.paperStyles(theme, { dropdown: true }) }),
//     listbox: ({ theme }) => ({
//       padding: 0,
//       [`& .${autocompleteClasses.option}`]: { ...theme.mixins.menuItemStyles(theme) },
//     }),
//     endAdornment: { [`& .${svgIconClasses.root}`]: { width: 18, height: 18 } },
//   },
// };

// // ----------------------------------------------------------------------

// export const autocomplete = { MuiAutocomplete };
"use client";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function CustomAutocomplete({
  options = [],
  value,
  onChange,
  placeholder = "Select option",
}) {
  return (
    <div className="relative w-full">
      {/* Select */}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="
                    w-full
                    appearance-none
                    
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    pr-10
                    text-sm
                    font-medium
                    text-gray-700
                    shadow-sm
                    outline-none
                    transition
                    focus:border-black
                    focus:ring-2
                    focus:ring-black/5
                "
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Arrow Icon */}
      <div
        className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                "
      >
        <Iconify
          icon="eva:arrow-ios-downward-fill"
          width={18}
        />
      </div>
    </div>
  );
}