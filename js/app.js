/* ---------- Neon palette + icons ---------- */
const NEON={hs:'#ffd34d',pl:'#ff8a3d',push:'#ff4d6d',mu:'#e85dff',pull:'#9b7bff',fl:'#4d9fff',bl:'#33e0e0',flag:'#3dff9a',core:'#b8ff4d',legs:'#ff6fae',mob:'#b9c8ea'};
BR.forEach(b=>b.c=NEON[b.id]||b.c);
const IC={
 hs:'<circle cx="12" cy="19.5" r="2"/><path d="M12 17.5V9M8 21.5h8M12 9 9 3M12 9l3-6M12 14l-3 3M12 14l3 3"/>',
 pl:'<circle cx="20" cy="9" r="1.8"/><path d="M3 9h15M12 9v8M8.5 19h7"/>',
 push:'<circle cx="19.5" cy="9.5" r="1.8"/><path d="M3 15l14.5-4.5M15 11.2V18M2.5 19h19"/>',
 mu:'<circle cx="12" cy="4.5" r="2"/><path d="M3 10h18M12 6.5V18M8.5 10l3.5-2 3.5 2M12 18l-2 3.5M12 18l2 3.5"/>',
 pull:'<path d="M3 3.5h18M8 3.5l2.5 5M16 3.5l-2.5 5"/><circle cx="12" cy="8.5" r="2"/><path d="M12 10.5V17M12 17l-2 4M12 17l2 4"/>',
 fl:'<path d="M5 3.5h6M8 3.5V11"/><circle cx="5.8" cy="11" r="1.8"/><path d="M8 11h13"/>',
 bl:'<path d="M13 3.5h6M16 3.5V11"/><circle cx="18.2" cy="11" r="1.8"/><path d="M3 11h13"/>',
 flag:'<path d="M5 2.5v19M5 7.5h3.5M5 13h3"/><circle cx="10.5" cy="7.5" r="1.8"/><path d="M8.5 10.5h12"/>',
 core:'<rect x="7" y="3.5" width="10" height="17" rx="3"/><path d="M7 9h10M7 14.5h10M12 3.5v17"/>',
 legs:'<circle cx="9" cy="3.8" r="1.8"/><path d="M9 6v6.5M9 12.5l4 4v4.5M9 12.5h11M6 9l3-2 3 2"/>',
 mob:'<circle cx="12" cy="5" r="2"/><path d="M5 2.5l7 6.5 7-6.5M12 9v5M3 20l9-6 9 6"/>'
};
const ico=(k,sz)=>`<svg viewBox="0 0 24 24" width="${sz||22}" height="${sz||22}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`;
const GI={
 trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/>',
 flame:'<path d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2.5 1.2-4 2.5-5 0 2 1 3 2 3-1-3 .5-6 .5-9z"/>',
 star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
 bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
 cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
 target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
 leaf:'<path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15zM5 19l8-8"/>',
 tree:'<path d="M12 22v-7M12 15l-5-5M12 15l5-5M12 12V5"/><circle cx="12" cy="4" r="2"/><circle cx="6" cy="9" r="2"/><circle cx="18" cy="9" r="2"/>',
 check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'
};
const gi=(k,sz)=>`<svg viewBox="0 0 24 24" width="${sz||20}" height="${sz||20}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${GI[k]}</svg>`;

/* ---------- Graph ---------- */
const BYID=Object.fromEntries(SK.map(s=>[s.id,s]));
SK.forEach(s=>{s.kids=[];s.p=s.p.filter(x=>BYID[x])});
SK.forEach(s=>s.p.forEach(p=>BYID[p].kids.push(s.id)));
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const UNIT={s:'sec',reps:'reps',kg:'kg added',cm:'cm to floor'};
const UNITS={s:'s',reps:'reps',kg:'kg',cm:'cm'};
const ROM=['','I','II','III','IV','V','VI','VII','VIII'];
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>ymd(new Date());
function weekStart(d){const x=new Date(d);x.setDate(x.getDate()-((x.getDay()+6)%7));x.setHours(0,0,0,0);return x}
const weekKey=d=>ymd(weekStart(d||new Date()));
function addDays(key,n){const d=new Date(key+'T12:00');d.setDate(d.getDate()+n);return ymd(d)}

/* ---------- State ---------- */
const SEED={st:{incpu:2,pu:2,benchdip:2,dip:2,deadhang:2,scap:2,negpu:2,pullup:2,tlsit:2,lsitpb:2,lsitfloor:1},goals:['hs30','kmu'],log:[]};
const LSK='tch-state-v1';
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
function normalize(o){o=o||{};const obj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
  return{v:2,st:obj(o.st),goals:(Array.isArray(o.goals)?o.goals:[]).filter(g=>BYID[g]),log:Array.isArray(o.log)?o.log.filter(l=>l&&BYID[l.id]&&typeof l.v==='number'):[],md:obj(o.md),ach:obj(o.ach),q:obj(o.q)}}
let state=normalize((()=>{try{return JSON.parse(ls.get(LSK))}catch(e){return null}})()||SEED);
const st=id=>state.st[id]||0;
const unlocked=id=>BYID[id].p.every(p=>st(p)===2);
function status(id){const v=st(id);if(v===2)return'done';if(v===1)return'train';return unlocked(id)?'open':'locked'}
const better=(s,a,b)=>s.u==='cm'?a<b:a>b;
const doneCount=()=>SK.filter(s=>st(s.id)===2).length;

/* ---------- Log analysis + XP ---------- */
const XP_LOG=5,XP_PR=15,XP_DAY=10;
function analyze(){
  const sorted=state.log.map((l,i)=>({...l,i})).sort((a,b)=>a.d<b.d?-1:a.d>b.d?1:a.i-b.i);
  const best={},seen=new Set(),prSeen=new Set(),days=new Set(),prs=[];let xp=0;
  sorted.forEach(l=>{const s=BYID[l.id],k=l.id+'|'+l.d;days.add(l.d);
    const had=best[l.id]!==undefined,isPr=had&&better(s,l.v,best[l.id]);
    if(!had||better(s,l.v,best[l.id]))best[l.id]=l.v;
    if(!seen.has(k)){seen.add(k);xp+=XP_LOG}
    if(isPr){prs.push(l);if(!prSeen.has(k)){prSeen.add(k);xp+=XP_PR}}});
  xp+=days.size*XP_DAY;
  return{xp,best,days,prs,sorted};
}
function weekStreak(days){const ws=weekKey();let n=0;
  for(let w=0;w<200;w++){const k=addDays(ws,-7*w);let c=0;for(let i=0;i<7;i++)if(days.has(addDays(k,i)))c++;
    if(c>=3)n++;else if(w>0)break}return n}
function bestStreak(days){if(!days.size)return 0;const ks=[...days].sort();let k=weekKey(new Date(ks[0]+'T12:00')),end=weekKey(),run=0,max=0;
  while(k<=end){let c=0;for(let i=0;i<7;i++)if(days.has(addDays(k,i)))c++;run=c>=3?run+1:0;max=Math.max(max,run);k=addDays(k,7)}return max}

