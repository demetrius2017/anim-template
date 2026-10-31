/* Phrases 13a/13 — token sequence, attention arcs, then one empty token.
 * p.s='s13a'/'s13'; p.mode='sequence'/'final'; p.K: ABSOLUTE s13a, next, token,
 * silence, final_you, card cues. story.py passes K.card equal to K.f1.
 * Both modes evaluate ONE trajectory, including the cut's -.05s pre-roll.
 * Entry: this scene owns the .85 s dissolve from SCENES.un_observer.body(t,K,'god'):
 * the god frame's six ghost pills travel into this row and fill, the empty pill
 * comes from «?», «Бог?» is drawn on its own and is gone by K.next. Without
 * un_observer the row rises from black. Arcs grow to the empty pill on K.next, the dolly
 * isolates that pill on K.token. The row holds only past tokens, so «ты» is
 * never read before it is said: the pill fills on K.final_you, stands by the
 * end of the word and stays at full light.
 * EXIT CONTRACT with un_super, do not change: at the end the filled pill sits at
 * x=180+sin(t*.31)*1.4, y=211+cos(t*.27)*1.7, w=71.75, h=34.04. From K.s13_end
 * this scene hands the frame to SCENES.un_super.body, which draws that same pill
 * while the person gathers in the pause, before the story cut at K.f1-.05.
 * SCENES.un_tokens.body(t,K,mode) is raw SVG; empty from K.card on.
 * Neutral runtime camera {z0:1,z1:1,drift:0,kicks:0}; local dolly, full-frame space with a soft lower fade.
 */
