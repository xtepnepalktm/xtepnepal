// import { forwardRef } from 'react';
// import { mergeClasses } from 'minimal-shared/utils';

// import Tooltip from '@mui/material/Tooltip';
// import { styled } from '@mui/material/styles';

// import { fileThumbnailClasses } from './classes';
// import { fileData, fileThumb, fileFormat } from './utils';
// import { RemoveButton, DownloadButton } from './action-buttons';

// // ----------------------------------------------------------------------

// export const FileThumbnail = forwardRef((props, ref) => {
//   const { file, tooltip, onRemove, imageView, slotProps, onDownload, className, sx, ...other } =
//     props;

//   const { icon, removeBtn, downloadBtn, tooltip: tooltipProps } = slotProps ?? {};

//   const { name, path } = fileData(file);

//   const previewUrl = typeof file === 'string' ? file : URL.createObjectURL(file);

//   const format = fileFormat(path ?? previewUrl);

//   const renderItem = () => (
//     <ItemRoot
//       ref={ref}
//       className={mergeClasses([fileThumbnailClasses.root, className])}
//       sx={sx}
//       {...other}
//     >
//       {format === 'image' && imageView ? (
//         <ItemImg src={previewUrl} className={fileThumbnailClasses.img} {...slotProps?.img} />
//       ) : (
//         <ItemIcon src={fileThumb(format)} className={fileThumbnailClasses.icon} {...icon} />
//       )}

//       {onRemove && (
//         <RemoveButton
//           onClick={onRemove}
//           className={fileThumbnailClasses.removeBtn}
//           {...removeBtn}
//         />
//       )}

//       {onDownload && (
//         <DownloadButton
//           onClick={onDownload}
//           className={fileThumbnailClasses.downloadBtn}
//           {...downloadBtn}
//         />
//       )}
//     </ItemRoot>
//   );

//   if (tooltip) {
//     return (
//       <Tooltip
//         arrow
//         title={name}
//         {...tooltipProps}
//         slotProps={{
//           ...tooltipProps?.slotProps,
//           popper: {
//             modifiers: [
//               {
//                 name: 'offset',
//                 options: { offset: [0, -12] },
//               },
//             ],
//             ...tooltipProps?.slotProps?.popper,
//           },
//         }}
//       >
//         {renderItem()}
//       </Tooltip>
//     );
//   }

//   return renderItem();
// });

// // ----------------------------------------------------------------------

// const ItemRoot = styled('span')(({ theme }) => ({
//   width: 36,
//   height: 36,
//   flexShrink: 0,
//   alignItems: 'center',
//   position: 'relative',
//   display: 'inline-flex',
//   justifyContent: 'center',
//   borderRadius: theme.shape.borderRadius * 1.25,
// }));

// const ItemIcon = styled('img')(() => ({
//   width: '100%',
//   height: '100%',
// }));

// const ItemImg = styled('img')(() => ({
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   borderRadius: 'inherit',
// }));
import { forwardRef } from "react";
import clsx from "clsx";

import { mergeClasses } from "minimal-shared/utils";
import { fileData, fileThumb, fileFormat } from "./utils";
import { RemoveButton, DownloadButton } from "./action-buttons";
import { fileThumbnailClasses } from "./classes";

// Simple tooltip replacement (no MUI)
function Tooltip({ title, children }) {
  return (
    <div className="relative group inline-flex">
      {children}
      {title && (
        <div
          className="
            absolute -top-8 left-1/2 -translate-x-1/2
            hidden group-hover:block
            text-xs text-white bg-black px-2 py-1 rounded
            whitespace-nowrap
          "
        >
          {title}
        </div>
      )}
    </div>
  );
}

export const FileThumbnail = forwardRef((props, ref) => {
  const {
    file,
    tooltip,
    onRemove,
    imageView,
    slotProps,
    onDownload,
    className,
    ...other
  } = props;

  const { icon, removeBtn, downloadBtn } = slotProps ?? {};

  const { name, path } = fileData(file);

  const previewUrl =
    typeof file === "string" ? file : URL.createObjectURL(file);

  const format = fileFormat(path ?? previewUrl);

  const isImage = format === "image";

  const renderItem = () => (
    <span
      ref={ref}
      className={clsx(
        "w-9 h-9 flex items-center justify-center relative flex-shrink-0",
        "rounded-md overflow-hidden bg-gray-100",
        fileThumbnailClasses.root,
        className
      )}
      {...other}
    >
      {/* Image */}
      {isImage && imageView ? (
        <img
          src={previewUrl}
          className={clsx(
            "w-full h-full object-cover",
            fileThumbnailClasses.img
          )}
          {...slotProps?.img}
        />
      ) : (
        <img
          src={fileThumb(format)}
          className={clsx("w-full h-full", fileThumbnailClasses.icon)}
          {...icon}
        />
      )}

      {/* Remove */}
      {onRemove && (
        <RemoveButton
          onClick={onRemove}
          className={fileThumbnailClasses.removeBtn}
          {...removeBtn}
        />
      )}

      {/* Download */}
      {onDownload && (
        <DownloadButton
          onClick={onDownload}
          className={fileThumbnailClasses.downloadBtn}
          {...downloadBtn}
        />
      )}
    </span>
  );

  if (tooltip) {
    return <Tooltip title={name}>{renderItem()}</Tooltip>;
  }

  return renderItem();
});