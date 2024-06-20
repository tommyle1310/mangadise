import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios'; // Adjust the import path as needed

export interface ICategories {
    _id: string
    slug: string
    name: string
}

const useFetchCategories = () => {
    const [data, setData] = useState<any>(null); // Adjust the type of `data` based on your response structure
    const [isLoading, setIsLoading] = useState<boolean>(true); // State to track loading status
    const [categories, setCategories] = useState<ICategories[]>()

    useEffect(() => {
        const fetchHome = async () => {
            setIsLoading(true); // Set loading state to true when fetching starts
            try {
                const result = await axios.get('/the-loai');
                setData(result.data); // Update state with the data from the response
                setCategories(result.data.data.items)
            } catch (error) {
                console.error('Error fetching homepage data:', error);
            } finally {
                setIsLoading(false); // Set loading state to false after fetching completes (or errors)
            }
        };

        fetchHome(); // Call the fetchHome function to initiate the API request

    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return { categoriesData: data, isLoading, categories }; // Return data and isLoading state for consumption by the component using this hook
};

export default useFetchCategories;
