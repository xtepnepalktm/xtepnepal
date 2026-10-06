// import { varAlpha, mergeClasses } from 'minimal-shared/utils';

// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';

// import { Iconify } from '../../iconify';
// import { uploadClasses } from '../classes';

// // ----------------------------------------------------------------------

// export function SingleFilePreview({ file, sx, className, ...other }) {
//   const fileName = typeof file === 'string' ? file : file.name;

//   const previewUrl = typeof file === 'string' ? file : URL.createObjectURL(file);

//   return (
//     <PreviewRoot
//       className={mergeClasses([uploadClasses.uploadSinglePreview, className])}
//       sx={sx}
//       {...other}
//     >
//       <img alt={fileName} src={previewUrl} />
//     </PreviewRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const PreviewRoot = styled('div')(({ theme }) => ({
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   position: 'absolute',
//   padding: theme.spacing(1),
//   '& > img': {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     borderRadius: theme.shape.borderRadius,
//   },
// }));

// // ----------------------------------------------------------------------

// export function DeleteButton({ sx, ...other }) {
//   return (
//     <IconButton
//       size="small"
//       sx={[
//         (theme) => ({
//           top: 16,
//           right: 16,
//           zIndex: 9,
//           position: 'absolute',
//           color: varAlpha(theme.vars.palette.common.whiteChannel, 0.8),
//           bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.72),
//           '&:hover': { bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48) },
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <Iconify icon="mingcute:close-line" width={18} />
//     </IconButton>
//   );
// }
import { mergeClasses } from "minimal-shared/utils";

import { Iconify } from "../../iconify";
import { uploadClasses } from "../classes";

// ----------------------------------------------------------------------

export function SingleFilePreview({ file, className, ...other }) {
  const fileName = typeof file === "string" ? file : file.name;

  const previewUrl =
    typeof file === "string"
      ? file
      : URL.createObjectURL(file);

  return (
    <div
      className={mergeClasses([
        uploadClasses.uploadSinglePreview,
        "absolute inset-0 h-full w-full p-2",
        className,
      ])}
      {...other}
    >
      <img
        src={previewUrl}
        alt={fileName}
        className="h-full w-full  object-cover"
      />
    </div>
  );
}

// ----------------------------------------------------------------------

export function DeleteButton({ className = "", ...other }) {
  return (
    <button
      type="button"
      className={mergeClasses([
        "absolute right-4 top-4 z-[9]",
        "rounded-full p-2",
        "bg-black/70 text-white/80",
        "transition-colors duration-200",
        "hover:bg-black/50",
        className,
      ])}
      {...other}
    >
      <Iconify
        icon="mingcute:close-line"
        width={18}
      />
    </button>
  );
}