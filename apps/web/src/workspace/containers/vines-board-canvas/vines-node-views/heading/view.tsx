import { memo, useRef } from 'react';
import { useDragSelectMouseConflictHandler } from '@/common/components/drag-to-select/hooks/use-drag-select-mouse-conflict-handler';
import { NoteIconOutline } from '@/common/components/icons/node/note-icon';
import { useCommands } from '@/workspace/graph/use-commands';
import { VinesNodeViewProps } from '@/workspace/graph/vines-node-descriptor.types';
import { useVinesNode } from '@/workspace/graph/vines-node-graph.hooks';
import { EditableTitle } from '../../components/editable-title';
import { ElementMenuItem } from '../../components/element-menu-item';
import { useDragCreation } from '../../hooks/use-drag-creation';
import { HEADING_NODE_TYPE, IHeadingNodeContent } from './types';

export const HeadingNodeViewInBoard = memo((props: VinesNodeViewProps) => {
    const { id } = props;

    const commands = useCommands();
    const vinesNode = useVinesNode<IHeadingNodeContent>(id);

    const title = vinesNode.content.title || '';

    const handleTitleEnter = (newTitle: string) => {
        commands.updateNodeContent({ nodeId: vinesNode.id, content: { title: newTitle } });
    };

    return (
        <div>
            <EditableTitle title={title} onEnter={handleTitleEnter} />
        </div>
    );
});

export const HeadingNodeViewInDragging = memo((props: VinesNodeViewProps) => {
    const { id } = props;

    const vinesNode = useVinesNode<IHeadingNodeContent>(id);

    const title = vinesNode.content.title || '';

    return <div>{title}</div>;
});

/**
 * 创建、拖拽 创意画板工具栏按钮
 * @returns
 */
export function HeadingNodeViewInMenu() {
    const containerRef = useRef<HTMLDivElement>(null);

    const commands = useCommands();

    useDragSelectMouseConflictHandler(containerRef);
    useDragCreation(containerRef, HEADING_NODE_TYPE);

    /**
     * 创建 Heading 标题 节点
     */
    const createNote = () => {
        commands.insertNode({ type: HEADING_NODE_TYPE });
    };

    return <ElementMenuItem ref={containerRef} icon={<NoteIconOutline className="w-6 h-6" />} name="笔记" onClick={createNote} />;
}
