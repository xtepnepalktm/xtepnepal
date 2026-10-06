// import { tooltipClasses } from '@mui/material/Tooltip';

// // ----------------------------------------------------------------------

// const MuiTooltip = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     tooltip: ({ theme }) => ({
//       backgroundColor: theme.vars.palette.grey[800],
//       ...theme.applyStyles('dark', {
//         backgroundColor: theme.vars.palette.grey[700],
//       }),
//     }),
//     arrow: ({ theme }) => ({
//       color: theme.vars.palette.grey[800],
//       ...theme.applyStyles('dark', {
//         color: theme.vars.palette.grey[700],
//       }),
//     }),
//     popper: {
//       [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
//         marginTop: 12,
//       },
//       [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
//         marginBottom: 12,
//       },
//       [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
//         marginLeft: 12,
//       },
//       [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
//         marginRight: 12,
//       },
//     },
//   },
// };

// // ----------------------------------------------------------------------

// export const tooltip = { MuiTooltip };
'use client'
import { useState } from "react";

export default function Tooltip({
  children,
  content,
  placement = "top",
}) {
  const [open, setOpen] = useState(false);

  const spacing = {
    top: "mb-3",
    bottom: "mt-3",
    left: "mr-3",
    right: "ml-3",
  };

  const arrowBase =
    "absolute w-2.5 h-2.5 rotate-45 bg-gray-800 dark:bg-gray-700";

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  const arrowPos = {
    top: "bottom-[-5px] left-1/2 -translate-x-1/2",
    bottom: "top-[-5px] left-1/2 -translate-x-1/2",
    left: "right-[-5px] top-1/2 -translate-y-1/2",
    right: "left-[-5px] top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}

      {open && (
        <div
          className={`absolute z-50 px-3 py-1.5 text-xs text-white rounded-md shadow-md
          bg-gray-800 dark:bg-gray-700 whitespace-nowrap ${positions[placement]}`}
        >
          {content}

          {/* Arrow */}
          <span
            className={`${arrowBase} ${arrowPos[placement]}`}
          />
        </div>
      )}
    </div>
  );
}