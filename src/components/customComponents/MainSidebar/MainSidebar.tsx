import React from 'react'
import { mainSidebarItem } from '@/lib/constants'
import MainSidebarItem from './MainSidebarItem'



const MainSidebar = () => {
  return (
    <div className='tw-fc gap-3 -mt-20'>
      {mainSidebarItem.map(item => (
        <MainSidebarItem icon={item.icon} title={item.title} />
      ))}
    </div>
  )
}

export default MainSidebar
