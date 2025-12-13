import { NoteIconOutline } from '@/common/components/icons/node/note-icon';
import { createVinesNodeDescriptor } from '@/workspace/graph/vines-node-factory';
import { DEFAULT_HEADING_NODE_CONTENT, HEADING_NODE_NAME, HEADING_NODE_TYPE, IHeadingNodeContent } from './types';
import { HeadingNodeViewInBoard, HeadingNodeViewInDragging, HeadingNodeViewInMenu } from './view';

export const headingNodeDescriptor = createVinesNodeDescriptor<IHeadingNodeContent>(
    HEADING_NODE_TYPE,
    HEADING_NODE_NAME,
    DEFAULT_HEADING_NODE_CONTENT,
    {
        default: HeadingNodeViewInBoard,
        dragging: HeadingNodeViewInDragging,
        menu: HeadingNodeViewInMenu,
        icon: NoteIconOutline,
    },
);
