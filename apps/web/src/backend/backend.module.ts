import { createModule } from '@viness/core';

import { IdentifierService } from './common/id.service';
import { VinesWebDatabase } from './database/web-db';
import { AppUseCasesInWeb } from './usecase.impl.web';
import { AppUseCaseToken } from './usecase.interface';
import { vinesGraphOperationModule } from './vines-node-graph/operation/operations.module';
import { VinesNodeGraphService } from './vines-node-graph/vines-node-graph.service';
import { WorkspaceRepoInWeb } from './workspace/workspace.repo.impl.web';
import { WorkspaceRepoToken } from './workspace/workspace.repo.interface';

export const backendModule = createModule({
    imports: [vinesGraphOperationModule],
    providers: [
        VinesWebDatabase,
        IdentifierService,
        VinesNodeGraphService,
        {
            token: WorkspaceRepoToken,
            useClass: WorkspaceRepoInWeb,
        },
        {
            token: AppUseCaseToken,
            useClass: AppUseCasesInWeb,
        },
    ],
});
