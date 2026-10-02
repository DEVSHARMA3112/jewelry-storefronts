# Full source code

Every file in reading order: config, brands, data and helpers, cart, components, pages, styles, scripts.

---
## KEYWORDS.md

```md
# Keyword map
| Page | URL | Primary keyword | Secondary | Title | Meta description | H1 |
|---|---|---|---|---|---|---|
| Aurelle landing | /aurelle | lab grown diamond rings | lab created diamond ring, conflict free diamond ring | Lab Grown Diamond Rings \| Aurelle Fine Jewelry | Design your story with IGI-certified lab-grown diamond rings in recycled 14K gold. Free US shipping, 30-day returns and a lifetime warranty. | Lab-grown diamonds, grown for the moment you ask |
| Aurelle listing | /aurelle/engagement-rings | lab grown diamond engagement rings | oval lab diamond ring, IGI certified engagement ring | Lab Grown Diamond Engagement Rings \| Aurelle | Shop IGI-certified lab-grown diamond engagement rings in 14K gold. Free US shipping, 30-day returns and a lifetime warranty. | Lab-Grown Diamond Engagement Rings |
| Aurelle detail | /aurelle/engagement-rings/oval-lab-grown-diamond-solitaire-engagement-ring | oval lab grown diamond engagement ring | oval solitaire ring, 1.5 carat oval ring | Oval Lab-Grown Diamond Solitaire Engagement Ring \| Aurelle | (generated from product description) | Oval Lab-Grown Diamond Solitaire Engagement Ring |
| Gemma & Grove landing | /gemma-grove | gemstone jewelry | sapphire ring, emerald ring, ruby ring | Gemstone Jewelry: Sapphire, Emerald, Ruby \| Gemma & Grove | Discover sapphire, emerald and ruby gemstone jewelry in recycled 14K gold. Ethically sourced, free US shipping and 30-day returns. | Color worth keeping |
| Gemma & Grove listing | /gemma-grove/gemstone-rings | gemstone rings | blue sapphire ring, emerald ring gold | Gemstone Rings: Sapphire, Emerald & Ruby \| Gemma & Grove | Shop gemstone rings with natural sapphire, emerald and ruby in 14K gold. Ethically sourced, free US shipping and 30-day returns. | Gemstone Rings |
| Gemma & Grove detail | /gemma-grove/gemstone-rings/oval-blue-sapphire-solitaire-ring | oval blue sapphire ring | sapphire solitaire ring, blue sapphire gold ring | Oval Blue Sapphire Solitaire Ring \| Gemma & Grove | (generated from product description) | Oval Blue Sapphire Solitaire Ring |
| Lustre landing | /lustre | moissanite rings | moissanite earrings, moissanite vs diamond | Moissanite Rings & Earrings \| Lustre | Shop moissanite rings and earrings with maximum sparkle. Colorless D-E stones in 14K gold with free US shipping and 30-day returns. | More fire. Less price. |
| Lustre detail | /lustre/moissanite-rings/round-moissanite-solitaire-ring | round moissanite solitaire ring | moissanite engagement ring, D-E moissanite | Round Moissanite Solitaire Ring \| Lustre | (generated from product description) | Round Moissanite Solitaire Ring |

```

---
## index.html

```html
<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@400;500&family=Fraunces:opsz,wght@9..144,400;600&family=Figtree:wght@400;500;600&family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet"/>
<title>Jewelry Storefronts</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>

```

---
## package.json

```json
{
  "name": "jewelry-storefronts",
  "private": true,
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "format": "prettier --write src scripts",
    "preview": "vite preview",
    "gen": "node scripts/generate.mjs"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "prettier": "^3.9.9",
    "vite": "^5.4.11"
  }
}

```

---
## scripts/art.mjs

```js
export const METAL={'14K Yellow Gold':['#f3dc9b','#d9b56a','#9c7a34'],'14K White Gold':['#ffffff','#dfe3e8','#9aa3ae'],'14K Rose Gold':['#f8d3c7','#e3a897','#a8695a']};
export const GEM={diamond:'#eaf8ff',sapphire:'#2f5fd6',emerald:'#14a874',ruby:'#d8184a',moissanite:'#e4f4ff'};
export const BG={aurelle:['#fffaf1','#e9dcc3'],'gemma-grove':['#4a2347','#1a0f1d'],lustre:['#2c2c40','#07070b']};
const SH={Round:'<circle r="80"/>',Oval:'<ellipse rx="64" ry="92"/>',Emerald:'<polygon points="-46,-78 46,-78 58,-62 58,62 46,78 -46,78 -58,62 -58,-62"/>',Pear:'<path d="M0,-98C62,-30 74,42 0,86C-74,42-62,-30 0,-98Z"/>',Cushion:'<rect x="-76" y="-76" width="152" height="152" rx="34"/>',Princess:'<rect x="-66" y="-66" width="132" height="132"/>',Marquise:'<path d="M0,-104Q74,0 0,104Q-74,0 0,-104Z"/>',Radiant:'<polygon points="-52,-78 52,-78 66,-62 66,62 52,78 -52,78 -66,62 -66,-62"/>'};
let n=0;const ST=`<style>@keyframes t{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.15;transform:scale(.4)}}@keyframes f{to{transform:translateY(-26px)}}@keyframes g{50%{opacity:.5}}.sp{animation:t 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}.bk{animation:f 7s ease-in-out infinite alternate}.gl{animation:g 3.5s ease-in-out infinite}</style>`;
function ring(cx,cy,k,gem,metal,cut,style,tilt){const id='r'+(n++),[l,m,d]=METAL[metal],g=GEM[gem],shape=SH[cut]||SH.Round;
const dots=(style||'').includes('Halo')?Array.from({length:16},(_,i)=>{const a=i/16*6.283;return `<circle cx="${Math.cos(a)*(cut==='Round'?100:108)}" cy="${Math.sin(a)*(cut==='Round'?100:118)}" r="7" fill="url(#g${id})"/>`}).join(''):'';
const pave=(style||'').match(/Pave/)?Array.from({length:9},(_,i)=>`<circle cx="${-150+i*37.5}" cy="${Math.sqrt(Math.max(0,190*190*(1-((-150+i*37.5)/190)**2)))*-1+8}" r="7" fill="url(#g${id})" stroke="${d}" stroke-width="2"/>`).join(''):'';
const side=style==='Three-Stone'?[-135,135].map(x=>`<circle cx="${x}" cy="-96" r="20" fill="url(#g${id})" stroke="${d}" stroke-width="3"/>`).join(''):'';
return `<defs><linearGradient id="m${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${l}"/><stop offset=".45" stop-color="${m}"/><stop offset="1" stop-color="${d}"/></linearGradient><radialGradient id="l${id}"><stop offset="0" stop-color="${g}" stop-opacity=".6"/><stop offset="1" stop-color="${g}" stop-opacity="0"/></radialGradient><linearGradient id="p${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7ad9"/><stop offset=".35" stop-color="#7affd9"/><stop offset=".7" stop-color="#ffe27a"/><stop offset="1" stop-color="#7aa8ff"/></linearGradient><radialGradient id="g${id}" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${g}"/><stop offset="1" stop-color="${g}" stop-opacity=".55"/></radialGradient><clipPath id="c${id}">${shape}</clipPath></defs>
<g transform="translate(${cx} ${cy}) scale(${k}) rotate(${tilt||0})"><ellipse cy="196" rx="190" ry="22" fill="#000" opacity=".22" filter="blur(8px)"/>
<circle r="190" fill="none" stroke="url(#m${id})" stroke-width="30"/><circle r="177" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3"/><circle r="205" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="2"/><circle r="190" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-dasharray="2 16"/>${pave}${side}
<g transform="translate(0 -250)"><circle r="170" fill="url(#l${id})" class="gl"/><path d="M-30,60 L-16,100 L16,100 L30,60Z" fill="url(#m${id})"/>${dots}
<g transform="scale(1.05)"><g fill="url(#g${id})" stroke="#fff" stroke-opacity=".8" stroke-width="2">${shape}</g>
<g clip-path="url(#c${id})" stroke="#fff" stroke-width="1.6" stroke-opacity=".75" fill="none"><rect x="-110" y="-110" width="220" height="220" fill="url(#p${id})" opacity=".3" stroke="none" style="mix-blend-mode:screen"/><g transform="scale(.6)"><g stroke-width="2.6">${shape}</g></g>${Array.from({length:12},(_,i)=>{const a=i/12*6.283;return `<line x1="${Math.cos(a)*48}" y1="${Math.sin(a)*52}" x2="${Math.cos(a)*130}" y2="${Math.sin(a)*130}"/>`}).join('')}<path d="M-70,-20L0,-70L70,-20L0,70Z" stroke-opacity=".5"/></g>
<ellipse cx="-24" cy="-30" rx="26" ry="10" fill="#fff" opacity=".7" transform="rotate(-35 -24 -30)"/></g>
${[[60,-70,10],[-62,40,7],[8,-96,6],[-150,-40,9],[150,20,8],[-30,150,6]].map(([x,y,r])=>`<path class="sp" style="animation-delay:${(Math.abs(x)%5)*.5}s" d="M${x},${y-r*2}L${x+r*.4},${y-r*.4}L${x+r*2},${y}L${x+r*.4},${y+r*.4}L${x},${y+r*2}L${x-r*.4},${y+r*.4}L${x-r*2},${y}L${x-r*.4},${y-r*.4}Z" fill="#fff"/>`).join('')}</g></g>`}
const bg=(brand,w,h,i)=>{const [a,b]=BG[brand],dark=brand!=='aurelle';
return `<defs><radialGradient id="bg" cx="${w>h?'70%':'50%'}" cy="45%" r="75%"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient></defs><rect width="${w}" height="${h}" fill="url(#bg)"/>`+Array.from({length:7},(_,k)=>`<circle class="bk" style="animation-delay:-${k}s" cx="${(k*(w/6)+i*130)%w}" cy="${(k*197+i*90)%h}" r="${40+(k*29)%70}" fill="${dark?'#fff':'#d9b56a'}" opacity="${dark?.05:.12}"/>`).join('')};
export const art=(brand,gem,metal,v,label,cut,style)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">${ST}${bg(brand,800,1000,v)}${v?'':`<path d="M170,1000V470a230,230 0 0 1 460,0V1000Z" fill="${brand==='aurelle'?'#fff':'#fff'}" opacity=".1"/>`}${ring(v?420:400,v?650:640,.95,gem,metal,cut,style,v?-14:0)}</svg>`;
export const hero=(brand,gem,metal,i,cut,style)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">${ST}${bg(brand,1600,900,i)}${ring(1150-i*40,560,1.05,gem,metal,cut,style,i*6-6)}</svg>`;

