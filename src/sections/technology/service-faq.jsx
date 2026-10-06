// "use client";

// import { Box, Container, Typography, Stack, useTheme, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { varAlpha } from "minimal-shared/utils";
// import { useState } from "react";

// import { useAppSelector } from "@/redux/hooks";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// const FAQ_ITEMS = [
//   {
//     question: "How do I place an order?",
//     answer: "Simply browse our products, add items to your cart, and proceed to checkout. You can pay using various methods including credit cards, debit cards, and digital wallets.",
//   },
//   {
//     question: "What are the delivery options?",
//     answer: "We offer standard delivery (3-5 business days), express delivery (1-2 business days), and same-day delivery in select areas. Shipping costs vary based on your location and chosen method.",
//   },
//   {
//     question: "How can I track my order?",
//     answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this number to track your package in real-time through our website or carrier's website.",
//   },
//   {
//     question: "What is your return policy?",
//     answer: "We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
//   },
//   {
//     question: "Is my payment information secure?",
//     answer: "Absolutely! We use industry-standard SSL encryption and comply with PCI DSS requirements. Your payment information is never stored on our servers.",
//   },
//   {
//     question: "How can I contact customer support?",
//     answer: "Our support team is available 24/7. You can reach us via live chat on our website, email at support@premierhealth.com, or call our toll-free number.",
//   },
// ];

// export function ServiceFaq() {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);
//   const [expanded, setExpanded] = useState(0);

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;
//   const secondaryColor = vendor?.secondary_color || theme.palette.secondary.main;

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <Box
//       component="section"
//       sx={{
//         py: { xs: 6, md: 10 },
//         bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.04),
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
//           {/* Left Side - Header */}
//           <Grid size={{ xs: 12, md: 5 }}>
//             <Stack spacing={3} sx={{ position: { md: "sticky" }, top: 100 }}>
//               <Typography
//                 variant="overline"
//                 sx={{
//                   color: "primary.main",
//                   fontWeight: 700,
//                   letterSpacing: 2,
//                 }}
//               >
//                 FAQ
//               </Typography>

//               <Typography
//                 variant="h3"
//                 sx={{
//                   fontWeight: 800,
//                   lineHeight: 1.3,
//                 }}
//               >
//                 Frequently Asked
//                 <Box
//                   component="span"
//                   sx={{
//                     display: "block",
//                     color: "primary.main",
//                   }}
//                 >
//                   Questions
//                 </Box>
//               </Typography>

//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: "text.secondary",
//                   lineHeight: 1.8,
//                 }}
//               >
//                 Find answers to common questions about our services, policies, and more.
//               </Typography>

//               {/* Contact Card */}
//               <Box
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
//                   color: "common.white",
//                 }}
//               >
//                 <Stack spacing={2}>
//                   <Iconify icon="solar:chat-round-call-bold-duotone" width={40} />
//                   <Typography variant="body1" sx={{ fontWeight: 700 }}>
//                     Still have questions?
//                   </Typography>
//                   <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                     Can't find the answer you're looking for? Our support team is here to help.
//                   </Typography>
//                 </Stack>
//               </Box>
//             </Stack>
//           </Grid>

//           {/* Right Side - FAQ Accordion */}
//           <Grid size={{ xs: 12, md: 7 }}>
//             <Stack spacing={2}>
//               {FAQ_ITEMS.map((item, index) => (
//                 <Accordion
//                   key={index}
//                   expanded={expanded === index}
//                   onChange={handleChange(index)}
//                   sx={{
//                     borderRadius: "16px !important",
//                     bgcolor: "background.paper",
//                     border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.12)}`,
//                     boxShadow: "none",
//                     overflow: "hidden",
//                     "&::before": { display: "none" },
//                     transition: "all 0.3s ease",
//                     "&.Mui-expanded": {
//                       borderColor: "primary.main",
//                       boxShadow: `0 8px 24px ${varAlpha(theme.vars.palette.primary.mainChannel, 0.12)}`,
//                     },
//                   }}
//                 >
//                   <AccordionSummary
//                     expandIcon={
//                       <Box
//                         sx={{
//                           width: 32,
//                           height: 32,
//                           borderRadius: 1,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           bgcolor: expanded === index
//                             ? "primary.main"
//                             : varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
//                           color: expanded === index ? "common.white" : "text.primary",
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         <Iconify
//                           icon={expanded === index ? "solar:minus-outline" : "solar:add-outline"}
//                           width={18}
//                         />
//                       </Box>
//                     }
//                     sx={{
//                       px: 3,
//                       py: 1,
//                       "& .MuiAccordionSummary-content": {
//                         my: 2,
//                       },
//                     }}
//                   >
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         fontWeight: 600,
//                         color: expanded === index ? "primary.main" : "text.primary",
//                         fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
//                         transition: "color 0.3s ease",
//                       }}
//                     >
//                       {item.question}
//                     </Typography>
//                   </AccordionSummary>
//                   <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: "text.secondary",
//                         lineHeight: 1.8,
//                       }}
//                     >
//                       {item.answer}
//                     </Typography>
//                   </AccordionDetails>
//                 </Accordion>
//               ))}
//             </Stack>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
"use client";

