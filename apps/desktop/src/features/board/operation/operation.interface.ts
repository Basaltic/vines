import { Patch } from '@viness/store';
import { NodeType } from '../node/node-type';
import { INode, INodeLocation } from '../node/node';

export enum OperationType {
    INSERT = 'insert',
    DELETE = 'delete',
    UPDATE = 'update',
    NAVIGATE = 'navigate',
    MOVE = 'move',
}

/**
 * Board Operations
 */
export interface AtomicOperation<OT = OperationType> {
    /**
     * node id
     */
    nodeId: string;
    /**
     * operation type
     */
    operationType: OT;
}

/**
 * Create/Insert New Node
 */
export interface InsertAtomicOperation<C = any> extends AtomicOperation<OperationType.INSERT> {
    /**
     * node id
     */
    nodeId: string;
    /**
     * 节点类型
     */
    nodeType: NodeType;

    /**
     * 所在位置信息
     */
    location: INodeLocation;
    /**
     * 初始化内容
     */
    content: C;
}

/**
 * 删除节点操作
 */
export interface DeleteAtomicOperation extends AtomicOperation<OperationType.DELETE> {
    /**
     * 被删除的节点
     */
    nodeId: string;
}

/**
 * 移动操作
 */
export interface MoveAtomicOperation extends AtomicOperation<OperationType.MOVE> {
    /**
     * 被移动的节点
     */
    nodeId: string;
    /**
     * 来自什么位置
     */
    from: INodeLocation;
    /**
     * 移至什么位置
     */
    to: INodeLocation;
}

/**
 * 画板节点导航操作
 */
export interface NavigateAtomicOperation extends AtomicOperation<OperationType.NAVIGATE> {
    /**
     * 导航到的节点id
     */
    nodeId: string;
}

/**
 * 内容更新操作
 */
export interface UpdateAtomicOperation<C = any> extends AtomicOperation<OperationType.UPDATE> {
    /**
     * 需要更新的节点id
     */
    nodeId: string;
    /**
     * 是否是本地内容更改
     */
    isLocalContentChange: boolean;
    /**
     * 需要修改的字段和值
     * 其属性和不同节点类型的内容属性的一部分
     */
    data: Partial<C>;
}

export interface IOperation<O = OperationType, P = {}> {
    id: string;
    type: O;
    payload: P;
}

/**
 * 插入操作，纯粹新增一个节点，并不在意其是否被链入
 */
export type IMoveOperation = IOperation<OperationType.MOVE, { nodeId: string; to: INodeLocation }>;
export type IInsertOperation = IOperation<OperationType.INSERT, INode>;
export type IDeleteOperation = IOperation<OperationType.DELETE, { nodeId: string }>;
export type IUpdateOperation = IOperation<OperationType.UPDATE, { nodeId: string; changes: Patch[] }>;
export type INavigateOperation = IOperation<OperationType.NAVIGATE, { nodeId: string }>;

// [redo, undo]
export type IOperationGroup = [IOperation, IOperation];
export type IMutation = IOperationGroup[];
