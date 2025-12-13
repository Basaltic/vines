import { IOp, VinesGraphOperationType } from '@/backend/vines-node-graph/operation/vines-graph-operation.interface';

export interface IOperation {
    execute(): Promise<IOperationResult>;
}

export interface IOperationFactory {
    type: VinesGraphOperationType;
    create(uid: string, op: IOp): IOperation;
}

export interface IOperationResult {
    /**
     * 哪个操作
     */
    id: string;
    type: VinesGraphOperationType;
    success: boolean;
    data: any;
}
