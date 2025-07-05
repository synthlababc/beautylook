import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";

interface Login3Props {
  heading?: string;
  subheading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
  };
  loginText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Login3 = ({
  heading = "Login",
  subheading = "Welcome back",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "Shadcnblocks",
  },
  loginText = "Log in",
  googleText = "Log in with Google",
  signupText = "Don't have an account?",
  signupUrl = "#",
}: Login3Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("rememberedEmail");
      if (savedEmail) {
        setEmail(savedEmail);
        setRemember(true);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      remember: remember,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      if (remember) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      window.location.href = "/"; // 登录成功后跳转页面
    }
  };

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <a href={logo.url} className="mb-6 flex items-center gap-2">
                <img src={logo.src} className="max-h-8" alt={logo.alt} />
              </a>
              <h1 className="mb-2 text-2xl font-bold">{heading}</h1>
              <p className="text-muted-foreground">{subheading}</p>
            </div>
            <div className="flex flex-col gap-4">
              <form onSubmit={handleLogin} className="grid gap-4">
                <Input
                  type="email"
                  name="email" // 添加 name 属性
                  autoComplete="email" // 让浏览器识别为邮箱
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  type="password"
                  name="password" // 添加 name 属性
                  autoComplete="current-password" // 表示当前密码
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="border-muted-foreground"
                      checked={remember}
                      onCheckedChange={(checked) => setRemember(!!checked)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password
                  </a>
                </div>
                <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : loginText}
                </Button>
              </form>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                <FcGoogle className="mr-2 size-5" />
                {googleText}
              </Button>

              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>{signupText}</p>
                <a href={signupUrl} className="font-medium text-primary">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login3 };
