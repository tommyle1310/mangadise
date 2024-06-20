'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect } from 'react'
import { FaHeart } from "react-icons/fa";
import Category from '../Category'
import useFetchHomePage from '@/hooks/useFetchHomePage'
import useFetchCategories from '@/hooks/useFetchCategories'
import usePagination from '@/hooks/usePagination'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'


const Home = () => {
    const { homeData, isLoading, mangas } = useFetchHomePage()
    const { categories } = useFetchCategories()
    console.log(categories);


    const {
        currentItems,
        currentPage,
        totalPages,
        handlePageChange,
        handleNextPage,
        handlePreviousPage,
    } = usePagination(categories);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <PaginationLink
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-2 py-1 cursor-pointer ${currentPage === i ? 'bg-primary' : ''}`}
                >
                    {i}
                </PaginationLink>
            );
        }
        return pageNumbers;
    };



    if (isLoading) return (
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
                        {mangas?.slice(0, 5)?.map((manga, index) => (
                            <CarouselItem key={index} className=''>
                                <Card className=''>
                                    <CardContent className='m-0 p-0'>
                                        <div
                                            style={{
                                                backgroundImage: `url('https://otruyenapi.com/uploads/comics/${manga.thumb_url}')`,
                                                backgroundSize: 'cover',
                                            }}
                                            className="relative w-full h-full overflow-hidden rounded-lg p-4"
                                        >
                                            {/* Background overlay with blur effect */}
                                            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg" />
                                            <div className="flex justify-between p-4">
                                                <div className="flex gap-4 w-full z-10 text-white">
                                                    <div
                                                        style={{
                                                            backgroundImage: `url('https://otruyenapi.com/uploads/comics/${manga.thumb_url}')`,
                                                            backgroundSize: 'cover',
                                                        }}
                                                        className="relative w-1/5 aspect-square overflow-hidden rounded-lg bg-center"
                                                    />
                                                    <div className="tw-fc gap-4">
                                                        {/* Check if manga object and its properties are available */}
                                                        {manga && (
                                                            <>
                                                                <h2 className='text-subSecondary tw-3xl-b' style={{ textShadow: '2px 1px 1px rgba(255, 255, 255, 0.4)' }}>{manga.name}</h2>
                                                                <div className='tw-ic flex-wrap gap-2'>
                                                                    {/* Render category names */}
                                                                    {manga.category.map((item, index) => (
                                                                        <Button variant={'outline'} className='bg-transparent hover:text-primary' key={index}>{item.name}</Button>
                                                                    ))}
                                                                </div>
                                                                <div className="tw-ic ">
                                                                    <Button>Read</Button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button variant={'outline'} className='text-white hover:text-primary bg-transparent z-10 tw-ic gap-1'><FaHeart className='text-destructive' />Save</Button>
                                            </div>
                                            <div className="tw-ic">
                                                <div className='bg-white  px-3 py-2 rounded-lg relative'>
                                                    <span className='text-muted-foreground'>Latest EP: </span>
                                                    <span className='text-subMain'>{manga.chaptersLatest[0].chapter_name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="tw-jb ">
                    <h3 className='tw-lg-b'><span className='text-destructive'>Hot</span> Categories</h3>
                    <div className="gap-1 tw-ic">
                        <Button variant="outline" size="icon" onClick={handlePreviousPage}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleNextPage}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="tw-fc bg-subMain rounded-t-2xl p-2">
                    <div className="flex flex-wrap items-center gap-3 p-4  justify-center">
                        {currentItems?.map(item => (
                            <Button key={item._id} variant={'outline'} className='bg-subSecondary'>{item.name}</Button>
                        ))}
                    </div>
                    <div className="mx-auto text-white">
                        <Pagination className='bg-black rounded-lg p-2'>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious className='cursor-pointer' onClick={handlePreviousPage} />
                                </PaginationItem>
                                <PaginationItem className=''>
                                    {renderPageNumbers()}
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext className='cursor-pointer' onClick={handleNextPage} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
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
