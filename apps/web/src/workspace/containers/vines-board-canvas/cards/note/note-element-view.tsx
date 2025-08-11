import { Crepe } from '@milkdown/crepe';
import { useInject } from '@vines/core';
import cs from 'classnames';
import { debounce, isString } from 'lodash-es';
import type React from 'react';
import { memo, useCallback, useEffect, useRef } from 'react';
import { EditorCache } from '@/workspace/common/cache/editor-cache';
import { useCommands } from '@/workspace/vines-node/use-commands';
import { useVinesNode } from '@/workspace/vines-node/vines-node-graph.hooks';
import type { INoteNodeContent } from '../../../../vines-node/vines-node-content';
import type { VinesNodeViewProps } from '../../../../vines-node/vines-node-descriptor.types';
import { ColorTopBar } from '../../components/color-top-bar';

/**
 * 笔记节点
 */
export const NoteElementViewInBoard = memo((props: VinesNodeViewProps) => {
    const { id, isSelected, isDragging } = props;

    const editorDomRef = useRef(null);
    const eidtorRef = useRef<Crepe | null>(null);

    const commands = useCommands();
    const uvaNode = useVinesNode<INoteNodeContent>(id);

    const editorCache = useInject(EditorCache);

    /**
     * 积累了一定的内容更新后再触发更新命令
     */
    const debouncedContentUpdate = useCallback(
        debounce((editor) => {
            if (!editor) return;
            console.log('debouncedContentUpdate', { id, content: editor.getJSON() });
            commands.updateNodeContent({ nodeId: uvaNode.id, content: { textContent: editor.getJSON() } });
        }, 500),
        [],
    );

    /**
     * 编辑器初始化
     */
    useEffect(() => {
        const editor = new Crepe({ root: editorDomRef.current, defaultValue: uvaNode.content.textContent });

        editor.create();

        eidtorRef.current = editor;

        return () => {
            editor.destroy();
        };
    }, []);

    /**
     * 控制菜单的展现与否
     */
    const displayMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        commands.selectNode(uvaNode.id);
    };

    const className = cs('relative bg-white min-h-12');
    const editorClassName = cs('prose p-2', isSelected ? '' : 'cursor-default');

    return (
        <div className={className} style={{ width: 300 }} onContextMenu={displayMenu}>
            <ColorTopBar color={uvaNode.content.color} />
            <article className={editorClassName} ref={editorDomRef} />
        </div>
    );
});

/**
 * 笔记节点
 */
export const NoteElementViewInDragging = memo((props: VinesNodeViewProps) => {
    const { id, type, isSelected } = props;

    const editorDomRef = useRef(null);

    const editorCache = useInject(EditorCache);
    const vinesNode = useVinesNode<INoteNodeContent>(id);

    /**
     * 编辑器初始化
     */
    /**
     * 编辑器初始化
     */
    useEffect(() => {
        const editor = new Crepe({ root: editorDomRef.current, defaultValue: vinesNode.content.textContent });

        editor.create();

        return () => {
            editor.destroy();
        };
    }, []);

    const className = cs('relative bg-white min-h-12');
    const editorClassName = cs('prose p-2', isSelected ? '' : 'cursor-default');

    console.log('NoteElementViewInDragging', { id, type, isSelected, content: vinesNode?.content });

    return (
        <div className={className} style={{ width: 300 }}>
            <ColorTopBar color={vinesNode.content.color} />
            <article className={editorClassName} ref={editorDomRef} />
        </div>
    );
});
