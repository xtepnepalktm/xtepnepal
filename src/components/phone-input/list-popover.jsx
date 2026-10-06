// import { useMemo } from "react";
// import { usePopover } from "minimal-shared/hooks";

// import Box from "@mui/material/Box";
// import Popover from "@mui/material/Popover";
// import MenuList from "@mui/material/MenuList";
// import MenuItem from "@mui/material/MenuItem";
// import TextField from "@mui/material/TextField";
// import ButtonBase from "@mui/material/ButtonBase";
// import IconButton from "@mui/material/IconButton";
// import ListItemText from "@mui/material/ListItemText";
// import InputAdornment from "@mui/material/InputAdornment";

// import { Iconify } from "@/components/iconify";
// import { FlagIcon } from "@/components/flag-icon";
// import { SearchNotFound } from "@/components/search-not-found";

// // ----------------------------------------------------------------------

// export function CountryListPopover({
//   sx,
//   countries,
//   countryCode,
//   searchCountry,
//   onClickCountry,
//   onSearchCountry,
// }) {
//   const { open, onClose, onOpen, anchorEl } = usePopover();

//   const selectedCountry = useMemo(
//     () => countries.find((country) => country.code === countryCode),
//     [countries, countryCode]
//   );

//   const dataFiltered = useMemo(
//     () =>
//       applyFilter({
//         inputData: countries,
//         query: searchCountry,
//       }),
//     [countries, searchCountry]
//   );

//   const notFound = dataFiltered.length === 0 && !!searchCountry;

//   const btnId = "country-list-button";
//   const menuId = "country-list-menu";

//   const renderButton = () => (
//     <ButtonBase
//       disableRipple
//       id={btnId}
//       aria-haspopup="true"
//       aria-controls={open ? menuId : undefined}
//       aria-expanded={open ? "true" : undefined}
//       onClick={onOpen}
//       sx={[
//         {
//           zIndex: 9,
//           display: "flex",
//           position: "absolute",
//           justifyContent: "flex-start",
//           width: "var(--popover-button-width)",
//           height: "var(--popover-button-height)",
//         },
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//     >
//       <FlagIcon
//         code={selectedCountry?.code}
//         sx={{
//           borderRadius: "50%",
//           width: "var(--popover-button-height)",
//           height: "var(--popover-button-height)",
//         }}
//       />

//       <Iconify
//         icon="eva:chevron-down-fill"
//         sx={{ ml: 0.25, flexShrink: 0, color: "text.disabled" }}
//       />

//       <Box
//         component="span"
//         sx={(theme) => ({
//           height: 20,
//           ml: "auto",
//           width: "1px",
//           bgcolor: theme.vars.palette.divider,
//         })}
//       />
//     </ButtonBase>
//   );

//   const renderList = () => (
//     <MenuList>
//       {dataFiltered.map((country) => (
//         <MenuItem
//           key={country.code}
//           selected={open && countryCode === country.code}
//           autoFocus={open && countryCode === country.code}
//           onClick={() => {
//             onClose();
//             onSearchCountry("");
//             onClickCountry(country.code);
//           }}
//         >
//           <FlagIcon
//             code={country.code}
//             sx={{ mr: 1, width: 22, height: 22, borderRadius: "50%" }}
//           />

//           <ListItemText
//             primary={country.label}
//             secondary={`${country.code} (+${country.phone})`}
//             slotProps={{
//               primary: { noWrap: true, sx: { typography: "body2" } },
//               secondary: { sx: { typography: "caption" } },
//             }}
//           />
//         </MenuItem>
//       ))}
//     </MenuList>
//   );

//   return (
//     <>
//       {renderButton()}

//       <Popover
//         id={menuId}
//         aria-labelledby={btnId}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={() => {
//           onClose();
//           onSearchCountry("");
//         }}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//         transformOrigin={{ vertical: "top", horizontal: "left" }}
//         slotProps={{
//           paper: {
//             sx: {
//               width: 1,
//               height: 320,
//               maxWidth: 320,
//               display: "flex",
//               flexDirection: "column",
//             },
//           },
//         }}
//       >
//         <Box sx={{ px: 1, py: 1.5 }}>
//           <TextField
//             autoFocus
//             fullWidth
//             value={searchCountry}
//             onChange={(event) => onSearchCountry(event.target.value)}
//             placeholder="Search..."
//             slotProps={{
//               input: {
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Iconify
//                       icon="eva:search-fill"
//                       sx={{ color: "text.disabled" }}
//                     />
//                   </InputAdornment>
//                 ),
//                 endAdornment: searchCountry && (
//                   <InputAdornment position="end">
//                     <IconButton
//                       size="small"
//                       edge="end"
//                       onClick={() => onSearchCountry("")}
//                     >
//                       <Iconify width={16} icon="mingcute:close-line" />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               },
//             }}
//           />
//         </Box>

