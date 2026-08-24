# Custom domain cutover

Moving this site from `username.github.io` to a domain you own.

Record values and the CNAME-file behaviour below were verified against GitHub's
documentation in August 2026. Older tutorials circulate a retired `192.30.252.x`
IP range that will silently fail — if an address here does not start `185.199.`,
it is wrong.

---

## 1. Pick which form is canonical

One of these is your real address; the other redirects to it. GitHub sets up the
redirect automatically once both are in DNS, so this is only about which one
people see in the address bar.

| | Example | Needs |
| --- | --- | --- |
| **Apex** | `lucasplabst.com` | Four A records (plus four AAAA). A CNAME on an apex is not legal DNS. |
| **www** | `www.lucasplabst.com` | One CNAME record. GitHub's own recommendation — a subdomain sits behind their CDN better than an apex. |

For a personal academic page the apex usually reads better in a paper footer.
Set up both regardless; only the one you enter in repository settings is
canonical.

---

## 2. Add the DNS records

At your registrar — wherever the domain lives.

**Apex — `lucasplabst.com`**

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

**Subdomain — `www.lucasplabst.com`**

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `USERNAME.github.io` |

The CNAME target is your GitHub username only — never include the repository
name.

If your DNS provider supports `ALIAS` or `ANAME` records, one of those pointed at
`USERNAME.github.io` replaces all eight apex records and keeps working if GitHub
ever changes its IPs.

---

## 3. Tell the repository its domain

**Settings → Pages → Custom domain.** Enter the canonical form, press **Save**.

> **The part most tutorials get wrong.** You will read everywhere that you should
> commit a `CNAME` file containing your domain. That does nothing here. GitHub's
> docs are explicit: when a site is published by a custom Actions workflow — which
> is exactly how this project deploys — no `CNAME` file is created and any
> existing file is ignored.
>
> The domain lives in repository settings and nowhere else.

---

## 4. Update the Astro config

The project-specific step, and the one that causes the classic "site loads but
has no styling" failure if skipped.

```diff
 export default defineConfig({
-  site: 'https://username.github.io',
-  base: '/portfolio',
+  site: 'https://lucasplabst.com',
   output: 'static',
   trailingSlash: 'ignore',
 });
```

`base` must be **removed entirely**, not set to `'/'`. It exists only to prefix
every asset path with a repository name; on a custom domain the site is served
from the root, so leaving it in makes every stylesheet, script and image 404
while the HTML itself loads fine.

`site` is not cosmetic either — it builds the canonical URL and the Open Graph
tags in `Base.astro`.

```bash
npm run build
git add -A && git commit -m "Point site at custom domain"
git push
```

---

## 5. Wait, then force HTTPS

GitHub requests a TLS certificate as soon as it can resolve the domain. DNS
changes can take up to 24 hours to propagate, though most registrars are live in
minutes.

Once the certificate exists, **Enforce HTTPS** in Settings → Pages becomes
selectable. Tick it.

If it stays greyed out, GitHub's documented fix is to click **Remove** next to the
custom domain, retype it, and **Save** again — that cancels and restarts
provisioning.

---

## 6. Verify the domain

Optional, worth five minutes. Verifying binds the domain to your account so
nobody else can claim it on GitHub Pages.

**Account** settings (not the repository's) → **Pages** → **Add a domain**.
GitHub generates a TXT record and shows you its exact name and value; add it at
your registrar, then come back and verify.

---

## Confirm it worked

```bash
dig +short lucasplabst.com
# → 185.199.108.153 … and the other three

dig +short www.lucasplabst.com
# → username.github.io. then the same four addresses

curl -sI https://lucasplabst.com | head -1
# → HTTP/2 200

curl -sI http://lucasplabst.com | grep -i location
# → location: https://lucasplabst.com/
```

Then open the site with DevTools → Network. A page that renders as unstyled text
means `base` is still set; check the failing URL for your repository name.

- [ ] Both apex and www load
- [ ] Padlock shows
- [ ] `http://` redirects to `https://`
- [ ] Old `username.github.io` redirects to the new domain
- [ ] Publications, splash and fonts all render

---

## What actually goes wrong

| | Problem | Fix |
| --- | --- | --- |
| 1 | **Cloudflare's orange cloud** | Set records to **DNS only** (grey cloud). Proxying intercepts validation and the certificate never issues. Re-enable after HTTPS works. |
| 2 | **A CNAME on the apex** | Not legal DNS whatever the registrar's UI allows. Use A/AAAA, or `ALIAS`/`ANAME`. |
| 3 | **A and CNAME on the same name** | Also invalid, and it resolves inconsistently rather than failing outright. Delete leftover parking records. |
| 4 | **`base` left in the config** | HTML loads, nothing else does. See step 4. |
| 5 | **Stale IP addresses** | If it does not start `185.199.`, it is wrong. |
| 6 | **Checking too early locally** | Your resolver caches the old answer. `dig +short lucasplabst.com @1.1.1.1` |
| 7 | **Expecting the `CNAME` file to matter** | It does not, on an Actions deploy. See step 3. |

---

## Backing out

Nothing here is one-way. Clear the custom domain in Settings → Pages, restore
`site` and `base` to their `username.github.io` values, and push. The site
returns to the old address within a deploy; the DNS records can stay pointed at
GitHub harmlessly.

---

Sources: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) ·
[Securing your GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
