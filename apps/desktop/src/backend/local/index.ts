import type { IAppBackend } from '../app.interface';
import { AppHistoryController } from './app-history.controller';
import { AppSettingsController } from './app-settings.controller';
import { LibraryController } from './library.controller';

export const localAppBackend: IAppBackend = {
    library: new LibraryController(),
    settings: new AppSettingsController(),
    history: new AppHistoryController(),
};
