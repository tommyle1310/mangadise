import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { renderPageNumbers } from '@/hooks/usePagination'


const CustomPagination = ({ totalPages, currentPage, handleNext, handlePrev, handlePageChange }: { totalPages: number, currentPage: number, handleNext: () => void, handlePrev: () => void, handlePageChange: (pageNumber: number) => void }) => {
    return (
        <Pagination className='bg-black rounded-lg p-2 text-white'>
            <PaginationContent className='tw-ic'>
                <PaginationItem>
                    <PaginationPrevious className='cursor-pointer' onClick={handlePrev} />
                </PaginationItem>
                <PaginationItem className='max-sm:hidden sm:block tw-ic'>
                    {renderPageNumbers({ totalPages: totalPages, currentPage: currentPage, handlePageChange: handlePageChange })}
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className='cursor-pointer' onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default CustomPagination
