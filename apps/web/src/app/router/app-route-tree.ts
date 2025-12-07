import { landingRoute, setupRoute } from '@/landing/landing.route';
import { noteBoardPageRoute } from '@/workspace/workspace.route';
import { ROOT_ROUTE } from './app-root-route';

export const routeTree = ROOT_ROUTE.addChildren([landingRoute, setupRoute, noteBoardPageRoute]);
