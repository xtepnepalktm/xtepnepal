// import { forwardRef } from 'react';
// import SimpleBar from 'simplebar-react';
// import { mergeClasses } from 'minimal-shared/utils';

// import { styled } from '@mui/material/styles';

// import { scrollbarClasses } from './classes';

// // ----------------------------------------------------------------------

// export const Scrollbar = forwardRef((props, ref) => {
//   const { slotProps, children, fillContent = true, className, sx, ...other } = props;

//   return (
//     <ScrollbarRoot
//       scrollableNodeProps={{ ref }}
//       clickOnTrack={false}
//       fillContent={fillContent}
//       className={mergeClasses([scrollbarClasses.root, className])}
//       sx={[
//         {
//           '& .simplebar-wrapper': slotProps?.wrapperSx,
//           '& .simplebar-content-wrapper': slotProps?.contentWrapperSx,
//           '& .simplebar-content': slotProps?.contentSx,
//         },
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       {children}
//     </ScrollbarRoot>
//   );
// });

// // ----------------------------------------------------------------------

// const ScrollbarRoot = styled(SimpleBar, {
//   shouldForwardProp: (prop) => !['fillContent', 'sx'].includes(prop),
// })(({ fillContent }) => ({
//   minWidth: 0,
//   minHeight: 0,
//   flexGrow: 1,
//   display: 'flex',
//   flexDirection: 'column',
//   ...(fillContent && {
//     '& .simplebar-content': {
//       display: 'flex',
//       flex: '1 1 auto',
//       minHeight: '100%',
//       flexDirection: 'column',
//     },
//   }),
// }));
'use client';

import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';
import clsx from 'clsx';

// ------------------------------------------------------

export const Scrollbar = forwardRef(function Scrollbar(props, ref) {
  const {
    children,
    className,
    fillContent = true,
    slotProps,
    ...other
  } = props;

  return (
    <SimpleBar
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      className={clsx(
        'min-w-0 min-h-0 flex flex-col flex-1',
        className
      )}
      {...other}
    >
      {/* WRAPPER (SimpleBar internal override) */}
      <div
        className={clsx(
          'simplebar-wrapper',
          slotProps?.wrapperClassName
        )}
      >
        {/* CONTENT WRAPPER */}
        <div
          className={clsx(
            'simplebar-content-wrapper',
            slotProps?.contentWrapperClassName
          )}
        >
          {/* CONTENT */}
          <div
            className={clsx(
              'simplebar-content',
              'flex flex-col',
              fillContent && 'flex-1 min-h-full',
              slotProps?.contentClassName
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </SimpleBar>
  );
});