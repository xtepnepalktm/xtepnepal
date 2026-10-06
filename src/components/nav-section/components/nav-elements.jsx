// import { mergeClasses } from 'minimal-shared/utils';

// import { styled } from '@mui/material/styles';

// import { navSectionClasses } from '../styles';

// // ----------------------------------------------------------------------

// export const Nav = styled('nav')``;

// // ----------------------------------------------------------------------

// export const NavLi = styled(
//   (props) => <li {...props} className={mergeClasses([navSectionClasses.li, props.className])} />,
//   { shouldForwardProp: (prop) => !['disabled', 'sx'].includes(prop) }
// )(() => ({
//   display: 'inline-block',
//   variants: [{ props: { disabled: true }, style: { cursor: 'not-allowed' } }],
// }));

// // ----------------------------------------------------------------------

// export const NavUl = styled((props) => (
//   <ul {...props} className={mergeClasses([navSectionClasses.ul, props.className])} />
// ))(() => ({ display: 'flex', flexDirection: 'column' }));
'use client';

import clsx from 'clsx';
import { navSectionClasses } from '../styles';

// ------------------------------------------------------
// NAV wrapper
// ------------------------------------------------------

export function Nav({ className = '', ...props }) {
  return (
    <nav
      className={clsx('block', className)}
      {...props}
    />
  );
}

// ------------------------------------------------------
// NAV UL
// ------------------------------------------------------

export function NavUl({ className = '', ...props }) {
  return (
    <ul
      className={clsx(
        navSectionClasses.ul,
        'flex flex-col',
        className
      )}
      {...props}
    />
  );
}

// ------------------------------------------------------
// NAV LI
// ------------------------------------------------------

export function NavLi({
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <li
      className={clsx(
        navSectionClasses.li,
        'inline-block',
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
      {...props}
    />
  );
}