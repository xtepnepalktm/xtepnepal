// import { useCallback } from "react";
// import Autoplay from "embla-carousel-autoplay";

// import { Stack, Box, Typography, Card, useTheme } from "@mui/material";

// import { CONFIG } from "@/global-config";

// import { useAppDispatch } from "@/redux/hooks";
// import { setBrand } from "@/redux/actions";

// import { Image } from "@/components/image";
// import { Carousel, useCarousel } from "@/components/carousel";

// export function ProductBrandList({ brands, filters }) {
//   const dispatch = useAppDispatch();
//   const { state: currentFilters, setState: updateFilters } = filters;

//   const carousel = useCarousel(
//     {
//       loop: true,
//       align: "start",
//       slideSpacing: "20px",
//       slidesToShow: { xs: 2, sm: 3, md: 7 },
//     },
//     [Autoplay({ playOnInit: true, delay: 2000 })]
//   );

//   const handleFilter = useCallback(
//     (selectedBrandId) => {
//       const updateBrandIds = currentFilters.brand.includes(selectedBrandId)
//         ? currentFilters.brand.filter((id) => id !== selectedBrandId)
//         : [...currentFilters.brand, selectedBrandId];

//       updateFilters({ brand: updateBrandIds });
//       dispatch(setBrand(updateBrandIds));
//     },
//     [updateFilters, currentFilters.brand, dispatch]
//   );

//   if (!brands?.length) {
//     return null;
//   }

//   return (
//     <Stack component="section" spacing={3} sx={{ mb: { xs: 3, md: 5 } }}>
//       <Typography variant="subtitle" sx={{ fontWeight: 700 }}>Our Brands</Typography>

//       <Box>
//         <Carousel carousel={carousel} sx={{ p: 2 }}>
//           {brands.map((brand) => (
//             <ProductBrandItem
//               key={brand.brand_id}
//               item={brand}
//               //
//               onFilter={() => handleFilter(brand.brand_id)}
//             />
//           ))}
//         </Carousel>
//       </Box>
//     </Stack>
//   );
// }

// // ----------------------------------------------------------------------

// function ProductBrandItem({ item, onFilter }) {
//   const { brand_name, brand_image } = item || {};
//   const theme = useTheme();
//   return (
//     <Card
//       onClick={onFilter}
//       sx={{
//         p: { xs: 2, md: 3 },
//         cursor: "pointer",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: 120,
//         overflow: 'visible',
//         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         "&:hover": {
//           boxShadow: theme.shadows[8],
//           transform: "translateY(-4px)",
//           "& img": {
//             transform: "scale(1.1)",
//             filter: "none",
//           },
//         },
//       }}
//     >
//       <Image
//         alt={brand_name}
//         title={brand_name}
//         src={`${brand_image}`}
//         sx={{
//           width: 'auto',
//           height: '80px',
//           cursor: 'pointer',
//           transition: 'all 0.3s ease',
//         }}
//         slotProps={{
//           img: {
//             sx: {
//               objectFit: 'contain',
//               width: '100%',
//               height: '100%',
//             },
//           },
//         }}
//       />
//     </Card>
//   );
// }
import { useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";

import { CONFIG } from "@/global-config";

import { useAppDispatch } from "@/redux/hooks";
import { setBrand } from "@/redux/actions";

import { Image } from "@/components/image";
import { Carousel, useCarousel } from "@/components/carousel";

export function ProductBrandList({ brands, filters }) {
  const dispatch = useAppDispatch();
  const { state: currentFilters, setState: updateFilters } = filters;

  const carousel = useCarousel(
    {
      loop: true,
      align: "start",
      slideSpacing: "20px",
      slidesToShow: { xs: 2, sm: 3, md: 5, lg: 6 },
    },
    [Autoplay({ playOnInit: true, delay: 2000 })]
  );

  const handleFilter = useCallback(
    (selectedBrandId) => {
      const updateBrandIds = currentFilters.brand.includes(selectedBrandId)
        ? currentFilters.brand.filter((id) => id !== selectedBrandId)
        : [...currentFilters.brand, selectedBrandId];

      updateFilters({ brand: updateBrandIds });
      dispatch(setBrand(updateBrandIds));
    },
    [updateFilters, currentFilters.brand, dispatch]
  );

  if (!brands?.length) {
    return null;
  }

  return (
    <section className="flex flex-col gap-2 mb-2 md:mb-2">
      <p className="text-sm font-bold mb-0">Our Brands</p>

      <div>
        <Carousel carousel={carousel} className="p-2">
          {brands.map((brand) => (
            <ProductBrandItem
              key={brand.brand_id}
              item={brand}
              onFilter={() => handleFilter(brand.brand_id)}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------

function ProductBrandItem({ item, onFilter }) {
  const { brand_name, brand_image } = item || {};

  return (
    <div
      onClick={onFilter}
      className="
        p-4 md:p-4 cursor-pointer flex items-center justify-center
        min-h-[100px] overflow-visible  bg-white shadow-md
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:-translate-y-1 hover:shadow-xl
        group
      "
    >
      <Image
        alt={brand_name}
        title={brand_name}
        src={`${brand_image}`}
        className="w-auto h-[80px] cursor-pointer transition-all duration-300 group-hover:scale-110"
        slotProps={{
          img: {
            className: "object-contain w-full h-full",
          },
        }}
      />
    </div>
  );
}