import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { myListArrs } from '@/lib/constants'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Modal from 'react-responsive-modal'
import Link from 'next/link'
import RequiredLogin from './MyList/RequiredLogin'
import { useToast } from '../ui/use-toast'
import { ToastAction } from '../ui/toast'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { ScrollArea } from '../ui/scroll-area'
import useSaveToMyList from '@/hooks/useSaveToMyList'

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
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { toast } = useToast()
    const user = useSelector((state: RootState) => state.auth.auth)

    const handleGoToDetail = async (manga: IMangaProps) => {
        router.push(`/discover/${manga.slug}`)
    }

    const { handleSaveToMyList } = useSaveToMyList(user);


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
                                <CardContent className="flex h-52 tw-fc gap-3 p-4">
                                    <Skeleton className="flex-1 w-full" />
                                    <Separator />
                                    <div className="tw-cc tw-fc gap-3">
                                        <Skeleton className='w-12 h-3' />
                                    </div>
                                    <Separator />
                                    <div className="tw-fc  gap-2 p-2">
                                        <div className="tw-ic gap-2 p-2">
                                            <Skeleton className='h-2 w-4' />
                                            <Skeleton className='h-2 w-6' />
                                        </div>
                                        <Skeleton className='h-4 w-full' />
                                        <Skeleton className='h-4 w-20' />
                                        <Skeleton className='h-4 w-16' />
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
        <>
            <div className="bg-black pb-10 text-white p-5 sm:px-10 tw-fc gap-4">
                <div className="tw-jb ">
                    <h3 className='tw-lg-b gap-1 tw-ic'>{title.normal}<span className='text-destructive'>{title.bold}</span> </h3>

                </div>

                <div className="max-xl:hidden">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="max-w-screen-lg tw-jb "
                    >
                        <CarouselContent>
                            {list.map((manga, index) => (
                                <CarouselItem key={index} className=" min-w-44 w-full xl:basis-1/5">
                                    <Card>
                                        <AspectRatio ratio={9 / 20} onClick={() => handleGoToDetail(manga)} className='tw-hv-sd'>
                                            <CardContent className="flex  tw-fc gap-3 p-4">
                                                <img className="flex-1 aspect-square object-cover w-full" src={
                                                    `https://otruyenapi.com/uploads/comics/${manga.thumb_url}`
                                                } />
                                                <Separator />
                                                <ScrollArea className="tw-cc tw-fc gap-3 h-10 ">
                                                    <h4 className='text-primary text-center tw-md-b'>{manga.name}</h4>
                                                </ScrollArea>
                                                <Separator />
                                                <div className="tw-fc  gap-2 p-2">
                                                    {
                                                        manga?.chaptersLatest?.length > 0 ?
                                                            <div className="tw-sm-sb tw-ic gap-1 p-2">
                                                                <span className='text-subMain'> {manga.chaptersLatest[0]?.chapter_name}</span>
                                                                <h5>Chapter</h5>
                                                            </div> :
                                                            <span className='text-subMain tw-sm-sb'> No chapter available.</span>

                                                    }
                                                    {/* <div className="tw-ic flex-wrap">{maximizeWordLimit(manga.category.map((item, i, arr) => i === arr.length - 1 ? `${item.name}` : ` ${item.name} -`).join(' '))}</div> */}
                                                    <div className="tw-ic">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button onClick={(e) => { e.stopPropagation() }} variant={'outline'} className='hover:text-white group hover:bg-destructive bg-transparent z-10 tw-ic gap-1'><FaHeart className='text-destructive group-hover:text-white' />Save</Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader className='gap-4 max-md:gap-2 tw-fc z-50'>
                                                                    <DialogTitle className='text-center tw-3xl-b'><span className='text-primary'>Mangadise</span></DialogTitle>
                                                                    <DialogDescription className='text-center'>
                                                                        Where do you want to save this manga?
                                                                    </DialogDescription>
                                                                    <Separator></Separator>
                                                                    <RadioGroup className='grid grid-cols-2 gap-2'>
                                                                        {myListArrs.slice(2).map(item => (
                                                                            <div key={item.title} className=" space-x-2">
                                                                                <RadioGroupItem onClick={(e) => { e.stopPropagation(); handleSaveToMyList(item.title, manga) }} value={item.title} id={item.title} />
                                                                                <Label htmlFor={item.title}>{item.title}</Label>
                                                                            </div>
                                                                        ))}
                                                                    </RadioGroup>

                                                                </DialogHeader>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </AspectRatio>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="xl:hidden max-xl:gap-4 max-xl:grid grid-cols-2 lg:grid-cols-3">
                    {list.map((manga, index) => (
                        <Card key={index} className='w-full mx-auto overflow-hidden shadow-md shadow-primary'>
                            <div onClick={() => handleGoToDetail(manga)} className='tw-hv-sd '>
                                <CardContent className="flex sm:h-[32rem] tw-fc gap-2 sm:p-4 max-sm:p-0  ">
                                    <div className="flex-1 w-full aspect-square" style={{
                                        backgroundImage: `url('https://otruyenapi.com/uploads/comics/${manga.thumb_url}')`,
                                        backgroundSize: 'cover',
                                    }} />
                                    <Separator className='max-sm:hidden ' />
                                    <h4 className='text-primary p-3 leading-4 max-sm:leading-[20px] tw-lg-sb text-sm'>{maximizeWordLimit(manga.name, 30)}</h4>

                                    <Separator className='max-sm:hidden' />
                                    <div className="tw-fc  gap-2 sm:p-2">
                                        {
                                            manga?.chaptersLatest?.length > 0 ?
                                                <div className="tw-md-sb tw-ic gap-1 px-3 pb-3 text-xs">
                                                    <span className='text-subMain '> {maximizeWordLimit(manga.chaptersLatest[0]?.chapter_name, 10)}</span>
                                                    <h5>Chapter</h5>
                                                </div> :
                                                <span className='text-subMain tw-md-sb text-xs p-2 leading-4 '> No chapter available.</span>

                                        }
                                        <div className="tw-ic max-sm:hidden flex-wrap">{maximizeWordLimit(manga.category.map((item, i, arr) => i === arr.length - 1 ? `${item.name}` : ` ${item.name} -`).join(' '))}</div>
                                        <div className="tw-ic max-sm:hidden ">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant={'outline'} className='hover:text-white group hover:bg-destructive bg-transparent z-10 tw-ic gap-1'><FaHeart className='text-destructive group-hover:text-white' />Save</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader className='gap-4 max-md:gap-2 tw-fc z-50'>
                                                        <DialogTitle className='text-center tw-3xl-b'><span className='text-primary'>Mangadise</span></DialogTitle>
                                                        <DialogDescription className='text-center'>
                                                            Where do you want to save this manga?
                                                        </DialogDescription>
                                                        <Separator></Separator>
                                                        <RadioGroup className='grid grid-cols-2 gap-2'>
                                                            {myListArrs.slice(2).map(item => (
                                                                <div key={item.title} className=" space-x-2">
                                                                    <RadioGroupItem onClick={(e) => { e.stopPropagation(); handleSaveToMyList(item.title, manga) }} value={item.title} id={item.title} />
                                                                    <Label htmlFor={item.title}>{item.title}</Label>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>

                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
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
            <Modal classNames={{
                modal: 'customModal',
            }} open={open} onClose={() => { onCloseModal(); router.push('/') }}  >
                <RequiredLogin />
            </Modal>
        </>

    )
}

export default Category



