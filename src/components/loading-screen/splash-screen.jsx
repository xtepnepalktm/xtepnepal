'use client';

import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { AnimateLogoZoom } from '@/components/animate';

export function SplashScreen({
  portal = true,
  slotProps,
  className = '',
  ...other
}) {
  const Wrapper = portal ? PortalWrapper : Fragment;

  return (
    <Wrapper>
      <div
        className={`flex flex-1 flex-col ${className}`}
        {...slotProps?.wrapper}
      >
        <div
          className="fixed inset-0 z-[9998] flex h-full w-full items-center justify-center bg-white "
          {...other}
        >
          <AnimateLogoZoom />
        </div>
      </div>
    </Wrapper>
  );
}

// ------------------------------------------------------

function PortalWrapper({ children }) {
  if (typeof window === 'undefined') return null;
  return createPortal(children, document.body);
}