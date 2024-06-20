'use client'
import { PaginationLink } from '@/components/ui/pagination';
import { useState } from 'react';

const usePagination = (items: any[] = [], itemsPerPage: number = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Change to next page
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    // Change to previous page
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return {
        currentItems,
        currentPage,
        totalPages,
        handlePageChange,
        handleNextPage,
        handlePreviousPage,
    };
};

export default usePagination;

export const renderPageNumbers = ({ totalPages, currentPage, handlePageChange }: { totalPages: number, currentPage: number, handlePageChange: (pageNumber: number) => void }) => {
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