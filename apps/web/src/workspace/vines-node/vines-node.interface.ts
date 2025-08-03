import { BaseEntity } from '@/backend/common/base.do';
import { VinesNodeBaseLocationEntity } from '@/backend/vines-node-graph/vines-node.do';
import type { IVinesNodeContent } from './vines-node-content';

/**
 * 节点
 */
export type IVinesNode<C extends IVinesNodeContent = IVinesNodeContent> = Partial<BaseEntity> &
    VinesNodeBaseLocationEntity & {
        /**
         * 节点的id
         */
        id: string;
        /**
         * 节点类型
         */
        type: string;
        /**
         * 节点的内容，会同步到远程
         */
        content: C;
    };
