This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install packages

```
npm install
```

Connect to pscale db (must have been added to in-tune team).

You also need to have the correct .env config

```
sudo pscale connect in-tune in-tune-dev --port 3309
```

Start app

```
npm run dev
```

See database updates

```
npx prisma studo
```
