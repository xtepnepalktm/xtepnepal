// import { tabClasses } from '@mui/material/Tab';

// // ----------------------------------------------------------------------

// const MuiTabs = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: { textColor: 'inherit', variant: 'scrollable', allowScrollButtonsMobile: true },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     flexContainer: ({ ownerState, theme }) => ({
//       ...(ownerState.variant !== 'fullWidth' && {
//         gap: '24px',
//         [theme.breakpoints.up('sm')]: { gap: '40px' },
//       }),
//     }),
//     indicator: { backgroundColor: 'currentColor' },
//   },
// };

// // ----------------------------------------------------------------------

// const MuiTab = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: { disableRipple: true, iconPosition: 'start' },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ theme }) => ({
//       opacity: 1,
//       minWidth: 48,
//       minHeight: 48,
//       padding: theme.spacing(1, 0),
//       color: theme.vars.palette.text.secondary,
//       fontWeight: theme.typography.fontWeightMedium,
//       lineHeight: theme.typography.body2.lineHeight,
//       [`&.${tabClasses.selected}`]: {
//         color: theme.vars.palette.text.primary,
//         fontWeight: theme.typography.fontWeightSemiBold,
//       },
//     }),
//   },
// };

// // ----------------------------------------------------------------------

// export const tabs = { MuiTabs, MuiTab };
'use client'
import { useState, useRef, useEffect } from "react";

// ─── Tab ──────────────────────────────────────────────────────────────────────
// MUI defaultProps: disableRipple, iconPosition="start"
// MUI styleOverrides:
//   opacity: 1, minWidth/minHeight: 48px, padding: theme.spacing(1, 0)
//   color: text.secondary, fontWeight: medium, lineHeight: body2
//   &.selected → color: text.primary, fontWeight: semibold
export function Tab({ label, icon, value, activeValue, onClick }) {
  const isSelected = value === activeValue;

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      onClick={() => onClick?.(value)}
      className={[
        // layout — iconPosition="start" → row, icon before label
        "relative inline-flex flex-row items-center gap-1.5 shrink-0",
        // sizing: minWidth/minHeight 48px, padding: 8px 0
        "min-w-[48px] min-h-[48px] px-0 py-2",
        // typography: medium weight, body2 line-height (~1.43)
        "text-sm font-medium leading-[1.43] whitespace-nowrap",
        // opacity: 1 always (overrides MUI's default faded unselected)
        "opacity-100",
        // no ripple → no focus ring flash; keep accessible outline
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 rounded-sm",
        "transition-colors duration-150 cursor-pointer bg-transparent border-none",
        // color: selected = text.primary, unselected = text.secondary
        isSelected
          ? "text-gray-900 dark:text-gray-100 font-semibold"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
      ].join(" ")}
    >
      {icon && <span className="w-[18px] h-[18px] flex items-center">{icon}</span>}
      {label}
    </button>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
// MUI defaultProps: textColor="inherit", variant="scrollable", allowScrollButtonsMobile
// MUI styleOverrides:
//   flexContainer (non-fullWidth): gap 24px, sm: gap 40px
//   indicator: backgroundColor: currentColor
export function Tabs({
  value,
  onChange,
  children,
  fullWidth = false,
  className = "",
}) {
  const scrollRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Update indicator position to sit under the active tab
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const active = container.querySelector('[aria-selected="true"]');
    if (!active) return;
    const containerRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    setIndicatorStyle({
      left: activeRect.left - containerRect.left + container.scrollLeft,
      width: activeRect.width,
    });
  }, [value]);

  // Scroll buttons visibility
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el?.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 120, behavior: "smooth" });
  };

  const ScrollBtn = ({ dir }) => (
    <button
      onClick={() => scroll(dir)}
      aria-hidden="true"
      className={[
        "flex items-center justify-center px-1 shrink-0 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors",
        dir === -1
          ? canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          : canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        {dir === -1
          ? <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          : <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        }
      </svg>
    </button>
  );

  return (
    <div
      role="tablist"
      className={["relative flex items-center border-b border-gray-200 dark:border-gray-700", className].join(" ")}
    >
      {/* allowScrollButtonsMobile: show on all breakpoints */}
      <ScrollBtn dir={-1} />

      {/* scrollable container */}
      <div
        ref={scrollRef}
        className="relative flex-1 overflow-x-auto overflow-y-hidden scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {/* flexContainer:
              fullWidth → no gap, each tab stretches
              default  → gap-6 (24px), sm:gap-10 (40px) */}
        <div
          className={[
            "flex",
            fullWidth
              ? "[&>*]:flex-1 [&>*]:justify-center"
              : "gap-6 sm:gap-10",
          ].join(" ")}
        >
          {/* Inject activeValue + onClick into Tab children */}
          {Array.isArray(children)
            ? children.map((child) =>
              child
                ? { ...child, props: { ...child.props, activeValue: value, onClick: onChange } }
                : child
            )
            : children
              ? { ...children, props: { ...children.props, activeValue: value, onClick: onChange } }
              : null}
        </div>

        {/* indicator: backgroundColor = currentColor (inherits text color) */}
        <span
          className="absolute bottom-0 h-0.5 bg-current transition-all duration-200 ease-in-out rounded-t-sm"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
      </div>

      <ScrollBtn dir={1} />
    </div>
  );
}

// ─── Demo ─────────────────────────────────────────────────────────────────────
const DashIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
    <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-3a1 1 0 100 2 1 1 0 000-2zm-1 4a1 1 0 012 0v3a1 1 0 11-2 0v-3z" />
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
  </svg>
);
const SettingsIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>
);

const PANEL_CONTENT = {
  overview: "Overview panel — summary cards and KPIs would go here.",
  users: "Users panel — user list, search, and management tools.",
  notifications: "Notifications panel — alerts, digests, and preferences.",
  settings: "Settings panel — account, appearance, and integrations.",
  reports: "Reports panel — charts, exports, and scheduled jobs.",
  billing: "Billing panel — invoices, plans, and payment methods.",
};

export default function App() {
  const [tab, setTab] = useState("overview");
  const [fullWidth, setFullWidth] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Tabs Component
      </h2>

      {/* Toggle to demo fullWidth variant */}
      <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={fullWidth}
          onChange={(e) => setFullWidth(e.target.checked)}
          className="rounded border-gray-300"
        />
        Full-width variant
      </label>

      {/* Scrollable (default) */}
      <Tabs value={tab} onChange={setTab} fullWidth={fullWidth} className="mb-6">
        <Tab value="overview" label="Overview" icon={<DashIcon />} />
        <Tab value="users" label="Users" icon={<UserIcon />} />
        <Tab value="notifications" label="Notifications" icon={<BellIcon />} />
        <Tab value="settings" label="Settings" icon={<SettingsIcon />} />
        <Tab value="reports" label="Reports" />
        <Tab value="billing" label="Billing" />
      </Tabs>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        {PANEL_CONTENT[tab]}
      </p>
    </div>
  );
}