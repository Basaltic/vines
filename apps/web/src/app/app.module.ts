import { createModule } from '@vines/core';
import { StoreModule } from '@vines/store';
import { backendModule } from '@/backend/backend.module';
import { EventEmitter } from '@/common/event-emitter';
import { WorkspaceModule } from '@/workspace/vines-board.module';

export const appModule = createModule({
    imports: [StoreModule.forRoot(), backendModule, WorkspaceModule],
    providers: [EventEmitter],
});
