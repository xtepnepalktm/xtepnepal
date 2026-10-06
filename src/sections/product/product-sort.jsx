// import { usePopover } from "minimal-shared/hooks";

// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import MenuList from "@mui/material/MenuList";
// import MenuItem from "@mui/material/MenuItem";

// import { Iconify } from "@/components/iconify";
// import { CustomPopover } from "@/components/custom-popover";

// // ----------------------------------------------------------------------

// export function ProductSort({ sort, onSort, sortOptions }) {
//   const menuActions = usePopover();

//   const sortLabel = sortOptions.find((option) => option.value === sort)?.label;

//   const renderMenuActions = () => (
//     <CustomPopover
//       open={menuActions.open}
//       anchorEl={menuActions.anchorEl}
//       onClose={menuActions.onClose}
//     >
//       <MenuList>
//         {sortOptions.map((option) => (
//           <MenuItem
//             key={option.value}
//             selected={option.value === sort}
//             onClick={() => {
//               menuActions.onClose();
//               onSort(option.value);
//             }}
//           >
//             {option.label}
//           </MenuItem>
//         ))}
//       </MenuList>
//     </CustomPopover>
//   );

//   return (
//     <>
//       <Button
//         disableRipple
//         color="inherit"
//         onClick={menuActions.onOpen}
//         endIcon={
//           <Iconify
//             icon={
//               menuActions.open
//                 ? "eva:arrow-ios-upward-fill"
//                 : "eva:arrow-ios-downward-fill"
//             }
//           />
//         }
//         sx={{ fontWeight: "fontWeightSemiBold" }}
//       >
//         Sort by:
//         <Box component="span" sx={{ ml: 0.5, fontWeight: "fontWeightBold" }}>
//           {sortLabel}
//         </Box>
//       </Button>

//       {renderMenuActions()}
//     </>
//   );
// }
import { useState, useRef, useEffect } from "react";

import { usePopover } from "minimal-shared/hooks";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function ProductSort({ sort, onSort, sortOptions }) {
  const menuActions = usePopover();

  const dropdownRef = useRef(null);

  const sortLabel = sortOptions.find(
    (option) => option.value === sort
  )?.label;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        menuActions.onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [menuActions]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Button */}
      <button
        type="button"
        onClick={menuActions.onOpen}
        className="inline-flex items-center gap-1  px-2 py-1.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
      >
        <span>Sort by:</span>

        <span className="font-bold">{sortLabel}</span>

        <Iconify
          icon={
            menuActions.open
              ? "eva:arrow-ios-upward-fill"
              : "eva:arrow-ios-downward-fill"
          }
          className="text-base"
        />
      </button>

      {/* Dropdown */}
      {menuActions.open && (
        <div className="absolute right-0 z-50 mt-2 min-w-[180px] overflow-hidden  border border-gray-200 bg-white shadow-xl">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  menuActions.onClose();
                  onSort(option.value);
                }}
                className={`flex w-full items-center px-4 py-2 text-left text-sm transition ${option.value === sort
                  ? "bg-gray-100 font-semibold text-black"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}