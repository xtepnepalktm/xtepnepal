// "use client";

// import { Box, Container, Typography, Stack, useTheme } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// export function ServiceHero() {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;
//   const secondaryColor = vendor?.secondary_color || theme.palette.secondary.main;

//   return (
//     <Box
//       component="section"
//       sx={{
//         position: "relative",
//         minHeight: { xs: 350, md: 450 },
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 4,
//         overflow: "hidden",
//         background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
//         // Grid pattern
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundImage: `
//             linear-gradient(${varAlpha(theme.vars.palette.common.whiteChannel, 0.03)} 1px, transparent 1px),
//             linear-gradient(90deg, ${varAlpha(theme.vars.palette.common.whiteChannel, 0.03)} 1px, transparent 1px)
//           `,
//           backgroundSize: "40px 40px",
//           pointerEvents: "none",
//         },
//         // Glow effect
//         "&::after": {
//           content: '""',
//           position: "absolute",
//           top: "-50%",
//           left: "-50%",
//           width: "200%",
//           height: "200%",
//           background: `radial-gradient(circle at 30% 30%, ${varAlpha(theme.vars.palette.common.whiteChannel, 0.15)} 0%, transparent 50%)`,
//           pointerEvents: "none",
//         },
//       }}
//     >
//       {/* Floating Icons */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: "15%",
//           right: "10%",
//           opacity: 0.15,
//           animation: "float 6s ease-in-out infinite",
//           "@keyframes float": {
//             "0%, 100%": { transform: "translateY(0px)" },
//             "50%": { transform: "translateY(-20px)" },
//           },
//         }}
//       >
//         <Iconify icon="solar:settings-bold-duotone" width={100} sx={{ color: "common.white" }} />
//       </Box>
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: "20%",
//           left: "8%",
//           opacity: 0.12,
//           animation: "float 5s ease-in-out infinite 0.5s",
//         }}
//       >
//         <Iconify icon="solar:wrench-bold-duotone" width={80} sx={{ color: "common.white" }} />
//       </Box>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "40%",
//           left: "15%",
//           opacity: 0.08,
//           animation: "float 7s ease-in-out infinite 1s",
//         }}
//       >
//         <Iconify icon="solar:widget-5-bold-duotone" width={50} sx={{ color: "common.white" }} />
//       </Box>

//       <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
//         <Stack
//           spacing={3}
//           alignItems="center"
//           textAlign="center"
//           sx={{ color: "common.white" }}
//         >
//           <Typography
//             variant="overline"
//             sx={{
//               fontSize: { xs: "0.75rem", md: "0.875rem" },
//               letterSpacing: 3,
//               opacity: 0.9,
//               fontWeight: 600,
//             }}
//           >
//             What We Offer
//           </Typography>

//           <Typography
//             variant="h1"
//             sx={{
//               fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
//               fontWeight: 800,
//               lineHeight: 1.2,
//               textShadow: "0 4px 30px rgba(0,0,0,0.2)",
//             }}
//           >
//             Our Services
//           </Typography>

//           <Typography
//             variant="h2"
//             sx={{
//               maxWidth: 600,
//               fontWeight: 400,
//               opacity: 0.9,
//               lineHeight: 1.7,
//               fontSize: { xs: "1rem", md: "1.125rem" },
//             }}
//           >
//             Comprehensive ecommerce solutions designed to enhance your shopping 
//             experience with innovation, reliability, and excellence.
//           </Typography>
//         </Stack>
//       </Container>
//     </Box>
//   );
// }
"use client";

import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";

export function ServiceHero() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#2563eb";
  const secondaryColor = vendor?.secondary_color || "#7c3aed";

  return (
    <section
      className="relative flex min-h-[350px] md:min-h-[450px] items-center justify-center overflow-hidden rounded-[32px]"
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      }}
    >
      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow Effect */}
      <div
        className="pointer-events-none absolute -left-1/2 -top-1/2 h-[200%] w-[200%]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)",
        }}
      />

      {/* Floating Icon 1 */}
      <div
        className="absolute right-[10%] top-[15%] opacity-15"
        style={{
          animation: "float 6s ease-in-out infinite",
        }}
      >
        <Iconify
          icon="solar:settings-bold-duotone"
          width={100}
          className="text-white"
        />
      </div>

      {/* Floating Icon 2 */}
      <div
        className="absolute bottom-[20%] left-[8%] opacity-10"
        style={{
          animation: "float 5s ease-in-out infinite 0.5s",
        }}
      >
        <Iconify
          icon="solar:wrench-bold-duotone"
          width={80}
          className="text-white"
        />
      </div>

      {/* Floating Icon 3 */}
      <div
        className="absolute left-[15%] top-[40%] opacity-10"
        style={{
          animation: "float 7s ease-in-out infinite 1s",
        }}
      >
        <Iconify
          icon="solar:widget-5-bold-duotone"
          width={50}
          className="text-white"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
        <div className="flex flex-col items-center gap-6">
          <span className="text-xs font-semibold uppercase tracking-[3px] opacity-90 md:text-sm">
            What We Offer
          </span>

          <h1
            className="text-[2.5rem] font-extrabold leading-tight sm:text-[3rem] md:text-[4rem]"
            style={{
              textShadow: "0 4px 30px rgba(0,0,0,0.2)",
            }}
          >
            Our Services
          </h1>

          <p
            className="max-w-[600px] text-base leading-7 opacity-90 md:text-lg"
          >
            Comprehensive ecommerce solutions designed to enhance your
            shopping experience with innovation, reliability, and excellence.
          </p>
        </div>
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}