import '@/common/components/editor/editor.scss';
import { NoteIconOutline } from '@/common/components/icons/node/note-icon';
import type { INoteNodeContent } from '../../../../vines-node/vines-node-content';
import type { VinesNodeDescriptor } from '../../../../vines-node/vines-node-descriptor.types';
import { DEFAULT_CARD_CONTENT } from './constants';
import { NoteElementMenuView } from './note-element-menu-view';
import { NoteElementViewInBoard, NoteElementViewInDragging } from './note-element-view';

export const noteCardDescriptor: VinesNodeDescriptor<INoteNodeContent> = {
    type: 'note',
    name: '笔记',
    defaultContent: DEFAULT_CARD_CONTENT,
    view: {
        default: NoteElementViewInBoard,
        dragging: NoteElementViewInDragging,
    },
    menuView: NoteElementMenuView,
    icon: NoteIconOutline,
};
