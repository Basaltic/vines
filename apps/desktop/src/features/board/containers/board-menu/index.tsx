import { Button } from '@viness/ui/components/button';
import { useBoard } from '../../board.setup';

export function BoardMenu() {
    const board = useBoard();

    const add = () => {
        board.commands.insertNode('heading', {});
    };

    return (
        <div className="fixed bottom-20 left-1 z-50">
            <Button onClick={add}>add</Button>
        </div>
    );
}
