import { Extension } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';

export function getExtensions(): Extension<any>[] {
    return [StarterKit.configure(), Placeholder.configure({ placeholder: '输入内容' })];
}
