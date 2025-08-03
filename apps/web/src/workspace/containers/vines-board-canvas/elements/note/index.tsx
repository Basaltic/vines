import '@/common/components/editor/editor.scss';
import { NoteIconOutline } from '@/common/components/icons/node/note-icon';
import type { INoteNodeContent } from '../../../../vines-node/vines-node-content';
import type { VinesNodeDescriptor } from '../../../../vines-node/vines-node-descriptor.types';
import { defaultContent } from './constants';
import { NoteElementMenuView } from './note-element-menu-view';
import { NoteElementView } from './note-element-view';

export const noteNodeDescriptor: VinesNodeDescriptor<INoteNodeContent> = {
    type: 'note',
    defaultContent,
    name: '笔记',
    view: NoteElementView,
    menuView: NoteElementMenuView,
    icon: NoteIconOutline,
};
