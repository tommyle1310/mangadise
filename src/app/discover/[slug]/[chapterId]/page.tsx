'use client'
import CustomPagination from '@/components/customComponents/customPagination'
import useFetchDetailManga from '@/hooks/useFetchDetailManga'
import useFetchReadManga from '@/hooks/useFetchReadManga'
import usePagination from '@/hooks/usePagination'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const router = useRouter()
    const params = useParams()
    const { chapterId, slug } = params
    let chapterNum = 1

    if (chapterId.includes('%26')) {
        chapterNum = +chapterId.toString().split('%26')[1]

    }

    const { detailManga } = useFetchDetailManga(slug.toString())
    const paginationReadManga = detailManga?.chapters[0].server_data

    const { currentItems, currentPage, handleNextPage, handlePageChange, handlePreviousPage, totalPages } = usePagination(paginationReadManga, 1, chapterNum, 'READ_MANGA', slug.toString())
    const chaptedID = currentItems[0]?.chapter_api_data.substring('https://sv1.otruyencdn.com/v1/api/chapter/'.length)
    const { readManga, readMangaData } = useFetchReadManga(chaptedID)
    console.log(chaptedID);



    return (
        <div className=' sm:p-4 tw-fc items-center sm:gap-4'>
            <h4 className='tw-xl-b text-primary'>{readManga?.comic_name}</h4>
            <div className="tw-fc gap-3 space-y-1 max-sm:w-full max-sm: px-4 text-white items-center">
                <CustomPagination
                    currentPage={currentPage}
                    handleNext={handleNextPage}
                    handlePageChange={handlePageChange}
                    handlePrev={handlePreviousPage}
                    totalPages={totalPages}
                />
                {readManga?.chapter_image.map((item, index) => (
                    <div
                        key={index}
                        className="relative sm:h-[34rem] w-full border-2 max-sm:mx-auto max-sm:h-72"
                    >
                        <img
                            src={`${readMangaData?.data?.domain_cdn}/${readManga.chapter_path}/${item.image_file}`}
                            alt="Manga Image"
                            className="absolute top-0 left-0 w-full h-full object-fill"
                        />
                    </div>

                ))}
                <CustomPagination
                    currentPage={currentPage}
                    handleNext={handleNextPage}
                    handlePageChange={handlePageChange}
                    handlePrev={handlePreviousPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}

export default page