import { useState } from "react";

import { useAppSelector } from "@/redux/hooks";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

const FAQ_ITEMS = [
  {
    question: "How do I place an order?",
    answer:
      "Simply browse our products, add items to your cart, and proceed to checkout. You can pay using various methods including credit cards, debit cards, and digital wallets.",
  },
  {
    question: "What are the delivery options?",
    answer:
      "We offer standard delivery (3-5 business days), express delivery (1-2 business days), and same-day delivery in select areas. Shipping costs vary based on your location and chosen method.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this number to track your package in real-time through our website or carrier's website.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely! We use industry-standard SSL encryption and comply with PCI DSS requirements. Your payment information is never stored on our servers.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Our support team is available 24/7. You can reach us via live chat on our website, email at support@premierhealth.com, or call our toll-free number.",
  },
];

// ----------------------------------------------------------------------

export function ServiceFaq() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const [expanded, setExpanded] = useState(0);

  const primaryColor = vendor?.primary_color || "#7C3AED";
  const secondaryColor = vendor?.secondary_color || "#5B21B6";

  const toggleAccordion = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          {/* LEFT SIDE */}
          <div className="md:col-span-5">
            <div className="space-y-6 md:sticky md:top-24">
              <p
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: primaryColor }}
              >
                FAQ
              </p>

              <div>
                <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
                  Frequently Asked
                </h2>

                <span
                  className="mt-2 block text-3xl font-extrabold md:text-5xl"
                  style={{ color: primaryColor }}
                >
                  Questions
                </span>
              </div>

              <p className="leading-8 text-gray-600">
                Find answers to common questions about our services,
                policies, and more.
              </p>

              {/* Contact Card */}
              <div
                className=" p-6 text-white"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                }}
              >
                <div className="space-y-3">
                  <Iconify
                    icon="solar:chat-round-call-bold-duotone"
                    width={40}
                  />

                  <h3 className="text-lg font-bold">
                    Still have questions?
                  </h3>

                  <p className="text-sm leading-6 text-white/90">
                    Can't find the answer you're looking for?
                    Our support team is here to help.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-7">
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = expanded === index;

                return (
                  <div
                    key={index}
                    className={`overflow-hidden  border bg-white transition-all duration-300 ${isOpen
                      ? "shadow-lg"
                      : "hover:border-gray-300"
                      }`}
                    style={{
                      borderColor: isOpen
                        ? primaryColor
                        : "rgba(0,0,0,0.08)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                    >
                      <h3
                        className={`font-semibold transition-colors ${isOpen
                          ? ""
                          : "text-gray-900"
                          }`}
                        style={{
                          color: isOpen
                            ? primaryColor
                            : undefined,
                        }}
                      >
                        {item.question}
                      </h3>

                      <div
                        className="flex h-8 w-8 items-center justify-center  transition-all"
                        style={{
                          backgroundColor: isOpen
                            ? primaryColor
                            : "#F3F4F6",
                          color: isOpen
                            ? "#fff"
                            : "#111827",
                        }}
                      >
                        <Iconify
                          icon={
                            isOpen
                              ? "solar:minus-outline"
                              : "solar:add-outline"
                          }
                          width={18}
                        />
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-6">
                          <p className="leading-8 text-gray-600">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}