```

---
## scripts/generate.mjs

```js
// Generates product JSON, SVG artwork (swap for WebP photos), sitemap, robots
import fs from 'fs';
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
import {art,hero,METAL,GEM,BG} from './art.mjs';
const mk=(brand,pre,cat,rows,metals,carats,base,gemOf,titleOf,spec,desc)=>rows.map((r,i)=>{
 const title=titleOf(r),gem=gemOf(r),price0=Math.round((base[0]+(base[1]-base[0])*i/(rows.length-1||1))/10)*10;
 const variants=[];metals.forEach((m,mi)=>carats.forEach((c,ci)=>variants.push({id:`${pre}-${String(i+1).padStart(3,'0')}-${mi}${ci}`,metal:m,carat:c,price:Math.round(price0*(1+ci*.35+(mi==2?.04:0))/10)*10,inStock:!((i+mi+ci)%7===6)})));
 const s=slug(title);fs.mkdirSync(`public/images/${brand}`,{recursive:true});
 const imgs=[0,1].map(v=>{const f=`public/images/${brand}/${s}-${v+1}.svg`;fs.writeFileSync(f,art(brand,gem,metals[v],v,title,r[0],r[r.length-1]));return {src:f.slice(6),alt:`${title} in ${metals[v]} with ${gem==='diamond'?'lab-grown diamond':gem}`,width:800,height:1000}});
 return {id:`${pre}-${String(i+1).padStart(3,'0')}`,slug:s,brand,category:cat,title,price:price0,compareAtPrice:i%3==0?Math.round(price0*1.2/10)*10:null,images:imgs,variants,specs:spec(r,i),rating:+(4.5+(i%5)/10).toFixed(1),reviewCount:40+i*13,tags:i<3?['bestseller']:i>8?['new']:[],gemstone:gem,created:`2026-0${1+(i%9)}-15`,description:desc(r,title)}});
