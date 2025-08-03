import { createRootRoute } from '@tanstack/react-router';
import { AppLayout } from '../layout/app-layout';

export const ROOT_ROUTE = createRootRoute({ component: AppLayout });
