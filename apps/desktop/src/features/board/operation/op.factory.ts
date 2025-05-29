import type { Patch } from '@viness/store';
import { nanoid } from 'nanoid';
import {
    type IDeleteOperation,
    type IInsertOperation,
    type IMoveOperation,
    type INavigateOperation,
    type IUpdateOperation,
    OperationType,
} from './operation.interface';
import type { INode, INodeLocation } from '../node/node';

/**
 * A factory to create atomic operation instance
 */
export const operationFactory = {
    createInsertOp(node: INode): IInsertOperation {
        return { id: nanoid(), type: OperationType.INSERT, payload: node };
    },

    createDeleteOp(nodeId: string): IDeleteOperation {
        return { id: nanoid(), type: OperationType.DELETE, payload: { nodeId } };
    },

    createUpdateOp(nodeId: string, changes: Patch[]): IUpdateOperation {
        return { id: nanoid(), type: OperationType.UPDATE, payload: { nodeId, changes } };
    },

    createMoveOp(nodeId: string, to: INodeLocation): IMoveOperation {
        return { id: nanoid(), type: OperationType.MOVE, payload: { nodeId, to } };
    },

    createNavigateOp(nodeId: string): INavigateOperation {
        return { id: nanoid(), type: OperationType.NAVIGATE, payload: { nodeId } };
    },
};
