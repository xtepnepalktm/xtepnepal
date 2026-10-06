
"use client";

import { mergeClasses } from "minimal-shared/utils";
import { layoutClasses } from "../core/classes";

export function MainSection({ children, className = "", ...other }) {
  return (
    <main
      className={mergeClasses([
        layoutClasses.main,
        "flex flex-col flex-1",
        className,
      ])}
      {...other}
    >
      {children}
    </main>
  );
}