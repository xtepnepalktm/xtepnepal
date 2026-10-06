// import { inputLabelClasses } from '@mui/material/InputLabel';

// // ----------------------------------------------------------------------

// const MuiFormLabel = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ theme }) => ({
//       ...theme.typography.body2,
//       color: theme.vars.palette.text.disabled,
//       [`&.${inputLabelClasses.shrink}`]: {
//         ...theme.typography.body1,
//         fontWeight: 600,
//         color: theme.vars.palette.text.secondary,
//         [`&.${inputLabelClasses.focused}`]: { color: theme.vars.palette.text.primary },
//         [`&.${inputLabelClasses.error}`]: { color: theme.vars.palette.error.main },
//         [`&.${inputLabelClasses.disabled}`]: { color: theme.vars.palette.text.disabled },
//         [`&.${inputLabelClasses.filled}`]: { transform: 'translate(12px, 6px) scale(0.75)' },
//       },
//     }),
//   },
// };

// // ----------------------------------------------------------------------

// const MuiFormHelperText = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: { component: 'div' },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: { root: ({ theme }) => ({ marginTop: theme.spacing(1) }) },
// };

// // ----------------------------------------------------------------------

// const MuiFormControlLabel = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: { label: ({ theme }) => ({ ...theme.typography.body2 }) },
// };

// // ----------------------------------------------------------------------

// export const form = { MuiFormLabel, MuiFormHelperText, MuiFormControlLabel };
// ----------------------------------------------------------------------
// Tailwind Version of MUI Form Components
// ----------------------------------------------------------------------

export const formStyles = {
  // ------------------------------------------------------------------
  // Form Label
  // ------------------------------------------------------------------

  label: `
        text-sm
        text-gray-400
        transition-all
        duration-200
    `,

  labelShrink: `
        text-base
        font-semibold
        text-gray-600
    `,

  labelFocused: `
        text-gray-900
    `,

  labelError: `
        text-red-600
    `,

  labelDisabled: `
        text-gray-400
    `,

  labelFilled: `
        translate-x-[12px]
        translate-y-[6px]
        scale-75
    `,

  // ------------------------------------------------------------------
  // Form Helper Text
  // ------------------------------------------------------------------

  helperText: `
        mt-2
        text-sm
        text-gray-500
    `,

  helperTextError: `
        text-red-600
    `,

  helperTextDisabled: `
        text-gray-400
    `,

  // ------------------------------------------------------------------
  // Form Control Label
  // ------------------------------------------------------------------

  controlLabel: `
        text-sm
        text-gray-700
    `,
};

// ----------------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------------

export const getFormLabelClass = ({
  shrink = false,
  focused = false,
  error = false,
  disabled = false,
  filled = false,
}) => {
  const classes = [formStyles.label];

  if (shrink) {
    classes.push(formStyles.labelShrink);
  }

  if (focused) {
    classes.push(formStyles.labelFocused);
  }

  if (error) {
    classes.push(formStyles.labelError);
  }

  if (disabled) {
    classes.push(formStyles.labelDisabled);
  }

  if (filled) {
    classes.push(formStyles.labelFilled);
  }

  return classes.join(" ");
};

export const getHelperTextClass = ({
  error = false,
  disabled = false,
}) => {
  const classes = [formStyles.helperText];

  if (error) {
    classes.push(
      formStyles.helperTextError
    );
  }

  if (disabled) {
    classes.push(
      formStyles.helperTextDisabled
    );
  }

  return classes.join(" ");
};

// ----------------------------------------------------------------------
// Example Components
// ----------------------------------------------------------------------

export function FormLabel({
  children,
  shrink,
  focused,
  error,
  disabled,
  filled,
}) {
  return (
    <label
      className={getFormLabelClass({
        shrink,
        focused,
        error,
        disabled,
        filled,
      })}
    >
      {children}
    </label>
  );
}

export function FormHelperText({
  children,
  error,
  disabled,
}) {
  return (
    <div
      className={getHelperTextClass({
        error,
        disabled,
      })}
    >
      {children}
    </div>
  );
}

export function FormControlLabel({
  label,
  control,
}) {
  return (
    <label
      className={formStyles.controlLabel}
    >
      <div className="flex items-center gap-2">
        {control}
        <span>{label}</span>
      </div>
    </label>
  );
}