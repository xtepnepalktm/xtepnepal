// // ----------------------------------------------------------------------

// const MuiListItemIcon = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ theme }) => ({ color: 'inherit', minWidth: 'auto', marginRight: theme.spacing(2) }),
//   },
// };

// // ----------------------------------------------------------------------

// const MuiListItemAvatar = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: { root: ({ theme }) => ({ minWidth: 'auto', marginRight: theme.spacing(2) }) },
// };

// // ----------------------------------------------------------------------

// const MuiListItemText = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: {
//     slotProps: {
//       primary: { typography: 'subtitle2' },
//       secondary: { component: 'span' },
//     },
//   },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: { root: { margin: 0 }, multiline: { margin: 0 } },
// };

// // ----------------------------------------------------------------------

// export const list = { MuiListItemIcon, MuiListItemAvatar, MuiListItemText };
// list-tailwind.js

export const listStyles = {
  /**
   * List Item Icon
   */
  itemIcon: `
    text-inherit
    min-w-0
    mr-2
    flex
    items-center
    justify-center
    shrink-0
  `,

  /**
   * List Item Avatar
   */
  itemAvatar: `
    min-w-0
    mr-2
    shrink-0
    flex
    items-center
    justify-center
  `,

  /**
   * List Item Text
   */
  itemText: `
    m-0
    flex
    flex-col
    min-w-0
  `,

  primaryText: `
    text-sm
    font-semibold
    text-gray-900
    truncate
  `,

  secondaryText: `
    text-sm
    text-gray-500
    leading-relaxed
  `,

  multiline: `
    space-y-1
  `,
};