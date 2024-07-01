import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { HistoryDocument } from '@/models/history';
import usePagination from '@/hooks/usePagination';
import RequiredLogin from './RequiredLogin';
import MyListItem from '@/components/customComponents/MyList/MyListItem';
import CustomPagination from '@/components/customComponents/customPagination';
import { Button } from '@/components/ui/button';
import { myListArrs, myListConstants } from '@/lib/constants';
import { maximizeWordLimit } from '@/lib/helperFuncs';

export interface IMyList {
    date: string;
    manga: string;
    poster: string;
    slug: string;
    _id: string;
}

const MyListPage = () => {
    const user = useSelector((state: RootState) => state.auth.auth);
    const [history, setHistory] = useState<HistoryDocument | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [myListData, setMyListData] = useState<{
        _id: string,
        dropped: IMyList[],
        owner: string,
        stalled: IMyList[],
        wantToRead: IMyList[],
        wontRead: IMyList[],
        updatedAt: string
    }>({
        _id: '',
        dropped: [],
        owner: '',
        stalled: [],
        wantToRead: [],
        wontRead: [],
        updatedAt: ''
    });

    const [selectedTab, setSelectedTab] = useState<string>(myListConstants.READING);

    const renderList = (list: IMyList[], label: string) => {
        return (
            <>
                {list.length > 0 ? (
                    list.map((item) => <MyListItem key={item._id} item={item} />)
                ) : (
                    <div className='w-full col-span-2 tw-fc justify-center gap-2'>
                        <p className='text-center w-full'>This list is empty</p>
                        <Link href='/discover' className='w-full tw-cc'>
                            <Button variant={'outline'} className='bg-transparent border-primary text-primary'>Discover more mangas</Button>
                        </Link>
                    </div>
                )}
            </>
        );
    };

    const renderMangaList = (selectedTab: string) => {
        if (user?.email === null) {
            return <RequiredLogin />;
        }

        switch (selectedTab) {
            case 'Want to read':
                return renderList(myListData.wantToRead, 'Want to read');
            case 'Wont read':
                return renderList(myListData.wontRead, 'Wont read');
            case 'Stalled':
                return renderList(myListData.stalled, 'Stalled');
            case 'Dropped':
                return renderList(myListData.dropped, 'Dropped');
            default:
                return null;
        }
    };

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
            setError(error instanceof Error ? error.message : 'Failed to fetch history');
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
            setMyListData(data[0]); // Assuming data is an array and you want the first item
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch my list');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email) {
            fetchUserHistory();
            fetchMyList();
        }
    }, [user.email]);

    const {
        currentItems: historyCurrentItems,
        currentPage: historyCurrentPage,
        totalPages: historyTotalPages,
        handlePageChange: historyHandlePageChange,
        handleNextPage: historyHandleNextChange,
        handlePreviousPage: historyHandlePreviousChange,
    } = usePagination(history?.all, 4);

    return (
        <div className='tw-fc gap-4 w-full py-4'>
            <div className="flex flex-col max-md:flex-row mx-auto max-w-xl rounded-md overflow-hidden">
                <div className='flex max-md:flex-col flex-row lg:tw-cc'>
                    {myListArrs.map(item => (
                        <Button
                            key={item.title}
                            variant={'ghost'}
                            onClick={() => setSelectedTab(item.title)}
                            className={`bg-secondary max-md:text-xs max-md:w-full rounded-none hover:duration-300 hover:bg-muted-foreground hover:text-white ${item.title === selectedTab ? 'bg-primary text-white hover:bg-primary hover:text-white' : ''}`}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
                {myListArrs.map(item => (
                    <div
                        key={item.title}
                        className={`bg-secondary max-w-screen-lg p-4 ${item.title === selectedTab ? 'block' : 'hidden'}`}
                    >
                        {selectedTab === 'History' && item.title === selectedTab && user?.email === null ? (
                            <RequiredLogin />
                        ) : (
                            <div className='grid grid-cols-2 max-sm:gap-1 gap-3'>
                                {selectedTab === 'History' && item.title === selectedTab && (
                                    <div className="col-span-2">
                                        <CustomPagination
                                            currentPage={historyCurrentPage}
                                            handleNext={historyHandleNextChange}
                                            handlePageChange={historyHandlePageChange}
                                            handlePrev={historyHandlePreviousChange}
                                            totalPages={historyTotalPages}
                                        />
                                    </div>
                                )}
                                {selectedTab === 'History' && item.title === selectedTab && historyCurrentItems?.map((item, index) => (
                                    <Link
                                        href={`/discover/${item.slug}/${item.chapterId}&${item.chapterNum}`}
                                        key={index}
                                        className='lg:min-w-52 md:min-w-48 sm:min-w-36 max-sm:w-20 max-sm:max-h-28 bg-white tw-hv-su shadow-md hover:shadow-lg p-4 max-sm:p-1 rounded-lg flex flex-col gap-2 justify-between'
                                    >
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
                                ))}
                            </div>
                        )}
                        {selectedTab === 'Reading' && item.title === selectedTab && (
                            <div className="col-span-2 ">
                                {!history?.last || Object.keys(history.last).length === 0 ? (
                                    <div className='w-full col-span-2 tw-fc justify-center gap-2'>
                                        <p className='text-center w-full'>This list is empty</p>
                                        <Link href='/discover' className='w-full tw-cc'>
                                            <Button variant={'outline'} className='bg-transparent border-primary text-primary'>Discover more mangas</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <Link
                                        href={`/discover/${history?.last.slug}/${history?.last.chapterId}&${history?.last.chapterNum}`}
                                        key={history?.last.chapterId}
                                        className='mx-auto p-3 max-w-48 gap-2 tw-fc bg-white shadow-sm tw-hv-sd shadow-primary rounded-lg sm:min-h-48'
                                    >
                                        <div className="relative w-full aspect-square max-sm:mx-auto">
                                            <img
                                                src={history?.last.poster}
                                                alt="Manga Image"
                                                className="absolute top-0 left-0 w-full h-full object-cover md:rounded-lg"
                                            />
                                        </div>
                                        <div className='flex flex-col sm:gap-1 gap-2'>
                                            <h4 className='tw-sm-b'>{history?.last?.manga}</h4>
                                            <p className='text-xs'>EP. <span className='text-subMain'>{history?.last.chapterNum}</span></p>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-2">
                            {selectedTab !== 'Reading' && selectedTab !== 'History' && item.title === selectedTab && renderMangaList(selectedTab)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyListPage;
