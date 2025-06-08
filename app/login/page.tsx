'use client'
import { Login3 } from "@/components/login3";

export default function LoginPage() {
  // 将原本的props改为组件内部常量
  const pageContent = {
    heading: "Login",
    subheading: "Welcome back",
    logo: {
      url: "https://beautylook.top/",
      src: "/logo.png",
      alt: "beautylook",
    },
    googleText: "Log in with Google"
  };

  return (
    <Login3 {...pageContent} />
  );
}