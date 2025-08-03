import React from 'react';

export const ChevronRightIcon = (props: React.SVGAttributes<SVGElement>) => {
  const { color = 'gray.500', ...otherProps } = props;

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...otherProps}>
      <path d="M9 5L16 12L9 19" stroke={color as string} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
