/* Phrase 5 — three atoms join at 104.5 degrees, multiply into a tray, and the
 * tray flies down and right to the foot of the right tower.
 * p.s='s5', p.mode='layer'; p.K: ABSOLUTE join/molecule/layer/s6/words['5'] cues.
 * An unbroken local camera goes from a nearly frontal molecule to a 3D layer,
 * then carries it to the first floor of the right tower (UN_V2.towers(t,K)).
 * Runtime camera must stay neutral: z0=z1=1, drift=kicks=0.
 * Local geometry keeps the H–O–H angle exact before projection. No extra claims.
 * All poses depend on t/K only; neither u nor duration can reset the animation.
 * Entry: the un_energy sphere shrinks into the oxygen atom over 1.65 s, so that fall
 * stays gentler than the K.death strike, and it lands before K.molecule; without
 * un_energy the molecule fades in from black. SCENES.un_molecule.body(t,K,mode)
 * is raw SVG and holds its last pose past K.s6 for un_towers' dissolve.
 * SCENES.un_molecule.tray(t,K,cam) carries the same complete tray to un_towers.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q;
  const ease=q=>{q=Math.max(0,Math.min(1,q));return q*q*q*(q*(q*6-15)+10);};
  const prog=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const angle=104.5*Math.PI/180,half=angle/2;
  const atoms=[[0,-32,0],[-80*Math.sin(half),-32+80*Math.cos(half),0],[80*Math.sin(half),-32+80*Math.cos(half),0]];
  function bodyAt(t,K={},cameraOverride=null,trayOnly=false){
    const U=UN,start=K.join??K.s5??0,molecule=K.molecule??start+1.52,layer=K.layer??start+2.50;
    const end=(K.s6??K.s5_end??layer+.2)-.05;
    const words=K.words?.['5']||[],joined=words.find(w=>w.w.toLowerCase().startsWith('атом'))?.t1??start+1;
    const shot=(K.s5??start)-.05,entry=prog(t,shot,shot+1.65);
    const bond=prog(t,start,joined);
    // The phrase is short: the copies open on "молекула", close into the tray
    // and pull back to the waiting pose by K.layer-.3. The flight starts just
    // before K.layer and lands during un_towers/chem, on the same curve.
    const spread=prog(t,molecule-.02,layer-.3);
    const fly=U.smooth((t-(layer-.15))/.77);
    const resolve=prog(t,layer-.5,end-.1);
    const life=Math.sin(t*.68)*.8;
    // Waiting pose and landing pose are the ones un_towers/chem hands its own
    // tray to, so the two drawings stay one object across the dissolve.
    const towers=UN_V2.towers(t,K),landX=towers.right.x,landY=towers.chem-2.9;
    const cam=cameraOverride||{cx:mix(mix(180,216,spread),landX,fly),
      cy:mix(mix(202,214,spread),landY,fly),
      distance:mix(620,670,spread),f:mix(620,670,spread),
      yaw:mix(-.035+.012*Math.sin(t*.5),-.34,spread),
      pitch:mix(.035,.23,spread),scale:mix(mix(1.14,.62,spread),.3,fly)};
    const pp=v=>U.project(v,cam);
    let s='';
    if(!trayOnly){
      s+=U.bokeh(t,{seed:41,count:23,opacity:mix(.33,.28+.16*spread,entry)*(typeof SCENES.un_energy?.body==='function'?1:entry)});
      const previous=entry<1?UN_V2.prev('un_energy',t,K,'activation',{label:false,background:false}):null;
      const node=previous!==null&&typeof SCENES.un_energy?.center==='function'?SCENES.un_energy.center(t,K):null;
      if(node){
        const oxygen=pp([0,-32+life,0]),z=mix(1,19*oxygen.s/node.r,entry);
        s+=`<g opacity="${(1-entry).toFixed(3)}" transform="translate(${mix(node.x,oxygen.x,entry)} ${mix(node.y,oxygen.y,entry)}) scale(${z}) translate(${-node.x} ${-node.y})">${previous}</g>`;
        if(typeof SCENES.un_energy?.label==='function')
          s+=`<g opacity="${(1-entry).toFixed(3)}">${SCENES.un_energy.label(t,K)}</g>`;
      }
      // The destination shows through as the tray arrives. 'ghost' is the one
      // tower mode that never samples this scene, so the call cannot recurse.
      const destination=U.smooth((t-(layer-.5))/Math.max(.001,end-(layer-.5)));
      if(destination>0){
        const scene=UN_V2.prev('un_towers',t,K,'ghost');
        if(scene!==null)s+=`<g opacity="${destination.toFixed(3)}">${scene}</g>`;
      }
    }
    // The cloud is a real depth array; the hero remains its central molecule.
    const motifs=[];
    for(let iz=-1;iz<=1;iz++)for(let iy=-1;iy<=1;iy++)for(let ix=-2;ix<=2;ix++){
      const hero=ix===0&&iy===0&&iz===0;
      const rank=Math.abs(ix)*.06+Math.abs(iy)*.05+Math.abs(iz)*.10;
      const featured=iz===0&&ix%2===0;
      const born=hero?1:featured?prog(t,molecule-.02+rank*.25,molecule+.34+rank*.20):
        prog(t,molecule+.1+rank*.5,layer-.34+rank*.2);
      if(born<.001)continue;
      // Readable copies open outward first; only then do they settle into the tray.
      const fan=featured&&!hero?Math.sin(Math.PI*spread):0;
      const center=[ix*(22*spread+23*fan),iy*(16*spread+39*fan),iz*25*spread];
      const size=hero?mix(1,.09,spread):featured?mix(.28,.09,spread):.09;
      const points=atoms.map((a,i)=>{
        const separation=i===0?1:mix(1.52,1,bond);
        const ax=i===0?a[0]:a[0]*separation;
        const ay=i===0?a[1]:-32+(a[1]+32)*separation;
        return pp([center[0]+ax*size,center[1]+ay*size+life*(1-spread),center[2]+(hero?0:Math.sin(ix+iy+iz)*2)*(1-resolve)]);
      });
      motifs.push({hero,points,center:pp(center),size,opacity:born*(hero?1:featured?.84:.57)*(1-resolve*.80)});
    }
    motifs.sort((a,b)=>b.center.z-a.center.z);
    let world='';
    // The frame grows continuously around the same cloud, rather than cutting to a diagram.
    if(spread>0){
      world+=U.block([0,0,0],{w:114,h:54,depth:78,nx:13,ny:6,nz:3,
        opacity:prog(t,molecule+.3,layer-.3)*.84,dots:true,rays:true},cam);
      const rim=prog(t,layer-.5,end-.1);
      for(const y of [-27,27]){
        const pts=[[-57,y,-39],[57,y,-39],[57,y,39],[-57,y,39]].map(pp);
        world+=U.polyline(pts,{close:true,opacity:.20*rim,width:1.8,glow:true});
        world+=U.polyline(pts,{close:true,opacity:.12*rim,width:.55});
        world+=U.polyline([[-57,y+2,-39],[57,y+2,-39],[57,y+2,39],[-57,y+2,39]].map(pp),
          {close:true,opacity:.17*rim,width:.4});
      }
    }
    for(const m of motifs){
      const [o,h1,h2]=m.points,op=m.opacity;
      const threadOpacity=op*bond*.72;
      world+=U.thread(o,h1,{opacity:threadOpacity*.33,width:2.6*m.size+.4,glow:true});
      world+=U.thread(o,h2,{opacity:threadOpacity*.33,width:2.6*m.size+.4,glow:true});
      world+=U.thread(o,h1,{opacity:threadOpacity,width:.55});
      world+=U.thread(o,h2,{opacity:threadOpacity,width:.55});
      for(const [i,pt] of m.points.entries())world+=U.sphere(pt.x,pt.y,(i===0?19:10.5)*m.size*pt.s,{opacity:op,glow:m.hero?.82:.5});
    }
    // The annotation and arc share the actual molecular plane and fade before replication.
    const annotation=prog(t,start+.40,joined+.08)*(1-prog(t,molecule-.14,molecule+.22));
    if(annotation>0){
      const arc=[],heroScale=mix(1,.09,spread);
      for(let i=0;i<=42;i++){
        const a=-half+angle*i/42;
        arc.push(pp([Math.sin(a)*35*heroScale,(-32+Math.cos(a)*35)*heroScale+life*(1-spread),0]));
      }
      world+=U.polyline(arc,{opacity:annotation*.64,width:.65});
      const label=pp([0,36*heroScale+life*(1-spread),0]);
      world+=U.mono(label.x,label.y,'≈104,5°',{size:12,anchor:'middle',opacity:annotation,glow:true});
    }
    // A restrained sweep through the newly formed layer gives the flight a pulse.
    const sweep=prog(t,layer-.5,end),pulse=Math.sin(Math.PI*sweep)*resolve;
    if(pulse>0){
      const a=pp([-57,-27+54*sweep,-39]),b=pp([57,-27+54*sweep,-39]);
      world+=U.thread(a,b,{opacity:pulse*.32,width:.7});
    }
    return trayOnly?world:`${s}<g opacity="${entry.toFixed(3)}">${world}</g>`;
  }
  SCENES.un_molecule=function(u,p={},d,t){
    return UN.wrap(bodyAt(t,p.K||{}));
  };
  SCENES.un_molecule.body=(t,K={},mode)=>bodyAt(t,K);
  SCENES.un_molecule.tray=(t,K,cam)=>bodyAt(t,K,cam,true);
})();
