import React from 'react';

type StyledSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  errors?: string;
};

const StyledSelect = React.forwardRef<HTMLSelectElement, StyledSelectProps>(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {rest.label && <label className="text-sm font-medium text-gray-700">{rest.label}</label>}
        <select
          ref={ref}
          className={`rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${className}`}
          {...rest}
        >
          {children}
        </select>
        {rest.errors && rest.errors.length > 0 && <span className="text-sm text-red-500">{rest.errors}</span>}
      </div>
    );
  }
);

StyledSelect.displayName = 'StyledSelect';

export default StyledSelect;