const shapes=['Oval','Round','Emerald','Pear','Cushion','Princess','Marquise','Radiant','Oval','Round','Emerald','Pear'];
const styles=['Solitaire','Solitaire','Halo','Hidden Halo','Pave','Three-Stone','Solitaire','Halo','Pave','Hidden Halo','Three-Stone','Solitaire'];
const MET=['14K Yellow Gold','14K White Gold','14K Rose Gold'];
const out={
aurelle:mk('aurelle','aur','engagement-rings',shapes.map((s,i)=>[s,styles[i]]),MET,[1,1.5,2],[1200,6000],()=>'diamond',([s,t])=>`${s} Lab-Grown Diamond ${t} Engagement Ring`,([s],i)=>({stone:'Lab-grown diamond',cut:s,color:'F',clarity:i%2?'VVS2':'VS1',certificate:'IGI'}),([s,t],ti)=>`A timeless ${s.toLowerCase()} ${t.toLowerCase()} setting handcrafted in recycled 14K gold, set with an IGI-certified lab-grown diamond. Made to be worn every day.`),
'gemma-grove':mk('gemma-grove','gg','gemstone-rings',shapes.map((s,i)=>[s,['sapphire','emerald','ruby'][i%3],styles[i]]),MET,[1,1.5],[600,4000],r=>r[1],([s,g,t])=>`${s} ${g==='sapphire'?'Blue Sapphire':g[0].toUpperCase()+g.slice(1)} ${t} Ring`,([s,g])=>({stone:g[0].toUpperCase()+g.slice(1),cut:s,color:g==='sapphire'?'Royal blue':g==='ruby'?'Pigeon blood red':'Vivid green',clarity:'Eye-clean',certificate:'GIA-graded'}),([s,g,t])=>`A richly colored ${g} cut in an ${s.toLowerCase()} shape and framed in a ${t.toLowerCase()} setting of recycled 14K gold. Ethically sourced.`),
lustre:[...mk('lustre','lus','moissanite-rings',[['Round','Solitaire'],['Oval','Halo'],['Emerald','Pave'],['Pear','Three-Stone']],MET,[1,2],[400,2500],()=>'moissanite',([s,t])=>`${s} Moissanite ${t} Ring`,([s])=>({stone:'Moissanite',cut:s,color:'D-E',clarity:'VVS1',certificate:'GRA'}),([s,t])=>`Maximum fire in a ${s.toLowerCase()} moissanite ${t.toLowerCase()} ring. Harder than any gem but diamond, and brighter than most.`)]};
fs.mkdirSync('public/api',{recursive:true});
for(const b in out){fs.mkdirSync(`public/api/${b}`,{recursive:true});fs.writeFileSync(`public/api/${b}/products.json`,JSON.stringify(out[b]));}
// hero art
for(const b of Object.keys(BG))[0,1,2].forEach(i=>fs.writeFileSync(`public/images/${b}/hero-${i+1}.svg`,hero(b,b==='aurelle'?'diamond':b==='lustre'?'moissanite':['sapphire','emerald','ruby'][i],MET[i],i,['Round','Emerald','Oval'][i],['Halo','Solitaire','Pave'][i])));
const O='https://your-site.vercel.app',u=['/','/aurelle','/aurelle/engagement-rings','/gemma-grove','/gemma-grove/gemstone-rings','/lustre','/lustre/moissanite-rings'];
for(const b in out)out[b].forEach(p=>u.push(`/${b}/${p.category}/${p.slug}`));
fs.writeFileSync('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${u.map(x=>`<url><loc>${O}${x}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync('public/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${O}/sitemap.xml\n`);

```

---
## vercel.json

```json
{"rewrites":[{"source":"/((?!api|images|assets).*)","destination":"/index.html"}]}

```

---
## vite.config.js

```js
import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';export default defineConfig({plugins:[react()]});

```

---
## src/brands/aurelle.js

```js
// Aurelle: lab-grown diamond engagement rings (ivory + champagne gold).
// Copy, SEO strings, filters and categories live here. Colors and fonts live in src/styles/themes.css.
import { TRUST_POINTS } from './shared';

export const aurelle = {
  slug: 'aurelle',
  name: 'Aurelle',
  cat: 'engagement-rings',
  catLabel: 'Engagement Rings',
  filters: ['metal', 'price'],
  hero: [
    'Lab-grown diamonds, grown for the moment you ask',
    'Certified brilliance at a fairer price. Designed in the US, finished by hand.',
  ],
  landingTitle: 'Lab Grown Diamond Rings | Aurelle Fine Jewelry',
  landingDesc:
    'Design your story with IGI-certified lab-grown diamond rings in recycled 14K gold. Free US shipping, 30-day returns and a lifetime warranty.',
  listTitle: 'Lab Grown Diamond Engagement Rings | Aurelle',
  listDesc:
    'Shop IGI-certified lab-grown diamond engagement rings in 14K gold. Free US shipping, 30-day returns and a lifetime warranty.',
  h1: 'Lab-Grown Diamond Engagement Rings',
  intro:
    'Our lab-grown diamond engagement rings pair IGI-certified stones with recycled 14K gold. Choose from oval, round, emerald and pear cuts in solitaire, halo and three-stone settings, each handcrafted in the US and backed by free shipping and a lifetime warranty.',
  cats: [
    ['Oval', 'shape', 'Oval'],
    ['Round', 'shape', 'Round'],
    ['Emerald cut', 'shape', 'Emerald'],
    ['Pear', 'shape', 'Pear'],
  ],
  story: [
    'Grown in a lab. Finished by hand.',
    'Our diamonds are chemically identical to mined stones, grown in weeks instead of billions of years. Every ring is set by a goldsmith in recycled 14K gold.',
  ],
  reviews: [
    [
      'Priya & Daniel',
      'The oval looked better than any ring we saw in store, and the price let us book our honeymoon too.',
    ],
    [
      'Marcus T.',
      'Shipping was fast, the IGI report was inside the box and she said yes.',
    ],
    ['Hannah L.', 'Resizing was free and took four days. Lovely, helpful team.'],
  ],
  trust: TRUST_POINTS,
};

```

---
## src/brands/gemma-grove.js

```js
// Gemma & Grove: colored gemstone jewelry (jewel tones, editorial).
// Copy, SEO strings, filters and categories live here. Colors and fonts live in src/styles/themes.css.
import { TRUST_POINTS } from './shared';

export const gemmaGrove = {
  slug: 'gemma-grove',
  name: 'Gemma & Grove',
  cat: 'gemstone-rings',
  catLabel: 'Gemstone Rings',
  filters: ['gem', 'metal'],
  hero: [
    'Color worth keeping',
    'Sapphire, emerald and ruby set in recycled gold. Jewelry for marking your own milestones.',
  ],
  landingTitle: 'Gemstone Jewelry: Sapphire, Emerald, Ruby | Gemma & Grove',
  landingDesc:
    'Discover sapphire, emerald and ruby gemstone jewelry in recycled 14K gold. Ethically sourced, free US shipping and 30-day returns.',
  listTitle: 'Gemstone Rings: Sapphire, Emerald & Ruby | Gemma & Grove',
  listDesc:
    'Shop gemstone rings with natural sapphire, emerald and ruby in 14K gold. Ethically sourced, free US shipping and 30-day returns.',
  h1: 'Gemstone Rings',
  intro:
    'Explore gemstone rings featuring natural blue sapphire, vivid emerald and deep ruby, each chosen for saturated color and set in recycled 14K gold. Wear one as a statement, give one as a gift, or stack several. Free US shipping and 30-day returns on every order.',
  cats: [
    ['Sapphire', 'gem', 'sapphire', '#2a4fb8'],
    ['Emerald', 'gem', 'emerald', '#0f8a5f'],
    ['Ruby', 'gem', 'ruby', '#c1123a'],
  ],
  story: [
    'Sourced with a story',
    'We buy directly from small family mines and cut partners we know by name, then set each stone in our Los Angeles studio.',
  ],
  reviews: [
    [
      'Camille R.',
      'The sapphire is a deeper blue than photos. I get stopped on the street about it.',
    ],
    ['Jordan P.', "Bought the emerald ring for my mom. She hasn't taken it off."],
    ['Elena V.', 'Packaging felt like opening a present. Perfect gift.'],
  ],
  trust: TRUST_POINTS,
};

```

---
## src/brands/index.js

```js
// One place that lists every brand. Add a new brand: create its file, import it here, add a theme in themes.css.
import { aurelle } from './aurelle';
import { gemmaGrove } from './gemma-grove';
import { lustre } from './lustre';

export const BRANDS = { aurelle, 'gemma-grove': gemmaGrove, lustre };

// Metal options shared by every brand.
export const METALS = ['14K Yellow Gold', '14K White Gold', '14K Rose Gold'];
export const METAL_HEX = {
  '14K Yellow Gold': '#d9b56a',
  '14K White Gold': '#dfe3e8',
  '14K Rose Gold': '#e3a897',
};

```

---
## src/brands/lustre.js

```js
// Lustre: moissanite rings and earrings (dark, high-contrast).
// Copy, SEO strings, filters and categories live here. Colors and fonts live in src/styles/themes.css.
import { TRUST_POINTS } from './shared';

export const lustre = {
  slug: 'lustre',
  name: 'Lustre',
  cat: 'moissanite-rings',
  catLabel: 'Moissanite Rings',
  filters: ['metal', 'price'],
  hero: [
    'More fire. Less price.',
    'Moissanite throws more sparkle than diamond at a fraction of the cost.',
  ],
  landingTitle: 'Moissanite Rings & Earrings | Lustre',
  landingDesc:
    'Shop moissanite rings and earrings with maximum sparkle. Colorless D-E stones in 14K gold with free US shipping and 30-day returns.',
  listTitle: 'Moissanite Rings | Lustre',
  listDesc:
    'Shop colorless moissanite rings in 14K gold with brilliant fire. Free US shipping, 30-day returns and a lifetime warranty on every ring.',
  h1: 'Moissanite Rings',
  intro:
    'Moissanite rings give you more fire and brilliance than diamond for a fraction of the price. Our D-E color stones are set in 14K gold in solitaire, halo and three-stone styles, with free US shipping, 30-day returns and a lifetime warranty on every piece.',
  cats: [
    ['Rings', 'page', 'moissanite-rings'],
    ['Round', 'shape', 'Round'],
    ['Oval', 'shape', 'Oval'],
  ],
  story: [
    'Built to outshine',
    'Moissanite scores 9.25 on the Mohs scale. It is harder than any gem but diamond and made to sparkle for decades.',
  ],
  reviews: [
    [
      'Sam K.',
      "Honestly brighter than my friend's diamond. Nobody can tell, and I saved thousands.",
    ],
    ['Aisha M.', 'Great stone, great price, arrived in three days.'],
    ['Tyler W.', 'Dark site, easy checkout, ring is stunning.'],
  ],
  trust: TRUST_POINTS,
  compare: [
    ['', 'Moissanite', 'Diamond'],
    ['Sparkle (RI)', '2.65', '2.42'],
    ['Hardness (Mohs)', '9.25', '10'],
    ['Average price', '$', '$$$$'],
    ['Ethically made', 'Always', 'Varies'],
  ],
};

```

---
## src/brands/shared.js

```js
// Trust-strip points shown on every landing page.
export const TRUST_POINTS = [
  ['Certified stones', 'Every stone graded and certified'],
  ['Free US shipping', 'Insured, tracked, signature on delivery'],
  ['30-day returns', 'Changed your mind? Send it back free'],
  ['Lifetime warranty', 'Free resizing and cleaning for life'],
];

```

---
## src/api/newsletter.js

```js
// Newsletter sign-up. jsonplaceholder is a free fake API that accepts any POST.
export async function subscribe(email) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('Could not subscribe');
  return response.json();
}

```

---
## src/api/products.js

```js
// The product "API" layer. Components call these functions and never import JSON directly.
// On the live site the data is static JSON served from /public/api/<brand>/products.json.

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

// All products for one brand.
export const getProducts = brand => request(`/api/${brand}/products.json`);

// One product by its URL slug, or null if it does not exist.
export async function getProductBySlug(brand, slug) {
  const products = await getProducts(brand);
  return products.find(product => product.slug === slug) || null;
}

// Up to 4 other products from the same category.
export async function getRelatedProducts(brand, category, excludeId) {
  const products = await getProducts(brand);
  return products
    .filter(product => product.category === category && product.id !== excludeId)
    .slice(0, 4);
}

```

---
## src/hooks/useFetch.js

```js
// Runs an async function and tracks its state: { data, loading, error, retry }.
// Usage: const { data, loading, error, retry } = useFetch(() => getProducts('aurelle'), ['aurelle']);
import { useCallback, useEffect, useState } from 'react';

export default function useFetch(fetcher, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0); // bump this number to run the request again

  useEffect(() => {
    let active = true; // ignore the result if the page changed before the request finished
    setState(prev => ({ ...prev, loading: true, error: null }));
    fetcher().then(
      data => active && setState({ data, loading: false, error: null }),
      error => active && setState({ data: null, loading: false, error }),
    );
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const retry = useCallback(() => setAttempt(n => n + 1), []);
  return { ...state, retry };
}

```

---
## src/utils/format.js

```js
// Formats a number as US dollars, e.g. 1890 -> "$1,890".
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
export const money = amount => formatter.format(amount);

```

---
## src/utils/links.js

```js
// Link for a "shop by" tile. A category is [label, filterName, filterValue].
// Example: ['Oval', 'shape', 'Oval'] -> /aurelle/engagement-rings?shape=Oval
export function catLink(brand, category) {
  const [, key, value] = category;
  return key === 'page'
    ? `/${brand.slug}/${value}`
    : `/${brand.slug}/${brand.cat}?${key}=${value}`;
}

```

---
## src/utils/seo.js

```js
// Builds the BreadcrumbList structured data (JSON-LD) from [label, link] pairs.
import { ORIGIN } from './site';

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, link], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: ORIGIN + (link || location.pathname),
    })),
  };
}

```

---
## src/utils/site.js

```js
// The site's own address (used for canonical links and structured data).
export const ORIGIN = typeof location !== 'undefined' ? location.origin : '';

```

---
## src/context/CartContext.jsx

```jsx
// Cart state shared by the whole app. Read it anywhere with useCart().
import { useState, useRef, createContext, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const t = useRef();
  const add = (item, q) => {
    setItems(it =>
      it.find(x => x.id === item.id)
        ? it.map(x => (x.id === item.id ? { ...x, qty: Math.min(9, x.qty + q) } : x))
        : [...it, { ...item, qty: q }],
    );
    setToast(`Added ${q} × ${item.title}`);
    clearTimeout(t.current);
    t.current = setTimeout(() => setToast(''), 2500);
    setOpen(true);
  };
  const setQty = (id, q) =>
    setItems(it =>
      it.map(x => (x.id === id ? { ...x, qty: Math.max(1, Math.min(9, q)) } : x)),
    );
  const remove = id => setItems(it => it.filter(x => x.id !== id));
  const count = items.reduce((s, x) => s + x.qty, 0),
    total = items.reduce((s, x) => s + x.qty * x.price, 0);
  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        add,
        setQty,
        remove,
        open,
        setOpen,
        clear: () => setItems([]),
      }}
    >
      {children}
      <div className="toast" role="status" aria-live="polite" data-show={!!toast}>
        {toast}
      </div>
    </CartContext.Provider>
  );
}

```

---
## src/components/Breadcrumbs.jsx

```jsx
// Breadcrumb trail. Each item is [label, link]; the last one has no link.
import { Link } from 'react-router-dom';

export const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="crumbs">
    <ol>
      {items.map(([t, to], i) => (
        <li key={t}>
          {to ? <Link to={to}>{t}</Link> : <span aria-current="page">{t}</span>}
        </li>
      ))}
    </ol>
  </nav>
);

```

---
## src/components/CartDrawer.jsx

```jsx
// Slide-in cart panel: list of items, quantity buttons, remove, subtotal.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { money } from '../utils/format';

export function CartDrawer() {
  const { items, count, total, setQty, remove, open, setOpen, clear } = useCart();
  const [done, setDone] = useState(false);
  useEffect(() => {
    const k = e => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [setOpen]);
  return (
    <>
      <div className="scrim cs" data-open={open} onClick={() => setOpen(false)} />
      <aside
        className={'cart-d' + (open ? ' open' : '')}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        <div className="dh">
          <h2>Your cart ({count})</h2>
          <button className="icon" aria-label="Close cart" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        {!items.length ? (
          <div className="state">
            <h3>Your cart is empty</h3>
            <p>Find something that sparkles.</p>
            <button className="btn" onClick={() => setOpen(false)}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="ci">
              {items.map(x => (
                <li key={x.id}>
                  <Link to={x.url} onClick={() => setOpen(false)}>
                    <img src={x.img} alt={x.alt} width="80" height="100" />
                  </Link>
                  <div>
                    <Link to={x.url} onClick={() => setOpen(false)}>
                      <strong>{x.title}</strong>
                    </Link>
                    <small>
                      {x.metal} · {x.carat} ct
                    </small>
                    <div className="qty sm">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQty(x.id, x.qty - 1)}
                      >
                        −
                      </button>
                      <output>{x.qty}</output>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQty(x.id, x.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="r">
                    <b>{money(x.price * x.qty)}</b>
                    <button className="lnk" onClick={() => remove(x.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cf">
              <p className="tot">
                <span>Subtotal</span>
                <b>{money(total)}</b>
              </p>
              <p className="muted">Free insured US shipping. 30-day returns.</p>
              <button className="btn" onClick={() => setDone(true)}>
                Checkout
              </button>
              {done && (
                <p role="status" className="msg ok">
                  Checkout is outside this demo. Your {count} item
                  {count > 1 ? 's are' : ' is'} saved here.
                </p>
              )}
              <button
                className="btn ghost"
                onClick={() => {
                  clear();
                  setDone(false);
                }}
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

```

---
## src/components/Filters.jsx

```jsx
// Filter chips (metal, price, gemstone) shown in the sidebar on desktop and the drawer on mobile.
import { METALS } from '../brands';
import { money } from '../utils/format';

export const PRICE_RANGES = {
  aurelle: [
    [0, 2000],
    [2000, 4000],
    [4000, 1e9],
  ],
  lustre: [
    [0, 800],
    [800, 1600],
    [1600, 1e9],
  ],
};

export const priceLabel = ([a, z]) =>
  z >= 1e9 ? `${money(a)}+` : a ? `${money(a)}–${money(z)}` : `Under ${money(z)}`;

export function Filters({ brand, p, set, all }) {
  const metals = METALS,
    gems = [...new Set(all.map(x => x.gemstone))];
  const t = (k, v) => set(k, p.get(k) === v ? '' : v);
  const Grp = ({ k, t: title, items }) => (
    <fieldset>
      <legend>{title}</legend>
      {items.map(([v, l]) => (
        <button
          key={v}
          type="button"
          className="chip"
          aria-pressed={p.get(k) === v}
          onClick={() => t(k, v)}
        >
          {l}
        </button>
      ))}
    </fieldset>
  );
  return (
    <div>
      {brand.filters.includes('metal') && (
        <Grp k="metal" t="Metal" items={metals.map(m => [m, m])} />
      )}
      {brand.filters.includes('price') && (
        <Grp
          k="price"
          t="Price"
          items={PRICE_RANGES[brand.slug].map((r, i) => [String(i), priceLabel(r)])}
        />
      )}
      {brand.filters.includes('gem') && (
        <Grp
          k="gem"
          t="Gemstone"
          items={gems.map(g => [g, g[0].toUpperCase() + g.slice(1)])}
        />
      )}
    </div>
  );
}

```

---
## src/components/Footer.jsx

```jsx
// Site footer: shop links, brand links, social and legal links.
import { Link } from 'react-router-dom';

export function Footer({ brand }) {
  const base = '/' + brand.slug;
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <div>
          <Link to={base} className="logo">
            {brand.name}
          </Link>
          <p>Fine jewelry, designed in the USA.</p>
        </div>
        <nav aria-label="Shop">
          <h3>Shop</h3>
          <Link to={`${base}/${brand.cat}`}>{brand.catLabel}</Link>
          {brand.cats.map(c => (
            <Link
              key={c[0]}
              to={
                c[1] === 'page'
                  ? `${base}/${c[2]}`
                  : `${base}/${brand.cat}?${c[1]}=${c[2]}`
              }
            >
              {c[0]}
            </Link>
          ))}
        </nav>
        <nav aria-label="Brands">
          <h3>Our brands</h3>
          <Link to="/aurelle">Aurelle</Link>
          <Link to="/gemma-grove">Gemma & Grove</Link>
          <Link to="/lustre">Lustre</Link>
        </nav>
        <nav aria-label="Legal">
          <h3>Follow & legal</h3>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">
            Pinterest
          </a>
          <a
            href="https://www.ftc.gov/business-guidance/privacy-security"
            target="_blank"
            rel="noreferrer"
          >
            Privacy
          </a>
          <a href="https://www.ftc.gov" target="_blank" rel="noreferrer">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}

```

---
## src/components/Header.jsx

```jsx
// Site header: logo, nav, mobile hamburger menu and cart button with item count.
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Header({ brand }) {
  const [open, setOpen] = useState(false);
  const { count, setOpen: openCart } = useCart();
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname, loc.search]);
  const base = '/' + brand.slug;
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <button
          className="icon burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to={base} className="logo">
          {brand.name}
        </Link>
        <nav className={'nav' + (open ? ' open' : '')} aria-label="Main">
          <NavLink to={`${base}/${brand.cat}`} end>
            {brand.catLabel}
          </NavLink>
          {brand.cats.slice(0, 2).map(c => (
            <Link
              key={c[0]}
              to={
                c[1] === 'page'
                  ? `${base}/${c[2]}`
                  : `${base}/${brand.cat}?${c[1]}=${c[2]}`
              }
            >
              {c[0]}
            </Link>
          ))}
          <Link to="/">All brands</Link>
        </nav>
        <button
          className="icon cart"
          aria-label={`Open cart, ${count} items`}
          onClick={() => openCart(true)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M6 7h12l-1 13H7L6 7zM9 7a3 3 0 016 0" />
          </svg>
          <b key={count}>{count}</b>
        </button>
      </div>
    </header>
  );
}

```

---
## src/components/Newsletter.jsx

```jsx
// Newsletter form: validates email, POSTs it, shows success/error, disables button while sending.
import { useState } from 'react';
import { subscribe } from '../api/newsletter';

export function Newsletter({ brand }) {
  const [email, setEmail] = useState('');
  const [st, setSt] = useState({ s: 'idle' });
  const go = async e => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setSt({
        s: 'err',
        m: 'Enter a valid email address, like name@example.com.',
      });
    setSt({ s: 'busy' });
    try {
      await subscribe(email);
      setSt({ s: 'ok', m: `You're in. Welcome to ${brand.name}.` });
      setEmail('');
    } catch {
      setSt({ s: 'err', m: 'Sign-up failed. Please try again.' });
    }
  };
  return (
    <section className="sec news">
      <div className="wrap narrow center">
        <h2>Join the {brand.name} list</h2>
        <p>Early access to new designs and 10% off your first order.</p>
        <form onSubmit={go} noValidate className="row">
          <label htmlFor="em" className="sr">
            Email address
          </label>
          <input
            id="em"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={st.s === 'err'}
          />
          <button className="btn" disabled={st.s === 'busy'}>
            {st.s === 'busy' ? 'Sending…' : 'Subscribe'}
          </button>
        </form>
        <p role="status" className={'msg ' + st.s}>
          {st.m}
        </p>
      </div>
    </section>
  );
}

