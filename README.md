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

---

## TODO:

[] when sync clicked for a user NOT signed in, user is prompted to create account
[] fix initial slug
[] when a signed in user goes to /[theirname] it should take them to /
[] qr code on profile
[] image gradient for when user doesnt have profile photo
[] update bio / display name
[] add genres
