import '@milkdown/kit/prose/view/style/prosemirror.css';

import { NoteIconOutline } from '@/common/components/icons/node/note-icon';
import { createVinesNodeDescriptor } from '@/workspace/graph/vines-node-factory';
import type { INoteNodeContent } from '../../../../graph/vines-node-content.types';
import type { VinesNodeDescriptor } from '../../../../graph/vines-node-descriptor.types';
import { DEFAULT_CARD_CONTENT } from './constants';
import { NoteElementMenuView } from './note-element-menu-view';
import { NoteElementViewInBoard, NoteElementViewInDragging } from './note-element-view';

export const noteCardDescriptor: VinesNodeDescriptor<INoteNodeContent> = createVinesNodeDescriptor('note', '笔记', DEFAULT_CARD_CONTENT, {
    default: NoteElementViewInBoard,
    dragging: NoteElementViewInDragging,
    menu: NoteElementMenuView,
    icon: NoteIconOutline,
});
