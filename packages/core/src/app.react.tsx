import { createContext, useContext } from 'react';
import { createApp, VinessApp } from './app';
import { Container, type Token } from './injection';
import type { Module } from './module';

const VinessAppContext = createContext<VinessApp>(new VinessApp(new Container()));

export const VinessAppProvider = (props: {
    children: React.ReactNode;
    module: Module;
}) => {
    const { children, module } = props;
    const app = createApp(module);
    return <VinessAppContext.Provider value={app}>{children}</VinessAppContext.Provider>;
};

export const useVinessApp = () => {
    const app = useContext(VinessAppContext);

    return app;
};

export function useResolve<T>(token: Token<T>) {
    const app = useVinessApp();

    return app.resolve(token);
}
