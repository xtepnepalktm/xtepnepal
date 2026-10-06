// import { varAlpha } from 'minimal-shared/utils';

// import { avatarGroupClasses } from '@mui/material/AvatarGroup';

// // ----------------------------------------------------------------------

// const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// const colorByName = (name) => {
//   const charAt = name?.charAt(0).toLowerCase();

//   if (['a', 'c', 'f'].includes(charAt)) return 'primary';
//   if (['e', 'd', 'h'].includes(charAt)) return 'secondary';
//   if (['i', 'k', 'l'].includes(charAt)) return 'info';
//   if (['m', 'n', 'p'].includes(charAt)) return 'success';
//   if (['q', 's', 't'].includes(charAt)) return 'warning';
//   if (['v', 'x', 'y'].includes(charAt)) return 'error';

//   return 'default';
// };

// // ----------------------------------------------------------------------

// const avatarColors = {
//   colors: COLORS.map((color) => ({
//     props: ({ ownerState }) => ownerState.color === color,
//     style: ({ theme }) => ({
//       color: theme.vars.palette[color].contrastText,
//       backgroundColor: theme.vars.palette[color].main,
//     }),
//   })),
//   defaultColor: [
//     {
//       props: ({ ownerState }) => ownerState.color === 'default',
//       style: ({ theme }) => ({
//         color: theme.vars.palette.text.secondary,
//         backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
//       }),
//     },
//   ],
// };

// const MuiAvatar = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: { variants: [avatarColors.defaultColor, avatarColors.colors].flat() },
//     rounded: ({ theme }) => ({ borderRadius: theme.shape.borderRadius * 1.5 }),
//     colorDefault: ({ ownerState, theme }) => {
//       const color = colorByName(ownerState.alt);

//       return {
//         ...(!!ownerState.alt && {
//           ...(color !== 'default'
//             ? {
//                 color: theme.vars.palette[color].contrastText,
//                 backgroundColor: theme.vars.palette[color].main,
//               }
//             : {
//                 color: theme.vars.palette.text.secondary,
//                 backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
//               }),
//         }),
//       };
//     },
//   },
// };

// // ----------------------------------------------------------------------

// const MuiAvatarGroup = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: { max: 4 },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ ownerState }) => ({
//       justifyContent: 'flex-end',
//       ...(ownerState.variant === 'compact' && {
//         width: 40,
//         height: 40,
//         position: 'relative',
//         [`& .${avatarGroupClasses.avatar}`]: {
//           margin: 0,
//           width: 28,
//           height: 28,
//           position: 'absolute',
//           '&:first-of-type': { left: 0, bottom: 0, zIndex: 9 },
//           '&:last-of-type': { top: 0, right: 0 },
//         },
//       }),
//     }),
//     avatar: ({ theme }) => ({
//       fontSize: 16,
//       fontWeight: theme.typography.fontWeightSemiBold,
//       '&:first-of-type': {
//         fontSize: 12,
//         color: theme.vars.palette.primary.dark,
//         backgroundColor: theme.vars.palette.primary.lighter,
//       },
//     }),
//   },
// };

// // ----------------------------------------------------------------------

// export const avatar = { MuiAvatar, MuiAvatarGroup };
// ----------------------------------------------------------------------
// Tailwind Version of MUI Avatar + AvatarGroup
// ----------------------------------------------------------------------

export const COLORS = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
];

// ----------------------------------------------------------------------

export const colorByName = (name) => {
  const charAt = name?.charAt(0)?.toLowerCase();

  if (["a", "c", "f"].includes(charAt)) return "primary";
  if (["e", "d", "h"].includes(charAt)) return "secondary";
  if (["i", "k", "l"].includes(charAt)) return "info";
  if (["m", "n", "p"].includes(charAt)) return "success";
  if (["q", "s", "t"].includes(charAt)) return "warning";
  if (["v", "x", "y"].includes(charAt)) return "error";

  return "default";
};

// ----------------------------------------------------------------------
// Avatar Color Variants
// ----------------------------------------------------------------------

export const avatarColorStyles = {
  primary: `
        bg-blue-600
        text-white
    `,

  secondary: `
        bg-purple-600
        text-white
    `,

  info: `
        bg-cyan-600
        text-white
    `,

  success: `
        bg-emerald-600
        text-white
    `,

  warning: `
        bg-amber-500
        text-white
    `,

  error: `
        bg-red-600
        text-white
    `,

  default: `
        bg-gray-500/25
        text-gray-600
    `,
};

// ----------------------------------------------------------------------
// Avatar Styles
// ----------------------------------------------------------------------

export const avatarStyles = {
  root: `
        inline-flex
        items-center
        justify-center
        overflow-hidden
        rounded-full
        font-medium
        uppercase
        select-none
    `,

  rounded: `
        rounded-2xl
    `,

  image: `
        h-full
        w-full
        object-cover
    `,

  fallback: `
        text-sm
        font-semibold
    `,
};

// ----------------------------------------------------------------------
// Avatar Group Styles
// ----------------------------------------------------------------------

export const avatarGroupStyles = {
  root: `
        flex
        justify-end
    `,

  avatar: `
        relative
        -ml-2
        border-2
        border-white
        text-base
        font-semibold
    `,

  firstAvatar: `
        text-xs
        bg-blue-100
        text-blue-900
    `,

  compactRoot: `
        relative
        h-10
        w-10
    `,

  compactAvatar: `
        absolute
        m-0
        h-7
        w-7
    `,

  compactFirst: `
        left-0
        bottom-0
        z-10
    `,

  compactLast: `
        top-0
        right-0
    `,
};

// ----------------------------------------------------------------------
// Helper Function
// ----------------------------------------------------------------------

export const getAvatarColorClass = (name) => {
  const color = colorByName(name);

  return avatarColorStyles[color];
};