
"use client";

import { m } from "framer-motion";

export function DynamicHero({ bannerImage, title, className = "", ...props }) {
  return (
    <section
      className={`relative overflow-hidden h-[350px] md:h-[350px] py-10 md:py-0 bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `
          url('/assets/background/overlay.svg'),
          url(${bannerImage})
        `,
      }}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="w-full md:absolute md:bottom-[150px] text-center md:text-left">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white text-4xl md:text-5xl font-bold mt-3">
              {title}
            </h1>
          </m.div>
        </div>
      </div>
    </section>
  );
}