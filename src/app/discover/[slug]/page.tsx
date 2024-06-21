'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import useFetchDetailManga from '@/hooks/useFetchDetailManga'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { myListArrs } from '@/lib/constants'

const page = () => {
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
        <div className='p-3 tw-fc w-full'>
            <Tabs defaultValue="overview" className="max-w-screen-lg w-full mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="chapter">Chapter</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className='grid grid-cols-5 w-full p-4 gap-4'>
                    <div style={{
                        backgroundImage: `url('https://otruyenapi.com/uploads/comics/${detailManga?.thumb_url}')`,
                        backgroundSize: 'cover',
                    }} className="col-span-1 aspect-square shadow-md shadow-primary rounded-lg"></div>
                    <div className="tw-fc gap-4 p-2 w-full  col-span-4">
                        <h3 className='tw-xl-b text-primary'>{detailManga?.name}</h3>
                        <div className='text-sm' dangerouslySetInnerHTML={{ __html: detailManga?.content ?? '' }} />
                        <div className="tw-fc gap-1">
                            <p className='tw-lg-sb'>Category</p>
                            <div className="tw-ic flex-wrap gap-4">
                                {detailManga?.category.map(item => (
                                    <Button key={item.id} >{item.name}</Button>
                                ))}
                            </div>
                        </div>
                        <div className="tw-fc gap-1">
                            <p className='tw-lg-sb'>My List</p>
                            <div className="tw-ic flex-wrap gap-4">
                                {myListArrs?.map(item => (
                                    <Button key={item.title} variant={'outline'} className=''>{item.title}</Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="chapter">
                    {detailManga?.chapters.map(item => (
                        <div key={item.server_name} className='tw-fc gap-4'>
                            <div className='tw-ic gap-4'>
                                <Button variant={'secondary'}>{item.server_name}</Button>
                            </div>
                            <div className="tw-fc gap-2">
                                {item.server_data.map((item, index) => (
                                    <Button onClick={() => handleRead(item)} key={index} variant={'outline'} className='tw-ic justify-start gap-1 tw-md-sb bg-subSecondary'>EP <span className='tw-md-b text-primary'>{item.chapter_name}</span> {item.filename}</Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default page
