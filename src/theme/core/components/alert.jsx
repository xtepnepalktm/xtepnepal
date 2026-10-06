import React from 'react';

// ----------------------------------------------------------------------

/**
 * Icons
 */
const AlertInfoIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
      clipRule="evenodd"
    />
  </svg>
);

const AlertSuccessIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0"
      clipRule="evenodd"
    />
  </svg>
);

const AlertWarningIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.312 10.762C8.23 5.587 9.689 3 12 3c2.31 0 3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022zM12 7.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      clipRule="evenodd"
    />
  </svg>
);

const AlertErrorIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.843 3.802C9.872 2.601 10.886 2 12 2c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594c-.557.99-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22c-1.114 0-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7c.557-.99 1.571-1.59 3.6-2.792zM13 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-1-9.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75"
      clipRule="evenodd"
    />
  </svg>
);

// ----------------------------------------------------------------------

const ICONS = {
  info: <AlertInfoIcon className="w-6 h-6" />,
  success: <AlertSuccessIcon className="w-6 h-6" />,
  warning: <AlertWarningIcon className="w-6 h-6" />,
  error: <AlertErrorIcon className="w-6 h-6" />,
};

const VARIANTS = {
  standard: {
    info: 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100',
    success: 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
    warning: 'bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100',
    error: 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100',
  },
  filled: {
    info: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-orange-500 text-white',
    error: 'bg-red-500 text-white',
  },
  outlined: {
    info: 'bg-blue-500/10 text-blue-800 border border-blue-500/20 dark:text-blue-200',
    success: 'bg-green-500/10 text-green-800 border border-green-500/20 dark:text-green-200',
    warning: 'bg-orange-500/10 text-orange-800 border border-orange-500/20 dark:text-orange-200',
    error: 'bg-red-500/10 text-red-800 border border-red-500/20 dark:text-red-200',
  }
};

const ICON_COLORS = {
  standard: {
    info: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-orange-600 dark:text-orange-400',
    error: 'text-red-600 dark:text-red-400',
  },
  filled: {
    info: 'text-white',
    success: 'text-white',
    warning: 'text-white',
    error: 'text-white',
  },
  outlined: {
    info: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-orange-600 dark:text-orange-400',
    error: 'text-red-600 dark:text-red-400',
  }
};

export function Alert({
  severity = 'info',
  variant = 'standard',
  icon,
  children,
  onClose,
  className = ''
}) {
  const baseClasses = 'flex p-4  text-sm transition-colors';
  const variantClasses = VARIANTS[variant]?.[severity] || VARIANTS.standard.info;
  const iconClasses = ICON_COLORS[variant]?.[severity] || ICON_COLORS.standard.info;

  const renderIcon = icon !== false ? (icon || ICONS[severity]) : null;

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} role="alert">
      {renderIcon && (
        <div className={`mr-3 shrink-0 ${iconClasses}`}>
          {renderIcon}
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-3 shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function AlertTitle({ children, className = '' }) {
  return (
    <div className={`mb-1 font-semibold ${className}`}>
      {children}
    </div>
  );
}

