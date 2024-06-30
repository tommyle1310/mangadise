'use client'
import Category from '@/components/customComponents/Category'
import CustomPagination from '@/components/customComponents/customPagination'
import { Button } from '@/components/ui/button'
import useFetchCategories from '@/hooks/useFetchCategories'
import useFetchMangasByType from '@/hooks/useFetchMangasByType'
import usePagination from '@/hooks/usePagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const CategoriesLayoutComponent = () => {
    const router = useRouter()
    const { categories } = useFetchCategories()
    const { mangas: NewMangas, isLoading: isLoadingNewMangas } = useFetchMangasByType('truyen-moi')

    const {
        currentItems: categoriesCurrentItems,
        currentPage: categoriesCurrentPage,
        totalPages: categoriesTotalPages,
        handlePageChange: categoriesHandlePageChange,
        handleNextPage: categoriesHandleNextChange,
        handlePreviousPage: categoriesHandlePreviousChange,
    } = usePagination(categories, 10);
    const {
        currentItems: newMangasCurrentItems,
        currentPage: newMangasCurrentPage,
        totalPages: newMangasTotalPages,
        handlePageChange: newMangasHandlePageChange,
        handleNextPage: newMangasHandleNextChange,
        handlePreviousPage: newMangasHandlePreviousChange,
    } = usePagination(NewMangas, 5);
    return (
        <div className='mx-auto max-w-screen-xl '>
            <div className="tw-jb ">
                <h3 className='tw-lg-b p-4'><span className='text-destructive'>Hot</span> Categories</h3>
                <div className="gap-1 tw-ic">
                    <Button variant="outline" size="icon" onClick={categoriesHandlePreviousChange}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={categoriesHandleNextChange}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="tw-fc bg-subMain rounded-t-2xl p-2">
                <div className="flex flex-wrap items-center gap-3 p-4  justify-center">
                    {categoriesCurrentItems?.map(item => (
                        <Button key={item._id} onClick={() => router.push(`/categories/${item.slug}`)} variant={'outline'} className='bg-subSecondary'>{item.name}</Button>
                    ))}
                </div>
                <div className="mx-auto text-white">
                    <CustomPagination
                        currentPage={categoriesCurrentPage}
                        handleNext={categoriesHandleNextChange}
                        handlePrev={categoriesHandlePreviousChange}
                        handlePageChange={categoriesHandlePageChange}
                        totalPages={categoriesTotalPages}
                    />
                </div>
            </div>
        </div>
    )
}

export default CategoriesLayoutComponent
