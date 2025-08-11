import { useNavigate } from '@tanstack/react-router';
import { useRequest } from 'ahooks';
import { useAppUseCases } from '@/backend/usecase.hook';

/**
 * 落地页
 */
export function LandingPage() {
    const navigate = useNavigate();

    const appUseCases = useAppUseCases();

    useRequest(async () => {
        try {
            const res = await appUseCases.getWorkspaces();
            if (res.data && res.data.length > 0) {
                const workspace = res.data[0];
                if (workspace.displayingNodeId) {
                    navigate({ from: '/', to: `/workspace/${workspace.id}/${workspace.displayingNodeId}` });
                }
                return;
            }
        } catch (e) {
            console.log('error', e);
        }

        navigate({ from: '/', to: '/first-use-setup' });
    }, {});

    return null;
}
