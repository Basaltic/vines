import { controllers } from '@/backend';
import { boardRoute } from '@/features/board/route';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

/**
 * First Use Setup
 */
export function FirstUseSetupPage() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        //  创建
        const res = await controllers.library.create({ name });

        const { id } = res.data;

        navigate({ to: boardRoute.path, params: { id } as any });
    };

    return (
        <div>
            <input placeholder="Library Name" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="button" onClick={handleCreate}>
                Create
            </button>
        </div>
    );
}
