// import { useEffect } from "react";

// import { Box, Drawer } from "@mui/material";

// import { paths } from "@/routes/paths";
// import { usePathname } from "@/routes/hooks";

// import { Logo } from "@/components/logo";
// import { Scrollbar } from "@/components/scrollbar";
// import { Iconify } from "@/components/iconify";

// import { Nav, NavUl } from "../components";
// import { NavList } from "./nav-mobile-list";

// import { CategoryNavList } from "./nav-mobile-category";

// // ----------------------------------------------------------------------

// export function NavMobile({ data, categories, open, onClose, slots, sx }) {
//   const pathname = usePathname();

//   useEffect(() => {
//     if (open) {
//       onClose();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]);

//   return (
//     <Drawer
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: [
//           {
//             display: "flex",
//             flexDirection: "column",
//             width: "var(--layout-nav-mobile-width)",
//           },
//           ...(Array.isArray(sx) ? sx : [sx]),
//         ],
//       }}
//     >
//       {slots?.topArea ?? (
//         <Box
//           sx={{
//             display: "flex",
//             pt: 3,
//             pb: 2,
//             pl: 2.5,
//           }}
//         >
//           <Logo />
//         </Box>
//       )}

//       <Scrollbar fillContent>
//         <Nav
//           sx={{
//             pb: 3,
//             display: "flex",
//             flex: "1 1 auto",
//             flexDirection: "column",
//           }}
//         >
//           <NavUl>
//             {data.map((list) => (
//               <NavList key={list.title} data={list} />
//             ))}

//             <CategoryNavList
//               data={{
//                 title: "Category",
//                 path: paths.cart,
//                 icon: <Iconify width={22} icon="solar:cart-3-bold" />,
//                 categories: categories,
//               }}
//             />
//           </NavUl>
//         </Nav>
//       </Scrollbar>
//     </Drawer>
//   );
// }
import { useEffect, useRef } from "react";
import { isExternalLink } from "minimal-shared/utils";

import { paths } from "@/routes/paths";
import { usePathname } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { Logo } from "@/components/logo";
import { Scrollbar } from "@/components/scrollbar";
import { Iconify } from "@/components/iconify";

import { Nav, NavUl } from "../components";
import { NavList } from "./nav-mobile-list";
import { CategoryNavList } from "./nav-mobile-category";

// ----------------------------------------------------------------------

export function NavMobile({
  data,
  categories,
  trailingNavData,
  open,
  onClose,
  slots,
  className,
}) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[1200] bg-black/50 transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 left-0 z-[1200] h-full flex flex-col bg-white shadow-2xl
          transition-transform duration-300 ease-in-out
          w-[var(--layout-nav-mobile-width,280px)]
          ${open ? "translate-x-0" : "-translate-x-full"}
          ${className ?? ""}`}
      >
        {/* Top area */}
        {slots?.topArea ?? (
          <div className="flex p-2">
            <Logo />
          </div>
        )}

        {/* Scrollable nav */}
        <Scrollbar fillContent>
          <Nav className="pb-6 flex flex-1 flex-col  ">
            <NavUl>
              {data.map((list) => (
                <NavList key={list.title} data={list} />
              ))}

              <CategoryNavList
                data={{
                  title: "Category",
                  path: paths.cart,
                  icon: <Iconify width={22} icon="solar:cart-3-bold" />,
                  categories: categories,
                }}
              />
            </NavUl>
          </Nav>
        </Scrollbar>

        {/* Trailing CTAs (e.g. Marathon Registration) — pinned so they stay
            visible no matter how long the nav list gets. */}
        {!!trailingNavData?.length && (
          <div className="flex shrink-0 flex-col gap-2 border-t border-black/[0.08] p-4">
            {trailingNavData.map((item) => {
              const external = isExternalLink(item.path);

              const content = (
                <>
                  {item.icon && (
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                  )}
                  <span className="truncate">{item.title}</span>
                </>
              );

              const itemClassName =
                "flex w-full items-center justify-center gap-2 bg-[#E60012] px-4 py-3 " +
                "text-xs font-semibold uppercase text-white no-underline " +
                "transition-all hover:brightness-110 active:scale-95";

              return external ? (
                <a
                  key={item.title}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.title}
                  className={itemClassName}
                  onClick={onClose}
                >
                  {content}
                </a>
              ) : (
                <RouterLink
                  key={item.title}
                  href={item.path}
                  aria-label={item.title}
                  className={itemClassName}
                  onClick={onClose}
                >
                  {content}
                </RouterLink>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}