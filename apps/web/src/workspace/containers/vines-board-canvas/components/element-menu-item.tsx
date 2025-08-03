import React from 'react';
import { forwardRef } from 'react';

export const ElementMenuItem = forwardRef(
  (props: { icon: React.ReactNode; name: string; mr?: boolean; onClick?: (e: any) => void }, ref: any) => {
    const { icon, onClick } = props;
    return (
      <div className="p-1 h-7 center bg-white rounded-md shadow-md cursor-pointer" ref={ref} onClick={onClick}>
        <div>{icon}</div>
      </div>
    );
  },
);
