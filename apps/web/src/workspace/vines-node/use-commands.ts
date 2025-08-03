import { useInject } from '@viness/core';
import { useEffect } from 'react';
import { VinesBoardEditorCommands } from './vines-board-commands';

export function useCommands() {
    const commands = useInject(VinesBoardEditorCommands);
    return commands;
}

export function useBoardOperationSyncer() {
    const commands = useCommands();

    useEffect(() => {
        commands.startSync();

        return () => {
            commands.stopSync();
        };
    }, []);
}
