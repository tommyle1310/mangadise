import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import { IMangaProps } from '@/hooks/useFetchHomePage'
import { maximizeWordLimit } from '@/lib/helperFuncs'
import { FaHeart } from 'react-icons/fa'
import CustomPagination from './customPagination'
import { useRouter } from 'next/navigation'

type CategoryProps = {
    title: {
        normal: string,
        bold?: string
    }
    type: string
    list: IMangaProps[]
    isLoading: boolean,
    currentPage: number
    handleNext: () => void
    handlePrev: () => void
    handlePageChange: (pageNumber: number) => void
    totalPages: number
}



const Category: React.FC<CategoryProps> = ({ title, type, list, isLoading, currentPage, handleNext, handlePrev, handlePageChange, totalPages }) => {
    const router = useRouter()
    const handleGoToDetail = async (manga: IMangaProps) => {
        // console.log(`/discover/${manga.slug}`);

        router.push(`/discover/${manga.slug}`)
    }


    if (isLoading || !list) return (
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
    return (
        <div className="bg-black pb-10 text-white p-5 sm:px-10 tw-fc gap-4">
            <div className="tw-jb ">
                <h3 className='tw-lg-b gap-1 tw-ic'>{title.normal}<span className='text-destructive'>{title.bold}</span> </h3>

            </div>

            <div className="max-xl:hidden">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="max-w-screen-xl tw-jb "
                >
                    <CarouselContent>
                        {list.map((manga, index) => (
                            <CarouselItem key={index} className=" min-w-64 w-full xl:basis-1/5">
                                <Card>
                                    <div onClick={() => handleGoToDetail(manga)} className='tw-hv-sd'>
                                        <CardContent className="flex h-[32rem] tw-fc gap-3 p-4">
                                            <div className="flex-1 w-full" style={{
                                                backgroundImage: `url('https://otruyenapi.com/uploads/comics/${manga.thumb_url}')`,
                                                backgroundSize: 'cover',
                                            }} />
                                            <Separator />
                                            <div className="tw-cc tw-fc gap-3">
                                                <h4 className='text-primary text-center tw-lg-sb'>{maximizeWordLimit(manga.name, 30)}</h4>
                                            </div>
                                            <Separator />
                                            <div className="tw-fc  gap-2 p-2">
                                                {
                                                    manga?.chaptersLatest?.length > 0 ?
                                                        <div className="tw-md-sb tw-ic gap-1 p-2">
                                                            <span className='text-subMain'> {manga.chaptersLatest[0]?.chapter_name}</span>
                                                            <h5>Chapter</h5>
                                                        </div> :
                                                        <span className='text-subMain tw-md-sb'> No chapter available.</span>

                                                }
                                                <div className="tw-ic flex-wrap">{maximizeWordLimit(manga.category.map((item, i, arr) => i === arr.length - 1 ? `${item.name}` : ` ${item.name} -`).join(' '))}</div>
                                                <div className="tw-ic">
                                                    <Button onClick={(e) => { e.stopPropagation() }} variant={'outline'} className='hover:text-white group hover:bg-destructive bg-transparent z-10 tw-ic gap-1'><FaHeart className='text-destructive group-hover:text-white' />Save</Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="xl:hidden max-xl:gap-4 max-xl:grid grid-cols-2 lg:grid-cols-3">
                {list.map((manga, index) => (
                    <Card key={index} className='w-full mx-auto '>
                        <div onClick={() => handleGoToDetail(manga)} className='tw-hv-sd '>
                            <CardContent className="flex sm:h-[32rem] tw-fc gap-3 sm:p-4 max-sm:p-0  ">
                                <div className="flex-1 w-full aspect-square" style={{
                                    backgroundImage: `url('https://otruyenapi.com/uploads/comics/${manga.thumb_url}')`,
                                    backgroundSize: 'cover',
                                }} />
                                <Separator className='max-sm:hidden ' />
                                <h4 className='text-primary text-center tw-lg-sb max-sm:text-[12px] max-sm:leading-4'>{maximizeWordLimit(manga.name, 16)}</h4>

                                <Separator className='max-sm:hidden' />
                                <div className="tw-fc  gap-2 sm:p-2">
                                    {
                                        manga?.chaptersLatest?.length > 0 ?
                                            <div className="tw-md-sb tw-ic gap-1 p-2 max-sm:text-[10px]">
                                                <span className='text-subMain max-sm:text-[10px]'> {maximizeWordLimit(manga.chaptersLatest[0]?.chapter_name, 10)}</span>
                                                <h5>Chapter</h5>
                                            </div> :
                                            <span className='text-subMain tw-md-sb max-sm:text-[10px] p-2 leading-4 '> No chapter available.</span>

                                    }
                                    <div className="tw-ic max-sm:hidden flex-wrap">{maximizeWordLimit(manga.category.map((item, i, arr) => i === arr.length - 1 ? `${item.name}` : ` ${item.name} -`).join(' '))}</div>
                                    <div className="tw-ic max-sm:hidden">
                                        <Button onClick={(e) => { e.stopPropagation() }} variant={'outline'} className='hover:text-white group hover:bg-destructive bg-transparent z-10 tw-ic gap-1'><FaHeart className='text-destructive group-hover:text-white' />Save</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>

            <CustomPagination
                currentPage={currentPage}
                handleNext={handleNext}
                handlePageChange={handlePageChange}
                handlePrev={handlePrev}
                totalPages={totalPages}
            />
        </div>
    )
}

export default Category



