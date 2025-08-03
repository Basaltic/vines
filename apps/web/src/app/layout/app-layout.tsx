import { TooltipProvider } from '@vines/ui/components/tooltip';
import { Suspense } from 'react';
import { TanStackRouterDevtools } from '../router/router-devtool';
import { AppContent } from './app-content';

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
