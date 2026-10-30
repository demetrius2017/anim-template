/* s6 — a living, transparent tower, four different worlds inside its floors.
 * p.s: "s6"; p.mode: "levels"; p.K: ABSOLUTE cues from build/cues.json.
 * p.layerHandoff: optional seconds to blend the complete preceding molecular
 * tray into floor one, starting at the speech-derived scene cut (K.s6-.05).
 * Both drawings use this scene's camera; absent this option, rendering is unchanged.
 * Cues: s6/stack, molecules, cells, organisms, biosphere, s6_end.
 * Runtime camera: {z0:1,z1:1,x0:0,x1:0,y0:0,y1:0,drift:0,kicks:0}.
 * The local camera cranes upward and pulls back as the floors appear.
 * Local membranes, silhouettes and globe use the unchanged UN vocabulary.
 * un_tower.body(t,K,background) also gives s7 the same pure boundary geometry.
 * No state, randomness, or u/d-dependent movement; useful content y=16..370.
 */
(() => {
  const mix = (a,b,q) => a+(b-a)*q;
  const n = x => x.toFixed(3);
  function bodyAt(t,K={},background=true,layerHandoff=0) {
    const U=UN,start=K.s6??K.stack??0;
    const cue=(key)=>K[key]??start;
    const end=K.s6_end??(start+5);
    const progress=U.smooth((t-start)/Math.max(.01,end-start));
    const lift=U.smooth((t-cue('molecules'))/Math.max(.01,end-cue('molecules')));
    const inherited=U.smooth((t-start)/.8);
    const floorBlend=layerHandoff>0?U.smooth((t-(start-.05))/layerHandoff):inherited;
    const cam={cx:mix(174,137,lift),cy:mix(229,304,lift),
      yaw:-.34-.33*progress+.018*Math.sin(t*.45),pitch:.23-.01*progress,
      scale:mix(1.2,.98,lift),distance:670,f:670};
    const pp=(x,y,z)=>U.project([x,y,z],cam);
    const line=(a,b,op=.3,w=.5)=>U.thread(a,b,{opacity:op,width:w});
    const dot=(a,r=1,op=.7)=>`<circle cx="${n(a.x)}" cy="${n(a.y)}" r="${n(r*a.s)}" fill="#fff" opacity="${op}"/>`;
    let s=background?`<g opacity="${1-inherited}">${U.bokeh(t,{seed:41,count:23,opacity:.44})}</g><g opacity="${inherited}">${U.bokeh(t,{seed:36,count:23,opacity:.48})}</g>`:'';
    // Faint out-of-focus threads behind the tower give an actual depth plane.
    let far='';
    for(let j=0;j<5;j++){
      const x=-84+j*43,z=125+j*12;
      far+=line(pp(x,48,z),pp(x,-230,z),.06,.7);
      for(let k=0;k<7;k++)far+=dot(pp(x,40-k*40,z),1.5,.12);
    }
    if(background)s+=`<g filter="url(#un-soft)" opacity="${inherited}">${far}</g>`;
    // Match B's last 114 x 54 x 78 tray and camera exactly, then resolve its
    // fine grid into molecular motifs while the same glass frame keeps moving.
    if(floorBlend<1){
      if(layerHandoff>0){
        // Preserve the outgoing motifs, both rims and their glow, not just
        // its pin-grid. Complementary weights remove the one-frame dropout.
        s+=`<g opacity="${1-floorBlend}">${SCENES.un_molecule.tray(t,K,cam)}</g>`;
      }else s+=U.block([0,0,0],{w:114,h:54,depth:78,nx:13,ny:6,nz:3,
        opacity:(1-inherited)*.84,dots:true,rays:true},cam);
    }
    const names=['МОЛЕКУЛЫ','КЛЕТКИ','ОРГАНИЗМЫ','БИОСФЕРА'];
    const keys=['molecules','cells','organisms','biosphere'];
    const alphas=keys.map((key,i)=>i===0?1:U.at(K,key,t,.48,start));
    // Build upward from the shared molecular layer; each new block rises from
    // the preceding roof, never teleports into its final position.
    for(let level=0;level<4;level++){
      const a=alphas[level],birth=U.at(K,keys[level],t,.48,start);
      if(a<=0)continue;
      const y=-level*69+(level?24*(1-a):0);
      const h=level?mix(5,54,a):54;
      const halfW=mix(57,62,progress),halfZ=mix(39,43,progress);
      let body='';
      // Thin double rims, like the transparent trays in the original film.
      for(const yy of [-h/2,h/2]){
        const rim=[pp(-halfW,y+yy,-halfZ),pp(halfW,y+yy,-halfZ),pp(halfW,y+yy,halfZ),pp(-halfW,y+yy,halfZ)];
        body+=U.polyline(rim,{close:true,opacity:.5,width:.55});
        body+=U.polyline(rim,{close:true,opacity:.32,width:1.8,glow:true});
        body+=U.polyline([pp(-halfW,y+yy+2,-halfZ),pp(halfW,y+yy+2,-halfZ),pp(halfW,y+yy+2,halfZ),pp(-halfW,y+yy+2,halfZ)],{close:true,opacity:.17,width:.4});
      }
      for(const x of [-halfW,halfW])for(const z of [-halfZ,halfZ])body+=line(pp(x,y-h/2,z),pp(x,y+h/2,z),.23,.42);
      // Refracted light curtains inside the rear half of each transparent tray.
      // Their moving focus reveals depth without filling in the glass faces.
      const focus=pp(10*Math.sin(t*.7+level),y-4,6);
      for(let j=0;j<16;j++){
        const point=pp(-55+j*7.3,y+h/2-3,35);
        body+=line(point,focus,.075+.02*Math.sin(t+level+j*.45),.4);
        body+=dot(point,.65,.27);
      }
      if(level>0)for(let j=0;j<5;j++){
        body+=line(pp(-44+j*22,y+h/2,26),pp(-44+j*22,y+69-h/2,26),.14,.45);
      }
      // Rear pin-grid is shared across the four levels; interiors are not.
      for(let ix=0;ix<11;ix++)for(let iy=0;iy<5;iy++){
        body+=dot(pp(-50+ix*10,y+(iy-2)*10,38),.55,.18);
      }
      let inside='';
      if(level===0){
        // Molecular points connected in small, three-dimensional motifs.
        const atoms=[];
        for(let iz=0;iz<4;iz++)for(let ix=0;ix<7;ix++){
          const x=-48+ix*16,z=-30+iz*20,yy=y-2+Math.sin(ix*1.7+iz+t*.75)*6;
          const c=pp(x,yy,z),a1=pp(x-4,yy+9,z+5),a2=pp(x+5,yy+8,z-5);
          inside+=line(c,a1,.35,.4)+line(c,a2,.35,.4);
          atoms.push({p:c,r:1.4},{p:a1,r:.75},{p:a2,r:.75});
        }
        atoms.sort((a,b)=>b.p.z-a.p.z);
        for(const atom of atoms)inside+=dot(atom.p,atom.r,.83);
        const focus=pp(0,y-17,0);
        for(let j=0;j<9;j++)inside+=line(pp(-45+j*11,y+20,30),focus,.12,.35);
      }else if(level===1){
        // Soft membranes, nuclei, and small internal organelle points.
        const cells=[];
        for(let j=0;j<9;j++)cells.push({x:-35+(j%3)*35,y:y+(j%2?7:-6),z:-24+Math.floor(j/3)*24,j});
        cells.sort((a,b)=>pp(b.x,b.y,b.z).z-pp(a.x,a.y,a.z).z);
        for(const c of cells){
          const radius=9.6+.8*Math.sin(t*1.4+c.j),ring=[];
          for(let k=0;k<=32;k++){
            const angle=k/32*Math.PI*2,r=radius*(1+.055*Math.sin(3*angle+t+c.j));
            ring.push(pp(c.x+r*Math.cos(angle),c.y+r*Math.sin(angle),c.z));
          }
          inside+=U.polyline(ring,{opacity:.52,width:.6})+U.polyline(ring,{opacity:.2,width:1.7,glow:true});
          const nucleus=pp(c.x-1.5,c.y+1,c.z-1);
          inside+=U.sphere(nucleus.x,nucleus.y,2*nucleus.s,{opacity:.68,glow:.5});
          for(let k=0;k<3;k++)inside+=dot(pp(c.x+Math.cos(k*2+c.j)*5,c.y+Math.sin(k*2+c.j)*5,c.z),.65,.42);
        }
      }else if(level===2){
        // Small luminous organism silhouettes, standing in depth, not icons
        // pasted over the frame. Breathing and parallax keep the layer alive.
        const figures=[];
        for(let z of [23,-19])for(let x of [-36,-12,12,36])figures.push({x,z});
        figures.sort((a,b)=>pp(b.x,y,b.z).z-pp(a.x,y,a.z).z);
        for(let j=0;j<figures.length;j++){
          const f=figures[j],breathe=.6*Math.sin(t*1.6+j),q=(x,yy)=>pp(f.x+x,y+yy+breathe,f.z);
          const head=q(0,-12);
          inside+=U.sphere(head.x,head.y,2.5*head.s,{opacity:.56,glow:.45});
          const contour=[q(-2.5,-7),q(-5,-4),q(-6,4),q(-3,3),q(-2,14),q(0,14),q(.5,5),q(2,14),q(4,14),q(3,2),q(6,4),q(5,-4),q(2.5,-7)];
          inside+=U.polyline(contour,{close:true,opacity:.57,width:.55});
          inside+=line(q(0,-6),q(0,4),.23,.5);
        }
      }else{
        // Rotating wire Earth: latitude/longitude cage with continent strokes.
        const spin=t*.20,r=24;
        const globe=(lon,lat)=>pp(r*Math.cos(lat)*Math.sin(lon+spin),y-r*Math.sin(lat),r*Math.cos(lat)*Math.cos(lon+spin));
        for(let j=-2;j<=2;j++){
          const ring=[];for(let k=0;k<=56;k++)ring.push(globe(k/56*Math.PI*2,j*Math.PI/7));
          inside+=U.polyline(ring,{opacity:.3,width:.46});
        }
        for(let j=0;j<8;j++){
          const ring=[];for(let k=0;k<=56;k++)ring.push(globe(j*Math.PI/4,k/56*Math.PI*2));
          inside+=U.polyline(ring,{opacity:.34,width:.46});
        }
        const continents=[[[.0,.9],[.25,1.0],[.5,.7],[.35,.4],[.64,.18],[.4,-.1],[.25,-.68],[.02,-.75],[-.2,-.3],[-.25,.14],[0,.38]],
          [[-.9,1.0],[-1.4,.92],[-1.7,.6],[-1.43,.27],[-1.1,.08],[-1.2,-.2],[-.9,-.55],[-.73,-.96],[-.55,-.65],[-.64,-.2],[-.89,.15]],
          [[.7,.86],[1.15,.95],[1.7,.64],[2,.28],[1.6,.1],[1.4,.32],[1.15,.05],[.9,.44],[.6,.42]],
          [[1.6,-.55],[1.9,-.5],[2.05,-.7],[1.8,-.85],[1.55,-.7]]];
        for(const coast of continents)inside+=U.polyline(coast.map(([lon,lat])=>globe(lon,lat)),{opacity:.7,width:.7,close:true});
        const center=pp(0,y,0);
        inside+=`<circle cx="${n(center.x)}" cy="${n(center.y)}" r="${n(31*center.s)}" fill="url(#un-halo)" opacity=".6"/>`;
      }
      body+=`<g opacity="${level?birth:1}"><g filter="url(#un-soft)" opacity=".35">${inside}</g>${inside}</g>`;
      // A travelling pulse through the floor is triggered by its spoken name.
      const pulse=Math.sin(Math.PI*birth);
      const center=pp(0,y,0);
      body+=`<ellipse cx="${n(center.x)}" cy="${n(center.y)}" rx="${n(70*center.s)}" ry="${n(35*center.s)}" fill="url(#un-halo)" opacity="${pulse*.5}"/>`;
      s+=`<g opacity="${a*(level?1:floorBlend)}">${body}</g>`;
      const labelA=U.at(K,keys[level],t,.32,start),tip=pp(66,y,-18);
      const labelX=Math.max(234,tip.x+15),labelY=tip.y+3;
      s+=`<g opacity="${labelA}">${line([tip.x,tip.y],[labelX-8,tip.y],.28,.45)}${U.mono(labelX,labelY,names[level],{size:9.4,opacity:.88})}</g>`;
    }
    return s;
  }
  SCENES.un_tower = function(u,p={},d,t) {
    return UN.wrap(bodyAt(t,p.K||{},true,p.layerHandoff||0));
  };
  SCENES.un_tower.body=bodyAt;
})();
