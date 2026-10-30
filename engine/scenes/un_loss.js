/* s7 — weighted network above a curved loss landscape; a ball learns downhill.
 * p.s: "s7"; p.mode: "learning"; p.K: absolute build/cues.json word cues.
 * Events: random/learn/mistake/mutation/shift/loss/years, K.words["7"].
 * Camera neutral outside scene; inside, a slow orbit and continuous tracking.
 * The short downhill moves are eased at both ends (no spatial jumps).
 * Counter ends at the spoken "лет": ≈3,8 млрд лет. No extra factual labels.
 * Local mesh shading/weight motion only; shared UN is unchanged.
 * un_loss.geometry(t,K) exposes the actual mesh/ball for s8's particle morph.
 * un_loss.body(t,K,{background,ball}) optionally omits those handoff layers.
 * All animation derives from absolute t, no state, u/d or random numbers.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q;
  const n=x=>x.toFixed(3);
  const ease=x=>{x=Math.max(0,Math.min(1,x));return x*x*x*(x*(x*6-15)+10);};
  function geometryAt(t,K={}) {
    const U=UN,start=K.s7??K.random??0,end=K.s7_end??start+11;
    const cue=key=>K[key]??start;
    const words=K.words?.['7']||[];
    const word=(prefix,fallback)=>words.find(w=>w.w.toLowerCase().startsWith(prefix))?.t0??cue(fallback);
    const finish=word('лет','s7_end');
    const q=ease((t-start)/Math.max(.01,end-start));
    const learned=U.at(K,'learn',t,1.9,start),settled=U.at(K,'mutation',t,1.5,start);
    const disorder=(1-learned)*.75+(1-settled)*.25;
    // y increases downward: the centre is a deep, low-error valley.
    const height=(x,z)=>-38+82*Math.exp(-((x-38)*(x-38)/10500+z*z/5600))
      +5*Math.sin(x/43+z/62)+disorder*2.2*Math.sin(x/31+z/34+t*2.2);
    const stages=[
      [cue('learn'),.08],[cue('mistake'),.21],[word('каждая','mutation'),.33],
      [cue('mutation'),.46],[word('чуть','shift'),.56],[cue('shift'),.67],
      [word('туда','loss'),.77],[cue('loss'),.88],[word('падает','loss'),.96],[cue('years'),1]
    ];
    let travel=0,previous=0,flash=0;
    for(let i=0;i<stages.length;i++){
      const [at,value]=stages[i],next=stages[i+1]?.[0]??finish;
      const duration=Math.max(.18,Math.min(.65,(next-at)*.7));
      const move=ease((t-at)/duration);
      travel+=(value-previous)*move;previous=value;
      flash+=Math.sin(Math.PI*move)*.25;
    }
    const ballX=mix(-112,34,travel),ballZ=-31+33*travel+8*Math.sin(travel*Math.PI*2);
    const after=Math.max(0,t-end);
    // Continue the orbit into the handoff with continuous position/velocity.
    const orbit=.045*(after-.45*(1-Math.exp(-after/.45)));
    const cam={cx:181-9*q,cy:245-4*q,yaw:mix(-.20,.16,q)+orbit,pitch:mix(.50,.56,q),distance:650,f:650,scale:1.00+.06*q};
    const pp=(x,y,z)=>U.project([x,y,z],cam);
    const bp=pp(ballX,height(ballX,ballZ)-6.5,ballZ);
    return {U,start,end,cue,finish,q,learned,disorder,height,travel,flash,ballX,ballZ,cam,pp,bp};
  }
  function bodyAt(t,K={},o={}) {
    const {U,start,cue,finish,q,learned,disorder,height,travel,flash,ballX,ballZ,pp,bp}=geometryAt(t,K);
    const enter=ease((t-(start-.05))/1.15);
    let s=o.background===false?'':U.bokeh(t,{seed:36,count:23,opacity:.48});
    // Keep the exact final tower at the cut, then compress it into the network.
    // Only our two files share this pure drawing helper; no library mutation.
    if(enter<1&&SCENES.un_tower?.body){
      const sx=mix(1,.83,enter),sy=mix(1,.24,enter);
      const dx=mix(0,185-137*.83,enter),dy=mix(0,95-202*.24,enter);
      s+=`<g opacity="${1-enter}" transform="translate(${dx} ${dy}) scale(${sx} ${sy})">${SCENES.un_tower.body(t,K,false)}</g>`;
    }
    s+=`<g opacity="${enter}">`;
    // Network weight rings wobble continuously, then settle as learning starts.
    const nc={cx:185+5*Math.sin(t*.14),cy:95,yaw:-.32+.09*q,pitch:.18,scale:.83,distance:650,f:650};
    const np=(x,y,z)=>U.project([x,y,z],nc);
    let network=U.block([0,0,0],{w:146,h:62,depth:74,nx:11,ny:5,nz:3,dots:true,rays:false,opacity:.45},nc);
    const hub=np(0,-22,0),ends=[];
    for(let j=0;j<8;j++){
      const phase=t*(2.1+U.hash(j)*1.4)+j*2.7;
      const x=-58+(j%4)*38+disorder*Math.sin(phase)*7;
      const z=j<4?-23:23,yy=22+disorder*Math.cos(phase*.83)*5;
      const a=np(x,yy,z),b=np(x*.55,0,z*.6);
      network+=U.thread(hub,a,{opacity:.19+.13*learned,width:.45});
      network+=U.weight(b.x,b.y,(8+disorder*Math.sin(phase)*3)*b.s,2.1*b.s,{opacity:.32,angle:disorder*Math.sin(phase+.9)*17});
      ends.push(a);
    }
    for(const a of ends)network+=U.sphere(a.x,a.y,1.7*a.s,{opacity:.65,glow:.6});
    network+=U.sphere(hub.x,hub.y,2.5*hub.s,{opacity:.76,glow:.7});
    s+=network;
    // A dim light column makes the network and landscape one physical scene.
    const foot=np(0,31,0);
    s+=U.thread(foot,pp(-5,-35,5),{opacity:.08,width:.6});
    // Dense projected mesh. Distance and local light, rather than thick axes,
    // describe the valley. Far lines are deliberately less contrasty.
    const nx=32,nz=28,rows=[];
    for(let j=0;j<=nz;j++){
      const row=[];
      for(let i=0;i<=nx;i++){
        const x=-139+i/nx*278,z=-94+j/nz*188;
        row.push(pp(x,height(x,z),z));
      }rows.push(row);
    }
    const outline=[...rows[0],...rows.map(r=>r[nx]),...rows[nz].slice().reverse(),...rows.map(r=>r[0]).reverse()];
    s+=`<path d="${outline.map((v,i)=>`${i?'L':'M'}${n(v.x)},${n(v.y)}`).join(' ')}Z" fill="#fff" opacity=".012"/>`;
    for(let j=0;j<=nz;j++){
      const op=.12+.20*j/nz;
      s+=U.polyline(rows[j],{opacity:op,width:.43});
      if(j%4===0)s+=U.polyline(rows[j],{opacity:op*.35,width:1.3,glow:true});
    }
    for(let i=0;i<=nx;i++)s+=U.polyline(rows.map(row=>row[i]),{opacity:.2,width:.43});
    // A faint ridge highlight moves with the orbit, describing the curvature
    // like reflected studio light; the outer mesh stays thin and low contrast.
    const ridge=[];
    for(let i=0;i<=64;i++){
      const x=-136+i/64*272,z=27+5*Math.sin(t*.3);
      ridge.push(pp(x,height(x,z),z));
    }
    s+=U.polyline(ridge,{opacity:.1,width:.65})+U.polyline(ridge,{opacity:.08,width:2.2,glow:true});
    // Light from the rolling ball spreads along nearby mesh strands.
    let lit='';
    for(let j=-2;j<=2;j++){
      const pts=[];
      for(let i=0;i<=18;i++){
        const x=ballX-23+i/18*46,z=ballZ+j*6;
        pts.push(pp(x,height(x,z)-.35,z));
      }
      lit+=U.polyline(pts,{opacity:(.22+flash)*(.8-Math.abs(j)*.2),width:.65});
    }
    s+=`<g filter="url(#un-soft)" opacity=".5">${lit}</g>${lit}`;
    // A very short fading wake conveys motion without drawing a diagram arrow.
    if(travel>0){
      const tail=[];
      for(let i=0;i<=20;i++){
        const a=Math.max(0,travel-.11+i*.11/20),x=mix(-112,34,a),z=-31+33*a+8*Math.sin(a*Math.PI*2);
        tail.push(pp(x,height(x,z)-1,z));
      }
      s+=U.polyline(tail,{opacity:.22,width:.7})+U.polyline(tail,{opacity:.16,width:2,glow:true});
    }
    const contact=pp(ballX,height(ballX,ballZ),ballZ);
    s+=`<ellipse cx="${n(contact.x)}" cy="${n(contact.y+1)}" rx="${n(9*contact.s)}" ry="${n(3*contact.s)}" fill="#000" opacity=".7"/>`;
    if(o.ball!==false)s+=U.sphere(bp.x,bp.y,5.5*bp.s,{glow:1.25+flash,opacity:1});
    // Slow moving glint makes the small sphere read as glass, like the source.
    if(o.ball!==false)s+=U.weight(bp.x,bp.y,6.2*bp.s,1.6*bp.s,{opacity:.18,angle:travel*150});
    const titleA=U.at(K,'mistake',t,.65,start);
    s+=U.italic(40,162,'ошибка',{size:17,opacity:.68*titleA});
    const age=ease((t-cue('learn'))/Math.max(.01,finish-cue('learn')));
    const value=(Math.floor(38*age+1e-8)/10).toFixed(1).replace('.',',');
    const yearsA=U.at(K,'learn',t,.7,start),emphasis=U.at(K,'years',t,.8,start);
    const labelX=Math.min(234,bp.x+14),labelY=bp.y-13;
    s+=`<g stroke="#000" stroke-width="2.5" stroke-linejoin="round" paint-order="stroke">${U.mono(labelX,labelY,`≈${value} млрд лет`,{size:11.5,opacity:yearsA*(.75+.2*emphasis)})}</g>`;
    s+=U.mono(labelX,labelY,`≈${value} млрд лет`,{size:11.5,opacity:yearsA*emphasis*.18,glow:true});
    s+='</g>';
    return s;
  }
  SCENES.un_loss=function(u,p={},d,t) {
    return UN.wrap(bodyAt(t,p.K||{}));
  };
  SCENES.un_loss.body=bodyAt;
  SCENES.un_loss.geometry=geometryAt;
})();
