/* f4/f5 — a net grows from one node, looks at itself, then only a point is left.
 * p.s='sf4'|'sf5', p.mode='awareness'|'mirror': ONE trajectory of absolute t.
 * p.K: superintelligence, realize, self, f5, look, except, except_you, f6.
 * The frame is densest just after K.self and only gets poorer from there, before
 * the conclusion: the world and the lenses are gone by K.look, the tree withdraws
 * branch by branch into its root, and by K.except the root is all that is left.
 * Neutral engine camera; local slow orbit. Meaning stays y=16..370.
 * In: un_reverse.body(t,K) continues; the root is its node 0, the person.
 * Out: un_towers evaluates body(t,K,mode): after the beam fades body is the
 * single point at SCENES.un_final.point(t,K), or x=180,y=200 as a fallback.
 * Pure: no u/d clocks, RNG or frame state. The only word on screen is mono ТЫ at
 * the root, taken over from un_reverse on K.superintelligence; gone by K.f6-.05.
 */
(() => {
  const H=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
  const mix=(a,b,q)=>a+(b-a)*q;
  const f=n=>Number(n).toFixed(3);
  const span=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));

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
  // Withdrawal order: tips first, every branch before the one it hangs on, so the
  // tree goes back into its root and nothing is ever left floating.
  const lastBirth=Math.max(...roots.map(v=>v.birth));
  const due=roots.map((v,i)=>i?.86*(1-v.birth/lastBirth)+.14*H(i+501):1);
  for(let i=1;i<roots.length;i++)if(roots[i].parent>0)due[i]=Math.min(due[i],due[roots[i].parent]-.012);
  const dueMax=Math.max(...due.slice(1));
  const LEAVE=.2;   // share of the withdrawal one branch takes to retract
  function arbor(t,growth,c,alpha=1,mini=false,rare=0) {
    const pts=roots.map((v,i)=>UN.project(v.p.map((x,k)=>x+Math.sin(t*.37+i*.23+k)*.8*(i?1:0)),c));
    let lines='',tips='',soft='';
    const live=[pts[0]];
    branches.forEach(([ia,ib],j)=>{
      const root=roots[ib],grown=ease((growth-root.birth+.24)/.24);
      const left=1-ease((rare-(1-LEAVE)*Math.max(0,due[ib])/dueMax)/LEAVE);
      const q=grown*left;
      const a=live[ia]??pts[ia],b=pts[ib],birth=ease(q/.16)*left;
      if(q<=0){live[ib]=a;return;}
      const bend=(H(j+331)-.5)*11*c.scale;
      const curve=v=>({x:mix(a.x,b.x,v)+Math.sin(v*Math.PI)*bend,
        y:mix(a.y,b.y,v)+Math.sin(v*Math.PI)*bend*.42});
      const path=Array.from({length:9},(_,k)=>curve(k/8*q));
      const pulse=.65+.35*Math.sin(t*1.5-j*.24)**2;
      lines+=UN.polyline(path,{width:Math.max(.22,root.width*Math.sqrt(c.scale)),opacity:(.36+.32*pulse)*alpha*birth});
      if(!mini)soft+=UN.polyline(path,{width:2.1*c.scale,opacity:.19*alpha*birth,glow:true});
      const p=curve(q);live[ib]=p;
      const flare=Math.sin(grown*Math.PI)**2;
      tips+=UN.sphere(p.x,p.y,(.38+1.15*flare)*Math.sqrt(c.scale),{opacity:(.45+.5*flare)*alpha*birth,glow:1.1,highlight:false});
      if(!mini&&j%5===0) {
        const phase=(t*.42+j*.137)%1,v=curve(phase*q);
        tips+=UN.sphere(v.x,v.y,.65*c.scale,{opacity:Math.sin(phase*Math.PI)**2*.8*alpha*birth,glow:1.2,highlight:false});
      }
    });
    const origin=pts[0];
    return soft+lines+tips+UN.sphere(origin.x,origin.y,2.8*c.scale,{opacity:.87*alpha,glow:1.3});
  }
  function glass(x,y,r,alpha,t,haze=1) {
    let s=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r*1.14)}" fill="url(#un-halo)" opacity="${f(alpha*.38*haze)}"/>`;
    s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#fff" fill-opacity="${f(.016*alpha)}" stroke="#fff" stroke-width=".45" stroke-opacity="${f(.27*alpha)}"/>`;
    const a=Array.from({length:45},(_,i)=>{const p=-2.8+i/44*1.6;return [x+Math.cos(p)*r,y+Math.sin(p)*r];});
    s+=UN.polyline(a,{width:1.25,opacity:.30*alpha,glow:true})+UN.polyline(a,{width:.5,opacity:.56*alpha});
    const angle=t*.26;
    s+=UN.sphere(x+Math.cos(angle)*r,y+Math.sin(angle)*r,.85,{opacity:.6*alpha,glow:1.2});
    return s;
  }

  function finalPoint(t,K) {
    const p=SCENES.un_final?.point?.(t,K);
    return {x:p?.x??p?.[0]??180,y:p?.y??p?.[1]??200};
  }
  function body(t,K={},mode) {
    const sup=K.superintelligence??0,realize=K.realize??sup+1.36,self=K.self??realize+.64;
    const look=K.look??self+2.04,except=K.except??look+1.52,you=K.except_you??except+.26;
    const next=K.f6??you+.94;
    const entering=span(t,sup-.05,sup+.5);
    const grow=span(t,sup-.05,self+.08)*1.14;
    const mirror=span(t,realize-.12,self+.12);
    const hush=span(t,sup,realize),dark=span(t,look+.35,except-.06);
    const gather=span(t,look-.15,except);
    // The frame keeps getting poorer from just after «сам себя»: the world is gone
    // by K.look, the mirrors leave one by one, the tree withdraws into its root.
    const f5=K.f5??self+.84,peak=self;
    const thin=span(t,peak,look-.1);
    const worldLight=mix(1,.27,hush)*(1-thin);
    const lens=[1-span(t,peak+.1,f5+.75),1-span(t,peak,f5+.2)];
    const rare=Math.pow(clamp((t-peak)/Math.max(.001,except-.1-peak)),1.2);
    let s='';
    if(worldLight>.002&&typeof SCENES.un_reverse?.body==='function')
      s+=`<g opacity="${f(worldLight)}">${SCENES.un_reverse.body(t,K)}</g>`;
    const home=SCENES.un_reverse?.node?.(t,K,0)??{x:180,y:175};
    const end=finalPoint(t,K),o={x:mix(home.x,end.x,gather),y:mix(home.y,end.y,gather)};
    const c={cx:180,cy:193,f:850,distance:850,scale:(1.1+.06*span(t,self,look))*(1-.42*dark),
      yaw:-.23+.055*Math.sin(t*.32),pitch:.12};
    const root=UN.project(roots[0].p,c);
    c.cx+=o.x-root.x;c.cy+=o.y-root.y;
    const alive=entering*(1-dark);
    if(alive>.002) {
      let subject=arbor(t,grow,c,alive,false,rare);
      const radius=104*c.scale;
      subject+=glass(c.cx,c.cy,radius,mirror*alive*(1-thin),t,mix(.62,.24,thin));
      // Mirror of the very same dendrites; a nested lens repeats once more.
      for(let level=1;level<=2;level++) {
        const scale=c.scale*Math.pow(.31,level),cx=c.cx+25*c.scale*(1+.35*(level-1)),cy=c.cy-8*c.scale;
        const alpha=mirror*alive*(level===1?.85:.65)*lens[level-1];
        if(alpha<=.002)continue;
        subject+=`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(104*scale)}" fill="#000" fill-opacity="${f(.78*alpha)}"/>`;
        subject+=arbor(t,grow,{...c,cx,cy,scale,yaw:c.yaw},alpha,true,Math.min(1,rare*1.5))+glass(cx,cy,104*scale,alpha,t);
      }
      // A returning light path closes on itself at «сам себя».
      const loop=span(t,realize,self+.36);
      const ring=Array.from({length:69},(_,i)=>{
        const a=-.2+i/68*Math.PI*2*loop;
        return [c.cx+Math.cos(a)*radius*.87,c.cy+Math.sin(a)*radius*.55];
      });
      subject+=UN.polyline(ring,{width:.4,opacity:.3*mirror*alive*(1-thin)});
      s+=subject;
    }
    // The one survivor: the root node itself, never a newly cut-in object.
    const beat=span(t,you-.06,you+.2);
    const pulse=1+.2*beat*Math.sin((t-you)*Math.PI*2.1)**2;
    const size=mix(mix(.6,1,entering)*3.08,2.5,gather)*pulse;
    s+=UN.sphere(o.x,o.y,size,{opacity:entering*(.87+.11*gather),glow:1.3+.25*beat});
    // ТЫ stays with the root through the dark: «Кроме тебя» points at it. Until
    // K.superintelligence the label is still drawn inside un_reverse.body, same place.
    const tag=1-span(t,next-.25,next-.05);
    if(t>=sup&&tag>0)s+=`<g stroke="#000" stroke-width="2.2" stroke-linejoin="round" paint-order="stroke">${UN.mono(o.x+9,o.y+3,'ТЫ',{size:9.6,opacity:.96*tag})}</g>`;
    const rise=span(t,you-.04,you+.46),gone=span(t,you+.4,next-.04);
    if(rise>0&&gone<1) {
      // One gradient stroke: the slight tilt keeps the soft filter's box non-empty.
      const y0=o.y-3,y1=y0-rise*146;
      const beam=(w,a,extra='')=>`<path d="M${f(o.x)} ${f(y0)}L${f(o.x+.2)} ${f(y1)}" fill="none" stroke="url(#un-aware-beam)" stroke-width="${w}" opacity="${f(a*(1-gone))}"${extra}/>`;
      s+=`<defs><linearGradient id="un-aware-beam" gradientUnits="userSpaceOnUse" x1="0" y1="${f(y0)}" x2="0" y2="${f(y1)}"><stop stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity=".42"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
      s+=beam(2,.26,' filter="url(#un-soft)"')+beam(.55,.9);
    }
    return s;
  }
  SCENES.un_aware=function(u,p={},d,t) {return UN.wrap(body(t,p.K||{},p.mode));};
  SCENES.un_aware.body=body;
})();
