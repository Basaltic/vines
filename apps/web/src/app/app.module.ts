import { createModule } from '@vines/core';
import { backendModule } from '@/backend/backend.module';
import { boardModule } from '@/workspace/vines-board.module';

export const appModule = createModule({
    imports: [backendModule, boardModule],
    providers: [],
});
