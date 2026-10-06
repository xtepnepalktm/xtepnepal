// import { Stack, Typography, Box, useTheme } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { paths } from "@/routes/paths";

// import { Iconify } from "@/components/iconify";

// import { ProductItem } from "../product/product-item";

// export function HomeRecentlyAddedProducts({ products }) {
//   const theme = useTheme();

//   if (!products?.length) return null;

//   return (
//     <Stack component="section" spacing={4}>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//         <Box
//           sx={{
//             p: 1.5,
//             borderRadius: 2,
//             bgcolor: varAlpha(theme.vars.palette.info.mainChannel, 0.12),
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Iconify icon="solar:box-bold-duotone" width={28} sx={{ color: "info.main" }} />
//         </Box>
//         <Box>
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 700,
//               fontSize: { xs: "1.25rem", md: "1.5rem" },
//             }}
//           >
//             Recently Added
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Fresh new products just for you
//           </Typography>
//         </Box>
//       </Box>


//       <Box
//         sx={{
//           display: "grid",
//           gap: { xs: 2, sm: 2.5, md: 3 },
//           gridTemplateColumns: {
//             xs: "repeat(2, minmax(0, 1fr))",
//             sm: "repeat(3, minmax(0, 1fr))",
//             md: "repeat(4, minmax(0, 1fr))",
//             lg: "repeat(5, minmax(0, 1fr))",
//           },
//         }}
//       >
//         {products?.map((product, index) => (
//           <Box
//             key={product.product_id}
//             sx={{
//               animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
//             }}
//           >
//             <ProductItem
//               product={product}
//               detailsHref={paths.product.details(product.slug)}
//             />
//           </Box>
//         ))}
//       </Box>
//     </Stack>
//   );
// }
"use client";

import { paths } from "@/routes/paths";
import { ProductItem } from "../product/product-item";

// ----------------------------------------------------------------------
// Inline SVG — replaces <Iconify icon="solar:box-bold-duotone" />
// ----------------------------------------------------------------------

function BoxIcon({ size = 28, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path opacity={0.5} d="M2.268 7.442C2 7.96 2 8.605 2 9.896v6.458c0 1.925 0 2.888.586 3.537.105.116.22.222.344.316C3.704 20.72 4.648 20.9 6.536 21.26a52.52 52.52 0 0 0 5.159.706c.204.017.408.026.613.033H12V12l-9.732-4.558z" />
      <path d="M12 12v9.999c.205-.007.41-.016.614-.033a52.52 52.52 0 0 0 5.158-.706c1.888-.36 2.832-.54 3.606-1.053.124-.094.239-.2.344-.316C22.308 19.242 22 18.279 22 16.354V9.896c0-1.291 0-1.936-.268-2.454L12 12z" />
      <path fillRule="evenodd" d="M8.432 2.302a52.521 52.521 0 0 1 7.136 0c.286.02.57.045.853.074L8.278 6.14a5.187 5.187 0 0 1-.79.422L3.76 8.245a20.123 20.123 0 0 1-.612-.387l-.104-.073C2.388 7.386 2 7.033 2 6.612c0-.421.388-.774 1.044-1.173a14.72 14.72 0 0 1 1.24-.63C5.565 4.19 6.9 3.602 8.432 3.302z" clipRule="evenodd" />
    </svg>
  );
}

// ----------------------------------------------------------------------

export function HomeRecentlyAddedProducts({ products }) {
  if (!products?.length) return null;

  return (
    <section className="flex flex-col gap-8">

      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center  p-3 bg-cyan-100">
          <BoxIcon size={28} className="text-cyan-600" />
        </div>

        <div>
          <h2 className="text-[1.25rem] font-bold text-gray-900 md:text-[1.5rem]">
            Recently Added
          </h2>
          <p className="text-sm text-gray-500">
            Fresh new products just for you
          </p>
        </div>
      </div>

      {/* ── Product grid ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
        {products.map((product, index) => (
          <div
            key={product.product_id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
          >
            <ProductItem
              product={product}
              detailsHref={paths.product.details(product.slug)}
            />
          </div>
        ))}
      </div>

    </section>
  );
}