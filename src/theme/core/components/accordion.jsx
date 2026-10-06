'use client';

import React, { useState } from 'react';

// ----------------------------------------------------------------------

export function Accordion({ children, disabled = false, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div
      data-expanded={expanded}
      data-disabled={disabled}
      className={`
        bg-transparent transition-all
        data-[expanded=true]:shadow-[0_8px_16px_0_rgba(145,158,171,0.16)] data-[expanded=true]: data-[expanded=true]:bg-white dark:data-[expanded=true]:bg-gray-800
        data-[disabled=true]:bg-transparent
      `}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            expanded,
            disabled,
            // @ts-ignore
            onToggle: () => !disabled && setExpanded(!expanded),
          });
        }
        return child;
      })}
    </div>
  );
}

// ----------------------------------------------------------------------

export function AccordionSummary({ children, expanded, disabled, onToggle, expandIcon }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`
        w-full flex items-center justify-between
        pl-4 pr-2 py-3
        disabled:opacity-100 disabled:text-gray-400 disabled:cursor-not-allowed
      `}
    >
      <span className="text-inherit text-left flex-1">{children}</span>

      {expandIcon && (
        <span
          className={`text-inherit transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          {expandIcon}
        </span>
      )}
    </button>
  );
}
