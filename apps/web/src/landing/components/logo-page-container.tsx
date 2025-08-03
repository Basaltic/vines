import { LogoV2Icon } from '../../common/components/icons/logo';

export function LogoPageContainer(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <div className="h-full hero min-h-screen">
            <div className="absolute top-2 left-4 flex items-center">
                <div className="w-fit flex items-center w-">
                    <LogoV2Icon className="w-12 h-12" />
                    <h1 className="text-2xl w-24">葡萄记</h1>
                </div>
            </div>
            <div className="hero-content text-center h-full">
                <div className="max-w-md">{children}</div>
            </div>
        </div>
    );
}