/* ---------- Quests ---------- */
const QDEF={days3:60,pr2:50,goal2:40,master:80,variety:40,branches:40};
function questsFor(wk,A){
  const end=addDays(wk,6),inW=d=>d>=wk&&d<=end;
  const wl=A.sorted.filter(l=>inW(l.d));
  const days=new Set(wl.map(l=>l.d)).size;
  const prs=A.prs.filter(l=>inW(l.d)).length;
  const gs=goalSet();const tgt=new Set([...gs,...SK.filter(s=>st(s.id)===1).map(s=>s.id)]);
  const goalDays=new Set(wl.filter(l=>tgt.has(l.id)).map(l=>l.d)).size;
  const qs=[
    {id:'days3',ic:'cal',n:'Train 3 days',d:'Log at least one set on 3 different days.',p:days,m:3},
    {id:'pr2',ic:'star',n:'Break 2 records',d:'Beat your previous best on any skill twice.',p:prs,m:2},
    {id:'goal2',ic:'target',n:'Work your path',d:'Log a goal-path or training skill on 2 days.',p:goalDays,m:2},
  ];
  const wn=Math.floor(new Date(wk+'T12:00').getTime()/6048e5)%3;
  if(wn===0)qs.push({id:'master',ic:'bolt',n:'Master a new skill',d:'Mark any skill as Mastered this week.',p:Object.values(state.md).some(inW)?1:0,m:1});
  if(wn===1){const per={};wl.forEach(l=>{(per[l.d]=per[l.d]||new Set()).add(l.id)});qs.push({id:'variety',ic:'grid',n:'Full session',d:'Log 4 different skills in one day.',p:Math.min(4,Math.max(0,...Object.values(per).map(s=>s.size))),m:4})}
  if(wn===2)qs.push({id:'branches',ic:'tree',n:'Spread out',d:'Log skills from 3 different limbs this week.',p:Math.min(3,new Set(wl.map(l=>BYID[l.id].b)).size),m:3});
  qs.forEach(q=>{q.xp=QDEF[q.id];q.done=q.p>=q.m||(state.q[wk]||[]).includes(q.id)});
  return qs;
}

/* ---------- Achievements ---------- */
const masteredIn=b=>SK.filter(s=>s.b===b).every(s=>st(s.id)===2);
const ACH=[
 {id:'first',ic:'check',n:'First rep',d:'Log your first set.',xp:20,t:c=>c.A.sorted.length>0},
 {id:'days10',ic:'cal',n:'Regular',d:'Train on 10 different days.',xp:50,t:c=>c.A.days.size>=10},
 {id:'days50',ic:'cal',n:'Iron habit',d:'Train on 50 different days.',xp:150,t:c=>c.A.days.size>=50},
 {id:'pr5',ic:'star',n:'PR hunter',d:'Set 5 personal records.',xp:40,t:c=>c.A.prs.length>=5},
 {id:'pr25',ic:'star',n:'Record breaker',d:'Set 25 personal records.',xp:120,t:c=>c.A.prs.length>=25},
 {id:'week3',ic:'flame',n:'Full week',d:'Train 3 days in one week.',xp:40,t:c=>c.bs>=1},
 {id:'streak4',ic:'flame',n:'Unbroken',d:'4 weeks in a row with 3+ days.',xp:120,t:c=>c.bs>=4},
 {id:'streak12',ic:'flame',n:'Relentless',d:'12 weeks in a row with 3+ days.',xp:300,t:c=>c.bs>=12},
 {id:'quest5',ic:'trophy',n:'Questing',d:'Complete 5 weekly quests.',xp:60,t:c=>c.qn>=5},
 {id:'m10',ic:'bolt',n:'Ten down',d:'Master 10 skills.',xp:50,t:c=>c.dn>=10},
 {id:'m25',ic:'bolt',n:'Quarter way',d:'Master 25 skills.',xp:120,t:c=>c.dn>=25},
 {id:'m50',ic:'bolt',n:'Half the tree',d:'Master 50 skills.',xp:250,t:c=>c.dn>=50},
 {id:'roots',ic:'leaf',n:'Solid roots',d:'Master every Tier I skill.',xp:80,t:()=>SK.filter(s=>s.t===1).every(s=>st(s.id)===2)},
 {id:'round',ic:'tree',n:'Well rounded',d:'Master a skill on every limb.',xp:80,t:()=>BR.every(b=>SK.some(s=>s.b===b.id&&st(s.id)===2))},
 {id:'limb',ic:'trophy',n:'Limb complete',d:'Master every skill on one limb.',xp:150,t:()=>BR.some(b=>masteredIn(b.id))},
 {id:'adv',ic:'target',n:'Advanced',d:'Master a Tier V skill.',xp:100,t:()=>SK.some(s=>s.t>=5&&st(s.id)===2)},
 {id:'hs',ic:'star',n:'Upside down',d:'Master the freestanding handstand.',xp:60,t:()=>st('hs10')===2},
 {id:'mu',ic:'star',n:'Over the bar',d:'Master the bar muscle-up.',xp:80,t:()=>st('kmu')===2},
 {id:'fl',ic:'star',n:'Levitation',d:'Master the full front lever.',xp:200,t:()=>st('ffl')===2},
 {id:'pl',ic:'star',n:'Weightless',d:'Master the full planche.',xp:300,t:()=>st('fpl')===2},
];
const ACHM=Object.fromEntries(ACH.map(a=>[a.id,a]));
function ctx(A){A=A||analyze();const qn=Object.values(state.q).reduce((a,v)=>a+v.length,0);return{A,bs:bestStreak(A.days),dn:doneCount(),qn}}

/* ---------- Goals ---------- */
function pathTo(goal){const seen=new Set(),out=[];(function walk(id){if(seen.has(id))return;seen.add(id);BYID[id].p.forEach(walk);out.push(id)})(goal);return out}
function goalSet(){const s=new Set();state.goals.forEach(g=>pathTo(g).forEach(id=>{if(st(id)!==2)s.add(id)}));return s}
function recommend(){const gs=goalSet();return SK.filter(s=>st(s.id)!==2&&unlocked(s.id)).sort((a,b)=>(st(b.id)===1)-(st(a.id)===1)||(gs.has(b.id)-gs.has(a.id))||a.t-b.t)}

/* ---------- XP totals ---------- */
const RANKS=[[1,'Untrained'],[3,'Initiate'],[6,'Apprentice'],[9,'Athlete'],[13,'Specialist'],[17,'Bar Master'],[22,'Elite'],[28,'Capable Human']];
function totals(A){A=A||analyze();
  const mx=SK.reduce((a,s)=>a+(st(s.id)===2?XPT[s.t]:0),0);
  const qx=Object.values(state.q).reduce((a,v)=>a+v.reduce((b,id)=>b+(QDEF[id]||0),0),0);
  const ax=Object.keys(state.ach).reduce((a,id)=>a+(ACHM[id]?ACHM[id].xp:0),0);
  return{xp:mx+A.xp+qx+ax,mx,lx:A.xp,qx,ax,A}}
const lvlOf=xp=>Math.floor(Math.sqrt(xp/15))+1, xpFor=l=>15*(l-1)*(l-1);
const rankOf=l=>RANKS.filter(r=>l>=r[0]).pop()[1];

/* ---------- Rewards engine ---------- */
function syncRewards(){const A=analyze(),c=ctx(A),got=[];
  ACH.forEach(a=>{if(!state.ach[a.id]&&a.t(c)){state.ach[a.id]=today();got.push({kind:'ach',a})}});
  const wk=weekKey();questsFor(wk,A).forEach(q=>{const arr=state.q[wk]||[];if(q.p>=q.m&&!arr.includes(q.id)){state.q[wk]=[...arr,q.id];got.push({kind:'quest',q})}});
  return got}

