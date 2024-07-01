/**
 * 节点类型
 */
export enum NodeType {
    /**
     *
     */
    ROOT = 'root',

    /**  */
    HEADING = 'heading',

    /**
     * 任务列表
     */
    TASK = 'task',

    /**
     * 外部网站链接
     */
    LINK = 'link',

    /**
     * 普通文件，未被识别出
     */
    FILE = 'file',

    /**
     * 图片
     */
    IMAGE = 'image',

    /**
     * 视频
     */
    VIDEO = 'video',

    /**
     * 公式
     */
    FORMULA = 'formula',

    /** 普通富文本笔记 */
    // NOTE = 'note',
}

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(Number(k))) as K[];
}

const nodeDragItemTypeFromMenu: string[] = [];
const nodeDragItemTypeFromBoard: string[] = [];
const nodeDragItemTypeFromTrash: string[] = [];
const nodeDragItemTypeFromColumn: string[] = [];

for (const key of enumKeys(NodeType)) {
    const type = NodeType[key];
    nodeDragItemTypeFromMenu.push(`${type}_menu`);
    nodeDragItemTypeFromBoard.push(`${type}_board`);
    nodeDragItemTypeFromTrash.push(`${type}_trash`);
    nodeDragItemTypeFromColumn.push(`${type}_column`);
}

export { nodeDragItemTypeFromMenu, nodeDragItemTypeFromBoard, nodeDragItemTypeFromTrash, nodeDragItemTypeFromColumn };
