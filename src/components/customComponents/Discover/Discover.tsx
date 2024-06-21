'use client'
import Category from '@/components/customComponents/Category'
import useFetchMangasByType from '@/hooks/useFetchMangasByType'
import usePagination from '@/hooks/usePagination'
import React from 'react'

const Discover = () => {
    const { mangas: NewMangas, isLoading: isLoadingNewMangas } = useFetchMangasByType('truyen-moi')
    const { mangas: publishingMangas, isLoading: isLoadingPublishingMangas } = useFetchMangasByType('dang-phat-hanh')
    const { mangas: finishedMangas, isLoading: isLoadingFinishedMangas } = useFetchMangasByType('hoan-thanh')
    const { mangas: upComingMangas, isLoading: isLoadingUpComingMangas } = useFetchMangasByType('sap-ra-mat')

    const {
        currentItems: newMangasCurrentItems,
        currentPage: newMangasCurrentPage,
        totalPages: newMangasTotalPages,
        handlePageChange: newMangasHandlePageChange,
        handleNextPage: newMangasHandleNextChange,
        handlePreviousPage: newMangasHandlePreviousChange,
    } = usePagination(NewMangas, 5);
    const {
        currentItems: publishingCurrentItems,
        currentPage: publishingCurrentPage,
        totalPages: publishingTotalPages,
        handlePageChange: publishingHandlePageChange,
        handleNextPage: publishingHandleNextChange,
        handlePreviousPage: publishingHandlePreviousChange,
    } = usePagination(publishingMangas, 5);
    const {
        currentItems: finishedCurrentItems,
        currentPage: finishedCurrentPage,
        totalPages: finishedTotalPages,
        handlePageChange: finishedHandlePageChange,
        handleNextPage: finishedHandleNextChange,
        handlePreviousPage: finishedHandlePreviousChange,
    } = usePagination(finishedMangas, 5);
    const {
        currentItems: upComingCurrentItems,
        currentPage: upComingCurrentPage,
        totalPages: upComingTotalPages,
        handlePageChange: upComingHandlePageChange,
        handleNextPage: upComingHandleNextChange,
        handlePreviousPage: upComingHandlePreviousChange,
    } = usePagination(upComingMangas, 5);

    return (
        <div className='tw-fc '>
            <Category
                isLoading={isLoadingNewMangas}
                title={{ normal: 'Recent', bold: 'uploads' }}
                list={newMangasCurrentItems} type='ALL_UPLOADS'
                currentPage={newMangasCurrentPage}
                handleNext={newMangasHandleNextChange}
                handlePrev={newMangasHandlePreviousChange}
                handlePageChange={newMangasHandlePageChange}
                totalPages={newMangasTotalPages}
            />
            <Category
                isLoading={isLoadingPublishingMangas}
                title={{ normal: 'Publishing', bold: 'mangas' }}
                list={publishingCurrentItems} type='PUBLISHING'
                currentPage={publishingCurrentPage}
                handleNext={publishingHandleNextChange}
                handlePrev={publishingHandlePreviousChange}
                handlePageChange={publishingHandlePageChange}
                totalPages={publishingTotalPages}
            />
            <Category
                isLoading={isLoadingFinishedMangas}
                title={{ normal: 'Completed', bold: 'mangas' }}
                list={finishedCurrentItems} type='FINISHED'
                currentPage={finishedCurrentPage}
                handleNext={finishedHandleNextChange}
                handlePrev={finishedHandlePreviousChange}
                handlePageChange={finishedHandlePageChange}
                totalPages={finishedTotalPages}
            />
            <Category
                isLoading={isLoadingUpComingMangas}
                title={{ normal: 'Coming', bold: 'soon' }}
                list={upComingCurrentItems} type='UPCOMING'
                currentPage={upComingCurrentPage}
                handleNext={upComingHandleNextChange}
                handlePrev={upComingHandlePreviousChange}
                handlePageChange={upComingHandlePageChange}
                totalPages={upComingTotalPages}
            />
        </div>
    )
}

export default Discover