//         <Box sx={{ flex: "1 1 auto", overflowX: "hidden" }}>
//           {notFound ? (
//             <SearchNotFound query={searchCountry} sx={{ px: 2, pt: 5 }} />
//           ) : (
//             renderList()
//           )}
//         </Box>
//       </Popover>
//     </>
//   );
// }

// // ----------------------------------------------------------------------

// function applyFilter({ inputData, query }) {
//   if (!query) return inputData;

//   return inputData.filter(({ label, code, phone }) =>
//     [label, code, phone].some((field) =>
//       field?.toLowerCase().includes(query.toLowerCase())
//     )
//   );
// }
import { useMemo } from "react";
import { usePopover } from "minimal-shared/hooks";

import { Iconify } from "@/components/iconify";
import { FlagIcon } from "@/components/flag-icon";
import { SearchNotFound } from "@/components/search-not-found";

// ----------------------------------------------------------------------

export function CountryListPopover({
  sx = "",
  countries,
  countryCode,
  searchCountry,
  onClickCountry,
  onSearchCountry,
}) {
  const { open, onClose, onOpen, anchorEl } = usePopover();

  const selectedCountry = useMemo(
    () => countries.find((c) => c.code === countryCode),
    [countries, countryCode]
  );

  const dataFiltered = useMemo(() => {
    if (!searchCountry) return countries;

    return countries.filter(({ label, code, phone }) =>
      [label, code, phone].some((f) =>
        f?.toLowerCase().includes(searchCountry.toLowerCase())
      )
    );
  }, [countries, searchCountry]);

  const notFound = dataFiltered.length === 0 && !!searchCountry;

  const btnId = "country-list-button";

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        id={btnId}
        onClick={onOpen}
        className={`absolute z-10 flex items-center justify-start 
        w-[var(--popover-button-width)] h-[var(--popover-button-height)] ${sx}`}
      >
        <div className="flex items-center gap-1">
          <FlagIcon
            code={selectedCountry?.code}
            className="rounded-full"
            style={{
              width: "var(--popover-button-height)",
              height: "var(--popover-button-height)",
            }}
          />

          <Iconify
            icon="eva:chevron-down-fill"
            className="text-gray-400 text-sm"
          />
        </div>

        <span className="ml-auto w-px h-5 bg-gray-200" />
      </button>

      {/* POPUP */}
      {open && (
        <div
          className="absolute mt-12 w-[320px] h-[320px] bg-white shadow-lg 
          rounded-md flex flex-col overflow-hidden"
        >
          {/* SEARCH */}
          <div className="p-2">
            <div className="relative">
              <Iconify
                icon="eva:search-fill"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                autoFocus
                value={searchCountry}
                onChange={(e) => onSearchCountry(e.target.value)}
                placeholder="Search..."
                className="w-full border rounded-md pl-8 pr-8 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

              {searchCountry && (
                <button
                  onClick={() => onSearchCountry("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Iconify icon="mingcute:close-line" className="text-sm" />
                </button>
              )}
            </div>
          </div>

          {/* LIST */}
          <div className="flex-1 overflow-y-auto">
            {notFound ? (
              <SearchNotFound query={searchCountry} className="px-2 pt-5" />
            ) : (
              <ul>
                {dataFiltered.map((country) => (
                  <li
                    key={country.code}
                    onClick={() => {
                      onClose();
                      onSearchCountry("");
                      onClickCountry(country.code);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer 
                    hover:bg-gray-100 ${countryCode === country.code ? "bg-gray-100" : ""
                      }`}
                  >
                    <FlagIcon
                      code={country.code}
                      className="rounded-full w-5 h-5"
                    />

                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {country.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {country.code} (+{country.phone})
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}