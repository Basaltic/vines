import type { INodeDescription } from '../../node.interface';
import { NodeType } from '../../node-type';

export const ImageNodeDescription: INodeDescription = {
    type: NodeType.IMAGE,
    view: () => null,
    draggingView: () => null,
};
