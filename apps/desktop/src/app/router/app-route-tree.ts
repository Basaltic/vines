// import { boardRoute } from '@/features/board/route';
import { rootRoute } from './app-root-route';
import { landingRoute } from '@/features/start-up/landing/route';
// import { firstUseSetupPageRoute } from '@/features/start-up/first-use-setup/route';

export const routeTree = rootRoute.addChildren([
    landingRoute,
    // , firstUseSetupPageRoute, boardRoute
]);
