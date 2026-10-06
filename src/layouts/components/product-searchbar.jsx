// import { useState, useCallback } from "react";
// import parse from "autosuggest-highlight/parse";
// import match from "autosuggest-highlight/match";
// import { useDebounce } from "minimal-shared/hooks";

// import {
//   useTheme,
//   textFieldClasses,
//   Avatar,
//   TextField,
//   Typography,
//   InputAdornment,
//   Link,
//   linkClasses,
//   Autocomplete,
//   autocompleteClasses,
//   Box,
// } from "@mui/material";

// import { CONFIG } from "@/global-config";

// import { paths } from "@/routes/paths";
// import { useRouter } from "@/routes/hooks";
// import { RouterLink } from "@/routes/components";

// import { varAlpha } from "minimal-shared/utils";

// import { Iconify } from "@/components/iconify";
// import { SearchNotFound } from "@/components/search-not-found";

// import { useGetProducts } from "@/api";

// export function ProductSearchbar({ sx }) {
//   const theme = useTheme();

//   const router = useRouter();

//   const [searchQuery, setSearchQuery] = useState("");

//   const [selectedItem, setSelectedItem] = useState(null);

//   const debouncedQuery = useDebounce(searchQuery);

//   // Build query params for API filtering - only fetch when there's a search query
//   const searchParams = debouncedQuery ? `name=${encodeURIComponent(debouncedQuery)}` : "";

//   const { products, isLoading } = useGetProducts(searchParams);

//   const handleSearchQuery = (event, newValue) => {
//     setSearchQuery(newValue);
//   };

//   const handleChange = useCallback(
//     (item) => {
//       setSelectedItem(item);

//       if (item) {
//         // Check if user selected "View all results" option
//         if (item.isViewAllOption) {
//           router.push(`${paths.product.root}?name=${encodeURIComponent(item.searchQuery)}`);
//         } else {
//           router.push(paths.product.details(item.slug));
//         }
//       }
//     },
//     [router]
//   );

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter" && searchQuery.trim()) {
//       router.push(`${paths.product.root}?name=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   // Custom filter that adds "View all results" option - no frontend filtering needed since API filters
//   const filterOptions = (options, state) => {
//     // Only show options when user has typed something
//     if (!state.inputValue.trim()) {
//       return [];
//     }

//     // Return all options from API (already filtered) and add "View all results" at the top
//     return [
//       {
//         isViewAllOption: true,
//         searchQuery: state.inputValue.trim(),
//         name: `${state.inputValue.trim()}`,
//         product_id: "view-all",
//       },
//       ...options,
//     ];
//   };

//   const paperStyles = {
//     width: { xs: 1, sm: 320, md: 500 },
//     borderRadius: 2,
//     boxShadow: theme.shadows[20],
//     border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.12)}`,
//     [` .${autocompleteClasses.listbox}`]: {
//       [` .${autocompleteClasses.option}`]: {
//         p: 0,
//         borderRadius: 1,
//         mx: 1,
//         my: 0.5,
//         transition: "all 0.2s ease",
//         "&:hover": {
//           backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
//         },
//         [` .${linkClasses.root}`]: {
//           p: 1.5,
//           gap: 2,
//           width: 1,
//           display: "flex",
//           alignItems: "center",
//         },
//       },
//     },
//   };

//   return (
//     <Autocomplete
//       autoHighlight
//       popupIcon={null}
//       loading={isLoading}
//       options={products}
//       value={selectedItem}
//       filterOptions={filterOptions}
//       onChange={(event, newValue) => handleChange(newValue)}
//       onInputChange={handleSearchQuery}
//       onKeyDown={handleKeyDown}
//       getOptionLabel={(option) => option.name || ""}
//       noOptionsText={<SearchNotFound query={debouncedQuery} />}
//       isOptionEqualToValue={(option, value) => option.product_id === value.product_id}
//       slotProps={{ paper: { sx: paperStyles } }}
//       sx={[
//         {
//           [`& .${textFieldClasses.input}`]: {
//             typography: "body1",
//             py: 1.5,
//           },
//           width: { xs: 1, sm: 320, md: 500 },
//           borderRadius: 3,
//           bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.06),
//           border: `2px solid transparent`,
//           transition: theme.transitions.create(["background-color", "border-color", "box-shadow"], {
//             easing: theme.transitions.easing.easeInOut,
//             duration: theme.transitions.duration.shorter,
//           }),
//           "&:hover": {
//             bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.1),
//           },
//         },
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           placeholder="Search for products..."
//           slotProps={{
//             input: {
//               ...params.InputProps,
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Box
//                     sx={{
//                       ml: 1,
//                       p: 0.75,
//                       borderRadius: 1.5,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.1),
//                       color: "primary.main",
//                     }}
//                   >
//                     <Iconify icon="eva:search-fill" width={20} />
//                   </Box>
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <>
//                   {isLoading ? (
//                     <Iconify
//                       icon="svg-spinners:8-dots-rotate"
//                       sx={{ mr: -3, color: "primary.main" }}
//                     />
//                   ) : null}
//                   {params.InputProps.endAdornment}
//                 </>
//               ),
//             },
//           }}
//         />
//       )}
//       renderOption={(props, product, { inputValue }) => {
//         // Handle "View all results" option
//         if (product.isViewAllOption) {
//           return (
//             <li {...props} key="view-all">
//               <Link
//                 component={RouterLink}
//                 href={`${paths.product.root}?name=${encodeURIComponent(product.searchQuery)}`}
//                 color="inherit"
//                 underline="none"
//               >
//                 <Box
//                   sx={{
//                     p: 0.75,
//                     borderRadius: 1.5,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.1),
//                     color: "primary.main",
//                   }}
//                 >
//                   <Iconify icon="eva:search-fill" width={24} />
//                 </Box>
//                 <Typography
//                   sx={{
//                     typography: "body2",
//                     fontWeight: "fontWeightSemiBold",
//                     color: "primary.main",
//                   }}
//                 >
//                   {product.name}
//                 </Typography>
//               </Link>
//             </li>
//           );
//         }

