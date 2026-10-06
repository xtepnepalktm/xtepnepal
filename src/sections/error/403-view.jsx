
"use client";

import { m } from "framer-motion";

import { RouterLink } from "@/routes/components";
import { ForbiddenIllustration } from "@/assets/illustrations";

import { varBounce, MotionContainer } from "@/components/animate";

export function View403() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="max-w-2xl w-full">
        <MotionContainer>
          {/* Title */}
          <m.div variants={varBounce("in")}>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              No permission
            </h3>
          </m.div>

          {/* Description */}
          <m.div variants={varBounce("in")}>
            <p className="text-gray-500 text-sm md:text-base mb-6">
              The page you’re trying to access has restricted access. Please
              refer to your system administrator.
            </p>
          </m.div>

          {/* Illustration */}
          <m.div variants={varBounce("in")}>
            <div className="my-10 md:my-16 flex justify-center">
              <ForbiddenIllustration />
            </div>
          </m.div>

          {/* Button */}
          <m.div variants={varBounce("in")}>
            <RouterLink href="/">
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