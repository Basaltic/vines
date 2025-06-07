import type { IAppSettingsController } from '../app.interface';
import type { IResponse } from '../domain/dto/response';

export class AppSettingsController implements IAppSettingsController {
    get() {
        throw new Error('Method not implemented.');
    }
    update(settings: any): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
}
