import clsx from 'clsx';
import { forwardRef } from 'react';

interface StyledTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errors?: string;
}

const StyledTextarea = forwardRef<HTMLTextAreaElement, StyledTextareaProps>(
  ({ label, errors, className, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <textarea
          ref={ref}
          className={clsx(
            'w-full resize-y rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50',
            {
              'border-red-500': errors && errors.length > 0,
              'border-gray-300': !errors || errors.length === 0,
            },
            className
          )}
          {...props}
        />
        {errors && errors.length > 0 && <span className="text-sm text-red-500">{errors}</span>}
      </div>
    );
  }
);

StyledTextarea.displayName = 'StyledTextarea';

export default StyledTextarea;
