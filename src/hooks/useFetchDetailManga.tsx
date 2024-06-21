import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios'; // Adjust the import path as needed
import { IMangaProps } from './useFetchHomePage';


const useFetchDetailManga = (slug: string) => {
    const [data, setData] = useState<any>(null); // Adjust the type of `data` based on your response structure
    const [isLoading, setIsLoading] = useState<boolean>(true); // State to track loading status
    const [detailManga, setDetailManga] = useState<IMangaProps>()

    useEffect(() => {
        const fetchDetailManga = async () => {
            setIsLoading(true); // Set loading state to true when fetching starts
            try {
                const result = await axios.get(`/truyen-tranh/${slug}`);
                setData(result.data); // Update state with the data from the response
                setDetailManga(result.data.data.item)
            } catch (error) {
                console.error('Error fetching detail manga data:', error);
            } finally {
                setIsLoading(false); // Set loading state to false after fetching completes (or errors)
            }
        };

        fetchDetailManga(); // Call the fetchDetailManga function to initiate the API request

    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return { detailMangaData: data, isLoading, detailManga }; // Return data and isLoading state for consumption by the component using this hook
};

export default useFetchDetailManga;
