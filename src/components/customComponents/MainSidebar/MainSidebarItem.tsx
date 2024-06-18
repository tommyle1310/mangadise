import React from 'react';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type MainSidebarItemProps = {
    icon: string;
    title: string;
    link: string;
    active: boolean
};

const MainSidebarItem: React.FC<MainSidebarItemProps> = ({ icon, title, link, active }) => {
    const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon | undefined;

    return (
        <Link href={link}>
            <Button variant={active ? "default" : 'ghost'} className='flex justify-start gap-2 w-full'>
                {IconComponent && <IconComponent className="mr-2 -mt-1 h-5 w-5" />}
                {title}
            </Button>
        </Link>
    );
};

export default MainSidebarItem;
