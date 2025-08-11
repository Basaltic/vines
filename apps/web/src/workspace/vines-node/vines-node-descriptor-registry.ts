import { Injectable } from '@vines/core';
import { noteCardDescriptor } from '../containers/vines-board-canvas/cards/note';
import { VinesNodeDescriptor } from './vines-node-descriptor.types';

/**
 * Register Element
 */
@Injectable()
export class VinesNodeDescriptorRegistry {
    private registry = new Map<string, VinesNodeDescriptor>();

    constructor() {
        this.preRegister();
    }

    register(element: VinesNodeDescriptor) {
        this.registry.set(element.type, element);
    }

    get(type: string) {
        return this.registry.get(type) as VinesNodeDescriptor;
    }

    getElementList() {
        return Array.from(this.registry.values());
    }

    getElementView(type: string) {
        return this.registry.get(type)?.view;
    }

    getIcon(type: string) {
        return this.registry.get(type)?.icon;
    }

    private preRegister() {
        this.register(noteCardDescriptor);
    }
}
