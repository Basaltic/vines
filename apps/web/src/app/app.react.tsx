import { RouterProvider } from '@tanstack/react-router';
import { VinesAppProvider } from '@viness/core';
import { appModule } from './app.module';
import { router } from './router/app-router';

export default function App() {
    return (
        <VinesAppProvider value={appModule}>
            <RouterProvider router={router} />
        </VinesAppProvider>
    );
}
