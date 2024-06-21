'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { mainSidebarItem } from '@/lib/constants'
import MainSidebarItem from './MainSidebarItem'



const MainSidebar = () => {
  const pathname = usePathname()


  return (
    <div className='tw-fc gap-3 -mt-20'>
      {mainSidebarItem.map(item => (
        <MainSidebarItem key={item.title} icon={item.icon} title={item.title} link={item.link} active={item.link === '/' && pathname === '/' || item.link !== '/' && pathname.startsWith(item.link)} />
      ))}
    </div>
  )
}

export default MainSidebar
