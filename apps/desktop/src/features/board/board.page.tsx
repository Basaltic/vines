import { DragDropProvider } from '@dnd-kit/react';
import { useParams } from '@tanstack/react-router';
import { BoardCanvas } from './containers/board-canvas';
import { NavBreadcrumb } from './containers/nav-breadcrumb';
import { BoardMenu } from './containers/board-menu';
import { useRequest } from 'ahooks';
import { controllers } from '@/backend';

function useBoardInitialization() {
    const params = useParams({ from: '__root__', strict: true });

    const { id } = params;

    const { data, loading } = useRequest(controllers.library.open, { defaultParams: [id], ready: Boolean(id) });
}

/**
 * A Board to manage all the nodes
 */
export function WhiteBoardPage() {
    return (
        <DragDropProvider>
            <div className="relative w-full h-full flex">
                <Main>
                    <BoardMenu />
                    <NavBreadcrumb />

                    {/* 内容层 Canvas / Finder(Node Tree) */}
                    <BoardCanvas />
                </Main>
            </div>
        </DragDropProvider>
    );
}

function Main(props: { children: React.ReactNode }) {
    return <div className="relative grow">{props.children}</div>;
}
