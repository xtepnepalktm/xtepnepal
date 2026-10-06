// "use client";

// import { useState } from "react";
// import { Box, Container, Stack, Typography, useTheme, Card, Grid2 } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { Image } from "@/components/image";
// import { Iconify } from "@/components/iconify";
// import { Lightbox } from "@/components/lightbox";

// // Static product data
// const STATIC_PRODUCTS = [
//   {
//     product_id: 1,
//     product_name: "Premier Vit - Multivitamins, Multiminerals & Antioxidants witth Lycopene & Lutein Tablets",
//     image: "/assets/images/products/product.jpg",
//   },
//   {
//     product_id: 2,
//     product_name: "Omega Max - Omega-3 Fish Oil 1000mg with Vitamin D3 Softgels",
//     image: "/assets/images/products/product-1.jpg",
//   },
//   {
//     product_id: 3,
//     product_name: "Coralcal Calcium Supplement",
//     image: "/assets/images/products/product-2.jpg",
//   },
//   {
//     product_id: 4,
//     product_name: "CoKing Pro - CoEnzyme Q10 & L-Carnitine Tablets",
//     image: "/assets/images/products/product-3.jpg",
//   },
//   {
//     product_id: 5,
//     product_name: "CoQueen-Max - CoEnzyme + Vitamin E",
//     image: "/assets/images/products/product-4.jpg",
//   },


// ];

// export function HomeProducts() {
//   const theme = useTheme();

//   return (
//     <Box
//       component="section"
//       sx={{
//         py: { xs: 3, md: 3 },
//         mb: 0,
//         pb: 0,
//         bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.01),
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Decorative background elements */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: -150,
//           right: -150,
//           width: 400,
//           height: 400,
//           borderRadius: "50%",
//           bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.04),
//           filter: "blur(120px)",
//           zIndex: 0,
//         }}
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: -100,
//           left: -100,
//           width: 350,
//           height: 350,
//           borderRadius: "50%",
//           bgcolor: varAlpha(theme.vars.palette.secondary.mainChannel, 0.03),
//           filter: "blur(100px)",
//           zIndex: 0,
//         }}
//       />

//       <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
//         <Stack spacing={8}>
//           {/* Section Header */}
//           <Stack spacing={3} alignItems="center" textAlign="center">
//             <Box
//               sx={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 2,
//                 px: 3,
//                 py: 1,
//                 borderRadius: 3,
//                 bgcolor: varAlpha(theme.vars.palette.secondary.mainChannel, 0.08),
//                 border: `1px solid ${varAlpha(theme.vars.palette.secondary.mainChannel, 0.15)}`,
//               }}
//             >
//               <Box
//                 sx={{
//                   width: 8,
//                   height: 8,
//                   borderRadius: "50%",
//                   bgcolor: "secondary.main",
//                   animation: "pulse 2s infinite",
//                   "@keyframes pulse": {
//                     "0%, 100%": { opacity: 1, transform: "scale(1)" },
//                     "50%": { opacity: 0.6, transform: "scale(0.9)" },
//                   },
//                 }}
//               />
//               <Typography
//                 variant="overline"
//                 sx={{
//                   color: "secondary.main",
//                   fontWeight: 700,
//                   letterSpacing: 2,
//                   fontSize: "0.7rem",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Premium Collection
//               </Typography>
//             </Box>

