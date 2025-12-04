import { createRoute } from '@tanstack/react-router';
import { ROOT_ROUTE } from '@/app/router/app-root-route';
import { LandingPage } from './landing.page';
import { FirstUseSetupPage } from './setup.page';

export const landingRoute = createRoute({
    path: '/',
    component: LandingPage,
    getParentRoute: () => ROOT_ROUTE,
});

export const setupRoute = createRoute({
    path: '/setup',
    component: FirstUseSetupPage,
    getParentRoute: () => ROOT_ROUTE,
});
