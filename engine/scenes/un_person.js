/* Universe Net v2, phrase 8 up to K.sees: the loss surface lifts into a person.
 * p.s: s8; p.mode: brain.
 * p.K: ABSOLUTE cues s8, inner, other_net, neurons_number, neurons, you, sees. No local
 * playback clock or mutable frame state. Neutral runtime camera only.
 * Anatomical point cloud -> head. At s8 the top of the right tower stands in frame,
 * large (SCENES.un_towers.crown): actual loss-surface samples flow into the same
 * body cloud, the person gathers on that top, the ball follows a curved path into
 * the brain, and the camera goes for the head by K.neurons_number.
 * On "ты" a dim «зачем?» comes back beside him.
 * After "ты" the person shrinks into UN_V2.towers(t,K).figure on the right tower
 * while the towers fade in; un_towers/sees takes over at K.sees-.05, and without
 * un_towers.body the person simply shrinks on black.
 * SCENES.un_person.body(t,K,mode) is raw SVG and holds the last pose past K.sees.
 * UN.wrap softly fades below the scene.
 */
(() => {
  const clamp = x => Math.max(0, Math.min(1, x));
  const smooth = x => { x=clamp(x); return x*x*(3-2*x); };
  const H = n => { const a=Math.sin(n*127.1+311.7)*43758.5453; return a-Math.floor(a); };
  const f = x => x.toFixed(3);
  const between = (t,a,b) => smooth((t-a)/Math.max(.001,b-a));
  const cue = (K,n,fallback) => K[n] ?? fallback;
  const dot = (p,r,o) => `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(r)}" opacity="${f(o)}"/>`;

  // Fixed, immutable surface samples. Anatomical widths, separate hands and feet,
  // and a modelled face keep this a person, rather than a connected stick figure.
  const body=[];
  function ellipsoid(c,r,n,seed,face=false) {
    for(let i=0;i<n;i++) {
      const zeta=1-2*(i+.5)/n, theta=i*2.3999632297+seed;
      const ring=Math.sqrt(1-zeta*zeta), shell=.89+.11*H(i+seed);
      let x=r[0]*ring*Math.cos(theta), y=r[1]*zeta, z=r[2]*ring*Math.sin(theta);
      if(face) {
        // Narrow jaw, brow, two recessed eyes, nose and cheek planes.
        x*=1-.22*smooth((y/r[1]-.08)/.82);
        if(z<0) {
          const eye=Math.exp(-Math.pow((Math.abs(x)-6.7)/3.2,2)-Math.pow((y+2)/3.5,2));
          const nose=6*Math.exp(-x*x/10-Math.pow((y-4)/7,2));
          z+=2.8*eye-nose;
        }
      }
      body.push({p:[c[0]+x*shell,c[1]+y*shell,c[2]+z*shell],h:H(i+seed*13),head:face});
    }
  }
  const shape=[[-0,8,8],[19,8,8],[29,15,10],[37,34,13],[46,37,15],[61,32,17],[84,26,15],[104,23,13],[121,29,15],[137,27,15],[147,22,13]];
  for(let i=0;i<1900;i++) {
    const y=17+H(i+41)*130;
    let j=1;while(j<shape.length-1 && shape[j][0]<y)j++;
    const a=shape[j-1],b=shape[j],q=smooth((y-a[0])/(b[0]-a[0]));
    const rx=a[1]+(b[1]-a[1])*q,rz=a[2]+(b[2]-a[2])*q;
    const ang=i*2.3999632297;
    const breath=1; // breathing is applied from absolute t at projection.
    body.push({p:[rx*Math.cos(ang),y,rz*Math.sin(ang)],h:H(i+874),head:false});
  }
  ellipsoid([0,0,0],[18.8,27,20.5],1550,31,true);
  ellipsoid([-18,2,0],[3.8,7,3.5],90,61);
  ellipsoid([18,2,0],[3.8,7,3.5],90,71);
  function limb(sign,keys,n,seed) {
    for(let i=0;i<n;i++) {
      const y=keys[0][0]+H(i+seed)*(keys[keys.length-1][0]-keys[0][0]);
      let j=1;while(j<keys.length-1&&keys[j][0]<y)j++;
      const a=keys[j-1],b=keys[j],q=smooth((y-a[0])/(b[0]-a[0]));
      const cx=a[1]+(b[1]-a[1])*q,rx=a[2]+(b[2]-a[2])*q;
      const rz=a[3]+(b[3]-a[3])*q,ang=i*2.3999632297;
      body.push({p:[sign*(cx+rx*Math.cos(ang)),y,rz*Math.sin(ang)],h:H(i+seed*3),head:false});
    }
  }
  for(const sign of [-1,1]) {
    limb(sign,[[36,32,8,9],[48,36,10,10],[72,39,8,8],[90,42,6.4,7],
      [107,44,7.3,7.5],[131,45,4.5,5]],750,110+sign);
    ellipsoid([sign*45,139,-1],[5.5,12,5.3],180,310+sign);
    limb(sign,[[132,15,13,13],[153,16,13,13],[179,17,10.4,11],[199,17,7.4,8],
      [220,17,9,9],[244,18,6,6.5],[263,18,4.7,5]],1000,410+sign);
    ellipsoid([sign*18,263,-6],[6.5,5,14],160,610+sign);
  }
  Object.freeze(body);

  // Neural tissue has two lobes and irregular spatial edges, not a flat diagram.
  const brain=[];
  for(let i=0;i<118;i++) {
    const a=i*2.3999632297,z=1-2*(i+.5)/118,r=Math.sqrt(1-z*z);
    const shell=.56+.44*H(i+28),side=i%2?1:-1;
    brain.push([side*7+8.3*r*Math.cos(a)*shell,-8+12.2*z*shell,13*r*Math.sin(a)*shell]);
  }
  const edges=[];
  for(let i=0;i<brain.length;i++) {
    const nearest=brain.map((p,j)=>({j,d:p.reduce((s,v,k)=>s+(v-brain[i][k])**2,0)}))
      .filter(p=>p.j!==i).sort((a,b)=>a.d-b.d).slice(0,3);
    for(const n of nearest)if(n.j>i)edges.push([i,n.j]);
  }

  // Standing height of the point body in world units, and the y of its soles.
  const STATURE=295,SOLES=268;
  // The stance on the crown: small enough to show the tower under his feet.
  const STAND={scale:.6,y:97},CROWN_ZOOM=6;
  function pose(t,K) {
    const s8=cue(K,'s8',0),you=cue(K,'you',s8+4.3),sees=cue(K,'sees',s8+5.9);
    const travel=between(t,cue(K,'inner',s8),you-.05);
    const shrink=between(t,you+.3,sees-.05);
    const {figure}=UN_V2.towers(t,K),tiny=figure.h/STATURE;
    // One camera: it holds on the crown while he gathers, then rises to the head.
    const head=between(t,s8+.85,cue(K,'neurons_number',s8+2.1));
    const near=STAND.scale+(.96+1.12*travel-STAND.scale)*head;
    const nearY=STAND.y+(83+68*travel-STAND.y)*head;
    // Logarithmic zoom: it reads as one steady camera retreat, not a collapse.
    return {cx:180+(figure.x-180)*shrink,cy:nearY+(figure.feet-SOLES*tiny-nearY)*shrink,
      f:850,distance:850,yaw:-.28+.045*Math.sin((t-s8)*.38),pitch:.015,
      scale:near*Math.pow(tiny/near,shrink),shrink};
  }
  function person(t,K,c,opacity=1,morph=null) {
    if(opacity<=0)return '';
    const on=between(t,cue(K,'inner',0)+.05,cue(K,'neurons_number',1));
    let s='',sharp='',soft='';
    const sorted=body.map((v,i)=>{
      const [x,y,z]=v.p,breath=1+.008*Math.sin(t*1.05)*smooth(y/35)*(1-smooth((y-105)/50));
      const target=UN.project([x*breath,y,z],c);
      if(!morph)return {v,i,p:target};
      // Ordered surface coordinates preserve nearby strands as they lift up.
      // Every destination sample starts on the real outgoing error surface.
      const sx=x*2.55,sz=-94+188*clamp((y+27)/300);
      const source=morph.source.pp(sx,morph.source.height(sx,sz),sz);
      const q=between(t,morph.start+.10*v.h,morph.end);
      const arc=Math.sin(Math.PI*q)**2;
      return {v,i,p:{x:source.x+(target.x-source.x)*q+Math.sin(i*.17)*5*arc,
        y:source.y+(target.y-source.y)*q-18*arc,z:source.z+(target.z-source.z)*q,s:target.s}};
    }).filter(v=>v.p.y>-12&&v.p.y<652&&v.p.x>-12&&v.p.x<372).sort((a,b)=>b.p.z-a.p.z);
    for(const {v,i,p} of sorted) {
      const front=clamp((20-p.z)/40);
      const birth=morph?between(t,morph.start,morph.start+.22):1;
      const op=(.23+.57*front)*(.7+.3*v.h)*opacity*birth;
      // The floor keeps the tiny figure a figure, not a fading smudge.
      const r=Math.max(.17,(.23+.21*v.h)*Math.pow(c.scale,.58));
      sharp+=dot(p,r,op);
      if(i%7===0)soft+=dot(p,r*1.3,op*.58);
    }
    s+=`<g fill="#fff" filter="url(#un-soft)">${soft}</g><g fill="#fff">${sharp}</g>`;
    const pts=brain.map(p=>UN.project(p,c)),op=on*opacity*(morph?smooth((morph.q-.82)/.18):1);
    s+=`<g opacity="${f(op)}">`;
    const center=UN.project([0,-8,0],c);
    s+=`<ellipse cx="${f(center.x)}" cy="${f(center.y)}" rx="${f(29*c.scale)}" ry="${f(23*c.scale)}" fill="url(#un-halo)" opacity=".85"/>`;
    for(let j=0;j<edges.length;j++) {
      const [i,k]=edges[j],flow=.5+.5*Math.sin(t*2.2-j*.27);
      s+=UN.thread(pts[i],pts[k],{width:.3+.1*c.scale,opacity:.12+.22*flow});
      if(j%12===0) {
        const q=(t*.48+j*.117)%1,a=pts[i],b=pts[k];
        s+=`<circle cx="${f(a.x+(b.x-a.x)*q)}" cy="${f(a.y+(b.y-a.y)*q)}" r="${f(.4*c.scale)}" fill="#fff" opacity="${f(.9*Math.sin(Math.PI*q)**2)}"/>`;
      }
    }
    pts.forEach((p,i)=>{s+=UN.sphere(p.x,p.y,(.35+.25*H(i+89))*c.scale,{opacity:.42+.4*H(i+67),glow:.8});});
    s+='</g>';
    return s;
  }
  function raw(t,K) {
    const c=pose(t,K);
    const start=cue(K,'s8',0)-.05,arrive=cue(K,'neurons_number',start+2.15);
    // The body is whole before the zoom ends, so he stands on the tower a moment.
    const end=start+(arrive-start)*.62;
    const q=between(t,start,end);
    const morph=q<1&&typeof SCENES.un_loss?.geometry==='function'?{start,end,q,source:SCENES.un_loss.geometry(t,K)}:null;
    let s=UN.bokeh(t,{count:23,opacity:.6*q,seed:48});
    if(morph) {
      s+=UN.bokeh(t,{seed:36,count:23,opacity:.48*(1-q)});
      // The surface is gone by «другая»: «вершине» must not fall on its lowest point.
      const mesh=1-between(t,start,cue(K,'other_net',start+.67));
      s+=`<g opacity="${f(mesh)}">${SCENES.un_loss.body(t,K,{background:false,ball:false})}</g>`;
    }
    // 'stack' never samples this scene, so the call cannot recurse. Without
    // towers the shrink stays on black and the incoming scene dissolves over it.
    const you=cue(K,'you',start+4.3),sees=cue(K,'sees',start+5.9);
    const towerIn=between(t,you+.5,sees-.1);
    if(towerIn>0) {
      const towers=UN_V2.prev('un_towers',t,K,'stack');
      if(towers!==null)s+=`<g opacity="${f(towerIn)}">${towers}</g>`;
    }
    const feet=UN.project([0,SOLES,0],c);
    if(feet.y<440&&t<cue(K,'you',start+4.3)&&typeof SCENES.un_towers?.crown==='function')
      s+=SCENES.un_towers.crown(t,K,{x:feet.x,y:feet.y+2,z:c.scale*CROWN_ZOOM,alpha:between(t,start,start+.3)});
    s+=person(t,K,c,1,morph);
    if(morph) {
      const a=morph.source.bp,b=UN.project([0,-8,0],c),arc=Math.sin(Math.PI*q)**2;
      const x=a.x+(b.x-a.x)*q+23*arc,y=a.y+(b.y-a.y)*q-20*arc;
      const r=5.5*a.s*(1-q)+.45*c.scale*q,alpha=1-smooth((q-.72)/.28);
      s+=UN.sphere(x,y,r,{opacity:alpha,glow:1.25});
      s+=UN.weight(x,y,r*6.2/5.5,r*1.6/5.5,{opacity:.18*alpha,angle:150+80*q});
    }
    const number=between(t,cue(K,'neurons_number',0),cue(K,'neurons',1))*(1-between(t,you+.1,you+.55));
    s+=UN.mono(180,46,'≈86 млрд',{size:16,anchor:'middle',opacity:number*.94});
    const ask=between(t,you,you+.2)*(1-between(t,you+.36,you+.64));
    s+=UN.italic(285,112,'зачем?',{size:18,anchor:'middle',opacity:ask*.5});
    return s;
  }
  SCENES.un_person=function(u,p={},d,t) {return UN.wrap(raw(t,p.K||{}));};
  SCENES.un_person.body=(t,K={},mode)=>raw(t,K);
})();