//             <Typography
//               variant="h2"
//               sx={{
//                 fontWeight: 800,
//                 fontSize: { xs: "2rem", md: "2.75rem" },
//                 maxWidth: 700,
//                 letterSpacing: -1,
//                 lineHeight: 1.15,
//                 color: "text.primary",
//               }}
//             >
//               Our Featured{" "}
//               <Box
//                 component="span"
//                 sx={{
//                   position: "relative",
//                   color: "secondary.main",
//                   "&::after": {
//                     content: '""',
//                     position: "absolute",
//                     bottom: 4,
//                     left: 0,
//                     right: 0,
//                     height: 8,
//                     bgcolor: varAlpha(theme.vars.palette.secondary.mainChannel, 0.2),
//                     borderRadius: 2,
//                     zIndex: -1,
//                   },
//                 }}
//               >
//                 Products
//               </Box>
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{
//                 color: "text.secondary",
//                 maxWidth: 550,
//                 fontSize: "1.05rem",
//                 lineHeight: 1.75,
//                 fontWeight: 400,
//               }}
//             >
//               Discover our carefully curated selection of premium health and wellness products
//             </Typography>
//           </Stack>

//           {/* Products Grid */}
//           <Grid2 container spacing={{ xs: 2.5, md: 3 }}>
//             {STATIC_PRODUCTS.map((product) => (
//               <Grid2 key={product.product_id} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
//                 <ProductCard product={product} />
//               </Grid2>
//             ))}
//           </Grid2>
//         </Stack>
//       </Container>
//     </Box>
//   );
// }

// // -----------------------------------------------------------------------

// function ProductCard({ product }) {
//   const theme = useTheme();
//   const { product_name, image } = product;
//   const [openLightbox, setOpenLightbox] = useState(false);

//   const slides = [
//     {
//       src: image,
//       title: product_name,
//     },
//   ];

//   return (
//     <Card
//       sx={{
//         overflow: "hidden",
//         borderRadius: 3,
//         bgcolor: "background.paper",
//         border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}`,
//         boxShadow: `0 4px 24px ${varAlpha(theme.vars.palette.common.black, 0.06)}`,
//         transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//         cursor: "pointer",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         position: "relative",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           inset: 0,
//           borderRadius: "inherit",
//           padding: "2px",
//           background: `linear-gradient(135deg, ${theme.vars.palette.secondary.main}, transparent, ${theme.vars.palette.secondary.main})`,
//           WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
//           WebkitMaskComposite: "xor",
//           maskComposite: "exclude",
//           opacity: 0,
//           transition: "opacity 0.4s ease",
//         },
//         "&:hover": {
//           transform: "translateY(-8px) scale(1.02)",
//           boxShadow: `0 20px 48px ${varAlpha(theme.vars.palette.secondary.mainChannel, 0.2)}, 0 8px 24px ${varAlpha(theme.vars.palette.common.black, 0.1)}`,
//           "&::before": {
//             opacity: 1,
//           },
//           "& .product-image": {
//             transform: "scale(1.1)",
//           },
//           "& .product-overlay": {
//             opacity: 1,
//           },
//           "& .product-badge": {
//             transform: "translateX(0)",
//             opacity: 1,
//           },
//         },
//       }}
//     >
//       {/* Image Container */}
//       <Box
//         sx={{
//           position: "relative",
//           paddingBottom: "110%",
//           overflow: "hidden",
//           bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.03),
//         }}
//       >
//         {/* Premium Badge */}
//         <Box
//           className="product-badge"
//           sx={{
//             position: "absolute",
//             top: 12,
//             left: 12,
//             zIndex: 2,
//             px: 1.5,
//             py: 0.5,
//             borderRadius: 1.5,
//             bgcolor: "secondary.main",
//             color: "common.white",
//             fontSize: "0.65rem",
//             fontWeight: 700,
//             textTransform: "uppercase",
//             letterSpacing: 0.5,
//             transform: "translateX(-100%)",
//             opacity: 0,
//             transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//           }}
//         >
//           Premium
//         </Box>

//         <Image
//           className="product-image"
//           alt={product_name}
//           title={product_name}
//           src={image}
//           sx={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             position: "absolute",
//             top: 0,
//             left: 0,
//             transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//           }}
//         />

//         {/* Hover Overlay */}
//         <Box
//           className="product-overlay"
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: `linear-gradient(180deg, transparent 0%, ${varAlpha(theme.vars.palette.common.blackChannel, 0.85)} 100%)`,
//             opacity: 0,
//             transition: "opacity 0.4s ease",
//             display: "flex",
//             alignItems: "flex-end",
//             justifyContent: "center",
//             p: 2.5,
//           }}
//         >
//           <Stack spacing={2} alignItems="center" textAlign="center" sx={{ width: "100%" }}>
//             <Box
//               onClick={() => setOpenLightbox(true)}
//               sx={{
//                 width: 48,
//                 height: 48,
//                 borderRadius: 2,
//                 bgcolor: "secondary.main",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: `0 4px 16px ${varAlpha(theme.vars.palette.secondary.mainChannel, 0.4)}`,
//                 transition: "transform 0.3s ease",
//                 cursor: "pointer",
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                 },
//               }}
//             >
//               <Iconify icon="solar:eye-bold" width={24} sx={{ color: "common.white" }} />
//             </Box>

//             <Typography
//               variant="h3"
//               sx={{
//                 color: "common.white",
//                 fontWeight: 700,
//                 fontSize: { xs: "0.9rem", md: "1rem" },
//                 lineHeight: 1.4,
//                 display: "-webkit-box",
//                 WebkitLineClamp: 2,
//                 WebkitBoxOrient: "vertical",
//                 overflow: "hidden",
//               }}
//             >
//               {product_name}
//             </Typography>
//           </Stack>
//         </Box>
//       </Box>

//       {/* Product Name - Hidden on hover */}
//       {/* <Box
//         sx={{
//           p: 2.5,
//           flexGrow: 1,
//           display: "flex",
//           flexDirection: "column",
//           transition: "opacity 0.3s ease",
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 600,
//             fontSize: { xs: "0.875rem", sm: "0.9rem" },
//             lineHeight: 1.5,
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             color: "text.primary",
//             minHeight: "2.8em",
//           }}
//         >
//           {product_name}
//         </Typography>
//       </Box> */}

//       {/* Lightbox */}
//       <Lightbox slides={slides} open={openLightbox} close={() => setOpenLightbox(false)} />
//     </Card>
//   );
// }
"use client";

import { useState } from "react";
import { Lightbox } from "@/components/lightbox";

// ----------------------------------------------------------------------

const DEFAULT_SECONDARY = "#9c27b0";

function hexAlpha(hex, opacity) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

