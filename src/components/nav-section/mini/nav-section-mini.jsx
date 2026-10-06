// import { mergeClasses } from 'minimal-shared/utils';

// import { useTheme } from '@mui/material/styles';

// import { NavList } from './nav-list';
// import { Nav, NavUl, NavLi } from '../components';
// import { navSectionClasses, navSectionCssVars } from '../styles';

// // ----------------------------------------------------------------------

// export function NavSectionMini({
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

//   const cssVars = { ...navSectionCssVars.mini(theme), ...overridesVars };

//   return (
//     <Nav
//       className={mergeClasses([navSectionClasses.mini, className])}
//       sx={[{ ...cssVars }, ...(Array.isArray(sx) ? sx : [sx])]}
//       {...other}
//     >
//       <NavUl sx={{ flex: '1 1 auto', gap: 'var(--nav-item-gap)' }}>
//         {data.map((group) => (
//           <Group
//             key={group.subheader ?? group.items[0].title}
//             render={render}
//             cssVars={cssVars}
//             items={group.items}
//             slotProps={slotProps}
//             currentRole={currentRole}
//             enabledRootRedirect={enabledRootRedirect}
//           />
//         ))}
//       </NavUl>
//     </Nav>
//   );
// }

// // ----------------------------------------------------------------------

// function Group({ items, render, cssVars, slotProps, currentRole, enabledRootRedirect }) {
//   return (
//     <NavLi>
//       <NavUl sx={{ gap: 'var(--nav-item-gap)' }}>
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

import clsx from 'clsx';

import { NavList } from './nav-list';

// ------------------------------------------------------

export function NavSectionMini({
  sx,
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
        'flex flex-col h-full',
        className
      )}
      style={cssVars}
      {...other}
    >
      <ul
        className="
          flex flex-col flex-1
          gap-[var(--nav-item-gap)]
        "
      >
        {data.map((group) => (
          <Group
            key={group.subheader ?? group.items[0].title}
            items={group.items}
            render={render}
            cssVars={cssVars}
            slotProps={slotProps}
            currentRole={currentRole}
            enabledRootRedirect={enabledRootRedirect}
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
  cssVars,
  slotProps,
  currentRole,
  enabledRootRedirect,
}) {
  return (
    <li className="list-none">
      <ul className="flex flex-col gap-[var(--nav-item-gap)]">
        {items.map((item) => (
          <NavList
            key={item.title}
            depth={1}
            data={item}
            render={render}
            cssVars={cssVars}
            slotProps={slotProps}
            currentRole={currentRole}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
      </ul>
    </li>
  );
}