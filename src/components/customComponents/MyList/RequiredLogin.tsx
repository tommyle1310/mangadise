import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Login from '@/components/customComponents/Auth/Login'

const RequiredLogin = () => {
    return (
        <div className='w-full col-span-2  tw-fc h-full ju justify-center gap-2'>
            <p className='text-center w-full text-sm text-muted-foreground'>Please login to use this feature</p>
            <Login />
        </div>
    )
}

export default RequiredLogin
