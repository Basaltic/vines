import type { Patch } from '@vines/store';
import { nanoid } from 'nanoid';
import type { IVinesNode } from '../../../workspace/graph/vines-node.interface';
import {
    type IDeleteOp,
    type IInsertOp,
    type IMoveOp,
    type INavigateOp,
    type IUpdateContentOp,
    OpLocation,
    VinesGraphOperationType,
} from './vines-graph-operation.interface';

/**
 * 操作对象 工厂类
 */
export const VinesGraphOperationFactory = {
    createInsertOp(node: IVinesNode, to: OpLocation): IInsertOp {
        return { id: nanoid(), type: VinesGraphOperationType.Insert, payload: { node, to } };
    },

    createDeleteOp(nodeId: string): IDeleteOp {
        return { id: nanoid(), type: VinesGraphOperationType.Delete, payload: { nodeId } };
    },

    createUpdateContentOp(nodeId: string, changes: Patch[]): IUpdateContentOp {
        return { id: nanoid(), type: VinesGraphOperationType.UpdateContent, payload: { nodeId, changes } };
    },

    createNavigateOp(nodeId: string): INavigateOp {
        return { id: nanoid(), type: VinesGraphOperationType.Navigate, payload: { nodeId } };
    },

    createMoveOp(nodeId: string, to: OpLocation): IMoveOp {
        return { id: nanoid(), type: VinesGraphOperationType.Move, payload: { nodeId, to } };
    },
};
