import { Inject, Injectable } from '@viness/core';
import { IdentifierService } from './common/id.service';
import { IResponse, Response } from './common/response';
import { IAppUseCases } from './usecase.interface';
import { IOp } from './vines-node-graph/operation/vines-graph-operation.interface';
import { VinesGraphOperationService } from './vines-node-graph/operation/vines-graph-operation.service';
import { VinesNodeEntity } from './vines-node-graph/vines-node.do';
import { VinesNodeGraphService } from './vines-node-graph/vines-node-graph.service';
import { WorkspaceEntity } from './workspace/workspace.do';
import { type IWorkspaceRepo, WorkspaceRepoToken } from './workspace/workspace.repo.interface';

@Injectable()
export class AppUseCasesInWeb implements IAppUseCases {
    constructor(
        private idService: IdentifierService,
        @Inject(WorkspaceRepoToken) private workspaceService: IWorkspaceRepo,
        private vinesNodeGraphService: VinesNodeGraphService,
        private vinesNodeGraphOperationService: VinesGraphOperationService,
    ) {}

    async firstUseSetup(params: { name: string }): Promise<IResponse<WorkspaceEntity>> {
        try {
            const { name } = params;
            const node = {
                id: this.idService.generateId(),
                type: 'note',
            };
            await this.vinesNodeGraphService.create(node);

            const user = {
                name,
                displayingNodeId: node.id,
            };
            const userState = await this.workspaceService.create(user);

            return Response.succeed(userState);
        } catch (e) {
            console.log(e);
        }

        return Response.fail();
    }

    async getWorkspace(params: { id: string }): Promise<IResponse<WorkspaceEntity>> {
        const { id } = params;
        const user = await this.workspaceService.getOne(id);

        if (user) {
            return Response.succeed(user);
        }

        return Response.fail();
    }

    async getWorkspaces(): Promise<IResponse<WorkspaceEntity[]>> {
        const users = await this.workspaceService.getAll();

        return Response.succeed(users);
    }

    async getNode(params: { id: string }): Promise<IResponse<VinesNodeEntity>> {
        const { id } = params;
        const node = await this.vinesNodeGraphService.getOneById(id);

        if (node) {
            return Response.succeed<VinesNodeEntity>(node);
        }

        return Response.fail();
    }

    async getNodes(params: { above: string }): Promise<IResponse<{ list: VinesNodeEntity[] }>> {
        const { above } = params;
        const nodeList = await this.vinesNodeGraphService.getList({ above });

        return Response.succeed({ list: nodeList });
    }

    async getAllNodes(): Promise<IResponse<{ list: VinesNodeEntity[] }>> {
        const nodes = await this.vinesNodeGraphService.getAll();

        return Response.succeed({ list: nodes });
    }

    async syncOperations(params: { ops: IOp[] }): Promise<IResponse<{}>> {
        const { ops } = params;

        try {
            const results: any = [];
            for (const operation of ops) {
                const res = await this.vinesNodeGraphOperationService.execute('', operation);
                results.push(res);
            }

            return Response.succeed(results);
        } catch (e) {
            return Response.fail('');
        }
    }
}
