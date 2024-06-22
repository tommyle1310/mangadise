import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios'; // Adjust the import path as needed

export interface IReadManga {
    _id: string;
    comic_name: string;
    chapter_name: string;
    chapter_title: string;
    chapter_path: string;
    chapter_image: {
        image_page: number;
        image_file: string;
    }[];
}

const useFetchReadManga = (chapterId: string) => {
    const [data, setData] = useState<{ data: { domain_cdn: string } }>(); // Adjust the type of `data` based on your response structure
    const [isLoading, setIsLoading] = useState<boolean>(true); // State to track loading status
    const [readManga, setReadManga] = useState<IReadManga>();

    useEffect(() => {
        const fetchReadMangaData = async () => {
            if (!chapterId) return; // Exit early if chapterId is not defined

            setIsLoading(true); // Set loading state to true when fetching starts
            try {
                const result = await axios.get(`https://sv1.otruyencdn.com/v1/api/chapter/${chapterId}`);
                // console.log(chapterId);

                setData(result.data); // Update state with the data from the response
                // console.log(result.data);

                setReadManga(result.data?.data?.item);
            } catch (error) {
                console.error('Error fetching read manga data:', error);
            } finally {
                setIsLoading(false); // Set loading state to false after fetching completes (or errors)
            }
        };

        fetchReadMangaData(); // Call the fetchReadMangaData function to initiate the API request

    }, [chapterId]); // Dependency array ensures this effect runs when chapterId changes

    return { readMangaData: data, isLoading, readManga }; // Return data and isLoading state for consumption by the component using this hook
};

export default useFetchReadManga;
