// import { varAlpha } from 'minimal-shared/utils';

// import { dividerClasses } from '@mui/material/Divider';
// import { checkboxClasses } from '@mui/material/Checkbox';
// import { menuItemClasses } from '@mui/material/MenuItem';
// import { autocompleteClasses } from '@mui/material/Autocomplete';

// // ----------------------------------------------------------------------

// export function menuItemStyles(theme) {
//   return {
//     ...theme.typography.body2,
//     padding: theme.spacing(0.75, 1),
//     borderRadius: theme.shape.borderRadius * 0.75,
//     '&:not(:last-of-type)': {
//       marginBottom: 4,
//     },
//     [`&.${menuItemClasses.selected}`]: {
//       fontWeight: theme.typography.fontWeightSemiBold,
//       backgroundColor: theme.vars.palette.action.selected,
//       '&:hover': { backgroundColor: theme.vars.palette.action.hover },
//     },
//     [`& .${checkboxClasses.root}`]: {
//       padding: theme.spacing(0.5),
//       marginLeft: theme.spacing(-0.5),
//       marginRight: theme.spacing(0.5),
//     },
//     [`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
//       backgroundColor: theme.vars.palette.action.selected,
//       '&:hover': { backgroundColor: theme.vars.palette.action.hover },
//     },
//     [`&+.${dividerClasses.root}`]: {
//       margin: theme.spacing(0.5, 0),
//     },
//   };
// }

// // ----------------------------------------------------------------------

// /**
//  * Tools for creating image base64
//  * https://www.fffuel.co/eeencode/
//  */
// const cyanShape =
//   'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCkiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==';

// const redShape =
//   'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzNykiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzNyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K';

// export function paperStyles(theme, options) {
//   const { blur = 20, color, dropdown } = options ?? {};
//   return {
//     ...theme.mixins.bgGradient({
//       images: [`url(${cyanShape})`, `url(${redShape})`],
//       sizes: ['50%', '50%'],
//       positions:
//         theme.direction === 'rtl' ? ['top left', 'right bottom'] : ['top right', 'left bottom'],
//     }),
//     backdropFilter: `blur(${blur}px)`,
//     WebkitBackdropFilter: `blur(${blur}px)`,
//     backgroundColor: color ?? varAlpha(theme.vars.palette.background.paperChannel, 0.9),
//     ...(dropdown && {
//       padding: theme.spacing(0.5),
//       boxShadow: theme.vars.customShadows.dropdown,
//       borderRadius: `${theme.shape.borderRadius * 1.25}px`,
//     }),
//   };
// }

/* =========================================================
   MENU ITEM SYSTEM (MUI → Tailwind)
========================================================= */

export const menuItemClass = (selected = false) => `
  flex items-center text-sm
  px-3 py-2
  
  cursor-pointer
  transition-all

  ${selected
    ? "bg-black/5 dark:bg-white/10 font-semibold"
    : "hover:bg-black/5 dark:hover:bg-white/10"
  }

  [&:not(:last-child)]:mb-1
`;


/* =========================================================
   AUTOCOMPLETE OPTION (MUI Autocomplete replacement)
========================================================= */

export const autocompleteOptionClass = (selected = false) => `
  flex items-center text-sm
  px-3 py-2
  
  cursor-pointer
  transition-all

  ${selected
    ? "bg-black/5 dark:bg-white/10 font-semibold"
    : "hover:bg-black/5 dark:hover:bg-white/10"
  }
`;


/* =========================================================
   CHECKBOX INSIDE MENU ITEM (MUI checkboxClasses fix)
========================================================= */

export const checkboxClass = `
  w-4 h-4
  ml-[-6px]
  mr-2
`;


/* =========================================================
   DIVIDER (MUI dividerClasses replacement)
========================================================= */

export const dividerClass = `
  my-2 h-px
  bg-gray-200 dark:bg-white/10
`;


/* =========================================================
   PAPER STYLES (MUI Paper + Popover + Dropdown)
========================================================= */

export const paperClass = (dropdown = false) => `
  relative overflow-hidden

  
  bg-white/70 dark:bg-black/40
  backdrop-blur-xl
  shadow-lg

  ${dropdown ? "p-2  shadow-xl bg-white/80 dark:bg-black/50" : ""}
`;


/* =========================================================
   GRADIENT BACKGROUND BLOBS (cyanShape + redShape replacement)
========================================================= */

export const paperBlobs = `
  absolute inset-0 pointer-events-none overflow-hidden
`;


/* Cyan blob */
export const cyanBlob = `
  absolute -top-10 -right-10
  w-44 h-44
  bg-cyan-400/20
  rounded-full
  blur-3xl
`;

/* Red blob */
export const redBlob = `
  absolute -bottom-10 -left-10
  w-44 h-44
  bg-red-400/20
  rounded-full
  blur-3xl
`;


/* =========================================================
   FULL MENU CONTAINER (READY COMPONENT STYLE)
========================================================= */

export const menuContainerClass = `
  relative overflow-hidden
  
  bg-white/70 dark:bg-black/40
  backdrop-blur-xl
  shadow-lg
  p-2
`;


/* =========================================================
   ITEM WRAPPER (spacing fix equivalent of &:not(:last-of-type))
========================================================= */

export const menuItemWrapperClass = `
  [&>*:not(:last-child)]:mb-1
`;


/* =========================================================
   AUTOCOMPLETE POPUP (MUI paper override)
========================================================= */

export const autocompletePaperClass = `
  relative overflow-hidden
  
  bg-white/80 dark:bg-black/50
  backdrop-blur-xl
  shadow-xl
  p-2
`;


/* =========================================================
   USAGE EXAMPLE (React)
========================================================= */

export function ExampleMenu({ items, selectedIndex, onSelect }) {
  return `
    <div class="${menuContainerClass}">
      
      <div class="${paperBlobs}">
        <div class="${cyanBlob}"></div>
        <div class="${redBlob}"></div>
      </div>

      <div class="relative">
        ${items.map((item, i) => `
          <div
            onclick="onSelect(${i})"
            class="${menuItemClass(i === selectedIndex)}"
          >
            ${item.checkbox ? `<input type="checkbox" class="${checkboxClass}" />` : ""}
            ${item.label}
          </div>
        `).join("")}
      </div>

    </div>
  `;
}