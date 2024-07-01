'use client'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import useFetchDetailManga from '@/hooks/useFetchDetailManga'
import { Button } from '@/components/ui/button'
import { maximizeWordLimit } from '@/lib/helperFuncs'

const DiscoverSlugPage = () => {
    const params = useParams()
    const router = useRouter()

    const { detailManga } = useFetchDetailManga(params.slug.toString())
    const handleRead = async (item: {
        filename: string;
        chapter_title: string;
        chapter_api_data: string;
        chapter_name: string;
    }) => {
        const idChapter = (item.chapter_api_data.substring('https://sv1.otruyencdn.com/v1/api/chapter/'.length));
        const findEPPosition = (detailManga?.chapters[0].server_data.findIndex(i => i['chapter_api_data'] === item.chapter_api_data) || 0) + 1
        router.push(`/discover/${params.slug}/${idChapter}&${findEPPosition}`)

    }
    return (
        <div>
            {detailManga?.chapters.map(item => (
                <div key={item.server_name} className='tw-fc gap-4'>
                    <div className='tw-ic gap-4'>
                        <Button variant={'secondary'}>{item.server_name}</Button>
                    </div>
                    <div className="tw-fc gap-2">
                        {item.server_data.map((item, index) => (
                            <Button onClick={() => handleRead(item)} key={index} variant={'outline'} className='tw-ic justify-start gap-1 tw-md-sb bg-subSecondary'>EP <span className='tw-md-b text-primary'>{item.chapter_name}</span> {maximizeWordLimit(item.filename, 36)}</Button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DiscoverSlugPage
