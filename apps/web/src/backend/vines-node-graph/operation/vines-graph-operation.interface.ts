import type { Patch } from '@vines/store';
import { VinesNodeBaseLocationEntity } from '@/backend/vines-node-graph/vines-node.do';
import type { IVinesNode } from '../../../workspace/vines-node/vines-node.interface';

export enum OpType {
    Insert = 'insert',
    Delete = 'delete',
    UpdateContent = 'update-content',
    Navigate = 'navigate',
    Move = 'move',
}

export interface IOp<O = OpType, P = Record<string, any>> {
    id: string;
    type: O;
    payload: P;
}

export type OpLocation = VinesNodeBaseLocationEntity & {
    prev?: string;
    next?: string;
};

/**
 * 插入操作，纯粹新增一个节点，并不在意其是否被链入
 */
export type IMoveOp = IOp<OpType.Move, { nodeId: string; to: OpLocation }>;
export type IInsertOp = IOp<OpType.Insert, { node: IVinesNode; to: OpLocation }>;
export type IDeleteOp = IOp<OpType.Delete, { nodeId: string }>;
export type IUpdateContentOp = IOp<OpType.UpdateContent, { nodeId: string; changes: Patch[] }>;
export type INavigateOp = IOp<OpType.Navigate, { nodeId: string }>;

export type IOpGroup = { redoOp: IOp; undoOp: IOp };
export type IMutation = IOpGroup[];
