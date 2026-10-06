// import Autoplay from "embla-carousel-autoplay";
// import { Stack, Box, Typography, Card, useTheme } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { CONFIG } from "@/global-config";

// import { useAppDispatch } from "@/redux/hooks";
// import { setBrand, setCategory } from "@/redux/actions";

// import { paths } from "@/routes/paths";
// import { useRouter } from "@/routes/hooks";

// import { Iconify } from "@/components/iconify";
// import { Image } from "@/components/image";
// import { Carousel, useCarousel } from "@/components/carousel";

// export function HomeFeaturedBrands({ brands }) {
//   const theme = useTheme();
//   const router = useRouter();

//   const dispatch = useAppDispatch();

//   const carousel = useCarousel(
//     {
//       loop: brands?.length > 6,
//       align: "start",
//       slideSpacing: "20px",
//       slidesToShow: { xs: 2, sm: 3, md: 5, lg: 6 },
//     },
//     brands?.length > 6 ? [Autoplay({ playOnInit: true, delay: 2500, stopOnInteraction: true })] : []
//   );

//   // Check if brands count is less than slides shown
//   const isCentered = brands?.length <= 6;

//   if (!brands?.length) {
//     return null;
//   }

//   const handleView = (id) => {
//     dispatch(setBrand([id]));
//     dispatch(setCategory(""));
//     router.push(paths.product.root);
//   };

//   return (
//     <Box
//       component="section"
//       sx={{
//         py: 4,
//         px: 3,
//         borderRadius: 3,
//         bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.04),
//         border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}`,
//       }}
//     >
//       <Stack spacing={3}>
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
//           <Iconify icon="solar:verified-check-bold-duotone" width={24} sx={{ color: "primary.main" }} />
//           <Typography
//             variant="h3"
//             sx={{
//               fontSize: { xs: '1rem', md: '1.2rem' },
//               fontWeight: 700,
//               textAlign: "center",
//             }}
//           >
//             Trusted Brands
//           </Typography>
//         </Box>

//         <Box>
//           <Carousel carousel={carousel} sx={{ p: 2 }}>
//             {brands.map((brand) => (
//               <HomeFeaturedBrandItem
//                 key={brand.brand_id}
//                 item={brand}
//                 //
//                 onView={() => handleView(brand.brand_id)}
//               />
//             ))}
//           </Carousel>
//         </Box>
//       </Stack>
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// function HomeFeaturedBrandItem({ item, onView }) {
//   const theme = useTheme();
//   const { brand_name, brand_image } = item || {};

//   return (
//     <Card
//       onClick={onView}
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
"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { useAppDispatch } from "@/redux/hooks";
import { setBrand, setCategory } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------
// Inline SVG — replaces <Iconify icon="solar:verified-check-bold-duotone" />
// ----------------------------------------------------------------------

function VerifiedCheckIcon({ size = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        opacity={0.5}
        d="M14.516 3.434c-.7-.728-1.755-1.15-3.348-.988-1.09.113-1.964-.555-2.977-.7C6.804 1.54 5.62 2.16 4.682 3.097c-.937.938-1.557 2.122-1.351 3.51.144 1.012-.814 1.886-.7 2.976.161 1.594.26 2.648.988 3.348.728.699 1.783.799 3.377.96 1.013.1 1.887 1.058 2.9.914 1.389-.205 2.572-.825 3.51-1.762.937-.938 1.557-2.122 1.351-3.51-.144-1.013.814-1.887.7-2.977-.162-1.593-.261-2.648-.94-3.122z"
      />
      <path d="m9.668 13.527-2.645-2.644a.75.75 0 1 1 1.06-1.06l2.115 2.113 3.521-3.52a.75.75 0 1 1 1.06 1.06l-4.06 4.051a.75.75 0 0 1-1.051 0z" />
    </svg>
  );
}

// ----------------------------------------------------------------------

export function HomeFeaturedBrands({ brands }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const autoplay =
    brands?.length > 6
      ? [Autoplay({ delay: 2500, stopOnInteraction: true })]
      : [];

  const [emblaRef] = useEmblaCarousel(
    {
      watchResize: false, // disable auto resize watching
      loop: brands?.length > 6, align: "start"
    },
    autoplay
  );

  if (!brands?.length) return null;

  const handleView = (id) => {
    dispatch(setBrand([id]));
    dispatch(setCategory(""));
    router.push(paths.product.root);
  };

  return (
    <section
      className=" border px-3 py-5 lg:my-6 my-2 md:px-4"
      style={{
        backgroundColor: "rgba(145,158,171,0.04)",
        borderColor: "rgba(145,158,171,0.08)",
      }}
    >
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-2">
          {/* <VerifiedCheckIcon size={30} className="text-blue-600" /> */}
          <Iconify icon="solar:verified-check-bold" />
          <h2 className="text-[1rem] font-bold text-gray-900 md:text-[1.2rem]">
            Trusted Brands
          </h2>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden px-2" ref={emblaRef}>
          <div className="flex gap-5 py-2">
            {brands.map((brand) => (
              <HomeFeaturedBrandItem
                key={brand.brand_id}
                item={brand}
                onView={() => handleView(brand.brand_id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------

function HomeFeaturedBrandItem({ item, onView }) {
  const { brand_name, brand_image } = item || {};

  return (
    <div
      onClick={onView}
      className="group flex min-w-[52%] cursor-pointer items-center justify-center overflow-visible  bg-white p-2 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl sm:min-w-[30%] md:min-w-[18%] lg:min-w-[15%]"
    >
      <div className="flex h-25 w-full items-center justify-center py-3">
        <img
          alt={brand_name}
          title={brand_name}
          src={brand_image}
          className="h-16 w-16 object-contain transition-all duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
    </div>
  );
}