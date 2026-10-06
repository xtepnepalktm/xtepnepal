// import SvgIcon from '@mui/material/SvgIcon';
// import { styled } from '@mui/material/styles';
// import ButtonBase from '@mui/material/ButtonBase';

// // ----------------------------------------------------------------------

// export function ToolbarItem({ sx, icon, label, active, disabled, ...other }) {
//   return (
//     <ItemRoot active={active} disabled={disabled} sx={sx} {...other}>
//       {icon && <SvgIcon sx={{ fontSize: 18 }}>{icon}</SvgIcon>}
//       {label && label}
//     </ItemRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const ItemRoot = styled(ButtonBase, {
//   shouldForwardProp: (prop) => !['active', 'disabled', 'sx'].includes(prop),
// })(({ theme }) => ({
//   ...theme.typography.body2,
//   width: 28,
//   height: 28,
//   padding: theme.spacing(0, 0.75),
//   borderRadius: theme.shape.borderRadius * 0.75,
//   '&:hover': {
//     backgroundColor: theme.vars.palette.action.hover,
//   },
//   variants: [
//     {
//       props: { active: true },
//       style: {
//         backgroundColor: theme.vars.palette.action.selected,
//         border: `solid 1px ${theme.vars.palette.action.hover}`,
//       },
//     },
//     {
//       props: { disabled: true },
//       style: {
//         opacity: 0.48,
//         pointerEvents: 'none',
//         cursor: 'not-allowed',
//       },
//     },
//   ],
// }));
'use client';

import clsx from 'clsx';

export function ToolbarItem({
  sx,
  icon,
  label,
  active = false,
  disabled = false,
  className,
  ...other
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-sm transition',
        'h-7 w-7',

        // hover state (MUI action.hover replacement)
        !disabled && 'hover:bg-gray-100',

        // active state (MUI selected)
        active && 'bg-gray-200 border border-gray-300',

        // disabled state
        disabled && 'opacity-50 cursor-not-allowed',

        className
      )}
      style={sx}
      {...other}
    >
      {icon && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="shrink-0"
        >
          {icon}
        </svg>
      )}

      {label && <span className="text-xs leading-none">{label}</span>}
    </button>
  );
}