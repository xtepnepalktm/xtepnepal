// import { useCallback } from "react";

// import { Box, Chip } from "@mui/material";

// import { useAppDispatch } from "@/redux/hooks";
// import { setCategory, setBrand, setName } from "@/redux/actions";

// import {
//   chipProps,
//   FiltersBlock,
//   FiltersResult,
// } from "@/components/filters-result";

// // ----------------------------------------------------------------------

// export function ProductFiltersResult({
//   filters,
//   totalResults,
//   options,
//   priceLimit,
//   sx,
// }) {
//   const dispatch = useAppDispatch();

//   const {
//     state: currentFilters,
//     setState: updateFilters,
//     resetState: resetFilters,
//   } = filters;

//   const { brands, categories } = options;

//   const brandFilter = brands?.filter((brand) =>
//     currentFilters.brand.includes(brand.brand_id)
//   );

//   const filterCategories = (categories, targetCategoryId) => {
//     for (const category of categories || []) {
//       if (category.category_id === targetCategoryId) {
//         return category;
//       }

//       if (category.has_sub_cat) {
//         const foundCategory = filterCategories(
//           category.subCategories,
//           targetCategoryId
//         );
//         if (foundCategory) return foundCategory;
//       }
//     }
//     return null;
//   };

//   const categoryFilter = filterCategories(categories, currentFilters.category);

//   const handleRemoveName = useCallback(() => {
//     updateFilters({ name: "" });

//     dispatch(setName(""));
//   }, [updateFilters, dispatch]);

//   const handleRemoveBrand = useCallback(
//     (inputValue) => {
//       const newValue = currentFilters.brand.filter(
//         (item) => item !== inputValue
//       );

//       updateFilters({ brand: newValue });

//       dispatch(setBrand(newValue));
//     },
//     [updateFilters, currentFilters.brand, dispatch]
//   );

//   const handleRemoveCategory = useCallback(() => {
//     updateFilters({ category: "" });

//     dispatch(setCategory(""));
//   }, [updateFilters, dispatch]);

//   const handleRemovePrice = useCallback(() => {
//     updateFilters({ priceRange: [priceLimit.min, priceLimit.max] });
//   }, [updateFilters, priceLimit]);

//   const handleReset = useCallback(() => {
//     dispatch(setName(""));

//     dispatch(setCategory(""));

//     dispatch(setBrand([]));

//     resetFilters();
//   }, [resetFilters, dispatch]);

//   return (
//     <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
//       <FiltersBlock label="Name:" isShow={!!currentFilters.name}>
//         <Chip
//           {...chipProps}
//           label={currentFilters.name}
//           onDelete={handleRemoveName}
//         />
//       </FiltersBlock>

//       <FiltersBlock label="Brand:" isShow={!!currentFilters.brand.length}>
//         {brandFilter?.map((item) => (
//           <Chip
//             {...chipProps}
//             key={item.brand_id}
//             label={item.brand_name}
//             onDelete={() => handleRemoveBrand(item.brand_id)}
//           />
//         ))}
//       </FiltersBlock>

//       <FiltersBlock label="Category:" isShow={!!currentFilters.category}>
//         <Chip
//           {...chipProps}
//           label={categoryFilter?.name}
//           onDelete={handleRemoveCategory}
//         />
//       </FiltersBlock>

//       <FiltersBlock
//         label="Price:"
//         isShow={
//           currentFilters.priceRange[0] !== priceLimit.min ||
//           currentFilters.priceRange[1] !== priceLimit.max
//         }
//       >
//         <Chip
//           {...chipProps}
//           label={`Rs. ${currentFilters.priceRange[0]} - ${currentFilters.priceRange[1]}`}
//           onDelete={handleRemovePrice}
//         />
//       </FiltersBlock>
//     </FiltersResult>
//   );
// }
import { useCallback } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { setCategory, setBrand, setName } from "@/redux/actions";

import {
  FiltersBlock,
  FiltersResult,
} from "@/components/filters-result";

// ----------------------------------------------------------------------

export function ProductFiltersResult({
  filters,
  totalResults,
  options,
  priceLimit,
  className = "",
}) {
  const dispatch = useAppDispatch();

  const {
    state: currentFilters,
    setState: updateFilters,
    resetState: resetFilters,
  } = filters;

  const { brands, categories } = options;

  // ----------------------------------------------------------------------

  const brandFilter = brands?.filter((brand) =>
    currentFilters.brand.includes(brand.brand_id)
  );

  // ----------------------------------------------------------------------

  const filterCategories = (categories, targetCategoryId) => {
    for (const category of categories || []) {
      if (category.category_id === targetCategoryId) {
        return category;
      }

      if (category.has_sub_cat) {
        const foundCategory = filterCategories(
          category.subCategories,
          targetCategoryId
        );

        if (foundCategory) return foundCategory;
      }
    }

    return null;
  };

  const categoryFilter = filterCategories(
    categories,
    currentFilters.category
  );

  // ----------------------------------------------------------------------

  const handleRemoveName = useCallback(() => {
    updateFilters({ name: "" });

    dispatch(setName(""));
  }, [updateFilters, dispatch]);

  const handleRemoveBrand = useCallback(
    (inputValue) => {
      const newValue = currentFilters.brand.filter(
        (item) => item !== inputValue
      );

      updateFilters({ brand: newValue });

      dispatch(setBrand(newValue));
    },
    [updateFilters, currentFilters.brand, dispatch]
  );

  const handleRemoveCategory = useCallback(() => {
    updateFilters({ category: "" });

    dispatch(setCategory(""));
  }, [updateFilters, dispatch]);

  const handleRemovePrice = useCallback(() => {
    updateFilters({
      priceRange: [priceLimit.min, priceLimit.max],
    });
  }, [updateFilters, priceLimit]);

  const handleReset = useCallback(() => {
    dispatch(setName(""));
    dispatch(setCategory(""));
    dispatch(setBrand([]));

    resetFilters();
  }, [resetFilters, dispatch]);

  // ----------------------------------------------------------------------

  return (
    <FiltersResult
      totalResults={totalResults}
      onReset={handleReset}
      className={className}
    >
      {/* Name */}

      <FiltersBlock
        label="Name:"
        isShow={!!currentFilters.name}
      >
        <FilterChip
          label={currentFilters.name}
          onDelete={handleRemoveName}
        />
      </FiltersBlock>

      {/* Brand */}

      <FiltersBlock
        label="Brand:"
        isShow={!!currentFilters.brand.length}
      >
        {brandFilter?.map((item) => (
          <FilterChip
            key={item.brand_id}
            label={item.brand_name}
            onDelete={() => handleRemoveBrand(item.brand_id)}
          />
        ))}
      </FiltersBlock>

      {/* Category */}

      <FiltersBlock
        label="Category:"
        isShow={!!currentFilters.category}
      >
        <FilterChip
          label={categoryFilter?.name}
          onDelete={handleRemoveCategory}
        />
      </FiltersBlock>

      {/* Price */}

      <FiltersBlock
        label="Price:"
        isShow={
          currentFilters.priceRange[0] !== priceLimit.min ||
          currentFilters.priceRange[1] !== priceLimit.max
        }
      >
        <FilterChip
          label={`Rs. ${currentFilters.priceRange[0]} - ${currentFilters.priceRange[1]}`}
          onDelete={handleRemovePrice}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}

// ----------------------------------------------------------------------

function FilterChip({ label, onDelete }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
      <span>{label}</span>

      <button
        type="button"
        onClick={onDelete}
        className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-gray-200"
      >
        ✕
      </button>
    </div>
  );
}