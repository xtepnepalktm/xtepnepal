// import { useDropzone } from 'react-dropzone';
// import { varAlpha, mergeClasses } from 'minimal-shared/utils';

// import Box from '@mui/material/Box';

// import { Iconify } from '../iconify';
// import { uploadClasses } from './classes';

// // ----------------------------------------------------------------------

// export function UploadBox({ placeholder, error, disabled, className, sx, ...other }) {
//   const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
//     disabled,
//     ...other,
//   });

//   const hasError = isDragReject || error;

//   return (
//     <Box
//       {...getRootProps()}
//       className={mergeClasses([uploadClasses.uploadBox, className])}
//       sx={[
//         (theme) => ({
//           width: 64,
//           height: 64,
//           flexShrink: 0,
//           display: 'flex',
//           borderRadius: 1,
//           cursor: 'pointer',
//           alignItems: 'center',
//           color: 'text.disabled',
//           justifyContent: 'center',
//           bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
//           border: `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
//           ...(isDragActive && { opacity: 0.72 }),
//           ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
//           ...(hasError && {
//             color: 'error.main',
//             borderColor: 'error.main',
//             bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
//           }),
//           '&:hover': { opacity: 0.72 },
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//     >
//       <input {...getInputProps()} />

//       {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
//     </Box>
//   );
// }
import { useDropzone } from "react-dropzone";
import { mergeClasses } from "minimal-shared/utils";

import { Iconify } from "../iconify";
import { uploadClasses } from "./classes";

// ----------------------------------------------------------------------

export function UploadBox({
  placeholder,
  error,
  disabled,
  className,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    disabled,
    ...other,
  });

  const hasError = isDragReject || error;

  return (
    <div
      {...getRootProps()}
      className={mergeClasses([
        uploadClasses.uploadBox,
        "flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center  border border-dashed transition-opacity",
        hasError
          ? "border-red-500 bg-red-500/10 text-red-500"
          : "border-gray-300 bg-gray-500/10 text-gray-400",
        isDragActive && "opacity-70",
        disabled && "pointer-events-none opacity-50",
        "hover:opacity-70",
        className,
      ])}
    >
      <input {...getInputProps()} />

      {placeholder || (
        <Iconify
          icon="eva:cloud-upload-fill"
          width={28}
        />
      )}
    </div>
  );
}