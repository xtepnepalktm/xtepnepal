// import { varAlpha } from 'minimal-shared/utils';

// import { buttonGroupClasses } from '@mui/material/ButtonGroup';

// // ----------------------------------------------------------------------

// const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// function styleColors(ownerState, styles) {
//   const outputStyle = COLORS.reduce((acc, color) => {
//     if (!ownerState.disabled && ownerState.color === color) {
//       acc = styles(color);
//     }
//     return acc;
//   }, {});

//   return outputStyle;
// }

// const buttonClasses = `& .${buttonGroupClasses.firstButton}, & .${buttonGroupClasses.middleButton}`;

// const softVariant = {
//   colors: COLORS.map((color) => ({
//     props: ({ ownerState }) =>
//       !ownerState.disabled && ownerState.variant === 'soft' && ownerState.color === color,
//     style: ({ theme }) => ({
//       [buttonClasses]: {
//         borderColor: varAlpha(theme.vars.palette[color].darkChannel, 0.24),
//         ...theme.applyStyles('dark', {
//           borderColor: varAlpha(theme.vars.palette[color].lightChannel, 0.24),
//         }),
//       },
//       [`&.${buttonGroupClasses.vertical}`]: {
//         [buttonClasses]: {
//           borderColor: varAlpha(theme.vars.palette[color].darkChannel, 0.24),
//           ...theme.applyStyles('dark', {
//             borderColor: varAlpha(theme.vars.palette[color].lightChannel, 0.24),
//           }),
//         },
//       },
//     }),
//   })),
//   base: [
//     {
//       props: ({ ownerState }) => ownerState.variant === 'soft',
//       style: ({ theme }) => ({
//         [buttonClasses]: {
//           borderRight: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.32)}`,
//           [`&.${buttonGroupClasses.disabled}`]: {
//             borderColor: theme.vars.palette.action.disabledBackground,
//           },
//         },
//         [`&.${buttonGroupClasses.vertical}`]: {
//           [buttonClasses]: {
//             borderRight: 'none',
//             borderBottom: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.32)}`,
//             [`&.${buttonGroupClasses.disabled}`]: {
//               borderColor: theme.vars.palette.action.disabledBackground,
//             },
//           },
//         },
//       }),
//     },
//   ],
// };

// // ----------------------------------------------------------------------

// const MuiButtonGroup = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: { disableElevation: true },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: {
//       variants: [
//         /**
//          * @variant soft
//          */
//         softVariant.base,
//         softVariant.colors,
//       ].flat(),
//     },
//     /**
//      * @variant contained
//      */
//     contained: ({ theme, ownerState }) => {
//       const styled = {
//         colors: styleColors(ownerState, (color) => ({
//           [buttonClasses]: {
//             borderColor: varAlpha(theme.vars.palette[color].darkChannel, 0.48),
//           },
//         })),
//         inheritColor: {
//           ...(ownerState.color === 'inherit' && {
//             [buttonClasses]: {
//               borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.32),
//             },
//           }),
//         },
//         disabled: {
//           ...(ownerState.disabled && {
//             [buttonClasses]: {
//               [`&.${buttonGroupClasses.disabled}`]: {
//                 borderColor: theme.vars.palette.action.disabledBackground,
//               },
//             },
//           }),
//         },
//       };

//       return { ...styled.inheritColor, ...styled.colors, ...styled.disabled };
//     },
//     /**
//      * @variant outlined
//      */
//     outlined: ({ theme, ownerState }) => {
//       const styled = {
//         inheritColor: {
//           ...(ownerState.color === 'inherit' && {
//             [`& .${buttonGroupClasses.grouped}`]: {
//               '&:hover': { borderColor: theme.vars.palette.text.primary },
//             },
//           }),
//         },
//       };

//       return { ...styled.inheritColor };
//     },
//     /**
//      * @variant text
//      */
//     text: ({ theme, ownerState }) => {
//       const styled = {
//         colors: styleColors(ownerState, (color) => ({
//           [buttonClasses]: {
//             borderColor: varAlpha(theme.vars.palette[color].mainChannel, 0.48),
//           },
//         })),
//         inheritColor: {
//           ...(ownerState.color === 'inherit' && {
//             [buttonClasses]: {
//               borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.32),
//             },
//           }),
//         },
//         disabled: {
//           ...(ownerState.disabled && {
//             [buttonClasses]: {
//               [`&.${buttonGroupClasses.disabled}`]: {
//                 borderColor: theme.vars.palette.action.disabledBackground,
//               },
//             },
//           }),
//         },
//       };

