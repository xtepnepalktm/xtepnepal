"use client";

import { Iconify } from "@/components/iconify";

export function CartSteps({ steps = [], activeStep = 0, className = "" }) {
  return (
    <div className={`w-full mb-6 md:mb-10 ${className}`}>
      {/* STEP WRAPPER */}
      <div className="flex items-center justify-between relative">

        {/* CONNECTOR LINE */}
        <div className="absolute top-3 left-0 right-0 h-[2px] bg-gray-200 z-0" />

        {steps.map((label, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <div
              key={label}
              className="relative z-10 flex flex-col items-center flex-1"
            >
              {/* ICON */}
              <div
                className={`
                  w-6 h-6 flex items-center justify-center rounded-full
                  transition-colors
                  ${isActive
                    ? "text-blue-600"
                    : isCompleted
                      ? "text-blue-600"
                      : "text-gray-400"
                  }
                `}
              >
                {isCompleted ? (
                  <Iconify icon="eva:checkmark-fill" className="text-blue-600" />
                ) : (
                  <span
                    className={`
                      w-2 h-2 rounded-full
                      ${isActive ? "bg-blue-600" : "bg-gray-400"}
                    `}
                  />
                )}
              </div>

              {/* LABEL */}
              <span
                className={`
                  mt-2 text-sm font-semibold
                  ${isActive || isCompleted
                    ? "text-gray-900"
                    : "text-gray-400"
                  }
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}