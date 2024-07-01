import { rootRoute } from '@/app/router/app-root-route';
import { createRoute } from '@tanstack/react-router';
import { LandingPage } from './page';

export const landingRoute = createRoute({
    path: '/',
    component: LandingPage,
    getParentRoute: () => rootRoute,
});
