"use client";

import { m } from "framer-motion";

import {
  varFade,
  AnimateText,
  MotionContainer,
  animateTextClasses,
} from "@/components/animate";

import { useAppSelector } from "@/redux/hooks";

// ----------------------------------------------------------------------

export function ContactHero({ className = "", ...other }) {
  const vendor = useAppSelector((state) => state.vendor.vendor);

  return (
    <section
      className={[
        "relative overflow-hidden",
        "py-10 md:py-0 md:h-[560px]",
        "[background-image:linear-gradient(to_right,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.45)_20%,rgba(255,255,255,0)_70%),url(/assets/background/banner-home.webp)]",
        // "[background-image:linear-gradient(0deg,rgba(255,255,255,0.35),rgba(255,255,255,0.35)),url(assets/images/contact/hero.webp)]",
        "bg-cover bg-center bg-no-repeat",
        className,
      ].join(" ")}
      {...other}
    >
      <div className="mx-auto h-full max-w-7xl px-4">
        <MotionContainer className="h-full">
          <div
            className={[
              "text-start md:text-left",
              "md:absolute md:bottom-20",
            ].join(" ")}
          >
            {/* Animated Heading */}
            <AnimateText
              component="h1"
              variant="h1"
              textContent={["Where", "to find us?"]}
              variants={varFade("inUp", {
                distance: 24,
              })}
              className="text-red"
            />

            {/* Contact Info Grid */}
            <ul
              className={[
                "mt-5 grid text-red",
                "grid-cols-2 gap-x-2 gap-y-5 md:grid-cols-4 md:gap-x-10 md:gap-y-0",
              ].join(" ")}
            >
              <li>
                {/* Vendor Name */}
                <m.div variants={varFade("inUp", { distance: 24 })}>
                  <p className="mb-1 text-base font-semibold leading-snug">
                    {vendor?.vendor_name}
                  </p>
                </m.div>

                {/* Address */}
                <m.div variants={varFade("inUp", { distance: 24 })}>
                  <p className="text-sm leading-relaxed opacity-80">
                    {vendor?.address}
                  </p>
                </m.div>

                {/* Contact Info */}
                <m.div variants={varFade("inUp", { distance: 24 })}>
                  <p className="text-sm leading-relaxed opacity-80">
                    {vendor?.contact_info}
                  </p>
                </m.div>
              </li>
            </ul>
          </div>
        </MotionContainer>
      </div>
    </section>
  );
}
