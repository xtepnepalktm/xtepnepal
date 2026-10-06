// "use client";

// import { useScrollOffsetTop } from "minimal-shared/hooks";
// import { mergeClasses } from "minimal-shared/utils";

// import { layoutClasses } from "./classes";

// // ----------------------------------------------------------------------

// export function HeaderSection({
//   sx,
//   slots,
//   slotProps,
//   className,
//   disableOffset,
//   disableElevation,
//   layoutQuery = "md",
//   ...other
// }) {
//   const { offsetTop: isOffset } = useScrollOffsetTop();

//   return (
//     <header
//       className={mergeClasses([
//         layoutClasses.header,
//         "sticky top-0 z-[var(--layout-header-zIndex)]",
//         "w-full bg-white text-[var(--color)] border-b border-gray-100",
//         className,
//       ])}
//       // Pseudo-element effects (bg blur + shadow) are handled below via
//       // sibling <span> elements since Tailwind can't do stateful ::before/::after
//       style={{ position: "sticky" }}
//       {...other}
//     >
//       {/* ::before — blurred background, fades in when offset */}
//       {!disableOffset && (
//         <span
//           aria-hidden="true"
//           className={[
//             "absolute inset-0 w-full h-full z-[-1]",
//             "transition-[opacity,visibility] duration-200 ease-in-out",
//             // backdrop blur + semi-transparent bg
//             "backdrop-blur-[6px] [-webkit-backdrop-filter:blur(6px)]",
//             "bg-[color-mix(in_srgb,var(--background-default)_80%,transparent)]",
//             isOffset ? "opacity-100 visible" : "opacity-0 invisible",
//           ].join(" ")}
//         />
//       )}

//       {/* ::after — oval drop shadow, fades in when offset */}
//       {!disableElevation && (
//         <span
//           aria-hidden="true"
//           className={[
//             "absolute bottom-0 left-0 right-0 mx-auto z-[-2]",
//             "h-6 rounded-[50%]",
//             "w-[calc(100%-48px)]",
//             "shadow-[var(--custom-shadows-z8,0_8px_16px_0_rgba(145,158,171,0.16))]",
//             "transition-[opacity,visibility] duration-200 ease-in-out",
//             isOffset ? "opacity-[0.48] visible" : "opacity-0 invisible",
//           ].join(" ")}
//         />
//       )}

//       {slots?.topArea}

//       {/* HeaderContainer */}
//       <div
//         className={[
//           "mx-auto w-full px-4 max-w-[var(--max-w-xl,1536px)]",
//           "flex items-center text-[var(--color)]",
//           // Mobile height
//           "h-[var(--layout-header-mobile-height)]",
//           // Desktop height at layoutQuery breakpoint (default md = 768px)
//           layoutQuery === "md"
//             ? "md:h-[var(--layout-header-desktop-height)]"
//             : layoutQuery === "lg"
//               ? "lg:h-[var(--layout-header-desktop-height)]"
//               : layoutQuery === "sm"
//                 ? "sm:h-[var(--layout-header-desktop-height)]"
//                 : "md:h-[var(--layout-header-desktop-height)]",
//         ].join(" ")}
//         {...slotProps?.container}
//       >
//         {slots?.leftArea}

//         {/* HeaderCenterArea */}
//         <div
//           className="flex flex-[1_1_auto] justify-center"
//           {...slotProps?.centerArea}
//         >
//           {slots?.centerArea}
//         </div>

//         {slots?.rightArea}
//       </div>

//       {/* Bottom area container */}
//       <div className="mx-auto w-full px-4 max-w-[var(--max-w-xl,1536px)]">
//         {slots?.bottomArea}
//       </div>
//     </header>
//   );
// }

"use client";

import { useScrollOffsetTop } from "minimal-shared/hooks";
import { mergeClasses } from "minimal-shared/utils";

import { layoutClasses } from "./classes";

// ── Design tokens ──
const WHITE = "#ffffff";
const BORDER = "#e8e8e8";

const MAX_WIDTH = "var(--max-w-xl, 1536px)";
const BREAKPOINTS = { sm: "640px", md: "768px", lg: "1024px" };

// ----------------------------------------------------------------------

export function HeaderSection({
  sx,
  slots,
  slotProps,
  className,
  disableOffset,
  disableElevation,
  layoutQuery = "md",
  ...other
}) {
  const { offsetTop: isOffset } = useScrollOffsetTop();
  const bp = BREAKPOINTS[layoutQuery] ?? BREAKPOINTS.md;

  return (
    <header
      className={mergeClasses([layoutClasses.header, className])}
      style={{
        position: "sticky",
        top: 0,
        zIndex: "var(--layout-header-zIndex)",
        width: "100%",
        backgroundColor: WHITE,
        // borderBottom: `1px solid ${BORDER}`,
      }}
      {...other}
    >
      <style>{`
        .header-inner-container {
          height: var(--layout-header-mobile-height);
        }
        @media (min-width: ${bp}) {
          .header-inner-container {
            height: var(--layout-header-desktop-height);
          }
        }
      `}</style>

      {/* Blurred bg on scroll */}
      {!disableOffset && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            zIndex: -1,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            backgroundColor: "color-mix(in srgb, var(--background-default) 80%, transparent)",
            opacity: isOffset ? 1 : 0,
            visibility: isOffset ? "visible" : "hidden",
            transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out",
          }}
        />
      )}

      {/* Oval shadow on scroll */}
      {!disableElevation && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            margin: "0 auto",
            zIndex: -2,
            height: 24,
            width: "calc(100% - 48px)",
            borderRadius: "50%",
            boxShadow: "var(--custom-shadows-z8, 0 8px 16px 0 rgba(145,158,171,0.16))",
            opacity: isOffset ? 0.48 : 0,
            visibility: isOffset ? "visible" : "hidden",
            transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out",
          }}
        />
      )}

      {slots?.topArea}

      {/* Main container */}
      <div
        className="header-inner-container"
        style={{
          margin: "0 auto",
          width: "100%",
          maxWidth: MAX_WIDTH,
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
        }}
        {...slotProps?.container}
      >
        {slots?.leftArea}

        {/* Center */}
        <div
          style={{ display: "flex", flex: "1 1 auto", justifyContent: "center" }}
          {...slotProps?.centerArea}
        >
          {slots?.centerArea}
        </div>

        {slots?.rightArea}
      </div>

      {/* Bottom area */}
      <div style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: MAX_WIDTH,
        padding: "0 1rem",
      }}>
        {slots?.bottomArea}
      </div>
    </header>
  );
}