import { IMyList } from "@/app/my-list/page";
import { maximizeWordLimit } from "@/lib/helperFuncs";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";

const MyListItem = ({ item }: { item: IMyList }) => (
    <Link href={`/discover/${item.slug}`} key={item._id} className='lg:min-w-52 md:min-w-48 sm:min-w-36 max-sm:w-20 max-sm:max-h-32 bg-white tw-hv-su mx-auto shadow-md hover:shadow-lg p-4 max-sm:p-1 rounded-lg flex flex-col gap-4 justify-between'>
        <AspectRatio ratio={8 / 12} className="tw-fc gap-2">
            <div className="relative w-full aspect-square max-sm:mx-auto">
                <img
                    src={item.poster}
                    alt="Manga Image"
                    className="absolute top-0 left-0 w-full h-full object-cover md:rounded-lg"
                />
            </div>
            <div className='flex flex-col sm:gap-1 gap-3 flex-1'>
                <h4 className='font-bold max-sm:leading-3 max-md:text-[8px] max-md:text-md md:text-lg text-primary'>{maximizeWordLimit(item.manga, 20)}</h4>
            </div>
        </AspectRatio>
    </Link>
);

export default MyListItem