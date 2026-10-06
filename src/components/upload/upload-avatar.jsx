
// import { useState, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import { mergeClasses } from "minimal-shared/utils";

// import { Image } from "../image";
// import { Iconify } from "../iconify";
// import { uploadClasses } from "./classes";
// import { RejectionFiles } from "./components/rejection-files";

// // ----------------------------------------------------------------------

// export function UploadAvatar({
//   error,
//   value,
//   disabled,
//   helperText,
//   className,
//   ...other
// }) {
//   const {
//     getRootProps,
//     getInputProps,
//     isDragActive,
//     isDragReject,
//     fileRejections,
//   } = useDropzone({
//     multiple: false,
//     disabled,
//     accept: { "image/*": [] },
//     ...other,
//   });

//   const hasFile = !!value;
//   const hasError = isDragReject || !!error;

//   const [preview, setPreview] = useState("");

//   useEffect(() => {
//     if (typeof value === "string") {
//       setPreview(value);
//     } else if (value instanceof File) {
//       const objectUrl = URL.createObjectURL(value);
//       setPreview(objectUrl);

//       return () => URL.revokeObjectURL(objectUrl);
//     }
//   }, [value]);

//   return (
//     <>
//       <div
//         {...getRootProps()}
//         className={mergeClasses([
//           uploadClasses.uploadBox,
//           "group relative mx-auto h-36 w-36 cursor-pointer overflow-hidden rounded-full border border-dashed p-1",
//           hasError ? "border-red-500" : "border-gray-300",
//           isDragActive && "opacity-70",
//           disabled && "pointer-events-none opacity-50",
//           className,
//         ])}
//       >
//         <input {...getInputProps()} />

//         <div className="relative h-full w-full overflow-hidden rounded-full">
//           {/* Preview */}
//           {hasFile && (
//             <Image
//               alt="Avatar"
//               src={preview}
//               className="h-full w-full rounded-full object-cover"
//             />
//           )}

//           {/* Placeholder Overlay */}
//           <div
//             className={mergeClasses([
//               "upload-placeholder absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 rounded-full transition-opacity duration-200",
//               hasError
//                 ? "bg-red-500/10 text-red-500"
//                 : "bg-gray-500/10 text-gray-400",
//               hasFile
//                 ? "bg-black/60 text-white opacity-0 group-hover:opacity-100"
//                 : "opacity-100 hover:opacity-70",
//             ])}
//           >
//             <Iconify
//               icon="solar:camera-add-bold"
//               width={32}
//             />

//             <span className="text-xs">
//               {hasFile ? "Update photo" : "Upload photo"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {helperText}

//       {!!fileRejections.length && (
//         <RejectionFiles files={fileRejections} />
//       )}
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { mergeClasses } from "minimal-shared/utils";

import { Image } from "../image";
import { Iconify } from "../iconify";
import { uploadClasses } from "./classes";
import { RejectionFiles } from "./components/rejection-files";

// ── Design tokens ──
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function UploadAvatar({ error, value, disabled, helperText, className, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    disabled,
    accept: { "image/*": [] },
    ...other,
  });

  const hasFile = !!value;
  const hasError = isDragReject || !!error;

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  return (
    <>
      {/* Square dropzone */}
      <div
        {...getRootProps()}
        className={mergeClasses([uploadClasses.uploadBox, className])}
        style={{
          position: "relative",
          width: 120, height: 120,
          margin: "0 auto",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          border: `1px dashed ${hasError ? RED : isDragActive ? TEXT : BORDER}`,
          backgroundColor: isDragActive ? BG : hasError ? `${RED}08` : BG,
          overflow: "hidden",
          transition: "border-color 0.15s, background-color 0.15s",
          flexShrink: 0,
        }}
      >
        <input {...getInputProps()} />

        {/* Preview image */}
        {hasFile && (
          <Image
            alt="Avatar"
            src={preview}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}

        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "0.375rem",
          backgroundColor: hasFile
            ? "rgba(0,0,0,0.55)"
            : hasError ? `${RED}12` : "transparent",
          color: hasFile ? "#fff" : hasError ? RED : TEXT_MUTED,
          opacity: hasFile ? 0 : 1,
          transition: "opacity 0.15s",
        }}
          onMouseEnter={(e) => { if (hasFile) e.currentTarget.style.opacity = 1; }}
          onMouseLeave={(e) => { if (hasFile) e.currentTarget.style.opacity = 0; }}
        >
          <Iconify
            icon="solar:camera-add-bold"
            style={{ width: 24, height: 24 }}
          />
          <span style={{
            fontFamily: "Helvetica",
            fontSize: 9, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            {hasFile ? "Update" : "Upload"}
          </span>
        </div>
      </div>

      {/* Helper text */}
      {helperText && (
        <div style={{
          marginTop: "0.625rem",
          textAlign: "center",
          fontFamily: "Helvetica",
          fontSize: 9, fontWeight: 600,
          letterSpacing: "0.08em",
          color: TEXT_MUTED, lineHeight: 1.8,
        }}>
          {helperText}
        </div>
      )}

      {!!fileRejections.length && <RejectionFiles files={fileRejections} />}
    </>
  );
}