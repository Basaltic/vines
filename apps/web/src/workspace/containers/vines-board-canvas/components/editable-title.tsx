import React, { HTMLAttributes, useRef, useState } from 'react';

/**
 * 标题（可编辑）
 */
export function EditableTitle(
    props: Omit<HTMLAttributes<HTMLDivElement>, 'onBlur'> & {
        title: string;
        disabled?: boolean;
        onBlur?: (title: string) => void;
        onEnter?: (title: string) => void;
    },
) {
    const { title = '', disabled, onBlur, onEnter } = props;

    const contentRef = useRef<HTMLDivElement>(null);

    const [editing, setEditing] = useState<boolean>(false);

    const startEditing = () => setEditing(true);
    const stopEditing = () => setEditing(false);

    const getTextContent = () => {
        return contentRef?.current?.textContent;
    };

    const onClick = () => {
        startEditing();
    };

    const onBlurInner = () => {
        onBlur?.(getTextContent() || '');
        stopEditing();
    };

    const onKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        if (evt.key === 'Enter') {
            stopEditing();
            onEnter?.(getTextContent() || '');
        }
    };

    return (
        <div
            ref={contentRef}
            contentEditable={editing && !disabled}
            onClick={onClick}
            onBlur={onBlurInner}
            onKeyDown={onKeyDown}
            dangerouslySetInnerHTML={{ __html: title }}
        />
    );
}