/* ---------- Toasts / bursts / level up ---------- */
const tq=[];let tBusy=false;
function toast(title,sub,icon){tq.push({title,sub,icon});if(!tBusy)nextToast()}
function nextToast(){const t=$('toast'),m=tq.shift();if(!m){tBusy=false;return}tBusy=true;
  t.innerHTML=`<span class="ti">${gi(m.icon||'bolt',17)}</span><div><div>${m.title}</div>${m.sub?`<small>${esc(m.sub)}</small>`:''}</div>`;
  t.classList.add('show');setTimeout(()=>{t.classList.remove('show');setTimeout(nextToast,320)},2300)}
function burst(x,y,color){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  for(let i=0;i<26;i++){const d=document.createElement('div');d.className='burst';const a=Math.random()*Math.PI*2,r=60+Math.random()*90,s=4+Math.random()*6;
    d.style.cssText=`background:${i%3?color:'var(--xp)'};box-shadow:0 0 8px ${color};width:${s}px;height:${s}px;transform:translate(${x}px,${y}px)`;document.body.appendChild(d);
    d.animate([{transform:`translate(${x}px,${y}px) scale(1)`,opacity:1},{transform:`translate(${x+Math.cos(a)*r}px,${y+Math.sin(a)*r}px) scale(.2)`,opacity:0}],{duration:700+Math.random()*400,easing:'cubic-bezier(.2,.8,.2,1)'}).onfinish=()=>d.remove()}}
function levelUp(l){$('lvbig').textContent=l;$('lvrank').textContent=rankOf(l);const nx=RANKS.find(r=>r[0]>l);$('lvnext').textContent=nx?`Next rank: ${nx[1]} at level ${nx[0]}`:'Highest rank reached';$('lvup').classList.add('show');burst(innerWidth/2,innerHeight*.42,'#ffc94d');$('lvok').focus()}
$('lvok').onclick=()=>$('lvup').classList.remove('show');

/* ---------- HUD ---------- */
let curLvl=null;
function paintHud(){const T=totals(),l=lvlOf(T.xp),a=xpFor(l),b=xpFor(l+1);
  $('lvl').textContent=l;$('rank').textContent=rankOf(l);
  $('xpn').textContent=`${T.xp-a} / ${b-a} XP`;$('xpfill').style.width=Math.round((T.xp-a)/(b-a)*100)+'%';
  const sk=weekStreak(T.A.days);$('streak').textContent=sk;$('flame').classList.toggle('off',!sk);$('flame').style.color=sk?'#ff9d2e':'';
  const qs=questsFor(weekKey(),T.A),left=qs.filter(q=>!q.done).length;const pip=$('qpip');pip.hidden=!left;pip.textContent=left;
  return l}

/* ---------- Tree overview ---------- */
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
const OV={};
const FORK={x:200,y:372};
(function buildTree(){
  const svg=$('tree');
  svg.innerHTML=`<defs><linearGradient id="trunkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b5ea8"/><stop offset=".55" stop-color="#16294d"/><stop offset="1" stop-color="#0c1630"/></linearGradient><radialGradient id="groundg"><stop offset="0" stop-color="#2f7dff" stop-opacity=".35"/><stop offset="1" stop-color="#2f7dff" stop-opacity="0"/></radialGradient></defs>`;
  const ring=(cx,cy,rx,ry,a)=>({x:cx+rx*Math.cos(a*Math.PI/180),y:cy+ry*Math.sin(a*Math.PI/180)});
  const inner=['legs','push','core','pull','mob'],outer=['flag','pl','hs','mu','fl','bl'];
  const IP={legs:[98,332],push:[142,240],core:[200,166],pull:[258,240],mob:[302,332]};
  const OP={flag:[48,246],pl:[70,140],hs:[150,58],mu:[250,58],fl:[330,140],bl:[352,246]};
  inner.forEach(id=>OV[id]={x:IP[id][0],y:IP[id][1],r:25,inner:true});
  outer.forEach(id=>OV[id]={x:OP[id][0],y:OP[id][1],r:27});
  el('ellipse',{cx:200,cy:540,rx:170,ry:26,fill:'url(#groundg)'},svg);
  const gL=el('g',{},svg);
  BR.forEach(b=>{const p=OV[b.id];const x0=FORK.x+(p.x-200)*.08,y0=FORK.y;
    const d=`M${x0},${y0} C${x0},${y0-70} ${p.x},${p.y+(p.inner?70:120)} ${p.x},${p.y+p.r}`;
    OV[b.id].limb=el('path',{class:'limb',d,'stroke-width':p.inner?5:3.2,style:`--c:${b.c}`},gL);
    const len=OV[b.id].limb.getTotalLength?null:null;OV[b.id].d=d});
  ['M120,546 C150,530 175,522 190,500','M280,546 C250,530 225,522 210,500','M80,552 C120,545 160,538 186,520','M320,552 C280,545 240,538 214,520','M200,500 L200,552'].forEach(d=>el('path',{class:'root',d},svg));
  el('path',{class:'trunk',d:'M168,548 C182,528 188,488 189,440 C190,410 186,392 176,378 C190,384 196,382 200,370 C204,382 210,384 224,378 C214,392 210,410 211,440 C212,488 218,528 232,548 Z'},svg);
  el('path',{d:'M200,540 C199,500 201,440 200,385',fill:'none',stroke:'#4d9fff','stroke-width':1.5,opacity:.6,style:'filter:drop-shadow(0 0 4px #4d9fff)'},svg);
  const hub=el('g',{},svg);
  el('circle',{cx:200,cy:446,r:22,fill:'var(--bg2)',stroke:'#2b5ea8','stroke-width':2},hub);
  OV.hub=el('text',{x:200,y:451,'text-anchor':'middle','font-family':'var(--display)','font-weight':700,'font-size':15,fill:'var(--chalk)'},hub);
  BR.forEach(b=>{const p=OV[b.id];const g=el('g',{class:'bn',transform:`translate(${p.x},${p.y})`,tabindex:0,role:'button',style:`--c:${b.c}`},svg);
    el('circle',{class:'glow',r:p.r+14},g);
    el('circle',{class:'trk',r:p.r+6},g);
    const C=2*Math.PI*(p.r+6);
    const arc=el('circle',{class:'arc',r:p.r+6,transform:'rotate(-90)','stroke-dasharray':`0 ${C}`},g);
    el('circle',{class:'core',r:p.r},g);
    const fo=el('g',{class:'ico',transform:`translate(-12,-12)`},g);fo.innerHTML=ico(b.id,24).replace('<svg ','<svg x="0" y="0" ');
    const nm=el('text',{class:'nm',y:p.r+21},g);nm.textContent=b.n;
    const ct=el('text',{class:'ct',y:p.r+34},g);
    const dot=el('circle',{class:'tdot',r:6,cx:p.r*.78,cy:-p.r*.78},g);
    Object.assign(OV[b.id],{g,arc,ct,dot,C});
    g.addEventListener('click',()=>openBranch(b.id));
    g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBranch(b.id)}});
  });
})();
function paintTree(){
  BR.forEach(b=>{const o=OV[b.id],tot=SK.filter(s=>s.b===b.id),d=tot.filter(s=>st(s.id)===2).length;
    o.arc.setAttribute('stroke-dasharray',`${o.C*d/tot.length} ${o.C}`);o.arc.style.display=d?'':'none';
    o.ct.textContent=`${d}/${tot.length}`;o.dot.style.display=tot.some(s=>st(s.id)===1)?'':'none';
    o.g.classList.toggle('cold',!d);o.limb.classList.toggle('lit',d>0);
    o.g.setAttribute('aria-label',`${b.n}, ${d} of ${tot.length} mastered`)});
  const dn=doneCount();OV.hub.textContent=dn;
  const pct=Math.round(dn/SK.length*100);$('growpct').textContent=`${dn}/${SK.length} · ${pct}%`;$('growbar').style.width=Math.max(pct,1)+'%';
  const cont=recommend().slice(0,6);
  $('controw').innerHTML=cont.map(s=>`<button class="cchip" data-open="${s.id}"><span class="dot" style="border-color:${st(s.id)===1?'var(--train)':BRM[s.b].c}"></span>${esc(s.n)} <small>${st(s.id)===1?'training':'+'+XPT[s.t]+' XP'}</small></button>`).join('')||'<p class="empty" style="padding:0">Everything unlocked is mastered.</p>';
  $('controw').querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>goSkill(b.dataset.open));
}
/* ambient sparks */
(function sparks(){const cv=$('spark'),cx=cv.getContext('2d');let W,H,P=[],run=true;
  const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function size(){const r=cv.getBoundingClientRect(),dp=Math.min(2,devicePixelRatio||1);W=r.width;H=r.height;cv.width=W*dp;cv.height=H*dp;cx.setTransform(dp,0,0,dp,0,0)}
  function seed(){P=[...Array(34)].map(()=>({x:Math.random()*W,y:Math.random()*H,r:.6+Math.random()*1.6,v:.15+Math.random()*.35,c:BR[Math.floor(Math.random()*BR.length)].c,ph:Math.random()*6}))}
  size();seed();addEventListener('resize',()=>{size();seed()});
  function f(t){if(!run)return;cx.clearRect(0,0,W,H);
    P.forEach(p=>{p.y-=p.v;p.x+=Math.sin(t/1500+p.ph)*.2;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}
      cx.globalAlpha=.35+.35*Math.sin(t/700+p.ph);cx.fillStyle=p.c;cx.shadowColor=p.c;cx.shadowBlur=8;cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill()});
    requestAnimationFrame(f)}
  if(!rm)requestAnimationFrame(f);
  window.sparksOn=on=>{if(rm)return;if(on&&!run){run=true;requestAnimationFrame(f)}else if(!on)run=false};
})();

