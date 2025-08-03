import { token } from '@vines/core';
import { IResponse } from './common/response';
import { VinesNodeEntity } from './vines-node-graph/vines-node.do';
import { WorkspaceEntity } from './workspace/workspace.do';

export const AppUseCaseToken = token<IAppUseCases>('IAppUseCases');

export interface IAppUseCases {
    /**
     * Setup the usage settings when first use
     */
    firstUseSetup(params: { name: string; localStoragePath?: string }): Promise<IResponse<WorkspaceEntity>>;

    /**
     * Get some specific workspace
     */
    getWorkspace(params: { id?: string }): Promise<IResponse<WorkspaceEntity>>;

    /**
     * Get all workspaces
     */
    getWorkspaces(): Promise<IResponse<WorkspaceEntity[]>>;

    /**
     * Get some node
     */
    getNode(params: { id: string }): Promise<IResponse<VinesNodeEntity>>;

    /**
     * Get child nodes of some node
     */
    getNodes(params: { above: string }): Promise<IResponse<{ list: VinesNodeEntity[] }>>;

    /**
     * Get all nodes
     */
    getAllNodes(): Promise<IResponse<{ list: VinesNodeEntity[] }>>;

    /**
     * Sync node graph operations
     */
    syncOperations(params: { ops: any[] }): Promise<IResponse<{}>>;
}
