import React from 'react';

export const DocumentTextIconOutline = (props: React.SVGAttributes<SVGElement>) => {
  const { color = 'gray.500', ...otherProps } = props;
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...otherProps}>
      <path
        d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
        stroke={color as string}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
