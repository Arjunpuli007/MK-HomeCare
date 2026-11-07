# MK HomeCare website – setup & go-live guide

Static site (no build step). Upload all files in this folder to any static host.

## Go live free in ~5 minutes (Cloudflare Pages / Netlify)
1. Create a free account at pages.cloudflare.com or app.netlify.com.
2. Choose "Upload assets / Deploy manually" and drag in this whole folder (or the zip).
3. In the host's Domains settings, add `mkhomecare.in` and copy the DNS records it shows into your domain registrar.
4. HTTPS is automatic. `404.html` is used as the not-found page.

(GitHub Pages also works: push these files to a repo, enable Pages on the main branch.)

## After it is live
- Google Search Console: add `https://mkhomecare.in`, submit `https://mkhomecare.in/sitemap.xml`.
- Google Business Profile: create/claim "MK HomeCare" with the same phone number and hours.
- Test the booking form and review form once with your own phone.

## Things to edit
- Phone/WhatsApp: `app.js` (`WA`, `WA_REVIEW`) plus the `wa.me` / `tel:` links in each page.
  Note: bookings go to 8309892421, reviews and the privacy contact go to 7702112171.
- Domain: if not `mkhomecare.in`, replace it in every `*.html`, `sitemap.xml` and `robots.txt`.
- Reviews, "1200+ clients", "4.8★", "5+ years": make sure these are accurate before launch.
- Privacy policy "Last updated" date: `index.html`, #privacy section.
- Prices: in each service page (search for ₹).

## Features
- Price estimator (home page): pick services with +/- buttons, live total, then "Continue to booking" adds the list to the WhatsApp message.
- Booking form: preferred date (next 60 days) and time slot; remembers name/phone/area on the visitor's device.
- FAQ with Google FAQ markup.
- Estimator prices live in `EST_DATA` at the top of the estimator section in `app.js`. Update them there when you change prices on the service pages.

## Files
index.html, 5 service pages, style.css, app.js, 404.html, robots.txt, sitemap.xml, og-image.png (social share preview).
