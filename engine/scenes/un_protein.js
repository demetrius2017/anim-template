/* un_protein — фраза t4: «Органика — это трансформеры. Белок — это текст…»
 * p.s: "st4"; p.mode: "organics"; p.K: абсолютные времена из cues.json.
 * Камера сцены своя, камера движка нейтральна.
 * Наезд в сегмент ОРГАНИКА правой башни (SCENES.un_towers.body/state, если есть),
 * внутри цепочка из 15 бусин разной величины. Шесть крупных опорных бусин несут
 * те же пары и те же толщины дуг, что токены «Что такое Chat G PT ?» на кадре
 * t=50 исходного ролика, поэтому ряд пилюль на K.attention повторяет рисунок.
 * K.aminos: строка токенов. K.far: толстая дуга, затем перебор, дальние бусины
 * сходятся: заметно уже в первые .5 с. K.net: сворачивание ускоряется. На K.attention
 * цепочка и ряд пилюль держатся неподвижно. Наезд 1 с трогается на слове «Белок»: до него
 * ОРГАНИКА, ТРАНСФОРМЕРЫ и линия стоят .8 с от K.transformers. Пилюли уходят до отъезда.
 * Отъезд с K.t4_end к K.cells: он заканчивается внутри шота t5, кадр там рисует этот же
 * body через owns.
 * SCENES.un_protein.body(t,K,mode) — сырой SVG без wrap.
 * SCENES.un_protein.mini(x,y,w,h,t,K) — та же цепочка внутри сегмента башни.
 * SCENES.un_protein.owns(t,K) — идёт ли отъезд, который рисует эта сцена.
 * SCENES.un_protein.flight(K) — времена наезда и отъезда, по ним un_towers гасит подписи.
 * Детерминизм: только t и K. Если башни нет, сцена идёт из чёрного.
 */
