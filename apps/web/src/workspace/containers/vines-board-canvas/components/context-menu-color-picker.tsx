import type React from 'react';
import { useCommands } from '@/workspace/vines-node/use-commands';
import { useVinesNode } from '@/workspace/vines-node/vines-node-graph.hooks';
import { useMenuData } from '../../../../common/components/context-menu/hooks/use-menu-data';
import type { IVinesNode } from '../../../vines-node/vines-node.interface';

/**
 * Context Menu中使用的颜色选取器
 *
 * @param props
 * @returns
 */
export function ContextMenuColorPicker(props: { colorList: string[] }) {
    const commands = useCommands();
    const data = useMenuData<{ uvaNode: IVinesNode }>();

    const uvaNode = useVinesNode(data.uvaNode.id);

    /**
     * 更改颜色
     */
    const changeColor = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const { color } = target.dataset;
        commands.updateNodeContent({ nodeId: data.uvaNode.id, content: { color } });
    };

    return (
        <div className="flex flex-row gap-1 items-center" onClick={changeColor}>
            {props.colorList.map((color) => (
                <ColorBox key={color} color={color} isSelected={color === uvaNode?.content.color} />
            ))}
        </div>
    );
}

function ColorBox(props: { color: string; isSelected: boolean }) {
    const { color, isSelected } = props;
    return (
        <div
            className="w-4 h-4 rounded-sm"
            style={{
                backgroundColor: color,
                boxShadow: isSelected ? `${color} 0px 0px 4px` : '',
            }}
            data-color={color}
        />
    );
}
