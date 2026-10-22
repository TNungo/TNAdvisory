# TCN Consultants

The public landing page for TCN Consultants, built as a Vite/React site and prepared for Vercel deployment at `tcnconsultants.com`.

## Local development

```bash
pnpm install
pnpm run check
pnpm run build
pnpm run dev
```

## Supabase briefing intake

Run `supabase/briefing_requests.sql` in the Supabase SQL editor. It creates `public.briefing_requests`, enables RLS, blocks browser reads, and grants inserts only to the server-side service role.

Configure these Vercel environment variables for Production and Preview:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SITE_ORIGIN=https://tcnconsultants.com`

The public enquiry form posts to `/api/briefing`. The service-role key is used only inside the Vercel function and is never shipped to the browser.

## Brand and content

The page uses the supplied TCN mark and locally optimized Nairobi, Cape Town and global trade-port photography. The homepage positioning is Nairobi / Cape Town / Worldwide, with capability and track-record language grounded in the supplied TCN brief.
