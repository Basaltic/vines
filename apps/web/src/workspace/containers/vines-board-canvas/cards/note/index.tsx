import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

import { NoteIconOutline } from '@/common/components/icons/node/note-icon';
import { createVinesNodeDescriptor } from '@/workspace/vines-node/vines-node-factory';
import type { INoteNodeContent } from '../../../../vines-node/vines-node-content';
import type { VinesNodeDescriptor } from '../../../../vines-node/vines-node-descriptor.types';
import { DEFAULT_CARD_CONTENT } from './constants';
import { NoteElementMenuView } from './note-element-menu-view';
import { NoteElementViewInBoard, NoteElementViewInDragging } from './note-element-view';

export const noteCardDescriptor: VinesNodeDescriptor<INoteNodeContent> = createVinesNodeDescriptor('note', '笔记', DEFAULT_CARD_CONTENT, {
    default: NoteElementViewInBoard,
    dragging: NoteElementViewInDragging,
    menu: NoteElementMenuView,
    icon: NoteIconOutline,
});
