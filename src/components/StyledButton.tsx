import { forwardRef } from 'react';
import clsx from 'clsx';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const StyledButton = forwardRef<HTMLButtonElement, StyledButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const baseClasses =
      'rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors';

    const variantClasses = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
      secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400',
    };

    return (
      <button ref={ref} className={clsx(baseClasses, variantClasses[variant], className)} {...props}>
        {children}
      </button>
    );
  }
);

StyledButton.displayName = 'StyledButton';

export default StyledButton;
