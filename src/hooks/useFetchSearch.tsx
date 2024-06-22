import { useState, useEffect, useCallback } from 'react';
import axios from '@/lib/axios'; // Adjust the import path as needed
import { IMangaProps } from './useFetchHomePage';
import { useRouter } from 'next/navigation';

// Debounce function
const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<F>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

interface UseFetchSearchProps {
    initialQuery?: string;
}

const useFetchSearch = ({ initialQuery }: UseFetchSearchProps = {}) => {
    const [data, setData] = useState<any>(null); // Adjust the type of `data` based on your response structure
    const [isLoading, setIsLoading] = useState<boolean>(false); // State to track loading status
    const [searchResult, setSearchResult] = useState<IMangaProps[]>();
    const [query, setQuery] = useState<string>(initialQuery || ''); // State to store the query
    const router = useRouter()
    const fetchSearchResult = async (searchQuery: string) => {
        setIsLoading(true); // Set loading state to true when fetching starts
        try {
            const result = await axios.get(`/tim-kiem?keyword=${searchQuery}`);
            setData(result.data); // Update state with the data from the response
            setSearchResult(result.data.data.items);
        } catch (error) {
            console.error('Error fetching search data:', error);
        } finally {
            setIsLoading(false); // Set loading state to false after fetching completes (or errors)
        }
    };

    // Use useEffect to fetch data when the query changes
    useEffect(() => {
        if (initialQuery) {
            setQuery(initialQuery);
        }
        if (query) {
            fetchSearchResult(query);
        }
    }, [initialQuery, query]);

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery); // Update query state with the new search term
        debouncedFetchSearchResult(searchQuery); // Trigger the debounced search function
        router.push(`/discover/search?query=${query}`)

    };

    // Use useCallback to memoize the debounced function
    const debouncedFetchSearchResult = useCallback(
        debounce(fetchSearchResult, 300),
        []
    );

    return { searchResultData: data, isLoading, searchResult, handleSearch, setQuery, query };
};

export default useFetchSearch;
