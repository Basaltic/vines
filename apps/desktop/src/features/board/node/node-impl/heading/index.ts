import type { INodeDescription } from '../../node.interface';
import { NodeType } from '../../node-type';
import { HeadingView } from './heading.view';

export const headingNodeDescription: INodeDescription = {
    type: NodeType.HEADING,
    view: HeadingView,
    draggingView: HeadingView,
};
