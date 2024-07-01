import { nodeStoreFactory } from '../store/node.store';
import { produceWithPatches } from '@viness/store';
import { OperationFactory } from './op.factory';
import { AtomicOperationHistory } from './operation-history';
import { INode, INodeLocation } from '../node/node';

export class AtomicOperations {
    constructor(private history: AtomicOperationHistory) {}

    /**
     * insert a new node to the board
     */
    insert(node: INode) {
        if (node.location.prevId) {
        } else if (node.location.nextId) {
        }
        // put to the last
        else if (node.location.upperId) {
        } else {
            return;
        }

        const op = OperationFactory.createInsertOp(node);
        const inverseOp = OperationFactory.createDeleteOp(node.id);

        this.history.push(op, inverseOp);
    }

    /**
     * permenant delete node
     *
     * @param nodeId
     */
    delete(nodeId: string) {
        const deletedNodeStore = nodeStoreFactory(nodeId);
        const deletedNodeState = deletedNodeStore.state.get();
        // clear all the relationship of this node
        if (deletedNodeState.location) {
            const { prevId, nextId, upperId: parentId } = deletedNodeState.location;

            if (prevId) {
                const prevNodeStore = nodeStoreFactory(prevId);
                prevNodeStore.actions.updateLocation({ nextId: nextId });
            } else if (nextId) {
                const nextNodeStore = nodeStoreFactory(nextId);
                nextNodeStore.actions.updateLocation({ prevId: prevId });

                if (parentId) {
                    const parentNodeStore = nodeStoreFactory(parentId);
                    parentNodeStore.actions.updateLocation({ lowerHeadId: nextId });
                }
            }
        }

        const op = OperationFactory.createDeleteOp(nodeId);
        const inverseOp = OperationFactory.createInsertOp(deletedNodeStore.state.get());

        this.history.push(op, inverseOp);
    }

    move(movingNodeId: string, to: INodeLocation) {
        const movingNodeStore = nodeStoreFactory(movingNodeId);
        const movingNodeState = movingNodeStore.state.get();

        // TODO

        const inverseTo = { ...movingNodeState.location };

        const op = OperationFactory.createMoveOp(movingNodeId, to);
        const inverseOp = OperationFactory.createMoveOp(movingNodeId, inverseTo);

        this.history.push(op, inverseOp);
    }

    /**
     * update data in the node
     *
     * @param nodeId
     * @param callback
     */
    update(nodeId: string, callback: (data: any) => void) {
        const nodeStore = nodeStoreFactory(nodeId);
        const { state, actions } = nodeStore;

        const { data } = state.get();

        const [nextData, patches, inversePatches] = produceWithPatches(data, callback);

        actions.changeData(nextData);

        const op = OperationFactory.createUpdateOp(nodeId, patches);
        const inverseOp = OperationFactory.createUpdateOp(nodeId, inversePatches);

        this.history.push(op, inverseOp);
    }

    /**
     * navigate between nodes
     */
    navigate() {}
}
