// components/RadiantResults.tsx
'use client'
import * as React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button'

type RadiantResultsProps = {
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    ctaText?: string;
}

export function RadiantResults({
    title,
    subtitle,
    description,
    imageSrc,
    ctaText = 'SHOP NOW',
}: RadiantResultsProps) {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center">
                {/* 左侧文字 */}
                <div className="text-center md:text-left flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">{subtitle}</h3>
                    <h2 className="mt-2 text-3xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="mt-4 text-gray-600 mb-6">{description}</p>
                    <Link href="/product">
                        <Button>{ctaText}</Button>
                    </Link>
                </div>

                {/* 右侧图片 */}
                <div className="relative flex justify-center">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="max-w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div>
        </section>
    )
}