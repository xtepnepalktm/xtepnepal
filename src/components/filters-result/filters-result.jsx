// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// export const chipProps = { size: "small", variant: "soft" };

// // ----------------------------------------------------------------------

// export function FiltersResult({
//   sx,
//   onReset,
//   children,
//   totalResults,
//   ...other
// }) {
//   return (
//     <ResultRoot sx={sx} {...other}>
//       <ResultLabel>
//         <strong>{totalResults}</strong>
//         <span> results found</span>
//       </ResultLabel>

//       <ResultContent>
//         {children}

//         <Button
//           color="error"
//           onClick={onReset}
//           startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
//         >
//           Clear
//         </Button>
//       </ResultContent>
//     </ResultRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const ResultRoot = styled("div")``;

// const ResultLabel = styled("div")(({ theme }) => ({
//   ...theme.typography.body2,
//   marginBottom: theme.spacing(1.5),
//   "& span": { color: theme.vars.palette.text.secondary },
// }));

// const ResultContent = styled("div")(({ theme }) => ({
//   flexGrow: 1,
//   display: "flex",
//   flexWrap: "wrap",
//   alignItems: "center",
//   gap: theme.spacing(1),
// }));
import { Iconify } from "@/components/iconify";

export const chipProps = {
  size: "sm",
  variant: "soft",
};

export function FiltersResult({
  className = "",
  onReset,
  children,
  totalResults,
  ...other
}) {
  return (
    <div className={className} {...other}>
      {/* Label */}
      <div className="text-sm font-medium mb-3 text-gray-900">
        <strong>{totalResults}</strong>
        <span className="text-gray-500 ml-1">results found</span>
      </div>

      {/* Content */}
      <div className="flex flex-wrap items-center gap-2">
        {children}

        <button
          onClick={onReset}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm"
        >
          <Iconify icon="solar:trash-bin-trash-bold" width={18} />
          Clear
        </button>
      </div>
    </div>
  );
}