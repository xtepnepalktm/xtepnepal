// import Link from '@mui/material/Link';
// import { styled } from '@mui/material/styles';

// // ----------------------------------------------------------------------

// export function MoreLinks({ links, sx, ...other }) {
//   return (
//     <MoreLinksRoot sx={sx} {...other}>
//       {links?.map((href) => (
//         <li key={href}>
//           <Link href={href} variant="body2" target="_blank" rel="noopener">
//             {href}
//           </Link>
//         </li>
//       ))}
//     </MoreLinksRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const MoreLinksRoot = styled('ul')(() => ({
//   display: 'flex',
//   flexDirection: 'column',
//   '& > li': { display: 'flex' },
// }));
'use client';

import clsx from 'clsx';

export function MoreLinks({ links = [], className = '', ...props }) {
  return (
    <ul
      {...props}
      className={clsx(
        'flex flex-col gap-0',
        className
      )}
    >
      {links.map((href) => (
        <li key={href} className="flex">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm text-blue-600 hover:text-blue-800
              transition-colors
              break-all
            "
          >
            {href}
          </a>
        </li>
      ))}
    </ul>
  );
}