import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@vines/ui/components/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@vines/ui/components/form';
import { Input } from '@vines/ui/components/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppUseCases } from '@/backend/usecase.hook';
import { VinesAppLogo } from '@/common/components/app-logo';

const FormSchema = z.object({
    workspaceName: z.string().min(1, {
        message: 'workspace name must be at least 1 character.',
    }),
});

export const FirstUseSetupPage = () => {
    const navigate = useNavigate();
    const appUseCases = useAppUseCases();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { workspaceName: '' },
    });

    const handleClickStartToUse = async (data: z.infer<typeof FormSchema>) => {
        const res = await appUseCases.firstUseSetup({ name: data.workspaceName });

        if (res.success) {
            navigate({ from: '/first-use-setup', to: `/workspace/${res.data?.id}/${res.data?.displayingNodeId}` });
        }
    };

    return (
        <div className="w-full h-full">
            <div className="absolute top-4 left-4">
                <VinesAppLogo />
            </div>
            <div className="w-full h-full flex justify-center items-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleClickStartToUse)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="workspaceName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workspace Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Input your first workspace name" {...field} />
                                    </FormControl>
                                    <FormDescription>Create your first workspace and start to use vines.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
