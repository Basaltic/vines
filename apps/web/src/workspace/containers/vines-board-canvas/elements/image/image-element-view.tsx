import { useBoolean, useHover, useMount } from 'ahooks';
import type React from 'react';
import { memo, useRef } from 'react';
import { useCommands } from '@/workspace/vines-node/use-commands';
import { useVinesNode } from '@/workspace/vines-node/vines-node-graph.hooks';
import type { IImageNodeContent } from '../../../../vines-node/vines-node-content';
import type { VinesNodeViewProps } from '../../../../vines-node/vines-node-descriptor.types';
import { ColorTopBar } from '../../components/color-top-bar';
import { useElementContextMenu } from '../../containers/element-context-menu';
import ElementResizeHandler from '../element-resize-handler';
import { useFileUploading } from '../file/file-element.hook';
import { DEFAULT_DISPLAY_WIDTH } from './constants';

export const ImageElementView = (props: VinesNodeViewProps) => {
    switch (props.where) {
        case 'trash':
            return <ImageElementViewInTrash {...props} />;
        case 'dragging':
            return <ImageElementViewInBoard {...props} />;
        // case 'board':
        default:
            return <ImageElementViewInBoard {...props} />;
    }
};

/**
 * 图片元素组件 - 知识板中的形态
 */
export const ImageElementViewInBoard = memo((props: VinesNodeViewProps) => {
    const { id, isResizable = true } = props;

    const containerRef = useRef<HTMLDivElement>(null);

    const commands = useCommands();
    const uvaNode = useVinesNode<IImageNodeContent>(id);

    const [showContextMenu] = useElementContextMenu(uvaNode.type);

    // const { uploadFile } = useFile();
    const { startUploading, finishUploading } = useFileUploading(uvaNode.id);

    const [hidden, { set: setHidden }] = useBoolean(true);

    const { content } = uvaNode;
    const width = content.width || DEFAULT_DISPLAY_WIDTH;

    /**
     * 不存在的时候需要上传文件
     */
    useMount(async () => {
        if (!content.existed && content.uploadCret) {
            startUploading();
            // await uploadFile(content.file.id, content.uploadCret);
            commands.updateNodeContentWithoutHistory({ nodeId: uvaNode.id, content: { existed: true } });
            finishUploading();
        }
    });

    /**
     * 鼠标悬浮
     */
    useHover(containerRef, {
        onEnter: () => {
            setHidden(false);
        },
        onLeave: () => {
            setHidden(true);
        },
    });

    /**
     * 控制菜单的展现与否
     */
    const displayMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        showContextMenu(e, { props: { uvaNode } });
        commands.selectNode(uvaNode.id);
    };

    const onDrag = (deltaWidth: number) => {
        if (containerRef.current) {
            containerRef.current.style.width = `${width + deltaWidth}px`;
        }
    };

    const onDragEnd = (deltaWidth: number) => {
        const cWidth = width + deltaWidth;
        commands.updateNodeContent({ nodeId: uvaNode.id, content: { width: cWidth } });
    };

    return (
        <div ref={containerRef} className="relative h-full bg-white" style={{ width }} onContextMenu={displayMenu}>
            <ColorTopBar color={content.color} />
            <img className="w-full h-full" src={content.image.regular} alt={content.name} />

            {isResizable && (
                <ElementResizeHandler minW={100} maxW={600} currW={width} hidden={hidden} onDrag={onDrag} onDragEnd={onDragEnd} />
            )}
        </div>
    );
});

/**
 * 图片元素组件 - 知识板中的形态
 */
export const ImageElementViewInTrash = memo((props: VinesNodeViewProps) => {
    const { id } = props;

    const containerRef = useRef<HTMLDivElement>(null);

    const uvaNode = useVinesNode<IImageNodeContent>(id);

    const { content } = uvaNode;

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white">
            <ColorTopBar color={content.color} />
            <img className="w-full h-full" src={content.image.regular} alt={content.name} />
        </div>
    );
});
