import { createRoute } from '@tanstack/react-router';
import { ROOT_ROUTE } from '@/app/router/app-root-route';
import { VinesBoardPage } from './vines-board.page';

export const noteBoardPageRoute = createRoute({
    path: '/workspace/$workspaceId',
    component: VinesBoardPage,
    getParentRoute: () => ROOT_ROUTE,
});
