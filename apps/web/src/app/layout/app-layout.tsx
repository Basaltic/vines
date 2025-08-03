import { Suspense } from 'react';
import { TanStackRouterDevtools } from '../router/router-devtool';

import { AppContent } from './app-content';
import { TooltipProvider } from '@viness/ui/components/tooltip';

export function AppLayout() {
    return (
        <Suspense>
            <TooltipProvider delayDuration={0}>
                <AppContent />
                <TanStackRouterDevtools />
            </TooltipProvider>
        </Suspense>
    );
}
