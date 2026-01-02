import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import { useCommands } from '@/workspace/graph/use-commands';

interface ElementWidgetsProps {
    nodeId: string;
}

export function ElementWidgets(props: ElementWidgetsProps) {
    const { nodeId } = props;
    const commands = useCommands();

    const handleGoToNested = () => {
        commands.navigate(nodeId);
    };

    return (
        <div className="flex absolute top-[-24px] w-5 h-5">
            <ViewfinderCircleIcon onClick={handleGoToNested} />
        </div>
    );
}
