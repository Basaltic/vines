import type { IAppBackend } from './app.interface';
import { localAppBackend } from './local';
import { webAppBackend } from './web';

export const controllers: IAppBackend = window.__TAURI__ ? localAppBackend : webAppBackend;
