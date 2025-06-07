export interface IAppSettings {
    /**
     * App UI Theme
     * 应用 UI 展示主题
     *
     * @default 'system'
     */
    theme: 'light' | 'dark' | 'system';
    /**
     * App Storage Path
     * 应用数据存储路径，由用户初次使用的时候制定。后续也可以更改
     */
    storagePath: string;
}
