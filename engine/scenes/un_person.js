/* Universe Net — D / s8 brain, s9 chatgpt.
 * p.s: s8|s9; p.mode: brain|chatgpt (both share the same continuous world).
 * p.K: ABSOLUTE cues, including inner, neurons_number, neurons, you, third,
 * chatgpt, s8..s11 and K.words. No local playback clock or mutable frame state.
 * Neutral runtime camera only. Anatomical point cloud -> head -> tower.
 * Local UN_D helpers are shared ONLY with un_nested.js, not added to UN.
 * At s8, actual loss-surface samples flow into the same body cloud; the ball
 * follows a curved path into the brain. UN.wrap softly fades below the scene.
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

  function pose(t,K) {
    const s8=cue(K,'s8',0),s9=cue(K,'s9',s8+5),s10=cue(K,'s10',s9+3);
    const travel=between(t, cue(K,'inner',s8),s9-.05);
    const close=between(t,s9-.05,s10-.2);
    const scale=.96+1.12*travel+1.75*close;
    return {cx:180,cy:83+68*travel+33*close,f:850,distance:850,
      yaw:-.28+.045*Math.sin((t-s8)*.38),pitch:.015,scale};
  }
  function tower(t,K,c,opacity=1) {
    c={...c,yaw:c.yaw-.24,pitch:.19};
    const start=cue(K,'third',cue(K,'s9',0));
    const end=cue(K,'chatgpt',start+1)+.45;
    let s='';
    for(let i=0;i<8;i++) {
      const v=between(t,start+(end-start)*i/12,start+(end-start)*(i+4)/12);
      if(v<=0)continue;
      // Local fine-dot block: UN.block's standard .8 radius would saturate
      // these tiny 10-unit layers during the head close-up. UN stays unchanged.
      const py=17-i*5.3,w=11.2,h=4.5*v,dep=12;
      const pp=(x,y,z)=>UN.project([x,py+y,z],c);
      const verts=[];for(const z of [-dep/2,dep/2])for(const y of [-h/2,h/2])for(const x of [-w/2,w/2])verts.push(pp(x,y,z));
      let layer='';
      for(const [a,b] of [[0,1],[0,2],[1,3],[2,3],[4,5],[4,6],[5,7],[6,7],[0,4],[1,5],[2,6],[3,7]])
        layer+=UN.thread(verts[a],verts[b],{width:.48,opacity:.76});
      const focus=pp(0,h*.15,0);let dots='';
      for(let iz=0;iz<3;iz++)for(let ix=0;ix<6;ix++) {
        const pt=pp((ix/5-.5)*w,-h/2,(iz/2-.5)*dep);
        dots+=`<circle cx="${f(pt.x)}" cy="${f(pt.y)}" r="${f(Math.max(.12,.22*pt.s))}" fill="#fff" opacity=".82"/>`;
        if((ix+iz)%2===0)layer+=UN.thread(pt,focus,{width:.3,opacity:.27});
      }
      layer+=`<g filter="url(#un-soft)" opacity=".35">${dots}</g>${dots}`;
      s+=`<g opacity="${f(opacity*v)}">${layer}</g>`;
    }
    // A single filament joins the layers and catches a slowly moving highlight.
    const growth=between(t,start,end);
    if(growth>0) {
      const a=UN.project([0,19,0],c),b=UN.project([0,19-40*growth,0],c);
      s+=UN.thread(a,b,{width:.45,opacity:.65*opacity});
      const v=(t*.35)%1,pt=UN.project([0,19-40*growth*v,0],c);
      s+=UN.sphere(pt.x,pt.y,Math.max(.4,.42*pt.s),{opacity:.7*growth*opacity*Math.sin(Math.PI*v)**2,glow:1.2});
    }
    return s;
  }
  function person(t,K,c,opacity=1,morph=null) {
    if(opacity<=0)return '';
    const on=between(t,cue(K,'inner',0)+.05,cue(K,'neurons_number',1));
    const third=between(t,cue(K,'third',1)-.3,cue(K,'chatgpt',2)+.45);
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
      const op=(.23+.57*front)*(.7+.3*v.h)*(v.head?1-.80*third:1-.65*third)*opacity*birth;
      const r=(.23+.21*v.h)*Math.pow(c.scale,.58);
      sharp+=dot(p,r,op);
      if(i%7===0)soft+=dot(p,r*1.3,op*.58);
    }
    s+=`<g fill="#fff" filter="url(#un-soft)">${soft}</g><g fill="#fff">${sharp}</g>`;
    const pts=brain.map(p=>UN.project(p,c)),op=on*(1-.86*third)*opacity*(morph?smooth((morph.q-.82)/.18):1);
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
  function raw(t,K,{zoom=1,labels=true,humanOpacity=1,towerOpacity=1,background=true}={}) {
    const c=pose(t,K); c.scale*=zoom;c.cy=184+(c.cy-184)*zoom;
    const start=cue(K,'s8',0)-.05,end=cue(K,'neurons_number',start+1.5);
    const q=between(t,start,end);
    const morph=q<1&&SCENES.un_loss?.geometry?{start,end,q,source:SCENES.un_loss.geometry(t,K)}:null;
    let s=background?UN.bokeh(t,{count:23,opacity:.6*q,seed:48}):'';
    if(morph) {
      if(background)s+=UN.bokeh(t,{seed:36,count:23,opacity:.48*(1-q)});
      const mesh=1-between(t,start,start+(end-start)*.72);
      s+=`<g opacity="${f(mesh)}">${SCENES.un_loss.body(t,K,{background:false,ball:false})}</g>`;
    }
    s+=person(t,K,c,humanOpacity,morph);
    if(morph) {
      const a=morph.source.bp,b=UN.project([0,-8,0],c),arc=Math.sin(Math.PI*q)**2;
      const x=a.x+(b.x-a.x)*q+23*arc,y=a.y+(b.y-a.y)*q-20*arc;
      const r=5.5*a.s*(1-q)+.45*c.scale*q,alpha=1-smooth((q-.72)/.28);
      s+=UN.sphere(x,y,r,{opacity:alpha,glow:1.25});
      s+=UN.weight(x,y,r*6.2/5.5,r*1.6/5.5,{opacity:.18*alpha,angle:150+80*q});
    }
    if(towerOpacity>.001)s+=tower(t,K,c,towerOpacity);
    if(labels) {
      const number=between(t,cue(K,'neurons_number',0),cue(K,'neurons',1))*(1-between(t,cue(K,'s9',2)-.05,cue(K,'third',3)));
      const you=between(t,cue(K,'you',0)-.12,cue(K,'you',0)+.3)*(1-between(t,cue(K,'s9',1),cue(K,'third',2)));
      s+=UN.mono(180,46,'86 000 000 000',{size:16,anchor:'middle',opacity:number*.94});
      s+=UN.italic(251,243,'это ты',{size:20,opacity:you*.9});
      const label=between(t,cue(K,'chatgpt',1)-.1,cue(K,'chatgpt',1)+.4);
      s+=UN.mono(180,61,'ChatGPT',{size:19,anchor:'middle',opacity:label*.94});
    }
    return s;
  }
  window.UN_D=Object.freeze({raw,pose,tower,person,between});
  SCENES.un_person=function(u,p={},d,t) {return UN.wrap(raw(t,p.K||{}));};
})();
