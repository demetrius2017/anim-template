/* Universe Net v2, phrases 2-3: the base of the right tower becomes an atom,
 * a second atom makes a bond, and the bond resolves into the source film's
 * opening picture: two balls on a thread with a weight ring.
 * p.s: s2 / s3; p.mode: atom / bond (editorial labels of one continuous world).
 * p.K: ABSOLUTE cues from build/cues.json: s2, atom, ordinary, second, bond,
 * strength, bond_weight, recognize and K.words["3"]. No u/d clock, no state.
 * Entry: dolly in from SCENES.un_towers.body(t,K,'ghost'), held on the base from
 * SCENES.un_towers.state(t,K); without un_towers the ball rises out of black.
 * SCENES.un_atom.body(t,K,mode,{labels}) is raw SVG, no wrap and no background.
 * SCENES.un_atom.pose(t,K) gives the projected balls for un_energy's entry.
 * This file also defines window.UN_V2, used only by the un_* middle scenes:
 * UN_V2.prev(name,t,K,mode,o) samples a neighbour body, guarded against mutual
 * calls; UN_V2.towers(t,K) normalises un_towers.state to {left,right,chem,figure}:
 * left/right are {x,w,top:{x,y},base:{x,y}}, chem is the centre y of the first
 * floor, figure is {x,feet,h}. Brief coordinates apply when state is missing.
 * Recommended external camera: {z0:1,z1:1,drift:0,kicks:0,x0:0,y0:0}.
 * Main objects/labels y=16..370. No UI writes, random state or paid assets.
 */
