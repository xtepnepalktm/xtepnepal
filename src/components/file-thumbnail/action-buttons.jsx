// import { varAlpha } from 'minimal-shared/utils';

// import ButtonBase from '@mui/material/ButtonBase';
// import IconButton from '@mui/material/IconButton';

// import { Iconify } from '../iconify';

// // ----------------------------------------------------------------------

// export function DownloadButton({ sx, ...other }) {
//   return (
//     <ButtonBase
//       sx={[
//         (theme) => ({
//           p: 0,
//           top: 0,
//           right: 0,
//           width: 1,
//           height: 1,
//           zIndex: 9,
//           opacity: 0,
//           position: 'absolute',
//           color: 'common.white',
//           borderRadius: 'inherit',
//           transition: theme.transitions.create(['opacity']),
//           '&:hover': {
//             ...theme.mixins.bgBlur({
//               color: varAlpha(theme.vars.palette.grey['900Channel'], 0.64),
//             }),
//             opacity: 1,
//           },
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Iconify icon="eva:arrow-circle-down-fill" width={24} />
//     </ButtonBase>
//   );
// }

// // ----------------------------------------------------------------------

// export function RemoveButton({ sx, ...other }) {
//   return (
//     <IconButton
//       size="small"
//       sx={[
//         (theme) => ({
//           p: 0.35,
//           top: 4,
//           right: 4,
//           position: 'absolute',
//           color: 'common.white',
//           bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
//           '&:hover': { bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.72) },
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Iconify icon="mingcute:close-line" width={12} />
//     </IconButton>
//   );
// }
import clsx from "clsx";
import { Iconify } from "../iconify";

export function DownloadButton({ className, ...props }) {
  return (
    <button
      type="button"
      className={clsx(
        "absolute inset-0 z-10 w-full h-full",
        "opacity-0 text-white rounded-inherit",
        "transition-opacity duration-200",
        "hover:opacity-100 hover:bg-black/60",
        className
      )}
      {...props}
    >
      <Iconify icon="eva:arrow-circle-down-fill" width={24} />
    </button>
  );
}
export function RemoveButton({ className, ...props }) {
  return (
    <button
      type="button"
      className={clsx(
        "absolute top-1 right-1 z-10",
        "w-6 h-6 flex items-center justify-center",
        "text-white bg-black/50 rounded-md",
        "hover:bg-black/70 transition",
        className
      )}
      {...props}
    >
      <Iconify icon="mingcute:close-line" width={12} />
    </button>
  );
}