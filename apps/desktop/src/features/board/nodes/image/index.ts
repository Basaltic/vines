import { INodeDescription } from '../../node/node';
import { NodeType } from '../../node/node-type';

export const ImageNodeDescription: INodeDescription = {
    type: NodeType.IMAGE,
    view: () => null,
    draggingView: () => null,
};
