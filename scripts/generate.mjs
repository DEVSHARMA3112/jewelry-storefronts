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
