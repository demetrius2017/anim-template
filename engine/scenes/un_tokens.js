/* s12/s13 — token sequence, attention arcs, then one empty token.
 * p.s='s12'/'s13'; p.mode='sequence'/'final'; p.K: ABSOLUTE s12, hypothesis,
 * if_true, universe, next, token, silence, maybe, final_you, card cues.
 * Both modes evaluate ONE trajectory, including the cut's -.05s pre-roll.
 * From K.card return exactly UN.wrap(''); story.py owns the final card.
 * Neutral runtime camera {z0:1,z1:1,drift:0,kicks:0}; local dolly, full-frame space with a soft lower fade.
 */
(() => {
  const lerp=(a,b,q)=>a+(b-a)*q;
  const n=v=>v.toFixed(3);
  SCENES.un_tokens=function(u,p,d,t){
    const U=UN,K=p.K||{},start=K.s12??K.hypothesis??0;
    const cue=(key,offset)=>K[key]??(start+offset);
    if(t>=cue('card',7.45))return U.wrap('');
    const ramp=(a,b)=>U.smooth((t-a)/Math.max(.001,b-a));
    const enter=ramp(start-.05,start+.85);
    const focus=ramp(cue('next',3.76),cue('silence',5.21)-.05);
    const lonely=ramp(cue('next',3.76),cue('silence',5.21)-.05);
    const fade=1-ramp(cue('final_you',6.63)+.18,cue('card',7.45));
    const drift=Math.sin(t*.4)*1.8;
    let s=U.bokeh(t,{seed:17,count:26,opacity:.15*(1-lonely)});
    // Local s11 pose match. No change to the shared UN helpers.
    const pair=U.thread([182+drift,80],[180,342],{opacity:.48,width:.55})+
      U.weight(180+(2+drift)*(1-150/262),230,36,5.2,{opacity:.67})+
      U.sphere(182+drift,80,9,{glow:1.1})+U.sphere(180,342,6);
    s+=`<g opacity="${n(1-enter)}">${pair}</g>`;
    const labels=['Атом','Молекула','Клетка','Жизнь','Ты?',''];
    const widths=[44,72,57,50,39,35],base=[];
    let x=-158;
    for(let i=0;i<6;i++){base.push(x+widths[i]/2);x+=widths[i]+6;}
    const camera={cx:184,cy:218,scale:lerp(.94,1,enter),yaw:-.18+Math.sin(t*.21)*.035,pitch:.11};
    const pts=base.map((x,i)=>U.project([x,32+Math.sin(i*.58+t*.22)*3,(i-2.5)*7],camera));
    const empty=pts[5],target={x:180+Math.sin(t*.31)*1.4,y:211+Math.cos(t*.27)*1.7};
    const zoom=lerp(1,2.05,focus);
    const transform=v=>({x:lerp(v.x,target.x+(v.x-empty.x)*zoom,focus),y:lerp(v.y,target.y+(v.y-empty.y)*zoom,focus)});
    const screen=pts.map(transform);
    const attention=ramp(cue('if_true',2.1)-.5,cue('universe',2.78)+.35);
    let arcs='';
    for(let i=0;i<5;i++){
      const from=pts[i],to=pts[5],height=50+(5-i)*19;
      const arch=q=>transform({x:lerp(from.x,to.x,q),y:lerp(from.y,to.y,q)-Math.sin(Math.PI*q)*height});
      const reveal=U.smooth(attention*1.8-i*.14);
      const path=Array.from({length:49},(_,j)=>arch(j/48*reveal));
      const opacity=(.3+i*.08)*enter*(1-lonely);
      arcs+=U.polyline(path,{width:.7,opacity});
      arcs+=U.polyline(path,{width:2.8,opacity:opacity*.27,glow:true});
      const phase=(t*.48+i*.17)%1,signal=arch(phase*reveal);
      const strength=Math.sin(phase*Math.PI)**2*opacity*attention;
      arcs+=U.sphere(signal.x,signal.y,1.1,{opacity:strength,glow:1.3,highlight:false});
    }
    s+=`<defs><linearGradient id="un-e-edge"><stop stop-color="#000"/><stop offset=".09" stop-color="#fff"/><stop offset=".91" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="un-e-edge-mask"><rect x="0" y="0" width="360" height="640" fill="url(#un-e-edge)"/></mask></defs><g mask="url(#un-e-edge-mask)">`+arcs;
    for(let i=0;i<6;i++){
      const v=screen[i],selected=i===5;
      const w=widths[i]*lerp(pts[i].s,zoom,focus),h=23*lerp(pts[i].s,1.48,focus);
      // Fade the WHOLE labelled pill while it is still inside the frame.
      // The 12px guard includes the stroke/glow; no word loses letters first.
      const clearance=Math.min(v.x-w/2,360-v.x-w/2);
      const restingClearance=Math.min(pts[i].x-widths[i]*pts[i].s/2,360-pts[i].x-widths[i]*pts[i].s/2);
      const fadeDistance=Math.max(8,Math.min(32,restingClearance-12));
      const edge=U.smooth((clearance-12)/fadeDistance);
      const visibility=enter*(selected?1:(1-lonely)*edge)*fade;
      const breath=.86+.14*Math.sin(t*1.35+i*.7)**2;
      s+=`<rect x="${n(v.x-w/2)}" y="${n(v.y-h/2)}" width="${n(w)}" height="${n(h)}" rx="${n(h/2)}" fill="none" stroke="#fff" stroke-width="2.1" opacity="${n(.34*visibility*breath)}" filter="url(#un-soft)"/>`;
      s+=U.token(v.x,v.y,labels[i],{w,h,size:10*lerp(pts[i].s,1.3,focus),opacity:visibility*breath});
      if(selected){
        const blink=U.smooth((Math.sin((t-cue('token',4.22))*Math.PI*1.6)+.3)/.9),cursor=enter*fade*blink;
        s+=U.thread([v.x,v.y-5.8],[v.x,v.y+5.8],{width:.85,opacity:cursor});
        s+=U.thread([v.x,v.y-5.8],[v.x,v.y+5.8],{width:2,opacity:cursor*.25,glow:true});
      }
    }
    return U.wrap(s+'</g>');
  };
})();
