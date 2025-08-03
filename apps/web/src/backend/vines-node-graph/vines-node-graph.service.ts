import { Injectable } from '@vines/core';
import { VinesWebDatabase } from '../database/web-db';
import { VinesNodeEntity } from './vines-node.do';
import { IVinesNodeGraphService } from './vines-node-graph.interface';

@Injectable()
export class VinesNodeGraphService implements IVinesNodeGraphService {
    constructor(private db: VinesWebDatabase) {}

    async getAll() {
        const nodes = await this.db.nodes.toArray();
        return nodes;
    }

    async getList(where: Partial<VinesNodeEntity>) {
        const nodes = await this.db.nodes.where(where).toArray();
        return nodes;
    }

    async getOneById(id: string) {
        const node = await this.db.nodes.where({ id }).first();
        return node;
    }

    async create(partialNode: Partial<VinesNodeEntity>) {
        const node = partialNode as any;

        node.ctime = new Date();
        node.utime = new Date();

        return await this.db.nodes.put(node);
    }

    async update(id: string, partialNode: Partial<VinesNodeEntity>) {
        partialNode.utime = new Date();
        await this.db.nodes.update(id, partialNode);
    }

    async deleteOne(id: string) {
        return await this.db.nodes.delete(id);
    }

    async updateContent(id: string, content: string) {
        await this.db.nodes.update(id, { content, utime: new Date() });
    }
}
