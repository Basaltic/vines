import { BaseEntity } from '../common/base.do';

export type WorkspaceEntity = BaseEntity & {
    id: string;
    name: string;
    displayingNodeId?: string;
    localStoragePath?: string;
};
