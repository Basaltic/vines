import { applyPatches, Patch, produceWithPatches, Store } from '@vines/store';
import { safelyParseJSON } from '@vines/utils';
import { VinesNodeEntity } from '@/backend/vines-node-graph/vines-node.do';
import { IVinesNode } from './vines-node.interface';
import { IVinesNodeContent } from './vines-node-content';

export interface IVinesNodeState<C extends IVinesNodeContent = IVinesNodeContent> extends IVinesNode<C> {
    /**
     * 画布最大尺寸
     */
    maxRectSize?: { x: number; y: number };
    /**
     * Child node ids;
     */
    children: string[];
}

export class VinesNode<C extends IVinesNodeContent = IVinesNodeContent> extends Store<IVinesNodeState<C>> {
    constructor(props: IVinesNodeState<C>) {
        const defaultState: IVinesNodeState<C> = { ...props };
        const name = `node_${defaultState.type}_${defaultState.id}`;
        super({ name, defaultState });
    }

    get id() {
        return this.state$.get().id;
    }

    get type() {
        return this.state$.get().type;
    }

    get content() {
        return this.state$.get().content;
    }

    get above() {
        return this.state$.get().above;
    }

    get order() {
        return this.state$.get().order;
    }

    get children() {
        return this.state$.get().children;
    }

    get x() {
        return this.state$.get().x;
    }

    get y() {
        return this.state$.get().y;
    }

    get ctime() {
        return this.state$.get().ctime;
    }

    get utime() {
        return this.state$.get().utime;
    }

    get dtime() {
        return this.state$.get().dtime;
    }

    appendChild(id?: string) {
        if (!id) return;

        this.state$.set((draft) => {
            draft.children.push(id);
        });
    }

    appendChildAfter(afterId: string, id: string) {
        this.state$.set((draft) => {
            const index = draft.children?.findIndex((v) => v === afterId);
            if (index) {
                draft.children?.splice(index, 0, id);
            }
        });
    }

    appendChildBefore(beforeId: string, id: string) {
        this.state$.set((draft) => {
            const index = draft.children?.findIndex((v) => v === beforeId);
            if (index) {
                draft.children?.splice(index - 1, 0, id);
            }
        });
    }

    removeChild(id?: string) {
        if (!id) return;

        this.state$.set((draft) => {
            draft.children = draft.children?.filter((cid) => cid !== id);
        });
    }

    changeState(partialState: Partial<IVinesNodeState> = {}) {
        this.state$.set((draft) => {
            return { ...draft, ...partialState };
        });
    }

    updateContent<C>(partialContent: Partial<C>): [Patch[], Patch[]] {
        const [, patches, inversePatches] = produceWithPatches(this.content, (draft) => {
            return Object.assign(draft, partialContent);
        });
        this.state$.set((draft) => {
            draft.content = Object.assign(draft.content, partialContent);
        });

        return [patches, inversePatches];
    }

    updateContentByChangePatches(changes: Patch[]) {
        this.state$.set((draft) => {
            const nextContent = applyPatches(draft.content, changes);
            draft.content = nextContent;
        });
    }

    static create(inode: IVinesNode) {
        const node = new VinesNode({ ...inode, children: [] });
        return node;
    }

    static createByEntity(nodeEntity: VinesNodeEntity) {
        const parsedContent = safelyParseJSON(nodeEntity.content) || {};
        const node = new VinesNode({ ...nodeEntity, content: parsedContent, children: [] });
        return node;
    }
}
