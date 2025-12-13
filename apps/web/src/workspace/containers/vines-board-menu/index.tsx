import { useInject } from '@vines/core';
import { VinesNodeDescriptorRegistry } from '@/workspace/graph/vines-node-descriptor-registry';

/**
 * 侧边工具栏
 */
export function CanvasSideMenu() {
    const elementRegistry = useInject(VinesNodeDescriptorRegistry);
    const elements = elementRegistry.getElementList();

    return (
        <div className="absolute top-10 left-2 w-10 h-full flex items-center z-50">
            <div className="bg-white shadow-md rounded-md p-1">{elements.map((e) => e.view.menu && <e.view.menu key={e.type} />)}</div>
        </div>
    );
}
