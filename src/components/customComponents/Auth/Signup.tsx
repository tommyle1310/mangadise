import React from 'react'
import AuthForm from './AuthForm'

const Signup = () => {
    return (
        <AuthForm title='Sign up' altBtn={{ title: 'Log in', onSubmit: () => { } }} btn={{ title: 'Sign up', onSubmit: () => { } }} />
    )
}

export default Signup
