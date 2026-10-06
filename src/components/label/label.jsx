import { forwardRef } from 'react';
import { upperFirst } from 'es-toolkit';
import { mergeClasses } from 'minimal-shared/utils';
import clsx from 'clsx';

import { labelClasses } from './classes';

// ----------------------------------------------------------------------

function getLabelClasses({ color = 'default', variant = 'filled', disabled }) {
  const base =
    'inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-default min-w-[24px] h-6 px-2 text-[12px] font-bold transition-all duration-200';

  const isDefault = color === 'default';

  const styles = {
    // ---------------- DEFAULT COLOR ----------------
    default: {
      filled: 'bg-black text-white dark:bg-gray-200 dark:text-gray-800',
      outlined: 'bg-transparent text-black border-2 border-black',
      soft: 'bg-gray-200/50 text-gray-600',
      inverted: 'bg-gray-300 text-gray-800',
    },

    // ---------------- THEME COLORS ----------------
    primary: {
      filled: 'bg-blue-600 text-white',
      outlined: 'bg-transparent text-blue-600 border-2 border-blue-600',
      soft: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
      inverted: 'bg-blue-100 text-blue-900',
    },

    secondary: {
      filled: 'bg-purple-600 text-white',
      outlined: 'bg-transparent text-purple-600 border-2 border-purple-600',
      soft: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
      inverted: 'bg-purple-100 text-purple-900',
    },

    success: {
      filled: 'bg-green-600 text-white',
      outlined: 'bg-transparent text-green-600 border-2 border-green-600',
      soft: 'bg-green-500/10 text-green-700 dark:text-green-300',
      inverted: 'bg-green-100 text-green-900',
    },

    error: {
      filled: 'bg-red-600 text-white',
      outlined: 'bg-transparent text-red-600 border-2 border-red-600',
      soft: 'bg-red-500/10 text-red-700 dark:text-red-300',
      inverted: 'bg-red-100 text-red-900',
    },
  };

  const variantClass =
    styles[color]?.[variant] ||
    styles.default[variant] ||
    styles.default.filled;

  return clsx(
    base,
    variantClass,
    disabled && 'opacity-50 pointer-events-none'
  );
}

export function LabelIcon({ children, className = '' }) {
  return (
    <span className={clsx('w-4 h-4 flex-shrink-0', className)}>
      <span className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
        {children}
      </span>
    </span>
  );
}

export const Label = forwardRef((props, ref) => {
  const {
    endIcon,
    children,
    startIcon,
    className,
    disabled,
    variant = 'soft',
    color = 'default',
    sx,
    ...other
  } = props;

  return (
    <span
      ref={ref}
      className={clsx(getLabelClasses({ color, variant, disabled }), className)}
      {...other}
    >
      {startIcon && <LabelIcon className={labelClasses.icon}>{startIcon}</LabelIcon>}

      {typeof children === 'string' ? upperFirst(children) : children}

      {endIcon && <LabelIcon className={labelClasses.icon}>{endIcon}</LabelIcon>}
    </span>
  );
});
