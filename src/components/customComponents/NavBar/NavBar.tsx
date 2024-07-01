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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { signOut, useSession } from 'next-auth/react'
import { signOut as logOut } from '../../../lib/features/auth/authSlice'
import { handleLogin } from '@/lib/authOptions'
import Link from 'next/link'


const NavBar = () => {
    const { data: session } = useSession()
    const dispatch = useDispatch()

    const [isShowUserAvatar, setIsShowUserAvatar] = useState<boolean>(false)
    const pathname = usePathname()
    const user = useSelector((state: RootState) => state.auth.auth)

    useEffect(() => {
        if (!user.avatar || !user.email || !user.name) {
            setIsShowUserAvatar(false)
        } else {
            setIsShowUserAvatar(true)
        }

    }, [user])
    console.log('check data', session);


    useEffect(() => {
        // If session exists and is valid, log the user in
        if (!session?.user) {
            dispatch(logOut());
        } else if (session.user.name != null && session.user.email != null && session.user.image != null) {
            const user = {
                name: session.user.name,
                email: session.user.email,
                avatar: session.user.image,
            };
            handleLogin(user);
        }
    }, [session]);


    const { handleSearch, query, setQuery } = useFetchSearch();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(query); // Trigger search when Enter key is pressed
        }
    };

    return (
        <div className="  z-20 bg-white w-full  fixed border-b-2 border-primary shadow-sm shadow-bottom-right shadow-primary ">
            <div className="max-w-screen-2xl mx-auto tw-jb p-4">
                <div className="2xl:hidden max-2xl:block">
                    <Sheet >
                        <SheetTrigger asChild>
                            <Button variant="outline"> <Menu /></Button>
                        </SheetTrigger>
                        <SheetContent className='max-sm:w-[90%] overflow-y-scroll' side='left'>
                            <SheetHeader>
                                <SheetTitle className='text-primary'>Mangadise</SheetTitle>
                                <SheetDescription className='max-sm:hidden'>
                                    Explore world of manga with the best quality in Vietnamese.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <Label htmlFor='search-input' className=" w-full  px-4 py-1 max-sm:py-3 tw-jb 2xl:hidden rounded-full shadow-md shadow-bottom-right shadow-primary max-sm:gap-1 gap-3 flex items-center border ">
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
                        </SheetContent>
                    </Sheet>
                </div>


                <Link href='/' className='w-20 md:w-32'>
                    {/* <AspectRatio ratio={16 / 9} className="max-w-32 h-32 bg-red-300"> */}
                    <img
                        src={'https://res.cloudinary.com/dlavqnrlx/image/upload/v1719802260/mangadise_x5sjcl.png'}
                        alt="Manga Image"
                        className=" top-0 left-0 w-full mx-auto h-full object-fill md:rounded-lg"
                    />
                    {/* </AspectRatio> */}
                </Link>
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
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator /> */}
                                <DropdownMenuGroup>
                                    {/* <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem> */}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
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
