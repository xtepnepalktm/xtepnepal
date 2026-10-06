// import Fade from "@mui/material/Fade";
// import { styled } from "@mui/material/styles";

// // ----------------------------------------------------------------------

// const NavDropdownPaper = styled("div")(({ theme }) => ({
//   ...theme.mixins.paperStyles(theme, { dropdown: true }),
//   padding: theme.spacing(2, 1, 2, 4),
//   borderRadius: theme.shape.borderRadius * 2,
//   ...(theme.direction === "rtl" && {
//     padding: theme.spacing(5, 4, 1, 1),
//   }),
// }));

// // ----------------------------------------------------------------------

// export const NavDropdown = styled(({ open, children, ...other }) => (
//   <Fade in={open}>
//     <div {...other}>
//       <NavDropdownPaper>{children}</NavDropdownPaper>
//     </div>
//   </Fade>
// ))(({ theme }) => ({
//   left: 0,
//   right: 0,
//   marginTop: 12,
//   width: "100%",
//   position: "fixed",
//   marginLeft: "auto",
//   marginRight: "auto",
//   padding: theme.spacing(1.5),
//   zIndex: theme.zIndex.drawer * 2,
//   maxWidth: theme.breakpoints.values.lg,
//   // top: "calc(var(--layout-header-desktop-height) / 2)",
//   top: "calc(148 / 2)",
// }));
import { useEffect, useRef } from "react";

// ----------------------------------------------------------------------
// NavDropdownPaper — replaces styled("div") with theme.mixins.paperStyles
// paperStyles(dropdown:true) adds: bg, border-radius, box-shadow
// padding: spacing(2,1,2,4) = 16px 8px 16px 32px (ltr)
// RTL: spacing(5,4,1,1) = 40px 32px 8px 8px

function NavDropdownPaper({ children, className = "", ...other }) {
  return (
    <div
      className={[
        // paperStyles: background, shadow, border
        "bg-[var(--background-paper)]",
        "shadow-[0_20px_40px_-4px_rgba(145,158,171,0.24)]",
        "border border-[var(--divider,rgba(145,158,171,0.16))]",
        // padding ltr: top=16 right=8 bottom=16 left=32
        "pt-4 pr-2 pb-4 pl-8",
        // RTL padding override
        "rtl:pt-[40px] rtl:pr-8 rtl:pb-2 rtl:pl-2",
        // border-radius: shape.borderRadius * 2 = 8px * 2 = 16px

        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...other}
    >
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------
// NavDropdown — replaces styled(Fade + div) component
// Fade in/out via opacity + pointer-events transition

export function NavDropdown({ open, children, className = "", ...other }) {
  return (
    <div
      className={[
        // Position & layout
        "fixed left-0 right-0 mx-auto w-full z-[3200]",
        // top: calc(148 / 2) = 74px  (mirrors the original)
        "top-[74px]",
        // maxWidth: breakpoints.values.lg = 1200px
        "max-w-[1200px]",
        // padding: spacing(1.5) = 12px
        "p-3",
        // Fade transition
        "transition-opacity duration-200 ease-in-out",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...other}
    >
      <NavDropdownPaper>{children}</NavDropdownPaper>
    </div>
  );
}