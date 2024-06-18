import Category from '@/components/customComponents/Category'
import React from 'react'

const page = () => {
    return (
        <div className='tw-fc -mt-3'>
            <Category title={{ normal: 'Popular', bold: 'this month' }} list={[{
                title: 'title',
                author: 'string',
                chapter: 0,
                categories: ['asd', 'asd', 'asdsa'],
                star: 0,
                poster: 'string'
            }]} type='POPULAR_THIS_MONTH' />
            <Category title={{ normal: 'All', bold: 'uploads' }} list={[{
                title: 'title',
                author: 'string',
                chapter: 0,
                categories: ['asd', 'asd', 'asdsa'],
                star: 0,
                poster: 'string'
            }]} type='ALL_UPLOADS' />
            <Category title={{ normal: 'Recent', bold: 'uploads' }} list={[{
                title: 'title',
                author: 'string',
                chapter: 0,
                categories: ['asd', 'asd', 'asdsa'],
                star: 0,
                poster: 'string'
            }]} type='ALL_UPLOADS' />
        </div>
    )
}

export default page
