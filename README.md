# KPCT Website

Kandhasamy Public Charitable Trust website: a React (Vite) frontend and a Node.js/Express backend.

## Layout

```
backend/            Express API
  src/app.js        app wiring: CORS, JSON parsing, routes, static build serving
  src/server.js     entry point
  src/config.js     environment variables
  src/routes/       API routes (contact)
  src/store.js      reads/writes contact submissions in Supabase
  src/supabase.js   service-role Supabase client (server-side only)
  supabase/schema.sql  table definition to run once in your project
frontend/           React single-page app
  index.html        Vite entry document (fonts, favicon)
  public/images/    logo and background images
  public/reports/   downloadable compliance PDFs (12A, 80G, CSR, deed)
  src/pages/        Home, About, Programs, Documents, Contact
  src/components/   Header, Footer, Layout, PageHero, SectionHead,
                    MediaPanel, Reveal, CountUp
  src/data/site.js  shared content (social profiles)
  src/styles/       design system + one scoped stylesheet per page
  src/api/client.js fetch wrapper around the API
```

### Styles

`global.css` imports the design system in cascade order:

| File | Contents |
| --- | --- |
| `tokens.css` | colour, type scale, spacing, radii, shadows, motion — all custom properties |
| `base.css` | reset, document defaults, focus rings, reduced-motion, skip link |
| `layout.css` | container, section, grids, split rows, scroll-reveal |
| `components.css` | buttons, cards, eyebrows, media panels, form fields, alerts, lists, CTA band |
| `chrome.css` | header, primary nav, mobile drawer, footer |
| `hero.css` | home hero and inner-page hero |

Page-specific layout stays in `home.css`, `about.css`, `programs.css`,
`documents.css` and `contact.css`, each scoped under a `.page-*` wrapper class
so page rules cannot leak into one another.

Theming is done entirely through the tokens: changing `--green-600` or
`--gold-500` in `tokens.css` restyles the whole site.

## Setup

```bash
npm run install:all
```

Then copy the example environment files (both are created automatically if you
already have them; otherwise):

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### Environment variables

`backend/.env`

| Variable | Purpose |
| --- | --- |
| `PORT` | Port the API listens on (default `5000`) |
| `CORS_ORIGIN` | Comma-separated allowed origins (same-origin requests are always allowed) |
| `NODE_ENV` | `development` or `production` |
| `SUPABASE_URL` | Project URL, e.g. `https://xxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key. **Server-side only — never expose it to the frontend** |
| `SUPABASE_TABLE` | Table holding submissions (default `contact_submissions`) |
| `ADMIN_API_KEY` | Required to read submissions back via `GET /api/contact`. Empty keeps that endpoint disabled |

### Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste [`backend/supabase/schema.sql`](backend/supabase/schema.sql)
   and run it. This creates `contact_submissions` and enables row level security
   with no public policies, so neither the `anon` nor `authenticated` role can
   touch the table.
3. Copy **Project Settings → API → Project URL** into `SUPABASE_URL` and the
   **`service_role`** key into `SUPABASE_SERVICE_ROLE_KEY` in `backend/.env`.
4. Set `ADMIN_API_KEY` to any long random string if you want to read
   submissions back through the API.

The service-role key bypasses row level security. It is read only by the API
process, is never sent to the browser, and must never be given a `VITE_` prefix
(anything prefixed `VITE_` is compiled into the public bundle).

`frontend/.env`

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL of the API. Empty means same-origin, which is what `.env.production` uses because the API serves the build. |

## Running in development

```bash
npm run dev
```

Starts the API on <http://localhost:5000> and the Vite dev server on
<http://localhost:5173>. The frontend calls the API at `VITE_API_URL`.

Either side can also be run on its own with `npm run dev:api` / `npm run dev:web`.

## Production build

```bash
npm run build   # builds frontend/dist
npm start       # Express serves the API and the built app on one port
```

When `frontend/dist` exists the Express app serves it and falls back to
`index.html` for client-side routes, so the whole site runs from a single
process on `PORT`.

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Liveness check |
| `POST` | `/api/contact` | Contact/inquiry submission (stored in Supabase) |
| `GET` | `/api/contact` | Read stored submissions — requires the `x-admin-key` header |

`POST /api/contact` accepts `name`, `email`, `subject`, `message` (all required),
plus optional `phone`, `interest` and `source`. It returns `201` with
`{ success, message, id }`, or `400` with per-field `errors`.

`GET /api/contact` returns the stored entries newest first, as
`{ success, count, submissions }`. Submissions contain personal data, so the
endpoint requires the admin key and is disabled when `ADMIN_API_KEY` is unset:

```bash
curl -H "x-admin-key: $ADMIN_API_KEY" http://localhost:5000/api/contact
curl -H "x-admin-key: $ADMIN_API_KEY" "http://localhost:5000/api/contact?limit=20"
```

If Supabase is unreachable the API replies `503` with a friendly message and
logs the underlying error server-side; it never reports a submission as saved
when it was not.
