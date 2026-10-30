/* s17 — the same cosmic filaments disperse, brake, and gather on «вспять».
 * p.s="s17", p.mode="reverse", p.K: absolute measured word cues:
 * s17/s18, awareness_universe, direct, destruction, reverse, prolong, life.
 * Neutral engine camera; a slow local orbit follows the reversible expansion.
 * Incoming s16 is evaluated at absolute t, then dissolved over 1.25 s. No
 * duplicated UN wrapper/IDs. body/geometry/web are pure handoffs to un_child.
 * Meaningful action stays above y=370. No text, extra facts or frame state.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q, n=x=>x.toFixed(3);
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*x*(10+x*(-15+6*x));};
  const ramp=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const hash=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  const vertices=[[0,-18,0],[-61,-74,12],[56,-66,-18],[-99,-28,23],
    [-51,12,-34],[58,15,24],[111,-16,-22],[-92,78,-13],[-26,81,32],
    [73,78,-28],[10,120,14],[-17,-115,25],[88,-106,45],[-126,21,36],
    [125,49,52],[-68,113,43],[42,-112,-43],[3,34,-48],[106,112,17],
    [-108,-102,-35],[23,-51,51],[-22,2,46],[41,108,-53]];
  const links=[];
  for(let i=0;i<vertices.length;i++){
    const near=vertices.map((p,j)=>({j,d:p.reduce((s,x,k)=>s+(x-vertices[i][k])**2,0)}))
      .filter(p=>p.j!==i).sort((a,b)=>a.d-b.d).slice(0,3);
    for(const p of near)if(!links.some(e=>e[0]===p.j&&e[1]===i))links.push([i,p.j]);
  }
  function geometry(t,K={}){
    const start=K.s17??K.awareness_universe??0,rev=K.reverse??start+4.22;
    const life=K.life??rev+1.2;
    // Quintic motion reaches zero velocity AND acceleration at the spoken
    // turn. All particles use this same coordinate, so none teleports home.
    const out=ramp(t,start+.38,rev),back=ramp(t,rev,life+.54);
    const entropy=out*(1-back),restore=ramp(t,rev,life+.42);
    const fracture=ramp(t,K.direct??start+2.34,rev)*(1-back);
    const cam={cx:180,cy:193,f:850,distance:850,
      scale:1-.07*entropy,yaw:-.22+.14*entropy+.018*Math.sin(t*.23),
      pitch:.11+.035*Math.sin(t*.17)};
    const points=vertices.map((v,i)=>v.map((a,k)=>a*(1+.24*entropy)+
      entropy*(hash(i*7+k+37)-.5)*21+Math.sin(t*.29+i+k)*.6));
    return {start,rev,life,out,back,entropy,restore,fracture,cam,points};
  }
  function web(t,K={},options={}){
    const U=UN,g=geometry(t,K),{entropy:e,fracture,restore,points}=g;
    const cam={...g.cam,...options.camera},pp=v=>U.project(v,cam);
    const alpha=options.opacity??1;
    const velocity=e-geometry(t-.14,K).entropy;
    let filaments='',dust='',soft='',cores='';
    for(let ei=0;ei<links.length;ei++){
      const [ia,ib]=links[ei],a=points[ia],b=points[ib];
      const bend=(hash(ei+701)-.5)*24;
      const curve=(q,off=0)=>{
        const arch=Math.sin(q*Math.PI);
        return pp([mix(a[0],b[0],q)+arch*(bend+off),mix(a[1],b[1],q)+arch*bend*.4,
          mix(a[2],b[2],q)+arch*bend*.6]);
      };
      const op=(.18+.15*hash(ei+79))*(1-.89*fracture);
      // A physical gap opens in each thread; its two tips meet again.
      const gap=.46*fracture,extent=.5-gap;
      for(const side of [0,1]){
        const path=Array.from({length:13},(_,j)=>curve(side?1-j/12*extent:j/12*extent));
        filaments+=U.polyline(path,{width:.43,opacity:op});
        filaments+=U.polyline(path,{width:2,opacity:op*.32,glow:true});
      }
      for(let j=0;j<19;j++){
        const q=(j+.5)/19,base=curve(q),h=hash(ei*67+j+18);
        const angle=h*Math.PI*2,spread=e*(5+16*hash(ei*31+j+99));
        const x=base.x+Math.cos(angle)*spread,y=base.y+Math.sin(angle)*spread;
        const op=(.26+.4*h)*(1+.25*fracture)*(.78+.22*Math.sin(t*.8+j+ei)**2);
        const circle=`<circle cx="${n(x)}" cy="${n(y)}" r="${n(.3+.36*h+.12*e)}" fill="#fff" opacity="${n(op)}"/>`;
        dust+=circle;if(j%4===0)soft+=circle;
      }
      // A returning spark travels along the repaired thread, without a flash.
      const pulse=restore*(.5+.5*Math.sin(t*1.8-ei*.5))*.38;
      const q=(t*.22+hash(ei+174))%1,v=curve(q);
      filaments+=U.sphere(v.x,v.y,.65,{opacity:pulse*Math.sin(Math.PI*q)**2,glow:1.1,highlight:false});
    }
    const ordered=points.map((v,i)=>({...pp(v),i})).sort((a,b)=>b.z-a.z);
    for(const p of ordered){
      const h=hash(p.i+51),alive=1-.95*fracture;
      const r=(p.i===0?4.4:1.7+1.7*h)*Math.sqrt(p.s);
      let cluster='';
      // Spiral dust opens into many separate particles, then reuses precisely
      // the same trajectories in reverse. The nucleus remains faintly visible.
      for(let j=0;j<34;j++){
        const a=j*2.399963+p.i*.7,radius=(2+10*Math.sqrt((j+.5)/34)+e*(11+18*hash(j+p.i*43)));
        const x=p.x+Math.cos(a+e*.45)*radius*p.s;
        const y=p.y+Math.sin(a+e*.45)*radius*.43*p.s;
        cluster+=`<circle cx="${n(x)}" cy="${n(y)}" r="${n(.32+.32*hash(j+p.i*31)+.13*e)}" fill="#fff" opacity="${n((.42+.38*h)*(1-.12*fracture))}"/>`;
        if(j%3===0){
          const trail=velocity*(11+18*hash(j+p.i*43))*p.s;
          cluster+=U.thread([x-Math.cos(a+e*.45)*trail,y-Math.sin(a+e*.45)*trail*.43],[x,y],
            {width:.55,opacity:Math.min(.38,Math.abs(velocity)*4)});
        }
      }
      cluster+=U.sphere(p.x,p.y,r*(1-.45*fracture),{opacity:(.65+.3*h)*alive,glow:1.1+.3*restore});
      cluster+=`<ellipse cx="${n(p.x)}" cy="${n(p.y)}" rx="${n(14*p.s)}" ry="${n(5*p.s)}" fill="url(#un-halo)" opacity="${n(.48*alive)}"/>`;
      cores+=p.z>65?`<g filter="url(#un-soft)">${cluster}</g>`:cluster;
    }
    return `<g opacity="${n(alpha)}">${filaments}<g filter="url(#un-soft)" opacity=".45">${soft}</g>${dust}${cores}</g>`;
  }
  function unwrap(svg){
    const marker='<g clip-path="url(#un-safe)">',at=svg.indexOf(marker);
    return at>=0&&svg.endsWith('</g></g>')?svg.slice(at+marker.length,-8):'';
  }
  function body(t,K={}){
    const start=K.s17??K.awareness_universe??0;
    const enter=ramp(t,start-.05,start+1.2);
    let s=UN.bokeh(t,{seed:48,count:23,opacity:.48})+web(t,K);
    if(enter<1&&typeof SCENES.un_aware==='function'){
      const previous=SCENES.un_aware.body?SCENES.un_aware.body(t,K):
        unwrap(SCENES.un_aware(0,{s:'s16',mode:'awareness',K},0,t));
      if(enter<1e-9)return previous;
      // s16 can reuse our raw web. Do not alpha-composite that same glass
      // twice: the extra translucent layer would create an exposure dip.
      if(SCENES.un_aware.web&&SCENES.un_aware.web(t,K)===s)return s;
      s=`<g opacity="${n(1-enter)}">${previous}</g><g opacity="${n(enter)}">${s}</g>`;
    }
    return s;
  }
  SCENES.un_reverse=function(u,p={},d,t){return UN.wrap(body(t,p.K||{}));};
  SCENES.un_reverse.body=body;
  SCENES.un_reverse.geometry=geometry;
  SCENES.un_reverse.web=web;
})();
