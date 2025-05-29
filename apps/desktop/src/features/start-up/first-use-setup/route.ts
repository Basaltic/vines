import { createRoute } from '@tanstack/react-router';
import { FirstUseSetupPage } from './page';
import { rootRoute } from '@/app/router/app-root-route';

export const firstUseSetupPageRoute = createRoute({
    path: '/first-use-setup',
    component: FirstUseSetupPage,
    getParentRoute: () => rootRoute,
});
