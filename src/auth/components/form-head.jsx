// ----------------------------------------------------------------------

export function FormHead({ className = '', icon, title, description, ...other }) {
  return (
    <>
      {icon && (
        <span className="mb-6 mx-auto inline-flex">
          {icon}
        </span>
      )}

      <div
        className={`flex flex-col gap-1.5 text-center whitespace-pre-line ${className}`}
        {...other}
      >
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

        {description && (
          <p className="text-sm font-medium text-gray-500">{description}</p>
        )}
      </div>
    </>
  );
}