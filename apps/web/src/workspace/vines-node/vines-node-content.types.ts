export interface IVinesNodeContent {
    /**
     * 颜色
     */
    color?: string;
    /**
     * 宽度
     */
    width?: number;
    /**
     * 高度
     */
    height?: number;
    /**
     * 标题
     */
    title: string;
    /**
     * 背景
     */
    background?: string;
    /**
     * 图标
     */
    icon?: string;

    [key: string]: any;
}

/**
 * 笔记节点内容
 */
export interface INoteNodeContent extends IVinesNodeContent {
    /**
     * 富文本内容 = 富文本编辑器的状态
     */
    textContent: string;
}

/**
 * 图片节点内容
 */
export interface IImageNodeContent extends IVinesNodeContent {
    /**
     * 关联的文件id
     */
    fileId: string;
    /**
     * 具体的文件信息
     */
    // file: FileItem;
    /**
     * 图片节点名称，这个名称是可以修改的
     */
    name: string;

    type: string;
    id?: string;
    rawFile?: File;
    /**
     * 关联的文件是否已经存在，不存在需要上传
     */
    existed?: boolean;
    /**
     * 直传凭证
     */
    // uploadCret?: FileUploadCredential;
    /**
     * 图片地址
     */
    image: {
        regular: string;
    };
}
