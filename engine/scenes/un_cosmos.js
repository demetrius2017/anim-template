/* s11 — the last parent network becomes a deep cosmic web, then two spheres.
 * p.s='s11', p.mode='return'; p.K: ABSOLUTE s11, cosmos, beginning,
 * number_return, weight_return, power, s11_end, s12. No state or u/d clocks.
 * Neutral runtime camera {z0:1,z1:1,drift:0,kicks:0}; local 3D dolly.
 * An optional read-only handoff uses the preceding scene during the opening
 * dissolve; otherwise this mesh is self-contained. Final pose: y=80..342.
 */
(() => {
  const lerp=(a,b,q)=>a+(b-a)*q,n=v=>v.toFixed(3),ratio=6.5;
  const hash=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};
  const vertices=[[0,0,0]];
  for(let i=0;i<43;i++){
    const angle=i*2.3999632297+2*.73,r=23+112*Math.sqrt(hash(i+40+2*137));
    vertices.push([Math.cos(angle)*r,Math.sin(angle)*r*.92,(hash(i+561+2*37)-.5)*135]);
  }
  const links=[];
  for(let i=0;i<vertices.length;i++){
    const near=vertices.map((p,j)=>({j,d:p.reduce((s,v,k)=>s+(v-vertices[i][k])**2,0)}))
      .filter(p=>p.j!==i).sort((a,b)=>a.d-b.d).slice(0,i===0?5:3);
    for(const v of near)if(v.j>i)links.push([i,v.j]);
  }
  const partner=links[0][1];
  SCENES.un_cosmos=function(u,p,d,t){
    const U=UN,K=p.K||{},start=K.s11??0;
    const cue=(key,offset)=>K[key]??start+offset;
    const ramp=(a,b)=>U.smooth((t-a)/Math.max(.001,b-a));
    const cosmic=ramp(cue('cosmos',.8),cue('beginning',2.5));
    const dolly=ramp(cue('beginning',2.5),cue('s11_end',7.3)-.22);
    const clear=ramp(cue('power',5.3),cue('s11_end',7.3)-.32);
    const openingScale=Math.pow(ratio,.08);
    const camera={cx:180,cy:lerp(lerp(184,194,cosmic),211,dolly),f:800,distance:800,
      scale:lerp(openingScale,262/36,dolly),
      yaw:lerp(lerp(-.28+.07*Math.sin(t*.15)+.66,-.24,cosmic),0,dolly),
      pitch:lerp(lerp(.10*Math.sin(t*.14+3),.16,cosmic),0,dolly)};
    const pp=v=>U.project(v,camera);
    const nodes=vertices.map((v,i)=>{
      const target=i===0?[0,-18,0]:i===partner?[0,18,0]:
        [v[0]*1.12+(U.hash(i+201)-.5)*40,v[1]*1.08+(U.hash(i+251)-.5)*32,v[2]*2.1];
      return v.map((a,j)=>lerp(a,target[j],cosmic)+cosmic*(1-dolly)*Math.sin(t*.2+i+j)*.9);
    });
    let s=U.bokeh(t,{seed:48,count:23,opacity:.6*(1-clear)})+
      U.bokeh(t,{seed:17,count:26,opacity:.15*clear});
    // Tiny parent remnants dissolve as the outer network opens.
    for(let level=1;level<=2;level++){
      const scale=Math.pow(ratio,level-3.05),c={cx:180,cy:184,scale,f:800,distance:800,
        yaw:-.28+.07*Math.sin(t*.15)+level*.22,pitch:.10*Math.sin(t*.14+level)};
      const points=vertices.map(v=>U.project(v,c)),alpha=1-cosmic;
      for(const [a,b] of links)s+=U.thread(points[a],points[b],{width:Math.max(.25,.48*Math.sqrt(scale)),opacity:.32*alpha});
      for(let i=1;i<points.length;i++){
        const v=points[i];s+=U.sphere(v.x,v.y,(2.4+1.8*U.hash(i+level*17))*v.s,{opacity:alpha*(.64+.2*Math.sin(i+t*.4)),glow:.9});
      }
      const collapse=1-U.smooth((scale-.10)/.21);
      s+=U.sphere(180,184,Math.max(.4,3.9*scale*ratio),{opacity:collapse*alpha*.78});
    }
    let lines='',dust='',cores='';
    links.forEach(([ia,ib],ei)=>{
      if(ia===0&&ib===partner)return;
      const a=nodes[ia],b=nodes[ib],bend=(U.hash(ei+701)-.5)*36*cosmic;
      const curve=(q,off=0)=>{
        const arch=Math.sin(q*Math.PI);
        return pp([lerp(a[0],b[0],q)+arch*(bend+off),lerp(a[1],b[1],q)+arch*bend*.45,
          lerp(a[2],b[2],q)+arch*bend*.7]);
      };
      const depth=U.hash(ei+901),op=lerp(.32,.14+.20*depth,cosmic)*(1-clear);
      const pts=Array.from({length:17},(_,j)=>curve(j/16));
      lines+=U.polyline(pts,{width:lerp(.48*Math.sqrt(openingScale),.38,cosmic),opacity:op});
      lines+=U.polyline(pts,{width:2.5,opacity:op*.45*cosmic,glow:true});
      for(const off of [-3.4,3.4])lines+=U.polyline(Array.from({length:17},(_,j)=>curve(j/16,off)),{width:.25,opacity:op*.48*cosmic});
      for(let j=1;j<25;j++){
        const q=(j+U.hash(ei*29+j)*.6)/26,v=curve(q,(U.hash(j+ei*19)-.5)*7);
        const pulse=.72+.28*Math.sin(t*.8-ei*.4-j*.2)**2;
        dust+=`<circle cx="${n(v.x)}" cy="${n(v.y)}" r="${n((.25+.32*U.hash(j+ei))*Math.min(1.7,Math.sqrt(v.s)))}" fill="#fff" opacity="${n(op*cosmic*pulse*1.6)}"/>`;
      }
    });
    const ordered=nodes.map((v,i)=>({...pp(v),i})).sort((a,b)=>b.z-a.z);
    for(const v of ordered){
      if(v.i===0||v.i===partner)continue;
      const h=U.hash(v.i+51),alpha=lerp(.64+.2*Math.sin(v.i+t*.4),.42+.5*h,cosmic)*(1-clear);
      const r=lerp((2.4+1.8*h)*v.s,(1.4+1.8*h)*Math.sqrt(v.s),cosmic);
      let core=U.sphere(v.x,v.y,r,{opacity:alpha,glow:1.2,highlight:h>.3});
      if(h>.25)for(let j=0;j<18;j++){
        const angle=j*2.399+v.i,rad=(2+U.hash(j+v.i*27)*12)*Math.sqrt(v.s);
        core+=`<circle cx="${n(v.x+Math.cos(angle)*rad)}" cy="${n(v.y+Math.sin(angle)*rad*.45)}" r=".55" fill="#fff" opacity="${n(.6*alpha*cosmic)}"/>`;
      }
      cores+=v.z>75?`<g filter="url(#un-soft)">${core}</g>`:core;
    }
    s+=lines+`<g filter="url(#un-soft)" opacity=".4">${dust}</g>`+dust+cores;
    const a=pp(nodes[0]),b=pp(nodes[partner]);
    a.x+=dolly*(2+Math.sin(t*.4)*1.8);
    const ring={x:lerp(a.x,b.x,150/262),y:lerp(a.y,b.y,150/262)};
    s+=U.thread(a,b,{opacity:lerp(.32,.48,dolly),width:.55});
    const weight=ramp(cue('weight_return',4.4),cue('weight_return',4.4)+.6);
    s+=U.weight(ring.x,ring.y,lerp(4,36,dolly),lerp(1,5.2,dolly),{opacity:.67*weight,angle:2*Math.sin(t*.23)*(1-dolly)});
    s+=U.sphere(a.x,a.y,lerp(.5,9,dolly),{glow:1.1})+
      U.sphere(b.x,b.y,lerp((2.4+1.8*U.hash(partner+51))*openingScale,6,dolly));
    const number=ramp(cue('number_return',3.2),cue('number_return',3.2)+.6)*(1-ramp(cue('power',5.3)-.2,cue('power',5.3)+.3));
    s+=U.italic(88,230,'Число,',{size:21,opacity:.9*number,glow:true});
    const power=ramp(cue('power',5.3),cue('power',5.3)+.45)*(1-ramp(cue('s11_end',7.3)-.22,cue('s12',7.6)-.1));
    s+=U.mono(214,164,'10⁸⁰',{size:25,opacity:.94*power});
    // Other authors can refine D without making our first frame jump. Reuse
    // only its content, never its black backing/defs/UN wrapper (one ID set).
    // Its own camera keeps evaluating absolute t during this short dissolve.
    const handoff=ramp(start-.05,cue('cosmos',.8)+.28);
    if(handoff<1&&typeof SCENES.un_nested==='function'){
      const previous=SCENES.un_nested(0,{s:'s10',mode:'nested',K},d,t);
      const marker='<g clip-path="url(#un-safe)">',at=previous.indexOf(marker);
      if(at>=0&&previous.endsWith('</g></g>')){
        const raw=previous.slice(at+marker.length,-8);
        s=`<g opacity="${n(1-handoff)}">${raw}</g><g opacity="${n(handoff)}">${s}</g>`;
      }
    }
    return U.wrap(s);
  };
})();
