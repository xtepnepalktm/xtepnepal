// import { styled } from '@mui/material/styles';

// // ----------------------------------------------------------------------

// export function FiltersBlock({ label, children, isShow, sx, ...other }) {
//   if (!isShow) {
//     return null;
//   }

//   return (
//     <BlockRoot sx={sx} {...other}>
//       <BlockLabel>{label}</BlockLabel>
//       <BlockContent>{children}</BlockContent>
//     </BlockRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const BlockRoot = styled('div')(({ theme }) => ({
//   display: 'flex',
//   overflow: 'hidden',
//   gap: theme.spacing(1),
//   padding: theme.spacing(1),
//   borderRadius: theme.shape.borderRadius,
//   border: `dashed 1px ${theme.vars.palette.divider}`,
// }));

// const BlockLabel = styled('span')(({ theme }) => ({
//   height: 24,
//   lineHeight: '24px',
//   fontSize: theme.typography.subtitle2.fontSize,
//   fontWeight: theme.typography.subtitle2.fontWeight,
// }));

// const BlockContent = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexWrap: 'wrap',
//   gap: theme.spacing(1),
// }));
import clsx from "clsx";

export function FiltersBlock({
  label,
  children,
  isShow,
  className,
  ...other
}) {
  if (!isShow) return null;

  return (
    <div
      className={clsx(
        "flex overflow-hidden gap-2 p-2",
        "rounded-md border border-dashed border-gray-300",
        className
      )}
      {...other}
    >
      {/* Label */}
      <span className="h-6 leading-6 text-sm font-medium text-gray-700 whitespace-nowrap">
        {label}
      </span>

      {/* Content */}
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}