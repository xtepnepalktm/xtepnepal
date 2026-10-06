"use client";

import { useAppSelector } from "@/redux/hooks";

// ----------------------------------------------------------------------

export function HomeNewsletter() {
  const { vendor } = useAppSelector((state) => state.vendor);
  const primaryColor = vendor?.primary_color || "#111111"; // Fallback color

  return (
    <section
      className=" relative py-12 lg:py-20 overflow-hidden"
      style={{ backgroundColor: primaryColor }}
    >
      {/* --- Decorative Background Elements --- */}
      {/* Subtle dark gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10 pointer-events-none" />
      {/* Light glow at the top right */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      {/* Dark glow at the bottom left */}
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[30rem] h-[30rem] bg-black/20 rounded-full blur-[100px] pointer-events-none" />

      {/* --- Main Content --- */}
      <div className="relative container lg:px-5 px-2 mx-auto z-10 flex flex-col lg:flex-row justify-between items-center gap-12">

        {/* Text block */}
        <div className="w-full lg:w-1/2  text-center lg:text-left">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-4xl uppercase mb-6">
            Partner With
            <span className="relative inline-block mt-2 ml-3">
              {vendor?.vendor_name || "XTEP Nepal"}
              {/* Dynamic underline effect */}
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-white/30 rounded-full" />
            </span>
          </h2>

          <p className="text-white text-base sm:text-md lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Join the fastest-growing performance brand in South Asia. We are
            looking for franchise and wholesale partners across major cities in
            Nepal including <strong className="text-on-primary">Kathmandu, Pokhara, and Butwal</strong>.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 justify-center items-center">
          <div>

            <button
              className="group relative flex items-center justify-center gap-3 bg-white border border-white border-2 text-primary-container px-4 sm:px-6 py-4 font-bold text-sm sm:text-md tracking-widest  overflow-hidden transition-transform active:scale-95 shadow-xl hover:shadow-2xl"
            >
              {/* Button Hover Background Effect */}
              <span className="absolute inset-0 w-full h-full bg-inverse-surface opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              <span className="relative z-10">Franchise Inquiry</span>

              <svg
                className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
          <div>

            <button
              className="group flex items-center justify-center gap-3 border-2 border-white text-white bg-transparent text-on-primary px-4 sm:px-6 py-4 font-bold text-sm sm:text-md tracking-widest uppercase transition-all duration-300 hover:bg-on-primary hover:text-primary-container hover:border-on-primary active:scale-95 shadow-lg hover:shadow-xl"
            >
              <span>Wholesale Portal</span>

              <svg
                className="w-5 h-5 opacity-70 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}