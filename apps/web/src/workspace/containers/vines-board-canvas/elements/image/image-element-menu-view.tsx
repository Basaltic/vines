import PhotographIcon from '@heroicons/react/24/outline/PhotoIcon';
import { useRef } from 'react';
import { useDragSelectMouseConflictHandler } from '../../../../../common/components/drag-to-select/hooks/use-drag-select-mouse-conflict-handler';
import { useFile } from '../../../../common/use-file';
import { ElementMenuItem } from '../../components/element-menu-item';

const imageMimeTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

/**
 * 创建、拖拽 创意画板工具栏按钮
 * @returns
 */
export function ImageElementMenuView() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useDragSelectMouseConflictHandler(containerRef);

    const { createFileElement } = useFile();

    /**
     * 选择文件
     */
    const selectFile = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        inputRef.current?.click();
    };

    return (
        <>
            <ElementMenuItem ref={containerRef} icon={<PhotographIcon className="w-6 h-6" />} name="图片" onClick={selectFile} />
            <input ref={inputRef} type="file" accept={imageMimeTypes.join(',')} style={{ display: 'none' }} onChange={createFileElement} />
        </>
    );
}
