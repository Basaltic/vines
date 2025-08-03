import PhotographIcon from '@heroicons/react/24/outline/PhotoIcon';
import type { IImageNodeContent } from '../../../../vines-node/vines-node-content';
import type { VinesNodeDescriptor } from '../../../../vines-node/vines-node-descriptor.types';
import { defaultContent } from './constants';
import { ImageElementMenuView } from './image-element-menu-view';
import { ImageElementView } from './image-element-view';

export const imageElement: VinesNodeDescriptor<IImageNodeContent> = {
    type: 'image',
    name: '图片',
    defaultContent,
    view: ImageElementView,
    menuView: ImageElementMenuView,
    icon: PhotographIcon,
};
