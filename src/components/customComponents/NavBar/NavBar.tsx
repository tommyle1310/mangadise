'use client'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Filter, Search } from 'lucide-react'
import React from 'react'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'


const NavBar = () => {

    return (
        <div className="tw-jb tw-ic p-4 border-b-2 border-primary shadow-sm shadow-bottom-right shadow-primary">
            <div className="p-3 bg-destructive">Managadise</div>
            <div className="flex gap-3">
                <Label htmlFor='search-input' className="py-3 px-5 rounded-full shadow-md shadow-bottom-right shadow-primary gap-3 flex items-center border ">
                    <Search />
                    <input id='search-input' className='border-none focus:ring-0 outline-none' />
                    <Separator orientation="vertical" />
                    <Filter />
                </Label>
                <Login />
                <Signup />
            </div>
        </div>
    )
}

export default NavBar