/* ---------- Limb view ---------- */
const NW=124,RS=176,CR=30;
let cur=null,lay=null,selected=null;
const cam={x:0,y:0,k:1};
function layoutBranch(bid,seed){
  const nodes=SK.filter(s=>s.b===bid);
  const tiers=[...new Set(nodes.map(s=>s.t))].sort((a,b)=>a-b);
  const pos={},rows={};
  tiers.forEach((t,ri)=>{
    let row=nodes.filter(s=>s.t===t);
    if(ri===0&&seed)row=row.slice().sort((a,b)=>seed(a)-seed(b));
    if(ri>0)row=row.map((s,i)=>{const ps=s.p.filter(p=>pos[p]);return{s,bc:ps.length?ps.reduce((a,p)=>a+pos[p].x,0)/ps.length:(i-(row.length-1)/2)*NW}}).sort((a,b)=>a.bc-b.bc).map(o=>o.s);
    row.forEach((s,i)=>{pos[s.id]={x:(i-(row.length-1)/2)*NW,y:-ri*RS}});
    rows[t]=-ri*RS;
  });
  const P=Object.values(pos),minX=Math.min(...P.map(p=>p.x))-NW/2,maxX=Math.max(...P.map(p=>p.x))+NW/2;
  const minY=Math.min(...P.map(p=>p.y))-CR-10,maxY=CR+70;
  const L={bid,nodes,tiers,pos,rows,bounds:{minX,maxX,minY,maxY,w:maxX-minX,h:maxY-minY}};
  if(seed)return L;
  return layoutBranch(bid,s=>{const ks=s.kids.filter(k=>pos[k]);return ks.length?ks.reduce((a,k)=>a+pos[k].x,0)/ks.length:pos[s.id].x});
}
const BADGE={
  locked:'<svg viewBox="0 0 16 16" fill="none" stroke="var(--dim)" stroke-width="1.7"><rect x="3.5" y="7" width="9" height="6.5" rx="1.5"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7"/></svg>',
  train:'<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="var(--train)"/><path d="M6.4 5v6l4.8-3z" fill="var(--bg)"/></svg>',
  done:'<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="var(--xp)"/><path d="m4.8 8.2 2.2 2.2 4.2-4.6" fill="none" stroke="var(--bg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
function bestOf(id){const s=BYID[id];let b=null;state.log.forEach(l=>{if(l.id===id&&(b===null||better(s,l.v,b)))b=l.v});return b}
function subLine(s){const stt=status(s.id),b=bestOf(s.id),u=UNITS[s.u];
  if(stt==='done')return b!==null?`best ${b} ${u}`:'mastered';
  if(stt==='train')return b!==null?`${b} → ${s.std}`:`goal ${s.std}`;
  if(stt==='open')return `goal ${s.std}`;
  return 'locked'}
function renderBranch(){
  if(!cur)return;const L=lay,b=BRM[cur],gs=goalSet(),world=$('bvworld');
  world.querySelectorAll('.sn,.tl').forEach(n=>n.remove());
  const svg=$('bvsvg');svg.innerHTML='';
  const B=L.bounds;
  el('path',{d:`M0,${B.maxY+40} C0,${B.maxY-60} 0,${B.minY+120} 0,${B.minY+40}`,fill:'none',stroke:b.c,'stroke-width':14,opacity:.06,'stroke-linecap':'round'},svg);
  [[-60,1],[60,-1]].forEach(([dx,s])=>el('path',{d:`M0,${B.maxY-10} C${dx*.3},${B.maxY+10} ${dx*.8},${B.maxY+18} ${dx*1.4},${B.maxY+30}`,fill:'none',stroke:b.c,'stroke-width':3,opacity:.12},svg));
  L.nodes.forEach(s=>s.p.forEach(pid=>{
    if(!L.pos[pid])return;const a=L.pos[pid],c=L.pos[s.id];
    const y1=a.y-CR,y2=c.y+CR,my=y1-30;
    const d=a.x===c.x?`M${a.x},${y1} V${y2}`:`M${a.x},${y1} V${my+8} Q${a.x},${my} ${a.x+Math.sign(c.x-a.x)*8},${my} H${c.x-Math.sign(c.x-a.x)*8} Q${c.x},${my} ${c.x},${my-8} V${y2}`;
    const pd=st(pid)===2,cd=st(s.id)===2;
    let cls='w';if(gs.has(s.id)&&(gs.has(pid)||pd))cls+=' goal';else if(pd&&cd)cls+=' on';else if(pd)cls+=' lit';
    el('path',{class:cls,d,style:`--c:${b.c}`},svg);
    if(pd)el('circle',{cx:a.x,cy:my,r:3,fill:cd?b.c:'var(--faint)'},svg);
  }));
  const frag=document.createDocumentFragment();
  L.nodes.forEach(s=>{const p=L.pos[s.id],stt=status(s.id);
    const bt=document.createElement('button');
    bt.className='sn '+stt+(gs.has(s.id)||state.goals.includes(s.id)?' goalp':'')+(selected===s.id?' sel':'');bt.dataset.id=s.id;
    bt.style.cssText=`left:${p.x-NW/2}px;top:${p.y-CR}px;--c:${b.c}`;
    const star=state.goals.includes(s.id)?'<span style="color:var(--xp)">★ </span>':'';
    bt.innerHTML=`<span class="orb">${ROM[s.t]}${BADGE[stt]?`<span class="badge">${BADGE[stt]}</span>`:''}</span><span class="nl">${star}${esc(s.n)}</span><span class="ns">${esc(subLine(s))}</span>`;
    bt.setAttribute('aria-label',`${s.n}, tier ${s.t}, ${stt==='done'?'mastered':stt==='train'?'training':stt==='open'?'ready':'locked'}`);
    frag.appendChild(bt)});
  world.appendChild(frag);
  const tot=L.nodes.length,d=L.nodes.filter(s=>st(s.id)===2).length;
  $('bvname').textContent=b.n;$('bvcount').textContent=`${d}/${tot} mastered · ${L.nodes.filter(s=>st(s.id)!==2).reduce((a,s)=>a+XPT[s.t],0)} XP to earn`;
  $('bvico').innerHTML=ico(cur,22);$('bvt').style.setProperty('--c',b.c);
}
function applyCam(){$('bvworld').style.transform=`translate(${cam.x}px,${cam.y}px) scale(${cam.k})`}
function wrapSize(){const r=$('bvwrap').getBoundingClientRect();return{w:r.width,h:r.height}}
function camTo(x,y,k,anim){const {w,h}=wrapSize();const tx=w/2-x*k,ty=h/2-y*k;
  if(!anim||matchMedia('(prefers-reduced-motion:reduce)').matches){Object.assign(cam,{x:tx,y:ty,k});applyCam();return}
  const s={...cam},t0=performance.now();(function f(t){const q=Math.min(1,(t-t0)/380),e=1-Math.pow(1-q,3);cam.x=s.x+(tx-s.x)*e;cam.y=s.y+(ty-s.y)*e;cam.k=s.k+(k-s.k)*e;applyCam();if(q<1)requestAnimationFrame(f)})(t0)}
function fitBranch(anim){const B=lay.bounds,{w,h}=wrapSize();const k=Math.max(.3,Math.min(1.05,(w-24)/B.w,(h-30)/B.h));camTo(B.minX+B.w/2,B.minY+B.h/2,k,anim)}
function readK(){const B=lay.bounds,{w}=wrapSize();return Math.max(.82,Math.min(1,(w-16)/B.w))}
function focusNode(id,anim){const p=lay.pos[id],{h}=wrapSize(),k=readK();camTo(p.x,p.y+30-(h*.14)/k,k,anim)}
function frontier(){const ns=lay.nodes;return(ns.find(s=>st(s.id)===1)||ns.filter(s=>status(s.id)==='open').sort((a,b)=>a.t-b.t)[0]||ns.find(s=>st(s.id)!==2)||ns[ns.length-1]).id}
function openBranch(bid,focusId){
  if(cur!==bid){cur=bid;lay=layoutBranch(bid);renderBranch()}
  $('ov').hidden=true;$('bv').hidden=false;window.sparksOn&&sparksOn(false);
  requestAnimationFrame(()=>{const {w,h}=wrapSize(),B=lay.bounds;if(!focusId&&B.w*.82<w-16&&B.h*.82<h)fitBranch(false);else focusNode(focusId||frontier(),false)});
}
function openTree(){cur=null;$('bv').hidden=true;$('ov').hidden=false;paintTree();window.sparksOn&&sparksOn(true)}
$('backbtn').onclick=openTree;
$('bvfit').onclick=()=>fitBranch(true);
function goSkill(id){showView('map');openBranch(BYID[id].b,id);setTimeout(()=>openSheet(id),60)}

(function panzoom(){
  const wrap=$('bvwrap'),ptrs=new Map();let start=null,moved=0,pinch=null,captured=false,suppress=false;
  const hint=$('hint');let hintOff=ls.get('tch-hint')==='1';if(hintOff)hint.hidden=true;
  function killHint(){if(hintOff)return;hintOff=true;hint.style.opacity=0;ls.set('tch-hint','1');setTimeout(()=>hint.hidden=true,300)}
  wrap.addEventListener('pointerdown',e=>{ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(ptrs.size===1){start={x:e.clientX,y:e.clientY,cx:cam.x,cy:cam.y};moved=0;captured=false;suppress=false}
    if(ptrs.size===2){const [a,b]=[...ptrs.values()],r=wrap.getBoundingClientRect();pinch={d:Math.hypot(a.x-b.x,a.y-b.y),k:cam.k,wx:((a.x+b.x)/2-r.left-cam.x)/cam.k,wy:((a.y+b.y)/2-r.top-cam.y)/cam.k};suppress=true;try{wrap.setPointerCapture(e.pointerId)}catch(_){}}});
  wrap.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pinch&&ptrs.size===2){const [a,b]=[...ptrs.values()],r=wrap.getBoundingClientRect();const k=Math.max(.3,Math.min(2,pinch.k*Math.hypot(a.x-b.x,a.y-b.y)/pinch.d));cam.k=k;cam.x=(a.x+b.x)/2-r.left-pinch.wx*k;cam.y=(a.y+b.y)/2-r.top-pinch.wy*k;applyCam();killHint();return}
    if(start&&ptrs.size===1){const dx=e.clientX-start.x,dy=e.clientY-start.y;moved=Math.max(moved,Math.hypot(dx,dy));
      if(moved>7){if(!captured){captured=true;suppress=true;try{wrap.setPointerCapture(e.pointerId)}catch(_){}wrap.classList.add('drag');killHint()}cam.x=start.cx+dx;cam.y=start.cy+dy;applyCam()}}});
  const end=e=>{ptrs.delete(e.pointerId);if(ptrs.size<2)pinch=null;if(!ptrs.size){start=null;wrap.classList.remove('drag')}};
  wrap.addEventListener('pointerup',end);wrap.addEventListener('pointercancel',end);
  wrap.addEventListener('click',e=>{if(suppress){e.stopPropagation();e.preventDefault();suppress=false;return}const c=e.target.closest('.sn');if(c){killHint();openSheet(c.dataset.id)}},true);
  wrap.addEventListener('wheel',e=>{e.preventDefault();const r=wrap.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;
    const k=Math.max(.3,Math.min(2,cam.k*Math.exp(-e.deltaY*(e.ctrlKey?.01:.0016))));const wx=(px-cam.x)/cam.k,wy=(py-cam.y)/cam.k;cam.k=k;cam.x=px-wx*k;cam.y=py-wy*k;applyCam()},{passive:false});
})();

