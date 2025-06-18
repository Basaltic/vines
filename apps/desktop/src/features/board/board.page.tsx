import { DragDropProvider } from '@dnd-kit/react';
import { useParams } from '@tanstack/react-router';
import { BoardCanvas } from './containers/board-canvas';
import { NavBreadcrumb } from './containers/nav-breadcrumb';
import { BoardMenu } from './containers/board-menu';
import { CardBoardEditorProvider } from './board.context';
import { cardBoardEditor } from './board';

function useBoardInitialization() {}

/**
 * A Board to manage all the nodes
 */
export function WhiteBoardPage() {
    return (
        <CardBoardEditorProvider value={cardBoardEditor}>
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
        </CardBoardEditorProvider>
    );
}

function Main(props: { children: React.ReactNode }) {
    return <div className="relative grow">{props.children}</div>;
}
