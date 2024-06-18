import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const Home = () => {
    return (
        <div className='tw-fc w-full border-l-2 border-primary pt-2'>
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

            <div className="bg-black pb-10 text-white p-5 px-10 tw-fc gap-4">
                <div className="tw-jb ">
                    <h3 className='tw-lg-b gap-1 tw-ic'>Popular<span className='text-destructive'>this month</span> </h3>
                    <div className="gap-1 tw-ic">
                        <Button variant="outline" size="icon">
                            <ChevronLeft className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4 text-primary" />
                        </Button>
                    </div>
                </div>
                <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-10">
                    {[1, 2, 3, 4, 5].map(item => (
                        <div key={item} className="h-[32rem] border tw-fc">
                            <Skeleton className="flex-1 w-full" />
                            <Separator />
                            <div className="tw-cc tw-fc gap-3 p-2">
                                <Skeleton className='w-24 h-7' />
                                <Skeleton className='w-36 h-6' />
                            </div>
                            <Separator />
                            <div className="tw-fc  gap-2 p-2">
                                <div className="tw-ic gap-2 p-2">
                                    <Skeleton className='h-5 w-10' />
                                    <Skeleton className='h-5 w-12' />
                                </div>
                                <Skeleton className='h-8 w-full' />
                                <Skeleton className='h-6 w-32' />
                                <Skeleton className='h-9 w-32' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
