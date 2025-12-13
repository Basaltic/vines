import { useHotkeys } from 'react-hotkeys-hook';
import { useCommands } from '@/workspace/graph/use-commands';

/**
 * 快捷键
 */
export default function useVinesBoardHotKeys() {
    const commands = useCommands();

    useHotkeys('ctrl+z, command+z', () => {
        commands.undo();
    });

    useHotkeys('ctrl+y, command+y', () => {
        commands.redo();
    });

    useHotkeys('delete', () => {
        // commands.moveSelectedToTrash();
    }, [commands]);
}
