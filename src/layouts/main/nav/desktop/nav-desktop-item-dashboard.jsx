
import { m } from "framer-motion";

import { RouterLink } from "@/routes/components";

import { varTap, varHover, transitionTap } from "@/components/animate";

// ----------------------------------------------------------------------

export function NavItemDashboard({ path, ...other }) {
  return (
    <RouterLink href={path}>
      {/*
        h-[360px]            → height: 360
        flex items-center justify-center → display flex + align/justify center
        rounded-[12px]       → borderRadius: 1.5 (1.5 * 8px = 12px)
        text-gray-400        → color: text.disabled
        bg-neutral-100       → bgcolor: background.neutral
        dark:bg-neutral-800
        px-6 lg:px-[80px]   → px: { md: 3→24px, lg: 10→80px }
        transition-colors duration-[150ms] → transitions.create("background-color", shortest+sharp)
        hover:bg-gray-500/[0.12] → &:hover bgcolor varAlpha(grey 500Channel, 0.12)
      */}
      <div
        className="
          flex h-[360px] cursor-pointer items-center justify-center
          rounded-[12px]
          bg-neutral-100 dark:bg-neutral-800
          px-6 lg:px-[80px]
          text-gray-400
          transition-colors duration-[150ms] ease-[cubic-bezier(0.4,0,0.6,1)]
          hover:bg-gray-500/[0.12]
        "
        {...other}
      >
        {/* w-[640px] object-cover aspect-[4/3] */}
        <m.img
          whileTap={varTap(0.98)}
          whileHover={varHover(1.02)}
          transition={transitionTap()}
          alt="Dashboard illustration"
          src="/assets/illustrations/illustration-dashboard.webp"
          className="w-[640px] object-cover aspect-[4/3]"
        />
      </div>
    </RouterLink>
  );
}