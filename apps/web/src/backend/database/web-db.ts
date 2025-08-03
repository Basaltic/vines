import { Injectable } from '@viness/core';
import { Dexie, Table } from 'dexie';
import { VinesNodeEntity } from '../vines-node-graph/vines-node.do';
import { WorkspaceEntity } from '../workspace/workspace.do';

@Injectable()
export class VinesWebDatabase extends Dexie {
    nodes!: Table<VinesNodeEntity, string>;
    workspace!: Table<WorkspaceEntity, string>;
    constructor() {
        super('VinesDatabase');
        this.version(1).stores({
            nodes: 'id, type, above, order',
            workspace: 'id, displayingNodeId',
        });
    }
}
