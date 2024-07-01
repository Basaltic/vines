import { controllers } from '@/backend';
import { useNavigate } from '@tanstack/react-router';
import { useMount } from 'ahooks';
import { getCurrentNodeStore, useCurrentNodeStore } from '../board/store/board.store';

/**
 * The Entry Page of the Application
 * 1. do some initialization stuffs
 * 2. redirect to other feature pages
 */
export function LandingPage() {
    const navigate = useNavigate();

    useMount(async () => {
        // const lastPath = await controllers.app.openHistory.getFirst();
        // if (lastPath) {
        //     const result = await controllers.app.open(lastPath);
        //     navigate({ to: `/board/${result?.data?.id}` });
        // } else {
        //     navigate({ to: '/first-use-setup' });
        // }
        const currentNode = getCurrentNodeStore();
        console.log(currentNode);
        navigate({ to: `/board/${currentNode.state.get()?.id}` });
    });

    return <div></div>;
}
