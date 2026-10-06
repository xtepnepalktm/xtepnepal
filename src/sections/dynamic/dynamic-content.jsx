
"use client";

import { m } from "framer-motion";
import { varFade } from "@/components/animate";
import { Markdown } from "@/components/markdown";

// ----------------------------------------------------------------------

export function DynamicContent({
  title,
  description,
  featuredImage,
  className = "",
  ...other
}) {
  return (
    <section className={`overflow-hidden ${className}`} {...other}>
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* IMAGE SECTION */}
          <div className="hidden md:flex justify-center">
            <m.div variants={varFade("inUp")}>
              <img
                src={featuredImage}
                alt={title}
                className="
                  w-full max-w-md aspect-square 
                  shadow-[ -40px_40px_80px_rgba(0,0,0,0.15) ]
                  dark:shadow-[ -40px_40px_80px_rgba(0,0,0,0.4) ]
                "
              />
            </m.div>
          </div>

          {/* TEXT SECTION */}
          <div className="text-center md:text-left">

            <m.h2
              variants={varFade("inRight")}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              {title}
            </m.h2>

            <m.div variants={varFade("inRight")}>
              <Markdown>{description}</Markdown>
            </m.div>

          </div>
        </div>
      </div>
    </section>
  );
}