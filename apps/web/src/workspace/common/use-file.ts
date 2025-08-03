import { useInject } from '@vines/core';
import type { ChangeEvent } from 'react';
import { hashFileIncrementally } from '../../common/utils/hash';
import { getImageInfo } from '../../common/utils/image';
import { FileCache } from './cache/file-cache';

// import { useCommands } from './use-commands';

const imageMimeTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

/**
 * 文件祥光操作
 */
export function useFile() {
    // const commands = useCommands();

    const fileCache = useInject(FileCache);

    /**
     * 创建文件
     *
     * @param file
     * @returns
     */
    const createFile = async (file: File) => {
        const info = await getImageInfo(file);
        const hash = await hashFileIncrementally(file);

        return undefined;
    };

    /**
     * 上传文件
     *
     * @param id
     * @param cret
     */
    const uploadFile = async (id: string) => {
        try {
            const rawFile = fileCache.get(id);
            if (rawFile) {
                return true;
            }
        } catch (e) {
            return false;
        }
    };

    /**
     * 创建文件元素
     */
    const createFileElement = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];

            // 1. 先创建文件
            const fileRes = await createFile(file);

            // if (fileRes) {
            //     if (isImage(fileRes.file.type)) {
            //         const content: IImageNodeContent = {
            //             name: file.name,
            //             type: file.type,
            //             file: fileRes.file,
            //             fileId: fileRes.file.id,
            //             existed: fileRes?.existed,
            //             uploadCret: fileRes?.cret,
            //             image: {
            //                 regular: URL.createObjectURL(file),
            //             },
            //         };
            //         commands.insertNode({ type: VinesNodeType.IMAGE, defaultContent: content });
            //     } else {
            //         const content: IFileNodeContent = {
            //             name: file.name,
            //             type: file.type,
            //             file: fileRes.file,
            //             fileId: fileRes.file.id,
            //             existed: fileRes?.existed,
            //             uploadCret: fileRes?.cret,
            //         };
            //         commands.insertNode({ type: VinesNodeType.FILE, defaultContent: content });
            //     }
            // }
        }
    };

    return {
        createFile,
        uploadFile,
        createFileElement,
        imageMimeTypes,
    };
}
