import type { IAppSettings } from './domain/app';
import type { IResponse } from './domain/dto/response';
import type { IVinessNode } from './domain/node';

export interface IAppBackend {
    getAppSettings(): Promise<IResponse<IAppSettings>>;
    updateAppSettings(settings: Partial<IAppSettings>): Promise<IResponse>;

    // -- Node Related
    /**
     * Get a node by id
     * @param id
     */
    getNode(id?: string): Promise<IResponse<IVinessNode>>;
    /**
     * Get all child nodes of a node
     *
     * @param parentId
     */
    getNodes(parentId?: string): Promise<IResponse<IVinessNode[]>>;
    /**
     * Create a new node or update info if the node is existed
     *
     * @param node
     */
    upsertNode(node: IVinessNode): Promise<IResponse<IVinessNode>>;

    // -- Common
}
