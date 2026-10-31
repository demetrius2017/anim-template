/* Phrase 4 — activation: a failed climb, then a word-cued crossing inside the glass node.
 * p.s='s4', p.mode='activation'; p.K contains ABSOLUTE speech/word times.
 * K.low_energy/enough/reaction/like_neuron, K.s5 and K.words['4'] drive every event.
 * "энергия активации" arrives on K.reaction and stays to the end of the shot.
 * On K.like_neuron the ribbon relaxes into the true sigmoid and flashes, with
 * rays to the centre: the same ball and curve as the source film at t=15. The whole
 * curve then stays inside the sphere's outline, bead included.
 * The sphere comes up slowly: it grows from the nucleus still dim and gains its full
 * light through the phrase, just before «Хватит», so K.death stays the one sharp event.
 * Internal camera tracks the rolling bead, then squares up to the sphere.
 * Runtime camera: {z0:1,z1:1,x0:0,x1:0,y0:0,y1:0,drift:0,kicks:0}.
 * Entry: the top ball of SCENES.un_atom.pose grows into this sphere over
 * SCENES.un_atom.body(t,K,'bond'); without un_atom it fades in from black.
 * SCENES.un_energy.body(t,K,mode,{label,background}): raw SVG. Exit is owned
 * by un_molecule, which uses .center(t,K) and .label(t,K) to shrink the sphere.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q;
  const ease=q=>{q=Math.max(0,Math.min(1,q));return q*q*q*(q*(q*6-15)+10);};
  const prog=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const word=(K,prefix,fallback)=>((K.words?.['4']||[]).find(w=>w.w.toLowerCase().startsWith(prefix))?.t0??fallback);
  // A rising sigmoid with a soft crest and a short descending shoulder: the hill.
  const hill=x=>46-97/(1+Math.exp(-(x+17)/16))+20*ease((x-25)/58);
  // The neuron curve of the source film, centred on the sphere.
  const neuronCurve=x=>-58*Math.tanh(x/26);
  // Half-width of that curve when it lies inside the sphere of radius 105.
  const REACH=72;

  function times(K) {
    const start=K.low_energy??K.s4??0,enough=K.enough??start+2.22,reaction=K.reaction??enough+.84;
    const neuron=K.like_neuron??reaction+1.5,end=K.s5??K.s4_end??neuron+.9;
    return {start,enough,reaction,neuron,end,nothing:word(K,'ничего',mix(start,enough,.36)),
      no:word(K,'произойд',mix(start,enough,.72)),works:word(K,'сработ',reaction+.54)};
  }
  function camera(t,K) {
    const {start,enough,reaction,neuron,end,nothing,works}=times(K);
    const open=prog(t,reaction+.3,reaction+1.1),travel=prog(t,start,end);
    const push=prog(t,start,nothing)*.10,square=prog(t,neuron-.2,neuron+.45);
    return {cam:{cx:mix(180-8*prog(t,enough,works),180,square),cy:190+4*open,f:620,distance:620,
      yaw:mix(-.24+.40*travel,0,square),pitch:mix(.045+.065*Math.sin((t-start)*.36),0,square),
      scale:1+push-.10*open},square};
  }
  function bodyAt(t,K={},mode,o={}) {
    const U=UN,{start,enough,reaction,neuron,nothing,no,works}=times(K);
    const enter=prog(t,start-.05,start+.85),lit=U.smooth((t-start-.1)/Math.max(.001,enough-.3-start));
    let x;
    if(t<enough){
      x=t<nothing?mix(-77,-22,prog(t,start,nothing)):mix(-22,-77,prog(t,nothing,Math.min(enough-.10,no+.42)));
    }else if(t<reaction){x=mix(-77,32,prog(t,enough,reaction));}
    else{x=mix(32,78,prog(t,reaction,works+.4));}
    const {cam,square}=camera(t,K);
    // The neuron curve and the bead end short of the outline, with room for the glow.
    x=Math.min(x,mix(88,REACH-14,square));
    const span=mix(88,REACH,square);
    const pp=v=>U.project(v,cam);
    const c=pp([0,0,0]),radius=105*cam.scale;
    const height=q=>mix(hill(q),neuronCurve(q),square);
    const slope=q=>(height(q+.05)-height(q-.05))/.1;
    let previous=null,nucleus=null;
    if(enter<1&&typeof SCENES.un_atom?.pose==='function'){
      // The top ball is the nucleus: the neighbour's labels leave before zooming.
      previous=UN_V2.prev('un_atom',t,K,'bond',{labels:1-prog(t,start-.05,start+.05)});
      if(previous!==null)nucleus=SCENES.un_atom.pose(t,K).a;
    }
    const entry=nucleus?enter:1,fromBlack=nucleus?1:enter;
    let s=o.background===false?'':`<g opacity="${entry*fromBlack}">${U.bokeh(t,{seed:41,count:23,opacity:.33})}</g>`;
    if(nucleus){
      const z=mix(1,radius/nucleus.r,entry),xx=mix(nucleus.x,c.x,entry),yy=mix(nucleus.y,c.y,entry);
      s+=`<g opacity="${1-entry}" transform="translate(${xx} ${yy}) scale(${z}) translate(${-nucleus.x} ${-nucleus.y})">${previous}</g>`;
    }
    let g='';
    // Peripheral rays preserve the original glass-node vocabulary and depth.
    const raysFrom=pp([0,18,28]);
    for(let i=0;i<7;i++){
      const b=pp([-132+i*44,160,36+(i%3)*14]);
      g+=U.thread(raysFrom,b,{opacity:.14+.025*Math.sin(t*.6+i),width:.42});
    }
    g+=U.sphere(c.x,c.y,radius,{glow:.44*mix(.3,1,lit),highlight:false});
    // The source sphere is dark inside: the bright curve needs that contrast.
    g+=`<circle cx="${c.x}" cy="${c.y}" r="${radius*.985}" fill="#000" opacity="${Math.max(.46*square,.74*(1-lit))}"/>`;
    g+=`<ellipse cx="${c.x-radius*(.32+.025*Math.sin(t*.7))}" cy="${c.y-radius*.35}" rx="${radius*.23}" ry="${radius*.28}" fill="#fff" opacity="${mix(.26,.72,lit)}" transform="rotate(38 ${c.x-radius*(.32+.025*Math.sin(t*.7))} ${c.y-radius*.35})" filter="url(#un-soft)"/>`;
    g+=U.thread(pp([-80,4*(1-square),10]),pp([81,4*(1-square),10]),{opacity:mix(.13,.3,square),width:.4});
    g+=U.thread(pp([0,-84,10]),pp([0,84,10]),{opacity:mix(.13,.3,square),width:.4});
    // A second, dim edge behind the track makes it a narrow ribbon in space.
    const rail=[],back=[];
    for(let i=0;i<=88;i++){
      const xx=(i/44-1)*span;
      rail.push(pp([xx,height(xx),-10]));back.push(pp([xx,height(xx)+1,5]));
    }
    const flare=Math.exp(-Math.pow((t-neuron-.22)/.3,2));
    g+=U.polyline(back,{opacity:.23*(1-square),width:.6});
    g+=U.polyline(rail,{opacity:.30+.5*flare,width:3+3.5*flare,glow:true});
    g+=U.polyline(rail,{opacity:.94,width:.85+.75*square+1.1*flare});
    for(let i=0;i<12;i++){
      const xx=-85+i*15;
      g+=U.thread(pp([xx,height(xx),-10]),pp([xx,height(xx)+1,5]),{opacity:.12*(1-square),width:.35});
    }
    // Rays run to the curve's centre, in front of the glass, as in the source.
    if(square>0){
      const hub=pp([0,0,-10]);
      for(let i=0;i<5;i++){
        const foot=pp([-115+i*57.5,175,-10]);
        g+=U.thread(hub,foot,{opacity:(.34+.3*flare)*square,width:.5});
      }
      g+=U.sphere(hub.x,hub.y,2.4+2.2*flare,{opacity:square,glow:1.2+flare,highlight:false});
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
    const hit=pp([32,hill(32)-5,-12]);
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
    const scale=nucleus?mix(nucleus.r/radius,1,entry):1;
    const dx=nucleus?mix(nucleus.x,c.x,entry):c.x,dy=nucleus?mix(nucleus.y,c.y,entry):c.y;
    s+=`<g opacity="${entry*fromBlack}" transform="translate(${dx} ${dy}) scale(${scale}) translate(${-c.x} ${-c.y})">${g}</g>`;
    if(o.label!==false)s+=labelAt(t,K);
    return s;
  }
  function labelAt(t,K={}) {
    const {reaction}=times(K),label=prog(t,reaction,reaction+.48);
    return UN.italic(180,330-3*label,'энергия активации',{anchor:'middle',size:19.5,opacity:label*.96,glow:true});
  }
  SCENES.un_energy=function(u,p={},d,t){return UN.wrap(bodyAt(t,p.K||{},p.mode));};
  SCENES.un_energy.body=bodyAt;
  SCENES.un_energy.label=labelAt;
  SCENES.un_energy.center=(t,K={})=>{
    const {cam}=camera(t,K),c=UN.project([0,0,0],cam);
    return {x:c.x,y:c.y,r:105*cam.scale};
  };
})();
