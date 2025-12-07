import { IVinesNodeContent } from './vines-node-content.types';
import { VinesNodeDescriptor } from './vines-node-descriptor.types';

/**
 * Create a descriptor for a node.
 *
 * @param type
 * @param name
 * @param defaultContent
 * @param view
 * @returns
 */
export function createVinesNodeDescriptor<Content extends IVinesNodeContent>(
    type: string,
    name: string,
    defaultContent: Content,
    view: VinesNodeDescriptor['view'],
): VinesNodeDescriptor<Content> {
    const descriptor = {
        type,
        name,
        defaultContent,
        view,
    };

    return descriptor;
}
