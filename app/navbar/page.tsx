import { Navbar1 } from "@/components/navbar1";
import { Book, Sunset, Trees, Zap } from "lucide-react";


const Navbar1Data = {
    logo: {
      url: "https://www.beautylook.top",
      src: "/logo.png",
      alt: "logo",
      title: "beautylook.top",
    },
    menu: [
      { title: "HOME", url: "#" },
      {
        title: "PRODUCTS",
        url: "#",
      },
      {
        title: "FAQ",
        url: "/faq",
      },
    ],
    auth: {
      login: { title: "Login", url: "#" },
      signup: { title: "Sign up", url: "#" },
    },
  }

export default function Navbar() {
    return (
        <Navbar1 {...Navbar1Data}/>
    );
  }
  