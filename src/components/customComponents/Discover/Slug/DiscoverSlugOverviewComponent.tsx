'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import useFetchDetailManga from '@/hooks/useFetchDetailManga'
import DiscoverSlugOverview from './DiscoverSlugOverview'


const DiscoverSlugOverviewComponent = () => {
    const params = useParams()
    const router = useRouter()

    const { detailManga } = useFetchDetailManga(params.slug.toString())
    const handleRead = async (item: {
        filename: string;
        chapter_title: string;
        chapter_api_data: string;
        chapter_name: string;
    }) => {
        const idChapter = (item.chapter_api_data.substring('https://sv1.otruyencdn.com/v1/api/chapter/'.length));
        const findEPPosition = (detailManga?.chapters[0].server_data.findIndex(i => i['chapter_api_data'] === item.chapter_api_data) || 0) + 1
        router.push(`/discover/${params.slug}/${idChapter}&${findEPPosition}`)
    }

    if (!detailManga) return

    return (
        <DiscoverSlugOverview detailManga={detailManga} />
    )
}

export default DiscoverSlugOverviewComponent
