'use client'
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface Signup1Props {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
}

const Signup1 = ({
  heading,
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "#",
}: Signup1Props) => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "register failed!");
      }

      // 注册成功，跳转登录页
      router.push(loginUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border border-muted bg-white px-6 py-12 shadow-md">
          <div className="flex flex-col items-center gap-y-2">
            {/* Logo */}
            <div className="flex items-center gap-1 lg:justify-start">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-10"
                />
              </a>
            </div>
            {heading && <h1 className="text-3xl font-semibold">{heading}</h1>}
          </div>

          <div className="flex w-full flex-col gap-8">
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <div className="flex flex-col gap-4">
                <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
                  {isLoading ? "Signing up..." : signupText}
                </Button>
                {/* <Button variant="outline" className="w-full" disabled={isLoading}>
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button> */}
              </div>
            </form>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              <FcGoogle className="mr-2 size-5" />
              {googleText}
            </Button>
          </div>

          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{loginText}</p>
            <a
              href={loginUrl}
              className="font-medium text-primary hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Signup1 };
