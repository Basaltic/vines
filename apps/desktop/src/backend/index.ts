import type { IAppBackend } from './app.interface';
import { TauriAppController } from './local/app.controller';
import { WebAppBackend } from './web/web.backend';

export const controllers: {
    app: IAppBackend;
} = {
    app: window.__TAURI__ ? new TauriAppController() : new WebAppBackend(),
};