```

---
## src/components/ProductCard.jsx

```jsx
// One product tile: image swap on hover, badge, name, price and metal swatches.
import { Link } from 'react-router-dom';
import { METAL_HEX } from '../brands';
import { money } from '../utils/format';

export function ProductCard({ p }) {
  const metals = [...new Set(p.variants.map(v => v.metal))];
  return (
    <article className="card">
      <Link to={`/${p.brand}/${p.category}/${p.slug}`}>
        <div className="ph">
          {p.tags[0] && <span className="badge">{p.tags[0]}</span>}
          <img
            src={p.images[0].src}
            alt={p.images[0].alt}
            width="800"
            height="1000"
            loading="lazy"
          />
          <img
            className="alt"
            src={p.images[1]?.src || p.images[0].src}
            alt=""
            width="800"
            height="1000"
            loading="lazy"
          />
        </div>
        <h3>{p.title}</h3>
      </Link>
      <div className="meta">
        <span className="price">
          {p.compareAtPrice && <s>{money(p.compareAtPrice)}</s>} {money(p.price)}
        </span>
        <span className="sw" aria-label={metals.join(', ')}>
          {metals.map(m => (
            <i key={m} title={m} style={{ background: METAL_HEX[m] }} />
          ))}
        </span>
      </div>
    </article>
  );
}

```

---
## src/components/ProductGallery.jsx

```jsx
// Product image gallery: big swipeable image plus thumbnails and arrows.
import { useState, useRef } from 'react';

