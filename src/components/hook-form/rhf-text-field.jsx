
import { Controller, useFormContext } from 'react-hook-form';
import {
  transformValue,
  transformValueOnBlur,
  transformValueOnChange,
} from 'minimal-shared/utils';

// ----------------------------------------------------------------------

export function RHFTextField({
  name,
  helperText,
  type = 'text',
  className = '',
  inputClassName = '',
  label,
  fullWidth,
  slotProps,
  InputProps,
  InputLabelProps,
  multiline = false,
  rows,
  size,
  ...other
}) {
  const { control } = useFormContext();

  const isNumberType = type === 'number';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const fieldClassName = [
          'w-full rounded-md border px-3 py-2 text-sm outline-none transition',
          'bg-white text-gray-900 border border-gray-300 focus:border-gray-500 focus:ring-1',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : '',
          inputClassName,
        ].join(' ');

        return (
          <div className={`w-full ${className}`}>
            {label && (
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
              </label>
            )}

            {multiline ? (
              <textarea
                {...field}
                rows={rows || 3}
                value={field.value ?? ''}
                onChange={(event) => field.onChange(event.target.value)}
                onBlur={(event) => field.onChange(event.target.value)}
                className={fieldClassName}
                {...other}
              />
            ) : (
              <input
                {...field}
                type={isNumberType ? 'text' : type}
                value={
                  isNumberType ? transformValue(field.value) : (field.value ?? '')
                }
                onChange={(event) => {
                  const transformedValue = isNumberType
                    ? transformValueOnChange(event.target.value)
                    : event.target.value;

                  field.onChange(transformedValue);
                }}
                onBlur={(event) => {
                  const transformedValue = isNumberType
                    ? transformValueOnBlur(event.target.value)
                    : event.target.value;

                  field.onChange(transformedValue);
                }}
                autoComplete="off"
                inputMode={isNumberType ? 'decimal' : undefined}
                pattern={isNumberType ? '[0-9]*\\.?[0-9]*' : undefined}
                className={fieldClassName}
                {...other}
              />
            )}

            {(error?.message || helperText) && (
              <p
                className={`mt-1 text-xs ${error?.message ? 'text-red-500' : 'text-gray-500'
                  }`}
              >
                {error?.message || helperText}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}