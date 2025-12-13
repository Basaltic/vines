import { useRef } from 'react';
import { useCommands } from '@/workspace/graph/use-commands';
import { useDragSelectMouseConflictHandler } from '../../../../../common/components/drag-to-select/hooks/use-drag-select-mouse-conflict-handler';
import { NoteIconOutline } from '../../../../../common/components/icons/node/note-icon';
import { ElementMenuItem } from '../../components/element-menu-item';
import { useDragCreation } from '../../hooks/use-drag-creation';

/**
 * 创建、拖拽 创意画板工具栏按钮
 * @returns
 */
export function NoteElementMenuView() {
    const containerRef = useRef<HTMLDivElement>(null);

    const commands = useCommands();

    useDragSelectMouseConflictHandler(containerRef);
    useDragCreation(containerRef, 'note');

    /**
     * 创建 笔记 节点
     */
    const createNote = () => {
        commands.insertNode({ type: 'note' });
    };

    return <ElementMenuItem ref={containerRef} icon={<NoteIconOutline className="w-6 h-6" />} name="笔记" onClick={createNote} />;
}