/* ---------- Sheet ---------- */
const sheet=$('sheet'),scrim=$('scrim');
let sheetKind=null;
function showSheet(html,tall){sheet.innerHTML='<div class="grab"></div>'+html;sheet.classList.toggle('tall',!!tall);sheet.classList.add('show');scrim.classList.add('show');const x=sheet.querySelector('.x');if(x)x.onclick=closeSheet}
function closeSheet(){sheet.classList.remove('show');scrim.classList.remove('show');sheetKind=null;if(selected){selected=null;renderBranch()}}
scrim.onclick=closeSheet;
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if($('lvup').classList.contains('show'))$('lvup').classList.remove('show');else if(sheet.classList.contains('show'))closeSheet()}});
function openSheet(id){
  sheetKind='skill';const prevSel=selected;selected=id;if(cur&&prevSel!==id)renderBranch();
  const s=BYID[id],b=BRM[s.b],stt=status(id);
  const prereq=s.p.map(p=>BYID[p]),kids=s.kids.map(k=>BYID[k]);
  const logs=state.log.filter(l=>l.id===id).slice().reverse(),pr=bestOf(id);
  const yt='https://www.youtube.com/results?search_query='+encodeURIComponent(s.n+' tutorial progression calisthenics');
  const isGoal=state.goals.includes(id);
  showSheet(`
  <div class="sheethead gut">
    <div><div class="ey" style="color:${b.c}">${esc(b.n)} · Tier ${ROM[s.t]} ${TIERN[s.t]}</div><h4>${esc(s.n)}</h4></div>
    <button class="x" aria-label="Close">×</button>
  </div>
  <div class="sheetbody gut">
    <div class="rewards"><span>Master <b>+${XPT[s.t]} XP</b></span><span>Log <b>+${XP_LOG}</b></span><span>New PR <b>+${XP_PR}</b></span><span>Training day <b>+${XP_DAY}</b></span></div>
    ${stt==='locked'?`<div class="tip"><b style="color:var(--dim)">Locked</b>Master ${prereq.filter(p=>st(p.id)!==2).map(p=>esc(p.n)).join(' and ')} first. Already have this skill? Mark it below anyway.</div>`:''}
    <div class="seg" role="group" aria-label="Status">
      <button data-s="0" aria-pressed="${st(id)===0}">Not started</button>
      <button data-s="1" aria-pressed="${st(id)===1}">Training</button>
      <button data-s="2" aria-pressed="${st(id)===2}">Mastered</button>
    </div>
    <div class="std"><b>${esc(s.std)}</b><span>Hit this with clean form, then mark it Mastered.</span></div>
    <div><h3>Log today's best set ${pr!==null?`<em>PR ${pr} ${UNITS[s.u]}</em>`:''}</h3>
      <form class="logform" id="logf"><input id="logv" type="number" inputmode="decimal" step="any" min="0" placeholder="${s.u==='s'?'Seconds':s.u==='kg'?'Added kg':s.u==='cm'?'cm to floor':'Reps'}" aria-label="Best ${UNIT[s.u]}"><span class="u">${UNIT[s.u]}</span><button class="btn pri" type="submit">Log</button></form>
      ${logs.length?`<div class="hist">${logs.slice(0,5).map(l=>`<div class="${l.v===pr?'pr':''}"><span>${l.d}</span><b>${l.v} ${UNIT[s.u]}${l.v===pr?' · PR':''}</b></div>`).join('')}</div>`:''}
    </div>
    <div><h3>How to get there</h3><ol class="guide">${s.g.map(x=>`<li><span>${esc(x)}</span></li>`).join('')}</ol></div>
    <div class="tips">
      <div class="tip"><b style="color:var(--ok)">Key cue</b>${esc(s.cue)}</div>
      <div class="tip"><b style="color:var(--bad)">Common mistake</b>${esc(s.mis)}</div>
    </div>
    <a class="vid" href="${yt}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4" fill="#ff3d3d"/><path d="M10 9v6l5-3z" fill="#fff"/></svg><div>Watch ${esc(s.n)} tutorials<span>Opens YouTube search for this skill</span></div></a>
    <button class="goalbtn" id="goalbtn" aria-pressed="${isGoal}">${isGoal?'★ Goal · tap to remove':'☆ Make this a goal'}</button>
    ${prereq.length?`<div><h3>Requires</h3><div class="links">${prereq.map(p=>`<button data-go="${p.id}"><span class="dot" style="border-color:${BRM[p.b].c};background:${st(p.id)===2?BRM[p.b].c:'transparent'}"></span>${esc(p.n)}</button>`).join('')}</div></div>`:''}
    ${kids.length?`<div><h3>Unlocks</h3><div class="links">${kids.map(p=>`<button data-go="${p.id}"><span class="dot" style="border-color:${BRM[p.b].c}"></span>${esc(p.n)}</button>`).join('')}</div></div>`:''}
  </div>`);
  sheet.querySelectorAll('.seg button').forEach(bt=>bt.onclick=e=>setStatus(id,+bt.dataset.s,e));
  $('goalbtn').onclick=()=>toggleGoal(id);
  sheet.querySelectorAll('[data-go]').forEach(bt=>bt.onclick=()=>{const t=bt.dataset.go;if(curView!=='map')showView('map');openBranch(BYID[t].b,t);openSheet(t)});
  $('logf').onsubmit=e=>{e.preventDefault();const v=parseFloat($('logv').value);if(!(v>=0))return;
    const isPr=pr!==null&&better(s,v,pr),firstToday=!state.log.some(l=>l.id===id&&l.d===today()),newDay=!state.log.some(l=>l.d===today());
    state.log.push({id,v,d:today()});if(state.log.length>800)state.log=state.log.slice(-800);
    if(st(id)===0)state.st[id]=1;
    const gain=(firstToday?XP_LOG:0)+(isPr?XP_PR:0)+(newDay?XP_DAY:0);
    if(isPr){const r=$('logf').getBoundingClientRect();burst(r.left+r.width/2,r.top,b.c)}
    toast(isPr?`New PR <em>+${gain} XP</em>`:`Logged${gain?` <em>+${gain} XP</em>`:''}`,`${s.n}: ${v} ${UNIT[s.u]}${newDay?' · training day counted':''}`,isPr?'star':'check');
    commit()};
}
function setStatus(id,v,ev){const was=st(id);if(v===0)delete state.st[id];else state.st[id]=v;
  if(v===2){if(!state.md[id])state.md[id]=today()}else delete state.md[id];
  if(v===2&&was!==2){const s=BYID[id];const newly=s.kids.filter(k=>unlocked(k)&&st(k)!==2).map(k=>BYID[k].n);
    toast(`Mastered <em>+${XPT[s.t]} XP</em>`,newly.length?'Unlocked: '+newly.slice(0,3).join(', '):s.n,'bolt');
    const r=ev&&ev.currentTarget?ev.currentTarget.getBoundingClientRect():{left:innerWidth/2,top:innerHeight/2,width:0,height:0};burst(r.left+r.width/2,r.top+r.height/2,BRM[s.b].c)}
  commit()}
