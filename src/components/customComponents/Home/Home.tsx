import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import Category from '../Category'

const Home = () => {
    return (
        <div className='tw-fc w-full  pt-2'>
            <div className="px-10">
                <div className="tw-jb ">
                    <h3 className='tw-lg-b'>Out now</h3>
                    <div className="gap-1 tw-ic">
                        <Button variant="outline" size="icon">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <Carousel className="max-w-[72rem] mx-auto">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="gap-12 tw-fc p-6">
                                            <div className="flex justify-between">
                                                <div className="tw-fc pl-10 gap-4">
                                                    <Skeleton className='w-56 h-10' />
                                                    <Skeleton className='w-80 h-16' />
                                                    <Skeleton className='w-64 h-12' />
                                                </div>
                                                <Skeleton className='w-56 h-10' />
                                            </div>
                                            <Skeleton className='w-48 h-8' />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="tw-jb ">
                    <h3 className='tw-lg-b'><span className='text-destructive'>Hot</span> Categories</h3>
                    <div className="gap-1 tw-ic">
                        <Button variant="outline" size="icon">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 border rounded-t-2xl p-4 bg-subMain justify-center">
                    <Skeleton className='h-12 w-48' />
                    <Skeleton className='h-12 w-64' />
                    <Skeleton className='h-12 w-56' />
                    <Skeleton className='h-12 w-80' />
                    <Skeleton className='h-12 w-24' />
                    <Skeleton className='h-12 w-36' />
                    <Skeleton className='h-12 w-56' />
                    <Skeleton className='h-12 w-48' />
                    <Skeleton className='h-12 w-48' />
                </div>
            </div>

            <Category title={{ normal: 'Popular', bold: 'this month' }} list={[{
                title: 'title',
                author: 'string',
                chapter: 0,
                categories: ['asd', 'asd', 'asdsa'],
                star: 0,
                poster: 'string'
            }]} type='POPULAR_THIS_MONTH' />
        </div>
    )
}

export default Home
