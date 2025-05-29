import { nodeStoreFactory } from '../node/node.store';
import { produceWithPatches } from '@viness/store';
import { operationFactory } from './op.factory';
import type { AtomicOperationHistory } from './operation-history';
import type { INode, INodeLocation } from '../node/node';

/**
 * Atomic Operations For the Card Board
 * 原子操作
 */
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

        const op = operationFactory.createInsertOp(node);
        const inverseOp = operationFactory.createDeleteOp(node.id);

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
                    parentNodeStore.actions.updateLocation({ headId: nextId });
                }
            }
        }

        const op = operationFactory.createDeleteOp(nodeId);
        const inverseOp = operationFactory.createInsertOp(deletedNodeStore.state.get());

        this.history.push(op, inverseOp);
    }

    move(movingNodeId: string, to: INodeLocation) {
        const movingNodeStore = nodeStoreFactory(movingNodeId);
        const movingNodeState = movingNodeStore.state.get();

        // TODO

        const inverseTo = { ...movingNodeState.location };

        const op = operationFactory.createMoveOp(movingNodeId, to);
        const inverseOp = operationFactory.createMoveOp(movingNodeId, inverseTo);

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

        const op = operationFactory.createUpdateOp(nodeId, patches);
        const inverseOp = operationFactory.createUpdateOp(nodeId, inversePatches);

        this.history.push(op, inverseOp);
    }

    /**
     * navigate between nodes
     */
    navigate() {}
}
