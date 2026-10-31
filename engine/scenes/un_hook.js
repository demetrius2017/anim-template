/* un_hook / un_final — the mirrored first and last seconds of «Сеть внутри сети».
 *
 * SCENES.un_hook : p.s="sh",  p.mode="hook",   p.K absolute cues hook, h_fades,
 *                  h_why, h_you, h_build, h_chatgpt, h_answer, hook_cut.
 * SCENES.un_final: p.s="sf6b", p.mode="whole", p.K absolute cues whole_part,
 *                  cosmic_mind, needed, needed_her, f6b_end: the crowned tower of
 *                  SCENES.un_towers.body(t,K,"crown") shrinks into node 0 of the web,
 *                  then the web burns out by the hook's own wave, one point stays and
 *                  the hook's «зачем?» rises over it.
 *                  p.s="sf7", p.mode="answer", p.K absolute cues f7, answer_word, end:
 *                  takes that point as it is; without K.whole_part it rises from black.
 *                  From K.f7 a tiny attention arc leaves the point, circles it and closes
 *                  on K.answer_word: «зачем?» leaves, the word takes its place, light spreads.
 * Exports: SCENES.un_hook.body(t,K,mode), SCENES.un_final.body(t,K,mode) (raw SVG,
 * no wrap, no black), SCENES.un_final.point(t,K) -> {x,y,r} screen point «ты».
 * Runtime camera must stay neutral {z0:1,z1:1,drift:0,kicks:0}: all motion is local.
 *
 * web(tau,light,opts) is one set of nodes under one camera for both scenes. tau is
 * the drift phase: t in the hook, t-K.end in answer, so the last frame runs straight
 * into frame 0 when the film loops; in whole K.needed falls on the hook's K.h_fades
 * phase, so the burn-out is the hook's picture. light(i) is 0…1 per node.
 *
 * The tower end pose is measured, not guessed: EDGE and ROWS below are the edge lines
 * and floor rows of the source film's frame 6 (t=.2 s), halved to the logical 360×640,
 * and the last frames of the hook follow the source's own push-in into that frame.
 * No image of the source is loaded. No state between frames, no u/d clocks.
 * Without K both scenes still run on the measured defaults, for scene_test.py.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q, n=v=>v.toFixed(2);
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
  const ramp=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const H=i=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v);};
  const POINT={x:180,y:200};
  const FPS=30;

  // On the tower the captions get the dark edge of the source film's subtitles.
  // Scoped to frames that contain #unh-tower, so nothing else changes.
  // The answer is said once and shown once, by the scene, on the sound of the word: the
  // caption page «Ты — её осознанность.» never shows its fourth word and leaves on that
  // word. Markers live only in un_final, so no other caption page is touched. If the
  // page is ever split in story.py both rules simply stop matching anything.
  const css=document.createElement('style');
  css.textContent='#root:has(#unh-tower) #cap .w,#root:has(#unh-tower) #cap .w.on{text-shadow:0 0 2px #000,0 0 3px #000,0 0 7px #000,0 0 12px #000c!important}'+
    '#root:has(#unh-cap-word) #cap .w:nth-of-type(4):last-of-type{display:none}#root:has(#unh-cap-off) #cap{visibility:hidden}';
  document.head.appendChild(css);

  /* ---------------- cosmic web: same nodes, same camera ---------------- */
  // Jittered grid, so the web reaches the frame edges instead of forming a disc.
  const NX_WEB=7,NY_WEB=8,NODES=[[0,0,0]];
  for(let j=0;j<NY_WEB;j++)for(let i=0;i<NX_WEB;i++){
    const id=j*NX_WEB+i+1,x=(i+.5)/NX_WEB*2-1,y=(j+.5)/NY_WEB*2-1;
    if(Math.hypot(x,y)<.16)continue;
    NODES.push([Math.max(-150,Math.min(150,x*154+(H(id+40)-.5)*44)),Math.max(-172,Math.min(166,y*168-3+(H(id+90)-.5)*44)),(H(id+140)-.5)*150]);
  }
  // Field stars: each belongs to its nearest node, so the wave passes over them too.
  const STARS=Array.from({length:190},(_,i)=>{
    const v=[(H(i+900)-.5)*344,(H(i+1300)-.5)*352-4,(H(i+1700)-.5)*120];
    let near=0,best=1e9;
    NODES.forEach((p,j)=>{const d=(p[0]-v[0])**2+(p[1]-v[1])**2;if(d<best){best=d;near=j;}});
    return {v,near,r:.26+.42*H(i+2100)**2,a:.2+.5*H(i+2500)};
  });
  const LINKS=[];
  for(let i=0;i<NODES.length;i++){
    const near=NODES.map((p,j)=>({j,d:p.reduce((s,v,k)=>s+(v-NODES[i][k])**2,0)}))
      .filter(p=>p.j!==i).sort((a,b)=>a.d-b.d).slice(0,i===0?6:4);
    for(const p of near)if(!LINKS.some(e=>e[0]===p.j&&e[1]===i))LINKS.push([i,p.j]);
  }
  // Rank by distance from the centre; order[i]=1 for the outermost node.
  const order=(()=>{
    const d=NODES.map((p,i)=>i?Math.hypot(p[0]/170,(p[1]+6)/170)+(H(i+321)-.5)*.1:-1);
    const idx=d.map((_,i)=>i).sort((a,b)=>d[a]-d[b]),o=d.map(()=>0);
    idx.forEach((i,r)=>{o[i]=r/(idx.length-1);});
    return o;
  })();
  const webCamera=tau=>({cx:POINT.x,cy:POINT.y,f:820,distance:820,
    scale:1+.012*Math.sin(tau*.33+.8),
    yaw:-.19+.05*Math.sin(tau*.42+.5),pitch:.13+.03*Math.sin(tau*.31+1.7)});
  const webPoints=tau=>NODES.map((v,i)=>i?v.map((a,k)=>
    a+Math.sin(tau*.47+i*1.7+k*2.1)*2.4):v);
  const a0x=(ia,ib)=>(NODES[ia][0]+NODES[ib][0])/2;   // links by the frame edge bow less
  function web(tau,light,o={}){
    const U=UN,cam=webCamera(tau),P=webPoints(tau),pp=v=>U.project(v,cam);
    const L=NODES.map((_,i)=>clamp(light(i)));
    let lines='',glow='',dust='',soft='',sparks='',cores='';
    LINKS.forEach(([ia,ib],e)=>{
      const la=L[ia],lb=L[ib];
      if(la<.004&&lb<.004)return;
      const a=P[ia],b=P[ib],bend=(H(e+701)-.5)*30*(1-.7*clamp((Math.abs(a0x(ia,ib))-110)/45));
      const curve=(q,off=0)=>{
        const arch=Math.sin(q*Math.PI);
        return pp([mix(a[0],b[0],q)+arch*(bend+off),mix(a[1],b[1],q)+arch*bend*.45,mix(a[2],b[2],q)+arch*bend*.6]);
      };
      const op=.30+.22*H(e+79);
      // A wave crosses the thread: each short piece takes the light of its place.
      const pieces=Math.abs(la-lb)<.01?1:6;
      for(let c=0;c<pieces;c++){
        const path=Array.from({length:Math.ceil(12/pieces)+1},(_,j)=>curve((c+j/Math.ceil(12/pieces))/pieces));
        const l=mix(la,lb,(c+.5)/pieces);
        lines+=U.polyline(path,{width:.48,opacity:n(op*l)});
        glow+=U.polyline(path,{width:2.2,opacity:n(op*.5*l)});
      }
      for(let j=0;j<21;j++){
        const q=(j+.5)/21,v=curve(q,(H(e*19+j*3+11)-.5)*7),h=H(e*67+j+18);
        const tw=.74+.26*Math.sin(tau*1.1+j+e)**2,l=mix(la,lb,q);
        const dot=`<circle cx="${n(v.x)}" cy="${n(v.y)}" r="${n(.3+.34*h)}" opacity="${n((.3+.42*h)*tw*l)}"/>`;
        dust+=dot;if(j%4===0)soft+=dot;
      }
      const q=(((tau*.2+H(e+174))%1)+1)%1,v=curve(q),l=mix(la,lb,q);
      if(e%2===0)sparks+=U.sphere(v.x,v.y,.8,{opacity:n(.8*l*Math.sin(Math.PI*q)**2),glow:1.1,highlight:false});
    });
    let stars='';
    STARS.forEach((v,i)=>{
      const l=L[v.near];
      if(l<.004)return;
      const p=pp(v.v);
      stars+=`<circle cx="${n(p.x)}" cy="${n(p.y)}" r="${n(v.r)}" opacity="${n(v.a*l*(.72+.28*Math.sin(tau*1.4+i)**2))}"/>`;
    });
    const ordered=P.map((v,i)=>({...pp(v),i})).sort((a,b)=>b.z-a.z);
    for(const p of ordered){
      const l=L[p.i];
      if(l<.004)continue;
      const h=H(p.i+51),turn=(H(p.i+9)-.5)*1.1,hub=p.i===0||H(p.i+77)>.74;
      const r=(p.i===0?4.2:hub?3+1.3*h:1.1+1.5*h)*Math.sqrt(p.s)*(.45+.55*l);
      let cluster='';
      for(let j=0;j<26;j++){
        const a=j*2.399963+p.i*.7,rad=2+10.5*Math.sqrt((j+.5)/26);
        const px=Math.cos(a)*rad*p.s,py=Math.sin(a)*rad*.44*p.s;
        const x=p.x+px*Math.cos(turn)-py*Math.sin(turn),y=p.y+px*Math.sin(turn)+py*Math.cos(turn);
        cluster+=`<circle cx="${n(x)}" cy="${n(y)}" r="${n(.3+.32*H(j+p.i*31))}" fill="#fff" opacity="${n((.44+.4*h)*l)}"/>`;
      }
      cluster+=U.sphere(p.x,p.y,r,{opacity:n((.74+.26*h)*l),glow:hub?1.5:1.1});
      cluster+=`<ellipse cx="${n(p.x)}" cy="${n(p.y)}" rx="${n((hub?22:13)*p.s)}" ry="${n((hub?8.4:5)*p.s)}" transform="rotate(${n(turn*57.3)} ${n(p.x)} ${n(p.y)})" fill="url(#un-halo)" opacity="${n(.55*l)}"/>`;
      cores+=cluster;
    }
    return `${UN.bokeh(tau,{seed:48,count:23,opacity:.6*(o.bokeh??1)})}<g filter="url(#un-soft)" opacity=".62">${glow}</g>${lines}<g filter="url(#un-soft)" fill="#fff" opacity=".5">${soft}</g><g fill="#fff">${stars}${dust}</g>${cores}${sparks}`;
  }

  // The one point: «ты» in the hook and in the finale.
  function dot(x,y,r,alpha=1){
    return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r*7)}" fill="url(#un-halo)" opacity="${n(.9*alpha)}"/>`+
      UN.sphere(x,y,r,{opacity:n(alpha),glow:1.5,highlight:false});
  }
  const pulse=t=>2.5+.55*Math.sin(t*3.1)**2;
  // The film's question over the point: one line for the hook and for the payoff at the end.
  const ask=(a,leave)=>UN.italic(POINT.x,POINT.y-50-10*leave,'зачем?',{size:23,anchor:'middle',opacity:n(.93*a)});
  // Burn-out from the edges to the centre, node by node: the hook and the finale share it.
  function burnOut(t,first,why){
    const dur=.15,lastStart=why-dur*.6;
    return i=>i===0?1-ramp(t,lastStart,why+.12):1-ease((t-mix(lastStart,first,order[i]))/dur);
  }

  /* ---------------- tower: measured on the source frame ---------------- */
  // Corner order L,N,R,F: left, lower middle, right, upper middle of each plate.
  const EDGE=[[125.5,-.1083],[148,-.08],[216,.0083],[196,-.0183]];
  const KMIN=-3,ROWS=[[1608,1632,1618],[1432,1456,1443],[1272,1295,1283],
    [1116.7,1138.2,1127.3],[978,1004.1,989.4],[855.8,885.7,867.1],[748.5,777.7,759.8],
    [651.1,686.1,664.2],[565.6,598.6,576.7],[489.7,518.8,496.8],[418.9,447.8,426],
    [353.3,383.7,361.4],[295.2,324.3,302.2],[241.2,270.3,248.3],[192.1,220.5,198.7],
    [147,175.1,153.2],[105.3,131.9,112.8],[67.8,93.8,72.4],[32.5,56.5,36.3],
    [-.5,22,3],[-30.6,-9,-27],[-58.6,-38,-55],[-84.6,-65,-81],[-108.8,-90,-105],
    [-131.3,-113,-128],[-152.2,-135,-149]];
  const SPANS=[12,12,11.5,10.9,9.5,8.4,6.3,6,5,5,4.8,4.5,4.2,3.9,3.6,3.3,3,2.8,2.6];
  const KMAX=KMIN+ROWS.length-1;
  const spanOf=k=>SPANS[Math.min(k-KMIN,SPANS.length-1)]; // junction loop stack, logical px
  const LOOPS=[0,.26,.66,1];                              // its four outlines
  const PLATE=1.04;                                       // plates overhang the uprights
  function corner(k,off,c){
    const r=ROWS[k-KMIN],y=(c===3?r[0]+r[2]-r[1]:r[c])/2+off;
    return [EDGE[c][0]+EDGE[c][1]*(y-500),y];
  }
  const corners=(k,off)=>[0,1,2,3].map(c=>corner(k,off,c));
  const lerp2=(a,b,q)=>[mix(a[0],b[0],q),mix(a[1],b[1],q)];
  const plan=(C,a,b)=>lerp2(lerp2(C[0],C[3],a),lerp2(C[1],C[2],a),b);
  const fmt=p=>`${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  function loop(C0){
    const m=[0,1].map(j=>C0.reduce((v,p)=>v+p[j]/4,0)),C=C0.map(v=>lerp2(m,v,PLATE));
    let d='';
    for(let i=0;i<4;i++){
      const c=C[i],p=C[(i+3)%4],q=C[(i+1)%4];
      // L-N and R-F are the short sides: same radius is a larger share of them.
      d+=`${i?'L':'M'}${fmt(lerp2(c,p,i%2?.1:.22))}Q${fmt(c)} ${fmt(lerp2(c,q,i%2?.22:.1))}`;
    }
    return d+'Z';
  }
  function floorParts(k,p=1){
    const B=corners(k,0),T0=corners(k+1,spanOf(k+1)),T=T0.map((v,i)=>lerp2(B[i],v,p));
    const at=(a,b,h)=>lerp2(plan(B,a,b),plan(T,a,b),h);
    const w=corner(k,0,2)[0]-corner(k,0,0)[0];
    let lines='',faint='',dots='',arch='';
    for(let i=0;i<4;i++)lines+=`M${fmt(B[i])}L${fmt(T[i])}`;
    for(const o of LOOPS.slice(0,2))lines+=loop(corners(k,spanOf(k)*o));
    if(k<KMAX-1)for(const o of LOOPS.slice(2))lines+=loop(T.map(v=>[v[0],v[1]-(1-o)*spanOf(k+1)]));
    const band=`M${fmt(lerp2(B[1],B[0],.12))}L${fmt(B[1])}L${fmt(B[2])}`;
    const haze=`M${fmt(B[0])}L${fmt(B[1])}L${fmt(B[2])}L${fmt(T[2])}L${fmt(T[3])}L${fmt(T[0])}Z`;
    // Plates carry bright specks along their edges, like the source wire.
    for(const o of [spanOf(k)*.26,spanOf(k)]){
      const C=corners(k,o);
      for(let i=0;i<4;i++){
        const a=C[i],b=C[(i+1)%4],m=i%2?13:5;
        for(let j=0;j<m;j++)dots+=`M${fmt(lerp2(a,b,(j+.2+.6*H(k*7+i*31+j+o)) /m))}h0`;
      }
    }
    const NX=10,NZ=5,NY=4;
    for(let l=0;l<NY;l++){
      const h=(l+.75)/(NY+.5);
      if(h>p)continue;
      for(let i=0;i<NX;i++)for(let j=0;j<NZ;j++){
        const a=(i+.5)/NX+(H(k*97+i*13+j*7+l)-.5)*.02,b=(j+.5)/NZ+(H(k*53+i*11+j*5+l)-.5)*.03;
        dots+=`M${fmt(at(a,b,h*.98))}h0`;
      }
      // Each level of the lattice is a faint inset sheet.
      const q=[[.05,.06],[.05,.94],[.95,.94],[.95,.06]].map(v=>at(v[0],v[1],h));
      faint+=`M${fmt(q[0])}L${fmt(q[1])}L${fmt(q[2])}L${fmt(q[3])}Z`;
    }
    for(let i=0;i<8;i++){
      const a=.38+.3*H(k*31+i),b=.3+.4*H(k*17+i+40);
      faint+=`M${fmt(at(a,b,.03))}L${fmt(at(a,b,.97))}`;
    }
    if(p>.45){
      // The arch stands on the upper rear edge of the plate; higher up it flattens.
      const c=lerp2(plan(B,.53,.08),plan(T,.53,.08),.005),hw=.147*w*clamp((p-.45)/.4);
      const ah=hw*Math.max(.82,1.33-.12*Math.max(0,k));
      const arc=(x,u,v)=>`M${n(x-u)} ${n(c[1])}C${n(x-u*.42)} ${n(c[1]-v*1.33)} ${n(x+u*.42)} ${n(c[1]-v*1.33)} ${n(x+u)} ${n(c[1])}`;
      arch+=arc(c[0],hw,ah);
      for(const o of [-.5,-.17,.17,.5])arch+=arc(c[0]+o*hw,.5*hw,.64*ah);
      arch+=`M${n(c[0]-1.1*hw)} ${n(c[1]+.6)}L${n(c[0]+1.1*hw)} ${n(c[1]-.4)}`;
    }
    return {lines,faint,dots,arch,band,haze,top:lerp2(plan(B,.5,.5),plan(T,.5,.5),1),k};
  }
  const FLOOR={};
  const floorDone=k=>FLOOR[k]||(FLOOR[k]=floorParts(k,1));
  // Depth of field of the source: three tiers, upper floors soften and burn brighter.
  // soften, mist and dim are what each tier gains by K.hook_cut, so the sharper render
  // arrives at the source's softer texture. Only light changes there, never geometry.
  const TIERS=[{from:KMIN,to:1,blur:.42,band:0,bandW:0,gain:.66,haze:0,soften:.15,mist:0,dim:0},
    {from:1,to:7,blur:.42,band:0,bandW:0,gain:.9,haze:.015,soften:.2,mist:.02,dim:.04},
    {from:7,to:10,blur:.6,band:.34,bandW:3,gain:1,haze:.07,soften:.2,mist:.05,dim:.12},
    {from:10,to:13,blur:.8,band:.5,bandW:3.8,gain:1,haze:.12,soften:.12,mist:.07,dim:.2},
    {from:13,to:KMAX,blur:1.05,band:.62,bandW:4.6,gain:1,haze:.17,soften:0,mist:0,dim:.3}];
  const towerDefs=m=>'<defs>'+TIERS.map((v,i)=>`<filter id="unh-b${i}" x="-40%" y="-8%" width="180%" height="116%"><feGaussianBlur stdDeviation="${n(v.blur+v.soften*m)}"/></filter>`).join('')+
    '<filter id="unh-g" x="-40%" y="-8%" width="180%" height="116%"><feGaussianBlur stdDeviation="1.7"/></filter></defs>';

  function towerState(t,K){
    const start=K.h_build??2.45,stop=K.h_answer??4.19,cut=K.hook_cut??5.33;
    // +1: the insert opens on source frame 6, so the hook's last frame is source frame 5.
    const last=(Math.ceil(cut*FPS-1e-6)-1)/FPS,u=Math.max(0,(last-t)*FPS+1),x=clamp((t-start)/(stop-start));
    // Source film frames 0…6: nearly still, then an accelerating push-in.
    const s1=1-.043*(1-Math.exp(-u/1.35))-.0013*Math.max(0,u-3);
    const dy=3.95*(1-Math.exp(-u/1.6)),dx=-.18*(1-Math.exp(-u/2));
    // Zoom toward the base while the crown keeps climbing; both curves land softly
    // on the slow push-in, so nothing stops dead at h_answer.
    const S0=.03,s=mix(S0,s1,Math.pow(Math.sin(x*Math.PI/2),1.25));
    // The first quarter second the base stands on the point and only the crown moves:
    // the tower grows up. Then the push-in takes the base down; x=1 is the same pose.
    const hold=Math.min(.45,.25/Math.max(.001,stop-start)),r=clamp((x-hold)/(1-hold));
    const soft=r*r*(3-2*r),land=(1-r*r)*Math.pow(r,1.4)+r*r*soft;
    const by=(corner(KMIN,0,0)[1]+corner(KMIN,0,2)[1])/2,bx=(corner(KMIN,0,0)[0]+corner(KMIN,0,2)[0])/2;
    const baseY=mix(POINT.y,320+dy+s1*(by-320),land),baseX=mix(POINT.x,180+dx+s1*(bx-180),land);
    const cx=baseX-s*(bx-180),cy=baseY-s*(by-320);
    const nf=(KMAX-KMIN)*Math.pow(clamp((t-start-.03)/(stop-.12-start)),1.15);
    return {s,cx,cy,nf,x,u};
  }
  function tower(t,K){
    const g=towerState(t,K);
    if(g.nf<=0)return '';
    const parts=TIERS.map(()=>[]);
    let crown=null;
    for(let k=KMIN;k<KMAX;k++){
      const p=clamp(g.nf-(k-KMIN));
      if(p<=0)break;
      const f=p>=1?floorDone(k):floorParts(k,p);
      parts[TIERS.findIndex(v=>k>=v.from&&k<v.to)].push(f);
      crown=f.top;
    }
    const w=Math.max(.42,.94*Math.pow(g.s,.6))/g.s,detail=ramp(g.s,.14,.4);
    const mist=ramp(t,K.h_answer??4.19,K.hook_cut??5.33);
    const layer=(list,i)=>{
      if(!list.length)return '';
      const v=TIERS[i],sum=key=>list.map(f=>f[key]).join('');
      const lines=sum('lines'),arch=sum('arch'),dots=sum('dots'),faint=sum('faint'),band=sum('band'),haze=sum('haze');
      const fog=v.haze+v.mist*mist,light=v.gain*(1-v.dim*mist);
      return `<path d="${lines}" fill="none" stroke="#fff" stroke-width="${n(w*2.4)}" opacity="${n(.28*v.gain)}" filter="url(#unh-g)"/>`+
        `<g filter="url(#unh-b${i})">`+
        (fog?`<path d="${haze}" fill="#fff" opacity="${n(fog*detail)}"/>`:'')+
        (v.band?`<path d="${band}" fill="none" stroke="#fff" stroke-width="${n(v.bandW)}" stroke-linecap="round" stroke-linejoin="round" opacity="${n(v.band*detail)}"/>`:'')+
        `<path d="${faint}" fill="none" stroke="#fff" stroke-width="${n(.6/Math.max(.3,g.s))}" opacity="${n(.24*detail)}"/>`+
        `<path d="${lines}" fill="none" stroke="#fff" stroke-width="${n(w)}" opacity="${n(.84*light)}" stroke-linejoin="round"/>`+
        `<path d="${arch}" fill="none" stroke="#fff" stroke-width="${n(w*.9)}" opacity="${n(.84*light*detail)}"/>`+
        `<path d="${dots}" fill="none" stroke="#fff" stroke-width="1.05" stroke-linecap="round" opacity="${n(.85*light*detail)}"/>`+
        `</g>`;
    };
    const m=`matrix(${g.s.toFixed(5)} 0 0 ${g.s.toFixed(5)} ${n(g.cx-180*g.s)} ${n(g.cy-320*g.s)})`;
    const head=crown?[g.cx+g.s*(crown[0]-180),g.cy+g.s*(crown[1]-320)]:[POINT.x,POINT.y];
    const layers=parts.map((list,i)=>layer(list,i)).reverse().join('');
    return {svg:`<g id="unh-tower">${towerDefs(mist)}<g transform="${m}">${layers}</g></g>`,head,g};
  }

  /* ---------------- hook ---------------- */
  // Captions lie on the tower: the band y≈395..490 is dimmed to about a quarter, like
  // the base of the towers in un_towers. It lifts after the last word, so the frame
  // at the cut is the measured source frame, untouched.
  const BAND='<defs><linearGradient id="unh-band" gradientUnits="userSpaceOnUse" x1="0" y1="378" x2="0" y2="506">'+
    '<stop stop-color="#000" stop-opacity="0"/><stop offset=".2" stop-color="#000" stop-opacity=".78"/>'+
    '<stop offset=".8" stop-color="#000" stop-opacity=".78"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>';
  function captionBand(t,K){
    const last=(Math.ceil((K.hook_cut??5.33)*FPS-1e-6)-1)/FPS,a=1-ramp(t,K.hook_end??last-.19,last);
    return a<=.003?'':`${BAND}<rect x="0" y="378" width="360" height="128" fill="url(#unh-band)" opacity="${n(a)}"/>`;
  }
  function hookBody(t,K={}){
    const fades=K.h_fades??.61,why=K.h_why??1.29,you=K.h_you??1.97,build=K.h_build??2.45;
    const light=burnOut(t,fades,why);
    const gone=ramp(t,fades,why);
    let s='';
    if(t<you)s+=web(t,light,{bokeh:1-gone});
    const leave=ramp(t,build,build+.34);
    const question=ramp(t,why,why+.22)*(1-leave);
    if(question>.003)s+=ask(question,leave);
    const T=t>build?tower(t,K):'';
    const seedR=mix(4.2,pulse(t),ramp(t,fades,why));
    if(T&&T.svg){
      const fade=ramp(T.head[1],2,40);
      s+=T.svg+captionBand(t,K)+dot(T.head[0],T.head[1],mix(pulse(t),2.3,ramp(t,build,build+.5)),fade);
    }else if(t>=why-.25){
      s+=dot(POINT.x,POINT.y,seedR,ramp(t,why-.25,why));
    }
    return s;
  }
  const stripMask=svg=>svg.replace(' mask="url(#un-bottom-mask)"','');
  SCENES.un_hook=function(u,p={},d,t){
    const K=p.K||{},svg=UN.wrap(hookBody(t,K,p.mode));
    // The tower fills the whole frame, like the source frame it cuts into.
    return t>=(K.h_build??2.45)?stripMask(svg):svg;
  };
  SCENES.un_hook.body=hookBody;
  SCENES.un_hook.web=web;

  /* ---------------- finale ---------------- */
  const WORD={x:180,y:214,size:40};
  const DARK={cy:205,rx:150,ry:32};   // word-shaped shade, gone before the last frame
  // Tight dark edge around the letters: all the word keeps once the shade has left.
  const HALO_DEFS='<defs><filter id="unh-word-edge" filterUnits="userSpaceOnUse" x="10" y="160" width="340" height="80"><feGaussianBlur stdDeviation="1.1"/></filter></defs>';
  const wordText=opacity=>UN.italic(WORD.x,WORD.y,'осознанность',{size:WORD.size,anchor:'middle',opacity:n(opacity)});
  const wordEdge=opacity=>HALO_DEFS+wordText(opacity).replace('fill="#fff"','fill="#000" stroke="#000" stroke-width="2.6" stroke-linejoin="round" filter="url(#unh-word-edge)"');
  // The hook's question is paid off here: it fades in while the last of the web burns out,
  // holds on black in the silence and leaves in .15 s on K.answer_word, as the word arrives.
  function question(t,K){
    if(K.needed_her===undefined||K.f6b_end===undefined)return '';
    const a=ramp(t,K.needed_her,K.f6b_end+.03),word=K.answer_word??1e9,leave=ramp(t,word,word+.15);
    return a*(1-leave)>.003?ask(a*(1-leave),leave):'';
  }
  // Attention closes on itself, tiny: out of the point, clockwise around it, back into it.
  // Same drawing as the arc on «повернулось на себя», from SCENES.un_towers.attention.
  // 500° of turn, not 360°: with both ends on one radius the curve reads as a heart.
  const LOOP_R=26,LOOP=Array.from({length:121},(_,i)=>{
    const q=i/120,a=(500*q-120)*Math.PI/180,r=LOOP_R*Math.max(0,Math.sin(Math.PI*q))**.6;
    return [POINT.x+Math.cos(a)*r,POINT.y+Math.sin(a)*r];
  });
  function selfArc(t,f7,word,alpha){
    if(alpha<=.004)return '';
    const s=SCENES.un_towers?.attention?.(LOOP,UN.smooth((t-f7)/Math.max(.1,word-f7)),2*LOOP_R)||'';
    return s&&`<g opacity="${n(alpha)}">${s}</g>`;
  }
  // Web rises from the centre around the shrinking tower and stands by K.cosmic_mind; node 0
  // is the point itself, so the tower lands on a node and the dot on it reads a little brighter.
  function wholeBody(t,K={}){
    const part=K.whole_part??.5,mind=K.cosmic_mind??part+.82,needed=K.needed??mind+1.24;
    const dark=(K.f6b_end??needed+.88)+.15,why=dark-.12,rise=Math.min(.42,mind-part);
    const on=i=>ease((t-part-order[i]*(mind-part-rise))/rise),off=burnOut(t,needed,why);
    const towers=typeof SCENES.un_towers?.body==='function'&&K.whole_part!==undefined;
    let s='';
    if(t>=part&&t<dark)s+=web(t-needed+(K.h_fades??.61),i=>on(i)*off(i),{bokeh:ramp(t,part,mind)*(1-ramp(t,needed,why))});
    if(towers&&t<mind)s+=SCENES.un_towers.body(t,K,'crown');
    if(!towers||t>=mind)s+=dot(POINT.x,POINT.y,pulse(t),towers?1:ramp(t,part,mind));
    return s+question(t,K);
  }
  function finalBody(t,K={},mode){
    if(mode==='whole')return wholeBody(t,K);
    const start=(K.f7??0)-.05,word=K.answer_word??start+.93,end=K.end??word+4.76;
    const tau=t-end;
    const D=Math.min(2.2,(end-word)*.5),dur=.8;
    const light=i=>i===0?ease((t-word)/dur):ease((t-word-.12-order[i]*D)/dur);
    const lit=clamp((t-word)/(D+dur));
    const shown=ramp(t,word,word+.3),q=clamp((t-word)/(D+.2));
    let s=t>word-.02?web(tau,light,{bokeh:lit}):'';
    if(q>0&&q<1){
      // Soft light front, no outline: it leads the nodes that catch fire behind it.
      const r=14+300*(1-(1-q)*(1-q));
      s+=`<defs><radialGradient id="unh-front"><stop offset=".74" stop-color="#fff" stop-opacity="0"/><stop offset=".92" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`+
        `<circle cx="${POINT.x}" cy="${POINT.y}" r="${n(r)}" fill="url(#unh-front)" opacity="${n(Math.sin(Math.PI*Math.min(1,q*1.02)))}"/>`;
    }
    // The shade lifts once the web is lit, so the last frame equals frame 0 around the word.
    const shade=shown*(1-ramp(t,end-1.6,end-.4));
    if(shade>.003){
      s+=`<defs><radialGradient id="unh-dark"><stop stop-color="#000" stop-opacity=".92"/><stop offset=".6" stop-color="#000" stop-opacity=".78"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>`+
        `<ellipse cx="180" cy="${DARK.cy}" rx="${DARK.rx}" ry="${DARK.ry}" fill="url(#unh-dark)" opacity="${n(shade)}"/>`;
    }
    const enter=ramp(t,start,start+.6),hide=ramp(t,word,word+.3);
    let out=s+selfArc(t,start+.05,word,1-hide);
    if(hide<1)out+=dot(POINT.x,POINT.y,pulse(t),(K.whole_part!==undefined?1:enter)*(1-hide));
    out+=question(t,K);
    if(shown>0)out+=wordEdge(.9*shown)+wordText(.96*shown);
    if(t>=word-.05)out+='<g id="unh-cap-off"/>';
    else if(t>=start+.05)out+='<g id="unh-cap-word"/>';  // not before K.f7: «И ты нужен ей.» has four words too
    return out;
  }
  SCENES.un_final=function(u,p={},d,t){return UN.wrap(finalBody(t,p.K||{},p.mode));};
  SCENES.un_final.body=finalBody;
  SCENES.un_final.web=web;
  SCENES.un_final.point=(t,K)=>({x:POINT.x,y:POINT.y,r:pulse(t)});
})();
