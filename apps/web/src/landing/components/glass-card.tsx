export type TGlassCardProps = {
    color: string;
    /**
     * 透明度，0-1
     */
    transparency: number;
    blur: number;
    className?: string;
};

export const GlassCard = (props: TGlassCardProps) => {
    const { transparency, blur } = props;

    return (
        <div
            style={{
                background: `rgba(20, 141, 47, ${transparency})`,
                borderRadius: 16,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: `blur(${blur}px)`,
                border: '1px solid rgba(20, 141, 47, 0.3)',
            }}
        />
    );
};