(() => {
  const busy = new Set();
  const point = (v,x,y) => {
    if(Array.isArray(v))return {x:v[0]??x,y:v[1]??y};
    if(typeof v==='number')return {x,y:v};
    if(v&&typeof v==='object')return {x:v.x??x,y:v.y??y};
    return {x,y};
  };
  window.UN_V2 = Object.freeze({
    prev(name,t,K,mode,o) {
      const fn=SCENES[name]?.body;
      if(typeof fn!=='function'||busy.has(name))return null;
      busy.add(name);
      try{return fn(t,K,mode,o);}finally{busy.delete(name);}
    },
    towers(t,K) {
      const s=typeof SCENES.un_towers?.state==='function'?SCENES.un_towers.state(t,K):null;
      const side=(name,x0)=>{
        const o=s?.[name]||{},x=o.x??o.cx??x0;
        return {x,w:o.w??o.width??36,
          top:point(o.top??o.topY??o.apex??s?.[name+'Top'],x,48),
          base:point(o.base??o.baseY??o.bottom??o.ground??s?.[name+'Base'],x,358)};
      };
      const right=side('right',248),figure=s?.figure||{};
      return {left:side('left',112),right,
        chem:s?.levels?.[0]?.y??right.base.y-46,
        figure:{x:figure.x??right.top.x,feet:figure.feet??right.top.y-1,h:figure.h??25}};
    },
  });

  const mix = (a,b,k) => a+(b-a)*k;
  const vMix = (a,b,k) => a.map((v,i)=>mix(v,b[i],k));
  const TAU = Math.PI*2;

  function sceneAt(t,K) {
    const U=UN,cue=(key,fallback=Infinity)=>K[key]??fallback;
    const word=(phrase,prefix,fallback)=>
      (K.words?.[phrase]||[]).find(w=>w.w.toLowerCase().startsWith(prefix))?.t0??fallback;
    const ramp=(start,end)=>Number.isFinite(start)&&Number.isFinite(end)
      ?U.smooth((t-start)/Math.max(.001,end-start)):0;
    const since=key=>Math.max(0,t-cue(key,t));
    const start=cue('s2',0)-.05;
    const entry=ramp(start,start+.8);
    const morph=ramp(start,cue('atom')+.45);
    const open=ramp(cue('atom')-.2,cue('ordinary')+.38);
    const orbitIn=ramp(cue('atom')-.12,cue('ordinary')+.45);
    const approach=ramp(cue('second'),cue('bond')-.22);
    const bond=ramp(word('3','появится',cue('bond')),cue('bond')+.3);
    const force=ramp(cue('strength'),cue('strength')+.55);
    const weight=ramp(cue('bond_weight'),cue('bond_weight')+.25);
    const lock=ramp(cue('bond_weight')-.08,cue('recognize')+.32);

    // Camera starts at the tower base: the first atom projects exactly there
    // (yaw, pitch and depth are all zero) and it travels with the base.
    const base=UN_V2.towers(t,K).right.base;
    const orbitClock=Math.max(0,t-start);
    const cam={cx:mix(base.x-2,180+Math.sin(t*.31)*1.5,morph),
      cy:mix(base.y+132,388,morph)-42*approach-5*force,
      distance:620-170*morph+150*approach-28*force,
      yaw:morph*(.24+.12*Math.sin(orbitClock*.42))-.62*approach+.12*force,
      pitch:morph*(-.095+.045*Math.sin(orbitClock*.31))+.23*approach,
      f:620,scale:1};
    const first=[2-66*approach+Math.sin(t*.4)*1.8*morph,
      -132+Math.sin(t*.43)*1.1*morph,-8*approach];
    // The second atom enters from the distant lower-right, already visible on
    // "второй", rather than travelling off screen until the following sentence.
    const second=vMix([70,-112,260],[78,-106,-35],approach);
    second[1]+=Math.sin(since('second')*.65)*2*approach;
    const a=U.project(first,cam),b=U.project(second,cam);
    const rA=mix(3.2,19,morph),rB=11.5;

    // On "вес" the camera rolls the bond upright and backs off. The pair lands
    // on the un_style pose: (182,80), (180,342), ring (181,230).
    const drift=Math.sin(t*.4)*1.8;
    const mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
    const half=Math.hypot(b.x-a.x,b.y-a.y)/2,angle0=Math.atan2(b.y-a.y,b.x-a.x);
    const M={x:mix(mid.x,181,lock),y:mix(mid.y,211,lock)};
    const L=mix(half,131,lock),angle=mix(angle0,Math.PI/2,lock);
    const c=Math.cos(angle),n=Math.sin(angle);
    const A={x:M.x-c*L+lock*(1+drift),y:M.y-n*L,z:a.z,r:mix(rA*a.s,9,lock)};
    const B={x:M.x+c*L-lock,y:M.y+n*L,z:b.z,r:mix(rB*b.s,6,lock)};
    return {U,K,cue,word,ramp,since,start,entry,morph,open,orbitIn,approach,bond,force,weight,lock,
      base,orbitClock,cam,first,second,a,b,rA,rB,mid,half,angle0,M,L,angle,A,B};
  }

  function bodyAt(t,K={},mode,o={}) {
    const {U,cue,ramp,since,entry,morph,open,orbitIn,bond,force,weight,lock,
      base,orbitClock,cam,first,second,a,rA,mid,half,angle0,M,L,angle,A,B}=sceneAt(t,K);
    const orbitRadius=mix(16,67,morph)-22*ramp(cue('second'),cue('bond')-.22);
    const orbitPhase=orbitClock*.58;
    let svg=`<g opacity="${entry}">${U.bokeh(t,{opacity:mix(.15+.28*morph,.15,lock),seed:10})}</g>`;
    let back='',front='';

    if(entry<1){
      // The towers stay glued to the atom: same anchor, same growth, so the
      // base itself reads as turning into the ball during the dissolve.
      const towers=UN_V2.prev('un_towers',t,K,'ghost');
      const zoom=rA*a.s/3.2;
      if(towers!==null)svg+=`<g opacity="${(1-entry).toFixed(3)}" transform="translate(${a.x.toFixed(3)} ${a.y.toFixed(3)}) scale(${zoom.toFixed(4)}) translate(${(-base.x).toFixed(3)} ${(-base.y).toFixed(3)})">${towers}</g>`;
    }

    // Split each projected path at its depth plane. Rear arcs are softer and
    // dimmer; front arcs pass in front of the nucleus rather than through it.
    const orbital=(center,radius,tilt,roll,opacity,amount,electronPhase,depth=1)=>{
      const pts=[],centerP=U.project(center,cam);
      const position=theta=>{
        let x=radius*Math.cos(theta),y=radius*Math.sin(theta)*Math.cos(tilt),
          z=radius*Math.sin(theta)*Math.sin(tilt)*depth;
        const xx=x*Math.cos(roll)-y*Math.sin(roll);
        y=x*Math.sin(roll)+y*Math.cos(roll);x=xx;
        return U.project([center[0]+x,center[1]+y,center[2]+z],cam);
      };
      for(let i=0;i<=80;i++)pts.push(position(i/80*TAU));
      let near=[],far=[];
      const flush=(points,isNear)=>{
        if(points.length<2)return;
        const op=opacity*mix(.65,isNear?.72:.24,depth);
        const line=U.polyline(points,{opacity:op,width:.55});
        const glow=U.polyline(points,{opacity:op*mix(.25,.19,depth),width:mix(1.3,1.5,depth),glow:true});
        if(isNear)front+=glow+line;else back+=glow+line;
      };
      for(let i=0;i<pts.length-1;i++){
        const isNear=(pts[i].z+pts[i+1].z)/2<=centerP.z;
        if(isNear){if(far.length){flush(far,false);far=[];}if(!near.length)near.push(pts[i]);near.push(pts[i+1]);}
        else{if(near.length){flush(near,true);near=[];}if(!far.length)far.push(pts[i]);far.push(pts[i+1]);}
      }
      flush(near,true);flush(far,false);
      if(amount>0){
        const ep=position(electronPhase),nearSide=ep.z<=centerP.z;
        const depthLight=.52+.48*U.smooth(.5+(centerP.z-ep.z)/(radius*1.5));
        let trail='';
        for(let j=0;j<9;j++)trail+=U.thread(position(electronPhase-.045*j),position(electronPhase-.045*(j+1)),
          {opacity:opacity*amount*(1-j/9)*.46,width:1.1});
        const light=trail+U.sphere(ep.x,ep.y,1.7*ep.s,{opacity:opacity*amount*depthLight,glow:1.2});
        if(nearSide)front+=light;else back+=light;
      }
    };

    // The tower's footprint is the flat ring: the same ellipse opens into the
    // first orbit on "атом" and gains its electron on "ничего особенного".
    const orbitFade=1-ramp(cue('bond_weight'),cue('recognize')+.1);
    const secondOpacity=ramp(cue('second'),cue('second')+.48);
    if(orbitFade>0){
      orbital(first,orbitRadius,mix(Math.acos(5.2/36),1.02,open),
        open*(.2+orbitPhase*.13),entry*orbitFade,open,orbitPhase+.8,open);
      orbital(first,orbitRadius*.91,1.12,-.94+orbitPhase*.10,
        orbitIn*.68*orbitFade,orbitIn,orbitPhase*1.12+3.1);
      orbital(second,43,1.05,.55-orbitPhase*.08,secondOpacity*.86*orbitFade,
        secondOpacity,orbitPhase*.94+2.2);
      orbital(second,39,1.16,-.8+orbitPhase*.06,secondOpacity*.47*orbitFade,
        secondOpacity,orbitPhase*1.04+4.4);
    }
    // Orbits follow the balls through the roll as one rigid group.
    const rigid=lock>0?` transform="translate(${M.x.toFixed(3)} ${M.y.toFixed(3)}) rotate(${((angle-angle0)*180/Math.PI).toFixed(3)}) scale(${(L/Math.max(.001,half)).toFixed(4)}) translate(${(-mid.x).toFixed(3)} ${(-mid.y).toFixed(3)})"`:'';

    // The bond grows from both atoms from "появится" and meets on "связь".
    const middle={x:(A.x+B.x)/2,y:(A.y+B.y)/2};
    const toCenter=(x,k)=>({x:mix(x.x,middle.x,k),y:mix(x.y,middle.y,k)});
    svg+=U.thread(A,toCenter(A,bond),{opacity:mix(.58,.46,lock)*bond,width:mix(.65,.55,lock)});
    svg+=U.thread(B,toCenter(B,bond),{opacity:mix(.58,.46,lock)*bond,width:mix(.65,.55,lock)});
    svg+=U.thread(A,B,{opacity:.18*bond*(.7+.3*Math.sin(t*1.8))*(1-lock),width:2.4,glow:true});
    const transit=(1-Math.cos(since('bond')*2.1))/2;
    const pulse=vMix([A.x,A.y],[B.x,B.y],transit);
    svg+=U.sphere(pulse[0],pulse[1],1.45,{opacity:.65*bond,glow:1.4});
    svg+=`<g${rigid}>${back}</g>`;
    // Opaque nucleus masks only the centre of the rear orbit, preserving glass.
    const spheres=[{p:A,opacity:entry},{p:B,opacity:secondOpacity}].sort((x,y)=>y.p.z-x.p.z);
    for(const item of spheres)svg+=U.sphere(item.p.x,item.p.y,item.p.r,
      {opacity:item.opacity,glow:mix(1+.12*Math.sin(t*.9)*morph,1,lock)});
    svg+=`<g${rigid}>${front}</g>`;

    // The weight ring sits on the thread from "сила", flashes on "вес" and
    // finishes as the source film's horizontal ring.
    const ringAt=mix(.5,150/262,lock);
    const ring={x:mix(A.x,B.x,ringAt),y:mix(A.y,B.y,ringAt)};
    const rx=mix(5.5,5.2,lock),ry=mix(17,36,lock),deg=angle*180/Math.PI;
    const flash=Number.isFinite(cue('bond_weight'))
      ?Math.exp(-Math.pow((t-cue('bond_weight')-.2)/.24,2)):0;
    if(flash>.004){
      svg+=`<circle cx="${ring.x.toFixed(3)}" cy="${ring.y.toFixed(3)}" r="${(ry*1.5).toFixed(3)}" fill="url(#un-halo)" opacity="${(flash*.95).toFixed(3)}"/>`;
      svg+=U.weight(ring.x,ring.y,rx+.5,ry+.5,{opacity:flash,angle:deg});
    }
    svg+=U.weight(ring.x,ring.y,rx,ry,{opacity:force*mix(.42,.67,weight)+.08*(1-lock)*Math.sin(t*1.5)*force,angle:deg});

    // Local annotation choreography, all timing derived from the real words.
    // The roll sweeps the upper-left and lower-right quadrants only, so both
    // labels hold still in the two quadrants the thread never crosses.
    const labels=o.labels??1;
    svg+=U.mono(196,152,'≈463 кДж/моль',{size:19,opacity:force*labels*.96});
    svg+=U.mono(196,171,'O–H',{size:10,opacity:force*labels*.62});
    svg+=U.italic(134,238,'вес',{size:24,anchor:'end',opacity:weight*labels*.92,glow:true});
    return svg;
  }

  SCENES.un_atom = function(u, p={}, d, t) {
    return UN.wrap(bodyAt(t,p.K||{},p.mode));
  };
  SCENES.un_atom.body = bodyAt;
  SCENES.un_atom.pose = (t,K={}) => {const {A,B}=sceneAt(t,K);return {a:A,b:B};};
})();
