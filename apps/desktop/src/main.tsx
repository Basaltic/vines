import './main.css';

import 'overlayscrollbars/overlayscrollbars.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/app';

const container = document.getElementById('root') as HTMLDivElement;
createRoot(container).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
