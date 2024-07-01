import { controllers } from '@/backend';
import { Button } from '@viness/ui/components/button';
import { Input } from '@viness/ui/components/input';
import { useState } from 'react';

/**
 * First Use Setup
 */
export function FirstUseSetupPage() {
    const [name, setName] = useState('');

    const handleCreate = async () => {
        await controllers.app.create({ name });
    };

    const handleOpen = async () => {
        // await controllers.app.open();
    };

    return (
        <div>
            <Input placeholder="Library Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={handleCreate}>Create</Button>

            <Button onClick={handleOpen}>Open</Button>
        </div>
    );
}