(() => {
  const lerp=(a,b,q)=>a+(b-a)*q;
  const n=v=>v.toFixed(3);
  function bodyAt(t,K={},mode){
    const U=UN,start=K.s13a??0;
    const cue=(key,offset)=>K[key]??(start+offset);
    const card=K.card??cue('f1',4.9);
    if(t>=card)return '';
    // Same absolute t, same K: the frame is already un_super's for the whole pause.
    if(K.s13_end!==undefined&&t>=K.s13_end&&typeof SCENES.un_super?.body==='function')return SCENES.un_super.body(t,K,'question');
    const ramp=(a,b)=>U.smooth((t-a)/Math.max(.001,b-a));
    const enter=ramp(start-.05,start+.8),show=ramp(start-.05,start+.32);
    const focus=ramp(cue('token',1.62),cue('silence',2.45)-.05);
    const lonely=ramp(cue('token',1.62)+.1,cue('silence',2.45)-.05);
    const you=cue('final_you',3.87),filled=ramp(you-.06,you+.16);
    let s=U.bokeh(t,{seed:17,count:26,opacity:.15*(1-lonely)*enter});
    const god=SCENES.un_observer;
    const word=god?.word?.(t,K)??'';
    const labels=['Атом','Молекула','Клетка','Жизнь',''];
    const widths=[44,72,57,50,35],last=labels.length-1,base=[];
    let x=-141;
    for(let i=0;i<=last;i++){base.push(x+widths[i]/2);x+=widths[i]+6;}
    const camera={cx:184,cy:218,scale:lerp(.94,1,enter),yaw:-.18+Math.sin(t*.21)*.035,pitch:.11};
    const pts=base.map((x,i)=>U.project([x,32+Math.sin(i*.58+t*.22)*3,(i-2)*7],camera));
    const empty=pts[last],target={x:180+Math.sin(t*.31)*1.4,y:211+Math.cos(t*.27)*1.7};
    const zoom=lerp(1,2.05,focus);
    const transform=v=>({x:lerp(v.x,target.x+(v.x-empty.x)*zoom,focus),y:lerp(v.y,target.y+(v.y-empty.y)*zoom,focus)});
    // Row assembly: each pill leaves its place in the god row, «G» and «PT» merge into one.
    const row=god?.row,arrive=row?ramp(start-.05,start+.85):1;
    const origin=row?[row[0],row[1],row[2],{x:(row[3].x+row[4].x)/2,y:row[3].y,w:row[4].x-row[3].x+row[4].w/2+row[3].w/2,h:row[3].h},row[5]]:null;
    const home=i=>origin?origin[i]:{x:pts[i].x,y:pts[i].y,w:widths[i]*pts[i].s,h:23*pts[i].s};
    const screen=pts.map((v,i)=>{const o=transform(v),g=home(i);return {x:lerp(g.x,o.x,arrive),y:lerp(g.y,o.y,arrive)};});
    const size=pts.map((v,i)=>({w:lerp(home(i).w,widths[i]*lerp(v.s,zoom,focus),arrive),h:lerp(home(i).h,23*lerp(v.s,1.48,focus),arrive)}));
    if(enter<1){
      // Old pills ride inside the new ones, so there is never a second row; their words are gone by start+.03, while the new labels are still dim.
      const ride=origin&&[0,1,2,3,3,4].map((j,i)=>{const k=size[j].w/origin[j].w;return {x:screen[j].x+(row[i].x-origin[j].x)*k,y:screen[j].y,w:row[i].w*k,h:size[j].h};});
      const net=window.UN_V2?.prev?.('un_observer',t,K,'god',{word:false,pills:1-show,text:1-ramp(start-.05,start+.03),row:ride})??null;
      if(net!==null)s=`<g opacity="${n(1-enter)}">${net}</g>`+s;
    }
    const attention=ramp(cue('next',1.1)-.04,cue('token',1.62)+.28);
    let arcs='';
    for(let i=0;i<last;i++){
      const from=pts[i],to=pts[last],height=50+(last+1-i)*19;
      const arch=q=>transform({x:lerp(from.x,to.x,q),y:lerp(from.y,to.y,q)-Math.sin(Math.PI*q)*height});
      const reveal=U.smooth(attention*1.8-i*.14);
      if(reveal<=0)continue;
      const path=Array.from({length:49},(_,j)=>arch(j/48*reveal));
      const opacity=(.3+i*.08)*enter*(1-lonely);
      arcs+=U.polyline(path,{width:.7,opacity});
      arcs+=U.polyline(path,{width:2.8,opacity:opacity*.27,glow:true});
      const phase=(t*.48+i*.17)%1,signal=arch(phase*reveal);
      const strength=Math.sin(phase*Math.PI)**2*opacity*attention;
      arcs+=U.sphere(signal.x,signal.y,1.1,{opacity:strength,glow:1.3,highlight:false});
    }
    s+=`<defs><linearGradient id="un-e-edge"><stop stop-color="#000"/><stop offset=".09" stop-color="#fff"/><stop offset=".91" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="un-e-edge-mask"><rect x="0" y="0" width="360" height="640" fill="url(#un-e-edge)"/></mask></defs><g mask="url(#un-e-edge-mask)">`+arcs;
    for(let i=0;i<=last;i++){
      const v=screen[i],selected=i===last;
      const {w,h}=size[i];
      // Fade the WHOLE labelled pill while it is still inside the frame.
      // The 12px guard includes the stroke/glow; no word loses letters first.
      const clearance=Math.min(v.x-w/2,360-v.x-w/2);
      const restingClearance=Math.min(pts[i].x-widths[i]*pts[i].s/2,360-pts[i].x-widths[i]*pts[i].s/2);
      const fadeDistance=Math.max(8,Math.min(32,restingClearance-12));
      const edge=U.smooth((clearance-12)/fadeDistance);
      const visibility=(row?show:enter)*(selected?1:(1-lonely)*edge);
      // The phase un_super continues; the pill breathes on through the handoff.
      const breath=.86+.14*Math.sin(t*1.35+(selected?3.5:i*.7))**2;
      s+=`<rect x="${n(v.x-w/2)}" y="${n(v.y-h/2)}" width="${n(w)}" height="${n(h)}" rx="${n(h/2)}" fill="none" stroke="#fff" stroke-width="2.1" opacity="${n(.34*visibility*breath)}" filter="url(#un-soft)"/>`;
      s+=U.token(v.x,v.y,labels[i],{w,h,size:10*lerp(pts[i].s,1.3,focus),opacity:visibility*breath});
      if(selected){
        const blink=U.smooth((Math.sin((t-cue('token',1.62))*Math.PI*1.6)+.3)/.9),cursor=enter*blink*(1-filled);
        s+=U.thread([v.x,v.y-5.8],[v.x,v.y+5.8],{width:.85,opacity:cursor});
        s+=U.thread([v.x,v.y-5.8],[v.x,v.y+5.8],{width:2,opacity:cursor*.25,glow:true});
        s+=U.mono(v.x,v.y+5,'ты',{size:15,anchor:'middle',opacity:filled*visibility*breath*.97});
      }
    }
    return s+'</g>'+word;
  }
  SCENES.un_tokens=function(u,p={},d,t){return UN.wrap(bodyAt(t,p.K||{},p.mode));};
  SCENES.un_tokens.body=bodyAt;
})();
