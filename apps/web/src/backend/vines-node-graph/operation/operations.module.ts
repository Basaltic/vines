import { createModule } from "@viness/core";
import { VinesGraphOperationService } from "./vines-graph-operation.service";
import { MoveOperationFactory } from "./atomic-operation/move.op.factory";
import { InsertOperationFactory } from "./atomic-operation/insert.op.factory";
import { UpdateOperationFactory } from "./atomic-operation/update-content.op.factory";
import { DeleteOperationFactory } from "./atomic-operation/delete.op.factory";


export const vinesGraphOperationModule = createModule({
    providers: [
        VinesGraphOperationService,
        MoveOperationFactory,
        InsertOperationFactory,
        UpdateOperationFactory,
        DeleteOperationFactory,
    ]
})