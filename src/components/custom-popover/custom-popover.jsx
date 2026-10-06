// import Popover from "@mui/material/Popover";
// import { listClasses } from "@mui/material/List";
// import { menuItemClasses } from "@mui/material/MenuItem";

// import { Arrow } from "./styles";
// import { calculateAnchorOrigin } from "./utils";

// // ----------------------------------------------------------------------

// export function CustomPopover({
//   open,
//   onClose,
//   children,
//   anchorEl,
//   slotProps,
//   ...other
// }) {
//   const {
//     arrow: arrowProps,
//     paper: paperProps,
//     ...otherSlotProps
//   } = slotProps ?? {};

//   const arrowSize = arrowProps?.size ?? 14;
//   const arrowOffset = arrowProps?.offset ?? 17;
//   const arrowPlacement = arrowProps?.placement ?? "top-right";

//   const { paperStyles, anchorOrigin, transformOrigin } =
//     calculateAnchorOrigin(arrowPlacement);

//   return (
//     <Popover
//       open={!!open}
//       anchorEl={anchorEl}
//       onClose={onClose}
//       anchorOrigin={anchorOrigin}
//       transformOrigin={transformOrigin}
//       slotProps={{
//         ...otherSlotProps,
//         paper: {
//           ...paperProps,
//           sx: [
//             paperStyles,
//             {
//               overflow: "inherit",
//               [`& .${listClasses.root}`]: { minWidth: 140 },
//               [`& .${menuItemClasses.root}`]: { gap: 2 },
//             },
//             ...(Array.isArray(paperProps?.sx)
//               ? paperProps?.sx ?? []
//               : [paperProps?.sx]),
//           ],
//         },
//       }}
//       {...other}
//     >
//       {!arrowProps?.hide && (
//         <Arrow
//           size={arrowSize}
//           offset={arrowOffset}
//           placement={arrowPlacement}
//           sx={arrowProps?.sx}
//         />
//       )}

//       {children}
//     </Popover>
//   );
// }
"use client";

import { useEffect, useRef } from "react";

import { Arrow } from "./styles";
import { calculateAnchorOrigin } from "./utils";

// ----------------------------------------------------------------------

export function CustomPopover({
  open,
  onClose,
  children,
  anchorEl,
  slotProps,
  className = "",
  ...other
}) {
  const popoverRef = useRef(null);

  const {
    arrow: arrowProps,
    paper: paperProps,
    ...otherSlotProps
  } = slotProps ?? {};

  const arrowSize = arrowProps?.size ?? 14;
  const arrowOffset = arrowProps?.offset ?? 17;
  const arrowPlacement = arrowProps?.placement ?? "top-right";

  const { paperStyles } = calculateAnchorOrigin(arrowPlacement);

  // --------------------------------------------------------------------
  // CLOSE ON OUTSIDE CLICK
  // --------------------------------------------------------------------

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        anchorEl &&
        !anchorEl.contains(event.target)
      ) {
        onClose?.();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose, anchorEl]);

  // --------------------------------------------------------------------

  if (!open || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return (
    <div
      ref={popoverRef}
      className={`
        fixed
        z-50
        ${className}
      `}
      style={{
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        ...paperStyles,
      }}
      {...other}
    >
      <div
        className={`
          relative
          min-w-[140px]
          overflow-visible
          
          border
          border-black/10
          bg-white
          shadow-xl

          [&_li]:gap-2
        `}
      >
        {!arrowProps?.hide && (
          <Arrow
            size={arrowSize}
            offset={arrowOffset}
            placement={arrowPlacement}
            className={arrowProps?.className}
          />
        )}

        <div className={paperProps?.className}>
          {children}
        </div>
      </div>
    </div>
  );
}