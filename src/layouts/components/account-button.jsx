
import { useState, useEffect, useRef } from "react";
import { m } from "framer-motion";

// ----------------------------------------------------------------------
// Framer Motion variants (replaces varTap, varHover, transitionTap)

const varTap = (scale = 0.96) => ({ scale });
const varHover = (scale = 1.04) => ({ scale });
const transitionTap = () => ({ duration: 0.12, ease: "easeInOut" });

// ----------------------------------------------------------------------
// AnimateBorder — pure Tailwind + CSS custom props replacement

function AnimateBorder({ children, className = "", slotProps = {} }) {
  const { primaryBorder = {}, secondaryBorder = {} } = slotProps;

  // Extract colors from slotProps (kept as inline CSS vars for theming)
  const primaryColor =
    primaryBorder.sx?.color === "primary.main" ? "#3b82f6" : "#3b82f6";
  const secondaryColor =
    secondaryBorder.sx?.color === "warning.main" ? "#f59e0b" : "#f59e0b";

  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full p-[3px] w-10 h-10 ${className}`}
      style={{
        "--primary-color": primaryColor,
        "--secondary-color": secondaryColor,
      }}
    >
      {/* Rotating conic-gradient border */}
      <span
        className="absolute inset-0 rounded-full animate-spin-slow"
        style={{
          background: `conic-gradient(
            var(--primary-color) 0deg,
            transparent 60deg,
            var(--secondary-color) 180deg,
            transparent 240deg,
            var(--primary-color) 360deg
          )`,
          animationDuration: "4s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        aria-hidden="true"
      />
      {/* Inner content */}
      <span className="relative flex items-center justify-center w-full h-full rounded-full overflow-hidden">
        {children}
      </span>
    </span>
  );
}

// ----------------------------------------------------------------------
// NoSsr — renders fallback on server, children on client

function NoSsr({ children, fallback }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : fallback;
}

// ----------------------------------------------------------------------
// Avatar fallback icon

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="6" r="4" fill="currentColor" />
      <path
        fill="currentColor"
        d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
        opacity="0.5"
      />
    </svg>
  );
}

// ----------------------------------------------------------------------
// Avatar

function Avatar({ src, alt, children, className = "", fallbackClassName = "" }) {
  const [imgError, setImgError] = useState(false);

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover rounded-full ${className}`}
      />
    );
  }

  // Show initials or icon fallback
  return (
    <span
      className={`flex items-center justify-center w-full h-full rounded-full bg-gray-200 text-gray-600 text-sm font-medium select-none ${fallbackClassName}`}
    >
      {children || <UserIcon />}
    </span>
  );
}

// ----------------------------------------------------------------------
// FallbackAvatar (NoSsr server-side placeholder)

function FallbackAvatar() {
  return (
    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600 border-2 border-white">
      <UserIcon />
    </span>
  );
}

// ----------------------------------------------------------------------
// AccountButton

export function AccountButton({ photoURL, displayName, className = "", ...other }) {
  return (
    <>
      {/* Inject keyframes for spinning border */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>

      <m.button
        whileTap={varTap(0.96)}
        whileHover={varHover(1.04)}
        transition={transitionTap()}
        aria-label="Account button"
        className={`p-0 bg-transparent border-none cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`}
        {...other}
      >
        <NoSsr fallback={<FallbackAvatar />}>
          <AnimateBorder
            slotProps={{
              primaryBorder: {
                size: 60,
                width: "1px",
                sx: { color: "primary.main" },
              },
              secondaryBorder: { sx: { color: "warning.main" } },
            }}
          >
            <Avatar src={photoURL} alt={displayName}>
              {displayName?.charAt(0).toUpperCase()}
            </Avatar>
          </AnimateBorder>
        </NoSsr>
      </m.button>
    </>
  );
}

// ----------------------------------------------------------------------
// Demo

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center gap-8">
      {/* With photo */}
      <AccountButton
        photoURL="https://i.pravatar.cc/150?img=47"
        displayName="Jane Doe"
      />

      {/* With initials fallback */}
      <AccountButton displayName="Alex Smith" />

      {/* No info — icon fallback */}
      <AccountButton />
    </div>
  );
}