function toggleGoal(id){const i=state.goals.indexOf(id);if(i>=0)state.goals.splice(i,1);else{state.goals.push(id);if(state.goals.length>3){const r=state.goals.shift();toast('Goal set',`Replaced ${BYID[r].n} (max 3)`,'target')}}commit()}

/* ---------- Search ---------- */
$('searchbtn').onclick=openSearch;
function statusPill(id){const s=status(id);return s==='done'?'<span class="pill done">mastered</span>':s==='train'?'<span class="pill train">training</span>':s==='locked'?'<span class="pill">locked</span>':'<span class="pill">ready</span>'}
function openSearch(){sheetKind='search';
  showSheet(`<div class="sheethead gut"><div style="flex:1"><div class="ey" style="color:var(--dim)">${SK.length} skills</div><h4>Find a skill</h4></div><button class="x" aria-label="Close">×</button></div>
  <div class="sheetbody gut" style="gap:12px"><input class="sinput" id="sq" type="search" placeholder="Muscle-up, handstand, lever…" autocomplete="off"><div class="list" id="sres"></div></div>`,true);
  const q=$('sq'),res=$('sres');
  const draw=()=>{const t=q.value.trim().toLowerCase();const hits=SK.filter(s=>!t||s.n.toLowerCase().includes(t)||BRM[s.b].n.toLowerCase().includes(t)).slice(0,40);
    res.innerHTML=hits.map(s=>rowHTML(s,statusPill(s.id))).join('')||'<p class="empty">No skill matches that. Try a shorter word.</p>';
    res.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{const id=b.dataset.open;openBranch(BYID[id].b,id);openSheet(id)})};
  q.oninput=draw;draw();setTimeout(()=>{try{q.focus({preventScroll:true})}catch(e){}},280)}

