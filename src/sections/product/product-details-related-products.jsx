// // import { Box, Typography } from "@mui/material";

// // import { paths } from "@/routes/paths";

// // import {
// //   Carousel,
// //   useCarousel,
// //   CarouselArrowBasicButtons,
// // } from "@/components/carousel";

// // import { ProductItem } from "./product-item";

// // // ----------------------------------------------------------------------

// // export function ProductDetailsRelatedProducts({
// //   title,
// //   list,
// //   isQuickOrder = false,
// //   sx,
// //   ...other
// // }) {
// //   const carousel = useCarousel({
// //     align: "start",
// //     slideSpacing: "24px",
// //     slidesToShow: {
// //       xs: 1,
// //       sm: 3,
// //       md: 5,
// //       lg: "25%",
// //       xl: "25%",
// //     },
// //   });

// //   return (
// //     <Box sx={sx} {...other}>
// //       <Box sx={{ display: "flex", alignItems: "center" }}>
// //         <Typography variant="h2" sx={{
// //           margin: 0,
// //           flexGrow: 1,
// //           fontSize: {
// //             xs: "0.8rem",
// //             sm: "1rem",
// //             md: "1.2rem",
// //           }
// //         }}>          {title}
// //         </Typography>

// //         <CarouselArrowBasicButtons {...carousel.arrows} />
// //       </Box>

// //       <Carousel
// //         carousel={carousel}
// //         slotProps={{ slide: { py: 3 } }}
// //         sx={{ px: 0.5 }}
// //       >
// //         {list.map((item) => (
// //           <ProductItem
// //             key={item.product_id}
// //             product={item}
// //             detailsHref={
// //               isQuickOrder
// //                 ? paths.product.quickOrder(item.slug)
// //                 : paths.product.details(item.slug)
// //             }
// //           />
// //         ))}
// //       </Carousel>
// //     </Box>
// //   );
// // }
// import { paths } from "@/routes/paths";

// import {
//   Carousel,
//   useCarousel,
//   CarouselArrowBasicButtons,
// } from "@/components/carousel";

// import { ProductItem } from "./product-item";

// export function ProductDetailsRelatedProducts({
//   title,
//   list,
//   isQuickOrder = false,
//   sx,
//   ...other
// }) {
//   const carousel = useCarousel({
//     align: "start",
//     slideSpacing: "24px",
//     slidesToShow: {
//       xs: 1,
//       sm: 3,
//       md: 5,
//       lg: 4,
//       xl: 4,
//     },
//   });

//   return (
//     <div className={`w-full ${sx ?? ""}`} {...other}>
//       {/* HEADER */}
//       <div className="flex items-center mb-4">
//         <h2
//           className="
//             flex-grow m-0
//             text-xs sm:text-sm md:text-base
//             font-semibold
//           "
//         >
//           {title}
//         </h2>

//         <CarouselArrowBasicButtons {...carousel.arrows} />
//       </div>

//       {/* CAROUSEL */}
//       <div className="px-1">
//         <Carousel carousel={carousel} className="w-full">
//           {list.map((item) => (
//             <div key={item.product_id} className="py-3">
//               <ProductItem
//                 product={item}
//                 detailsHref={
//                   isQuickOrder
//                     ? paths.product.quickOrder(item.slug)
//                     : paths.product.details(item.slug)
//                 }
//               />
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// }

import { paths } from "@/routes/paths";

import {
  Carousel,
  useCarousel,
  CarouselArrowBasicButtons,
} from "@/components/carousel";

import { ProductItem } from "./product-item";

// ----------------------------------------------------------------------

export function ProductDetailsRelatedProducts({
  title,
  list,
  isQuickOrder = false,
  sx,
  ...other
}) {
  const carousel = useCarousel({
    align: "start",
    slideSpacing: "24px",
    slidesToShow: {
      xs: 1,
      sm: 3,
      md: 5,
      lg: 4,
      xl: 4,
    },
  });

  if (list?.length === 0) {
    return null;
  }

  return (
    <div className={`w-full  overflow-hidden ${sx ?? ""}`} {...other}>
      {/* HEADER */}
      <div className="mb-4 flex items-center">
        <h2
          className="
            m-0 flex-grow
            text-xs sm:text-sm md:text-base
            font-semibold
          "
        >
          {title}
        </h2>

        <CarouselArrowBasicButtons {...carousel.arrows} />
      </div>

      {/* CAROUSEL */}
      <div className="px-1">
        <Carousel carousel={carousel} className="w-full overflow-hidden">
          {list?.map((item) => (
            <div
              key={item.product_id}
              className="
                shrink-0
                basis-full
                sm:basis-1/3
                md:basis-1/5
                lg:basis-1/4
                xl:basis-1/4
                py-3
              "
            >
              <ProductItem
                product={item}
                detailsHref={
                  isQuickOrder
                    ? paths.product.quickOrder(item.slug)
                    : paths.product.details(item.slug)
                }
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}