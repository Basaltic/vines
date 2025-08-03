import { IOp, OpType } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';

export interface IOperation {
    execute(): Promise<IOperationResult>;
}

export interface IOperationFactory {
    type: OpType;
    create(uid: string, op: IOp): IOperation;
}

export interface IOperationResult {
    /**
     * 哪个操作
     */
    id: string;
    type: OpType;
    success: boolean;
    data: any;
}