//         const matches = match(product.name, inputValue);
//         const parts = parse(product.name, matches);

//         return (
//           <li {...props} key={product.product_id}>
//             <Link
//               component={RouterLink}
//               href={paths.product.details(product.slug)}
//               color="inherit"
//               underline="none"
//             >
//               <Avatar
//                 key={product.product_id}
//                 alt={product.name}
//                 src={`${product.featured_image}`}
//                 variant="rounded"
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   flexShrink: 0,
//                   borderRadius: 1,
//                 }}
//               />

//               <div key={inputValue}>
//                 {parts.map((part, index) => (
//                   <Typography
//                     key={index}
//                     component="span"
//                     color={part.highlight ? "primary" : "textPrimary"}
//                     sx={{
//                       typography: "body2",
//                       fontWeight: part.highlight
//                         ? "fontWeightSemiBold"
//                         : "fontWeightMedium",
//                     }}
//                   >
//                     {part.text}
//                   </Typography>
//                 ))}
//               </div>
//             </Link>
//           </li>
//         );
//       }}
//     />
//   );
// }
import { useState, useCallback, useRef, useEffect } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useDebounce } from "minimal-shared/hooks";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { SearchNotFound } from "@/components/search-not-found";

import { useGetProducts } from "@/api";

// ----------------------------------------------------------------------

