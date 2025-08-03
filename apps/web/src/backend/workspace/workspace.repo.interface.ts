import { token } from '@vines/core';
import { IRepo } from '../common/repo-base.interface';
import { WorkspaceEntity } from './workspace.do';

export const WorkspaceRepoToken = token<IWorkspaceRepo>('IWorkspaceRepo');

export interface IWorkspaceRepo extends IRepo<WorkspaceEntity> {}
