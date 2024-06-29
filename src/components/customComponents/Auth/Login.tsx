import React from 'react'
import AuthForm from './AuthForm'
import { signIn } from 'next-auth/react'

const Login = () => {

    return (
        <AuthForm title='Log in' altBtn={{ title: 'Sign up', onSubmit: () => signIn('google') }} btn={{ title: 'Log in', onSubmit: () => signIn('google') }} />
    )
}

export default Login
