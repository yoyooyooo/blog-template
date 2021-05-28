import React from 'react';

export const Link = ({ children, to, ...props }) => (
  <a target="_blank" rel="noopener noreferrer" href={to} {...props}>
    {children}
  </a>
);
