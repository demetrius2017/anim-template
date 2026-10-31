/* f2 — a child on a living landscape grows up, then the camera leaves the world.
 * p.s="sf2", p.mode="growth", p.K: absolute f2, child, child_intellect, survive,
 * changing, f3. No local u/d clock. Neutral engine camera; a slow local orbit,
 * then one continuous pullback: one camera backs off, rises and turns, so the little
 * world and un_reverse.web move together, the near world shrinking faster than the
 * web behind it, and node 0 of the web stays under the world the whole way.
 * Child and adult are one material with the person of un_person: scattered points of
 * the same density on head and body. The child has a small head on a real neck.
 * In: un_super.body at the same absolute t while the landscape dissolves in.
 * Out: no darkening. The person lands on node 0 of un_reverse.web, which is
 * already visible at K.f3; un_reverse.body dissolves from this body.
 * All important objects y=16..370; surface fades into the subtitle clearance.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q,n=x=>x.toFixed(3);
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*x*(10+x*(-15+6*x));};
  const ramp=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const hash=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  const samples=[];
  function ellipsoid(child,adult,rc,ra,count,seed,part='body'){
    for(let i=0;i<count;i++){
      // Scattered, not a spiral lattice: a lattice on a small head reads as dimples.
      const z=1-2*hash(i*3+seed*7+.5),a=hash(i*5+seed*11+.25)*Math.PI*2,r=Math.sqrt(1-z*z);
      const shell=.9+.1*hash(i*2+seed*3+.75);
      const unit=[r*Math.cos(a)*shell,z*shell,r*Math.sin(a)*shell];
      if(part==='head'){
        unit[0]*=1-.20*ease((z-.05)/.85);
        // A shallow jaw and nose preserve the anatomical point-cloud style.
        if(unit[2]<0)unit[2]-=.18*Math.exp(-(unit[0]**2)*35-(z-.15)**2*18);
      }
      samples.push({c:child.map((v,k)=>v+rc[k]*unit[k]),a:adult.map((v,k)=>v+ra[k]*unit[k]),h:hash(i+seed*13),part});
    }
  }
  const HEAD_Y=-91.5;
  ellipsoid([0,HEAD_Y,0],[0,-166,0],[7.4,9.4,8],[11.6,16,12.7],620,31,'head');
  function tube(child,adult,count,seed,side=1,part='body'){
    const surface=(keys,q,scale,head,a)=>{
      const y=mix(keys[0][0],keys[keys.length-1][0],q);let j=1;
      while(j<keys.length-1&&keys[j][0]<y)j++;
      const k=keys[j-1],l=keys[j],v=ease((y-k[0])/(l[0]-k[0]));
      return [side*(mix(k[1],l[1],v)+mix(k[2],l[2],v)*Math.cos(a))*scale,
        y*scale+head,mix(k[3],l[3],v)*Math.sin(a)*scale];
    };
    for(let i=0;i<count;i++){
      const q=hash(i+seed),a=i*2.3999632297;
      samples.push({c:surface(child,q,.48,-89,a),a:surface(adult,q,.62,-166,a),h:hash(i+seed*13),part});
    }
  }
  tube([[10,0,5.8,5.8],[26,0,6.4,6.4]],[[14,0,7.5,8],[24,0,8,8.4]],110,71);
  tube([[24,0,6.5,6.5],[33,0,19,10],[40,0,24,12],[57,0,22,13],[79,0,18,11],[94,0,21,12],[103,0,20,11]],
    [[17,0,8,8],[29,0,15,10],[37,0,34,13],[46,0,37,15],[61,0,32,17],[84,0,26,15],[104,0,23,13],[121,0,29,15],[137,0,27,15],[147,0,22,13]],2600,51);
  for(const side of [-1,1]){
    tube([[94,11,10.5,10],[115,12,10,10],[137,12,7,8],[148,12,6,6.5],[168,13,6.7,7],[186,13,4,4.5]],
      [[132,15,13,13],[153,16,13,13],[179,17,10.4,11],[199,17,7.4,8],[220,17,9,9],[244,18,6,6.5],[263,18,4.7,5]],1300,111+side,side,'leg');
    tube([[34,22,6,7],[49,28,7,7],[70,30,5.8,6],[90,32,4.5,5],[105,33,3.7,4]],
      [[36,32,8,9],[48,36,10,10],[72,39,8,8],[90,42,6.4,7],[107,44,7.3,7.5],[131,45,4.5,5]],850,141+side,side,'arm');
    ellipsoid([side*15.8,-35.7,-.4],[side*27.9,-79.8,-.6],[2.2,3.9,2.1],[3.4,7.4,3.3],110,181+side,'arm');
    ellipsoid([side*6.2,1.2,-2.4],[side*11.2,-3,-3.7],[2.6,2.2,4.8],[4,3.1,8.7],140,191+side,'leg');
  }
  // The pullback, shared by world and web: the camera turns and rises by this much,
  // and starts this much closer to the web than where it lands.
  const TURN=.38,RISE=.3,NEAR=.2;
  function geometry(t,K={}){
    const start=K.f2??0,child=K.child??start+1.14,mind=K.child_intellect??child+.42;
    const survive=K.survive??mind+.96,changing=K.changing??survive+1.62,next=K.f3??changing+1.02;
    const enter=ramp(t,start-.05,start+.72),seen=ramp(t,child-.62,child-.04);
    const brain=ramp(t,mind-.05,mind+.62),grown=ramp(t,survive-.05,survive+1.2);
    const shift=ramp(t,changing-.16,changing+.42);
    // It lands just as un_reverse starts to dissolve in, so the two webs never double.
    const pull=ramp(t,changing+.02,next+.08);
    // Constant-ratio shrink reads as a steady camera move, not a sudden drop.
    const scale=Math.exp(Math.log(.012)*pull),phase=t-start;
    const ridgeX=-47+31*Math.sin(phase*.83-.5)+14*shift*Math.sin(phase*2.3);
    const ridgeZ=-10+8*Math.sin(phase*.53);
    // The bright ball is exactly attached to the moving Gaussian ridge. No
    // numerical integration or sampled maxima: random access stays identical.
    const height=(x,z)=>-10-(36+24*shift)*Math.exp(-((x-ridgeX)**2/2000+(z-ridgeZ)**2/3400))
      +(7+7*shift)*(1-Math.cos((x-ridgeX)/45))*Math.sin((z-ridgeZ)/37+phase*.9)
      +15*shift*Math.sin((x-ridgeX)/29)*Math.sin((z-ridgeZ)/31+phase*2.4);
    const cam0={cx:180,cy:284,yaw:-.22+.065*Math.sin(phase*.38),pitch:.43,f:900,distance:900,scale:1};
    const cam={...cam0,yaw:cam0.yaw+TURN*pull,pitch:cam0.pitch+RISE*pull};
    const pp=(x,y,z)=>UN.project([x,y,z],cam);
    const ball=pp(ridgeX,height(ridgeX,ridgeZ)-6.5,ridgeZ);
    // The feet ride the surface, so a stronger landscape never leaves them floating.
    const stand=pp(16,height(16,30),30),rest=UN.project([16,height(16,30),30],cam0);
    return {stand,rest,start,child,mind,survive,changing,next,enter,seen,brain,grown,shift,pull,scale,phase,ridgeX,ridgeZ,height,cam,pp,ball};
  }
  function human(t,g){
    const U=UN,{grown,phase,seen}=g;
    if(seen<=0)return '';
    const camera={cx:194+g.stand.x-g.rest.x,cy:g.stand.y-1,yaw:-.20+.04*Math.sin(phase*.4)+TURN*g.pull,
      pitch:RISE*g.pull,f:900,distance:900,scale:1};
    let dots='',soft='';
    for(let i=0;i<samples.length;i++){
      const v=samples[i],p=v.c.map((x,k)=>mix(x,v.a[k],grown));
      // Breathing and a quiet balancing gesture continue through the growth.
      if(v.part==='body')p[0]*=1+.008*Math.sin(phase*1.6);
      if(v.part==='arm'){
        p[0]+=Math.sign(p[0])*(2+3*grown)*Math.sin(phase*.85);
        p[1]+=.8*Math.sin(phase*.85+.4);
      }
      const pt=U.project(p,camera),front=clamp((15-pt.z)/30);
      // The skull thins out as the mind lights up, or the network cannot be seen.
      const skull=v.part==='head'?1-.66*g.brain:1;
      const op=(.25+.48*front)*(.66+.34*v.h)*seen*skull,r=.27+.23*v.h;
      const dot=`<circle cx="${n(pt.x)}" cy="${n(pt.y)}" r="${n(r)}" fill="#fff" opacity="${n(op)}"/>`;
      dots+=dot;if(i%8===0)soft+=dot;
    }
    let brain='';
    const headY=mix(HEAD_Y,-166,grown),nodes=[];
    const rx=mix(6,9.6,grown),ry=mix(7.4,13,grown);
    for(let i=0;i<23;i++){
      const a=i*2.399963,z=1-2*(i+.5)/23,r=Math.sqrt(1-z*z);
      nodes.push(U.project([rx*r*Math.cos(a),headY-1+ry*z,rx*r*Math.sin(a)],camera));
    }
    const h=U.project([0,headY-1,0],camera);
    brain+=`<ellipse cx="${n(h.x)}" cy="${n(h.y)}" rx="${n(mix(19,30,grown))}" ry="${n(mix(20,32,grown))}" fill="url(#un-halo)" opacity="${n(.9*g.brain)}"/>`;
    for(let i=0;i<nodes.length;i++){
      const a=nodes[i],b=nodes[(i+5)%nodes.length],c=nodes[(i+8)%nodes.length];
      const lit=ramp(g.brain,.42*hash(i+71),.42*hash(i+71)+.58);
      const flow=.5+.32*Math.sin(t*1.9-i*.41)**2;
      brain+=U.thread(a,b,{opacity:lit*flow,width:.42})+U.thread(a,c,{opacity:lit*flow*.62,width:.34});
      brain+=U.thread(a,b,{opacity:lit*.2,width:1.3,glow:true});
      brain+=U.sphere(a.x,a.y,.78,{opacity:.95*lit,glow:.9,highlight:false});
    }
    return `<g filter="url(#un-soft)" opacity=".4">${soft}</g>${dots}${brain}`;
  }
  function landscape(t,g){
    const U=UN,{pp,height,ridgeX,ridgeZ,ball}=g;
    const rows=[],nx=32,nz=23;
    for(let j=0;j<=nz;j++){
      const row=[];for(let i=0;i<=nx;i++){
        const x=-142+i/nx*284,z=-63+j/nz*126;
        row.push(pp(x,height(x,z),z));
      }rows.push(row);
    }
    let s='';
    for(let j=0;j<=nz;j++)s+=U.polyline(rows[j],{opacity:.13+.12*j/nz,width:.4});
    for(let i=0;i<=nx;i++)s+=U.polyline(rows.map(r=>r[i]),{opacity:.19,width:.4});
    const crest=[];
    for(let i=0;i<=56;i++){
      const x=ridgeX-35+i/56*70;
      crest.push(pp(x,height(x,ridgeZ)-.5,ridgeZ));
    }
    s+=U.polyline(crest,{width:1.5,opacity:.27,glow:true})+U.polyline(crest,{width:.55,opacity:.54});
    const contact=pp(ridgeX,height(ridgeX,ridgeZ),ridgeZ);
    s+=`<ellipse cx="${n(contact.x)}" cy="${n(contact.y+1)}" rx="7" ry="2.2" fill="#000" opacity=".7"/>`;
    s+=U.sphere(ball.x,ball.y,5.3*ball.s,{glow:1.25});
    s+=U.weight(ball.x,ball.y,6*ball.s,1.7*ball.s,{opacity:.19,angle:g.phase*18});
    return s;
  }
  function body(t,K={},mode){
    const U=UN,g=geometry(t,K);
    const previous=g.enter<1&&typeof SCENES.un_super?.body==='function'?SCENES.un_super.body(t,K):'';
    if(g.enter<1e-9)return previous;
    // The web starts with the dolly, on its own clock: light lost by the shrinking
    // person is replaced at once, so the pullback never passes through black.
    const outside=ramp(t,g.changing+.02,g.changing+.68);
    // One continuous dolly: the whole little world shrinks onto one web node.
    const home=SCENES.un_reverse?.node?.(t,K,0)??{x:180,y:190};
    const px=194,py=205,x=mix(px,home.x,g.pull),y=mix(py,home.y,g.pull);
    let local=`<defs><radialGradient id="un-child-shade"><stop stop-color="#000" stop-opacity=".9"/><stop offset=".68" stop-color="#000" stop-opacity=".75"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs><ellipse cx="194" cy="181" rx="61" ry="105" fill="url(#un-child-shade)" opacity="${n(outside)}"/>`+landscape(t,g)+human(t,g);
    const gone=ramp(t,g.next-.1,g.next+.4);
    local=`<g opacity="${n(1-gone)}" transform="translate(${n(x)} ${n(y)}) scale(${g.scale.toFixed(4)}) translate(${-px} ${-py})">${local}</g>`;
    // The same camera for the web: it comes back from close by, turned the same way,
    // with its node 0 held under the world. It lands exactly on un_reverse's own camera.
    let network='';
    if(outside>0&&typeof SCENES.un_reverse?.web==='function'){
      const base=SCENES.un_reverse.geometry(t,K),away=1-g.pull;
      const camera={distance:base.cam.distance*Math.pow(NEAR,away),yaw:base.cam.yaw-TURN*away,pitch:base.cam.pitch-RISE*away};
      const node=U.project(base.points[0],{...base.cam,...camera,cx:0,cy:0});
      network=SCENES.un_reverse.web(t,K,{opacity:outside,camera:{...camera,cx:x-node.x,cy:y-node.y}});
    }
    // The far background still moves a little, or the camera would seem to stand.
    const far=Math.pow(1.25,1-g.pull);
    const s=`<g transform="translate(180 320) scale(${far.toFixed(4)}) translate(-180 -320)">${U.bokeh(t,{seed:48,count:23,opacity:.48})}</g>`+network+local;
    if(g.enter>=1)return s;
    return `<g opacity="${n(1-g.enter)}">${previous}</g><g opacity="${n(g.enter)}">${s}</g>`;
  }
  SCENES.un_child=function(u,p={},d,t){return UN.wrap(body(t,p.K||{},p.mode));};
  SCENES.un_child.body=body;
  SCENES.un_child.geometry=geometry;
})();
