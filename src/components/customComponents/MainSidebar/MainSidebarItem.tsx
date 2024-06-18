import React from 'react';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type MainSidebarItemProps = {
    icon: string;
    title: string;
};

const MainSidebarItem: React.FC<MainSidebarItemProps> = ({ icon, title }) => {
    const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon | undefined;

    return (
        <Button variant="ghost" className='flex justify-start gap-2'>
            {IconComponent && <IconComponent className="mr-2 -mt-1 h-5 w-5" />}
            {title}
        </Button>
    );
};

export default MainSidebarItem;
