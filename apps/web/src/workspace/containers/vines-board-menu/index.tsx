import { useInject } from '@vines/core';
import { VinesNodeDescriptorRegistry } from '@/workspace/vines-node/vines-node-descriptor-registry';

/**
 * 侧边工具栏
 */
export function VinesElementMenu() {
    const elementRegistry = useInject(VinesNodeDescriptorRegistry);
    const elements = elementRegistry.getElementList();

    return (
        <div className="fixed top-0 left-0 h-full flex items-center">
            <div className="bg-white shadow-md p-2">
                {elements.map((e) => (
                    <e.menuView key={e.type} />
                ))}
            </div>
        </div>
    );
}
