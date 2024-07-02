import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { myListArrs } from '@/lib/constants'
import { IMangaProps } from '@/hooks/useFetchHomePage'
import { useRouter } from 'next/navigation'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import useSaveToMyList from '@/hooks/useSaveToMyList'

const DiscoverSlugOverview = ({ detailManga }: { detailManga: IMangaProps }) => {
    const { toast } = useToast()
    const user = useSelector((state: RootState) => state.auth.auth)

    const { handleSaveToMyList } = useSaveToMyList(user);

    const router = useRouter()
    return (
        <TabsContent value="overview" className='sm:grid grid-cols-5 w-full sm:p-4 gap-4 max-sm:tw-fc'>
            <div style={{
                backgroundImage: `url('https://otruyenapi.com/uploads/comics/${detailManga?.thumb_url}')`,
                backgroundSize: 'cover',
            }} className="col-span-1 aspect-square shadow-md shadow-primary rounded-lg"></div>
            <div className="tw-fc gap-4 p-2 w-full  col-span-4">
                <h3 className='tw-xl-b text-primary'>{detailManga?.name}</h3>
                <div className='text-sm' dangerouslySetInnerHTML={{ __html: detailManga?.content ?? '' }} />
                <div className="tw-fc gap-1">
                    <p className='tw-lg-sb'>Category</p>
                    <div className="tw-ic flex-wrap max-sm:gap-2 sm:gap-4">
                        {detailManga?.category.map(item => (
                            <Button onClick={() => router.push(`/categories/${item.slug}`)} key={item.id} >{item.name}</Button>
                        ))}
                    </div>
                </div>
                <div className="tw-fc gap-1">
                    <p className='tw-lg-sb'>My List</p>
                    <div className="tw-ic flex-wrap max-sm:gap-2 sm:gap-4">
                        {myListArrs?.slice(2)?.map(item => (
                            <Button key={item.title} variant={'outline'} onClick={() => handleSaveToMyList(item.title, detailManga)} className=''>{item.title}</Button>
                        ))}
                    </div>
                </div>
            </div>
        </TabsContent>
    )
}

export default DiscoverSlugOverview
