/**
 * Keyboard Item
 */
export function KeyboardItem(props: { keys: string[] }) {
    const { keys } = props;

    const kbds = [];

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        kbds.push(<span key={key}>{key}</span>);
        if (i < keys.length - 1) {
            kbds.push(' + ');
        }
    }

    return <div className="text-slate-500">{kbds}</div>;
}
