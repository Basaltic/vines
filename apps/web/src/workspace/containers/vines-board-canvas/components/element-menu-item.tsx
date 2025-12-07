import React, { forwardRef } from 'react';

export const ElementMenuItem = forwardRef(
    (props: { icon: React.ReactNode; name: string; mr?: boolean; onClick?: (e: any) => void }, ref: any) => {
        const { icon, onClick } = props;
        return (
            <div className="rounded-md hover:bg-blue-500 cursor-pointer" ref={ref} onClick={onClick}>
                <div>{icon}</div>
            </div>
        );
    },
);
