import { Outlet } from '@tanstack/react-router';
import { cn } from '@viness/ui/lib/utils';
import { Suspense } from 'react';
import { PageSuspenseFallback } from './app-suspense-fallback';

export function AppContent(props: { className?: string }) {
    const { className } = props;
    return (
        <div className={cn('w-full h-full relative', className)}>
            <Suspense fallback={<PageSuspenseFallback />}>
                <Outlet />
            </Suspense>
        </div>
    );
}
