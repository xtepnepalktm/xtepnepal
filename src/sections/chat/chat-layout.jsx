// import { styled } from "@mui/material/styles";

// // ----------------------------------------------------------------------

// export function ChatLayout({ slots, sx, ...other }) {
//   return (
//     <LayoutRoot sx={sx} {...other}>
//       <LayoutNav>{slots.nav}</LayoutNav>

//       <LayoutContainer>
//         <LayoutHeader>{slots.header}</LayoutHeader>

//         <LayoutContent>
//           <LayoutMain>{slots.main}</LayoutMain>
//           <LayoutDetails>{slots.details}</LayoutDetails>
//         </LayoutContent>
//       </LayoutContainer>
//     </LayoutRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const LayoutRoot = styled("div")(({ theme }) => ({
//   minHeight: 0,
//   flex: "1 1 0",
//   display: "flex",
//   position: "relative",
//   boxShadow: theme.vars.customShadows.card,
//   borderRadius: theme.shape.borderRadius * 2,
//   backgroundColor: theme.vars.palette.background.paper,
// }));

// const LayoutHeader = styled("div")(({ theme }) => ({
//   height: 72,
//   flexShrink: 0,
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(1, 1, 1, 2.5),
//   borderBottom: `solid 1px ${theme.vars.palette.divider}`,
// }));

// const LayoutNav = styled("div")(() => ({
//   display: "flex",
//   flexDirection: "column",
// }));

// const LayoutContainer = styled("div")(() => ({
//   minWidth: 0,
//   display: "flex",
//   flex: "1 1 auto",
//   flexDirection: "column",
// }));

// const LayoutContent = styled("div")(() => ({
//   minHeight: 0,
//   display: "flex",
//   flex: "1 1 auto",
// }));

// const LayoutMain = styled("div")(() => ({
//   minWidth: 0,
//   display: "flex",
//   flex: "1 1 auto",
//   flexDirection: "column",
// }));

// const LayoutDetails = styled("div")(() => ({
//   minHeight: 0,
//   display: "flex",
//   flexDirection: "column",
// }));
export function ChatLayout({ slots = {}, sx = "", ...other }) {
  return (
    <div
      className={`flex flex-1 min-h-0 relative bg-white shadow-md ${sx}`}
      {...other}
    >
      {/* NAV */}
      <div className="flex flex-col">
        {slots.nav}
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* HEADER */}
        <div className="flex items-center h-[72px] flex-shrink-0 px-2 pl-10 border-b border-gray-200">
          {slots.header}
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 min-h-0">
          {/* MAIN */}
          <div className="flex flex-col flex-1 min-w-0">
            {slots.main}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col min-h-0">
            {slots.details}
          </div>
        </div>
      </div>
    </div>
  );
}