import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios'; // Adjust the import path as needed

export interface ICategories {
    _id: string;
    slug: string;
    name: string;
}

const useFetchCategories = (slug?: string) => {
    const [data, setData] = useState<any>(null); // Adjust the type of data based on your response structure
    const [isLoading, setIsLoading] = useState<boolean>(true); // State to track loading status
    const [categories, setCategories] = useState<ICategories[]>([]); // Initialize as empty array

    useEffect(() => {
        const fetchHome = async () => {
            setIsLoading(true); // Set loading state to true when fetching starts
            try {
                const result = slug ? await axios.get(`/the-loai/${slug}`) : await axios.get('/the-loai');
                setData(result.data); // Update state with the data from the response
                setCategories(result.data.data.items || []); // Update categories and ensure it's an array
            } catch (error) {
                console.error('Error fetching homepage data:', error);
                setData(null); // Ensure data is reset on error
                setCategories([]); // Reset categories on error
            } finally {
                setIsLoading(false); // Set loading state to false after fetching completes (or errors)
            }
        };

        fetchHome(); // Call the fetchHome function to initiate the API request
    }, [slug]); // Include slug in the dependency array to re-run effect when it changes

    return { categoriesData: data, isLoading, categories }; // Return data and isLoading state for consumption by the component using this hook
};

export default useFetchCategories;
