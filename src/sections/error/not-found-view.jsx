
"use client";

import { m } from "framer-motion";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

import { PageNotFoundIllustration } from "@/assets/illustrations";

import { varBounce, MotionContainer } from "@/components/animate";

export function NotFoundView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="max-w-2xl w-full">
        <MotionContainer>
          {/* Title */}
          <m.div variants={varBounce("in")}>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              Sorry, page not found!
            </h3>
          </m.div>

          {/* Description */}
          <m.div variants={varBounce("in")}>
            <p className="text-gray-500 text-sm md:text-base mb-6">
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </p>
          </m.div>

          {/* Illustration */}
          <m.div variants={varBounce("in")}>
            <div className="my-10 md:my-16 flex justify-center">
              <PageNotFoundIllustration />
            </div>
          </m.div>

          {/* Button */}
          <m.div variants={varBounce("in")}>
            <RouterLink href={paths.home}>
              <button className="px-6 py-3  bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                Go to home
              </button>
            </RouterLink>
          </m.div>
        </MotionContainer>
      </div>
    </div>
  );
}