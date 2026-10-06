
'use client';

import { Fragment } from 'react';
import { createPortal } from 'react-dom';

export function LoadingScreen({ portal = false, className = '', ...other }) {
  const Wrapper = portal ? PortalWrapper : Fragment;

  return (
    <Wrapper>
      <div
        className={`flex flex-1 min-h-screen w-full items-center justify-center px-5 ${className}`}
        {...other}
      >
        <div className="w-full max-w-[360px]">
          <div className="h-1 w-full overflow-hidden rounded bg-gray-200">
            <div className="h-full w-1/2 animate-pulse bg-gray-500" />
          </div>
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