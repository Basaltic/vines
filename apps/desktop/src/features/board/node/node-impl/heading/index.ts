import type { INodeDescription } from '../../node';
import { NodeType } from '../../node-type';

export const ImageNodeDescription: INodeDescription = {
    type: NodeType.HEADING,
    view: () => null,
    draggingView: () => null,
};
