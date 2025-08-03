export interface VinesAppLogoProps {
    showText?: boolean;
}

/**
 *
 */
export function VinesAppLogo(props: VinesAppLogoProps) {
    const { showText } = props;
    return (
        <div>
            <img className="w-12 h-12" src="/web-app-manifest-512x512.png" alt="app logo" />
        </div>
    );
}
