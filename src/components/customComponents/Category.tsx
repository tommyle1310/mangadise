import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'

type CategoryProps = {
    title: {
        normal: string,
        bold: string
    }
    type: string
    list:
    {
        title: string,
        author: string,
        chapter: number,
        categories: string[],
        star: number,
        poster: string
    }[]
}

const Category: React.FC<CategoryProps> = ({ title, type, list }) => {
    return (
        <div className="bg-black pb-10 text-white p-5 px-10 tw-fc gap-4">
            <div className="tw-jb ">
                <h3 className='tw-lg-b gap-1 tw-ic'>{title.normal}<span className='text-destructive'>{title.bold}</span> </h3>
                <div className="gap-1 tw-ic">
                    <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4 text-primary" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4 text-primary" />
                    </Button>
                </div>
            </div>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="max-w-screen-xl tw-jb "
            >
                <CarouselContent>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                            <Card>
                                <CardContent className="flex h-[32rem] tw-fc gap-3 p-4">
                                    <Skeleton className="flex-1 w-full" />
                                    <Separator />
                                    <div className="tw-cc tw-fc gap-3">
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
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default Category
