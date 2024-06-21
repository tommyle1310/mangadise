'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import useFetchDetailManga from '@/hooks/useFetchDetailManga'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { myListArrs } from '@/lib/constants'

const page = () => {
    const params = useParams()

    const { detailManga } = useFetchDetailManga(params.slug.toString())
    console.log(detailManga?.thumb_url);

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
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default page
