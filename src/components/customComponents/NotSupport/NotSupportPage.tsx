'use client'
import NotSupportPageModal from './NotSupportPageModal'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Filter, Search } from 'lucide-react'
import React, { useState } from 'react'

const NotSupportPage = ({ feature }: { feature: string }) => {
    return (
        <div className='max-w-screen-xl mx-auto tw-fc pt-4 gap-4'>
            <div className="tw-jb">
                <h3 className='tw-xl-b'>{feature}</h3>
                <Label htmlFor='search-input-author' className="py-3 px-5 rounded-full shadow-md shadow-bottom-right shadow-primary gap-3 flex items-center border ">
                    <Search />
                    <input id='search-input-author' className='border-none focus:ring-0 outline-none bg-transparent max-sm:hidden' />
                    <Separator orientation="vertical" />
                    <Filter />
                </Label>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5].map(item => (
                    <div key={item} className='tw-ic gap-3 border-2 border-secondary p-3 rounded-lg'>
                        <Skeleton className="w-2/5 h-full "></Skeleton>
                        <div className="tw-fc gap-3">
                            <Skeleton className='w-24 h-8' />
                            <Skeleton className='w-12 h-6' />
                            <div className="tw-ic gap-3">
                                <Skeleton className='w-12 h-6' />
                                <Skeleton className='w-12 h-6' />
                            </div>
                            <Skeleton className='w-16 h-6' />
                            <Skeleton className='w-24 h-6' />
                        </div>
                    </div>
                ))}

            </div>

            <div className="max-w-xl mx-auto">
                <NotSupportPageModal />
            </div>
        </div>
    )
}

export default NotSupportPage
