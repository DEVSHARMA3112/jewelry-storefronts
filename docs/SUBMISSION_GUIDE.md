# Submission guide (deadline: Monday, October 5, 2026)

## 0. About "not looking like AI"
Your assignment says AI tools are encouraged and must be listed in the README. Hiding it would break the rules and could get you rejected, and interviewers will ask you to explain the code. So the goal is not to hide it. The goal is to **understand it, change it, and own it**. Your submitted link is your own Vercel/Netlify address, not a claude.ai link.

## 1. Run it locally
1. Install Node.js 20+ from nodejs.org.
2. Unzip, open a terminal in the folder.
3. `npm install` then `npm run dev` and open http://localhost:5173.
4. Click through every page, add to cart, filters, resize to 360px.

## 2. Make it yours (2 to 3 hours well spent)
- Replace the SVG artwork with real photos (Unsplash/Pexels), converted to WebP under 200 KB, in `public/images/<brand>/`.
- Update image paths in the JSON (do this once, then do NOT run `npm run gen` again, it overwrites images):
  `sed -i 's/\.svg"/.webp"/g' public/api/*/products.json` (Mac/Linux; on Windows use find-and-replace in your editor).
- Change something visible: a color, a font, hero copy, one section layout. Know why you chose it.
- Fill in the README placeholders honestly, including the AI section.
- In `public/sitemap.xml` and `public/robots.txt` replace `your-site.vercel.app` with your real domain.

## 3. Git with real commits
```
git init
git add . && git commit -m "Scaffold Vite React app with routing and brand themes"
```
Then commit as you make each change (images, copy edits, bug fixes, README, SEO). The assignment penalizes one giant commit, so keep each commit small and honest.

## 4. GitHub
1. Create an empty repo on github.com (public).
2. `git remote add origin https://github.com/<you>/<repo>.git`
3. `git branch -M main && git push -u origin main`

## 5. Deploy (Vercel)
1. vercel.com, sign in with GitHub, **Add New, Project**, import the repo.
2. Framework: Vite. Build `npm run build`, output `dist`. Deploy.
3. **Choose your link:** Project Settings, Domains, edit the `.vercel.app` name (e.g. `jewel-storefronts-yourname.vercel.app`). A custom domain is optional.
4. Open the live URL on your phone. Test a product page directly and refresh it (the `vercel.json` rewrite handles this). On Netlify the `public/_redirects` file does the same.

## 6. Lighthouse and recording
- Chrome DevTools, Lighthouse, Mobile, run on one landing page and one product detail page. Screenshot both results. Fix anything under the targets (A11y/SEO/Best Practices 90+, Performance 70+) and rerun.
- Record 5 minutes or less (Win+G, macOS Cmd+Shift+5, or OBS): desktop and mobile width, home, a landing, a listing with filters, a product with variants, add to cart, 404.

## 7. Submit
Reply to the assignment email with: live URL, GitHub link, and confirm README, KEYWORDS.md, Lighthouse screenshots and the video link (upload to Google Drive/YouTube unlisted). Send before the deadline, and open every link in a private window first.

## Known limits to fix or mention
Placeholder artwork until you swap photos; client-side rendering limits SEO; Lighthouse not measured by me; checkout is intentionally out of scope.
