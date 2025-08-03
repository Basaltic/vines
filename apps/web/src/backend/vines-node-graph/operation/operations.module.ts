import { createModule } from '@vines/core';
import { DeleteOperationFactory } from './atomic-operation/delete.op.factory';
import { InsertOperationFactory } from './atomic-operation/insert.op.factory';
import { MoveOperationFactory } from './atomic-operation/move.op.factory';
import { UpdateOperationFactory } from './atomic-operation/update-content.op.factory';
import { VinesGraphOperationService } from './vines-graph-operation.service';

export const vinesGraphOperationModule = createModule({
    providers: [VinesGraphOperationService, MoveOperationFactory, InsertOperationFactory, UpdateOperationFactory, DeleteOperationFactory],
});