// ----------------------------------------------------------------------
// Inline SVG
// ----------------------------------------------------------------------

function EyeIcon({ size = 24, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      <path opacity={0.5} d="M12 5C7.18 5 3.11 7.95 1.5 12c1.61 4.05 5.68 7 10.5 7s8.89-2.95 10.5-7C20.89 7.95 16.82 5 12 5z" />
    </svg>
  );
}

// ----------------------------------------------------------------------

const STATIC_PRODUCTS = [
  { product_id: 1, product_name: "Premier Vit - Multivitamins, Multiminerals & Antioxidants witth Lycopene & Lutein Tablets", image: "/assets/images/products/product.jpg" },
  { product_id: 2, product_name: "Omega Max - Omega-3 Fish Oil 1000mg with Vitamin D3 Softgels", image: "/assets/images/products/product-1.jpg" },
  { product_id: 3, product_name: "Coralcal Calcium Supplement", image: "/assets/images/products/product-2.jpg" },
  { product_id: 4, product_name: "CoKing Pro - CoEnzyme Q10 & L-Carnitine Tablets", image: "/assets/images/products/product-3.jpg" },
  { product_id: 5, product_name: "CoQueen-Max - CoEnzyme + Vitamin E", image: "/assets/images/products/product-4.jpg" },
];

// ----------------------------------------------------------------------

export function HomeProducts({ vendor }) {
  const secondaryColor = vendor?.secondary_color || DEFAULT_SECONDARY;

  return (
    <section className="relative overflow-hidden py-6 md:py-6">
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-[150px] -right-[150px] h-[400px] w-[400px] rounded-full blur-[120px]"
        style={{ backgroundColor: hexAlpha("#1976d2", 0.04) }}
      />
      <div
        className="pointer-events-none absolute -bottom-[100px] -left-[100px] h-[350px] w-[350px] rounded-full blur-[100px]"
        style={{ backgroundColor: hexAlpha(secondaryColor, 0.03) }}
      />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 flex flex-col gap-16">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2  border px-6 py-2"
            style={{
              backgroundColor: hexAlpha(secondaryColor, 0.08),
              borderColor: hexAlpha(secondaryColor, 0.15),
            }}
          >
            {/* Pulsing dot */}
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: secondaryColor }}
            />
            <span
              className="text-[0.7rem] font-bold uppercase tracking-[2px]"
              style={{ color: secondaryColor }}
            >
              Premium Collection
            </span>
          </div>

          {/* Title */}
          <h2 className="max-w-[700px] text-[2rem] font-extrabold leading-[1.15]  text-gray-900 md:text-[2.75rem]">
            Our Featured{" "}
            <span className="relative inline-block" style={{ color: secondaryColor }}>
              Products
              {/* Highlight underline */}
              <span
                className="absolute -bottom-1 left-0 right-0 -z-10 h-2 "
                style={{ backgroundColor: hexAlpha(secondaryColor, 0.2) }}
              />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-[550px] text-[1.05rem] leading-[1.75] text-gray-500">
            Discover our carefully curated selection of premium health and wellness products
          </p>
        </div>

        {/* ── Products Grid ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {STATIC_PRODUCTS.map((product) => (
            <ProductCard key={product.product_id} product={product} secondaryColor={secondaryColor} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------------------------

function ProductCard({ product, secondaryColor }) {
  const { product_name, image } = product;
  const [openLightbox, setOpenLightbox] = useState(false);

  const slides = [{ src: image, title: product_name }];

  return (
    <div className="group relative flex h-full cursor-pointer flex-col overflow-hidden  border bg-white transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:scale-[1.02]"
      style={{
        borderColor: "rgba(145,158,171,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 48px ${hexAlpha(secondaryColor, 0.2)}, 0 8px 24px rgba(0,0,0,0.1)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden pb-[110%]" style={{ backgroundColor: "rgba(145,158,171,0.03)" }}>

        {/* Premium badge — slides in on hover */}
        <div
          className="absolute left-3 top-3 z-20 -translate-x-full  px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white opacity-0 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0 group-hover:opacity-100"
          style={{ backgroundColor: secondaryColor }}
        >
          Premium
        </div>

        {/* Product image */}
        <img
          alt={product_name}
          title={product_name}
          src={image}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end gap-4 p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)" }}
        >
          {/* Eye button */}
          <button
            type="button"
            onClick={() => setOpenLightbox(true)}
            className="flex h-12 w-12 items-center justify-center  text-white transition-transform duration-300 hover:scale-110"
            style={{
              backgroundColor: secondaryColor,
              boxShadow: `0 4px 16px ${hexAlpha(secondaryColor, 0.4)}`,
            }}
          >
            <EyeIcon size={24} />
          </button>

          {/* Product name */}
          <h3 className="line-clamp-2 text-center text-[0.9rem] font-bold leading-[1.4] text-white md:text-[1rem]">
            {product_name}
          </h3>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox slides={slides} open={openLightbox} close={() => setOpenLightbox(false)} />
    </div>
  );
}