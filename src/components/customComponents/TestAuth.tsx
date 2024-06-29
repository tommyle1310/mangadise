'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import React from 'react'
import { Button } from "../ui/button"

export default function Dashboard() {
    const { data: session } = useSession()
    // console.log(session);

    return (
        <>
            {
                session ? (
                    <>
                        <h1>Hello</h1>
                        <Button onClick={() => signOut({ callbackUrl: '/' })}>Log out</Button>
                    </>
                ) : (
                    <>
                        <h1>plz login</h1>
                        <Button onClick={() => signIn('google')}>sigin in with goole</Button>
                        <Button onClick={() => signIn('github')} variant={'outline'}>sigin in with github</Button>
                    </>
                )
            }
        </>
    )
}