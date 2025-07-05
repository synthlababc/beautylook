import { Hero1 } from "@/components/hero1";

const Hero1Data = {
    badge: "✨ beautylook.top",
    heading: "Unleash Your Youthful Glow, Radiance, and Confidence",
    description: "Discover advanced Micro Infusion System treatments at BeautyLook to enhance your skincare routine.",
    buttons: {
        primary: {
            text: "Discover all products",
            url: "/product",
        },
    },
    image: {
        src: "/home-shop-banner.webp",
        alt: "Hero section image showing",
    },
}

export default function Hero() {
    return (
        <div>
            <Hero1 {...Hero1Data} />
        </div>
    );
}