/* ---------- Tabs ---------- */
let curView='map';
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{if(b.dataset.v==='map'&&curView==='map'&&cur)openTree();else showView(b.dataset.v)});
function showView(v){curView=v;document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.v===v));
  ['map','quest','log','plan'].forEach(x=>$(x+'view').hidden=x!==v);window.sparksOn&&sparksOn(v==='map'&&!cur);renderView()}
function renderView(){if(curView==='quest')renderQuests();if(curView==='log')renderLog();if(curView==='plan')renderPlan()}
function rowHTML(s,right){const stt=status(s.id),c=BRM[s.b].c;
  return `<button class="row" data-open="${s.id}"><span class="dot" style="border-color:${stt==='train'?'var(--train)':c};background:${stt==='done'?c:'transparent'}"></span><span style="min-width:0"><div class="nm">${esc(s.n)}</div><div class="meta">${esc(BRM[s.b].n)} · Tier ${ROM[s.t]} · ${esc(s.std)}</div></span><span class="rt">${right||''}</span></button>`}
function wireOpen(root){root.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>openSheet(b.dataset.open))}

function renderQuests(){
  const v=$('questview'),T=totals(),wk=weekKey(),qs=questsFor(wk,T.A);
  const daysLeft=7-((new Date().getDay()+6)%7);
  const goals=state.goals.map(g=>{const path=pathTo(g),done=path.filter(id=>st(id)===2).length;return{g,path,done,nxt:path.filter(id=>st(id)!==2&&unlocked(id))}});
  const got=ACH.filter(a=>state.ach[a.id]).length;
  v.innerHTML=`<div class="page gut">
   <div><h2>Weekly quests</h2><p class="sub">New quests every Monday. ${daysLeft} day${daysLeft>1?'s':''} left this week.</p></div>
   <div class="quests">${qs.map(q=>`<div class="quest ${q.done?'done':''}"><div class="qi">${gi(q.done?'check':q.ic,22)}</div><div><div class="qn">${q.n}</div><div class="qd">${q.d}</div><div class="qb"><i style="width:${Math.min(100,q.p/q.m*100)}%"></i></div></div><div class="qx">+${q.xp} XP<small>${q.done?'done':Math.min(q.p,q.m)+' / '+q.m}</small></div></div>`).join('')}</div>
   <div><h3>Goals</h3>${goals.length?`<div style="display:flex;flex-direction:column;gap:10px">${goals.map(x=>{const s=BYID[x.g];return `<div class="goalcard"><div class="goalhead"><strong>${esc(s.n)}</strong><span class="pill ${x.done===x.path.length?'done':''}">${x.done} of ${x.path.length} steps</span></div>
     <div class="steps">${x.path.map(id=>`<i class="${st(id)===2?'d':st(id)===1?'t':''}" title="${esc(BYID[id].n)}"></i>`).join('')}</div>
     ${x.nxt.length?`<div class="nextup">${x.nxt.map(id=>`<button data-open="${id}"><span class="dot" style="border-color:${st(id)===1?'var(--train)':BRM[BYID[id].b].c}"></span>${esc(BYID[id].n)}</button>`).join('')}</div>`:`<p class="sub" style="margin:0;color:var(--xp)">Goal reached.</p>`}</div>`}).join('')}</div>`:`<p class="empty">No goals yet. Open any skill and tap “Make this a goal”. Up to three.</p>`}</div>
   <div><h3>Achievements <em>${got} / ${ACH.length}</em></h3><div class="achs">${ACH.map(a=>{const g=state.ach[a.id];return `<div class="ach ${g?'got':''}"><span class="ai">${gi(a.ic,20)}</span><b>${a.n}</b><span>${a.d}</span><small>${g?'Unlocked '+g:'+'+a.xp+' XP'}</small></div>`}).join('')}</div></div>
   <div><h3>Where your XP came from</h3><div class="stats"><div class="stat"><b>${T.mx}</b><span>skills mastered</span></div><div class="stat"><b>${T.lx}</b><span>training log</span></div><div class="stat"><b>${T.qx+T.ax}</b><span>quests & badges</span></div></div></div>
  </div>`;wireOpen(v);
}

function renderLog(){
  const v=$('logview'),A=analyze(),ws=weekKey(),week=[...Array(7)].map((_,i)=>addDays(ws,i));
  const thisWeek=week.filter(d=>A.days.has(d)).length,streak=weekStreak(A.days);
  const prSet=new Set(A.prs.map(l=>l.id+'|'+l.d+'|'+l.v));
  const byDay={};A.sorted.slice().reverse().forEach(l=>{(byDay[l.d]=byDay[l.d]||[]).push(l)});
  const dayKeys=Object.keys(byDay).sort().reverse().slice(0,14);
  const dn=['M','T','W','T','F','S','S'];
  const fmt=d=>new Date(d+'T12:00').toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short'});
  v.innerHTML=`<div class="page gut">
   <div><h2>Training log</h2><p class="sub">Target: 3 days a week. Every day you log a set counts as a training day (+${XP_DAY} XP).</p></div>
   <div class="week">${week.map((d,i)=>`<div><i class="${A.days.has(d)?'on':''} ${d===today()?'today':''}" style="color:#ff9d2e">${A.days.has(d)?gi('flame',20):''}</i>${dn[i]}</div>`).join('')}</div>
   <div class="stats"><div class="stat"><b>${thisWeek}<span style="font-size:17px;color:var(--dim)">/3</span></b><span>this week</span></div><div class="stat"><b>${streak}</b><span>week streak</span></div><div class="stat"><b>${A.prs.length}</b><span>personal records</span></div></div>
   ${dayKeys.length?dayKeys.map(d=>`<div><h3>${fmt(d)}</h3><div class="list">${byDay[d].map(l=>{const s=BYID[l.id],pr=prSet.has(l.id+'|'+l.d+'|'+l.v);return rowHTML(s,`<b style="color:${pr?'var(--xp)':'var(--chalk)'}">${l.v} ${UNITS[s.u]}</b>${pr?'<br>PR':''}`)}).join('')}</div></div>`).join(''):'<p class="empty">No sessions yet. Open a skill you trained today, enter your best set and tap Log.</p>'}
  </div>`;wireOpen(v);
}

