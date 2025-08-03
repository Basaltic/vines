import { createModule } from '@viness/core';
import { backendModule } from '@/backend/backend.module';
import { boardModule } from '@/workspace/vines-board.module';

export const appModule = createModule({
    imports: [backendModule, boardModule],
    providers: [],
});
