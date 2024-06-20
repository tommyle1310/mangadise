import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios'; // Adjust the import path as needed
import { IMangaProps } from './useFetchHomePage';

type IMangasByType = 'truyen-moi' | 'sap-ra-mat' | 'dang-phat-hanh' | 'hoan-thanh'


const useFetchMangasByType = (type: IMangasByType) => {
    const [data, setData] = useState<any>(null); // Adjust the type of `data` based on your response structure
    const [isLoading, setIsLoading] = useState<boolean>(true); // State to track loading status
    const [mangas, setMangas] = useState<IMangaProps[]>()

    useEffect(() => {
        const fetchHome = async () => {
            setIsLoading(true); // Set loading state to true when fetching starts
            try {
                const result = await axios.get(`/danh-sach/${type}`);
                setData(result.data); // Update state with the data from the response
                setMangas(result.data.data.items)
            } catch (error) {
                console.error('Error fetching homepage data:', error);
            } finally {
                setIsLoading(false); // Set loading state to false after fetching completes (or errors)
            }
        };

        fetchHome(); // Call the fetchHome function to initiate the API request

    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return { mangasData: data, isLoading, mangas }; // Return data and isLoading state for consumption by the component using this hook
};

export default useFetchMangasByType;
