import React from 'react';

export const ColumnNodeIconOutline = (props: React.SVGAttributes<SVGElement> & { selected?: boolean }) => {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <path d="M3 16H21V21H3V16Z" fill="#C4C4C4" />
      <rect x="3" y="8" width="18" height="5" fill="#C4C4C4" />
      <rect x="7.5" y="3.5" width="9" height="1" rx="0.5" fill="#C4C4C4" stroke="black" />
    </svg>
  );
};
