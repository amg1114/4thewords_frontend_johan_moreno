import clsx from 'clsx';
import { forwardRef } from 'react';

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
}

const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>((props, ref) => {
  return (
    <div className={clsx('flex flex-col space-y-1')}>
      {props.label && <label className="text-sm font-medium text-gray-700">{props.label}</label>}
      <input
        ref={ref}
        className={clsx(
          'rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50',
          {
            'border-red-500': props.errors && props.errors.length > 0,
            'border-gray-300': !props.errors || props.errors.length === 0,
          }
        )}
        {...props}
      />
      {props.errors && props.errors.length > 0 && <span className="text-sm text-red-500">{props.errors}</span>}
    </div>
  );
});

StyledInput.displayName = 'StyledInput';

export default StyledInput;
