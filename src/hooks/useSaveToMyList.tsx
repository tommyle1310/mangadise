import { useState } from 'react';
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { IMangaProps } from '@/hooks/useFetchHomePage'
import { RootState } from '@/lib/store';
import { AuthState } from '@/lib/features/auth/authSlice';

const useSaveToMyList = (user: AuthState) => {
    const handleSaveToMyList = async (type: string, manga: IMangaProps) => {
        if (user?.email === null || user?.email === '') {
            toast({
                title: "This action is not allowed",
                description: "Please login to use this feature.",
                action: (
                    <ToastAction altText="Goto schedule to undo">Close</ToastAction>
                ),
            });
        } else {
            const response = await fetch('/api/my-list/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
                    owner: user.email,
                    slug: manga.slug
                })
            });
            const data = await response.json();
            console.log(data);
            if (data?.EC === 0) {
                toast({
                    title: `Successfully added this manga to ${type} list`,
                    description: "You can find it anytime in My list",
                    action: (
                        <ToastAction altText="Goto schedule to undo">Close</ToastAction>
                    ),
                });
            }
        }
    };

    return { handleSaveToMyList };
};

export default useSaveToMyList;
