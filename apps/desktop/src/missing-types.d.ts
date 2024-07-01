// 这些模块没有 types 文件
declare module 'colorthief';

// global window
import type TauriAPI from '@tauri-apps/api';
declare global {
    interface Window {
        __TAURI__?: typeof TauriAPI;
    }
}