export function ProductSearchbar({ className, onClose }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const debouncedQuery = useDebounce(searchQuery);
  const searchParams = debouncedQuery
    ? `name=${encodeURIComponent(debouncedQuery)}`
    : "";
  const { products, isLoading } = useGetProducts(searchParams);

  // Mirror Autocomplete filterOptions — prepend "View all" when query present
  const options = !searchQuery.trim()
    ? []
    : [
      {
        isViewAllOption: true,
        searchQuery: searchQuery.trim(),
        name: searchQuery.trim(),
        product_id: "view-all",
      },
      ...(products || []),
    ];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = useCallback(
    (item) => {
      setSelectedItem(item);
      setOpen(false);
      if (!item) return;
      if (item.isViewAllOption) {
        router.push(
          `${paths.product.root}?name=${encodeURIComponent(item.searchQuery)}`,
        );
      } else {
        router.push(paths.product.details(item.slug));
      }
    },
    [router],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (options[highlightedIndex]) {
        handleChange(options[highlightedIndex]);
      } else if (searchQuery.trim()) {
        router.push(
          `${paths.product.root}?name=${encodeURIComponent(searchQuery.trim())}`,
        );
      }
    }
    if (e.key === "ArrowDown") {
      setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
    }
    if (e.key === "ArrowUp") {
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={[
        "relative hidden lg:block",
        // width: { xs:1, sm:320, md:500 }
        "w-full sm:w-[420px] md:w-[640px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Input wrapper ─────────────────────────────────────────── */}
      {/*
        bgcolor varAlpha(grey500,0.06) → bg-gray-500/[0.06]
        border 2px solid transparent  → border-2 border-transparent
        borderRadius 3 (24px)          → 
        hover bgcolor varAlpha(grey500,0.1) → hover:bg-gray-500/[0.10]
        transition background-color, border-color, box-shadow
      */}
      <div
        className={[
          // "flex items-center gap-2",
          // "rounded-full",
          // "bg-gray-500/[0.06] hover:bg-gray-500/[0.10]",
          // "transition-[background-color,border-color,box-shadow] duration-200 ease-in-out",
          "flex items-center gap-2",

          "bg-gray-100 hover:bg-gray-200",
          "px-1 py-1.5",
          "transition-colors duration-200 ease-in-out",
        ].join(" ")}
      >
        {/*
          startAdornment:
          ml:1 p:0.75 borderRadius:1.5 (12px)
          bgcolor varAlpha(primary,0.1) color primary.main
        */}
        <span className="ml-3 flex shrink-0 items-center justify-center bg-primary/[0.10] p-1.5 text-primary">
          <Iconify icon="eva:search-fill" className="h-5 w-5 text-[#000000]" />
        </span>

        {/*
          TextField input: typography body1 (16px), py:1.5 (12px)
        */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          placeholder="Search for products..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setOpen(true);
            setHighlightedIndex(0);
          }}
          onFocus={() => searchQuery.trim() && setOpen(true)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent text-base outline-none border-none ring-0 placeholder:text-gray-800 text-[#000000]"
        />
        {/* endAdornment: spinner or clear */}
        <span className="mr-2 flex shrink-0 items-center">
          {isLoading && (
            <Iconify
              icon="svg-spinners:8-dots-rotate"
              className="h-5 w-5 text-[#000000]"
            />
          )}
        </span>
      </div>

      {/* ── Dropdown paper ────────────────────────────────────────── */}
      {/*
        width: { xs:1, sm:320, md:500 }
        borderRadius:2 (16px) → rounded-2xl
        boxShadow: theme.shadows[20] → shadow-2xl approximation
        border 1px solid varAlpha(grey500,0.12) → border-gray-500/[0.12]
      */}
      {open && options.length > 0 && (
        <ul
          className={[
            "absolute left-0 right-0 z-[1300] mt-1",
            "overflow-x-hidden overflow-y-auto max-h-[500px]",
            "border border-gray-500/[0.12]",
            "bg-white shadow-[0_20px_40px_-4px_rgba(145,158,171,0.24)] bg-neutral-800",
            "py-1",
          ].join(" ")}
        >
          {options.map((product, index) => {
            const isHighlighted = index === highlightedIndex;

            if (product.isViewAllOption) {
              return (
                /*
                  option: p:0 borderRadius:1 mx:1 my:0.5
                  hover bgcolor varAlpha(primary,0.08)
                  link: p:1.5 gap:2 width:1 flex alignItems:center
                */
                <li
                  key="view-all"
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => handleChange(product)}
                  className={[
                    "mx-1 my-0.5 cursor-pointer list-none  transition-all duration-200",
                    isHighlighted ? "bg-primary/[0.08]" : "",
                  ].join(" ")}
                >
                  <RouterLink
                    href={`${paths.product.root}?name=${encodeURIComponent(product.searchQuery)}`}
                    className="flex w-full items-center gap-4 p-1 no-underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/*
                      Box icon wrapper: p:0.75 borderRadius:1.5
                      bgcolor varAlpha(primary,0.1) color primary
                    */}
                    <span className="flex shrink-0 items-center justify-center bg-primary/[0.10] p-1.5 text-primary">
                      <Iconify icon="eva:search-fill" className="h-6 w-6" />
                    </span>

                    {/* Typography body2 fontWeightSemiBold color primary */}
                    <span className="text-sm font-semibold text-primary">
                      {product.name}
                    </span>
                  </RouterLink>
                </li>
              );
            }

            // Regular product option
            const matches = match(product.name, searchQuery);
            const parts = parse(product.name, matches);

            return (
              <li
                key={product.product_id}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleChange(product)}
                className={[
                  "mx-1 my-0.5 p-1 cursor-pointer list-none  transition-all duration-200 hover:bg-gray-200",
                  isHighlighted ? "bg-primary/[0.08]" : "",
                ].join(" ")}
              >
                <RouterLink
                  href={paths.product.details(product.slug)}
                  className="flex w-full items-center gap-3 p-1 no-underline mb-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/*
                    Avatar: width:48 height:48 flexShrink:0 borderRadius:1 (8px)
                    variant="rounded" → 
                  */}
                  <img
                    alt={product.name}
                    title={product.name}
                    src={product.featured_image}
                    className="h-10 w-10 shrink-0 shadow-sm object-cover"
                  />

                  {/* Highlighted text parts */}
                  <div>
                    {parts.map((part, i) => (
                      <span
                        key={i}
                        className={[
                          "text-sm",
                          part.highlight
                            ? "font-semibold text-primary"
                            : "font-medium text-gray-900 text-gray-100",
                        ].join(" ")}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </RouterLink>
              </li>
            );
          })}
        </ul>
      )}

      {/* No results */}
      {open && !isLoading && searchQuery.trim() && options.length === 0 && (
        <div className="absolute left-0 right-0 z-[1300] mt-1  border border-gray-500/[0.12] bg-white p-4 shadow-[0_20px_40px_-4px_rgba(145,158,171,0.24)] dark:bg-neutral-800">
          <SearchNotFound query={debouncedQuery} />
        </div>
      )}
    </div>
  );
}
