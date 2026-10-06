
import { mergeClasses } from "minimal-shared/utils";

import { UploadIllustration } from "@/assets/illustrations";

export function UploadPlaceholder({ className = "", ...other }) {
  return (
    <div
      className={mergeClasses([
        "flex flex-col items-center justify-center",
        className,
      ])}
      {...other}
    >
      <UploadIllustration hideBackground className="w-[200px]" />

      <div className="flex flex-col gap-1 text-center">
        <div className="text-lg font-semibold text-gray-900">
          Drop or select file
        </div>

        <div className="text-sm text-gray-500">
          Drop files here or click to
          <span className="mx-1 text-primary underline">browse</span>
          through your machine.
        </div>
      </div>
    </div>
  );
}