import { Navbar1 } from "@/components/navbar1";

const Navbar1Data = {
  logo: {
    url: "https://www.beautylook.top",
    src: "/logo.png",
    alt: "logo",
    title: "beautylook.top",
  },
  menu: [
    { title: "HOME", url: "/" },
    {
      title: "PRODUCTS",
      url: "/product",
    },
    {
      title: "FAQ",
      url: "/faq",
    },
  ],
  auth: {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
}

export default function Navbar() {
  return (
    <Navbar1 {...Navbar1Data} />
  );
}
