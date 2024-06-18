import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='tw-cc w-full min-h-96'>
      <div className="tw-fc gap-4 text-center">
        <h1 className='text-[8rem] font-extrabold text-primary'>Oops</h1>
        <h5 className='tw-xl-sb'>404 - PAGE NOT FOUND</h5>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <Link href='/'>
          <Button className='rounded-full px-8 shadow-md shadow-primary py-6 mx-auto'>GO TO HOMEPAGE</Button>
        </Link>
      </div>
    </div>
  )
}