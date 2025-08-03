import type { IImageNodeContent } from '../../../../vines-node/vines-node-content';

export const defaultContent: IImageNodeContent = {
    title: '',
    name: '',
    type: '',
    file: {
        id: '',
        uid: '',
        hash: '',
        type: '',
        name: '',
        ext: '',
        size: 0,
        width: 0,
        height: 0,
        color: '',
        state: 1,
        ctime: '',
        utime: '',
        dtime: '',
    },
    fileId: '',
    existed: false,
    uploadCret: undefined,
    image: {
        regular: '',
    },
};

export const DEFAULT_DISPLAY_WIDTH = 200;
