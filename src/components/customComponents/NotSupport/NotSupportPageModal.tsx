import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotSupportPageModal = () => {
    const [open, setOpen] = useState(true);
    const router = useRouter()
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <Modal open={open} onClose={() => { onCloseModal(); router.push('/') }} center>
            <div className="tw-fc gap-4">
                <h3 className='tw-lg-sb text-primary text-center'>Developing...</h3>
                <p>Unfortunately, we are not supporting this feature at the moment, please comeback later :3</p>
                <Link href='/' className='w-full tw-cc'>

                    <Button className=' rounded-full px-8 shadow-md shadow-primary py-6 mx-auto'>GO TO HOMEPAGE</Button>
                </Link>
            </div>
        </Modal>
    )
}

export default NotSupportPageModal
