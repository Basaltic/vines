import { firstUseSetupRoute, landingRoute } from '@/landing/landing.route';
import { noteBoardPageRoute } from '@/workspace/vines-board.route';
import { ROOT_ROUTE } from './app-root-route';

export const routeTree = ROOT_ROUTE.addChildren([landingRoute, firstUseSetupRoute, noteBoardPageRoute]);
