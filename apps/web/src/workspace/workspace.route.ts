import { createRoute } from '@tanstack/react-router';
import { ROOT_ROUTE } from '@/app/router/app-root-route';
import { WorkspacePage } from './workspace.page';

export const noteBoardPageRoute = createRoute({
    path: '/workspace/$workspaceId',
    component: WorkspacePage,
    getParentRoute: () => ROOT_ROUTE,
});
