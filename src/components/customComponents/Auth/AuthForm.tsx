'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

type AuthFormProps = {
    title: string;
    btn: {
        title: string,
        onSubmit?: () => void;
    };
    altBtn: {
        title: string,
        onSubmit?: () => void;
    }
};

const AuthForm: React.FC<AuthFormProps> = ({ altBtn, btn, title }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={title === 'Log in' ? 'default' : 'secondary'}>{title}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className='gap-4 tw-fc'>
                    <DialogTitle className='text-center tw-3xl-b'><span className='text-primary'>Mangadise</span></DialogTitle>
                    <DialogTitle className='text-center tw-xl-b'>{title === 'Log in' ? <p>Welcome  <span className='text-primary'>back</span></p> : <p>Create new  <span className='text-primary'>account</span></p>}</DialogTitle>
                    <DialogDescription className='text-center'>
                        Discover manga, manhua and manhwa, track your progress, have fun, read manga.
                    </DialogDescription>
                    <Input type="email" placeholder="Email" />
                    {title === 'Log in' ||
                        <Input type="text" placeholder="Username" />
                    }
                    <Input type="password" placeholder="Password" />
                    {title === 'Log in' &&
                        <div className="tw-jb">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">Remember me</Label>
                            </div>
                            <Button variant="link">Recover password</Button>
                        </div>
                    }
                    <Button className='tw-md-b' onClick={btn.onSubmit}>{btn.title}</Button>
                    <Button className='gap-2 tw-md-b flex' variant={'outline'}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Login with Google
                    </Button>
                    <Separator />
                    <p className='text-center'>{title === 'Log in' ? "Don't have an account? " : "Already have an account? "}<Button variant={'link'} onClick={altBtn.onSubmit} className='text-subMain'>{altBtn.title}</Button></p>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default AuthForm
