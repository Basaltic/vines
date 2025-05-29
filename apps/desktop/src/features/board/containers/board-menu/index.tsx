import { useBoard } from '../../board.setup';

export function BoardMenu() {
    const board = useBoard();

    const add = () => {
        board.commands.insertNode('heading', {});
    };

    return (
        <div className="fixed bottom-20 left-1 z-50">
            <button type="button" onClick={add}>
                add
            </button>
        </div>
    );
}
