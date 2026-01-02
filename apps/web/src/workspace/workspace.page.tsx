import { useParams } from '@tanstack/react-router';
import { useRequest } from 'ahooks';
import type React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PageLoading } from '@/common/components/page-loading';
import { DRAWER_WIDTH } from '@/common/constants';
import { VinesBoardCustomDragLayer } from './containers/vines-board-canvas/vines-board-custom-drag-layer';
import { VinesNodeCanvas } from './containers/vines-board-canvas/vines-node-canvas';
import { CanvasSideMenu } from './containers/vines-board-menu';
import { useBoardOperationSyncer, useCommands } from './graph/use-commands';

export function WorkspacePage() {
    useBoardOperationSyncer();

    const commands = useCommands();

    const { workspaceId } = useParams({ from: '/workspace/$workspaceId' });

    const { loading } = useRequest(() => commands.initialize(workspaceId), {});

    if (loading) {
        return <PageLoading />;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <WorkspaceContainer>
                <CanvasSideMenu />

                <VinesNodeCanvas />
            </WorkspaceContainer>

            <VinesBoardCustomDragLayer />
        </DndProvider>
    );
}

function WorkspaceContainer(props: { children: React.ReactNode }) {
    const open = false;

    return (
        <div className="relative w-full h-full flex">
            <div className="relative grow" style={{ width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' }}>
                {props.children}
            </div>
        </div>
    );
}
