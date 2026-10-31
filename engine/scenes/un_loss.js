/* Phrase 7 — weighted network above a curved loss landscape; death teaches it.
 * p.s: "s7"; p.mode: "learning"; p.K: absolute build/cues.json word cues.
 * Events: s7/death/mutation/fit/shift/loss/years, s7_end, K.words["7"].
 * Entry: SCENES.un_towers.body(t,K,'stack') shrinks into the network above the
 * surface, anchored on UN_V2.towers(t,K).right; without it, fade from black.
 * Until K.death the weights tremble in chaos. K.death is the film's only sharp
 * event: the frame goes dark and stays dark to the end of the spoken word, and
 * the ball itself tears straight down off the surface and goes out inside that dark.
 * K.mutation: the ball is back with its bead variants. On «умирает» the losers
 * flare and go out one by one; K.fit: winners flare and stay.
 * K.shift / K.loss: the ball walks on down the valley. On K.shift a short light
 * wave climbs from the surface to the block, and as it arrives every ring takes
 * its new size, tilt and brightness: the weights visibly move.
 * Camera neutral outside scene; inside, a slow orbit and continuous tracking.
 * Counter starts at its first non-zero value and ends at the spoken "лет":
 * ≈3,8 млрд лет. No extra factual labels.
 * un_loss.geometry(t,K) exposes the actual mesh/ball for s8's particle morph.
 * un_loss.body(t,K,mode) is raw SVG; mode may be an options object
 * {background,ball} that omits those handoff layers.
 * All animation derives from absolute t, no state, u/d or random numbers.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q;
  const n=x=>x.toFixed(3);
  const ease=x=>{x=Math.max(0,Math.min(1,x));return x*x*x*(x*(x*6-15)+10);};
  const clamp=x=>Math.max(0,Math.min(1,x));
  // A bead's place on the surface relative to the ball, with its fate.
  // Downhill (dx>0) survives; the order decides who goes dark first.
  const beads=[[38,16,1],[28,-30,0],[-6,34,0],[46,-12,1],[-34,-20,0],
    [14,40,0],[-24,26,0],[34,31,1],[6,-38,0]].map(([dx,dz,good],i)=>({dx,dz,good,i}));
  // Sharp, single impact: 1 on the frame after K.death, held through the word.
  const blackout=(t,d,e)=>clamp((t-d)/.05)*(1-UN.smooth((t-e)/.3));
  // Eased share of the phrase at which the counter first leaves zero: ease(x)=1/38.
  const FIRST=(()=>{let a=0,b=1;for(let i=0;i<40;i++){const m=(a+b)/2;if(ease(m)<1/38)a=m;else b=m;}return b;})();
  // How long the falling ball stays visible, and how far it falls in that time.
  const FALL=.34,DROP=150;
  // Each weight's own change on «сдвигаются»: some grow, some shrink, none stays.
  const WEIGHT_SHIFT=[.62,-.42,.5,-.34,-.46,.7,-.3,.54];

  function geometryAt(t,K={}) {
    const U=UN,start=K.s7??0,end=K.s7_end??start+10.3;
    const cue=key=>K[key]??start;
    const words=K.words?.['7']||[];
    const word=(prefix,fallback)=>words.find(w=>w.w.toLowerCase().startsWith(prefix))?.t0??cue(fallback);
    const finish=word('лет','s7_end'),death=cue('death');
    const deathEnd=words.find(w=>w.w.toLowerCase().startsWith('смерт'))?.t1??death+.64;
    const dying=word('умира','mutation');
    // The ball dies with the word; the next one arrives with the variants.
    const alive=(1-U.smooth((t-death)/FALL))+U.smooth((t-cue('mutation'))/.3);
    const q=ease((t-start)/Math.max(.01,end-start));
    // Chaos holds until the strike, then calms through selection into the shift.
    const learned=U.smooth((t-death)/Math.max(.01,cue('fit')-death));
    const settled=U.smooth((t-cue('fit'))/Math.max(.01,cue('shift')+.8-cue('fit')));
    const disorder=(1-learned)*.6+(1-settled)*.4;
    // y increases downward: the centre is a deep, low-error valley.
    const height=(x,z)=>-38+82*Math.exp(-((x-38)*(x-38)/10500+z*z/5600))
      +5*Math.sin(x/43+z/62)+disorder*2.2*Math.sin(x/31+z/34+t*2.2);
    // The strike tears the ball straight down off the surface. Only once it has gone
    // out does its place move on, unseen in the dark; the next ball starts from there
    // and the slow walk resumes on the spoken shift. Later stages keep their easing.
    const fall=t>death&&t<cue('mutation')?clamp((t-death)/FALL):0;
    const slip=U.smooth((t-death-FALL)/.4);
    const stages=[
      [cue('shift'),.56],[word('туда','loss'),.67],[cue('loss'),.8],
      [word('падает','loss'),.92],[cue('years'),1]
    ];
    let travel=.40*slip,previous=.40,flash=Math.sin(Math.PI*clamp((t-death)/.46))*.9;
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
    const jolt=t>death?Math.exp(-(t-death)/.13)*Math.sin((t-death)*44)*5:0;
    // cx leads with the yaw: the near corner swings left, so the camera keeps the mesh inside 0..360.
    const cam={cx:181+8*q,cy:245-4*q+jolt,yaw:mix(-.20,.16,q)+orbit,pitch:mix(.50,.56,q),distance:650,f:650,scale:1.00+.06*q};
    const pp=(x,y,z)=>U.project([x,y,z],cam);
    const seat=pp(ballX,height(ballX,ballZ)-6.5,ballZ);
    const bp=pp(ballX,height(ballX,ballZ)-6.5+DROP*fall*fall,ballZ);
    return {U,start,end,cue,word,finish,death,deathEnd,dying,alive,q,learned,disorder,height,travel,flash,ballX,ballZ,cam,pp,bp,seat,fall,jolt};
  }

  function bodyAt(t,K={},mode) {
    const o=mode&&typeof mode==='object'?mode:{};
    const {U,start,cue,finish,death,deathEnd,dying,alive,q,learned,disorder,height,travel,flash,ballX,ballZ,pp,bp,seat,fall,jolt}=geometryAt(t,K);
    const shot=start-.05,enter=ease((t-shot)/.85);
    const towers=enter<1&&o.background!==false?UN_V2.prev('un_towers',t,K,'stack'):null;
    let s=o.background===false?'':`<g opacity="${n(enter)}">${U.bokeh(t,{seed:36,count:23,opacity:.48})}</g>`;
    if(towers!==null){
      // One uniform shrink: the right tower lands inside the block above the
      // surface at the block's height, nothing stretches on the way.
      const right=UN_V2.towers(t,K).right,cx=right.x,cy=(right.top.y+right.base.y)/2;
      const z=mix(1,.2,enter),toX=mix(cx,185,enter),toY=mix(cy,95,enter);
      s+=`<g opacity="${n(1-enter)}" transform="translate(${n(toX)} ${n(toY)}) scale(${n(z)}) translate(${n(-cx)} ${n(-cy)})">${towers}</g>`;
    }
    s+=`<g opacity="${n(enter)}">`;
    // Network weight rings shiver in chaos, then settle. On "сдвигаются" light climbs
    // from the surface; as it reaches the block each ring takes its new size and tilt.
    const shift=cue('shift'),climb=.5;
    const wave=clamp((t-shift)/climb);
    const nudge=j=>U.smooth((t-shift-climb*.8-j*.05)/.5);
    const glint=j=>Math.sin(Math.PI*clamp((t-shift-climb*.8-j*.05)/.6));
    const nc={cx:185+5*Math.sin(t*.14),cy:95+jolt*.6,yaw:-.32+.09*q,pitch:.18,scale:.83,distance:650,f:650};
    const np=(x,y,z)=>U.project([x,y,z],nc);
    let network=U.block([0,0,0],{w:146,h:62,depth:74,nx:11,ny:5,nz:3,dots:true,rays:false,opacity:.45},nc);
    const hub=np(0,-22,0),ends=[];
    for(let j=0;j<8;j++){
      const phase=t*(5.2+U.hash(j)*3.4)+j*2.7;
      const x=-58+(j%4)*38+disorder*Math.sin(phase)*7;
      const z=j<4?-23:23,yy=22+disorder*Math.cos(phase*.83)*5;
      const a=np(x,yy,z),b=np(x*.55,0,z*.6);
      const moved=nudge(j),flash=glint(j),grow=1+moved*WEIGHT_SHIFT[j];
      network+=U.thread(hub,a,{opacity:.19+.13*learned+.3*flash,width:.45});
      network+=U.weight(b.x,b.y,(8+disorder*Math.sin(phase)*3)*b.s*grow,2.1*b.s*grow,
        {opacity:.32+.18*moved+.5*flash,angle:disorder*Math.sin(phase+.9)*24+moved*(j%2?14:-14)});
      ends.push(a);
    }
    for(const a of ends)network+=U.sphere(a.x,a.y,1.7*a.s,{opacity:.65,glow:.6});
    network+=U.sphere(hub.x,hub.y,2.5*hub.s,{opacity:.76,glow:.7});
    s+=network;
    // A dim light column makes the network and landscape one physical scene.
    const foot=np(0,31,0),ground=pp(-5,-35,5);
    s+=U.thread(foot,ground,{opacity:.08,width:.6});
    if(wave>0&&t<shift+climb+.5){
      // The short wave: a ripple opens on the surface, a bright head runs up the column.
      const head=U.smooth(wave),fade=1-U.smooth((t-shift-climb)/.5);
      const x=mix(ground.x,foot.x,head),y=mix(ground.y,foot.y,head);
      const tail=U.smooth(clamp(wave-.3)/.7),bx=mix(ground.x,foot.x,tail),by=mix(ground.y,foot.y,tail);
      s+=U.thread([bx,by],[x,y],{opacity:.75*fade,width:.9})+U.thread([bx,by],[x,y],{opacity:.4*fade,width:2.6,glow:true});
      s+=U.sphere(x,y,1.7,{opacity:fade*(1-.4*U.smooth((wave-.8)/.2)),glow:1.5,highlight:false});
      const open=clamp((t-shift)/.7);
      s+=`<ellipse cx="${n(ground.x)}" cy="${n(ground.y)}" rx="${n(6+44*open)}" ry="${n(2+13*open)}" fill="none" stroke="#fff" stroke-width=".7" opacity="${n(.5*(1-open))}"/>`;
    }
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
    // Variants are thrown out from where the strike left the ball. Winners sit
    // downhill and are drawn back into the ball as it walks on after "сдвигаются".
    const home=mix(-112,34,.40),homeZ=-31+33*.40+8*Math.sin(.40*Math.PI*2);
    const merge=U.smooth((t-cue('shift'))/Math.max(.01,cue('loss')+.5-cue('shift')));
    const sown=U.smooth((t-cue('mutation'))/.5);
    if(sown>0&&merge<1){
      const losers=beads.filter(b=>!b.good);
      let front='';
      for(const b of beads){
        const out=U.smooth(sown*1.5-b.i*.055);
        let x=mix(home,home+b.dx,out),z=mix(homeZ,homeZ+b.dz,out),a=out,r=4.5,glow=.8;
        if(b.good){
          const up=U.smooth((t-cue('fit'))/.32),calm=1-U.smooth((t-cue('fit')-.32)/.5);
          r+=1.1*up;glow+=1.3*up*calm+.35*up;
          x=mix(x,ballX,merge);z=mix(z,ballZ,merge);a*=.96*(1-merge);
        }else{
          // One by one on «умирает»: a flare, a ring, then dark, so each is an event.
          const rank=losers.indexOf(b),life=(t-dying-rank*.06)/.3;
          const die=U.smooth(life),burst=Math.sin(Math.PI*clamp(life));
          a*=1-die;r*=1+.9*burst-.35*die;glow+=2.8*burst;
          if(life>0&&life<1){
            const p=pp(x,height(x,z)-3.2,z);
            front+=`<circle cx="${n(p.x)}" cy="${n(p.y)}" r="${n((6+24*life)*p.s)}" fill="none" stroke="#fff" stroke-width=".9" opacity="${n(.85*(1-life))}"/>`;
          }
        }
        if(a<=.004)continue;
        const p=pp(x,height(x,z)-3.2,z);
        front+=U.sphere(p.x,p.y,r*p.s,{opacity:a,glow});
      }
      s+=front;
    }
    // Light from the rolling ball spreads along nearby mesh strands.
    let lit='';
    for(let j=-2;j<=2;j++){
      const pts=[];
      for(let i=0;i<=18;i++){
        const x=ballX-23+i/18*46,z=ballZ+j*6;
        pts.push(pp(x,height(x,z)-.35,z));
      }
      lit+=U.polyline(pts,{opacity:alive*(.22+flash)*(.8-Math.abs(j)*.2),width:.65});
    }
    s+=`<g filter="url(#un-soft)" opacity=".5">${lit}</g>${lit}`;
    // A very short fading wake conveys motion without drawing a diagram arrow.
    if(travel>0){
      const tail=[];
      for(let i=0;i<=20;i++){
        const a=Math.max(0,travel-.11+i*.11/20),x=mix(-112,34,a),z=-31+33*a+8*Math.sin(a*Math.PI*2);
        tail.push(pp(x,height(x,z)-1,z));
      }
      s+=U.polyline(tail,{opacity:.22*alive,width:.7})+U.polyline(tail,{opacity:.16*alive,width:2,glow:true});
    }
    const contact=pp(ballX,height(ballX,ballZ),ballZ);
    s+=`<ellipse cx="${n(contact.x)}" cy="${n(contact.y+1)}" rx="${n(9*contact.s)}" ry="${n(3*contact.s)}" fill="#000" opacity=".7"/>`;
    // The label rides above the mesh's far corner, so the moving surface never crosses it.
    const titleA=U.at(K,'loss',t,.65,start),corner=rows[nz][0];
    s+=U.italic(corner.x-20,corner.y-7,'ошибка',{size:17,opacity:.68*titleA});
    const age=ease((t-start)/Math.max(.01,finish-start));
    const count=Math.floor(38*age+1e-8);
    // No "≈0,0": the counter does not exist until its first non-zero value.
    if(count>0){
      const value=(count/10).toFixed(1).replace('.',',');
      const yearsA=U.smooth((t-mix(start,finish,FIRST))/.7),emphasis=U.at(K,'years',t,.8,start);
      const labelX=Math.min(234,seat.x+14),labelY=seat.y-13;
      s+=`<g stroke="#000" stroke-width="2.5" stroke-linejoin="round" paint-order="stroke">${U.mono(labelX,labelY,`≈${value} млрд лет`,{size:11.5,opacity:yearsA*(.75+.2*emphasis)})}</g>`;
      s+=U.mono(labelX,labelY,`≈${value} млрд лет`,{size:11.5,opacity:yearsA*emphasis*.18,glow:true});
    }
    s+='</g>';
    // The strike: the frame goes dark and holds to the end of the word.
    const dark=.97*blackout(t,death,deathEnd);
    if(dark>0)s+=`<rect x="-20" y="-20" width="400" height="680" fill="#000" opacity="${n(dark)}"/>`;
    if(o.ball!==false){
      s+=`<g opacity="${n(enter*alive)}">`;
      // A short streak above the falling ball: it fell, it did not slide. The slight
      // tilt keeps the glow's box non-empty: a strictly vertical line would not be drawn.
      if(fall>0&&fall<1)s+=U.thread([bp.x+.2,bp.y-34*fall],[bp.x,bp.y-3],{opacity:.5,width:1.5,glow:true});
      s+=U.sphere(bp.x,bp.y,5.5*bp.s,{glow:1.25+flash,opacity:1});
      // Slow moving glint makes the small sphere read as glass, like the source.
      s+=`${U.weight(bp.x,bp.y,6.2*bp.s,1.6*bp.s,{opacity:.18,angle:travel*150})}</g>`;
    }
    return s;
  }
  SCENES.un_loss=function(u,p={},d,t) {
    return UN.wrap(bodyAt(t,p.K||{},p.mode));
  };
  SCENES.un_loss.body=bodyAt;
  SCENES.un_loss.geometry=geometryAt;
})();
