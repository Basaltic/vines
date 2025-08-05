import { createModule } from '@vines/core';
import { backendModule } from '@/backend/backend.module';
import { EventEmitter } from '@/common/event-emitter';
import { WorkspaceModule } from '@/workspace/vines-board.module';

export const appModule = createModule({
    imports: [backendModule, WorkspaceModule],
    providers: [EventEmitter],
});
