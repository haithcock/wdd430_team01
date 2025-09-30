# wdd430_team01
Team 01 (the best team) meets every wednesday at 14:00 UTC.



Team members names: 
Nelson
Dakota
Katherine
Sofia
<<<<<<< HEAD
Benjamin
Favourite
=======

## Development

The app lives in `my-next-app/` and is a Next.js (App Router) project with Tailwind CSS.

### Prereqs
- Node 18+ (LTS recommended)

### Install & run
```bash
cd my-next-app
npm install
npm run dev
```
Visit http://localhost:3000

## Authentication (NextAuth)

We use NextAuth with GitHub as the OAuth provider.

Create `my-next-app/.env.local` with:
```
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=any_random_string
```

Provider config is in `src/lib/auth.ts`. Route handler is `src/app/api/auth/[...nextauth]/route.ts`.

Protected routes are enforced via `middleware.ts` for:
- `/sell`
- `/api/products`

Sign-in page: `src/app/auth/signin/page.tsx`.

## Seller upload page

Page: `src/app/sell/page.tsx`
- Shows a form for product details
- Live preview using `src/app/ui/ProductCard.tsx`
- Submits to `POST /api/products` with validation

API: `src/app/api/products/route.ts`
- Validates input with `zod`
- Requires an authenticated session
- Stores in memory (`src/lib/products.ts`) for now

Note: Image URLs must be public. Remote images are allowed in `next.config.ts`.
>>>>>>> bd6a292 (WIP: local changes before pulling)
