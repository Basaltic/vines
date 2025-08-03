import { type Content, Editor, type JSONContent } from '@tiptap/core';
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
import { getExtensions } from './editor.config';

export const NoteElementView = (props: VinesNodeViewProps) => {
    switch (props.where) {
        case 'dragging':
            return <NoteElementViewInDragging {...props} />;
        // case 'board':
        default:
            return <NoteElementViewInBoard {...props} />;
    }
};

/**
 * 笔记节点
 */
export const NoteElementViewInBoard = memo((props: VinesNodeViewProps) => {
    const { id, isSelected } = props;

    const editorDomRef = useRef(null);

    const commands = useCommands();
    const uvaNode = useVinesNode<INoteNodeContent>(id);

    const editorCache = useInject(EditorCache);

    /**
     * 积累了一定的内容更新后再触发更新命令
     */
    const debouncedContentUpdate = useCallback(
        debounce((editor) => {
            commands.updateNodeContent({ nodeId: uvaNode.id, content: { textContent: editor.getJSON() } });
        }, 500),
        [],
    );

    /**
     * 编辑器初始化
     */
    useEffect(() => {
        const place = editorDomRef.current;
        if (place) {
            let editor = editorCache.get(uvaNode.id);
            let content: Content;
            if (editor) {
                content = editor.getJSON() as JSONContent;
            } else {
                const textContent = uvaNode?.content.textContent || undefined;
                content = isString(textContent) ? JSON.parse(textContent) : textContent;
            }

            const exts = getExtensions();
            editor = new Editor({
                element: place,
                extensions: exts,
                content,
                onUpdate: ({ editor }) => {
                    debouncedContentUpdate(editor);
                },
            });
            editorCache.set(uvaNode.id, editor);
        }

        return () => {
            const editor = editorCache.get(uvaNode.id);
            if (editor) {
                editor.destroy();
            }

            editorCache.del(uvaNode.id);
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
    useEffect(() => {
        const place = editorDomRef.current;
        if (place) {
            let editor = editorCache.get(vinesNode.id);
            let content: Content;
            if (editor) {
                content = editor.getJSON() as JSONContent;
            } else {
                const textContent = vinesNode?.content.textContent || undefined;
                content = isString(textContent) ? JSON.parse(textContent) : textContent;
            }

            const exts = getExtensions();
            editor = new Editor({
                element: place,
                extensions: exts,
                content,
            });
            editorCache.set(vinesNode.id, editor);
        }
    }, []);

    const className = cs('relative bg-white min-h-12');
    const editorClassName = cs('prose p-2', isSelected ? '' : 'cursor-default');

    return (
        <div className={className} style={{ width: 300 }}>
            <ColorTopBar color={vinesNode.content.color} />
            <article className={editorClassName} ref={editorDomRef} />
        </div>
    );
});
