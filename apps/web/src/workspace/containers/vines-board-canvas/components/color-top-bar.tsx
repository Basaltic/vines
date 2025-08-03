
/**
 * 有颜色的线
 * @returns
 */
export function ColorTopBar(props: { color?: string }) {
  const { color } = props;

  return (
    <div
      className="absolute top-0 left-0 w-full"
      style={{
        height: 2,
        backgroundColor: color || 'transparent',
      }}
    />
  );
}
