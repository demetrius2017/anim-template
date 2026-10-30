/* Universe Net, block A: the original number/weight becomes an atom and a bond.
 * p.s: s1 / s2 / s3; p.mode: number / atom / bond (editorial shot labels).
 * p.K: ABSOLUTE cues from build/cues.json, including K.words["2"/"3"].
 * All three modes sample one continuous world from absolute t; changing mode,
 * u or d never resets the camera, orbit phase, light or geometry at a cut.
 * Missing cues leave the original pair on screen; no invented speech timings.
 * Recommended external camera: {z0:1,z1:1,drift:0,kicks:0,x0:0,y0:0}.
 * Local helpers only: projected orbit depth, smooth word spans and light trails.
 * Uses the approved UN spheres, halo, threads, bokeh, Plex and PT Serif Italic.
 * Main objects/labels y=16..370. No UI writes, random state or paid assets.
 */
(() => {
  const mix = (a,b,k) => a+(b-a)*k;
  const vMix = (a,b,k) => a.map((v,i)=>mix(v,b[i],k));
  const TAU = Math.PI*2;

  SCENES.un_atom = function(u, p, d, t) {
    const U=UN, K=p.K||{}, cue=(key,fallback=Infinity)=>K[key]??fallback;
    const word=(phrase,prefix,fallback)=>
      (K.words?.[phrase]||[]).find(w=>w.w.toLowerCase().startsWith(prefix))?.t0??fallback;
    const ramp=(start,end)=>Number.isFinite(start)&&Number.isFinite(end)
      ?U.smooth((t-start)/Math.max(.001,end-start)):0;
    const since=key=>Math.max(0,t-cue(key));
    const at=(key,duration=.7)=>ramp(cue(key),cue(key)+duration);
    const beginAtom=word('2','возьми',cue('s2'));
    const morph=ramp(beginAtom,cue('ordinary')+.38);
    const orbitIn=ramp(cue('atom')-.12,cue('ordinary')+.45);
    const approach=ramp(cue('second'),cue('bond')-.22);
    const appearBond=word('3','появляется',cue('bond'));
    const bond=ramp(appearBond,cue('bond')+.3);
    const force=at('strength',.65), oxygen=at('oxygen',.85);
    const value=at('bond_value',.55), weight=at('bond_weight',.25);

    // The first frame is the approved un_style pair: (182,80), (180,342),
    // weight ring (181,230), and the same "Число," at (89,233).
    // A very slow dolly takes over only as the narrator reaches the atom.
    const orbitClock=Number.isFinite(beginAtom)?Math.max(0,t-beginAtom):0;
    const cam={cx:180+Math.sin(t*.31)*1.5,
      cy:212+176*morph-42*approach-5*value,
      distance:620-170*morph+150*approach-28*value,
      yaw:morph*(.24+.12*Math.sin(orbitClock*.42))-.62*approach+.12*value,
      pitch:morph*(-.095+.045*Math.sin(orbitClock*.31))+.23*approach,
      f:620,scale:1};
    const first=[2-66*approach+Math.sin(t*.4)*1.8,
      -132+Math.sin(t*.43)*1.1*morph,-8*approach];
    // The second atom enters from the distant lower-right, already visible on
    // "второй", rather than travelling off screen until the following sentence.
    const second=vMix([70,-112,260],[78,-106,-35],approach);
    second[1]+=Math.sin(since('second')*.65)*2*approach;
    const a=U.project(first,cam), b=U.project(second,cam);
    // Dissolve the old lower node in its original focal plane. Sending it down
    // with the dolly made its bright rim hit the y=370 content clip in v2.
    const bottom={x:cam.cx,y:342+Math.sin(t*.31)*.5,s:1};
    const rA=mix(9,18,morph)+5.5*oxygen;
    const rB=11.5;
    const ringCenter=vMix([1,18,0],first,morph);
    const orbitRadius=mix(36,67,morph)-22*approach;
    const orbitPhase=orbitClock*.58;
    let svg=U.bokeh(t,{opacity:.15+.28*morph,seed:10});
    let back='',front='';

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

    // Keep the initial ellipse itself alive as it rises and opens into an orbit.
    // Flattened depth is important: the initial projected ring exactly matches
    // the approved rx=36, ry=5.2 weight before gaining its third dimension.
    if(morph===0){
      back+=U.weight(181+Math.sin(t*.31)*1.5,230,36,5.2,{opacity:.65});
    }else{
      orbital(ringCenter,orbitRadius,mix(Math.acos(5.2/36),1.02,morph),
        morph*(.2+orbitPhase*.13),1,morph,orbitPhase+.8,morph);
    }
    orbital(first,orbitRadius*.91,1.12,-.94+orbitPhase*.10,
      orbitIn*.68,orbitIn,orbitPhase*1.12+3.1);
    const secondOpacity=ramp(cue('second'),cue('second')+.48);
    orbital(second,43,1.05,.55-orbitPhase*.08,secondOpacity*.86,
      secondOpacity,orbitPhase*.94+2.2);
    orbital(second,39,1.16,-.8+orbitPhase*.06,secondOpacity*.47,
      secondOpacity,orbitPhase*1.04+4.4);

    const oldThread=1-ramp(beginAtom,beginAtom+.7);
    svg+=U.thread(a,bottom,{opacity:.4*oldThread,width:.55});
    const weightPulse=Number.isFinite(cue('weight'))
      ?Math.exp(-Math.pow((t-cue('weight')-.35)/.45,2)):0;
    const pulseY=mix(a.y,bottom.y,U.smooth(since('weight')/1.2));
    svg+=U.sphere(mix(a.x,bottom.x,.58),pulseY,1.25,{opacity:weightPulse*.6*oldThread,glow:1.1});
    svg+=U.sphere(bottom.x,bottom.y,6*bottom.s,{opacity:oldThread,glow:1});

    // The new bond grows from both atoms and meets on the spoken word "связь".
    const midpoint={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
    const toCenter=(x,k)=>({x:mix(x.x,midpoint.x,k),y:mix(x.y,midpoint.y,k)});
    svg+=U.thread(a,toCenter(a,bond),{opacity:.58*bond,width:.65});
    svg+=U.thread(b,toCenter(b,bond),{opacity:.58*bond,width:.65});
    svg+=U.thread(a,b,{opacity:.18*bond*(.7+.3*Math.sin(t*1.8)),width:2.4,glow:true});
    const transit=(1-Math.cos(since('bond')*2.1))/2;
    const pulse=vMix([a.x,a.y],[b.x,b.y],transit);
    svg+=U.sphere(pulse[0],pulse[1],1.45,{opacity:.65*bond,glow:1.4});
    svg+=back;
    // Opaque nucleus masks only the centre of the rear orbit, preserving glass.
    const spheres=[{p:a,r:rA,opacity:1},{p:b,r:rB,opacity:secondOpacity}].sort((x,y)=>y.p.z-x.p.z);
    for(const item of spheres)svg+=U.sphere(item.p.x,item.p.y,item.r*item.p.s,
      {opacity:item.opacity,glow:1+.12*Math.sin(t*.9)*morph});
    svg+=front;

    // Local annotation choreography, all timing derived from the real words.
    svg+=U.italic(89+Math.sin(t*.31)*1.5,233,'Число,',
      {size:21,glow:true,opacity:.9*(1-ramp(beginAtom,beginAtom+.48))});
    const measure=force;
    const labelX=midpoint.x, labelY=Math.max(a.y,b.y)+69;
    svg+=U.weight(midpoint.x,midpoint.y,5.5,17,
      {opacity:measure*(.55+.1*Math.sin(t*1.5)),angle:Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI});
    const blink=.76+.24*Math.cos(since('strength')*7);
    // Clear H–H and its value together BEFORE "кислорода". The O–H value
    // appears on that word, even though the narrator speaks its digits later.
    const oldValue=1-ramp(cue('oxygen')-.32,cue('oxygen')-.05);
    const newValue=ramp(cue('oxygen')-.05,cue('oxygen')+.05);
    svg+=U.mono(labelX,labelY,'436',{size:22,anchor:'middle',opacity:measure*oldValue*blink});
    svg+=U.mono(labelX,labelY+21,'H–H',{size:10,anchor:'middle',opacity:measure*oldValue*blink*.8});
    svg+=U.mono(labelX,labelY,'463 кДж/моль',{size:19,anchor:'middle',opacity:newValue*.96});
    svg+=U.mono(labelX,labelY+21,'O–H',{size:10,anchor:'middle',opacity:newValue*.58});
    svg+=U.italic(labelX,labelY+52,'вес',{size:24,anchor:'middle',opacity:weight,glow:true});
    return U.wrap(svg);
  };
})();
