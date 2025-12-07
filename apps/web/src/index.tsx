import '@vines/ui/styles/globals.css';
import './index.css';
import 'overlayscrollbars/overlayscrollbars.css';

import { enablePatches } from '@vines/store';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/app.react';

enablePatches();

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
