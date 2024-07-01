'use client'
import Category from '@/components/customComponents/Category'
import useFetchCategories from '@/hooks/useFetchCategories'
import usePagination from '@/hooks/usePagination'
import { useParams } from 'next/navigation'
import React from 'react'

const CategoriesSlug = () => {
    const params = useParams()
    const { categories: mangas, isLoading } = useFetchCategories(params?.slug.toString())
    const {
        currentItems: categoriesCurrentItems,
        currentPage: categoriesCurrentPage,
        totalPages: categoriesTotalPages,
        handlePageChange: categoriesHandlePageChange,
        handleNextPage: categoriesHandleNextChange,
        handlePreviousPage: categoriesHandlePreviousChange,
    } = usePagination(mangas);
    return (
        <div>
            <Category
                isLoading={isLoading}
                title={{ normal: `Results for ${params?.slug.toString()}` }}
                list={categoriesCurrentItems} type='ALL_UPLOADS'
                currentPage={categoriesCurrentPage}
                handleNext={categoriesHandleNextChange}
                handlePrev={categoriesHandlePreviousChange}
                handlePageChange={categoriesHandlePageChange}
                totalPages={categoriesTotalPages}
            />
        </div>
    )
}

export default CategoriesSlug
