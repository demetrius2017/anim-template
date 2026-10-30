/* s5 — three atoms join at 104.5 degrees, multiply, then resolve into a wire layer.
 * p.s='s5', p.mode='layer'; p.K: ABSOLUTE join/molecule/layer/s6/words['5'] cues.
 * An unbroken local camera move goes from a nearly frontal molecule to a 3D layer.
 * Runtime camera must stay neutral: z0=z1=1, drift=kicks=0.
 * Local geometry keeps the H–O–H angle exact before projection. No extra claims.
 * All poses depend on t/K only; neither u nor duration can reset the animation.
 * un_molecule.tray(t,K,cam) carries the same complete tray into the next scene.
 * p.layerHandoff: opt-in handoff duration; lets the cloud settle earlier and
 * spreads its final opacity change so the preceding hold stays gentle too.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q;
  const ease=q=>{q=Math.max(0,Math.min(1,q));return q*q*q*(q*(q*6-15)+10);};
  const prog=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const angle=104.5*Math.PI/180,half=angle/2;
  const atoms=[[0,-32,0],[-80*Math.sin(half),-32+80*Math.cos(half),0],[80*Math.sin(half),-32+80*Math.cos(half),0]];
  function bodyAt(t,K={},cameraOverride=null,trayOnly=false,layerHandoff=0){
    const U=UN,start=K.join??K.s5??0,molecule=K.molecule??start+1.52,layer=K.layer??start+2.60;
    const end=(K.s6??K.s5_end??layer+.8)-.05;
    const words=K.words?.['5']||[],joined=words.find(w=>w.w.toLowerCase().startsWith('атом'))?.t1??start+1;
    const bond=prog(t,start,joined);
    const spread=prog(t,molecule+.12,layer+(layerHandoff>0?.16:.40));
    const resolve=layerHandoff>0?U.smooth((t-(layer-.20))/(end-.06-(layer-.20))):prog(t,layer,end-.06);
    const life=Math.sin(t*.68)*.8;
    // The last pose shares the first tower tray: 114 x 54 x 78, center 174/229.
    const cam=cameraOverride||{cx:mix(180,174,spread),cy:mix(202,229,spread),distance:mix(620,670,spread),f:mix(620,670,spread),
      yaw:mix(-.035+.012*Math.sin(t*.5),-.34+.018*Math.sin(t*.45),spread),pitch:mix(.035,.23,spread),scale:mix(1.14,1.2,spread)};
    const pp=v=>U.project(v,cam);
    let s=trayOnly?'':U.bokeh(t,{seed:41,count:23,opacity:.28+.16*spread});
    // The cloud is a real depth array; the hero remains its central molecule.
    const motifs=[];
    for(let iz=-1;iz<=1;iz++)for(let iy=-1;iy<=1;iy++)for(let ix=-2;ix<=2;ix++){
      const hero=ix===0&&iy===0&&iz===0;
      const rank=Math.abs(ix)*.06+Math.abs(iy)*.05+Math.abs(iz)*.10;
      const featured=iz===0&&ix%2===0;
      const born=hero?1:featured?prog(t,molecule+.11+rank*.25,molecule+.65+rank*.20):
        prog(t,molecule+.48+rank*.5,layer+.22+rank*.2);
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
    // The frame grows continuously around the same cloud, rather than cutting to a diagram.
    if(spread>0){
      s+=U.block([0,0,0],{w:114,h:54,depth:78,nx:13,ny:6,nz:3,
        opacity:prog(t,layer-.19,end-.10)*.84,dots:true,rays:true},cam);
      const rim=prog(t,layer+.08,end-.06);
      for(const y of [-27,27]){
        const pts=[[-57,y,-39],[57,y,-39],[57,y,39],[-57,y,39]].map(pp);
        s+=U.polyline(pts,{close:true,opacity:.20*rim,width:1.8,glow:true});
        s+=U.polyline(pts,{close:true,opacity:.12*rim,width:.55});
        s+=U.polyline([[-57,y+2,-39],[57,y+2,-39],[57,y+2,39],[-57,y+2,39]].map(pp),
          {close:true,opacity:.17*rim,width:.4});
      }
    }
    for(const m of motifs){
      const [o,h1,h2]=m.points,op=m.opacity;
      const threadOpacity=op*bond*.72;
      s+=U.thread(o,h1,{opacity:threadOpacity*.33,width:2.6*m.size+.4,glow:true});
      s+=U.thread(o,h2,{opacity:threadOpacity*.33,width:2.6*m.size+.4,glow:true});
      s+=U.thread(o,h1,{opacity:threadOpacity,width:.55});
      s+=U.thread(o,h2,{opacity:threadOpacity,width:.55});
      for(const [i,pt] of m.points.entries())s+=U.sphere(pt.x,pt.y,(i===0?19:10.5)*m.size*pt.s,{opacity:op,glow:m.hero?.82:.5});
    }
    // The annotation and arc share the actual molecular plane and fade before replication.
    const annotation=prog(t,start+.40,joined+.08)*(1-prog(t,molecule+.15,layer-.15));
    if(annotation>0){
      const arc=[],heroScale=mix(1,.09,spread);
      for(let i=0;i<=42;i++){
        const a=-half+angle*i/42;
        arc.push(pp([Math.sin(a)*35*heroScale,(-32+Math.cos(a)*35)*heroScale+life*(1-spread),0]));
      }
      s+=U.polyline(arc,{opacity:annotation*.64,width:.65});
      const label=pp([0,36*heroScale+life*(1-spread),0]);
      s+=U.mono(label.x,label.y,'104,5°',{size:12,anchor:'middle',opacity:annotation,glow:true});
    }
    // A restrained sweep through the newly formed layer gives the final hold a pulse.
    const sweep=prog(t,layer,end),pulse=Math.sin(Math.PI*sweep)*resolve;
    if(pulse>0){
      const a=pp([-57,-27+54*sweep,-39]),b=pp([57,-27+54*sweep,-39]);
      s+=U.thread(a,b,{opacity:pulse*(layerHandoff>0?.10:.55),width:.7});
    }
    return s;
  }
  SCENES.un_molecule=function(u,p={},d,t){
    return UN.wrap(bodyAt(t,p.K||{},null,false,p.layerHandoff||0));
  };
  SCENES.un_molecule.tray=(t,K,cam)=>bodyAt(t,K,cam,true);
})();
