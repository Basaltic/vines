import type React from 'react';

export type SvgIconProps = React.SVGAttributes<any>;

export const SvgIcon = (props: SvgIconProps & { children: React.ReactNode }) => {
    return (
        <svg focusable={false} fill="none" {...props} style={{ ...props.style, width: '1em', height: '1em' }}>
            {props.children}
        </svg>
    );
};
