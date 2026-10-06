// import { useDropzone } from 'react-dropzone';
// import { varAlpha, mergeClasses } from 'minimal-shared/utils';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import FormHelperText from '@mui/material/FormHelperText';

// import { Iconify } from '../iconify';
// import { uploadClasses } from './classes';
// import { UploadPlaceholder } from './components/placeholder';
// import { RejectionFiles } from './components/rejection-files';
// import { MultiFilePreview } from './components/preview-multi-file';
// import { DeleteButton, SingleFilePreview } from './components/preview-single-file';

// // ----------------------------------------------------------------------

// export function Upload({
//   sx,
//   value,
//   error,
//   disabled,
//   onDelete,
//   onUpload,
//   onRemove,
//   thumbnail,
//   helperText,
//   onRemoveAll,
//   className,
//   multiple = false,
//   ...other
// }) {
//   const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
//     multiple,
//     disabled,
//     ...other,
//   });

//   const isArray = Array.isArray(value) && multiple;

//   const hasFile = !isArray && !!value;
//   const hasFiles = isArray && !!value.length;

//   const hasError = isDragReject || !!error;

//   const renderMultiPreview = () =>
//     hasFiles && (
//       <>
//         <MultiFilePreview files={value} thumbnail={thumbnail} onRemove={onRemove} sx={{ my: 3 }} />

//         {(onRemoveAll || onUpload) && (
//           <Box sx={{ gap: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
//             {onRemoveAll && (
//               <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
//                 Remove all
//               </Button>
//             )}

//             {onUpload && (
//               <Button
//                 size="small"
//                 variant="contained"
//                 onClick={onUpload}
//                 startIcon={<Iconify icon="eva:cloud-upload-fill" />}
//               >
//                 Upload
//               </Button>
//             )}
//           </Box>
//         )}
//       </>
//     );

//   return (
//     <Box
//       className={mergeClasses([uploadClasses.upload, className])}
//       sx={[{ width: 1, position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}
//     >
//       <Box
//         {...getRootProps()}
//         sx={[
//           (theme) => ({
//             p: 5,
//             outline: 'none',
//             borderRadius: 1,
//             cursor: 'pointer',
//             overflow: 'hidden',
//             position: 'relative',
//             bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
//             border: `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
//             transition: theme.transitions.create(['opacity', 'padding']),
//             '&:hover': { opacity: 0.72 },
//             ...(isDragActive && { opacity: 0.72 }),
//             ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
//             ...(hasError && {
//               color: 'error.main',
//               borderColor: 'error.main',
//               bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
//             }),
//             ...(hasFile && { padding: '28% 0' }),
//           }),
//         ]}
//       >
//         <input {...getInputProps()} />

//         {/* Single file */}
//         {hasFile ? <SingleFilePreview file={value} /> : <UploadPlaceholder />}
//       </Box>

//       {/* Single file */}
//       {hasFile && <DeleteButton onClick={onDelete} />}

//       {helperText && (
//         <FormHelperText error={!!error} sx={{ mx: 1.75 }}>
//           {helperText}
//         </FormHelperText>
//       )}

//       {!!fileRejections.length && <RejectionFiles files={fileRejections} />}

//       {/* Multi files */}
//       {renderMultiPreview()}
//     </Box>
//   );
// }
import { useDropzone } from "react-dropzone";
import { mergeClasses } from "minimal-shared/utils";

import { Iconify } from "../iconify";
import { uploadClasses } from "./classes";
import { UploadPlaceholder } from "./components/placeholder";
import { RejectionFiles } from "./components/rejection-files";
import { MultiFilePreview } from "./components/preview-multi-file";
import {
  DeleteButton,
  SingleFilePreview,
} from "./components/preview-single-file";

// ----------------------------------------------------------------------

export function Upload({
  value,
  error,
  disabled,
  onDelete,
  onUpload,
  onRemove,
  thumbnail,
  helperText,
  onRemoveAll,
  className,
  multiple = false,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple,
    disabled,
    ...other,
  });

  const isArray = Array.isArray(value) && multiple;

  const hasFile = !isArray && !!value;
  const hasFiles = isArray && value.length > 0;

  const hasError = isDragReject || !!error;

  return (
    <div
      className={mergeClasses([
        uploadClasses.upload,
        "relative w-full",
        className,
      ])}
    >
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={mergeClasses([
          "relative overflow-hidden  border border-dashed p-5 outline-none transition-all",
          "cursor-pointer bg-gray-500/10",
          hasError
            ? "border-red-500 bg-red-500/10 text-red-500"
            : "border-gray-300",
          isDragActive && "opacity-70",
          disabled && "pointer-events-none opacity-50",
          hasFile && "py-[28%] px-0",
          "hover:opacity-70",
        ])}
      >
        <input {...getInputProps()} />

        {hasFile ? (
          <SingleFilePreview file={value} />
        ) : (
          <UploadPlaceholder />
        )}
      </div>

      {/* Single File Delete */}
      {hasFile && (
        <DeleteButton onClick={onDelete} />
      )}

      {/* Helper Text */}
      {helperText && (
        <p
          className={mergeClasses([
            "mx-2 mt-1 text-sm",
            error ? "text-red-500" : "text-gray-500",
          ])}
        >
          {helperText}
        </p>
      )}

      {/* Rejected Files */}
      {!!fileRejections.length && (
        <RejectionFiles files={fileRejections} />
      )}

      {/* Multi File Preview */}
      {hasFiles && (
        <>
          <div className="my-3">
            <MultiFilePreview
              files={value}
              thumbnail={thumbnail}
              onRemove={onRemove}
            />
          </div>

          {(onRemoveAll || onUpload) && (
            <div className="flex justify-end gap-2">
              {onRemoveAll && (
                <button
                  type="button"
                  onClick={onRemoveAll}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
                >
                  Remove all
                </button>
              )}

              {onUpload && (
                <button
                  type="button"
                  onClick={onUpload}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                >
                  <Iconify
                    icon="eva:cloud-upload-fill"
                    width={18}
                  />
                  Upload
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}