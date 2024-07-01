import { INodeDescription } from './node';

export class NodeDescriptionRegistry {
    private map = new Map<string, INodeDescription>();

    get(id: string) {
        return this.map.get(id);
    }

    register(nodeDesc: INodeDescription) {
        this.map.set(nodeDesc.type, nodeDesc);
    }
}