const DAYS=[
 {n:'Day A',t:'Pull + muscle-up',br:['pull','mu','fl','bl'],extra:'Finish with 3 × 30 s dead hangs or false grip hangs.'},
 {n:'Day B',t:'Push + handstand',br:['push','hs','pl','flag'],extra:'Start with 10 minutes of handstand practice while fresh.'},
 {n:'Day C',t:'Legs, core + mobility',br:['legs','core','mob'],extra:'End with 10 minutes of pancake and pike stretching.'},
];
function renderPlan(){
  const v=$('planview'),gs=goalSet();
  const pick=brs=>{const pool=SK.filter(s=>brs.includes(s.b)&&st(s.id)!==2);const tr=pool.filter(s=>st(s.id)===1);const op=pool.filter(s=>st(s.id)!==1&&unlocked(s.id)).sort((a,b)=>(gs.has(b.id)-gs.has(a.id))||a.t-b.t);return [...tr,...op].slice(0,4)};
  v.innerHTML=`<div class="page gut">
   <div><h2>Three-day plan</h2><p class="sub">Built from what you're training and the next steps to your goals. It updates as you progress. Rest a day between sessions.</p></div>
   ${DAYS.map(d=>{const items=pick(d.br);return `<div class="day"><header><strong>${d.n}</strong><span class="pill">${d.t}</span></header>
     <ol><li>Warm-up: 5 min easy cardio, wrist circles, scapular pull-ups and push-ups.</li>
     ${items.map(s=>`<li><button data-open="${s.id}">${esc(s.n)}</button> <span>· ${s.u==='s'?'5 quality holds':'4 sets, stop 1–2 reps short of failure'} · goal ${esc(s.std)}</span></li>`).join('')}
     <li>${d.extra}</li></ol></div>`}).join('')}
  </div>`;wireOpen(v);
}

/* ---------- Account ---------- */
$('acct').onclick=openAccount;
function openAccount(){sheetKind='acct';const u=Sync.user,on=Sync.mode==='account';
  let top;
  if(!Sync.configured)top=`<div class="acctline"><div><b>Saved on this device</b><span>Cloud sync is not set up yet. Add your Firebase config to <code>js/firebase-config.js</code> (see the README) to sign in with Google and sync between phone and computer.</span></div></div>`;
  else if(on)top=`<div class="acctline">${u&&u.photo?`<img src="${esc(u.photo)}" alt="" referrerpolicy="no-referrer">`:''}<div><b>${esc(u&&u.name||'Signed in')} · synced</b><span>Progress, XP and badges follow your Google account to every device.</span></div></div><div class="btnrow"><button class="btn" id="signout">Sign out</button></div>`;
  else top=`<div class="acctline"><div><b>Saved on this device</b><span>Sign in to back up your progress and use the same tree on your phone and computer.</span></div></div><div class="btnrow"><button class="btn pri" id="signin">Sign in with Google</button></div>`;
  showSheet(`<div class="sheethead gut"><div style="flex:1"><div class="ey" style="color:var(--dim)">Account</div><h4>Phone & sync</h4></div><button class="x" aria-label="Close">×</button></div>
  <div class="sheetbody gut">
    <div style="display:flex;flex-direction:column;gap:12px">${top}</div>
    <div><h3>Install on your phone</h3><ol class="how">
      <li>Open the app's web address on your phone.</li>
      <li><b>iPhone (Safari):</b> Share → <b>Add to Home Screen</b>.<br><b>Android (Chrome):</b> ⋮ → <b>Install app</b>.</li>
      <li>Open it from the icon and sign in with Google once. It works offline too.</li></ol></div>
    <div><h3>Backup</h3><div class="btnrow"><button class="btn" id="exp">Copy backup</button><button class="btn" id="imp">Restore from backup</button></div>
      <div id="bk" hidden style="margin-top:10px"><textarea id="bkt" aria-label="Backup text"></textarea><div class="btnrow" style="margin-top:8px"><button class="btn pri" id="bkgo">Restore</button><button class="btn" id="bkno">Cancel</button></div></div></div>
    <div><h3>Reset</h3><button class="btn warn" id="rst">Reset all progress</button>
      <div id="rs" hidden class="tip" style="margin-top:10px">This clears every status, goal, log entry, quest and badge${on?' on all your devices':''}.<div class="btnrow" style="margin-top:8px"><button class="btn warn" id="rsyes">Yes, reset everything</button><button class="btn" id="rsno">Keep my progress</button></div></div></div>
  </div>`);
  const si=$('signin'),so=$('signout');
  if(si)si.onclick=async()=>{try{await Sync.signIn()}catch(e){toast('Sign-in failed',e.code||'Try again','bolt')}};
  if(so)so.onclick=async()=>{await Sync.signOut();toast('Signed out','Progress stays saved on this device','check')};
  $('exp').onclick=async()=>{const txt=JSON.stringify(state);try{await navigator.clipboard.writeText(txt);toast('Backup copied','Paste it somewhere safe','check')}catch(e){$('bk').hidden=false;$('bkgo').hidden=true;const t=$('bkt');t.value=txt;t.select()}};
  $('imp').onclick=()=>{$('bk').hidden=false;$('bkgo').hidden=false;$('bkt').value='';$('bkt').focus()};
  $('bkno').onclick=()=>$('bk').hidden=true;
  $('bkgo').onclick=()=>{try{const o=JSON.parse($('bkt').value);if(!o||typeof o.st!=='object')throw 0;state=normalize(o);syncRewards();commit(true);toast('Progress restored','','check')}catch(e){toast('That backup could not be read','Paste the full text you copied','bolt')}};
  $('rst').onclick=()=>$('rs').hidden=false;$('rsno').onclick=()=>$('rs').hidden=true;
  $('rsyes').onclick=()=>{state=normalize({});commit(true);closeSheet();toast('Progress reset','','check')};
}
function paintAcct(){const a=$('acct'),on=Sync.mode==='account';a.classList.toggle('on',on);
  const u=Sync.user;if(on&&u&&u.photo){if(!a.querySelector('img'))a.innerHTML=`<img src="${esc(u.photo)}" alt="" referrerpolicy="no-referrer">`}
  else if(a.querySelector('img'))a.innerHTML='<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>'}

/* ---------- Persistence ---------- */
let dirty=false,saving=false,saveT=null;
function repaint(){const l=paintHud();paintTree();if(cur)renderBranch();renderView();
  if(sheet.classList.contains('show')){if(sheetKind==='skill'&&selected){const y=sheet.querySelector('.sheetbody')?.scrollTop||0;openSheet(selected);const b=sheet.querySelector('.sheetbody');if(b)b.scrollTop=y}else if(sheetKind==='acct')openAccount()}
  paintAcct();return l}
function commit(silent){
  const got=silent?[]:syncRewards();
  got.forEach(g=>g.kind==='ach'?toast(`Badge: ${g.a.n} <em>+${g.a.xp} XP</em>`,g.a.d,'trophy'):toast(`Quest done <em>+${g.q.xp} XP</em>`,g.q.n,'trophy'));
  ls.set(LSK,JSON.stringify(state));dirty=true;
  const l=repaint();
  if(!silent&&curLvl!==null&&l>curLvl)setTimeout(()=>levelUp(l),got.length?600:250);
  curLvl=l;
  clearTimeout(saveT);saveT=setTimeout(flush,600)}
async function flush(){if(Sync.mode!=='account'||saving)return;saving=true;const snap=JSON.stringify(state);try{await Sync.save(JSON.parse(snap));if(JSON.stringify(state)===snap)dirty=false}catch(e){console.warn(e)}saving=false;if(dirty&&Sync.mode==='account'){clearTimeout(saveT);saveT=setTimeout(flush,600)}}

syncRewards();curLvl=repaint();
Sync.start({
  first(remote){
    if(remote)state=normalize(remote);
    const got=syncRewards();ls.set(LSK,JSON.stringify(state));curLvl=repaint();
    if(!remote||got.length){dirty=true;flush()}
  },
  remote(remote){if(dirty||saving)return;state=normalize(remote);ls.set(LSK,JSON.stringify(state));curLvl=repaint()},
  status(){repaint()}
});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
