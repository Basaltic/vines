import { BaseEntity } from '../common/base.do';

export type VinesNodeBaseLocationEntity = {
    /**
     * 画板中x轴位置
     */
    x?: number;
    /**
     * 画板中y轴位置
     */
    y?: number;
    /**
     * 上层节点
     */
    above?: string | null;
    /**
     * 顺序
     */
    order?: string | null;
};

export type VinesNodeEntity = BaseEntity &
    VinesNodeBaseLocationEntity & {
        /**
         * Unique id of the node
         */
        id: string;
        /**
         * Type of the node
         */
        type: string;

        /**
         * Content of the nnode
         */
        content?: any;
    };
