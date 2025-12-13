import { createModule } from '@vines/core';
import { EditorCache } from './common/cache/editor-cache';
import { EditorHistoryPrevDoneCountCache } from './common/cache/editor-history-prev-done-count-cache';
import { ElementDomCache } from './common/cache/element-dom-cache';
import { FileCache } from './common/cache/file-cache';
import { VinesBoardEditorCommands } from './graph/vines-board-commands';
import { VinesBoardOpHistory } from './graph/vines-board-operation-history';
import { VinesBoardOperationSyncer } from './graph/vines-board-operation-syncer';
import { VinesNodeDescriptorRegistry } from './graph/vines-node-descriptor-registry';
import { VinesNodeGraph } from './graph/vines-node-graph';
import { VinesNodeGraphAtomicOperations } from './graph/vines-node-graph-atomic-operations';

export const WorkspaceModule = createModule({
    imports: [],
    providers: [
        FileCache,
        EditorCache,
        ElementDomCache,
        EditorHistoryPrevDoneCountCache,
        VinesNodeDescriptorRegistry,
        VinesNodeGraph,
        VinesNodeGraphAtomicOperations,
        VinesBoardOpHistory,
        VinesBoardOperationSyncer,
        VinesBoardEditorCommands,
    ],
});
