/* s4 — activation: a failed climb, then a word-cued crossing inside the glass node.
 * p.s='s4', p.mode='activation'; p.K contains ABSOLUTE speech/word times.
 * K.low_energy/enough/reaction/activation and K.words['4'] drive every event.
 * Internal camera tracks the rolling bead, then opens out for the italic caption.
 * Runtime camera: {z0:1,z1:1,x0:0,x1:0,y0:0,y1:0,drift:0,kicks:0}.
 * Local profile/arc and read-only SVG extraction; UN/story/audio stay untouched.
 * During the entry dolly only, the current un_atom pose is sampled as pure SVG.
 * Its UN wrapper is removed in a detached XML document; output has one wrapper.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q;
  const ease=q=>{q=Math.max(0,Math.min(1,q));return q*q*q*(q*(q*6-15)+10);};
  const prog=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const word=(K,prefix,fallback)=>((K.words?.['4']||[]).find(w=>w.w.toLowerCase().startsWith(prefix))?.t0??fallback);
  // A rising sigmoid with a soft crest and a short descending shoulder.
  const height=x=>46-97/(1+Math.exp(-(x+17)/16))+20*ease((x-25)/58);
  const slope=x=>(height(x+.05)-height(x-.05))/.1;
  SCENES.un_energy=function(u,p={},d,t){
    const U=UN,K=p.K||{},start=K.low_energy??K.s4??0;
    const enough=K.enough??start+2.22,reaction=K.reaction??enough+.84;
    const activation=K.activation??reaction+2.58,end=K.s5??K.s4_end??activation+1.8;
    const nothing=word(K,'ничего',mix(start,enough,.36));
    const no=word(K,'произойд',mix(start,enough,.72));
    const works=word(K,'сработ',reaction+.54);
    const chemists=word(K,'химики',reaction+1.42);
    const enter=prog(t,start-.05,word(K,'энергии',start+.32)+.27);
    const cut=end-.05,closeAt=word(K,'активации',activation+.72)+.12;
    const close=prog(t,closeAt,cut);
    let x;
    if(t<enough){
      x=t<nothing?mix(-77,-22,prog(t,start,nothing)):mix(-22,-77,prog(t,nothing,Math.min(enough-.10,no+.42)));
    }else if(t<reaction){x=mix(-77,32,prog(t,enough,reaction));}
    else{x=mix(32,78,prog(t,reaction,works+.4));}
    const open=prog(t,chemists,activation+.75),travel=prog(t,start,end);
    const push=prog(t,start,nothing)*.10;
    const cam={cx:180-8*prog(t,enough,works),cy:190+4*open,f:620,distance:620,
      yaw:-.24+.40*travel,pitch:.045+.065*Math.sin((t-start)*.36),scale:1+push-.10*open};
    const pp=(v)=>U.project(v,cam);
    const c=pp([0,0,0]),radius=105*cam.scale;
    let previous='',nucleus=null;
    if(enter<1&&typeof SCENES.un_atom==='function'){
      // Parse a detached string, never touch live UI or another scene's state.
      // Sampling the actual scene avoids copying a neighbour's changing camera.
      const doc=new DOMParser().parseFromString('<svg xmlns="http://www.w3.org/2000/svg">'+
        SCENES.un_atom(0,{s:'s3',mode:'bond',K},1,t)+'</svg>','image/svg+xml');
      const body=doc.querySelector('#un-world > g[clip-path]');
      // Retire the previous shot's labels before a close-up could clip them.
      const textOut=1-prog(t,start-.05,start+.08);
      for(const label of body?.querySelectorAll('text')||[])
        label.setAttribute('opacity',Number(label.getAttribute('opacity')??1)*textOut);
      const balls=Array.from(body?.querySelectorAll('circle[fill="url(#un-ball)"]')||[])
        .map(c=>({x:+c.getAttribute('cx'),y:+c.getAttribute('cy'),r:+c.getAttribute('r')}))
        .sort((a,b)=>b.r-a.r);
      if(body&&balls.length){previous=body.innerHTML;nucleus=balls[0];}
    }
    const entry=nucleus?enter:1;
    let s=`<g opacity="${entry}">${U.bokeh(t,{seed:41,count:23,opacity:mix(.33,.28,close)})}</g>`;
    if(nucleus){
      const z=mix(1,radius/nucleus.r,entry),xx=mix(nucleus.x,c.x,entry),yy=mix(nucleus.y,c.y,entry);
      s+=`<g opacity="${1-entry}" transform="translate(${xx} ${yy}) scale(${z}) translate(${-nucleus.x} ${-nucleus.y})">${previous}</g>`;
    }
    let g='';
    // Peripheral rays preserve the original glass-node vocabulary and depth.
    for(let i=0;i<7;i++){
      const a=pp([0,18,28]),b=pp([-132+i*44,160,36+(i%3)*14]);
      g+=U.thread(a,b,{opacity:.14+.025*Math.sin(t*.6+i),width:.42});
    }
    g+=U.sphere(c.x,c.y,radius,{glow:.44,highlight:false});
    g+=`<ellipse cx="${c.x-radius*(.32+.025*Math.sin(t*.7))}" cy="${c.y-radius*.35}" rx="${radius*.23}" ry="${radius*.28}" fill="#fff" opacity=".72" transform="rotate(38 ${c.x-radius*(.32+.025*Math.sin(t*.7))} ${c.y-radius*.35})" filter="url(#un-soft)"/>`;
    g+=U.thread(pp([-80,4,10]),pp([81,4,10]),{opacity:.13,width:.4});
    g+=U.thread(pp([0,-84,10]),pp([0,84,10]),{opacity:.13,width:.4});
    // A second, dim edge behind the track makes it a narrow ribbon in space.
    const rail=[],back=[];
    for(let xx=-88;xx<=88;xx+=2){rail.push(pp([xx,height(xx),-10]));back.push(pp([xx,height(xx)+1,5]));}
    g+=U.polyline(back,{opacity:.23,width:.6});
    g+=U.polyline(rail,{opacity:.30,width:3,glow:true});
    g+=U.polyline(rail,{opacity:.94,width:.85});
    for(let i=0;i<12;i++){
      const xx=-85+i*15;
      g+=U.thread(pp([xx,height(xx),-10]),pp([xx,height(xx)+1,5]),{opacity:.12,width:.35});
    }
    const normal=Math.sqrt(1+slope(x)**2),r=7.2;
    const bead=pp([x+r*slope(x)/normal,height(x)-r/normal,-12]);
    // Short, time-sampled light trail. No state and no frame-order dependency.
    const tail=prog(t,enough,enough+.12)*(1-prog(t,works,works+.5));
    if(tail>0){
      const trace=[];
      for(let i=0;i<=14;i++){
        const xx=Math.max(-88,x-21+i*1.5),nn=Math.sqrt(1+slope(xx)**2);
        trace.push(pp([xx+r*slope(xx)/nn,height(xx)-r/nn,-12]));
      }
      g+=U.polyline(trace,{opacity:tail*.25,width:2,glow:true});
    }
    g+=U.sphere(bead.x,bead.y,r*bead.s,{glow:1.25+.12*Math.sin(t*1.3)});
    // A moving specular fleck makes the climb read as rolling, not a sliding dot.
    g+=`<circle cx="${bead.x+Math.sin(x/7)*r*.45}" cy="${bead.y+Math.cos(x/7)*r*.45}" r=".65" fill="#fff" opacity=".65"/>`;
    const flash=prog(t,reaction,reaction+.09)*(1-prog(t,reaction+.09,reaction+.62));
    const hit=pp([32,height(32)-5,-12]);
    if(flash>0){
      g+=`<circle cx="${hit.x}" cy="${hit.y}" r="${26+prog(t,reaction,reaction+.7)*29}" fill="url(#un-halo)" opacity="${flash*1.5}"/>`;
      g+=U.weight(hit.x,hit.y,10+prog(t,reaction,reaction+.7)*34,4+prog(t,reaction,reaction+.7)*12,{opacity:flash*.78,angle:-15});
      g+=`<circle cx="${hit.x}" cy="${hit.y}" r="7" fill="#fff" opacity="${flash*.9}" filter="url(#un-soft)"/>`;
      for(let i=0;i<5;i++){
        const a=i*Math.PI*2/5+.3,len=12+16*prog(t,reaction,reaction+.52);
        g+=U.thread([hit.x+Math.cos(a)*7,hit.y+Math.sin(a)*7],
          [hit.x+Math.cos(a)*len,hit.y+Math.sin(a)*len],{opacity:flash*.62,width:.55});
      }
      g+=U.sphere(hit.x,hit.y,6,{opacity:flash,glow:2.2});
    }
    // Match the first pose of s5: the glass node becomes its oxygen sphere.
    // This bridge is local to B; it does not change the shared library or cuts.
    const waterCam={cx:180,cy:202,distance:620,f:620,
      yaw:-.035+.012*Math.sin(t*.5),pitch:.035,scale:1.14};
    const life=Math.sin(t*.68)*.8,oxygen=U.project([0,-32+life,0],waterCam);
    const enterScale=nucleus?mix(nucleus.r/radius,1,entry):1;
    const shrink=mix(enterScale,19*oxygen.s/radius,close);
    const enterX=nucleus?mix(nucleus.x,c.x,entry):c.x,enterY=nucleus?mix(nucleus.y,c.y,entry):c.y;
    const dx=mix(enterX,oxygen.x,close),dy=mix(enterY,oxygen.y,close);
    s+=`<g opacity="${(1-close)*entry}" transform="translate(${dx} ${dy}) scale(${shrink}) translate(${-c.x} ${-c.y})">${g}</g>`;
    s+=U.sphere(dx,dy,radius*shrink,{opacity:close,glow:.82});
    const wings=prog(t,mix(closeAt,cut,.28),cut);
    if(wings>0){
      const half=104.5*Math.PI/360;
      for(const side of [-1,1]){
        const h=U.project([side*80*Math.sin(half)*1.52,-32+80*Math.cos(half)*1.52+life,0],waterCam);
        s+=U.sphere(mix(oxygen.x,h.x,wings),mix(oxygen.y,h.y,wings),10.5*h.s,{opacity:wings,glow:.82});
      }
    }
    const label=prog(t,activation,activation+.48);
    s+=U.italic(180,330-3*label,'энергия активации',{anchor:'middle',size:19.5,opacity:label*.96*(1-prog(t,cut-.32,cut)),glow:true});
    return U.wrap(s);
  };
})();
