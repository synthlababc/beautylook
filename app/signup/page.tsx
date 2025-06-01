import { Signup1 } from '@/components/signup1'
import React from 'react'

export default function page() {
    const signupData = {
        logo: {
            url: "https://www.shadcnblocks.com",
            src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-wordmark.svg",
            alt: "logo",
            title: "shadcnblocks.com",
        },
        loginUrl: "/login",
    }

    return (
        <Signup1 {...signupData} />
    )
}
