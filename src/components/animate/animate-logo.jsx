import { m } from 'framer-motion';
import { forwardRef } from 'react';

import { Logo } from '../logo';

// ----------------------------------------------------------------------

export const AnimateLogoZoom = forwardRef((props, ref) => {
  const { logo, slotProps, className = '', ...other } = props;

  return (
    <div
      ref={ref}
      className={`relative inline-flex items-center justify-center w-[120px] h-[120px] ${className}`}
      {...other}
    >
      <m.span
        animate={{ scale: [1, 0.9, 0.9, 1, 1], opacity: [1, 0.48, 0.48, 1, 1] }}
        transition={{
          duration: 2,
          repeatDelay: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {logo ?? (
          <Logo
            disabled
            {...slotProps?.logo}
            sx={[
              { width: 64, height: 64 },
              ...(Array.isArray(slotProps?.logo?.sx)
                ? (slotProps?.logo?.sx ?? [])
                : [slotProps?.logo?.sx]),
            ]}
          />
        )}
      </m.span>

      {/* Primary outline */}
      <m.span
        className="absolute rounded-none border-[3px]"
        style={{
          width: 'calc(100% - 20px)',
          height: 'calc(100% - 20px)',
          borderColor: 'color-mix(in srgb, var(--vendor-primary-color, var(--palette-primary-dark)) 24%, transparent)',
        }}
        animate={{
          scale: [1.6, 1, 1, 1.6, 1.6],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
      />

      {/* Secondary outline */}
      <m.span
        className="absolute w-full h-full rounded-none border-[8px]"
        style={{
          borderColor: 'color-mix(in srgb, var(--vendor-secondary-color, var(--palette-primary-dark)) 24%, transparent)',
        }}
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
      />
    </div>
  );
});

// ----------------------------------------------------------------------

export const AnimateLogoRotate = forwardRef((props, ref) => {
  const { logo, className = '', slotProps, ...other } = props;

  return (
    <div
      ref={ref}
      className={`relative inline-flex items-center justify-center w-20 h-20 ${className}`}
      {...other}
    >
      {logo ?? (
        <Logo
          {...slotProps?.logo}
          sx={[
            { zIndex: 9, width: 50, height: 50 },
            ...(Array.isArray(slotProps?.logo?.sx)
              ? (slotProps?.logo?.sx ?? [])
              : [slotProps?.logo?.sx]),
          ]}
        />
      )}

      {/* Rotating background */}
      <m.span
        className="absolute w-full h-full rounded-full opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, transparent 50%, var(--vendor-primary-color, var(--palette-primary-main)) 100%)',
          transition: 'opacity 200ms ease-in-out',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
      />
    </div>
  );
});