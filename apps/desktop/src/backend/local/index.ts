import type { IAppBackend } from '../app.interface';
import { AppHistoryController } from './app-history.controller';
import { AppSettingsController } from './app-settings.controller';
import { AppController } from './app.controller';

export const localAppBackend: IAppBackend = {
    library: new AppController(),
    settings: new AppSettingsController(),
    history: new AppHistoryController(),
};