(() => {
  const N=15,ANCH=[0,3,6,8,11,14],APOS=[0,.246,.509,.70,.853,1];
  const R=[10,5.6,6.8,9.6,6.2,5.2,10.4,6,9.4,6.8,5.4,9,5.8,6.4,10];
  const LET='MKTAYIAKQRQISFV';
  const LINE={x0:28,span:304,y:196};
  const FORM={cx:180,y:146,span:184,cy:160};
  const PILL={x0:105,span:150,y:334,text:['Что','такое','Chat','G','PT','?']};
  // Свёрнутая форма: опорные бусины в ряд, остальная цепочка уходит под них клубком.
  const LOOP={1:[-88,31],2:[-58,47],4:[-30,52],5:[-6,31],7:[17,45],9:[46,54],10:[28,27],12:[86,33],13:[62,47]};
  // Пары и толщины дуг, снятые с кадра t=50.
  const ARCS=[[0,5,2.8],[0,4,.95],[0,3,.85],[0,2,.9],[0,1,1.9],[1,2,1.8],[1,3,.85],[1,4,1.3],[2,3,1.8],[2,4,1.35],[2,5,.9],[3,4,1.55],[3,5,1.1],[4,5,.85]];
  const mix=(a,b,q)=>a+(b-a)*q;
  const clamp=x=>Math.max(0,Math.min(1,x));
  const sm=x=>{x=clamp(x);return x*x*(3-2*x);};
  const glide=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
  const n=v=>v.toFixed(2);
  const foldPos=i=>{
    const a=ANCH.indexOf(i);
    if(a>=0)return [FORM.cx-FORM.span/2+APOS[a]*FORM.span,FORM.y];
    const q=LOOP[i];return [FORM.cx+q[0],FORM.y+q[1]];
  };
  // Дальние бусины трогаются сразу на K.far и успевают подняться и сойтись на треть пути.
  // До K.net сворачивание ползёт, на K.net ускоряется.
  const foldAt=(t,K)=>.34*sm((t-K.far)/.62)+.18*sm((t-K.far-.4)/Math.max(.2,K.net-K.far-.4))+.48*sm((t-K.net)/1.1);

  function beads(t,K){
    const l=foldAt(t,K),wave=1-sm((t-K.aminos)/.7),out=[];
    for(let i=0;i<N;i++){
      const lx=LINE.x0+i*LINE.span/(N-1),ly=LINE.y+wave*15*Math.sin(i*.8+t*1.15);
      const [fx,fy]=foldPos(i);
      const lead=.26*(1-Math.abs(i-7)/7),e=sm((l-lead)/(1-.26));
      const anchor=ANCH.includes(i);
      const bulge=anchor?0:Math.sin(Math.PI*e)*(i%2?30:-20);
      const breathe=e*(.9*Math.sin(t*1.25+i*1.7));
      out.push({x:mix(lx,fx,e)+breathe*.6,y:mix(ly,fy,e)+bulge+breathe,r:R[i]*mix(1,anchor?.86:.8,e),anchor,e});
    }
    return out;
  }
  function spline(p){
    let d=`M${n(p[0].x)} ${n(p[0].y)}`;
    for(let i=0;i<p.length-1;i++){
      const a=p[Math.max(0,i-1)],b=p[i],c=p[i+1],e=p[Math.min(p.length-1,i+2)];
      d+=`C${n(b.x+(c.x-a.x)/6)} ${n(b.y+(c.y-a.y)/6)} ${n(c.x-(e.x-b.x)/6)} ${n(c.y-(e.y-b.y)/6)} ${n(c.x)} ${n(c.y)}`;
    }
    return d;
  }
  // Форма дуги с кадра t=50: крутые ножки, круглая вершина, высота от пролёта.
  function arcD(x0,x1,y,scale,y1=y){
    const d=x1-x0,s=Math.abs(d)/Math.max(1,scale),h=.56*scale*Math.pow(s,.8),top=Math.min(y,y1)-h*1.33;
    return `M${n(x0)} ${n(y)}C${n(x0+.16*d)} ${n(top)} ${n(x1-.16*d)} ${n(top)} ${n(x1)} ${n(y1)}`;
  }
  const arcStart=(K,i)=>i===0?K.far:K.far+.78+(i-1)*(K.net-K.far-.78)/(ARCS.length-1);
  function arcsOn(t,K,flash=0){
    return ARCS.map((a,i)=>{
      const t0=arcStart(K,i),d=i===0?.72:.3,p=sm((t-t0)/d),hit=i?Math.max(0,1-Math.abs(t-t0-.24)/.34):0;
      return {u:a[0],v:a[1],w:a[2],p,hit,i};
    }).filter(a=>a.p>0);
  }
  function chain(t,K){
    const U=UN,B=beads(t,K),l=foldAt(t,K);
    let s=`<path d="${spline(B)}" fill="none" stroke="#fff" stroke-width="1.05" opacity=".72"/><path d="${spline(B)}" fill="none" stroke="#fff" stroke-width="3" opacity=".16" filter="url(#un-soft)"/>`;
    const scale=mix(LINE.span,FORM.span,sm(l*1.05));
    const flash=K.attention===undefined?0:Math.max(0,1-Math.abs(t-K.attention-.34)/.34);
    let arcs='',soft='';
    for(const a of arcsOn(t,K)){
      const P=B[ANCH[a.u]],Q=B[ANCH[a.v]],d=arcD(P.x,Q.x,Math.min(P.y,Q.y)-P.r*.15,scale);
      const w=a.w*mix(1,.78,l)+a.hit*1.5+(a.i===0?flash:0);
      arcs+=`<path d="${d}" pathLength="1" stroke-dasharray="${n(a.p)} 1" fill="none" stroke="#fff" stroke-width="${n(w)}" stroke-linecap="round" opacity="${n(mix(.86,1,a.hit))}"/>`;
      if(a.w>1.2||a.hit>0)soft+=`<path d="${d}" pathLength="1" stroke-dasharray="${n(a.p)} 1" fill="none" stroke="#fff" stroke-width="${n(w+1.6)}" stroke-linecap="round"/>`;
    }
    s+=`<g filter="url(#un-soft)" opacity=".42">${soft}</g>${arcs}`;
    // Выбранная бусина: подсвечена, пока от неё идёт перебор.
    const cur=arcsOn(t,K).filter(a=>a.hit>0||a.i===0&&a.p<1).pop();
    B.forEach((b,i)=>{s+=U.sphere(b.x,b.y,b.r,{opacity:1,glow:b.anchor?.82:.55});});
    if(cur&&t<K.net+.2){
      const b=B[ANCH[cur.u]],pulse=1-.5*Math.abs(Math.sin(t*5));
      s+=`<circle cx="${n(b.x)}" cy="${n(b.y)}" r="${n(b.r+3.4)}" fill="none" stroke="#fff" stroke-width=".9" opacity="${n(pulse)}"/>`;
    }
    const tok=sm((t-K.aminos)/.5)*(1-sm((t-K.far-.3)/.7));
    if(tok>.004)B.forEach((b,i)=>{s+=UN.token(b.x,b.y,LET[i],{w:19.4,h:27,size:10.5,opacity:tok});});
    return s;
  }
  function pills(t,K){
    // На отъезде буквы мельчают: ряд уходит раньше, чем под ним проявится башня.
    const U=UN,start=K.attention-.1,a=sm((t-start)/.2)*(1-sm((t-flight(K).outA+.12)/.18));
    if(a<=.004)return '';
    const xs=APOS.map(q=>PILL.x0+q*PILL.span),top=PILL.y-7.8,p=a,flash=Math.max(0,1-Math.abs(t-K.attention-.34)/.34);
    let s='';
    ARCS.forEach(([u,v,w],i)=>{
      const d=arcD(xs[u],xs[v],top,PILL.span),width=w*.72+(i===0?flash:0);
      s+=`<path d="${d}" pathLength="1" stroke-dasharray="${n(p)} 1" fill="none" stroke="#fff" stroke-width="${n(width)}" stroke-linecap="round" opacity=".92"/>`;
    });
    PILL.text.forEach((text,i)=>{s+=U.token(xs[i],PILL.y,text,{w:Math.max(13,text.length*5.65+9),h:15.6,size:9.4,opacity:1});});
    return `<g opacity="${n(a)}">${s}</g>`;
  }
  // Задний план: камера внутри прозрачного блока.
  function lattice(t){
    let d='';
    const dx=Math.sin(t*.19)*5,dy=Math.cos(t*.16)*4;
    for(let j=0;j<16;j++)for(let i=0;i<11;i++){
      const x=12+i*34+dx*(.5+.5*((j%3)/2)),y=8+j*25+dy;
      d+=`M${n(x)} ${n(y)}l.01 0`;
    }
    return `<path d="${d}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" fill="none" opacity=".17"/>`;
  }
  function mini(x,y,w,h,t,K){
    const B=beads(t,K),l=foldAt(t,K),scale=w/mix(LINE.span,FORM.span,sm(l*1.05));
    const cy=mix(LINE.y,FORM.cy,sm(l*1.05));
    const q=B.map(b=>({x:x+(b.x-FORM.cx)*scale,y:y+(b.y-cy)*scale*1.12,r:b.r*scale,anchor:b.anchor}));
    let s=`<path d="${spline(q)}" fill="none" stroke="#fff" stroke-width=".5" opacity=".85"/>`;
    for(const a of arcsOn(t,K)){
      const P=q[ANCH[a.u]],Q=q[ANCH[a.v]];
      s+=`<path d="${arcD(P.x,Q.x,Math.min(P.y,Q.y),w)}" pathLength="1" stroke-dasharray="${n(a.p)} 1" fill="none" stroke="#fff" stroke-width="${n(Math.max(.34,a.w*.3))}" opacity=".9"/>`;
    }
    for(const b of q)s+=`<circle cx="${n(b.x)}" cy="${n(b.y)}" r="${n(Math.max(b.anchor?1.5:.95,b.r))}" fill="#fff"/>`;
    return s;
  }
  function inner(t,K){return `${UN.bokeh(t,{seed:27,count:16,opacity:.42})}${lattice(t)}${chain(t,K)}${pills(t,K)}`;}

  // Без p.K (scene_test) сцена идёт по собственной шкале длиной 10 с.
  const TEST={t4:0,organics:.05,transformers:1,protein:2,aminos:3.2,far:4.1,net:7.4,attention:8.3,t4_end:9,t5:9.3,cells:9.9};
  // Наезд ждёт, пока подписи простоят .8 с от K.transformers: он трогается на слове «Белок».
  const flight=K=>({inA:K.transformers+.92,inB:K.transformers+1.92,outA:K.t4_end,outB:K.cells-.04});
  function body(t,K={}){
    K=K?.protein===undefined?{...TEST,...K}:K;
    const U=UN,tw=SCENES.un_towers;
    if(typeof tw?.body!=='function'||typeof tw?.state!=='function'){
      const a=U.smooth((t-K.t4+.05)/.7)*(1-U.smooth((t-K.t5+.45)/.4));
      return `<g opacity="${n(a)}">${inner(t,K)}</g>`;
    }
    const {inA,inB,outA,outB}=flight(K);
    // Без режима un_towers отдаёт сами башни: 'stack' на отъезде вернул бы кадр сюда.
    if(t>=outB)return tw.body(t,K);
    // У отъезда длинный хвост: самый быстрый момент здесь — левая башня, влетающая в кадр в конце.
    const e1=glide((t-inA)/(inB-inA)),e2=1-Math.pow(1-U.smooth((t-outA)/(outB-outA)),1.4);
    const lev=tw.state(t,K).levels[1],cx=tw.state(t,K).right.x,cy=lev.y,w=lev.c*2.2;
    const zIn=LINE.span/w,zOut=FORM.span/w;
    const view=(z,sx,sy)=>`translate(${n(sx)} ${n(sy)}) scale(${z.toFixed(3)}) translate(${n(-cx)} ${n(-cy)})`;
    const inside=inner(t,K);
    if(e2>0){
      const z=Math.exp((1-e2)*Math.log(zOut)),sx=mix(180,cx,e2),sy=mix(FORM.cy,cy,e2),ta=sm((e2-.34)/.5),ca=1-sm((e2-.56)/.38),q=z/zOut;
      return `${ta>.004?`<g opacity="${n(ta)}" transform="${view(z,sx,sy)}">${tw.body(t,K)}</g>`:''}
        <g opacity="${n(ca)}" transform="translate(${n(sx)} ${n(sy)}) scale(${q.toFixed(3)}) translate(-180 ${-FORM.cy})">${inside}</g>`;
    }
    if(e1>=1)return inside;
    const z=Math.exp(e1*Math.log(zIn)),sx=mix(cx,180,e1),sy=mix(cy,LINE.y,e1),ta=1-sm((e1-.38)/.42),ca=sm((e1-.46)/.4),q=z/zIn;
    return `${ta>.004?`<g opacity="${n(ta)}" transform="${view(z,sx,sy)}">${tw.body(t,K)}</g>`:''}
      ${ca>.004?`<g opacity="${n(ca)}" transform="translate(${n(sx)} ${n(sy)}) scale(${q.toFixed(3)}) translate(-180 ${-LINE.y})">${inside}</g>`:''}`;
  }
  SCENES.un_protein=function(u,p={},d,t){return UN.wrap(body(t,p.K||{},p.mode));};
  SCENES.un_protein.body=body;
  SCENES.un_protein.mini=mini;
  SCENES.un_protein.flight=flight;
  SCENES.un_protein.owns=(t,K)=>{
    if(K?.protein===undefined||K.cells===undefined)return false;
    const {outA,outB}=flight(K);
    return t>=outA&&t<outB;
  };
})();
