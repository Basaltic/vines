// import { boardRoute } from '@/features/board/route';
import { ROOT_ROUTE } from "./app-root-route";
import { landingRoute } from "@/features/start-up/landing/route";
// import { firstUseSetupPageRoute } from '@/features/start-up/first-use-setup/route';

export const routeTree = ROOT_ROUTE.addChildren([landingRoute]);
