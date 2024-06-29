import { PaginationEllipsis, PaginationLink } from '@/components/ui/pagination';
import { useState, useEffect } from 'react';

const usePagination = (items: any[] = [], itemsPerPage = 5, defaultCurrentPage = 1, type?: 'READ_MANGA', slug?: string) => {
    const initialPageFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        return pageParam ? parseInt(pageParam, 10) : defaultCurrentPage;
    };

    const [currentPage, setCurrentPage] = useState(initialPageFromUrl());
    const [firstChapterApiData, setFirstChapterApiData] = useState<string | null>(null);

    // Calculate total pages
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Handle async fetching of first chapter api data
    useEffect(() => {
        const fetchFirstChapterApiData = async () => {
            if (type === 'READ_MANGA' && currentItems.length > 0) {
                const first = await currentItems[0]?.chapter_api_data?.toString()?.split('https://sv1.otruyencdn.com/v1/api/chapter/')[1];
                setFirstChapterApiData(first);
            }
        };

        fetchFirstChapterApiData();
    }, [currentItems, type]);

    // Effect to update router when firstChapterApiData changes
    useEffect(() => {
        if (type === 'READ_MANGA' && firstChapterApiData && slug) {

            const newUrl = `/discover/${slug}/${firstChapterApiData}&${currentPage}`;
            if (window.location.pathname + window.location.search !== newUrl) {
                window.history.pushState({}, '', newUrl); // Update browser history without refreshing
            }
        }
    }, [firstChapterApiData, slug, type, currentPage]);

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


export const renderPageNumbers = ({
    totalPages,
    currentPage,
    handlePageChange
}: {
    totalPages: number,
    currentPage: number,
    handlePageChange: (pageNumber: number) => void
}) => {
    const pageNumbers = [];

    // Function to determine if ellipses (...) should be shown
    const shouldShowEllipses = (pageNumber: number) => {
        return (
            pageNumber > 2 && pageNumber < totalPages - 1 && Math.abs(currentPage - pageNumber) > 2
        );
    };

    // Add the first page
    pageNumbers.push(
        <PaginationLink
            key={1}
            onClick={() => handlePageChange(1)}
            className={`px-2 py-1 cursor-pointer ${currentPage === 1 ? 'bg-primary' : ''}`}
        >
            {1}
        </PaginationLink>
    );

    // Add ellipses if needed
    if (shouldShowEllipses(2)) {
        pageNumbers.push(<PaginationEllipsis />);
    }

    // Add pages
    for (let i = Math.max(2, currentPage - 2); i <= Math.min(currentPage + 2, totalPages - 1); i++) {
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

    // Add ellipses if needed
    if (shouldShowEllipses(totalPages - 1)) {
        pageNumbers.push(<PaginationEllipsis />);
    }

    // Add the last page
    if (totalPages > 1) {
        pageNumbers.push(
            <PaginationLink
                key={totalPages}
                onClick={() => handlePageChange(totalPages)}
                className={`px-2 py-1 cursor-pointer ${currentPage === totalPages ? 'bg-primary' : ''}`}
            >
                {totalPages}
            </PaginationLink>
        );
    }

    return pageNumbers;
};
