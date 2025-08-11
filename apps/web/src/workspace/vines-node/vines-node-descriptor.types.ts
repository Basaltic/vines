import type React from 'react';
import type { IVinesNodeContent } from './vines-node-content';

/**
 * 从画板中拖拽元素的参数
 */
export type VinesNodeDragItemFromBoard = {
    /**
     * 被拖拽的节点ID
     */
    draggingNodeId: string;
    /**
     * 是否被选中的状态
     */
    isSelected: boolean;
    isNew?: boolean;
    type: string;
};

/**
 * 从看板中拖拽出来的元素的参数
 */
export type VinesNodeDragItemFromColumn = {
    /**
     * 被拖拽的节点ID
     */
    draggingNodeId: string;
    /**
     * 是否被选中的状态
     */
    isSelected: boolean;
};

/**
 * 从菜单中拖拽出来的元素的参数 - 代表着新建元素
 */
export type VinesNodeDragItemFromMenu = {
    /**
     * 需要新建的节点的类型
     */
    type: string;
    isNew?: boolean;
};

/**
 * 从回收站中拖拽出来的元素的参数
 */
export type VinesNodeDragItemFromTrash = {
    /**
     * 被拖拽的节点ID
     */
    draggingNodeId: string;
};

/**
 * 元素定义
 */
export type VinesNodeDescriptor<C extends IVinesNodeContent = IVinesNodeContent> = {
    /**
     * 元素的类型
     */
    type: string;

    /**
     * 默认内容
     */
    defaultContent: C;
    /**
     * 元素的名字
     */
    name: string;
    /**
     * 图标
     */
    icon: React.FC<React.SVGAttributes<SVGElement>>;
    /**
     * 元素的展示视图
     */
    view: {
        default: React.FC<VinesNodeViewProps>;
        dragging: React.FC<VinesNodeViewProps>;
    };
    /**
     * 创建菜单视图
     */
    menuView: React.FC;
    /**
     * 自定义的右击菜单视图
     */
    contextMenuView?: React.FC;
};

/**
 * Define the place where the element view display
 */
export type TWhere = 'default' | 'board' | 'column' | 'dragging' | 'trash';

/**
 * 元素视图属性
 */
export type VinesNodeViewProps = {
    /**
     * id
     */
    id: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 视图展示在何处
     */
    where?: TWhere;
    /**
     * 是否被选中
     */
    isSelected: boolean;
    /**
     * 是否可以变更尺寸
     */
    isResizable?: boolean;
    /**
     * 表示该元素是否是在其他元素中的状态
     */
    isInside?: boolean;
    /**
     * 是否处于拖拽中
     */
    isDragging?: boolean;
    /**
     * 表示是不是新创建中移动的节点，默认为false
     */
    isNew?: boolean;
};
