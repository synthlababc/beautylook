import { Footer2 } from "@/components/footer2";

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
                { text: "Overview", url: "#" },
                { text: "Pricing", url: "#" },
                { text: "Marketplace", url: "#" },
                { text: "Features", url: "#" },
            ],
        },
        {
            title: "Resources",
            links: [
                { text: "FAQ", url: "#" },
            ],
        },
        {
            title: "Social",
            links: [
                { text: "Email", url: "#" },
            ],
        },
    ],
    copyright: `© ${new Date().getFullYear()} beautylook.top. All rights reserved.`,
    bottomLinks: [
        { text: "Terms and Conditions", url: "#" },
        { text: "Privacy Policy", url: "#" },
    ],
}

export default function Footer() {
    return (
        <Footer2 {...Footer2Data}/>
    );
}
