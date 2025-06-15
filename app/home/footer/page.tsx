import { Footer2 } from "@/components/footer2";
import { Mail } from 'lucide-react';

const Footer2Data = {
    logo: {
        src: "/logo.png",
        alt: "blocks for beautylook.top",
        title: "beautylook.top",
        url: "https://www.beautylook.top",
    },
    tagline: "We believe that everyone deserves to feel beautiful and confident.",
    menuItems: [
        {
            title: "Product",
            links: [
                { text: "Overview", url: "/product" },
                { text: "Pricing", url: "/product" },
                { text: "Marketplace", url: "/product" },
                { text: "Features", url: "/product" },
            ],
        },
        {
            title: "Resources",
            links: [
                { text: "FAQ", url: "/faq" },
            ],
        },
        {
            title: "Social",
            links: [
                {
                    text: (
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-2" />
                            contact@beautylook.top
                        </div>
                    ),
                    url: "mailto:contact@beautylook.top",
                },
            ],
        }
    ],
    copyright: `© ${new Date().getFullYear()} beautylook.top. All rights reserved.`,
    bottomLinks: [
        { text: "Terms and Conditions", url: "#" },
        { text: "Privacy Policy", url: "#" },
    ],
}

export default function Footer() {
    return (
        <Footer2 {...Footer2Data} />
    );
}
