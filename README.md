# Booklish

Booklish is a personal book library built with Next.js. It includes public-domain books, chapter reading, private saved books, authentication, and book search.

## Live site

Visit the deployed app at [my-project-lsid.vercel.app](https://my-project-lsid.vercel.app).

## Features

- Browse public-domain novels by category.
- Search for books and open chapter reading pages.
- Sign in with Clerk to use a private library.
- Save generated books with MongoDB.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Keep private credentials in `.env.local`; never commit that file.

## Required environment variables

The deployed app needs Clerk keys, Vapi keys, and `MONGODB_URI`. Add them to Vercel for the Production environment before deploying.
