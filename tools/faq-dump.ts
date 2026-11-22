import { STATES_DATA } from "../data/statesData";
const s:any=(STATES_DATA as any)[process.argv[2]];
s.faqs.forEach((f:any,i:number)=>console.log(`\n#${i+1} [${f.q.length}/${f.a.length}] Q: ${f.q}\nA: ${f.a}`));
