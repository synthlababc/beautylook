'use client'
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  // 将原本的props改为组件内部常量
  const pageContent = {
    heading: "Login",
    subheading: "Welcome back",
    logo: {
      url: "https://www.shadcnblocks.com",
      src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
      alt: "Shadcnblocks",
    },
    googleText: "Log in with Google"
  };

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <a href={pageContent.logo.url} className="mb-6 flex items-center gap-2">
                <img 
                  src={pageContent.logo.src} 
                  className="max-h-8" 
                  alt={pageContent.logo.alt} 
                />
              </a>
              <h1 className="mb-2 text-2xl font-bold">{pageContent.heading}</h1>
              <p className="text-muted-foreground">{pageContent.subheading}</p>
            </div>
            <div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => signIn('google', { callbackUrl: '/user' })}
              >
                <FcGoogle className="mr-2 size-5" />
                {pageContent.googleText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}