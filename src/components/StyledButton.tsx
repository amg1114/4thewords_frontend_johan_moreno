import { forwardRef } from 'react';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}
const StyledButton = forwardRef<HTMLButtonElement, StyledButtonProps>(({ className, ...props }, ref) => {
  const baseClasses =
    'rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50';
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <button className={combinedClasses} {...props} ref={ref}>
      {props.children}
    </button>
  );
});

StyledButton.displayName = 'StyledButton';

export default StyledButton;
