"use client";

import { merge } from "es-toolkit";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { Logo } from "@/components/logo";

import { SimpleCompactContent } from "./content";
import { MainSection } from "../core/main-section";
import { LayoutSection } from "../core/layout-section";
import { HeaderSection } from "../core/header-section";

// ----------------------------------------------------------------------

export function SimpleLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = "md",
}) {
  const renderHeader = () => {
    const headerSlotProps = { container: { maxWidth: false } };

    const headerSlots = {
      topArea: (
        <div className="hidden">
          <div
            className="bg-blue-100 text-blue-800 px-4 py-2 text-sm"
          >
            This is an info Alert.
          </div>
        </div>
      ),

      leftArea: <Logo />,

      rightArea: (
        <div className="flex items-center gap-2 sm:gap-3">
          <RouterLink
            href={paths.faqs}
            className="text-inherit text-sm font-semibold hover:underline"
          >
            Need help?
          </RouterLink>
        </div>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(
          headerSlotProps,
          slotProps?.header?.slotProps ?? {}
        )}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => null;

  const renderMain = () => {
    const { compact, ...restContentProps } = slotProps?.content ?? {};

    return (
      <MainSection {...slotProps?.main}>
        {compact ? (
          <SimpleCompactContent layoutQuery={layoutQuery} {...restContentProps}>
            {children}
          </SimpleCompactContent>
        ) : (
          children
        )}
      </MainSection>
    );
  };

  return (
    <LayoutSection
      headerSection={renderHeader()}
      footerSection={renderFooter()}
      cssVars={{
        "--layout-simple-content-compact-width": "448px",
        ...cssVars,
      }}
      sx={sx}
    >
      {renderMain()}
    </LayoutSection>
  );
}