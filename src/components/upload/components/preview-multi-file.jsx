// import { varAlpha, mergeClasses } from "minimal-shared/utils";

// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import ListItemText from "@mui/material/ListItemText";

// import { fData } from "@/utils/format-number";

// import { Iconify } from "../../iconify";
// import { uploadClasses } from "../classes";
// import { fileData, FileThumbnail } from "../../file-thumbnail";

// // ----------------------------------------------------------------------

// export function MultiFilePreview({
//   sx,
//   onRemove,
//   lastNode,
//   thumbnail,
//   slotProps,
//   firstNode,
//   files = [],
//   className,
//   ...other
// }) {
//   return (
//     <ListRoot
//       thumbnail={thumbnail}
//       className={mergeClasses([uploadClasses.uploadMultiPreview, className])}
//       sx={sx}
//       {...other}
//     >
//       {firstNode && <ItemNode thumbnail={thumbnail}>{firstNode}</ItemNode>}

//       {files.map((file) => {
//         const { name, size } = fileData(file);

//         if (thumbnail) {
//           return (
//             <ItemThumbnail key={name}>
//               <FileThumbnail
//                 tooltip
//                 imageView
//                 file={file}
//                 onRemove={() => onRemove?.(file)}
//                 sx={[
//                   (theme) => ({
//                     width: 80,
//                     height: 80,
//                     border: `solid 1px ${varAlpha(
//                       theme.vars.palette.grey["500Channel"],
//                       0.16
//                     )}`,
//                   }),
//                 ]}
//                 slotProps={{ icon: { sx: { width: 36, height: 36 } } }}
//                 {...slotProps?.thumbnail}
//               />
//             </ItemThumbnail>
//           );
//         }

//         return (
//           <ItemRow key={name}>
//             <FileThumbnail file={file} {...slotProps?.thumbnail} />

//             <ListItemText
//               primary={name}
//               secondary={fData(size)}
//               slotProps={{
//                 secondary: { sx: { typography: "caption" } },
//               }}
//             />

//             {onRemove && (
//               <IconButton size="small" onClick={() => onRemove(file)}>
//                 <Iconify width={16} icon="mingcute:close-line" />
//               </IconButton>
//             )}
//           </ItemRow>
//         );
//       })}

//       {lastNode && <ItemNode thumbnail={thumbnail}>{lastNode}</ItemNode>}
//     </ListRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const ListRoot = styled("ul", {
//   shouldForwardProp: (prop) => !["thumbnail", "sx"].includes(prop),
// })(({ thumbnail, theme }) => ({
//   display: "flex",
//   gap: theme.spacing(1),
//   flexDirection: "column",
//   ...(thumbnail && { flexWrap: "wrap", flexDirection: "row" }),
// }));

// const ItemThumbnail = styled("li")(() => ({ display: "inline-flex" }));

// const ItemRow = styled("li")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   gap: theme.spacing(1.5),
//   padding: theme.spacing(1, 1, 1, 1.5),
//   borderRadius: theme.shape.borderRadius,
//   border: `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.16)}`,
// }));

// const ItemNode = styled("li", {
//   shouldForwardProp: (prop) => !["thumbnail", "sx"].includes(prop),
// })(({ thumbnail }) => ({
//   ...(thumbnail && { width: "auto", display: "inline-flex" }),
// }));
import { mergeClasses } from "minimal-shared/utils";

import { fData } from "@/utils/format-number";

import { Iconify } from "../../iconify";
import { uploadClasses } from "../classes";
import { fileData, FileThumbnail } from "../../file-thumbnail";

// ----------------------------------------------------------------------

export function MultiFilePreview({
  onRemove,
  lastNode,
  thumbnail,
  slotProps,
  firstNode,
  files = [],
  className,
  ...other
}) {
  return (
    <ul
      className={mergeClasses([
        uploadClasses.uploadMultiPreview,
        thumbnail
          ? "flex flex-row flex-wrap gap-2"
          : "flex flex-col gap-2",
        className,
      ])}
      {...other}
    >
      {firstNode && (
        <li className={thumbnail ? "inline-flex w-auto" : ""}>
          {firstNode}
        </li>
      )}

      {files.map((file) => {
        const { name, size } = fileData(file);

        if (thumbnail) {
          return (
            <li key={name} className="inline-flex">
              <div className="overflow-hidden  border border-gray-200">
                <FileThumbnail
                  tooltip
                  imageView
                  file={file}
                  onRemove={() => onRemove?.(file)}
                  className="h-20 w-20"
                  slotProps={{
                    icon: {
                      className: "h-9 w-9",
                    },
                  }}
                  {...slotProps?.thumbnail}
                />
              </div>
            </li>
          );
        }

        return (
          <li
            key={name}
            className="flex items-center gap-3  border border-gray-200 px-4 py-2"
          >
            <FileThumbnail file={file} {...slotProps?.thumbnail} />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {name}
              </p>
              <p className="text-xs text-gray-500">{fData(size)}</p>
            </div>

            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(file)}
                className="rounded p-1 hover:bg-gray-100"
              >
                <Iconify
                  width={16}
                  icon="mingcute:close-line"
                />
              </button>
            )}
          </li>
        );
      })}

      {lastNode && (
        <li className={thumbnail ? "inline-flex w-auto" : ""}>
          {lastNode}
        </li>
      )}
    </ul>
  );
}