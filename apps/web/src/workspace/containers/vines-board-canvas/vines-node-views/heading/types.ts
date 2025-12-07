import { IVinesNodeContent } from '@/workspace/vines-node/vines-node-content.types';

/**
 * 标题节点内容
 */
export interface IHeadingNodeContent extends IVinesNodeContent {
    level?: number;
}

export const DEFAULT_HEADING_NODE_CONTENT: IHeadingNodeContent = {
    title: '你的标题',
    level: 1,
};

export const HEADING_NODE_TYPE = 'heading';
export const HEADING_NODE_NAME = '标题';
