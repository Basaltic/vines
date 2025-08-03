import { useInject } from '@vines/core';
import { VinesNodeDescriptorRegistry } from '@/workspace/vines-node/vines-node-descriptor-registry';

/**
 * 侧边工具栏
 */
export function VinesElementMenu() {
    const elementRegistry = useInject(VinesNodeDescriptorRegistry);
    const elements = elementRegistry.getElementList();

    return (
        <div className="absolute top-1/2 left-5 h-4 flex gap-2 z-40">
            {elements.map((e) => (
                <e.menuView key={e.type} />
            ))}
        </div>
    );
}
