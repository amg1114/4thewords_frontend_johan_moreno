import React, { type AnchorHTMLAttributes } from 'react';
import { Link as RouterLink } from 'react-router'; // o next/link si usas Next.js

type StyledLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  to?: string;
};

const StyledLink = React.forwardRef<HTMLAnchorElement, StyledLinkProps>(
  ({ children, href, to, className = '', ...rest }, ref) => {
    if (!href && !to) {
      throw new Error('StyledLink requires either `href` or `to` prop');
    }
    if (href && to) {
      throw new Error('StyledLink cannot receive both `href` and `to`');
    }

    const sharedProps = {
      ref,
      className: `text-blue-600 hover:underline transition ${className}`,
      ...rest,
    };

    if (href) {
      return (
        <a href={href} {...sharedProps}>
          {children}
        </a>
      );
    }

    return (
      <RouterLink to={to!} {...sharedProps}>
        {children}
      </RouterLink>
    );
  }
);

StyledLink.displayName = 'StyledLink';

export default StyledLink;
