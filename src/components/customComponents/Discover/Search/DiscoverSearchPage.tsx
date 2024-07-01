'use client'
import Category from '@/components/customComponents/Category'
import useFetchSearch from '@/hooks/useFetchSearch';
import usePagination from '@/hooks/usePagination';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const DiscoverSearchPage = () => {
    const searchParams = useSearchParams()

    const search = searchParams.get('query')

    const { searchResultData, isLoading, searchResult, handleSearch, setQuery, query } = useFetchSearch({ initialQuery: search?.toString() });

    const {
        currentItems,
        currentPage,
        totalPages,
        handlePageChange,
        handleNextPage,
        handlePreviousPage,
    } = usePagination(searchResult, 5);

    return (
        <div className=''>
            <Category
                currentPage={currentPage}
                handleNext={handleNextPage}
                handlePageChange={handlePageChange}
                handlePrev={handlePreviousPage}
                isLoading={isLoading}
                list={currentItems}
                title={{ normal: `${searchResult?.length} results found with keyword "${query}"` }}
                totalPages={totalPages}
                type='SEARCH_RESULTS'
            />
        </div>
    )
}

export default DiscoverSearchPage
