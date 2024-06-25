'use client'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Filter, Menu, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import useFetchSearch from '@/hooks/useFetchSearch'
import MainSidebarItem from '../MainSidebar/MainSidebarItem'
import { mainSidebarItemMobile } from '@/lib/constants'
import { usePathname } from 'next/navigation'


const NavBar = () => {
    const [isShowUserAvatar, setIsShowUserAvatar] = useState<boolean>(true)
    const pathname = usePathname()


    const { handleSearch, query, setQuery } = useFetchSearch();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(query); // Trigger search when Enter key is pressed
        }
    };

    return (
        <div className="  z-20 bg-secondary w-full  fixed border-b-2 border-primary shadow-sm shadow-bottom-right shadow-primary ">
            <div className="max-w-screen-2xl mx-auto tw-jb p-4">
                <div className="2xl:hidden max-2xl:block">
                    <Sheet >
                        <SheetTrigger asChild>
                            <Button variant="outline"> <Menu /></Button>
                        </SheetTrigger>
                        <SheetContent className='max-sm:w-[90%]' side='left'>
                            <SheetHeader>
                                <SheetTitle className='text-primary'>Mangadise</SheetTitle>
                                <SheetDescription className='max-sm:hidden'>
                                    Explore world of manga with the best quality in Vietnamese.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <Label htmlFor='search-input' className=" w-full  px-2 py-1 max-sm:py-3 tw-jb 2xl:hidden rounded-full shadow-md shadow-bottom-right shadow-primary max-sm:gap-1 gap-3 flex items-center border ">
                                    <Search className='max-sm:hidden' />
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        id='search-input'
                                        className='border-none focus:ring-0 outline-none bg-transparent'
                                    />
                                    <div className="max-sm:hidden max-sm:text-xs">
                                        <Button className=' text-primary' onClick={() => handleSearch(query)} variant={'outline'}>Search</Button>
                                    </div>
                                    <Search className='sm:hidden size-4 text-primary' />
                                </Label>
                                {mainSidebarItemMobile.map(item => (
                                    <MainSidebarItem key={item.title} icon={item.icon} title={item.title} link={item.link} active={item.link === '/' && pathname === '/' || item.link !== '/' && pathname.startsWith(item.link)} />
                                ))}
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>


                <div className="p-3 bg-destructive">Managadise</div>
                <div className="flex gap-3 ">
                    <Label htmlFor='search-input' className="py-3 px-5 max-2xl:hidden rounded-full shadow-md shadow-bottom-right shadow-primary gap-3 flex items-center border ">
                        <Search />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            id='search-input'
                            className='border-none focus:ring-0 outline-none bg-transparent'
                        />
                        <Separator orientation="vertical" />
                        <Filter />
                    </Label>
                    {isShowUserAvatar ?
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>Billing</span>
                                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Keyboard className="mr-2 h-4 w-4" />
                                        <span>Keyboard shortcuts</span>
                                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>Team</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            <span>Invite users</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    <span>Email</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                    <span>Message</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <PlusCircle className="mr-2 h-4 w-4" />
                                                    <span>More...</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem>
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span>New Team</span>
                                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Github className="mr-2 h-4 w-4" />
                                    <span>GitHub</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LifeBuoy className="mr-2 h-4 w-4" />
                                    <span>Support</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem disabled>
                                    <Cloud className="mr-2 h-4 w-4" />
                                    <span>API</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> :
                        <>
                            <Login />
                            <div className="max-sm:hidden">
                                <Signup />
                            </div>
                        </>
                    }


                </div>
            </div>
        </div>
    )
}

export default NavBar
