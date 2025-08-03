import type React from 'react';

export function UnknowFileIcon(props: React.SVGAttributes<SVGElement>) {
    const { color = '#D1D3D6' } = props;

    return (
        <svg fill="none" width="32px" height="40px" viewBox="0 0 32 40" {...props}>
            <g fill="none" fillRule="evenodd">
                <path
                    fill={color as string}
                    d="M23.172 0a2 2 0 0 1 1.414.586l6.828 6.828A2 2 0 0 1 32 8.828V36a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h19.172zM22 1.5H4A2.5 2.5 0 0 0 1.5 4v32A2.5 2.5 0 0 0 4 38.5h24a2.5 2.5 0 0 0 2.5-2.5V10H22V1.5zm1.525.146l-.025-.021V8.5h6.877l-6.852-6.854z"
                />
            </g>
        </svg>
    );
}