export function ProductGallery({ images }) {
  const ref = useRef();
  const [i, setI] = useState(0);
  const go = n => {
    const el = ref.current;
    el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' });
  };
  return (
    <div className="gallery">
      <div className="slider">
        <div
          className="track"
          ref={ref}
          onScroll={e => setI(Math.round(e.target.scrollLeft / e.target.clientWidth))}
        >
          {images.map((im, k) => (
            <div className="slide" key={im.src}>
              <img
                src={im.src}
                alt={im.alt}
                width="800"
                height="1000"
                fetchPriority={k ? undefined : 'high'}
              />
            </div>
          ))}
        </div>
        <button
          className="arrow l"
          aria-label="Previous image"
          onClick={() => go(Math.max(0, i - 1))}
        >
          ‹
        </button>
        <button
          className="arrow r"
          aria-label="Next image"
          onClick={() => go(Math.min(images.length - 1, i + 1))}
        >
          ›
        </button>
      </div>
      <div className="thumbs">
        {images.map((im, k) => (
          <button
            key={im.src}
            aria-label={`Show image ${k + 1}`}
            aria-current={k === i}
            onClick={() => go(k)}
          >
            <img src={im.src} alt="" width="80" height="100" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

```

---
## src/components/ScrollToTop.jsx

```jsx
// Scrolls to the top of the page whenever the route changes.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

```

---
## src/components/Seo.jsx

```jsx
// Sets the page title, meta description, canonical, Open Graph, Twitter tags and JSON-LD. React 19 moves these into <head> automatically.
import { ORIGIN } from '../utils/site';

export function Seo({ title, desc, path, image, ld }) {
  const img = ORIGIN + (image || '/images/aurelle/hero-1.svg');
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={ORIGIN + path} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      {ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      )}
    </>
  );
}

```

---
## src/components/Skeleton.jsx

```jsx
// Grey shimmering placeholders shown while data loads.

export const Skeleton = ({ h = 240, w = '100%', r = 8 }) => (
  <div
    className="skel"
    style={{ height: h, width: w, borderRadius: r }}
    aria-hidden="true"
  />
);

export const GridSkeleton = ({ n = 8 }) => (
  <div className="grid">
    {Array.from({ length: n }, (_, i) => (
      <div key={i}>
        <Skeleton h={300} />
        <Skeleton h={16} w="70%" />
        <Skeleton h={16} w="30%" />
      </div>
    ))}
  </div>
);

```

---
## src/components/Slider.jsx

```jsx
// Swipeable, auto-sliding carousel built on CSS scroll-snap (used by the hero).
import { useState, useEffect, useRef } from 'react';

export function Slider({ slides, auto, label }) {
  const ref = useRef();
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const go = n => {
    const el = ref.current;
    const k = (n + slides.length) % slides.length;
    el.scrollTo({ left: k * el.clientWidth, behavior: 'smooth' });
  };
  useEffect(() => {
    if (!auto || pause || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => go(i + 1), 5000);
    return () => clearInterval(t);
  });
  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <div
        className="track"
        ref={ref}
        onScroll={e => setI(Math.round(e.target.scrollLeft / e.target.clientWidth))}
      >
        {slides.map((s, k) => (
          <div className="slide" key={k} aria-hidden={k !== i}>
            {s}
          </div>
        ))}
      </div>
      <button className="arrow l" aria-label="Previous slide" onClick={() => go(i - 1)}>
        ‹
      </button>
      <button className="arrow r" aria-label="Next slide" onClick={() => go(i + 1)}>
        ›
      </button>
      <div className="dots">
        {slides.map((_, k) => (
          <button
            key={k}
            aria-label={`Go to slide ${k + 1}`}
            aria-current={k === i}
            onClick={() => go(k)}
          />
        ))}
      </div>
    </div>
  );
}

```

---
## src/components/States.jsx

```jsx
// Error box (with Retry button) and empty state used by every data view.

export const ErrorBox = ({ error, retry }) => (
  <div className="state" role="alert">
    <h2>We couldn't load this</h2>
    <p>
      {error?.message || 'Something went wrong.'} Check your connection and try again.
    </p>
    <button className="btn" onClick={retry}>
      Retry
    </button>
  </div>
);

export const Empty = ({ title, text, action, onAction }) => (
  <div className="state">
    <h2>{title}</h2>
    <p>{text}</p>
    {action && (
      <button className="btn" onClick={onAction}>
        {action}
      </button>
    )}
  </div>
);

```

---
## src/pages/Home.jsx

```jsx
// Simple home page linking to the three brands.
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function Home() {
  const l = [
    ['aurelle', 'Aurelle', 'Lab-grown diamond engagement rings'],
    ['gemma-grove', 'Gemma & Grove', 'Sapphire, emerald and ruby jewelry'],
    ['lustre', 'Lustre', 'Moissanite rings and earrings'],
  ];
  return (
    <div className="app home" data-brand="home">
      <Seo
        title="Fine Jewelry Brands | Aurelle, Gemma & Grove, Lustre"
        desc="Explore three US fine jewelry brands: Aurelle diamonds, Gemma & Grove gemstones and Lustre moissanite."
        path="/"
      />
      <main id="main" className="wrap">
        <h1>Three houses of fine jewelry</h1>
        <p className="lead">Pick the one that fits your moment.</p>
        <div className="homes">
          {l.map(([s, n, t]) => (
            <Link key={s} to={'/' + s} data-brand={s} className="hb">
              <img
                src={`/images/${s}/hero-1.svg`}
                alt={`${n} featured ring`}
                width="1600"
                height="900"
              />
              <span className="logo">{n}</span>
              <span>{t}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

```

---
## src/pages/Landing.jsx

```jsx
// Brand landing page: hero, categories, bestsellers, story, lookbook, trust strip, reviews, newsletter.
import { Link, useOutletContext } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getProducts } from '../api/products';
import { Newsletter } from '../components/Newsletter';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { GridSkeleton } from '../components/Skeleton';
import { Slider } from '../components/Slider';
import { Empty, ErrorBox } from '../components/States';
import { catLink } from '../utils/links';
import { ORIGIN } from '../utils/site';

export function Landing() {
  const brand = useOutletContext();
  const { data, loading, error, retry } = useFetch(
    () => getProducts(brand.slug),
    [brand.slug],
  );
  const reps = data && data.length < 8 ? 4 : 2;
  const best = data
    ? data
        .filter(p => p.tags.includes('bestseller'))
        .concat(data)
        .filter((p, i, a) => a.indexOf(p) === i)
        .slice(0, 8)
    : [];
  const slides = [0, 1, 2].map(i => (
    <div className="hero" key={i}>
      <img
        src={`/images/${brand.slug}/hero-${i + 1}.svg`}
        alt={`${brand.name} featured ring ${i + 1}`}
        width="1600"
        height="900"
        fetchPriority={i ? undefined : 'high'}
      />
      <div className="hero-t wrap">
        {i === 0 ? (
          <h1>{brand.hero[0]}</h1>
        ) : (
          <p className="h1like">
            {
              [
                'Made to be worn every day',
                'Free resizing for life',
                'Insured delivery across the US',
              ][i]
            }
          </p>
        )}
        <p>{brand.hero[1]}</p>
        <Link className="btn" to={`/${brand.slug}/${brand.cat}`}>
          Shop {brand.catLabel.toLowerCase()}
        </Link>
      </div>
    </div>
  ));
  return (
    <>
      <Seo
        title={brand.landingTitle}
        desc={brand.landingDesc}
        path={'/' + brand.slug}
        image={`/images/${brand.slug}/hero-1.svg`}
        ld={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: brand.name,
          url: ORIGIN + '/' + brand.slug,
          logo: ORIGIN + `/images/${brand.slug}/hero-1.svg`,
        }}
      />
      {/* Hero: auto-sliding images */}
      <Slider slides={slides} auto label={`${brand.name} featured`} />
      {/* Category tiles with images */}
      <section className="sec wrap">
        <h2>Shop by {brand.slug === 'gemma-grove' ? 'gemstone' : 'shape'}</h2>
        <div className="cats">
          {brand.cats.map(c => {
            const m =
              data &&
              (data.find(x => x.specs.cut === c[2] || x.gemstone === c[2]) || data[0]);
            return (
              <Link key={c[0]} to={catLink(brand, c)} className="cat">
                {m && (
                  <img
                    src={m.images[0].src}
                    alt={m.images[0].alt}
                    loading="lazy"
                    width="800"
                    height="1000"
                  />
                )}
                <span>
                  {c[3] && <i style={{ background: c[3] }} />}
                  {c[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      {/* Bestsellers (API data) */}
      <section className="sec wrap">
        <h2>Bestsellers</h2>
        {loading ? (
          <GridSkeleton n={4} />
        ) : error ? (
          <ErrorBox error={error} retry={retry} />
        ) : !best.length ? (
          <Empty title="No products yet" text="Check back soon for new designs." />
        ) : (
          <div className="rail">
            {best.map(p => (
              <div key={p.id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Brand story */}
      <section className="sec story">
        <div className="wrap two">
          <img
            src={`/images/${brand.slug}/hero-2.svg`}
            alt={`Craftsmanship at ${brand.name}`}
            loading="lazy"
            width="1600"
            height="900"
          />
          <div>
            <h2>{brand.story[0]}</h2>
            <p>{brand.story[1]}</p>
            <Link className="btn ghost" to={`/${brand.slug}/${brand.cat}`}>
              Explore the collection
            </Link>
          </div>
        </div>
      </section>
      {data && (
        <section className="sec look">
          <div className="wrap">
            <h2>The lookbook</h2>
          </div>
          <div className="marq">
            <div className="marq-in" style={{ '--n': reps }}>
              {Array.from({ length: reps }).flatMap((_, r) =>
                data.map((x, i) => (
                  <img
                    key={`${r}-${x.id}`}
                    src={x.images[(i + r) % 2].src}
                    alt={r ? '' : x.images[(i + r) % 2].alt}
                    aria-hidden={r ? true : undefined}
                    loading="lazy"
                    width="800"
                    height="1000"
                  />
                )),
              )}
            </div>
          </div>
        </section>
      )}
      {brand.compare && (
        <section className="sec wrap">
          <h2>Moissanite vs. diamond</h2>
          <div className="scroll">
            <table className="cmp">
              <tbody>
                {brand.compare.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) =>
                      i ? (
                        j ? (
                          <td key={j}>{c}</td>
                        ) : (
                          <th key={j} scope="row">
                            {c}
                          </th>
                        )
                      ) : (
                        <th key={j} scope="col">
                          {c}
                        </th>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {/* Trust strip */}
      <section className="sec trust">
        <ul className="wrap trust-in">
          {brand.trust.map(t => (
            <li key={t[0]}>
              <strong>{t[0]}</strong>
              <span>{t[1]}</span>
            </li>
          ))}
        </ul>
      </section>
      {/* Customer reviews */}
      <section className="sec wrap">
        <h2>Loved by customers</h2>
        <div className="revs">
          {brand.reviews.map(r => (
            <figure key={r[0]}>
              <div aria-label="5 out of 5 stars" className="stars">
                ★★★★★
              </div>
              <blockquote>{r[1]}</blockquote>
              <figcaption>{r[0]}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Newsletter brand={brand} />
    </>
  );
}

```

---
## src/pages/NotFound.jsx

```jsx
// Real 404 page.
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function NotFound({ text = 'This page has moved or never existed.' }) {
  return (
    <div className="app center nf" data-brand="home">
      <Seo
        title="Page not found | Jewelry Storefronts"
        desc="The page you are looking for could not be found. Browse our three fine jewelry brands instead."
        path="/404"
      />
      <meta name="robots" content="noindex" />
      <h1>Page not found</h1>
      <p>{text}</p>
      <Link className="btn" to="/">
        Back to all brands
      </Link>
    </div>
  );
}

```

---
## src/pages/ProductDetail.jsx

```jsx
// Product page: gallery, variant picker, price, add to cart, specs, accordion, related products.
import { useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getProductBySlug, getRelatedProducts } from '../api/products';
import { METAL_HEX } from '../brands';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { ProductGallery } from '../components/ProductGallery';
import { Seo } from '../components/Seo';
import { GridSkeleton, Skeleton } from '../components/Skeleton';
import { Empty, ErrorBox } from '../components/States';
import { useCart } from '../context/CartContext';
import { money } from '../utils/format';
import { breadcrumbJsonLd } from '../utils/seo';
import { ORIGIN } from '../utils/site';

export function ProductDetail() {
  const brand = useOutletContext();
  const { category, slug } = useParams();
  const { add } = useCart();
  const {
    data: p,
    loading,
    error,
    retry,
  } = useFetch(() => getProductBySlug(brand.slug, slug), [brand.slug, slug]);
  const rel = useFetch(
    () => getRelatedProducts(brand.slug, category, p?.id),
    [brand.slug, category, p?.id],
  );
  const [sel, setSel] = useState({});
  const [qty, setQty] = useState(1);
  if (loading)
    return (
      <div className="wrap sec-s two">
        <Skeleton h={560} />
        <div>
          <Skeleton h={32} />
          <Skeleton h={24} w="40%" />
          <Skeleton h={160} />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="wrap">
        <ErrorBox error={error} retry={retry} />
      </div>
    );
  if (!p || category !== brand.cat)
    return (
      <div className="wrap center nf">
        <Seo
          title={`Product not found | ${brand.name}`}
          desc="We couldn't find that product."
          path={location.pathname}
        />
        <meta name="robots" content="noindex" />
        <h1>Product not found</h1>
        <p>It may have sold out or the link may be wrong.</p>
        <Link className="btn" to={`/${brand.slug}/${brand.cat}`}>
          Browse {brand.catLabel.toLowerCase()}
        </Link>
      </div>
    );
  const V = p.variants,
    first = V.find(v => v.inStock) || V[0],
    metal = sel.metal || first.metal,
    carat = sel.carat ?? first.carat;
  const cur = V.find(v => v.metal === metal && v.carat === carat) || first;
  const metals = [...new Set(V.map(v => v.metal))],
    carats = [...new Set(V.map(v => v.carat))];
  const ok = (m, c) => V.some(v => v.metal === m && v.carat === c && v.inStock);
  const crumbs = [
    ['Home', '/'],
    [brand.name, '/' + brand.slug],
    [brand.catLabel, `/${brand.slug}/${brand.cat}`],
    [p.title],
  ];
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.title,
      image: p.images.map(i => ORIGIN + i.src),
      description: p.description,
      sku: p.id,
      brand: { '@type': 'Brand', name: brand.name },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: p.rating,
        reviewCount: p.reviewCount,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: cur.price,
        availability: cur.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        url: ORIGIN + location.pathname,
      },
    },
    breadcrumbJsonLd(crumbs),
  ];
  const addCart = () =>
    add(
      {
        id: cur.id,
        title: p.title,
        img: p.images[0].src,
        alt: p.images[0].alt,
        metal,
        carat,
        price: cur.price,
        url: `/${brand.slug}/${brand.cat}/${p.slug}`,
      },
      qty,
    );
  return (
    <>
      <Seo
        title={`${p.title} | ${brand.name}`}
        desc={`${p.description.slice(0, 110)} Free US shipping.`}
        path={`/${brand.slug}/${brand.cat}/${p.slug}`}
        image={p.images[0].src}
        ld={ld}
      />
      <div className="wrap sec-s">
        <Breadcrumbs items={crumbs} />
        <div className="two pd">
          <ProductGallery images={p.images} />
          <div className="buy">
            <h1>{p.title}</h1>
            <p className="rate">
              <span className="stars" aria-hidden="true">
                ★★★★★
              </span>{' '}
              {p.rating} ({p.reviewCount} reviews)
            </p>
            <p className="pr">
              {p.compareAtPrice && cur.price === p.price && (
                <s>{money(p.compareAtPrice)}</s>
              )}{' '}
              <strong>{money(cur.price)}</strong>
            </p>
            <fieldset>
              <legend>Metal: {metal}</legend>
              <div className="opts">
                {metals.map(m => (
                  <button
                    key={m}
                    className="swatch"
                    aria-label={m}
                    aria-pressed={m === metal}
                    disabled={!ok(m, carat)}
                    title={m}
                    onClick={() => setSel({ metal: m, carat })}
                    style={{ '--c': METAL_HEX[m] }}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Carat weight: {carat} ct</legend>
              <div className="opts">
                {carats.map(c => (
                  <button
                    key={c}
                    className="chip"
                    aria-pressed={c === carat}
                    disabled={!ok(metal, c)}
                    onClick={() => setSel({ metal, carat: c })}
                  >
                    {c} ct
                  </button>
                ))}
              </div>
            </fieldset>
            <p className={'stock ' + (cur.inStock ? 'in' : 'out')}>
              {cur.inStock ? 'In stock. Ships in 3 to 5 days.' : 'Out of stock'}
            </p>
            <div className="qrow">
              <div className="qty">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  −
                </button>
                <output aria-live="polite">{qty}</output>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQty(Math.min(9, qty + 1))}
                >
                  +
                </button>
              </div>
              <button className="btn grow" disabled={!cur.inStock} onClick={addCart}>
                Add to cart
              </button>
            </div>
            <dl className="specs">
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <details open>
              <summary>Description</summary>
              <p>{p.description}</p>
            </details>
            <details>
              <summary>Materials and care</summary>
              <p>
                Recycled 14K gold. Clean with warm water and mild soap; store separately.
              </p>
            </details>
            <details>
              <summary>Shipping and returns</summary>
              <p>Free insured US shipping. Return within 30 days for a full refund.</p>
            </details>
          </div>
        </div>
        <section className="sec-s">
          <h2>You may also like</h2>
          {rel.loading ? (
            <GridSkeleton n={4} />
          ) : rel.error ? (
            <ErrorBox error={rel.error} retry={rel.retry} />
          ) : !rel.data?.length ? (
            <Empty
              title="No related products"
              text="Browse the full collection instead."
            />
          ) : (
            <div className="grid">
              {rel.data.map(x => (
                <ProductCard key={x.id} p={x} />
              ))}
            </div>
          )}
        </section>
      </div>
      <div className="sticky">
        <span>{money(cur.price)}</span>
        <button className="btn" disabled={!cur.inStock} onClick={addCart}>
          Add to cart
        </button>
      </div>
    </>
  );
}

```

---
## src/pages/ProductList.jsx

```jsx
// Listing page: breadcrumbs, intro, filters, sort, product grid, load more. Filters live in the URL.
import { useState, useMemo } from 'react';
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getProducts } from '../api/products';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Filters, PRICE_RANGES } from '../components/Filters';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { GridSkeleton } from '../components/Skeleton';
import { Empty, ErrorBox } from '../components/States';
import { NotFound } from './NotFound';
import { breadcrumbJsonLd } from '../utils/seo';

export function ProductList() {
  const brand = useOutletContext();
  const { category } = useParams();
  const [p, setP] = useSearchParams();
  const [drawer, setDrawer] = useState(false);
  const [shown, setShown] = useState(12);
  const { data, loading, error, retry } = useFetch(
    () => getProducts(brand.slug),
    [brand.slug],
  );
  const set = (k, v) => {
    const n = new URLSearchParams(p);
    v ? n.set(k, v) : n.delete(k);
    setP(n, { replace: true });
    setShown(12);
  };
  const list = useMemo(() => {
    if (!data) return [];
    let r = data.filter(x => x.category === category);
    if (p.get('metal'))
      r = r.filter(x => x.variants.some(v => v.metal === p.get('metal')));
    if (p.get('gem')) r = r.filter(x => x.gemstone === p.get('gem'));
    if (p.get('shape')) r = r.filter(x => x.specs.cut === p.get('shape'));
    if (p.get('price') && PRICE_RANGES[brand.slug]) {
      const [a, z] = PRICE_RANGES[brand.slug][+p.get('price')];
      r = r.filter(x => x.price >= a && x.price < z);
    }
    const s = p.get('sort');
    if (s === 'low') r = [...r].sort((a, c) => a.price - c.price);
    if (s === 'high') r = [...r].sort((a, c) => c.price - a.price);
    if (s === 'new') r = [...r].sort((a, c) => c.created.localeCompare(a.created));
    return r;
  }, [data, p, category, brand.slug]);
  if (category !== brand.cat) return <NotFound />;
  const crumbs = [['Home', '/'], [brand.name, '/' + brand.slug], [brand.catLabel]];
  const active = [...p.keys()].some(k => k !== 'sort');
  return (
    <>
      <Seo
        title={brand.listTitle}
        desc={brand.listDesc}
        path={`/${brand.slug}/${brand.cat}`}
        image={`/images/${brand.slug}/hero-1.svg`}
        ld={breadcrumbJsonLd(crumbs)}
      />
      <div className="wrap sec-s">
        <Breadcrumbs items={crumbs} />
        <h1>{brand.h1}</h1>
        <p className="intro">{brand.intro}</p>
        <div className="bar">
          <button className="btn ghost filt-btn" onClick={() => setDrawer(true)}>
            Filters
          </button>
          <span aria-live="polite">
            {loading ? 'Loading…' : `${list.length} products`}
          </span>
          <label>
            Sort{' '}
            <select
              value={p.get('sort') || ''}
              onChange={e => set('sort', e.target.value)}
            >
              <option value="">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="new">Newest</option>
            </select>
          </label>
        </div>
        <div className="lay">
          <aside className={'drawer' + (drawer ? ' open' : '')} aria-label="Filters">
            <div className="dh">
              <h2>Filters</h2>
              <button
                className="icon"
                aria-label="Close filters"
                onClick={() => setDrawer(false)}
              >
                ✕
              </button>
            </div>
            {data && <Filters brand={brand} p={p} set={set} all={data} />}
            <button
              className="btn ghost"
              disabled={!active}
              onClick={() => {
                setP(p.get('sort') ? { sort: p.get('sort') } : {});
                setShown(12);
              }}
            >
              Clear filters
            </button>
            <button className="btn done" onClick={() => setDrawer(false)}>
              Show {list.length} results
            </button>
          </aside>
          {drawer && <div className="scrim" onClick={() => setDrawer(false)} />}
          <div>
            {loading ? (
              <GridSkeleton />
            ) : error ? (
              <ErrorBox error={error} retry={retry} />
            ) : !list.length ? (
              <Empty
                title="No rings match those filters"
                text="Try removing a filter to see more designs."
                action="Clear filters"
                onAction={() => setP({})}
              />
            ) : (
              <>
                <div className="grid">
                  {list.slice(0, shown).map(x => (
                    <ProductCard key={x.id} p={x} />
                  ))}
                </div>
                {list.length > shown && (
                  <div className="center">
                    <button className="btn ghost" onClick={() => setShown(shown + 12)}>
                      Load more
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

```

---
## src/styles/base.css

```css
/* Reset, typography, links, buttons and shared layout helpers. */
* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
}
img {
  max-width: 100%;
  height: auto;
  display: block;
}
.app {
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font: 400 1rem/1.65 var(--bf);
}
h1,
h2,
h3 {
  font-family: var(--hf);
  font-weight: 500;
  line-height: 1.15;
  margin: 0 0 var(--s3);
  letter-spacing: -0.01em;
}
h1 {
  font-size: clamp(2rem, 5vw+0.5rem, 3.75rem);
}
h2 {
  font-size: clamp(1.5rem, 2.5vw+0.5rem, 2.5rem);
}
h3 {
  font-size: 1.05rem;
}
a {
  color: inherit;
  text-decoration: none;
}
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.wrap {
  width: min(100% - 2 * var(--s3), 1280px);
  margin-inline: auto;
}
.narrow {
  max-width: 560px;
}
.center {
  text-align: center;
}
.sr {
  position: absolute;
  left: -9999px;
}
.skip {
  position: absolute;
  left: -999px;
}
.skip:focus {
  left: var(--s3);
  top: var(--s3);
  z-index: 99;
  background: var(--ink);
  color: var(--bg);
  padding: var(--s2);
}
.sec {
  padding-block: var(--s6);
}
.sec-s {
  padding-block: var(--s4) var(--s6);
}
.lead,
.intro {
  color: var(--muted);
  max-width: 68ch;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 var(--s4);
  background: var(--accent);
  color: var(--on);
  border: 1px solid var(--accent);
  border-radius: var(--r);
  font: 500 0.95rem var(--bf);
  cursor: pointer;
  transition:
    transform var(--t),
    opacity var(--t),
    background var(--t);
}
[data-brand='aurelle'] .btn {
  color: #fff;
}
.btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}
.btn:active {
  transform: none;
}
.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}
.btn.ghost {
  background: transparent;
  color: var(--ink);
  border-color: var(--ink);
}
.grow {
  flex: 1;
}

```

---
## src/styles/cart.css

```css
/* Cart drawer. */
.cart-d {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(100vw, 420px);
  background: var(--bg);
  color: var(--ink);
  z-index: 50;
  transform: translateX(100%);
  visibility: hidden;
  transition:
    transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1),
    visibility 0.35s;
  display: flex;
  flex-direction: column;
  padding: var(--s4);
  gap: var(--s3);
  box-shadow: -20px 0 60px #0006;
  overflow: auto;
}
.cart-d.open {
  transform: none;
  visibility: visible;
}
.cart-d .dh h2 {
  margin: 0;
  font-size: 1.5rem;
}
.cs {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 45;
}
.cs[data-open='true'] {
  opacity: 1;
  pointer-events: auto;
}
.ci {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--s3);
}
.ci li {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: var(--s3);
  padding-bottom: var(--s3);
  border-bottom: 1px solid var(--line);
  animation: rise 0.4s both;
}
.ci img {
  border-radius: var(--r);
  aspect-ratio: 4/5;
  object-fit: cover;
  width: 80px;
}
.ci small {
  display: block;
  color: var(--muted);
}
.ci .r {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  color: var(--g2);
}
.qty.sm {
  width: max-content;
  margin-top: var(--s2);
}
.qty.sm button {
  width: 44px;
  height: 44px;
}
.lnk {
  background: none;
  border: 0;
  color: var(--muted);
  text-decoration: underline;
  cursor: pointer;
  min-height: 44px;
  font: inherit;
}
.lnk:hover {
  color: var(--g2);
}
.cf {
  display: grid;
  gap: var(--s2);
  margin-top: auto;
}
.tot {
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  margin: 0;
}
.tot b {
  color: var(--g2);
}
.muted {
  color: var(--muted);
  margin: 0;
  font-size: 0.9rem;
}

```

---
## src/styles/effects.css

```css
/* Colored gradient text and animations (hero entrance, shine, scroll reveal). */
.app h1,
.app h2 {
  background: linear-gradient(100deg, var(--g1), var(--g2), var(--g1));
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: flow 9s linear infinite;
}
.hb h1,
.hb .logo,
.home .hb * {
  -webkit-text-fill-color: #fff;
}
.logo {
  background: linear-gradient(100deg, var(--g1), var(--g2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.home .hb .logo {
  background: none;
  color: #fff;
}
.price b,
.pr strong,
.price {
  color: var(--g2);
}
[data-brand='aurelle'] .price,
[data-brand='aurelle'] .pr strong {
  color: #9a5b0a;
}
.cat {
  font-weight: 600;
}
.cat:hover {
  background: linear-gradient(
    120deg,
    var(--card),
    color-mix(in srgb, var(--g2) 22%, var(--card))
  );
  box-shadow: 0 12px 30px -12px var(--g2);
}
.trust-in strong {
  color: var(--g2);
  font-size: 1.1rem;
}
[data-brand='aurelle'] .trust-in strong {
  color: #9a5b0a;
}
.stars {
  background: linear-gradient(90deg, var(--g1), var(--g2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero > img {
  animation: drift 16s ease-in-out infinite alternate;
}
.hero-t > * {
  animation: rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.hero-t > *:nth-child(2) {
  animation-delay: 0.15s;
}
.hero-t > *:nth-child(3) {
  animation-delay: 0.3s;
}
.btn {
  background-image: linear-gradient(
    110deg,
    var(--accent),
    color-mix(in srgb, var(--g2) 70%, var(--accent))
  );
  position: relative;
  overflow: hidden;
}
.btn:not(.ghost):not(:disabled):after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40%;
  left: -60%;
  background: linear-gradient(100deg, transparent, #fff7, transparent);
  transform: skewX(-20deg);
  transition: left 0.6s;
}
.btn:not(.ghost):hover:after {
  left: 130%;
}
.btn.ghost {
  background-image: none;
}
.cart b {
  animation: bump 0.45s ease;
}
.card .ph:after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 40%, #fff3 50%, transparent 60%);
  transform: translateX(-100%);
  transition: transform 0.8s;
}
.card:hover .ph:after {
  transform: translateX(100%);
}
.nav a {
  position: relative;
}
.nav a:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 0;
  background: var(--g2);
  transition: width 0.3s;
}
.nav a:hover:after {
  width: 100%;
}
@keyframes flow {
  to {
    background-position: 200% center;
  }
}
@keyframes drift {
  from {
    transform: scale(1.02) translateX(0);
  }
  to {
    transform: scale(1.1) translateX(-1.5%);
  }
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
}
@keyframes bump {
  40% {
    transform: scale(1.6);
  }
}
@supports (animation-timeline: view()) {
  .sec .wrap > *,
  .revs figure,
  .trust-in li {
    animation: rise linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 40%;
  }
}

```

---
## src/styles/header.css

```css
/* Sticky header, logo, navigation, hamburger and cart button. */
.hdr {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.hdr-in {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  gap: var(--s3);
}
.logo {
  white-space: nowrap;
  font: 600 1.5rem var(--hf);
  letter-spacing: 0.02em;
}
.icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  position: relative;
  font-size: 1.1rem;
}
.cart b {
  position: absolute;
  top: 2px;
  right: 0;
  font: 600 0.7rem var(--bf);
  background: var(--accent);
  color: var(--on);
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: grid;
  place-items: center;
}
.burger {
  flex-direction: column;
  gap: 5px;
  display: flex;
  justify-content: center;
}
.burger span {
  width: 22px;
  height: 1.5px;
  background: currentColor;
  transition: transform var(--t);
}
.nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg);
  display: none;
  flex-direction: column;
  border-bottom: 1px solid var(--line);
}
.nav.open {
  display: flex;
}
.nav a {
  padding: var(--s3);
  min-height: 48px;
  border-top: 1px solid var(--line);
}
.nav a:hover {
  color: var(--accent);
}
.hdr-in .logo {
  order: 2;
  flex: 1;
  text-align: center;
}
.cart {
  order: 3;
}
.burger {
  order: 1;
}

```

---
## src/styles/hero.css

```css
/* Carousel (hero slider) and hero text. */
.slider {
  position: relative;
}
.track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.track::-webkit-scrollbar {
  display: none;
}
.slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 0;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  color: var(--ink);
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform var(--t);
}
.arrow:hover {
  transform: translateY(-50%) scale(1.08);
}
.arrow.l {
  left: var(--s3);
}
.arrow.r {
  right: var(--s3);
}
.dots {
  position: absolute;
  bottom: var(--s3);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
.dots button {
  width: 44px;
  height: 44px;
  background: none;
  border: 0;
  cursor: pointer;
  position: relative;
}
.dots button:after {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: 50%;
  background: var(--hero-ink);
  opacity: 0.4;
  transition: var(--t);
}
.dots button[aria-current='true']:after {
  opacity: 1;
  inset: 17px 12px;
  border-radius: 4px;
}
.hero {
  position: relative;
  min-height: min(78vh, 720px);
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero > img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 70% center;
}
.hero:after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--bg) 88%, transparent),
    transparent 75%
  );
}
.hero-t {
  position: relative;
  z-index: 1;
  color: var(--ink);
  padding-block: var(--s6);
}
.hero-t > * {
  max-width: 560px;
}
.hero-t p:not(.h1like) {
  font-size: 1.15rem;
  color: var(--muted);
}
.h1like {
  font: 500 clamp(2rem, 5vw+0.5rem, 3.75rem)/1.15 var(--hf);
}

```

---
## src/styles/index.css

```css
/* Load order matters: later files can override earlier ones. */
@import './themes.css';
@import './base.css';
@import './header.css';
@import './hero.css';
@import './sections.css';
@import './shop.css';
@import './responsive.css';
@import './effects.css';
@import './cart.css';
@import './landing.css';

```

---
## src/styles/landing.css

```css
/* Image category tiles and the sliding lookbook. */
.cat {
  position: relative;
  aspect-ratio: 4/5;
  min-height: 0;
  overflow: hidden;
  padding: 0;
  border: 0;
}
.cat img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}
.cat:hover img {
  transform: scale(1.08);
}
.cat span {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--s2);
  padding: var(--s5) var(--s3) var(--s3);
  background: linear-gradient(transparent, #000a);
  color: #fff;
  font: 600 1.25rem var(--hf);
  -webkit-text-fill-color: #fff;
}
.look {
  overflow: hidden;
  padding-bottom: var(--s6);
}
.marq {
  overflow: hidden;
}
.marq-in {
  display: flex;
  gap: var(--s3);
  width: max-content;
  animation: marq 45s linear infinite;
}
.marq:hover .marq-in {
  animation-play-state: paused;
}
.marq-in img {
  width: min(60vw, 280px);
  aspect-ratio: 4/5;
  object-fit: cover;
  border-radius: var(--r);
}
@keyframes marq {
  to {
    transform: translateX(calc(-100% / var(--n)));
  }
}

```

---
## src/styles/responsive.css

```css
/* Tablet and desktop layouts (min-width media queries), mobile hero, reduced-motion. */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .cats {
    grid-template-columns: repeat(4, 1fr);
  }
  .two {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
  .revs {
    grid-template-columns: repeat(3, 1fr);
  }
  .trust-in {
    grid-template-columns: repeat(4, 1fr);
  }
  .ftr-in {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
  .rail {
    grid-auto-columns: 38%;
  }
  .homes {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1024px) {
  .burger {
    display: none;
  }
  .hdr-in .logo {
    order: 0;
    flex: 0;
    text-align: left;
  }
  .nav {
    position: static;
    display: flex;
    flex-direction: row;
    border: 0;
    background: none;
    gap: var(--s4);
    flex: 1;
    justify-content: center;
  }
  .nav a {
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }
  .hdr-in {
    display: flex;
  }
  .cart {
    order: 3;
  }
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .rail {
    grid-template-columns: none;
    grid-auto-columns: calc(25% - 12px);
  }
  .lay {
    display: grid;
  }
  .drawer {
    position: static;
    transform: none;
    width: auto;
    padding: 0;
    display: block;
    overflow: visible;
  }
  .lay {
    grid-template-columns: 240px 1fr;
    gap: var(--s5);
  }
  .drawer .dh,
  .done,
  .scrim,
  .filt-btn {
    display: none;
  }
  .sticky {
    display: none;
  }
  .pd {
    grid-template-columns: 1.1fr 1fr;
    gap: var(--s6);
  }
  .buy {
    position: sticky;
    top: 96px;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *:before,
  *:after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
@media (max-width: 767px) {
  .hero {
    align-items: flex-end;
    min-height: 640px;
  }
  .hero > img {
    height: 62%;
    object-position: 74% center;
  }
  .hero:after {
    background: linear-gradient(0deg, var(--bg) 42%, transparent 72%);
  }
  .hero-t {
    padding-block: var(--s4) var(--s7);
  }
}

```

---
## src/styles/sections.css

```css
/* Landing sections: categories, product grid and cards, story, trust strip, reviews, comparison table, newsletter, footer. */
.cats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--s3);
}
.cat {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--s2);
  min-height: 96px;
  border: 1px solid var(--line);
  background: var(--card);
  font: 500 1.25rem var(--hf);
  border-radius: var(--r);
  transition: var(--t);
}
.cat:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
}
.cat i {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.rail {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 70%;
  gap: var(--s3);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: var(--s3);
}
.rail > * {
  scroll-snap-align: start;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--s4) var(--s3);
}
.card .ph {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
  background: var(--card);
  border-radius: var(--r);
}
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    opacity 300ms,
    transform 600ms;
}
.card .alt {
  position: absolute;
  inset: 0;
  opacity: 0;
}
@media (hover: hover) {
  .card:hover .alt {
    opacity: 1;
  }
  .card:hover img {
    transform: scale(1.03);
  }
}
.card h3 {
  margin: var(--s3) 0 var(--s1);
  font-family: var(--bf);
  font-weight: 500;
}
.card a:hover h3 {
  color: var(--accent);
}
.badge {
  position: absolute;
  top: var(--s2);
  left: var(--s2);
  z-index: 1;
  background: var(--ink);
  color: var(--bg);
  font-size: 0.75rem;
  padding: 2px 10px;
  text-transform: capitalize;
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price s {
  color: var(--muted);
  margin-right: 4px;
}
.sw {
  display: flex;
  gap: 6px;
}
.sw i {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid var(--line);
}
.two {
  display: grid;
  gap: var(--s5);
}
.story {
  background: var(--card);
}
.story img {
  object-position: 75% center;
  border-radius: var(--r);
  aspect-ratio: 4/3;
  object-fit: cover;
  width: 100%;
}
.story .two {
  align-items: center;
}
.trust-in {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--s4);
}
.trust-in li {
  display: flex;
  flex-direction: column;
  border-left: 2px solid var(--accent);
  padding-left: var(--s3);
}
.trust-in span {
  color: var(--muted);
  font-size: 0.9rem;
}
.trust {
  border-block: 1px solid var(--line);
  padding-block: var(--s5);
}
.revs {
  display: grid;
  gap: var(--s4);
}
.revs figure {
  margin: 0;
  padding: var(--s4);
  background: var(--card);
  border-radius: var(--r);
}
.stars {
  color: var(--accent);
  letter-spacing: 2px;
}
blockquote {
  margin: var(--s2) 0;
  font: 400 1.15rem/1.5 var(--hf);
}
figcaption {
  color: var(--muted);
  font-size: 0.9rem;
}
.scroll {
  overflow-x: auto;
}
.cmp {
  width: 100%;
  border-collapse: collapse;
  min-width: 420px;
}
.cmp th,
.cmp td {
  padding: var(--s3);
  border-bottom: 1px solid var(--line);
  text-align: left;
}
.cmp td:nth-child(2),
.cmp th:nth-child(2) {
  color: var(--accent);
  font-weight: 700;
}
.news {
  background: var(--card);
}
.row {
  display: flex;
  gap: var(--s2);
  flex-wrap: wrap;
}
.row input {
  flex: 1 1 220px;
  min-height: 48px;
  padding: 0 var(--s3);
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  border-radius: var(--r);
  font: inherit;
}
.msg {
  min-height: 1.6em;
  font-size: 0.9rem;
}
.msg.err {
  color: #e0566b;
}
.msg.ok {
  color: var(--accent);
}
.ftr {
  background: var(--card);
  border-top: 1px solid var(--line);
  padding-block: var(--s6);
}
.ftr-in {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--s5);
}
.ftr nav {
  display: flex;
  flex-direction: column;
}
.ftr h3 {
  font-family: var(--bf);
  font-size: 0.9rem;
  color: var(--muted);
}
.ftr a {
  padding: 10px 0;
  min-height: 44px;
}
.ftr a:hover {
  color: var(--accent);
}
.ftr p {
  color: var(--muted);
}

```

---
## src/styles/shop.css

```css
/* Listing and product pages: breadcrumbs, filter drawer, skeletons, gallery, variants, specs, sticky bar, toast, home page. */
.crumbs ol {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 0 var(--s3);
  font-size: 0.9rem;
  color: var(--muted);
}
.crumbs li + li:before {
  content: '/';
  margin: 0 var(--s2);
}
.crumbs a {
  text-decoration: underline;
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s2);
  padding-block: var(--s3);
  border-block: 1px solid var(--line);
  margin-block: var(--s4);
}
.bar select {
  min-height: 44px;
  background: var(--bg);
  color: var(--ink);
  border: 1px solid var(--line);
  padding: 0 var(--s2);
}
.drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: min(88vw, 360px);
  background: var(--bg);
  z-index: 40;
  padding: var(--s4);
  transform: translateX(-100%);
  transition: transform 250ms;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: var(--s3);
}
.drawer.open {
  transform: none;
}
.dh {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.scrim {
  position: fixed;
  inset: 0;
  background: #0008;
  z-index: 30;
}
fieldset {
  border: 0;
  padding: 0;
  margin: 0 0 var(--s4);
}
legend {
  font-weight: 600;
  margin-bottom: var(--s2);
  padding: 0;
}
.chip {
  min-height: 44px;
  padding: 0 var(--s3);
  margin: 0 var(--s2) var(--s2) 0;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  border-radius: var(--r);
  font: inherit;
  transition: var(--t);
}
.chip:hover {
  border-color: var(--ink);
}
.chip[aria-pressed='true'] {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}
.chip:disabled {
  opacity: 0.35;
  text-decoration: line-through;
  cursor: not-allowed;
}
.state {
  text-align: center;
  padding: var(--s6) var(--s3);
  border: 1px dashed var(--line);
  border-radius: var(--r);
}
.done {
  margin-top: auto;
}
.nf {
  padding-block: var(--s7);
}
.skel {
  background: linear-gradient(90deg, var(--card), var(--line), var(--card));
  background-size: 200% 100%;
  animation: sh 1.4s infinite;
  margin-bottom: var(--s2);
}
@keyframes sh {
  to {
    background-position: -200% 0;
  }
}
.gallery .track {
  border-radius: var(--r);
}
.gallery .slide img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
}
.thumbs {
  display: flex;
  gap: var(--s2);
  margin-top: var(--s2);
}
.thumbs button {
  width: 64px;
  padding: 0;
  border: 2px solid transparent;
  background: none;
  cursor: pointer;
  opacity: 0.6;
  transition: var(--t);
}
.thumbs button[aria-current='true'] {
  border-color: var(--accent);
  opacity: 1;
}
.rate {
  color: var(--muted);
}
.pr {
  font-size: 1.5rem;
}
.pr s {
  color: var(--muted);
  font-size: 1rem;
}
.opts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s2);
}
.swatch {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--c);
  border: 2px solid var(--line);
  cursor: pointer;
  transition: var(--t);
}
.swatch[aria-pressed='true'] {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.swatch:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.stock.in {
  color: var(--accent);
}
.stock.out {
  color: #e0566b;
}
.qrow {
  display: flex;
  gap: var(--s3);
  margin: var(--s3) 0;
}
.qty {
  display: flex;
  align-items: center;
  border: 1px solid var(--line);
}
.qty button {
  width: 44px;
  height: 48px;
  background: none;
  border: 0;
  color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
}
.qty output {
  min-width: 28px;
  text-align: center;
}
.specs {
  display: grid;
  gap: 0;
  margin: var(--s4) 0;
}
.specs div {
  display: flex;
  justify-content: space-between;
  padding: var(--s2) 0;
  border-bottom: 1px solid var(--line);
}
.specs dt {
  color: var(--muted);
  text-transform: capitalize;
}
.specs dd {
  margin: 0;
}
details {
  border-bottom: 1px solid var(--line);
  padding: var(--s3) 0;
}
summary {
  cursor: pointer;
  font-weight: 600;
  min-height: 24px;
}
.sticky {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 15;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--s3);
  padding: var(--s2) var(--s3);
  background: var(--bg);
  border-top: 1px solid var(--line);
  font-weight: 600;
}
.toast {
  position: fixed;
  left: 50%;
  bottom: 88px;
  transform: translate(-50%, 24px);
  background: var(--ink);
  color: var(--bg);
  padding: var(--s3) var(--s4);
  border-radius: var(--r);
  opacity: 0;
  pointer-events: none;
  transition: var(--t);
  z-index: 60;
  max-width: 90vw;
}
.toast[data-show='true'] {
  opacity: 1;
  transform: translate(-50%, 0);
}
.homes {
  display: grid;
  gap: var(--s4);
  margin-block: var(--s5);
}
.hb {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 360px;
  padding: var(--s4);
  overflow: hidden;
  color: #fff;
  background: var(--bg);
  border-radius: var(--r);
  font-family: var(--bf);
}
.hb img {
  object-position: 75% center;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms;
}
.hb:hover img {
  transform: scale(1.05);
}
.hb > * {
  position: relative;
}
.hb:after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 40%, #000a);
}
.hb > span {
  z-index: 1;
}
.hb .logo {
  font-size: 2rem;
  font-family: var(--hf);
}
.home h1 {
  padding-top: var(--s6);
}
.home .logo {
  color: #fff;
}

```

---
## src/styles/themes.css

```css
/* Colors, fonts and spacing as CSS variables. Each brand overrides them with [data-brand=...]. */
:root {
  --s1: 4px;
  --s2: 8px;
  --s3: 16px;
  --s4: 24px;
  --s5: 40px;
  --s6: 64px;
  --s7: 96px;
  --t: 200ms ease;
  --bg: #fff;
  --ink: #1b1b1b;
  --muted: #666;
  --accent: #8a6a2f;
  --line: #e6e2da;
  --card: #faf8f4;
  --on: #fff;
  --hf: Georgia, serif;
  --bf: system-ui, sans-serif;
  --r: 2px;
  --hero-ink: #fff;
  --g1: #6d3b1f;
  --g2: #b0783a;
}
[data-brand='home'] {
  --bg: #f7f4ee;
  --hf: 'Cormorant Garamond', serif;
  --bf: 'Jost', sans-serif;
}
[data-brand='aurelle'] {
  --g1: #7a4e0e;
  --g2: #c0392b;
  --bg: #fbf8f2;
  --ink: #2a2620;
  --muted: #6b6458;
  --accent: #a07c34;
  --line: #e8dfcf;
  --card: #f3ecde;
  --hf: 'Cormorant Garamond', serif;
  --bf: 'Jost', sans-serif;
  --hero-ink: #2a2620;
}
[data-brand='gemma-grove'] {
  --g1: #ffb3cf;
  --g2: #ffd98a;
  --bg: #1f1322;
  --ink: #f6ecf0;
  --muted: #cdb8c4;
  --accent: #e8b4c8;
  --line: #4a2d49;
  --card: #2b1a2e;
  --on: #1f1322;
  --hf: 'Fraunces', serif;
  --bf: 'Figtree', sans-serif;
}
[data-brand='lustre'] {
  --g1: #7fd6ff;
  --g2: #c9a7ff;
  --bg: #0b0b10;
  --ink: #f4f6fb;
  --muted: #a9aebd;
  --accent: #7fd6ff;
  --line: #262734;
  --card: #14141c;
  --on: #0b0b10;
  --hf: 'Manrope', sans-serif;
  --bf: 'Manrope', sans-serif;
  --r: 0;
}

```

---
## src/App.jsx

```jsx
// All routes of the site.
//   /                                 Home (links to the three brands)
//   /:brand                           Landing page
//   /:brand/:category                 Product listing
//   /:brand/:category/:slug           Product detail
//   anything else                     404
import { Route, Routes } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { BrandLayout } from './layouts/BrandLayout';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { NotFound } from './pages/NotFound';
import { ProductDetail } from './pages/ProductDetail';
import { ProductList } from './pages/ProductList';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":brand" element={<BrandLayout />}>
          <Route index element={<Landing />} />
          <Route path=":category" element={<ProductList />} />
          <Route path=":category/:slug" element={<ProductDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

```

---
## src/layouts/BrandLayout.jsx

```jsx
// Wraps every /:brand/... page. It picks the brand from the URL, applies that brand's theme
// (data-brand), and renders the header, the page itself, the footer and the cart drawer.
import { Outlet, useParams } from 'react-router-dom';
import { BRANDS } from '../brands';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { NotFound } from '../pages/NotFound';

export function BrandLayout() {
  const { brand: brandSlug } = useParams();
  const brand = BRANDS[brandSlug];
  if (!brand) return <NotFound />; // unknown brand in the URL

  return (
    <div data-brand={brand.slug} className="app">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header brand={brand} />
      <main id="main">
        <Outlet context={brand} />
      </main>
      <Footer brand={brand} />
      <CartDrawer />
    </div>
  );
}

```

---
## src/main.jsx

```jsx
// App entry point: router + cart provider + global styles.
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>,
);

```
