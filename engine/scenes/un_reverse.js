/* f3/f4 — the universe's own web fades, breaks, and gathers again on «вспять».
 * p.s="sf3"|"sf4", p.mode="decay"|"reverse": both are ONE trajectory of absolute t.
 * p.K: f3, need, own_world, herself, fades_again, sf3_end, destruction, reverse,
 * life, superintelligence. Neutral engine camera; a local 3D dolly enters the web.
 * Fading and scattering start on K.fades_again itself: by K.sf3_end the web is
 * clearly darker and the scatter runs on into f4.
 * In: un_child.body(t,K) dissolves over .5 s while it finishes its pullback.
 * Out: un_aware reuses body/node at the same absolute t, so the world is shared.
 * web(t,K,{opacity}) is the raw web, node(t,K,i) a node's live screen position.
 * Node 0 is the person from un_child: mono ТЫ follows it from K.f3+.2, the same
 * label as on the tower. un_aware takes the label over on K.superintelligence.
 * Pure, no RNG, u/d ignored. No other text. Meaningful action stays above y=370.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q, n=x=>x.toFixed(3);
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*x*(10+x*(-15+6*x));};
  const ramp=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const soft=(t,a,b)=>{const q=clamp((t-a)/(b-a));return q*q*(3-2*q);};
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
  function cues(K={}){
    const f3=K.f3??0,need=K.need??f3+.52,world=K.own_world??need+1.72;
    const herself=K.herself??world+.7,fades=K.fades_again??herself+1.04;
    const said=K.sf3_end??fades+.67;
    const destruction=K.destruction??fades+1.23,rev=K.reverse??destruction+1.68;
    const life=K.life??rev+.84,sup=K.superintelligence??life+1.56;
    return {f3,need,world,herself,fades,said,destruction,rev,life,sup};
  }
  function geometry(t,K={}){
    const c=cues(K),{f3,world,herself,fades,destruction,rev,life,sup}=c;
    // Quintic motion reaches zero velocity AND acceleration at the spoken
    // turn. All particles use this same coordinate, so none teleports home.
    // The first share leaves with «гаснет», with no slow quintic start.
    const out=.34*soft(t,fades,destruction+.15)+.66*ramp(t,destruction-.05,rev);
    const back=ramp(t,rev,life+.36);
    const entropy=out*(1-back),restore=ramp(t,rev,life);
    const inside=ramp(t,world-.15,herself+.8)*(1-ramp(t,life-.15,sup+.2));
    const cam={cx:180,cy:193,f:850,distance:mix(850,470,inside),
      scale:1-.07*entropy,yaw:-.22+.09*ramp(t,f3,fades)+.14*entropy+.018*Math.sin(t*.23),
      pitch:.11+.035*Math.sin(t*.17)+.04*inside};
    const points=vertices.map((v,i)=>v.map((a,k)=>a*(1+.24*entropy)+
      entropy*(hash(i*7+k+37)-.5)*21+Math.sin(t*.29+i+k)*.6));
    return {...c,out,back,entropy,restore,inside,cam,points};
  }
  // Damage goes one by one from «гаснет», the first nodes are hit on the word
  // itself; span and len are shares of the word. Every wound closes by K.life.
  const damage=(t,g,h,span,len)=>{
    const said=g.said-g.fades,a=g.fades+said*span*h;
    return soft(t,a,a+said*len)*(1-ramp(t,g.rev+.22*h,g.life-.14*(1-h)));
  };
  function web(t,K={},options={}){
    const U=UN,g=geometry(t,K),{entropy:e,restore,points}=g;
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
      const fracture=damage(t,g,hash(ei+501),1.1,.9);
      const op=(.18+.15*hash(ei+79))*(1-.8*fracture);
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
        const op=(.26+.4*h)*(1-.3*fracture)*(.78+.22*Math.sin(t*.8+j+ei)**2);
        const circle=`<circle cx="${n(x)}" cy="${n(y)}" r="${n(.3+.36*h+.6*e)}" fill="#fff" opacity="${n(op)}"/>`;
        dust+=circle;if(j%4===0)soft+=circle;
      }
      // A returning spark travels along the repaired thread, without a flash.
      const pulse=restore*(.5+.5*Math.sin(t*1.8-ei*.5))*.38;
      const q=(t*.22+hash(ei+174))%1,v=curve(q);
      filaments+=U.sphere(v.x,v.y,.65,{opacity:pulse*Math.sin(Math.PI*q)**2,glow:1.1,highlight:false});
    }
    const ordered=points.map((v,i)=>({...pp(v),i})).sort((a,b)=>b.z-a.z);
    for(const p of ordered){
      const h=hash(p.i+51),fracture=damage(t,g,hash(p.i+311),.95,.9),alive=1-.66*fracture;
      const r=(p.i===0?4.4:1.7+1.7*h)*Math.sqrt(p.s);
      let cluster='';
      // Spiral dust opens into many separate particles, then reuses precisely
      // the same trajectories in reverse. The nucleus remains faintly visible.
      for(let j=0;j<34;j++){
        const a=j*2.399963+p.i*.7,radius=(2+10*Math.sqrt((j+.5)/34)+e*(11+18*hash(j+p.i*43)));
        const x=p.x+Math.cos(a+e*.45)*radius*p.s;
        const y=p.y+Math.sin(a+e*.45)*radius*.43*p.s;
        cluster+=`<circle cx="${n(x)}" cy="${n(y)}" r="${n(.32+.32*hash(j+p.i*31)+.6*e)}" fill="#fff" opacity="${n((.42+.38*h)*(1-.42*fracture))}"/>`;
        if(j%3===0){
          const trail=velocity*(11+18*hash(j+p.i*43))*p.s;
          cluster+=U.thread([x-Math.cos(a+e*.45)*trail,y-Math.sin(a+e*.45)*trail*.43],[x,y],
            {width:.55,opacity:Math.min(.38,Math.abs(velocity)*4)});
        }
      }
      cluster+=U.sphere(p.x,p.y,r*(1-.3*fracture),{opacity:(.65+.3*h)*alive,glow:1.1+.3*restore});
      cluster+=`<ellipse cx="${n(p.x)}" cy="${n(p.y)}" rx="${n(14*p.s)}" ry="${n(5*p.s)}" fill="url(#un-halo)" opacity="${n(.48*alive)}"/>`;
      cores+=p.z>65?`<g filter="url(#un-soft)">${cluster}</g>`:cluster;
    }
    return `<g opacity="${n(alpha)}">${filaments}<g filter="url(#un-soft)" opacity=".45">${soft}</g>${dust}${cores}</g>`;
  }
  function node(t,K={},i=0){
    const g=geometry(t,K);
    return UN.project(g.points[i],g.cam);
  }
  function body(t,K={},mode){
    const g=geometry(t,K),enter=ramp(t,g.f3-.05,g.f3+.45);
    const gloom=damage(t,g,0,0,1);
    let s=UN.bokeh(t,{seed:48,count:23,opacity:.48*(1-.6*gloom)})+web(t,K);
    // The viewer stays marked: node 0 is «ты», from the web's entrance to the tree.
    const tag=ramp(t,g.f3+.2,g.f3+.6);
    if(tag>0&&t<g.sup){
      const me=node(t,K,0);
      s+=`<g stroke="#000" stroke-width="2.2" stroke-linejoin="round" paint-order="stroke">${UN.mono(me.x+9,me.y+3,'ТЫ',{size:9.6,opacity:.96*tag})}</g>`;
    }
    if(enter<1){
      const previous=typeof SCENES.un_child?.body==='function'?SCENES.un_child.body(t,K):'';
      if(enter<1e-9)return previous;
      s=`<g opacity="${n(1-enter)}">${previous}</g><g opacity="${n(enter)}">${s}</g>`;
    }
    return s;
  }
  SCENES.un_reverse=function(u,p={},d,t){return UN.wrap(body(t,p.K||{},p.mode));};
  SCENES.un_reverse.body=body;
  SCENES.un_reverse.geometry=geometry;
  SCENES.un_reverse.web=web;
  SCENES.un_reverse.node=node;
})();
