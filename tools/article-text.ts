import { getBlogBySlug } from "../data/blogsData";
import fs from "fs";
const a:any = getBlogBySlug(process.argv[2]);
const out:string[]=[];
const walk=(v:any)=>{ if(typeof v==="string"){ if(v.length>25 && !/^\/|^https?:|\.webp$|\.png$/.test(v)) out.push(v);} else if(Array.isArray(v)) v.forEach(walk); else if(v&&typeof v==="object") for(const [k,x] of Object.entries(v)){ if(['schema','metaTitle','metaDescription','ogDescription','canonicalUrl','cardTitle','keyHighlights','alt','bottomCta','aboutAuthor','author','reviewedBy'].includes(k)) continue; walk(x);} };
walk(a); fs.writeFileSync("/tmp/arttext.json", JSON.stringify(out));
