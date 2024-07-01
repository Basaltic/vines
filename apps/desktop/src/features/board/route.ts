import { rootRoute } from '@/app/router/app-root-route';
import { createRoute } from '@tanstack/react-router';
import { WhiteBoardPage } from './board.page';

export const boardRoute = createRoute({
    path: '/board/$id',
    component: WhiteBoardPage,
    getParentRoute: () => rootRoute,
});
