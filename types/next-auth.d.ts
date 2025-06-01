import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: User & { role?: string; id?: string };
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string | undefined;
  }
}
