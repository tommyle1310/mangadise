'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const page = () => {
    const params = useParams()
    console.log(params);


    return (
        <div className='p-3  bg-green-500'>
            hello world
        </div>
    )
}

export default page
