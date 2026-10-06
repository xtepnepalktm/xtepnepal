
import { Controller, useFormContext } from 'react-hook-form';
import { HelperText } from './help-text';
import { Upload, UploadBox, UploadAvatar } from '../upload';

// ----------------------------------------------------------------------

export function RHFUploadAvatar({
  name,
  className = '',
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onDrop = (acceptedFiles) => {
          const value = acceptedFiles?.[0];
          setValue(name, value, { shouldValidate: true });
        };

        return (
          <div className={`w-full ${className}`}>
            <div className="flex justify-center">
              <UploadAvatar
                value={field.value}
                error={!!error}
                onDrop={onDrop}
                {...other}
              />
            </div>

            <HelperText
              errorMessage={error?.message}
              sx={{ textAlign: 'center' }}
            />
          </div>
        );
      }}
    />
  );
}

export function RHFUploadBox({
  name,
  className = '',
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox
          value={field.value}
          error={!!error}
          className={className}
          {...other}
        />
      )}
    />
  );
}

export function RHFUpload({
  name,
  multiple,
  helperText,
  className = '',
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const uploadProps = {
          multiple,
          accept: { 'image/*': [] },
          error: !!error,
          helperText: error?.message ?? helperText,
        };

        const onDrop = (acceptedFiles) => {
          const value = multiple
            ? [...(field.value || []), ...acceptedFiles]
            : acceptedFiles?.[0];

          setValue(name, value, { shouldValidate: true });
        };

        return (
          <Upload
            {...uploadProps}
            value={field.value}
            onDrop={onDrop}
            className={className}
            {...other}
          />
        );
      }}
    />
  );
}