# Deploying Michael's Dashboard (Cloudflare Pages)

This is a static site (Vite + React). Cloudflare Pages builds it straight from
GitHub and gives you a public link you can send to Michael. It re-deploys
automatically every time new code is pushed to the repo.

## One-time setup (~5 minutes, all in the browser)

1. Go to **https://dash.cloudflare.com** and sign in.
2. In the left sidebar, open **Compute (Workers & Pages)** → **Pages** tab.
3. Click **Connect to Git** and authorize Cloudflare to access your GitHub.
4. Pick the repository **`ilruizai05-lgtm/michaels-dashboard`** → **Begin setup**.
5. Under **Build settings**, enter exactly:
   - **Framework preset:** `Vite` (if it's not listed, choose `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - Leave **Root directory** as `/`.
6. Click **Save and Deploy**. The first build takes ~1–2 minutes.
7. When it finishes you'll get a live URL like
   `https://michaels-dashboard.pages.dev` — that's the link to send Michael.

## After it's live

- Every time the code is updated on GitHub's `main` branch, Cloudflare
  rebuilds and updates the site automatically — no extra steps.
- To share with Michael, just send him the `.pages.dev` link. On the login
  screen he can pick **Owner** to see the full dashboard.

## Notes

- This is a **prototype with sample data** — there are no real logins, so the
  link is a demo, not a live system. Anyone with the URL can open it.
- `.node-version` pins Node 22 so Cloudflare's build matches what the app needs.
- Want a private/password-protected preview instead of a public link? Cloudflare
  Pages offers **Access policies** (free tier) — ask and we can set that up.
