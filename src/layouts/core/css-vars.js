
/* =========================================================
   LAYOUT CSS VARIABLES (TAILWIND-FRIENDLY SYSTEM)
========================================================= */

const zIndex = {
  nav: 1201,
  header: 1101,
};

export function layoutSectionVars() {
  return {
    "--layout-nav-zIndex": zIndex.nav,
    "--layout-nav-mobile-width": "288px",
    "--layout-header-blur": "8px",
    "--layout-header-zIndex": zIndex.header,
    "--layout-header-mobile-height": "64px",
    "--layout-header-desktop-height": "72px",
    "--layout-nav-mobile-bottom-height": "64px",
  };
}