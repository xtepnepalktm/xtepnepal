
'use client';

import { mergeClasses } from 'minimal-shared/utils';

import { layoutClasses } from '../core/classes';

// ----------------------------------------------------------------------

export function SimpleCompactContent({
  sx,
  children,
  className,
  layoutQuery = 'md',
  ...other
}) {
  const baseClasses = mergeClasses([
    layoutClasses.content,
    className,
    'w-full mx-auto flex flex-1 flex-col text-center',
    'px-2 pt-3 pb-10', // equivalent of theme.spacing(3,2,10,2)
    `max-w-[var(--layout-simple-content-compact-width)]`,
  ]);

  const responsiveClasses =
    layoutQuery === 'md'
      ? 'md:justify-center md:py-10 md:px-0'
      : `${layoutQuery}:justify-center ${layoutQuery}:py-10 ${layoutQuery}:px-0`;

  return (
    <div className={`${baseClasses} ${responsiveClasses}`} {...other}>
      {children}
    </div>
  );
}