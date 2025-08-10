import { Injectable } from '@vines/core';
import { IdentifierService } from '../common/id.service';
import { IRepo } from '../common/repo-base.interface';
import { VinesWebDatabase } from '../database/web-db';
import { WorkspaceEntity } from './workspace.do';

@Injectable()
export class WorkspaceRepoInWeb implements IRepo<WorkspaceEntity> {
    constructor(
        private db: VinesWebDatabase,
        private idService: IdentifierService,
    ) {}

    async getOne(id: string) {
        const entity = await this.db.workspace.where({ id }).first();

        return entity;
    }

    async getList(where: Partial<WorkspaceEntity>) {
        const list = this.db.workspace.where(where).toArray();
        return list;
    }

    async getAll() {
        return this.db.workspace.toArray();
    }

    async create(user: Partial<WorkspaceEntity>) {
        const userState: WorkspaceEntity = {
            id: this.idService.generateId(),
            name: user.name || '',
            displayingNodeId: user.displayingNodeId || '',
            ctime: new Date(),
            utime: new Date(),
        };

        await this.db.workspace.put(userState);

        return userState;
    }

    async update(uid: string, user: Omit<WorkspaceEntity, 'uid'>) {
        user.utime = new Date();
        return this.db.workspace.update(uid, user);
    }

    async delete(uid: string) {
        this.db.workspace.delete(uid);
    }
}
