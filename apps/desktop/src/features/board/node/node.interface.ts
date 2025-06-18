import type { FC } from 'react';
import type { NodeType } from './node-type';

/**
 * The
 */
export interface INodeLocation {
    /**
     * x
     */
    x?: number;
    /**
     * y
     */
    y?: number;
    /**
     * Previous sibling node id
     */
    prevId?: string | null;
    /**
     * Next sibling node id
     */
    nextId?: string | null;
    /**
     * Parent node id
     */
    upperId?: string | null;
    /**
     * Child head node id
     */
    headId?: string | null;

    [key: string]: any;
}

export interface INode<T extends object = object> {
    id: string;
    type: string | NodeType;
    data?: T;
    location: INodeLocation;
}

export interface INodeViewProps {
    id: string;
}

export interface INodeDescription<T extends object = object> {
    /**
     * Node Type
     */
    type: string | NodeType;
    /**
     * The default data for the node
     */
    defaultData?: T;
    /**
     * Menu
     */
    menu?: {
        /**
         *
         */
        where?: string;
        icon?: any;
    };
    /**
     * default board view
     */
    view: FC<INodeViewProps>;
    /**
     * the view when dragging
     */
    draggingView: FC<INodeViewProps>;
}
