'use client'
import MyListItem from '@/components/customComponents/MyList/MyListItem'
import { Button } from '@/components/ui/button'
import { myListArrs, myListConstants } from '@/lib/constants'
import { maximizeWordLimit } from '@/lib/helperFuncs'
import { RootState } from '@/lib/store'
import { HistoryDocument } from '@/models/history'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export interface IMyList {
    date: string
    manga: string
    poster: string
    slug: string
    _id: string
}



const page = () => {
    const [selectedTab, setSelectedTab] = useState<string>(myListConstants.READING);
    const user = useSelector((state: RootState) => state.auth.auth);
    const [history, setHistory] = useState<HistoryDocument | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [myList, setMyList] = useState<{
        _id: string,
        dropped: IMyList[],
        owner: string,
        stalled: IMyList[],
        wantToRead: IMyList[],
        wontRead: IMyList[],
        updatedAt: string
    }[]>([]);
    const [wantToRead, setWantToRead] = useState<IMyList[]>([]);
    const [dropped, setDropped] = useState<IMyList[]>([]);
    const [wontRead, setWontRead] = useState<IMyList[]>([]);
    const [stalled, setStalled] = useState<IMyList[]>([]);

    const renderMangaList = (selectedTab: string, myList: {
        _id: string,
        dropped: IMyList[],
        owner: string,
        stalled: IMyList[],
        wantToRead: IMyList[],
        wontRead: IMyList[],
        updatedAt: string
    }) => {
        switch (selectedTab) {
            case 'Want to read':
                return myList?.wantToRead?.length > 0 ? (
                    myList.wantToRead.map((item) => <MyListItem key={item._id} item={item} />)
                ) : (
                    <div className='w-full col-span-2  tw-fc justify-center gap-2'><p className='text-center w-full'>This list is empty</p>
                        <Link href='/discover'><Button variant={'outline'} className='bg-transparent border-primary text-primary'>Discover more mangas</Button></Link></div>
                );
            case 'Wont read':
                return myList?.wontRead?.length > 0 ? (
                    myList.wontRead.map((item) => <MyListItem key={item._id} item={item} />)
                ) : (
                    <div className='w-full col-span-2  tw-fc justify-center gap-2'><p className='text-center w-full'>This list is empty</p>
                        <Link href='/discover'><Button variant={'outline'} className='bg-transparent border-primary text-primary'>Discover more mangas</Button></Link></div>
                );
            case 'Stalled':
                return myList?.stalled?.length > 0 ? (
                    myList.stalled.map((item) => <MyListItem key={item._id} item={item} />)
                ) : (
                    <div className='w-full col-span-2  tw-fc justify-center gap-2'><p className='text-center w-full'>This list is empty</p>
                        <Link href='/discover'><Button variant={'outline'} className='bg-transparent border-primary text-primary'>Discover more mangas</Button></Link></div>
                );
            case 'Dropped':
                return myList?.dropped?.length > 0 ? (
                    myList.dropped.map((item) => <MyListItem key={item._id} item={item} />)
                ) : (
                    <div className='w-full col-span-2  tw-fc justify-center gap-2'><p className='text-center w-full'>This list is empty</p>
                        <Link href='/discover'><Button variant={'outline'} className='bg-transparent border-primary text-primary'>Discover more mangas</Button></Link></div>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/history/user?email=${user.email}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setHistory(data.history);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message || 'Failed to fetch history');
                } else {
                    setError('Unknown error occurred')
                }
            } finally {
                setLoading(false);
            }
        };


        const fetchMyList = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/my-list?owner=${user.email}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);

                setMyList(data);

            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message || 'Failed to fetch history');
                } else {
                    setError('Unknown error occurred')
                }
            } finally {
                setLoading(false);
            }
        }
        if (user.email) {
            fetchUserHistory();
            fetchMyList();
        }
    }, [user.email]);
    useEffect(() => {
        if (myList.length > 0) {
            setDropped(myList[0]?.dropped);
            setStalled(myList[0]?.stalled);
            setWantToRead(myList[0]?.wantToRead);
            setWontRead(myList[0]?.wontRead);

        }
    }, [myList])


    return (
        <div className='tw-fc gap-4 w-full py-4'>
            <div className="flex flex-col max-md:flex-row mx-auto max-w-xl rounded-md overflow-hidden">
                <div className='flex max-md:flex-col flex-row lg:tw-cc '>
                    {myListArrs.map(item => (
                        <Button variant={'ghost'} onClick={() => { setSelectedTab(item.title) }} className={`bg-secondary max-md:text-xs max-md:w-full rounded-none hover:duration-300 hover:bg-muted-foreground hover:text-white ${item.title === selectedTab ? 'bg-primary text-white hover:bg-primary hover:text-white' : ''}`} key={item.title}>{item.title}</Button>
                    ))}
                </div>
                {myListArrs.map(item => (
                    <div className={`bg-secondary grid grid-cols-2 max-w-screen-lg max-sm:gap-1 gap-3 p-4 ${item.title === selectedTab ? 'block' : 'hidden'}`} key={item.title}>
                        {selectedTab === 'History' && item.title === selectedTab &&
                            history?.all?.map((item, index) => (
                                <Link href={`/discover/${item.slug}/${item.chapterId}&${item.chapterNum}`} key={index} className='lg:min-w-52 md:min-w-48 sm:min-w-36 max-sm:w-20  max-sm:max-h-28 bg-white tw-hv-su shadow-md hover:shadow-lg p-4 max-sm:p-1 rounded-lg flex flex-col gap-2 justify-between'>
                                    <div className="relative w-full aspect-square max-sm:mx-auto">
                                        <img
                                            src={item.poster}
                                            alt="Manga Image"
                                            className="absolute top-0 left-0 w-full h-full object-cover md:rounded-lg"
                                        />
                                    </div>
                                    <div className='flex flex-col sm:gap-1'>
                                        <h4 className='tw-sm-b max-sm:leading-3 max-sm:text-[8px]'>{maximizeWordLimit(item.manga)}</h4>
                                        <p className='text-xs max-sm:text-[6px]'>EP. <span className='text-subMain'>{item.chapterNum}</span></p>
                                    </div>
                                </Link>
                            ))
                        }
                        {selectedTab === 'Reading' && item.title === selectedTab &&
                            <div className="col-span-2 ">
                                <Link href={`/discover/${history?.last.slug}/${history?.last.chapterId}&${history?.last.chapterNum}`} key={history?.last.chapterId} className='mx-auto p-3 max-w-48 gap-2 tw-fc bg-white shadow-sm tw-hv-sd shadow-primary rounded-lg sm:min-h-48'>
                                    <div className="relative w-full  aspect-square max-sm:mx-auto">
                                        <img
                                            src={history?.last.poster}
                                            alt="Manga Image"
                                            className="absolute top-0 left-0 w-full h-full object-cover md:rounded-lg"
                                        />
                                    </div>
                                    <div className='flex flex-col sm:gap-1 gap-2'>
                                        <h4 className='tw-sm-b '>{history?.last?.manga}</h4>
                                        <p className='text-xs '>EP. <span className='text-subMain'>{history?.last.chapterNum}</span></p>
                                    </div>
                                </Link>
                            </div>
                        }
                        {renderMangaList(selectedTab, myList[0] || {})}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default page
