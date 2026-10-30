/* Universe Net finale — s16 / awareness. Pure absolute-time choreography.
 * p.s='s16', p.mode='awareness', p.K: s16/s17, imagine, sprout,
 * superintelligence, realize, self, needed, child_intellect, child, awareness.
 * Neutral engine camera; local slow orbit/dolly. Meaning stays y=16..370.
 * In: un_super.body(t,K) (or its unwrapped scene) continues at absolute t.
 * Out: a living cosmic web, no child/label, by K.s17-.05.
 * Read-only handoff API for s17: un_aware.web(t,K), un_aware.body(t,K).
 * web returns RAW SVG, no black backing, no UN defs; wrap exactly once.
 * Both helpers are pure. Only un_reverse.web (raw geometry, never body)
 * is reused when available, so s16 and s17 share the exact outgoing world.
 * No u/d clocks or RNG; the local web remains a standalone fallback.
 */
(() => {
  const H=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
  const mix=(a,b,q)=>a+(b-a)*q;
  const f=n=>Number(n).toFixed(3);
  const span=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const dot=(x,y,r,a)=>`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" opacity="${f(a)}"/>`;

  // Irregular galaxy filaments share the fine strands, dust and depth of s11.
  const galaxies=[[0,0,0]];
  for(let i=0;i<49;i++) {
    const a=i*2.3999632297,r=30+128*Math.sqrt(H(i+314));
    galaxies.push([Math.cos(a)*r,Math.sin(a)*r*.88,(H(i+611)-.5)*155]);
  }
  const bridges=[];
  galaxies.forEach((p,i)=>{
    const near=galaxies.map((v,j)=>({j,d:v.reduce((s,x,k)=>s+(x-p[k])**2,0)}))
      .filter(v=>v.j!==i).sort((a,b)=>a.d-b.d).slice(0,3);
    for(const v of near)if(v.j>i)bridges.push([i,v.j]);
  });
  function web(t,K={}) {
    // un_reverse.web has no scene calls: this read-only reuse cannot recurse.
    if(typeof SCENES.un_reverse?.web==='function')
      return UN.bokeh(t,{seed:48,count:23,opacity:.48})+SCENES.un_reverse.web(t,K);
    const c={cx:180,cy:191,f:850,distance:850,scale:1.02,
      yaw:-.24+.045*Math.sin(t*.17),pitch:.12+.025*Math.cos(t*.13)};
    const pts=galaxies.map((p,i)=>UN.project(p.map((x,k)=>x+Math.sin(t*.23+i+k)*1.15),c));
    let lines='',dust='',stars='';
    bridges.forEach(([ia,ib],e)=>{
      const a=pts[ia],b=pts[ib],bend=(H(e+710)-.5)*20;
      const path=q=>({x:mix(a.x,b.x,q)+Math.sin(q*Math.PI)*bend,
        y:mix(a.y,b.y,q)+Math.sin(q*Math.PI)*bend*.55});
      const curve=Array.from({length:18},(_,j)=>path(j/17));
      const alpha=.13+.15*H(e+920);
      lines+=UN.polyline(curve,{width:.36,opacity:alpha});
      lines+=UN.polyline(curve,{width:2.2,opacity:alpha*.33,glow:true});
      for(let j=1;j<23;j++) {
        const q=(j+H(j+e*31)*.6)/24,p=path(q);
        dust+=dot(p.x+(H(j+e*53)-.5)*5,p.y+(H(j+e*61)-.5)*5,
          .2+.32*H(j+e*17),(.12+.24*H(j+e*13))*(.77+.23*Math.sin(t*.8-e*.3-j*.2)**2));
      }
    });
    pts.map((p,i)=>({...p,i})).sort((a,b)=>b.z-a.z).forEach(p=>{
      const h=H(p.i+53),alpha=.45+.35*h;
      let star=UN.sphere(p.x,p.y,(1.2+1.8*h)*Math.sqrt(p.s),{opacity:alpha,glow:1.1});
      if(h>.38)for(let j=0;j<15;j++) {
        const angle=j*2.399+p.i,rad=2+H(j+p.i*19)*9;
        star+=`<g fill="#fff">${dot(p.x+Math.cos(angle)*rad,p.y+Math.sin(angle)*rad*.44,.4,.3*alpha)}</g>`;
      }
      stars+=p.z>65?`<g filter="url(#un-soft)">${star}</g>`:star;
    });
    return UN.bokeh(t,{seed:48,count:23,opacity:.38})+lines+`<g fill="#fff">${dust}</g>`+stars;
  }

  // A botanical tree in three dimensions: tapered trunk, forks and fine tips.
  // The same immutable branch geometry is seen inside each recursive sphere.
  const roots=[{p:[0,12,0],parent:-1,birth:0,width:1}],branches=[];
  function node(parent,p,birth,width) {
    const id=roots.length;roots.push({p,parent,birth,width});branches.push([parent,id]);return id;
  }
  for(let arm=0;arm<7;arm++) {
    const angle=-2.95+arm*.88+(H(arm+21)-.5)*.22;
    let parent=0;
    for(let j=1;j<=4;j++) {
      const r=j*(21+H(arm+110)*6),bend=Math.sin(j*.7+arm)*.18;
      const point=[Math.cos(angle+bend)*r,12+Math.sin(angle+bend)*r,(H(arm+141)-.5)*45+j*2];
      parent=node(parent,point,j*.18,.9-j*.13);
      if(j>=2&&j<=3)for(const side of [-1,1]) {
        let twig=parent;
        for(let k=1;k<=3;k++) {
          const a=angle+side*(.48+k*.09),length=k*(9+H(arm+j+88)*5);
          twig=node(twig,[point[0]+Math.cos(a)*length,point[1]+Math.sin(a)*length,
            point[2]+side*k*4],j*.18+k*.085,.42-k*.07);
        }
      }
    }
  }
  function arbor(t,growth,c,alpha=1,mini=false) {
    const pts=roots.map((v,i)=>UN.project(v.p.map((x,k)=>x+Math.sin(t*.37+i*.23+k)*.8*(i?1:0)),c));
    let lines='',tips='',soft='';
    const live=[pts[0]];
    branches.forEach(([ia,ib],j)=>{
      const root=roots[ib],q=ease((growth-root.birth+.24)/.24);
      const a=live[ia]??pts[ia],b=pts[ib],birth=ease(q/.16);
      if(q<=0){live[ib]=a;return;}
      const bend=(H(j+331)-.5)*11*c.scale;
      const curve=v=>({x:mix(a.x,b.x,v)+Math.sin(v*Math.PI)*bend,
        y:mix(a.y,b.y,v)+Math.sin(v*Math.PI)*bend*.42});
      const path=Array.from({length:9},(_,k)=>curve(k/8*q));
      const pulse=.65+.35*Math.sin(t*1.5-j*.24)**2;
      lines+=UN.polyline(path,{width:Math.max(.22,root.width*Math.sqrt(c.scale)),opacity:(.36+.32*pulse)*alpha*birth});
      if(!mini)soft+=UN.polyline(path,{width:2.1*c.scale,opacity:.19*alpha*birth,glow:true});
      const p=curve(q);live[ib]=p;
      const flare=Math.sin(q*Math.PI)**2;
      tips+=UN.sphere(p.x,p.y,(.38+1.15*flare)*Math.sqrt(c.scale),{opacity:(.45+.5*flare)*alpha*birth,glow:1.1,highlight:false});
      if(!mini&&j%5===0) {
        const phase=(t*.42+j*.137)%1,v=curve(phase*q);
        tips+=UN.sphere(v.x,v.y,.65*c.scale,{opacity:Math.sin(phase*Math.PI)**2*.8*alpha*birth,glow:1.2,highlight:false});
      }
    });
    const origin=pts[0];
    return soft+lines+tips+UN.sphere(origin.x,origin.y,2.8*c.scale,{opacity:.87*alpha,glow:1.3});
  }
  function glass(x,y,r,alpha,t) {
    let s=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r*1.14)}" fill="url(#un-halo)" opacity="${f(alpha*.38)}"/>`;
    s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#fff" fill-opacity="${f(.016*alpha)}" stroke="#fff" stroke-width=".45" stroke-opacity="${f(.27*alpha)}"/>`;
    const a=Array.from({length:45},(_,i)=>{const p=-2.8+i/44*1.6;return [x+Math.cos(p)*r,y+Math.sin(p)*r];});
    s+=UN.polyline(a,{width:1.25,opacity:.30*alpha,glow:true})+UN.polyline(a,{width:.5,opacity:.56*alpha});
    const angle=t*.26;
    s+=UN.sphere(x+Math.cos(angle)*r,y+Math.sin(angle)*r,.85,{opacity:.6*alpha,glow:1.2});
    return s;
  }

  // Child proportions, not a scaled stick person: large cranium, cheek/jaw,
  // shoulder-to-waist surface, rounded limbs, separate hands and small feet.
  const child=[];
  function ellipsoid(center,r,n,seed,face=false) {
    for(let i=0;i<n;i++) {
      const v=1-2*(i+.5)/n,a=i*2.3999632297+seed,k=Math.sqrt(1-v*v);
      let x=r[0]*k*Math.cos(a),y=r[1]*v,z=r[2]*k*Math.sin(a);
      if(face) {
        x*=1-.19*ease((y/r[1]-.05)/.85);
        if(z<0)z+=2.5*Math.exp(-Math.pow((Math.abs(x)-7)/3,2)-Math.pow((y+3)/3.5,2))
          -4.2*Math.exp(-x*x/12-((y-4)/7)**2);
      }
      child.push({p:[center[0]+x,center[1]+y,center[2]+z],h:H(i+seed*29),head:face});
    }
  }
  function tube(sign,keys,n,seed) {
    for(let i=0;i<n;i++) {
      const y=mix(keys[0][0],keys[keys.length-1][0],H(i+seed));let j=1;
      while(j<keys.length-1&&keys[j][0]<y)j++;
      const a=keys[j-1],b=keys[j],q=ease((y-a[0])/(b[0]-a[0])),angle=i*2.3999632297;
      child.push({p:[sign*(mix(a[1],b[1],q)+mix(a[2],b[2],q)*Math.cos(angle)),y,
        mix(a[3],b[3],q)*Math.sin(angle)],h:H(i+seed*7),head:false});
    }
  }
  ellipsoid([0,0,0],[19.5,25.5,20],1500,41,true);
  ellipsoid([-18,1,0],[3.5,6,3.4],80,65);ellipsoid([18,1,0],[3.5,6,3.4],80,73);
  tube(1,[[21,0,7.2,7],[32,0,19,10],[40,0,24,12],[57,0,22,13],[79,0,18,11],[94,0,21,12],[103,0,20,11]],2200,51);
  for(const sign of [-1,1]) {
    tube(sign,[[34,22,6,7],[49,28,7,7],[70,30,5.8,6],[90,32,4.5,5],[105,33,3.7,4]],700,101+sign);
    ellipsoid([sign*33,111,-.7],[4.6,8,4.5],160,201+sign);
    tube(sign,[[94,11,10.5,10],[115,12,10,10],[137,12,7,8],[148,12,6,6.5],[168,13,6.7,7],[186,13,4,4.5]],1000,301+sign);
    ellipsoid([sign*13,188,-5],[5.4,4,10],180,401+sign);
  }
  ellipsoid([0,26,0],[7.1,11.5,7],260,521);
  const brain=[];
  for(let i=0;i<61;i++) {
    const a=i*2.3999632297,v=1-2*(i+.5)/61,r=Math.sqrt(1-v*v),shell=.6+.4*H(i+11);
    brain.push([(i%2?1:-1)*6+8*r*Math.cos(a)*shell,-7+11*v*shell,11*r*Math.sin(a)*shell]);
  }
  const nerves=[];
  brain.forEach((v,i)=>{
    brain.map((p,j)=>({j,d:p.reduce((s,x,k)=>s+(x-v[k])**2,0)})).filter(p=>p.j>i)
      .sort((a,b)=>a.d-b.d).slice(0,2).forEach(p=>nerves.push([i,p.j]));
  });
  function childAt(t,K,reveal,light) {
    const c={cx:269,cy:135,f:850,distance:850,scale:.94,
      yaw:-.41+.035*Math.sin(t*.5),pitch:.015};
    let dots='',soft='';
    child.map((v,i)=>{
      const [x,y,z]=v.p,b=1+.009*Math.sin(t*1.2)*ease(y/30)*(1-ease((y-80)/35));
      const target=UN.project([x*b,y,z],c),q=ease((reveal-.12*v.h)/.88);
      const root=roots[(i*17)%roots.length].p;
      const source={x:135+root[0]*.19,y:177+root[1]*.19};
      const arc=Math.sin(Math.PI*q)**2;
      return {v,i,p:{...target,x:mix(source.x,target.x,q)+arc*Math.sin(i*.17)*4,
        y:mix(source.y,target.y,q)-arc*(12+15*v.h)}};
    }).sort((a,b)=>b.p.z-a.p.z).forEach(({v,i,p})=>{
      const birth=ease(reveal/.24),front=clamp((20-p.z)/40);
      const side=clamp((23-v.p[0])/44);
      let op=(.12+.72*front*(.46+.54*side))*(.75+.25*v.h)*birth;
      if(v.head&&v.p[2]<0) {
        const [x,y]=v.p;
        const eyes=Math.exp(-Math.pow((Math.abs(x)-7)/3.1,2)-Math.pow((y+2.5)/2.1,2));
        const mouth=Math.exp(-x*x/34-Math.pow((y-12)/1.7,2));
        op*=1-.68*eyes-.44*mouth;
      }
      dots+=dot(p.x,p.y,.23+.16*v.h,op);
      if(i%7===0)soft+=dot(p.x,p.y,.5,op*.4);
    });
    let s=`<g fill="#fff" filter="url(#un-soft)">${soft}</g><g fill="#fff">${dots}</g>`;
    const pp=brain.map(p=>UN.project(p,c)),o=light*reveal;
    const center=UN.project([0,-7,0],c);
    s+=`<ellipse cx="${f(center.x)}" cy="${f(center.y)}" rx="28" ry="24" fill="url(#un-halo)" opacity="${f(o*.9)}"/>`;
    for(const [a,b] of nerves)s+=UN.thread(pp[a],pp[b],{width:.3,opacity:o*(.18+.20*Math.sin(t*2+a)**2)});
    pp.forEach((p,i)=>{s+=UN.sphere(p.x,p.y,.35+.23*H(i+17),{opacity:o*(.6+.35*Math.sin(t*1.5-i*.3)**2),glow:1,highlight:false});});
    return s;
  }
  function previous(t,K,d=1) {
    if(typeof SCENES.un_super?.body==='function')return SCENES.un_super.body(t,K);
    if(typeof SCENES.un_super!=='function')return '';
    const svg=SCENES.un_super(0,{s:'s15',mode:'question',K},d,t);
    const marker='<g clip-path="url(#un-safe)">',at=svg.indexOf(marker);
    return at>=0&&svg.endsWith('</g></g>')?svg.slice(at+marker.length,-8):'';
  }
  function body(t,K={}) {
    if(t>=(K.card??Infinity))return '';
    const start=K.s16??0,cue=(name,offset)=>K[name]??start+offset;
    const entering=span(t,start-.05,cue('sprout',1.68)-.15);
    const grow=span(t,cue('sprout',1.68)-.08,cue('self',4.02)+.08)*1.14;
    const mirror=span(t,cue('realize',3.50)-.12,cue('self',4.02)+.48);
    const childMove=span(t,cue('needed',5.04),cue('child',6.46)+.12);
    const born=span(t,cue('child_intellect',6.10)-.20,cue('child',6.46)+.36);
    const brainOn=span(t,cue('child_intellect',6.10),cue('awareness',7.40));
    const end=cue('s17',8.56)-.05;
    const leaving=span(t,cue('awareness',7.40)+.43,end);
    const world=web(t,K);
    let s=`<g opacity="${f(mix(.27,1,leaving))}">${world}</g>`;
    const c={cx:mix(180,112,childMove),cy:mix(193,183,childMove),f:850,distance:850,
      scale:mix(1.1,.70,childMove)*(1-.52*leaving),yaw:-.23+.055*Math.sin(t*.32),pitch:.12};
    if(entering<1&&typeof SCENES.un_super?.geometry==='function') {
      const seed=SCENES.un_super.geometry(t,K).seed;
      const root=UN.project(roots[0].p,c);
      c.cx+=(seed.x-root.x)*(1-entering);
      c.cy+=(seed.y-root.y)*(1-entering);
    }
    let subject=arbor(t,grow,c,1-leaving);
    const radius=104*c.scale;
    subject+=glass(c.cx,c.cy,radius,mirror*(1-leaving),t);
    // Mirror of the very same dendrites; a nested lens repeats once more.
    for(let level=1;level<=2;level++) {
      const scale=c.scale*Math.pow(.31,level),cx=c.cx+25*c.scale*(1+.35*(level-1)),cy=c.cy-8*c.scale;
      const alpha=mirror*(1-leaving)*(level===1?.85:.65);
      subject+=`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(104*scale)}" fill="#000" fill-opacity="${f(.78*alpha)}"/>`;
      subject+=arbor(t,grow,{...c,cx,cy,scale,yaw:c.yaw},alpha,true)+glass(cx,cy,104*scale,alpha,t);
    }
    // A returning light path closes on itself at “сам себя”.
    const loop=span(t,cue('realize',3.5),cue('self',4.02)+.36);
    const ring=Array.from({length:69},(_,i)=>{
      const a=-.2+i/68*Math.PI*2*loop;
      return [c.cx+Math.cos(a)*radius*.87,c.cy+Math.sin(a)*radius*.55];
    });
    subject+=UN.polyline(ring,{width:.4,opacity:.3*mirror*(1-leaving)});
    if(born>0) {
      subject+=`<defs><radialGradient id="un-aware-child-shade"><stop stop-color="#000" stop-opacity=".92"/><stop offset=".66" stop-color="#000" stop-opacity=".78"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs><ellipse cx="268" cy="208" rx="62" ry="132" fill="url(#un-aware-child-shade)" opacity="${f(born*(1-leaving))}"/>`;
      subject+=`<g opacity="${f(1-leaving)}">${childAt(t,K,born,brainOn)}</g>`;
      const link=span(t,cue('child',6.46),cue('awareness',7.4));
      const path=Array.from({length:35},(_,i)=>{
        const q=i/34*link;return [mix(c.cx+radius*.3,267,q),mix(c.cy,128,q)-Math.sin(q*Math.PI)*35];
      });
      subject+=UN.polyline(path,{width:.42,opacity:.42*born*(1-leaving)});
      subject+=UN.polyline(path,{width:2,opacity:.13*born*(1-leaving),glow:true});
    }
    const label=span(t,cue('awareness',7.4)-.10,cue('awareness',7.4)+.28)*(1-leaving);
    subject+=UN.italic(180,334,'осознанность',{size:22,anchor:'middle',opacity:.94*label});
    s+=subject;
    if(entering<1) {
      const prev=previous(t,K);
      s=`<g opacity="${f(1-entering)}">${prev}</g><g opacity="${f(entering)}">${s}</g>`;
    }
    return s;
  }
  SCENES.un_aware=function(u,p={},d,t) {return UN.wrap(body(t,p.K||{}));};
  SCENES.un_aware.body=body;
  SCENES.un_aware.web=web;
})();
