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
    const { readManga, readMangaData } = useFetchReadManga(currentItems[0]?.chapter_api_data.substring('https://sv1.otruyencdn.com/v1/api/chapter/'.length))
    // console.log(currentItems[0]?.chapter_api_data.substring('https://sv1.otruyencdn.com/v1/api/chapter/'.length));



    return (
        <div className=' p-4 tw-fc items-center gap-4'>
            <h4 className='tw-xl-b text-primary'>{readManga?.comic_name}</h4>
            <div className="tw-fc gap-3 text-white items-center">
                <CustomPagination
                    currentPage={currentPage}
                    handleNext={handleNextPage}
                    handlePageChange={handlePageChange}
                    handlePrev={handlePreviousPage}
                    totalPages={totalPages}
                />
                {readManga?.chapter_image.map((item, index) => (
                    <div key={index} style={{
                        backgroundImage: `url('${readMangaData?.data?.domain_cdn}/${readManga.chapter_path}/${item.image_file}')`,
                        backgroundSize: 'contain',
                    }} className="h-[34rem] w-[30rem] bg-no-repeat "></div>
                ))}
            </div>
        </div>
    )
}

export default page
