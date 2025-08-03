import type { Patch } from '@vines/store';
import { nanoid } from 'nanoid';
import type { IVinesNode } from '../../../workspace/vines-node/vines-node.interface';
import {
    type IDeleteOp,
    type IInsertOp,
    type IMoveOp,
    type INavigateOp,
    type IUpdateContentOp,
    OpLocation,
    OpType,
} from './vines-graph-operation.interface';

/**
 * 操作对象 工厂类
 */
export const OpFactory = {
    createInsertOp(node: IVinesNode, to: OpLocation): IInsertOp {
        return { id: nanoid(), type: OpType.Insert, payload: { node, to } };
    },

    createDeleteOp(nodeId: string): IDeleteOp {
        return { id: nanoid(), type: OpType.Delete, payload: { nodeId } };
    },

    createUpdateContentOp(nodeId: string, changes: Patch[]): IUpdateContentOp {
        return { id: nanoid(), type: OpType.UpdateContent, payload: { nodeId, changes } };
    },

    createNavigateOp(nodeId: string): INavigateOp {
        return { id: nanoid(), type: OpType.Navigate, payload: { nodeId } };
    },

    createMoveOp(nodeId: string, to: OpLocation): IMoveOp {
        return { id: nanoid(), type: OpType.Move, payload: { nodeId, to } };
    },
};
