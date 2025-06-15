'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Leaf, Globe, Recycle, CheckCircle } from 'lucide-react'

// type Feature = {
//     icon: React.ReactNode
//     title: string
//     description: string
// }

const features = [
    {
        icon: <Leaf className="w-6 h-6 text-green-500" />,
        title: 'Clean Skincare',
        description: 'Clean and natural skincare with safe and transparent ingredients',
    },
    {
        icon: <Globe className="w-6 h-6 text-blue-500" />,
        title: 'Delivery',
        description: 'Fast delivery options with tracking',
    },
    {
        icon: <Recycle className="w-6 h-6 text-teal-500" />,
        title: 'Sustainability',
        description: 'Our signature shipping boxes are fully recyclable and biodegradable',
    },
    {
        icon: <CheckCircle className="w-6 h-6 text-purple-500" />,
        title: 'Trusted by Brands',
        description: 'Your Go-To Destination for Skincare & Makeup.',
    },
]

export default function Why() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900">Why Be Yours?</h2>
                <p className="mt-4 text-xl text-center text-gray-500 max-w-2xl mx-auto">
                    Elevate Your Beauty, Naturally.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {features.map((feature, index) => (
                        <Card key={index} className="flex flex-col items-center justify-center p-6">
                            <CardHeader className="flex flex-col items-center mb-4">
                                <div className="mb-4">{feature.icon}</div>
                                {/* 使用 whitespace-nowrap 防止换行 */}
                                <CardTitle className="whitespace-nowrap">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <CardDescription>{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}