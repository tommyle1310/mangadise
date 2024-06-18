import React from 'react'
import AuthForm from './AuthForm'

const Login = () => {
    return (
        <AuthForm title='Log in' altBtn={{ title: 'Sign up', onSubmit: () => { } }} btn={{ title: 'Log in', onSubmit: () => { } }} />
    )
}

export default Login
