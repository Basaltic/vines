import { useInject } from '@vines/core';
import { useMemo } from 'react';
import { VinesNodeDescriptorRegistry } from './vines-node-descriptor-registry';

export const useVinesElementRegistry = () => {
    const elementRegistry = useInject(VinesNodeDescriptorRegistry);
    return elementRegistry;
};

export const useVinesNodeDescriptor = (type: string) => {
    const elementRegistry = useVinesElementRegistry();
    return elementRegistry.get(type);
};

export const useDragableAccepts = () => {
    const vinesNodeDescriptorRegistry = useInject(VinesNodeDescriptorRegistry);

    const { itemTypeFromMenu, itemTypeFromNode, itemTypeFromTrash, itemTypeFromColumn } = useMemo(() => {
        const elementList = vinesNodeDescriptorRegistry.getElementList();

        const itemTypeFromMenu: string[] = [];
        const itemTypeFromNode: string[] = [];
        const itemTypeFromTrash: string[] = [];
        const itemTypeFromColumn: string[] = [];
        for (const ele of elementList) {
            itemTypeFromMenu.push(`${ele.type}_menu`);
            itemTypeFromNode.push(`${ele.type}_board`);
            itemTypeFromTrash.push(`${ele.type}_trash`);
            itemTypeFromColumn.push(`${ele.type}_column`);
        }

        return { itemTypeFromMenu, itemTypeFromNode, itemTypeFromTrash, itemTypeFromColumn };
    }, [vinesNodeDescriptorRegistry]);

    return { itemTypeFromMenu, itemTypeFromNode, itemTypeFromTrash, itemTypeFromColumn };
};
