"use client";

import { useEffect } from "react";
import { mergeClasses } from "minimal-shared/utils";
import { layoutSectionVars } from "./css-vars";
import { layoutClasses } from "./classes";

export function LayoutSection({
  sx,
  cssVars,
  children,
  footerSection,
  headerSection,
  navMobileSection,
  chatSection,
  className,
  ...other
}) {
  // Inject global CSS variables into body (replaces MUI GlobalStyles)
  useEffect(() => {
    const themeVars = layoutSectionVars?.() || {};

    Object.entries({ ...themeVars, ...cssVars }).forEach(([key, value]) => {
      if (value != null) {
        document.body.style.setProperty(key, value);
      }
    });
  }, [cssVars]);

  return (
    <div
      id="root__layout"
      className={mergeClasses([
        layoutClasses.root,
        "min-h-screen flex flex-col",
        className,
      ])}
      {...other}
    >
      {/* Header */}
      {headerSection}

      {/* Main Content */}
      <main className="flex flex-col">{children}</main>

      {/* Footer */}
      {footerSection}

      {/* Mobile Nav */}
      {navMobileSection}

      {/* Chat (optional) */}
      {chatSection}
    </div>
  );
}