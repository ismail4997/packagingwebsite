# PACKNEXT

Custom packaging website for businesses in Pakistan. The site presents packaging categories, a materials library, industry briefs, and the PACKNEXT Packaging Studio: a guided specification that ends in a quotation request. It does not invent prices, client names, certificates, or company history.

## Stack

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- React Three Fiber and Three.js for the packaging preview
- Zod for quotation validation

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On Windows PowerShell, copy the example env file with:

```powershell
Copy-Item .env.example .env.local
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment variables

See `.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URLs, sitemap, and Open Graph. Example: `https://packnext.example` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | For WhatsApp | Digits only, with country code. Pakistan example: `923001234567`. Leave empty until the number is real. |
| `NEXT_PUBLIC_PHONE_DISPLAY` | Optional | Phone shown on the contact page. Use `+92` when publishing a Pakistani number. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Email shown on the contact page and in organization metadata. |
| `SUPABASE_URL` | Production storage | Project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | Production storage | Server-only key. Never expose it as `NEXT_PUBLIC_`. |
| `RESEND_API_KEY` | Optional email | Resend API key. |
| `QUOTE_FROM_EMAIL` | Optional email | Verified sender, for example `PACKNEXT <quotes@yourdomain.com>`. |
| `QUOTE_NOTIFY_EMAIL` | Optional email | Inbox that receives quotation requests. |

Email is sent only when all three Resend variables are set. The success screen says when email is not configured.

## Quotation storage

The form at `/studio`, `/quote`, product pages, and `/contact` posts to `POST /api/quotes`.

What the response means:

- `supabase` — the row was inserted and any artwork was uploaded to the private `artwork` bucket.
- `local-file` — Supabase is not configured (or the cloud write failed) and the server wrote `storage/quotes/<id>.json` plus an optional file in `storage/uploads/`. This is real on a machine with a persistent disk. It is not a cloud database.
- `unsaved` — nothing was stored. The summary is still returned so it can be copied or sent on WhatsApp.

`storage/` is gitignored. On serverless hosts the local disk is temporary. Configure Supabase before treating submissions as durable.

The site never calculates a manufacturing price. Amounts, when you later have real ones, should be formatted in PKR with `formatPkr` in `src/lib/format.ts`.

### Supabase setup

1. Create a project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create a **private** storage bucket named `artwork`.
4. Put `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
5. Restart the server.

Row level security is enabled and there is no public policy. The service role key bypasses it from the server. Do not query this table from the browser.

### WhatsApp

The floating button and the studio both use `NEXT_PUBLIC_WHATSAPP_NUMBER`. The link is `https://wa.me/<digits>?text=...` and includes the specification. If the variable is empty or not 10–15 digits, the button goes to the contact page and explains what to set. Do not put a guessed number in the variable.

### Artwork uploads

Accepted types: PNG, JPG, WebP, PDF. Maximum size: 8 MB. Other file types should be sent later on WhatsApp or email. Uploaded files are not served as public pages.

Spam controls on the route: a hidden honeypot, a minimum time on the form, an origin check, and a simple in-memory rate limit (8 posts per 10 minutes per IP). The rate limit resets when the server process restarts.

## Content and language

- English is the live locale (`src/lib/i18n.ts`). `ur` is reserved so a second dictionary can be added without changing the routes.
- Editable business facts live in `businessProfile` in `src/lib/site.ts`. They are labelled as placeholders on the About page.
- Categories, products, materials, industries, and studio options live under `src/lib/data/`.
- Do not add invented statistics, reviews, client names, certificates, or delivery coverage.

City list: Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Sialkot, Multan, Gujranwala, Peshawar, and Other / International.

Phone validation accepts Pakistani mobiles (`03XXXXXXXXX` or `+92 3XXXXXXXXX`) and other international numbers that start with `+`.

## Images

Packaging pictures are drawn as SVG illustrations (`PackShot`, `TextureSwatch`) so the site does not depend on unrelated stock photos. The studio preview is a Three.js model. Neither is a print proof or a dieline. Replace an illustration with your own photography by swapping the component in the relevant page and keeping descriptive alt text.

## SEO

Each route sets a title, description, and canonical path. The root layout adds Open Graph defaults, `app/opengraph-image.tsx`, and `app/icon.tsx`. `app/sitemap.ts` and `app/robots.ts` follow `NEXT_PUBLIC_SITE_URL`. Organization and product JSON-LD are included. Product structured data does not include a fake price.

## Deployment

1. Set the environment variables on the host.
2. Set `NEXT_PUBLIC_SITE_URL` to the public origin.
3. Configure Supabase if quotations must be kept.
4. `npm run build` then `npm run start`, or deploy on a Node host that supports Next.js.

`cacheComponents` is enabled in `next.config.ts`. Do not add a route segment `dynamic` or `runtime` export. Those conflict with that setting. The quotation route is dynamic because it reads the request.

## Manual configuration still required

- WhatsApp number, public phone, and contact email
- Registered name, address, hours, year, and any registration numbers in `businessProfile`
- Supabase project, SQL, and private `artwork` bucket
- Resend domain and notification inbox, if email alerts are wanted
- Real product photography, if you want to replace the illustrations
- Delivery or pickup terms, only after they are actually known
