// import { varAlpha } from 'minimal-shared/utils';

// import { toggleButtonClasses } from '@mui/material/ToggleButton';

// // ----------------------------------------------------------------------

// const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// // ----------------------------------------------------------------------

// function styleColors(ownerState, styles) {
//   const outputStyle = COLORS.reduce((acc, color) => {
//     if (!ownerState.disabled && ownerState.color === color) {
//       acc = styles(color);
//     }
//     return acc;
//   }, {});

//   return outputStyle;
// }

// // ----------------------------------------------------------------------

// const MuiToggleButton = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ theme, ownerState }) => {
//       const styled = {
//         colors: styleColors(ownerState, (color) => ({
//           '&:hover': {
//             borderColor: varAlpha(theme.vars.palette[color].mainChannel, 0.48),
//             backgroundColor: varAlpha(
//               theme.vars.palette[color].mainChannel,
//               theme.vars.palette.action.hoverOpacity
//             ),
//           },
//         })),
//         selected: {
//           [`&.${toggleButtonClasses.selected}`]: {
//             borderColor: 'currentColor',
//             boxShadow: '0 0 0 0.75px currentColor',
//           },
//         },
//         disabled: {
//           ...(ownerState.disabled && {
//             [`&.${toggleButtonClasses.selected}`]: {
//               color: theme.vars.palette.action.disabled,
//               backgroundColor: theme.vars.palette.action.selected,
//               borderColor: theme.vars.palette.action.disabledBackground,
//             },
//           }),
//         },
//       };

//       return {
//         fontWeight: theme.typography.fontWeightSemiBold,
//         ...styled.colors,
//         ...styled.selected,
//         ...styled.disabled,
//       };
//     },
//   },
// };

// // ----------------------------------------------------------------------

// const MuiToggleButtonGroup = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ theme }) => ({
//       gap: 4,
//       padding: 4,
//       border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
//     }),
//     grouped: {
//       [`&.${toggleButtonClasses.root}`]: { border: 'none', borderRadius: 'inherit' },
//       [`&.${toggleButtonClasses.selected}`]: { boxShadow: 'none' },
//     },
//   },
// };

// // ----------------------------------------------------------------------

// export const toggleButton = { MuiToggleButton, MuiToggleButtonGroup };
// ----------------------------------------------------------------------
// Tailwind Version of MUI ToggleButton + ToggleButtonGroup
// ----------------------------------------------------------------------

export const toggleButtonStyles = {
  root: `
        inline-flex
        items-center
        justify-center
        
        px-4
        py-2
        text-sm
        font-semibold
        transition-all
        duration-200
        border
        border-gray-300
        bg-white
        text-gray-700
        outline-none
    `,

  selected: `
        border-current
        shadow-[0_0_0_0.75px_currentColor]
    `,

  disabled: `
        pointer-events-none
        text-gray-400
        bg-gray-100
        border-gray-200
    `,
};

// ----------------------------------------------------------------------
// Color Variants
// ----------------------------------------------------------------------

export const toggleButtonColorStyles = {
  primary: `
        hover:border-blue-500/50
        hover:bg-blue-500/10
    `,

  secondary: `
        hover:border-purple-500/50
        hover:bg-purple-500/10
    `,

  info: `
        hover:border-cyan-500/50
        hover:bg-cyan-500/10
    `,

  success: `
        hover:border-emerald-500/50
        hover:bg-emerald-500/10
    `,

  warning: `
        hover:border-amber-500/50
        hover:bg-amber-500/10
    `,

  error: `
        hover:border-red-500/50
        hover:bg-red-500/10
    `,
};

// ----------------------------------------------------------------------
// Toggle Button Group
// ----------------------------------------------------------------------

export const toggleButtonGroupStyles = {
  root: `
        inline-flex
        gap-1
        
        border
        border-gray-500/10
        p-1
        bg-white
    `,

  grouped: `
        border-none
        rounded-[inherit]
    `,

  groupedSelected: `
        shadow-none
    `,
};

// ----------------------------------------------------------------------
// Helper Function
// ----------------------------------------------------------------------

export const getToggleButtonClass = ({
  color = "primary",
  selected = false,
  disabled = false,
}) => {
  const classes = [
    toggleButtonStyles.root,
  ];

  // Hover color
  if (!disabled) {
    classes.push(
      toggleButtonColorStyles[color]
    );
  }

  // Selected
  if (selected) {
    classes.push(
      toggleButtonStyles.selected
    );
  }

  // Disabled
  if (disabled) {
    classes.push(
      toggleButtonStyles.disabled
    );
  }

  return classes.join(" ");
};