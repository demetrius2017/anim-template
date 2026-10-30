/* s14/s15 — the empty token opens into a person made of the cosmic web.
 * p.s: s14|s15; p.mode: reveal|question. Both evaluate ONE continuous shot.
 * p.K: ABSOLUTE cues s14, super_you, superhuman, why, answer, simple, s16,
 * final_you, token, part2_end, card, and K.words. No animation state or u/d.
 * Neutral runtime camera {z0:1,z1:1,drift:0,kicks:0}; local slow 3D dolly.
 * Input: exact un_tokens final empty pill, including its almost-zero opacity.
 * s16 HANDOFF: SCENES.un_super.body(t,K) returns unwrapped, live SVG with
 * no background/defs; wrap ONCE in un_aware. At K.s16-.05 it is identical
 * to s15. Continue evaluating absolute t during the opening s16 dissolve.
 * SCENES.un_super.geometry(t,K).seed gives the projected forehead node;
 * .camera gives the live camera. These helpers do not modify shared UN.
 * Meaningful content y=16..370. No numbers/new claims; captions below 410.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q, n=v=>v.toFixed(3);
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
  const ramp=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const H=i=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v);};
  const cue=(K,key,fall)=>K[key]??fall;
  const points=[],detail=[];
  // Anatomical surface samples: shoulder slope, waist, separate hands/feet.
  // The sparse graph sits on the same proportions as the earlier point human.
  function shell(center,radii,count,seed,head=false,target=points) {
    for(let i=0;i<count;i++) {
      const v=1-2*(i+.5)/count,a=i*2.3999632297+seed,ring=Math.sqrt(1-v*v);
      let x=radii[0]*ring*Math.cos(a),y=radii[1]*v,z=radii[2]*ring*Math.sin(a);
      if(head){
        x*=1-.19*ease((v-.08)/.8);
        if(z<0)z-=4.5*Math.exp(-x*x/12-((y-4)/8)**2);
      }
      target.push([center[0]+x,center[1]+y,center[2]+z]);
    }
  }
  function tube(keys,count,seed,sign=1,target=points) {
    for(let i=0;i<count;i++) {
      const y=mix(keys[0][0],keys[keys.length-1][0],(i+.5)/count);
      let j=1;while(j<keys.length-1&&keys[j][0]<y)j++;
      const a=keys[j-1],b=keys[j],q=ease((y-a[0])/(b[0]-a[0]));
      const cx=mix(a[1],b[1],q),rx=mix(a[2],b[2],q),rz=mix(a[3],b[3],q);
      const angle=i*2.3999632297+seed;
      target.push([sign*(cx+rx*Math.cos(angle)),y,rz*Math.sin(angle)]);
    }
  }
  for(const [target,density] of [[points,1],[detail,12]]) {
    shell([0,-120,0],[21,28,22],72*density,31,true,target);
    shell([0,-94,1],[9,11,8],14*density,77,false,target);
    tube([[-103,0,8,8],[-93,0,14,10],[-82,0,36,14],[-70,0,39,17],
      [-48,0,32,18],[-18,0,25,14],[9,0,29,16],[28,0,24,14]],128*density,41,1,target);
    for(const sign of [-1,1]) {
      tube([[-81,35,9,10],[-64,41,10,10],[-34,47,7,8],[-13,51,7,8],
        [12,54,4.8,5]],38*density,110+sign,sign,target);
      shell([sign*54,21,-1],[5.7,12,5.6],12*density,310+sign,false,target);
      tube([[15,15,13,14],[39,17,13,13],[65,19,10,11],[86,20,7.5,8],
        [110,21,8.5,9],[140,23,5,5.5]],55*density,410+sign,sign,target);
      shell([sign*23,143,-5],[6.8,5,13],12*density,610+sign,false,target);
    }
  }
  // Every strand belongs to the fixed body topology: no resampling per frame.
  const edges=[];
  for(let i=0;i<points.length;i++) {
    const near=points.map((p,j)=>({j,d:p.reduce((s,v,k)=>s+(v-points[i][k])**2,0)}))
      .filter(v=>v.j!==i).sort((a,b)=>a.d-b.d).slice(0,4);
    for(const v of near)if(v.j>i&&v.d<37*37)edges.push([i,v.j]);
  }
  const dispersed=p=>[p[0]*2.7+55*Math.sin(p[1]*.027),
    p[1]*.78+30*Math.cos(p[0]*.035),p[2]*3.4+45*Math.sin(p[1]*.023)];
  const cloud=points.map(dispersed);

  function geometry(t,K={}) {
    const start=cue(K,'s14',0),born=cue(K,'super_you',start+.98),human=cue(K,'superhuman',born+.98);
    const why=cue(K,'why',human+1.29),answer=cue(K,'answer',why+1.74),simple=cue(K,'simple',answer+1.06);
    const close=ramp(t,why-.22,simple+.55),focus=ramp(t,answer+.08,simple+.65);
    const camera={cx:180,cy:mix(190,280,close),scale:mix(1,1.72,close)+.43*focus,
      yaw:-.24+.055*Math.sin(t*.24)+.13*close,pitch:.025+.018*Math.sin(t*.18),f:880,distance:880};
    // On "answer", the dolly changes its focus from the body to the forehead.
    // This gives s16 a physical root to inherit instead of a disconnected cut.
    const localSeed=UN.project([0,-125,-18],{...camera,cx:0,cy:0});
    camera.cx=mix(camera.cx,180-localSeed.x,focus);
    camera.cy=mix(camera.cy,148-localSeed.y,focus);
    const bornProgress=ramp(t,born,human+.8);
    const model=points.map((p,i)=>{
      const settle=ramp(t,born+.08+.19*H(i+331),human+.42+.16*H(i+741));
      const breathing=1+.012*Math.sin(t*1.1)*Math.exp(-Math.pow((p[1]+50)/58,2));
      const target=[p[0]*1.14*breathing,p[1],p[2]];
      const arc=Math.sin(Math.PI*settle)**2;
      const pos=target.map((v,j)=>mix(cloud[i][j],v,settle)+arc*Math.sin(i*.7+j)*7);
      return {p:UN.project(pos,camera),settle,alpha:ramp(t,born+.18*H(i+91),born+.52+.18*H(i+91)),i};
    });
    const seed=UN.project([0,-125,-18],camera);
    return {start,born,human,why,answer,simple,close,focus,camera,model,seed,bornProgress};
  }

  function pill(t,K,g) {
    const {start,born,human}=g;
    const cut=start-.05;
    const x0=q=>180+Math.sin(q*.31)*1.4,y0=q=>211+Math.cos(q*.27)*1.7;
    const oldCard=K.part2_end??start,finalYou=K.final_you??start-.82;
    const oldFade=q=>1-UN.smooth((q-finalYou-.18)/Math.max(.001,oldCard-finalYou-.18));
    // Keep the original fading trajectory for the first 50 ms. The recovering
    // light starts with zero derivative, so there is no brightness step at cut.
    const recovery=ramp(t,cut,born),legacy=oldFade(t),visibility=mix(legacy,1,recovery);
    const opening=ramp(t,born,born+.60),leaving=ramp(t,human+.1,human+.88);
    const alpha=visibility*(1-leaving),x=x0(t),y=mix(y0(t),199,opening);
    const w=mix(71.75,109,opening),h=mix(34.04,32,opening);
    const breath=.86+.14*Math.sin(t*1.35+3.5)**2,opacity=alpha*breath;
    let s=`<rect x="${n(x-w/2)}" y="${n(y-h/2)}" width="${n(w)}" height="${n(h)}" rx="${n(h/2)}" fill="none" stroke="#fff" stroke-width="2.1" opacity="${n(.34*opacity)}" filter="url(#un-soft)"/>`;
    s+=UN.token(x,y,'',{w,h,size:13,opacity});
    const blink=UN.smooth((Math.sin((t-cue(K,'token',start-3.23))*Math.PI*1.6)+.3)/.9);
    const cursor=visibility*blink*(1-opening)*(1-leaving);
    s+=UN.thread([x,y-5.8],[x,y+5.8],{width:.85,opacity:cursor})+
      UN.thread([x,y-5.8],[x,y+5.8],{width:2,opacity:cursor*.25,glow:true});
    s+=UN.mono(x,y+4,'сверх-ты',{size:13.3,anchor:'middle',opacity:opening*opacity*.95});
    return s;
  }

  function body(t,K={}) {
    if(t>=cue(K,'card',Infinity))return '';
    const U=UN,g=geometry(t,K),{model,born,human,why,answer,simple,seed,focus}=g;
    const present=ramp(t,born,born+.65),hush=ramp(t,why,answer);
    let s=U.bokeh(t,{seed:48,count:23,opacity:present*(.40-.23*hush)});
    let lines='',haze='',dust='',signals='',nodes='',surface='',softSurface='';
    for(let i=0;i<detail.length;i++) {
      const p=detail[i],q=ramp(t,born+.12+.19*H(i+331),human+.48+.16*H(i+741));
      const source=dispersed(p),breath=1+.012*Math.sin(t*1.1)*Math.exp(-Math.pow((p[1]+50)/58,2));
      const v=U.project([mix(source[0],p[0]*1.14*breath,q),mix(source[1],p[1],q),mix(source[2],p[2],q)],g.camera);
      const depth=clamp((25-v.z)/55),alpha=present*(.15+.38*depth)*(.60+.40*H(i+234));
      const r=(.24+.20*H(i+121))*Math.sqrt(v.s),dot=`<circle cx="${n(v.x)}" cy="${n(v.y)}" r="${n(r)}" opacity="${n(alpha)}"/>`;
      surface+=dot;if(i%5===0)softSurface+=dot;
    }
    for(let e=0;e<edges.length;e++) {
      const [ia,ib]=edges[e],a=model[ia],b=model[ib];
      const op=Math.min(a.alpha,b.alpha),depth=clamp((35-(a.p.z+b.p.z)/2)/70);
      const mid=(a.settle+b.settle)/2,bend=(1-mid)*8+(H(e+37)-.5)*4.5;
      const path=q=>({x:mix(a.p.x,b.p.x,q)+Math.sin(Math.PI*q)*bend,
        y:mix(a.p.y,b.p.y,q)+Math.sin(Math.PI*q)*bend*.45});
      const pts=Array.from({length:7},(_,j)=>path(j/6));
      const light=.075+.17*depth+.045*Math.sin(t*1.2-e*.38)**2;
      lines+=U.polyline(pts,{width:.33+.12*depth,opacity:op*light});
      if(e%4===0)haze+=U.polyline(pts,{width:1.5,opacity:op*.18});
      for(let j=1;j<7;j++) {
        const q=(j+H(e*13+j)*.4)/7.5,p=path(q),off=(H(e*19+j)-.5)*3.3;
        dust+=`<circle cx="${n(p.x+off)}" cy="${n(p.y+off*.7)}" r="${n(.25+.22*H(e+j*71))}" opacity="${n(op*(.20+.33*depth))}"/>`;
      }
      if(e%19===0) {
        const q=(t*.36+H(e+441))%1,p=path(q);
        signals+=U.sphere(p.x,p.y,.75+.35*depth,{opacity:op*.85*Math.sin(Math.PI*q)**2,glow:1.1,highlight:false});
      }
    }
    for(const v of [...model].sort((a,b)=>b.p.z-a.p.z)) {
      const {p,i,alpha}=v,depth=clamp((32-p.z)/65),light=.38+.45*depth;
      const r=(.45+.65*H(i+12))*Math.sqrt(p.s);
      if(i%7===0)nodes+=U.sphere(p.x,p.y,r*1.55,{opacity:alpha*light,glow:1.4,highlight:true});
      else nodes+=`<circle cx="${n(p.x)}" cy="${n(p.y)}" r="${n(r*.62)}" fill="#fff" opacity="${n(alpha*light)}"/>`;
    }
    s+=`<g filter="url(#un-soft)">${haze}<g fill="#fff">${softSurface}</g></g>${lines}<g fill="#fff">${dust}${surface}</g>${nodes}${signals}`;
    // The future root is part of the human's head, not a newly cut-in object.
    const root=ramp(t,answer,simple+.6),breath=.83+.17*Math.sin(t*1.3)**2;
    s+=U.sphere(seed.x,seed.y,mix(.7,2.5,root),{opacity:present*(.04+.96*root)*breath,glow:1.1+root});
    s+=pill(t,K,g);
    const question=ramp(t,why,why+.6)*(1-ramp(t,simple,simple+.70));
    s+=U.italic(285+Math.sin(t*.2)*1.2,112,'зачем?',{size:23,anchor:'middle',opacity:.93*question});
    return s;
  }
  SCENES.un_super=function(u,p={},d,t){return UN.wrap(body(t,p.K||{}));};
  SCENES.un_super.body=body;
  SCENES.un_super.raw=body;
  SCENES.un_super.geometry=geometry;
})();
