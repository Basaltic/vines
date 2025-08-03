import { Container, type ServiceIdentifier } from 'inversify';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Module } from './module';
import { ModulesScanner } from './module/scanner';

const VinessAppContext = createContext<Container | null>(null);

export const VinesAppProvider = (props: { children: React.ReactNode; value: Module }) => {
    const { children, value } = props;

    const [container, setContainer] = useState<Container>();

    const initialize = async () => {
        if (container) return;

        const newContainer = new Container({ defaultScope: "Singleton" });
        const scanner = new ModulesScanner(newContainer);
        scanner.scan(value);
        setContainer(newContainer);
    }

    useEffect( () => {
        initialize();
    }, [])

    if (!container) return;

    return <VinessAppContext.Provider value={container}>{children}</VinessAppContext.Provider>;
};

/**
 * 获取某个服务实例
 */
export function useInject<T>(id: ServiceIdentifier<T>) {
    const container = useContext(VinessAppContext) as Container;
    const instance =  container.get(id);
    return instance
}
