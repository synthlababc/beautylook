This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## sql
```bash
# 重新生成 Prisma Client
npx prisma generate
```

```bash
npx prisma migrate dev --name init
```

重置数据
```bash
npx prisma migrate reset
```