//       return { ...styled.inheritColor, ...styled.colors, ...styled.disabled };
//     },
//   },
// };

// // ----------------------------------------------------------------------

// export const buttonGroup = { MuiButtonGroup };
// ----------------------------------------------------------------------
// Tailwind Version of MUI ButtonGroup
// ----------------------------------------------------------------------

export const buttonGroupStyles = {
  root: `
        inline-flex
        overflow-hidden
        
    `,

  vertical: `
        flex-col
    `,

  horizontal: `
        flex-row
    `,

  button: `
        inline-flex
        items-center
        justify-center
        px-4
        py-2
        text-sm
        font-medium
        transition-all
        duration-200
        outline-none
    `,
};

// ----------------------------------------------------------------------
// Soft Variant
// ----------------------------------------------------------------------

export const softButtonGroupStyles = {
  base: `
        bg-transparent
    `,

  horizontalBorder: `
        border-r
        border-gray-300
        last:border-r-0
    `,

  verticalBorder: `
        border-b
        border-gray-300
        last:border-b-0
    `,

  primary: `
        border-blue-900/25
    `,

  secondary: `
        border-purple-900/25
    `,

  info: `
        border-cyan-900/25
    `,

  success: `
        border-emerald-900/25
    `,

  warning: `
        border-amber-900/25
    `,

  error: `
        border-red-900/25
    `,

  disabled: `
        border-gray-200
    `,
};

// ----------------------------------------------------------------------
// Contained Variant
// ----------------------------------------------------------------------

export const containedButtonGroupStyles = {
  primary: `
        border-blue-900/50
    `,

  secondary: `
        border-purple-900/50
    `,

  info: `
        border-cyan-900/50
    `,

  success: `
        border-emerald-900/50
    `,

  warning: `
        border-amber-900/50
    `,

  error: `
        border-red-900/50
    `,

  inherit: `
        border-gray-400/40
    `,

  disabled: `
        border-gray-200
    `,
};

// ----------------------------------------------------------------------
// Outlined Variant
// ----------------------------------------------------------------------

export const outlinedButtonGroupStyles = {
  inherit: `
        hover:border-black
    `,
};

// ----------------------------------------------------------------------
// Text Variant
// ----------------------------------------------------------------------

export const textButtonGroupStyles = {
  primary: `
        border-blue-500/50
    `,

  secondary: `
        border-purple-500/50
    `,

  info: `
        border-cyan-500/50
    `,

  success: `
        border-emerald-500/50
    `,

  warning: `
        border-amber-500/50
    `,

  error: `
        border-red-500/50
    `,

  inherit: `
        border-gray-400/40
    `,

  disabled: `
        border-gray-200
    `,
};

// ----------------------------------------------------------------------
// Helper Function
// ----------------------------------------------------------------------

export const getButtonGroupClass = ({
  variant = "soft",
  color = "primary",
  orientation = "horizontal",
  disabled = false,
}) => {
  const classes = [
    buttonGroupStyles.root,
    orientation === "vertical"
      ? buttonGroupStyles.vertical
      : buttonGroupStyles.horizontal,
  ];

  // SOFT
  if (variant === "soft") {
    classes.push(softButtonGroupStyles.base);

    classes.push(
      orientation === "vertical"
        ? softButtonGroupStyles.verticalBorder
        : softButtonGroupStyles.horizontalBorder
    );

    classes.push(
      disabled
        ? softButtonGroupStyles.disabled
        : softButtonGroupStyles[color]
    );
  }

  // CONTAINED
  if (variant === "contained") {
    classes.push(
      disabled
        ? containedButtonGroupStyles.disabled
        : containedButtonGroupStyles[color]
    );
  }

  // OUTLINED
  if (variant === "outlined") {
    if (color === "inherit") {
      classes.push(
        outlinedButtonGroupStyles.inherit
      );
    }
  }

  // TEXT
  if (variant === "text") {
    classes.push(
      disabled
        ? textButtonGroupStyles.disabled
        : textButtonGroupStyles[color]
    );
  }

  return classes.join(" ");
};