// import { styled } from '@mui/material/styles';
// import Collapse from '@mui/material/Collapse';

// import { navSectionClasses } from '../styles';

// // ----------------------------------------------------------------------

// export const NavCollapse = styled(Collapse, {
//   shouldForwardProp: (prop) => !['depth', 'sx'].includes(prop),
// })(({ depth, theme }) => {
//   const verticalLineStyles = {
//     top: 0,
//     left: 0,
//     width: '2px',
//     content: '""',
//     position: 'absolute',
//     backgroundColor: 'var(--nav-bullet-light-color)',
//     bottom: 'calc(var(--nav-item-sub-height) - 2px - var(--nav-bullet-size) / 2)',
//     ...theme.applyStyles('dark', {
//       backgroundColor: 'var(--nav-bullet-dark-color)',
//     }),
//   };

//   return {
//     ...(depth && {
//       ...(depth + 1 !== 1 && {
//         paddingLeft: 'calc(var(--nav-item-pl) + var(--nav-icon-size) / 2)',
//         [`& .${navSectionClasses.ul}`]: {
//           position: 'relative',
//           paddingLeft: 'var(--nav-bullet-size)',
//           '&::before': verticalLineStyles,
//         },
//       }),
//     }),
//   };
// });
'use client';

import { Fragment } from 'react';
import clsx from 'clsx';
import { navSectionClasses } from '../styles';

// ------------------------------------------------------

export function NavCollapse({
  open,
  depth = 0,
  children,
  className = '',
}) {
  const hasDepthStyle = depth && depth + 1 !== 1;

  return (
    <div
      className={clsx(
        'transition-all duration-200 overflow-hidden',
        open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
        className
      )}
    >
      <div
        className={clsx(
          hasDepthStyle &&
          'pl-[calc(var(--nav-item-pl)+var(--nav-icon-size)/2)]'
        )}
      >
        <ul
          className={clsx(
            navSectionClasses.ul,
            'relative',
            hasDepthStyle && 'pl-[var(--nav-bullet-size)]'
          )}
        >
          {/* vertical line equivalent */}
          {hasDepthStyle && (
            <span
              className="
                absolute top-0 left-0 w-[2px]
                bg-[var(--nav-bullet-light-color)]
                dark:bg-[var(--nav-bullet-dark-color)]
                bottom-[calc(var(--nav-item-sub-height)-2px-var(--nav-bullet-size)/2)]
              "
            />
          )}

          {children}
        </ul>
      </div>
    </div>
  );
}