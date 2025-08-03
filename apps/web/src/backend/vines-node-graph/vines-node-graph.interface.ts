import { VinesNodeEntity } from './vines-node.do';

export interface IVinesNodeGraphService {
    getList(where: Partial<VinesNodeEntity>): Promise<VinesNodeEntity[]>;

    getOneById(id: string): Promise<VinesNodeEntity | undefined>;

    create(partialNode: Partial<VinesNodeEntity>): Promise<any>;

    update(id: string, partialNode: Partial<VinesNodeEntity>): Promise<any>;

    deleteOne(id: string): Promise<void>;

    updateContent(id: string, content: string): Promise<void>;
}
