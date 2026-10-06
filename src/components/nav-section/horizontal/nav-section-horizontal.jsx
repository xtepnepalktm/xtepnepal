// import { mergeClasses } from 'minimal-shared/utils';

// import { useTheme } from '@mui/material/styles';

// import { NavList } from './nav-list';
// import { Scrollbar } from '../../scrollbar';
// import { Nav, NavUl, NavLi } from '../components';
// import { navSectionClasses, navSectionCssVars } from '../styles';

// // ----------------------------------------------------------------------

// export function NavSectionHorizontal({
//   sx,
//   data,
//   render,
//   className,
//   slotProps,
//   currentRole,
//   enabledRootRedirect,
//   cssVars: overridesVars,
//   ...other
// }) {
//   const theme = useTheme();

//   const cssVars = { ...navSectionCssVars.horizontal(theme), ...overridesVars };

//   return (
//     <Scrollbar
//       sx={{ height: 1 }}
//       slotProps={{ contentSx: { height: 1, display: 'flex', alignItems: 'center' } }}
//     >
//       <Nav
//         className={mergeClasses([navSectionClasses.horizontal, className])}
//         sx={[
//           () => ({
//             ...cssVars,
//             height: 1,
//             mx: 'auto',
//             display: 'flex',
//             alignItems: 'center',
//             minHeight: 'var(--nav-height)',
//           }),
//           ...(Array.isArray(sx) ? sx : [sx]),
//         ]}
//         {...other}
//       >
//         <NavUl sx={{ flexDirection: 'row', gap: 'var(--nav-item-gap)' }}>
//           {data.map((group) => (
//             <Group
//               key={group.subheader ?? group.items[0].title}
//               render={render}
//               cssVars={cssVars}
//               items={group.items}
//               slotProps={slotProps}
//               currentRole={currentRole}
//               enabledRootRedirect={enabledRootRedirect}
//             />
//           ))}
//         </NavUl>
//       </Nav>
//     </Scrollbar>
//   );
// }

// // ----------------------------------------------------------------------

// function Group({ items, render, cssVars, slotProps, currentRole, enabledRootRedirect }) {
//   return (
//     <NavLi>
//       <NavUl sx={{ flexDirection: 'row', gap: 'var(--nav-item-gap)' }}>
//         {items.map((list) => (
//           <NavList
//             key={list.title}
//             depth={1}
//             data={list}
//             render={render}
//             cssVars={cssVars}
//             slotProps={slotProps}
//             currentRole={currentRole}
//             enabledRootRedirect={enabledRootRedirect}
//           />
//         ))}
//       </NavUl>
//     </NavLi>
//   );
// }
'use client';

import { NavList } from './nav-list';
import clsx from 'clsx';

// ------------------------------------------------------

export function NavSectionHorizontal({
  data,
  render,
  className,
  slotProps,
  currentRole,
  enabledRootRedirect,
  cssVars = {},
  ...other
}) {
  return (
    <nav
      className={clsx(
        'w-full flex items-center',
        'overflow-x-auto scrollbar-hide',
        'min-h-[var(--nav-height)]',
        'px-2',
        className
      )}
      style={cssVars}
      {...other}
    >
      <ul
        className="
          flex items-center
          gap-[var(--nav-item-gap)]
          whitespace-nowrap
          mx-auto
        "
      >
        {data.map((group) => (
          <Group
            key={group.subheader ?? group.items?.[0]?.title}
            items={group.items}
            render={render}
            slotProps={slotProps}
            currentRole={currentRole}
            enabledRootRedirect={enabledRootRedirect}
            cssVars={cssVars}
          />
        ))}
      </ul>
    </nav>
  );
}

// ------------------------------------------------------

function Group({
  items,
  render,
  slotProps,
  currentRole,
  enabledRootRedirect,
  cssVars,
}) {
  return (
    <li className="flex items-center">
      <ul
        className="
          flex items-center
          gap-[var(--nav-item-gap)]
        "
      >
        {items.map((item) => (
          <NavList
            key={item.title}
            data={item}
            depth={1}
            render={render}
            slotProps={slotProps}
            currentRole={currentRole}
            enabledRootRedirect={enabledRootRedirect}
            cssVars={cssVars}
          />
        ))}
      </ul>
    </li>
  );
}