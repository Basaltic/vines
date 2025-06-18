import { cardBoardEditor } from '../../board';

export function BoardMenu() {
    const add = () => {
        cardBoardEditor.commands.insertNode('heading', {});
    };

    return (
        <div className="fixed bottom-20 left-1 z-50">
            <button type="button" onClick={add}>
                add
            </button>
        </div>
    );
}
