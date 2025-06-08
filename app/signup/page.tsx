import { Signup1 } from '@/components/signup1'
import React from 'react'

export default function page() {
    const signupData = {
        logo: {
            url: "beautylook.top",
            src: "/logo.png",
            alt: "logo",
            title: "beautylook",
        },
        loginUrl: "/login",
    }

    return (
        <Signup1 {...signupData} />
    )
}
