// "use client";

// import { Box, Container, Typography, Stack, useTheme, Button } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { paths } from "@/routes/paths";
// import { RouterLink } from "@/routes/components";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// export function AboutCta() {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;
//   const secondaryColor = vendor?.secondary_color || theme.palette.secondary.main;

//   return (
//     <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
//       <Container maxWidth="md">
//         <Box
//           sx={{
//             p: { xs: 4, md: 6 },
//             borderRadius: 4,
//             textAlign: "center",
//             position: "relative",
//             overflow: "hidden",
//             background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
//             // Decorative elements
//             "&::before": {
//               content: '""',
//               position: "absolute",
//               top: "-50%",
//               right: "-20%",
//               width: "80%",
//               height: "200%",
//               background: `radial-gradient(circle, ${varAlpha(theme.vars.palette.common.whiteChannel, 0.1)} 0%, transparent 60%)`,
//               pointerEvents: "none",
//             },
//             "&::after": {
//               content: '""',
//               position: "absolute",
//               bottom: "-50%",
//               left: "-20%",
//               width: "60%",
//               height: "150%",
//               background: `radial-gradient(circle, ${varAlpha(theme.vars.palette.common.whiteChannel, 0.08)} 0%, transparent 50%)`,
//               pointerEvents: "none",
//             },
//           }}
//         >
//           {/* Floating Icons */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: "20%",
//               right: "10%",
//               opacity: 0.2,
//               animation: "float 5s ease-in-out infinite",
//               "@keyframes float": {
//                 "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
//                 "50%": { transform: "translateY(-15px) rotate(10deg)" },
//               },
//             }}
//           >
//             <Iconify icon="solar:bag-heart-bold-duotone" width={60} sx={{ color: "common.white" }} />
//           </Box>
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: "25%",
//               left: "8%",
//               opacity: 0.15,
//               animation: "float 6s ease-in-out infinite 0.5s",
//             }}
//           >
//             <Iconify icon="solar:gift-bold-duotone" width={50} sx={{ color: "common.white" }} />
//           </Box>

//           <Stack spacing={3} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 800,
//                 color: "common.white",
//                 textShadow: "0 4px 20px rgba(0,0,0,0.2)",
//                 fontSize: { xs: "1.75rem", md: "2.5rem" },
//               }}
//             >
//               Ready to Start Shopping?
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{
//                 maxWidth: 450,
//                 color: varAlpha(theme.vars.palette.common.whiteChannel, 0.9),
//                 lineHeight: 1.7,
//               }}
//             >
//               Join thousands of happy customers and discover amazing products 
//               at unbeatable prices. Your perfect shopping experience awaits!
//             </Typography>

//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 2 }}>
//               <Button
//                 component={RouterLink}
//                 href={paths.category}
//                 variant="contained"
//                 size="large"
//                 sx={{
//                   px: 4,
//                   py: 1.5,
//                   borderRadius: 2,
//                   fontWeight: 700,
//                   bgcolor: "common.white",
//                   color: primaryColor,
//                   boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
//                   "&:hover": {
//                     bgcolor: "common.white",
//                     transform: "translateY(-2px)",
//                     boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
//                   },
//                 }}
//                 endIcon={<Iconify icon="solar:arrow-right-bold" />}
//               >
//                 Browse Products
//               </Button>

//               <Button
//                 component={RouterLink}
//                 href={paths.auth.signUp}
//                 variant="outlined"
//                 size="large"
//                 sx={{
//                   px: 4,
//                   py: 1.5,
//                   borderRadius: 2,
//                   fontWeight: 700,
//                   borderColor: "common.white",
//                   color: "common.white",
//                   borderWidth: 2,
//                   "&:hover": {
//                     borderWidth: 2,
//                     borderColor: "common.white",
//                     bgcolor: varAlpha(theme.vars.palette.common.whiteChannel, 0.1),
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//               >
//                 Create Account
//               </Button>
//             </Stack>
//           </Stack>
//         </Box>
//       </Container>
//     </Box>
//   );
// }
"use client";

import Link from "next/link";

import { useAppSelector } from "@/redux/hooks";

import { paths } from "@/routes/paths";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function AboutCta() {
  const { vendor } = useAppSelector(
    (state) => state.vendor
  );

  const primaryColor =
    vendor?.primary_color || "#2563eb";

  const secondaryColor =
    vendor?.secondary_color || "#7c3aed";

  return (
    <section className="pt-4 py-6 md:py-10">
      <div className="mx-auto max-w-4xl px-4">
        <div
          className="relative overflow-hidden  p-3 text-center md:px-5 md:py-6"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          }}
        >
          {/* Decorative Glow Top */}
          <div
            className="pointer-events-none absolute -right-[20%] -top-[50%] h-[200%] w-[80%]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)",
            }}
          />

          {/* Decorative Glow Bottom */}
          <div
            className="pointer-events-none absolute -bottom-[50%] -left-[20%] h-[150%] w-[60%]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 50%)",
            }}
          />

          {/* Floating Icons */}
          <div className="animate-float absolute right-[10%] top-[20%] opacity-20">
            <Iconify
              icon="solar:bag-heart-bold-duotone"
              width={60}
              className="text-white"
            />
          </div>

          <div className="animate-float-delay absolute bottom-[25%] left-[8%] opacity-15">
            <Iconify
              icon="solar:gift-bold-duotone"
              width={50}
              className="text-white"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <h2 className="text-[1.75rem] font-extrabold leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)] md:text-[2.4rem]">
              Ready to Start Shopping?
            </h2>

            <p
              className="max-w-[500px] text-base leading-7 text-white/90"
              style={{ lineHeight: 2 }}
            >
              Join thousands of happy customers and
              discover amazing products at unbeatable
              prices. Your perfect shopping experience
              awaits!
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              {/* Primary Button */}
              <Link
                href={paths.category}
                className="group flex items-center gap-2 px-3 py-2 text-sm font-bold transition-all duration-300"
                style={{
                  backgroundColor: "#ffffff",
                  color: primaryColor,
                  boxShadow:
                    "0 8px 24px rgba(0,0,0,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.15)";
                }}
              >
                Browse Products

                <Iconify
                  icon="solar:arrow-right-bold"
                  width={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary Button */}
              <Link
                href={paths.auth.signUp}
                className="border-2 border-white px-3 py-2 text-sm font-bold text-white transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                  e.currentTarget.style.backgroundColor =
                    "transparent";
                }}
              >
                Create Account
              </Link>
            </div>
          </div>

          <style jsx>{`
            .animate-float {
              animation: float 5s ease-in-out infinite;
            }

            .animate-float-delay {
              animation: float 6s ease-in-out infinite
                0.5s;
            }

            @keyframes float {
              0%,
              100% {
                transform: translateY(0px)
                  rotate(0deg);
              }

              50% {
                transform: translateY(-15px)
                  rotate(10deg);
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}