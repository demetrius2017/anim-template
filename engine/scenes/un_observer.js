/* un_observer — «внимание между слоями», кульминация второй части (фразы g1–g6).
 * p.mode: decode | spider | snake | layers | third | god; p.K: абсолютные времена
 * из build/cues.json, настоящий голос.
 *   decode  g1: башня уходит раньше пилюль; вся сетка дуг с весами стоит к K.g_token.
 *   spider  g2: паутина нить за нитью, паук, мошка, гены внутри брюшка, «мошка?».
 *   snake   g3: паукохвостая гадюка, приманка-паук, птица, бросок 0,2 с, зрачок.
 *   layers  g4: этажи башни, дуги мошка→паук и птица→змея, затем дуги этаж↔этаж.
 *   third   g5: ноги на этажах, вершины наклоняются к точке, огромная дуга, точка видна.
 *   god     g6: башня меркнет, ноги сходят на ряд пилюль, рисунок decode в масштабе, «Бог?».
 * Экспорт: SCENES.un_observer(u,p,d,t), SCENES.un_observer.body(t,K,mode,o),
 * .word(t,K) и .row — для наплыва un_tokens. o.word=false, o.pills и o.text 0..1, o.row[6] {x,y,w,h} управляют кадром god.
 * Камера движка нейтральна {z0:1,z1:1,drift:0,kicks:0}, камера живёт внутри сцены.
 * Детерминизм: только t и K. Таблицы моделей считаются один раз при загрузке файла.
 * Входящий режим владеет наплывом: decode из un_towers(universe) или из чёрного,
 * spider из decode, snake из spider, layers из snake; layers/third/god — одна
 * непрерывная траектория, шва между ними нет. Выход владеет un_tokens: он вызывает
 * body(t,K,'god') и собирает свой ряд из пилюль .row. Без id в SVG: вся глубина на прозрачности.
 * Важное y=16..370, субтитры y=410..480, цветов нет. Символов религии нет.
 * Необязательные K.tok_text[6], K.tok_val[5], K.tok_wt[5] — свои слова пилюль, числа под ними и толщины пяти главных
 * дуг (часть 2, 04.11: не токены исходного ролика); без них кадр прежний.
 */
(() => {
  const PI=Math.PI,TAU=PI*2;
  const H=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const sm=x=>{x=cl(x);return x*x*(3-2*x);};
  const mix=(a,b,q)=>a+(b-a)*q;
  const ramp=(t,a,b)=>sm((t-a)/Math.max(.001,b-a));
  const f2=v=>v.toFixed(2),f3=v=>v.toFixed(3);
  const nrm=(x,y,z)=>{const m=Math.hypot(x,y,z)||1;return [x/m,y/m,z/m];};
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const add=(a,b,k=1)=>[a[0]+b[0]*k,a[1]+b[1]*k,a[2]+b[2]*k];
  const dot3=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const vmix=(a,b,q)=>[mix(a[0],b[0],q),mix(a[1],b[1],q),mix(a[2],b[2],q)];
  const fibo=n=>{const o=[],g=PI*(3-Math.sqrt(5));for(let i=0;i<n;i++){const y=1-2*(i+.5)/n,r=Math.sqrt(1-y*y),a=g*i;o.push([Math.cos(a)*r,y,Math.sin(a)*r]);}return o;};
  const bez=(a,b,c,d,q)=>{const m=1-q;return [0,1,2].map(i=>m*m*m*a[i]+3*m*m*q*b[i]+3*m*q*q*c[i]+q*q*q*d[i]);};

  const OFF={g_where:1.409,g_gpt:2.919,g_token:3.981,g_others:6.602,sg1_end:7.393,g2:7.693,g_spider:7.693,g_web:9.028,
    g_midge:10.067,g_mutation:10.759,g_knows:12.441,sg2_end:14.122,g3:14.422,g_snake:14.893,g_tail:15.733,g_copy:16.352,
    g_bird:17.267,g_mouth:19.839,g_never:21.57,g_eyes:22.831,sg3_end:23.894,g4:24.194,g_bio:24.194,g_select:25.257,
    g_judge:26.767,g_layer:28.102,g_between:31.193,sg4_end:32.181,g5:32.531,g_third:32.531,g_creator:35.152,sg5_end:35.794,
    g6:36.194,g_what:36.319,g_god:38.42,sg6_end:38.915};
  const keys=K=>{const b=K.g1??K.sg1??0,r={...K,g1:b};for(const k in OFF)r[k]=K[k]??K['s'+k]??b+OFF[k];return r;};

  /* Точки одной строкой: разбивка по радиусу и яркости, один path на группу. */
  const RB=[.3,.38,.48,.6,.76,.96,1.25,1.65,2.2,3];
  const OB=[.06,.11,.17,.25,.34,.46,.6,.76,1];
  function cloud(points){
    const groups=new Map();
    for(const p of points){
      if(p[3]<.025||p[0]<-5||p[0]>365||p[1]<-5||p[1]>645)continue;
      let ri=0;while(ri<RB.length-1&&RB[ri+1]<=p[2])ri++;
      let oi=0;while(oi<OB.length-1&&OB[oi+1]<=p[3])oi++;
      const key=ri*16+oi,seg=`M${f2(p[0])} ${f2(p[1])}h.01`;
      const g=groups.get(key);if(g)g.push(seg);else groups.set(key,[seg]);
    }
    let s='';
    for(const [key,g] of groups){
      s+=`<path d="${g.join('')}" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="${f2(RB[key>>4]*2)}" opacity="${OB[key&15]}"/>`;
    }
    return s;
  }
  function lines(list,w,op,glow){
    let d='';
    for(const l of list){if(l.length<2)continue;d+='M'+l.map(p=>f2(p[0])+' '+f2(p[1])).join('L');}
    return d?`<path d="${d}" fill="none" stroke="#fff" stroke-width="${f2(w)}" opacity="${f3(cl(op))}" stroke-linecap="round" stroke-linejoin="round"${glow?' filter="url(#un-soft)"':''}/>`:'';
  }
  const blackPoly=(pts,op=1)=>`<path d="M${pts.map(p=>f2(p[0])+' '+f2(p[1])).join('L')}Z" fill="#000" opacity="${f3(op)}"/>`;
  const fade=(a,s)=>a>=.999?s:a<=.001?'':`<g opacity="${f3(a)}">${s}</g>`;
  const dissolve=(from,to,a)=>a>=.999?to:a<=.001?from:`<g opacity="${f3(1-a)}">${from}</g><g opacity="${f3(a)}">${to}</g>`;

  /* Камера той же формулы, что UN.project, плюс поворот нормалей. */
  function camera(c){
    const y=c.yaw??0,p=c.pitch??0,cy=Math.cos(y),sy=Math.sin(y),cp=Math.cos(p),sp=Math.sin(p);
    const f=c.f??620,d=c.distance??620,sc=c.scale??1,ox=c.cx??180,oy=c.cy??216;
    const rot=(a,b,e)=>{const x1=a*cy+e*sy,z1=-a*sy+e*cy;return [x1,b*cp-z1*sp,b*sp+z1*cp];};
    const proj=(a,b,e)=>{const r=rot(a,b,e),s=f/Math.max(40,d+r[2])*sc;return [ox+r[0]*s,oy+r[1]*s,r[2],s];};
    return {rot,proj,scale:sc};
  }
  const aimed=(c,F,X,Y)=>{const o=camera({...c,cx:0,cy:0}).proj(F[0],F[1],F[2]);return camera({...c,cx:X-o[0],cy:Y-o[1]});};

  /* ───────────── Паук-кругопряд: прозома, брюшко с рисунком, 8 ног по 5 члеников ───────────── */
  const SPIDER=(()=>{
    const pts=[];
    for(const q of fibo(2300)){
      const jit=1+.016*(H(pts.length*1.31)-.5),sh=1+.08*Math.exp(-Math.pow((q[1]+.72)/.2,2))*Math.min(1,Math.abs(q[0])*3);
      const p=[q[0]*12.8*jit*sh,12.5+q[1]*17.6*jit,-1.5+q[2]*11.4*jit],n=nrm(q[0]/12.8,q[1]/17.6,q[2]/11.4);
      const v=(p[1]-12.5)/17.6,wide=7.4*Math.sqrt(Math.max(0,1-v*v))*(1+.34*Math.sin(v*11+.5));
      let b=Math.abs(p[0])<wide?.3:.98;
      // Две продольные цепочки светлых пятен вдоль фолиума.
      const sy=(p[1]+3.6)/5.2,sk=Math.round(sy);
      if(sk>=0&&sk<=5&&Math.hypot(Math.abs(p[0])-(3.3-.16*sk),(sy-sk)*5.2)<1.7-.08*sk)b=1.2;
      if(Math.abs(Math.abs(p[0])-wide)<.9)b=1.05;
      pts.push({p,n,b:b*(.75+.25*H(pts.length*.37))});
    }
    const prosomaStart=pts.length;
    for(const q of fibo(520)){
      const taper=1-.28*cl((-q[1]+.2)/1.2);
      const p=[q[0]*7.4*taper,-12.2+q[1]*10,q[2]*5.2],n=nrm(q[0]/7.4,q[1]/10,q[2]/5.2);
      const groove=Math.abs(q[0])<.09?.55:1;
      pts.push({p,n,b:(.74+.22*H(pts.length*.61))*groove});
    }
    for(const side of [-1,1])for(const q of fibo(90)){
      const p=[side*2.4+q[0]*2.1,-23.6+q[1]*3.4,1+q[2]*1.9];
      pts.push({p,n:nrm(q[0],q[1],q[2]),b:.82});
    }
    return {pts,prosomaStart,eyes:[[-2.1,-22,-3.2],[2.1,-22,-3.2],[-1,-22.6,-3.6],[1,-22.6,-3.6],[-3.2,-21,-2.8],[3.2,-21,-2.8],[-.9,-21.2,-4],[.9,-21.2,-4]]};
  })();
  const LEG=[{az:.5,L:62,y:-19,x:5,b:.62},{az:.98,L:54,y:-16,x:6.2,b:.52},{az:2.04,L:35,y:-12,x:6.6,b:-.5},{az:2.62,L:50,y:-8.6,x:5.4,b:-.58}];
  const JOINT=[[0,0],[.30,-11.5],[.385,-13],[.63,-8],[.89,1.5],[1,6]];
  const LEGW=[2.1,1.8,1.45,1,.55];
  function spiderLeg(side,i,gait,move){
    const l=LEG[i],ph=(i%2)*PI+(side>0?PI:0),sw=Math.sin(gait+ph),up=Math.max(0,sw)*move;
    const az=l.az+.15*sw*move,k=l.L/55,o=[];
    for(let j=0;j<JOINT.length;j++){
      const [f,h]=JOINT[j],a=az+l.b*(f<.39?1:mix(1,-.55,sm((f-.39)/.5)))*(j?1:0),r=f*l.L;
      const prev=o[j-1],dr=j?(f-JOINT[j-1][0])*l.L:0;
      o.push(j?[prev[0]+side*Math.sin(a)*dr,prev[1]-Math.cos(a)*dr,(h-5*up*Math.sin(f*PI))*k]:[side*l.x,l.y,0]);
    }
    return o;
  }
  function drawSpider(o){
    const {x,y,s,ang=0,tilt=.2,gait=0,move=0,alpha=1,lod=1,occl=1,legA=1}=o;
    const ca=Math.cos(ang),sa=Math.sin(ang),ct=Math.cos(tilt),st=Math.sin(tilt);
    const R=p=>{const y1=p[1]*ct-p[2]*st,z1=p[1]*st+p[2]*ct;return [p[0]*ca-y1*sa,p[0]*sa+y1*ca,z1];};
    const S=p=>{const r=R(p);return [x+r[0]*s,y+r[1]*s];};
    let legs='';const legDots=[];
    if(legA>0)for(const side of [-1,1])for(let i=0;i<4;i++){
      const l=spiderLeg(side,i,gait,move).map(S);
      for(let j=0;j<5;j++){
        const w=Math.max(.32,LEGW[j]*s*.72),op=j%2?.72:.95;
        legs+=lines([[l[j],l[j+1]]],w,op);
        if(s>.41&&j<4)legDots.push([l[j+1][0],l[j+1][1],Math.max(.42,w*.62),.95*ramp(s,.41,.49)]);
      }
      if(s>.6)for(let j=1;j<4;j++)for(let k=1;k<(j===3?4:6);k++){
        const q=k/6,a=l[j],b=l[j+1],m=[mix(a[0],b[0],q),mix(a[1],b[1],q)];
        const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy)||1,h=H(side*7+i*13+j*17+k);
        const off=(h>.5?1:-1)*(1.1+h)*s,bk=.5*s;
        legs+=lines([[m,[m[0]-dy/len*off+dx/len*bk,m[1]+dx/len*off+dy/len*bk]]],Math.max(.18,.18*s),.5);
      }
      legs+=lines([l.slice(0,3)],Math.max(1,LEGW[0]*s*1.8),.2,true);
    }
    if(legA>0)for(const side of [-1,1]){
      const palp=[[side*3,-20,1],[side*5.2,-24.5,-2.5],[side*5.5,-27,-2],[side*4,-29.5,.5]].map(S);
      legs+=lines([palp],Math.max(.3,.8*s),.8);
    }
    const ab=S([0,12.5,0]),pr=S([0,-12,0]),deg=ang*180/PI;
    let body=`<ellipse cx="${f2(ab[0])}" cy="${f2(ab[1])}" rx="${f2(12.6*s)}" ry="${f2(17.2*s*ct+4*s*st)}" transform="rotate(${f2(deg)} ${f2(ab[0])} ${f2(ab[1])})" fill="#000" opacity="${f3(occl)}"/>`+
      `<ellipse cx="${f2(pr[0])}" cy="${f2(pr[1])}" rx="${f2(6.8*s)}" ry="${f2(9.8*s)}" transform="rotate(${f2(deg)} ${f2(pr[0])} ${f2(pr[1])})" fill="#000" opacity="${f3(occl)}"/>`;
    const dots=[],rs=Math.sqrt(s),step=Math.max(1,Math.round(1/lod));
    const L=[-.36,-.56,-.75];
    for(let i=0;i<SPIDER.pts.length;i+=step){
      const q=SPIDER.pts[i],n=R(q.n);
      if(n[2]>.04)continue;
      const pos=S(q.p),lit=.46+.8*Math.max(0,dot3(n,L)),rim=Math.pow(1+n[2],2.4)*.7;
      dots.push([pos[0],pos[1],(.27+.17*q.b)*rs,cl((lit+rim)*q.b)]);
    }
    for(const e of SPIDER.eyes){const pos=S(e);dots.push([pos[0],pos[1],Math.max(.36,.62*s),1]);}
    const glow=dots.filter((_,i)=>i%3===0);
    const svg=fade(legA,legs+cloud(legDots))+body+`<g filter="url(#un-soft)" opacity=".5">${cloud(glow)}</g>`+cloud(dots);
    return fade(alpha,svg);
  }

  /* ───────────── Мошка: тонкое тело, узкие крылья, длинные ноги ───────────── */
  function drawMidge(o){
    const {x,y,s,ang=0,wing=.5,alpha=1,stuck=0,occl=0,core=0}=o,ca=Math.cos(ang),sa=Math.sin(ang);
    const P=(a,b)=>[x+(a*ca-b*sa)*s,y+(a*sa+b*ca)*s];
    const dots=[],hot=1+.55*core;
    for(const q of fibo(70)){const p=P(1.2+q[0]*3,q[1]*2.5);dots.push([p[0],p[1],(.36+.1*Math.sqrt(s))*hot,cl(.5+.45*(1+q[2])/2+.5*core)]);}
    for(const q of fibo(60)){const p=P(-3.5+q[0]*4.3,.8+q[1]*1.7);dots.push([p[0],p[1],(.33+.08*Math.sqrt(s))*hot,cl(.42+.5*(1+q[2])/2+.45*core)]);}
    for(const q of fibo(34)){const p=P(5.2+q[0]*1.6,-.2+q[1]*1.6);dots.push([p[0],p[1],.34*hot,.9+.1*core]);}
    let s2='';
    const ls=[];
    for(const side of [-1,1])for(let i=0;i<3;i++){
      // Ноги: бедро вверх и наружу, голень вниз, один явный излом.
      const bx=2.4-i*1.7,kick=Math.sin(i*2.1+side)*.42*stuck,dir=(i-1)*.54;
      ls.push([P(bx,side*1.6),P(bx+dir*5.2+.8,side*(4.6+kick)),P(bx+dir*3.2-1.9,side*(8.5+kick*2))]);
    }
    s2+=lines(ls,Math.max(.3+.14*core,.26*s),.8+.2*core);
    s2+=lines([[P(6.4,-.6),P(8.4,-2.6),P(9,-3.6)],[P(6.4,.2),P(8.6,2.2),P(9.2,3)]],Math.max(.2,.24*s),.72);
    for(const side of [-1,1]){
      // Крыло короткое, лопатка за спиной: на брюшко заходит только кончик.
      const a=(.28+.62*wing)*side,dx=-Math.cos(a),dy=Math.sin(a),shape=[];
      for(let i=0;i<=16;i++){const q=i/16*TAU,u=4.6+Math.cos(q)*4.6,v=Math.sin(q)*1.55;shape.push(P(1.4+dx*u-dy*v,side*1.1+dy*u+dx*v));}
      s2+=lines([shape],Math.max(.2,.25*s),.5);
    }
    let occ='';
    if(occl>0){
      const ell=(cx,cy,rx,ry)=>{const o2=[];for(let i=0;i<14;i++){const a=i/14*TAU;o2.push(P(cx+Math.cos(a)*rx,cy+Math.sin(a)*ry));}return blackPoly(o2,occl);};
      occ=ell(1.2,0,3.6,3)+ell(-3.5,.8,4.8,2.1)+ell(5.2,-.2,2,2);
    }
    const dotSvg=core>0?`<g filter="url(#un-soft)" opacity="${f3(.5*core)}">${cloud(dots.filter((_,i)=>i%3===0))}</g>`+cloud(dots):cloud(dots);
    return fade(alpha,s2+occ+dotSvg);
  }

  /* ───────────── Паутина: рамка, радиусы, клеевая спираль с каплями ───────────── */
  const WEB=(()=>{
    const N=27,Nr=[],Rs=[];
    for(let i=0;i<N;i++){
      const a=(i+(H(i*3.1)-.5)*.22)/N*TAU;
      const R=150+13*Math.sin(3*a+.8)+6*Math.sin(5*a+2);
      Nr.push(a);Rs.push(R);
    }
    const spiral=[],drops=[];
    const turns=11,total=turns*N,sub=3;
    for(let i=0;i<total;i++){
      const a0=Nr[i%N],a1=Nr[(i+1)%N]+((i+1)%N===0?TAU:0);
      const R0=Rs[i%N],R1=Rs[(i+1)%N];
      const f0=.93-.70*i/total,f1=.93-.70*(i+1)/total;
      for(let j=0;j<sub;j++){
        const m=j/sub,a=mix(a0,a1,m),ch=1-.02*Math.sin(PI*m);
        const r=mix(R0*f0,R1*f1,m)*ch;
        spiral.push([Math.cos(a)*r,Math.sin(a)*r,i/total]);
      }
      for(let j=0;j<4;j++){
        const m=(j+.2+.6*H(i*7+j))/4,a=mix(a0,a1,m),r=mix(R0*f0,R1*f1,m)*(1-.02*Math.sin(PI*m));
        drops.push([Math.cos(a)*r,Math.sin(a)*r,(i+m)/total,H(i*3.3+j*9.7),H(i*1.9+j*5.1)]);
      }
    }
    const hub=[];
    for(let i=0;i<=120;i++){const q=i/120,a=q*TAU*5,r=4+q*24;hub.push([Math.cos(a)*r,Math.sin(a)*r]);}
    const anchors=[.35,1.3,2.25,3.3,4.2,5.05,5.9].map(a=>{
      const i=Math.round(a/TAU*N)%N;return [Nr[i],Rs[i]];
    });
    return {N,angles:Nr,radii:Rs,spiral,drops,hub,anchors};
  })();
  const MIDGE_AT=[62,64];   // мировая точка удара на плоскости паутины
  function webVib(x,y,tau){
    if(tau<=0)return [0,0];
    const dx=x-MIDGE_AT[0],dy=y-MIDGE_AT[1],d=Math.hypot(dx,dy)||1;
    const front=cl((300*tau-d)/40),amp=4.2*Math.exp(-d/95)*Math.exp(-tau*1.9)*Math.sin(23*tau-d*.11)*front;
    const sag=6.5*Math.exp(-d/34)*sm(tau*5);
    return [dx/d*amp+.25*sag,dy/d*amp*.6+amp*.5+sag];
  }
  /* Паук на постройке идёт спокойно: одна дуга от края к хабу, не быстрее 8 px на кадр. Спираль растёт сама. */
  const WEB_TH0=-2.3,WEB_SWEEP=1.75,WEB_R0=94;
  function webPoint(p){const th=WEB_TH0+WEB_SWEEP*p,r=WEB_R0*(1-p);return [Math.cos(th)*r,Math.sin(th)*r];}
  function webRun(p,build){
    const c=webPoint(p),a=webPoint(Math.max(0,p-.01)),b=webPoint(Math.min(1,p+.01)),len=WEB.spiral.length;
    const tau=cl((build-.46)/.54),count=Math.floor(tau*len);
    return {x:c[0],y:c[1],ang:Math.atan2(b[0]-a[0],-(b[1]-a[1])),count,q:count/len,w:1-ramp(p,.72,1),silk:ramp(p,.02,.12)*(1-ramp(p,.8,1))};
  }
  function webDraw(t,K,cm,build,run){
    const W=WEB,tau=t-(K.g_midge+.2);
    const v=(x,y)=>{const o=webVib(x,y,tau);return cm.proj(x+o[0],y+o[1],0);};
    const radial=[],hub=[],frame=[],anch=[];
    const qR=cl(build/.5);
    for(let i=0;i<W.N;i++){
      const own=cl(qR*(W.N+6)-i,0,6);
      const prog=sm(own/6);if(prog<=0)continue;
      const a=W.angles[(i*11)%W.N],R=W.radii[(i*11)%W.N],p=[];
      for(let j=0;j<=12;j++){const r=R*prog*j/12;p.push(v(Math.cos(a)*r,Math.sin(a)*r));}
      radial.push(p);
    }
    const qF=cl(build/.3);
    if(qF>0){
      const count=Math.floor(qF*W.N*1.001);
      for(let i=0;i<count;i++){
        const j=(i+1)%W.N,a0=W.angles[i],a1=W.angles[j]+(j===0?TAU:0),p=[];
        for(let k=0;k<=4;k++){
          const m=k/4,a=mix(a0,a1,m),r=mix(W.radii[i],W.radii[j],m)*(1-.03*Math.sin(PI*m));
          p.push(v(Math.cos(a)*r,Math.sin(a)*r));
        }
        frame.push(p);
      }
      for(const [a,R] of W.anchors){
        const p=[];for(let k=0;k<=5;k++){const r=mix(R,R+420,k/5*qF);p.push(v(Math.cos(a)*r,Math.sin(a)*r));}
        anch.push(p);
      }
    }
    const qH=cl((build-.2)/.3);
    if(qH>0){const c=Math.floor(W.hub.length*qH);if(c>1)hub.push(W.hub.slice(0,c).map(p=>v(p[0],p[1])));}
    const count=run.count,qS=run.q,spiral=[];
    const sp=[];for(let i=0;i<count;i++)sp.push(v(W.spiral[i][0],W.spiral[i][1]));
    if(sp.length>1)spiral.push(sp);
    let s=lines(anch,.42,.34)+lines(frame,.6,.5)+lines(radial,.52,.5)+lines(hub,.45,.55);
    s+=lines(spiral,.48,.62)+lines(spiral,1.6,.08,true);
    // Волна капель идёт чуть позже попадания и не трогает окрестность мошки: первые 0,2 с главная она.
    const tauW=tau-.2,dots=[],flash=Math.exp(-Math.max(0,tauW)*2.4)*(tauW>0?1:0),rs=Math.sqrt(cm.scale);
    for(const d of W.drops){
      if(d[2]>qS)continue;
      const age=sm((qS-d[2])*18),p=v(d[0],d[1]);
      const tw=Math.pow(Math.max(0,Math.sin(t*1.7+d[3]*TAU)),10);
      const dist=Math.hypot(d[0]-MIDGE_AT[0],d[1]-MIDGE_AT[1]);
      const hit=flash*Math.exp(-Math.pow((dist-tauW*290)/46,2))*1.4*cl((dist-26)/24);
      const r=(.42+.34*d[4]+.5*tw+.62*hit)*rs,o=(.44+.3*d[4]+.5*tw+hit)*age;
      dots.push([p[0],p[1],r,cl(o)]);
    }
    const bright=dots.filter(d=>d[2]>.92*rs);
    s+=`<g filter="url(#un-soft)" opacity=".8">${cloud(bright)}</g>`+cloud(dots);
    return s;
  }

  /* ───────────── Внутри брюшка: тёмная цепочка генов-бусин ───────────── */
  function geneChain(t,K,a){
    if(a<=0)return '';
    const U=UN,know=ramp(t,K.g_knows-.1,K.g_knows+.5);
    const beads=[],thread=[];
    const n=26,gap=29,scroll=t*11;
    // Мутация: бусина, которая в момент tm стоит в центре кадра, меняется навсегда.
    const tm=K.g_mutation+.85,sm0=tm*11,mid=Math.round((220-(sm0%gap))/gap)-Math.floor(sm0/gap);
    const mut=ramp(t,tm-.02,tm+.2),mf=t>tm?Math.exp(-(t-tm)*3.2):0;
    for(let i=0;i<n;i++){
      const id=i-Math.floor(scroll/gap),x=-40+i*gap+(scroll%gap);
      const ph=x*.0135+t*.16;
      const y=205+84*Math.sin(ph)*Math.cos(x*.0041+.7),z=Math.cos(ph*1.7);
      const isMut=id===mid;
      const r=(H(id*.77+60)*2.4+5.6)*(1+.34*z)*(isMut?1+.62*mut+.3*mf:1);
      beads.push({x,y,z,r,seed:H(id*.37+90),mut:isMut?mut:0,mf:isMut?mf:0});
    }
    for(let i=0;i<beads.length-1;i++){
      const a0=beads[i],b0=beads[i+1],m=[];
      for(let j=0;j<=6;j++){const c=j/6;m.push([mix(a0.x,b0.x,c),mix(a0.y,b0.y,c)+Math.sin(c*PI*2+i)*1.5]);}
      thread.push(m);
    }
    let s=lines(thread,.6,.34)+lines(thread,2,.06,true);
    const dust=[];for(let i=0;i<70;i++){const x=(H(i)*420-30+t*(2+H(i+9)*4))%400,y=H(i+70)*360;dust.push([x,y,.35+H(i+20)*.5,.06+H(i+50)*.13]);}
    s+=cloud(dust);
    beads.sort((p,q)=>q.z-p.z);
    for(const b of beads){
      const wave=Math.pow(Math.max(0,Math.sin(b.x*.05-t*2.1+b.seed*4)),6);
      const flick=know*(.12+.55*wave)*(Math.abs(b.x-224)<120?1:.35);
      s+=U.sphere(b.x,b.y,b.r,{opacity:cl(.45+.13*(1-b.z)/2+flick+.3*b.mut+.4*b.mf),glow:.3+flick*.9+.4*b.mut+1.1*b.mf,highlight:flick>.2||b.mut>.5});
    }
    if(know>0){
      const fl=.72+.28*Math.sin(t*5.3)*Math.sin(t*2.7+.8);
      s+=U.italic(238,120,'мошка?',{size:25,anchor:'middle',opacity:know*fl,glow:true});
    }
    return fade(a,s);
  }

  function spiderBody(t,K){
    const t0=K.g2-.05,build=cl((t-t0)/Math.max(.2,K.g_web-t0)),S=.74,walk=sm(cl((t-t0)/Math.max(.4,K.g_web+.16-t0))),run=webRun(walk,build);
    const toMidge=ramp(t,K.g_midge+.05,K.g_midge+.65),inside=ramp(t,K.g_mutation-.03,K.g_mutation+.9);
    const breathe=Math.sin(t*.8)*.01;
    const base=mix(1,1.14,ramp(t,t0,K.g_midge+.3))+breathe;
    const ang0=PI+.12+Math.sin(t*.6)*.015;
    const dAng=(((run.ang-ang0+PI)%TAU)+TAU)%TAU-PI;
    const ang=mix(ang0+dAng*run.w,2.42,toMidge);
    const move=mix(.7,.08,ramp(t,K.g_web-.2,K.g_web+.2))+.55*(ramp(t,K.g_midge+.05,K.g_midge+.2)-ramp(t,K.g_midge+.5,K.g_midge+.7));
    const gait=t*3+8*walk+6*toMidge;
    const ca=Math.cos(ang),sa=Math.sin(ang);
    const body=[-sa*12.5*S,ca*12.5*S];
    const hop=[6*toMidge,6*toMidge];
    const center=[hop[0]+body[0],hop[1]+body[1],-9];
    const zoom=Math.exp(Math.log(11)*Math.pow(inside,1.6));
    const scale=base*zoom;
    const c={f:760,distance:760,yaw:-.17+.02*Math.sin(t*.35),pitch:.09,scale};
    const cm=aimed(c,[mix(0,center[0],sm(inside*1.5)),mix(0,center[1],sm(inside*1.5)),0],180,mix(186,196,inside));
    let s='';
    const webA=1-ramp(inside,.34,.68);
    if(webA>0)s+=fade(webA,webDraw(t,K,cm,build,run));
    const midgeHit=K.g_midge+.2,fly=cl((t-(K.g_midge-.5))/.7);
    const mw=cm.proj(MIDGE_AT[0],MIDGE_AT[1]+5,0);
    if(t>K.g_midge-.5&&webA>0){
      const q=sm(fly),tx=mix(390,mw[0],q)+Math.sin(q*9)*10*(1-q),ty=mix(52,mw[1],q)+Math.sin(q*13+1)*8*(1-q);
      const stuck=ramp(t,midgeHit,midgeHit+.12);
      const shake=stuck*Math.sin((t-midgeHit)*24)*Math.exp(-(t-midgeHit)*2.1)*1.2;
      s+=drawMidge({x:tx+shake,y:ty,s:1.13*base,ang:mix(2.65,2.1,stuck)+shake*.1,wing:stuck?.55+.25*Math.sin(t*19)*Math.exp(-(t-midgeHit)*1.5):.5+.5*Math.sin(t*70),stuck,alpha:webA,occl:1,core:.35+.65*stuck});
    }
    const pos=cm.proj(hop[0]+run.x,hop[1]+run.y,-9);
    if(run.silk>0&&webA>0){
      // Страховочная нить из паутинных бородавок к точке старта: тянется за пауком и не мечется.
      const so=S*pos[3]*Math.cos(.2)*30.1,tip=[pos[0]-sa*so,pos[1]+ca*so],s0=webPoint(0),e=cm.proj(hop[0]+s0[0]*1.5,hop[1]+s0[1]*1.5,0);
      s+=lines([[tip,e]],.5,.8*run.silk)+lines([[tip,e]],1.6,.12*run.silk,true);
    }
    if(inside<.97){
      s+=drawSpider({x:pos[0],y:pos[1],s:S*pos[3]/1,ang,gait,move,tilt:.2,alpha:1-ramp(inside,.78,.97),lod:inside>.5?.7:1,occl:1-ramp(inside,.55,.8),legA:1-ramp(inside,.46,.74)});
      if(inside>.38&&inside<.98){
        // Пролёт внутрь: точки расходятся от центра кадра.
        const st=[],k=ramp(inside,.38,.6)*(1-ramp(inside,.82,.98));
        for(let i=0;i<150;i++){
          const a=H(i*.71)*TAU,r=20+Math.pow((H(i*1.3)+inside*1.8+t*.6)%1,2.2)*300,dr=r*.09;
          st.push([[180+Math.cos(a)*r,196+Math.sin(a)*r],[180+Math.cos(a)*(r+dr),196+Math.sin(a)*(r+dr)]]);
        }
        s+=lines(st,.5,.3*k);
      }
    }
    s+=geneChain(t,K,ramp(inside,.66,1));
    return s;
  }

  /* ───────────── Земля: сетка камней ───────────── */
  const BUMPS=(()=>{const o=[];for(let i=0;i<78;i++){
    const x=H(i+200)*1040-520,z=H(i+230)*960-340,r=(i%4===0?26+H(i+260)*34:9+H(i+260)*17);
    o.push([x,z,r,r*(.2+H(i+290)*.22)]);}return o;})();
  const gh=(x,z)=>{
    const dist=Math.hypot(x,z+6),m=sm((dist-82)/42);
    let h=2.6*Math.sin(x*.023+1)*Math.cos(z*.019)+1.6*Math.sin(x*.057+z*.031+2)+1.1*Math.sin(x*.13-z*.09);
    for(const b of BUMPS){const dx=x-b[0],dz=z-b[1],q=(dx*dx+dz*dz)/(b[2]*b[2]);if(q<4)h+=b[3]*Math.exp(-q*1.7)*(1+.2*Math.sin(dx*.4+dz*.27));}
    return h*(.16+.84*m);
  };
  const GROUND=(()=>{
    const nx=74,nz=44,grid=[];
    for(let j=0;j<nz;j++){const row=[];const q=j/(nz-1),z0=-330+Math.pow(q,1.5)*1180;
      for(let i=0;i<nx;i++){
        const jx=(H(i*3.1+j*7.7)-.5)*7,jz=(H(i*5.3+j*2.9)-.5)*7,x=(i/(nx-1)-.5)*(1120+z0*.9)+jx,z=z0+jz;
        row.push([x,-gh(x,z),z]);}
      grid.push(row);}
    const dots=[];
    for(let i=0;i<2600;i++){
      const z=-300+Math.pow(H(i+.5),1.5)*900,x=(H(i*1.7+40)-.5)*(760+z*.8);
      dots.push([x,-gh(x,z)-.5,z,H(i*2.3+11)]);
    }
    return {grid,dots};
  })();
  const hull=q=>{
    const o=q.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]),cr=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]),lo=[],up=[];
    for(const c of o){while(lo.length>1&&cr(lo[lo.length-2],lo[lo.length-1],c)<=0)lo.pop();lo.push(c);}
    for(const c of o.reverse()){while(up.length>1&&cr(up[up.length-2],up[up.length-1],c)<=0)up.pop();up.push(c);}
    return lo.slice(0,-1).concat(up.slice(0,-1));
  };
  /* Девять отдельных камней вокруг змеи и один в петле: угловатый вытянутый контур, по верху ребро и пара трещин. */
  const STONES=[[-84,-84,14],[-30,-126,19],[56,-132,16],[92,-86,13],[-112,-6,17],[106,-14,15],[-74,92,22],[30,108,20],[118,112,23],[40,-8,9]].map(([x,z,r],i)=>{
    const sd=i*1.7+.3,h=r*(.46+.3*H(i+.6)),y0=-gh(x,z),n=7+i%3,el=1.1+.5*H(i*.9+.2),ca=Math.cos(sd),sa=Math.sin(sd);
    const ang=[...Array(n).keys()].map(a=>(a+.75*(H(a*3.1+i*5.3)-.5))/n*TAU);
    const ring=(rho,y)=>ang.map((an,a)=>{const k=r*rho*(.7+.55*H(a*1.9+i*2.7)),u=Math.cos(an)*k*el,v=Math.sin(an)*k*.74;return [x+u*ca-v*sa,y0+y,z+u*sa*.8+v*ca*.8];});
    const base=ring(1,0),mid=ring(.74,-h*.72),top=ring(.34,-h);
    const a0=i%n,a1=(a0+Math.round(n/2))%n;
    const edges=[[mid[a0],top[a0],top[(a0+1)%n],top[a1],mid[a1]],[top[(a0+2)%n],mid[(a0+2)%n],base[(a0+2)%n]],[top[(a1+1)%n],mid[(a1+1)%n]]];
    const dots=[];for(let m=0;m<Math.round(r*2.6);m++){const rq=Math.sqrt(H(m*1.3+i*7)),an=H(m*2.9+i)*TAU,k=r*.82*rq,u=Math.cos(an)*k*el,v=Math.sin(an)*k*.74;dots.push([x+u*ca-v*sa,y0-h*(1-rq*rq)*.86,z+u*sa*.8+v*ca*.8,.08+.3*H(m*.7+i)]);}
    return {z,all:base.concat(mid,top),edges,dots};
  }).sort((p,q)=>q.z-p.z);
  /* Галька: мелкие замкнутые контуры и точки между камнями. */
  const PEBBLES=(()=>{
    const o=[];
    for(let i=0;i<190;i++){
      const z=-210+Math.pow(H(i*1.1+3),1.3)*560,x=(H(i*2.7+8)-.5)*(420+z*.6),r=.8+2.7*Math.pow(H(i*3.3+1),2),sq=.62+.3*H(i*.9),ro=H(i*4.1)*PI,y=-gh(x,z)-.4,l=[];
      for(let a=0;a<=7;a++){const an=a/7*TAU,k=r*(1+.2*Math.sin(an*3+i)),u=Math.cos(an)*k,v=Math.sin(an)*k*sq;l.push([x+u*Math.cos(ro)-v*Math.sin(ro),y,z+u*Math.sin(ro)+v*Math.cos(ro)]);}
      o.push(l);
    }
    return o;
  })();
  function stonesDraw(cm){
    let s=lines(PEBBLES.map(l=>l.map(p=>cm.proj(p[0],p[1],p[2]))),.34,.34);
    for(const b of STONES){
      const q=hull(b.all.map(p=>{const v=cm.proj(p[0],p[1],p[2]);return [v[0],v[1]];}));
      // Камни — фон: заливка только приглушает сетку, обводка на уровне сетки и тише любой чешуи змеи.
      s+=blackPoly(q,.62)+lines([q.concat([q[0]])],.38,.17);
      s+=lines(b.edges.map(l=>l.map(p=>cm.proj(p[0],p[1],p[2]))),.3,.1);
      s+=cloud(b.dots.map(d=>{const v=cm.proj(d[0],d[1],d[2]);return [v[0],v[1],.42,d[3]];}));
    }
    return s;
  }
  function groundDraw(cm,a){
    if(a<=.01)return '';
    const G=GROUND,band=[[],[],[]];
    const pick=z=>z<70?0:z<300?1:2;
    const P=G.grid.map(r=>r.map(p=>cm.proj(p[0],p[1],p[2])));
    for(let j=0;j<P.length;j++)band[pick(G.grid[j][0][2])].push(P[j]);
    const nb=[Math.round(P.length*.45),Math.round(P.length*.72)];
    for(let i=0;i<P[0].length;i++)for(const [b,from,to] of [[0,0,nb[0]+1],[1,nb[0],nb[1]+1],[2,nb[1],P.length]]){
      const l=[];for(let j=from;j<to&&j<P.length;j++)l.push(P[j][i]);
      band[b].push(l);
    }
    const dots=[];
    for(const d of G.dots){const p=cm.proj(d[0],d[1],d[2]);
      const near=cl(1.08-p[2]/640);dots.push([p[0],p[1],(.32+.2*d[3])*Math.min(1.5,Math.pow(p[3],.45)),(.17+.2*d[3])*near]);}
    return fade(a,lines(band[0],.38,.16)+lines(band[1],.34,.12)+lines(band[2],.3,.08)+cloud(dots)+stonesDraw(cm));
  }

  /* ───────────── Гадюка: трубка с чешуйчатой решёткой точек, голова, рожки, приманка ───────────── */
  const LUT={w:[[0,4.2],[.03,6.2],[.1,7.8],[.22,9.6],[.4,11.6],[.56,13],[.66,13.2],[.76,10],[.88,6.2],[1,4.9]],
    h:[[0,2.9],[.06,4.2],[.2,5.8],[.42,7.5],[.62,8.4],[.8,7.3],[1,5]]};
  const lut=(tb,x)=>{for(let i=1;i<tb.length;i++)if(x<=tb[i][0]){const q=(x-tb[i-1][0])/(tb[i][0]-tb[i-1][0]);return mix(tb[i-1][1],tb[i][1],sm(q));}return tb[tb.length-1][1];};
  const HEADU=.094,JAWV=.62,HEADL=27;
  const HORN_S=[[-2,-.3,.5,-.12,.72,.72],[1.3,.2,-.3,.2,.64,.78],[-.9,.1,.22,-.02,1.06,.68],[.3,.42,-.06,.12,.9,.74]];   // чешуи рога: сдвиг, вбок, наклон, веер, длина, ширина
  const TIP0=[26,-61,-52],HEADP=[6,0,-74],HEADD=(a=>[Math.cos(a),0,Math.sin(a)])(-.42),TAILR=[26,-3,-58],LIFTU=.82,LIFTA=.72,STRIKEU=.24;
  const TAILE=[24,15,2];   // вектор от кончика назад вдоль хвоста: приманка лежит почти поперёк пути птицы
  /* Тело толстое и короткое: тонкая шея, плавный рост к середине, резкое сужение к кончику хвоста. */
  const bodyR=u=>{
    if(u<.12)return 4.9;
    if(u<.4)return mix(4.9,9.6,sm((u-.12)/.28));
    if(u<.56)return 9.6;
    return mix(9.6,1.7,sm((u-.56)/.43));
  };
  /* План тела на земле: неровная петля с изгибами, равномерная по длине. */
  const PLAN=(()=>{
    const P=[[-44,-48],[-55,-26],[-56,2],[-41,25],[-14,27],[13,43],[42,39],[58,12],[56,-18],[47,-39],[36,-48]];
    const raw=[];
    for(let i=0;i<P.length-1;i++){
      const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];
      for(let j=0;j<24;j++){const q=j/24,q2=q*q,q3=q2*q;raw.push([0,1].map(k=>.5*(2*p1[k]+(p2[k]-p0[k])*q+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*q2+(3*p1[k]-p0[k]-3*p2[k]+p3[k])*q3)));}
    }
    raw.push(P[P.length-1]);
    const len=[0];for(let i=1;i<raw.length;i++)len.push(len[i-1]+Math.hypot(raw[i][0]-raw[i-1][0],raw[i][1]-raw[i-1][1]));
    const N=320,o=[],T=len[len.length-1];
    for(let i=0,j=0;i<=N;i++){
      const d=T*i/N;while(j<len.length-2&&len[j+1]<d)j++;
      const q=(d-len[j])/Math.max(1e-6,len[j+1]-len[j]);o.push([mix(raw[j][0],raw[j+1][0],q),mix(raw[j][1],raw[j+1][1],q)]);
    }
    return o;
  })();
  const ringAt=u=>{
    const x=cl((u-.2)/(LIFTU+.06-.2))*(PLAN.length-1),i=Math.min(PLAN.length-2,Math.floor(x)),q=x-i;
    return [mix(PLAN[i][0],PLAN[i+1][0],q),0,mix(PLAN[i][1],PLAN[i+1][1],q)];
  };
  function cpos(u,P){
    let c=ringAt(u);
    const rest=u<HEADU?mix(5.6,4.8,u/HEADU):bodyR(u);
    if(u<.24){
      // Голова лежит мордой к зрителю и вправо, шея выходит из петли за скулой.
      const r=ringAt(.24),r0=ringAt(.23),r1=ringAt(.25),tl=Math.hypot(r1[0]-r0[0],r1[2]-r0[2])||1,h1=add(HEADP,HEADD,-HEADL);
      c=u<HEADU?add(HEADP,HEADD,-HEADL*u/HEADU):bez(h1,add(h1,HEADD,-22),[r[0]-(r1[0]-r0[0])/tl*16,0,r[2]-(r1[2]-r0[2])/tl*16],r,(u-HEADU)/(.24-HEADU));
    }
    c[1]=-rest*.86-6*(1-sm(u/.3));
    if(u>LIFTU){
      // В покое хвост сходит с петли по касательной, короткий: кончик лежит рядом с мордой.
      const q=(u-LIFTU)/(1-LIFTU),b0=ringAt(LIFTU),b1=ringAt(LIFTU+.012);b0[1]=-bodyR(LIFTU)*.86;
      const tl=nrm(b1[0]-b0[0],0,b1[2]-b0[2]);
      c=bez(b0,add(b0,tl,9),[TAILR[0]+9,-3,TAILR[2]-3],TAILR,q);
    }
    if(u>LIFTA&&P.lift>0){
      // Поднятый хвост: одна дуга большого радиуса от правого бока петли, без шпильки и прямой палки.
      const q=(u-LIFTA)/(1-LIFTA),b0=ringAt(LIFTA),b1=ringAt(LIFTA+.012);b0[1]=-bodyR(LIFTA)*.86;
      const tl=nrm(b1[0]-b0[0],0,b1[2]-b0[2]);
      c=vmix(c,bez(b0,add(add(b0,tl,27),[0,-9,0]),add(P.tip,TAILE),P.tip,q),P.lift);
    }
    if(P.strike&&P.strike.q>0&&u<STRIKEU){
      // Бросок: шея идёт своей дугой от петли к точке удара, морда смотрит по ходу удара.
      const k=P.strike,h1=add(k.tip,k.dir,-HEADL);
      const e=u<HEADU?add(k.tip,k.dir,-HEADL*u/HEADU):bez(h1,add(h1,k.dir,-k.l1),add(k.N,k.NT,-k.l2),k.N,(u-HEADU)/(STRIKEU-HEADU));
      c=vmix(c,e,k.q);
    }
    return c;
  }
  function snakeRings(P,step=.0054,stepH=.0013){
    const us=[];
    for(let u=0;u<HEADU;u+=stepH)us.push(u);
    for(let u=HEADU;u<.87;u+=mix(stepH,step,cl((u-HEADU)/.05)))us.push(u);
    for(let u=.87;u<=.9875;u+=step*.36)us.push(u);
    const rings=[];let B=null;
    const e=.002;
    for(const u of us){
      const C=cpos(u,P),T=(()=>{const a=cpos(Math.max(0,u-e),P),b=cpos(u+e,P);return nrm(b[0]-a[0],b[1]-a[1],b[2]-a[2]);})();
      if(!B){B=nrm(...cross(T,[0,-1,0]));}
      const dT=dot3(B,T);B=nrm(B[0]-T[0]*dT,B[1]-T[1]*dT,B[2]-T[2]*dT);
      const Up=cross(B,T);
      let w,h;
      if(u<HEADU){const v=u/HEADU;w=lut(LUT.w,v);h=lut(LUT.h,v);}else{w=bodyR(u);h=w*(u<.2?1:.94);}
      rings.push({u,C,T,B,Up,w,h});
    }
    return rings;
  }
  const LIGHTW=nrm(-.42,-.8,-.42),GAPE=15;
  function snakePattern(u,psi,seed){
    if(u<HEADU){
      const v=u/HEADU,a=Math.abs(psi);
      const stripe=(a>.74+.3*v&&a<1.2+.3*v&&v>.42)?.24:1;
      const brow=(Math.abs(a-.86)<.15&&v>.1&&v<.52)?1.5:1;
      const cap=(a<.42&&v>.5&&Math.sin(v*17)>.1)?.42:1;
      return stripe*brow*cap*(.66+.34*seed);
      
    }
    const w=u*50+1.7*Math.sin(u*11+.7)+.9*Math.sin(u*29+2.1);
    const idx=Math.floor((w+PI/2)/TAU),th=-.42+.86*H(idx*3.7+5);
    const rag=.5*(seed-.5)+.2*Math.sin(psi*9+idx*2.3)+.13*Math.sin(u*230+psi*4);
    const sad=Math.sin(w+Math.sin(psi*1.6)*.7+.5*Math.sin(idx*1.9))+rag;
    const a=Math.abs(psi);
    let b=1;
    if(sad>th&&a<1.1)b=.14;                    // тёмные седла разной ширины
    if(sad>th-.3&&sad<=th&&a<1.16)b=1.5;     // рваная светлая кайма
    if(a>=1.1&&Math.sin(w*.8+1.9)+.4*(seed-.5)>.55)b=.34;    // боковые пятна
    if(u<.25)b=mix(Math.max(b,.86-.3*Math.sin(u*90)**2),b,sm((u-.13)/.12));   // шея светлее седел: перехват за головой читается
    if(a>2.25)b=.7;                           // брюхо ровное, видно на поднятой шее
    const ring=(u>.8&&u<.97)?(Math.sin(u*190)>.15?.62:1.2):1;
    return b*ring*(.54+.46*seed);
  }
  function snakeDraw(t,cm,P,o={}){
    const vis=o.vis??1,neck=o.neck??1,lod=o.lod??1,head=o.head??1,gape=o.gape??0;
    const rings=snakeRings(P,lod<1?.0054/lod:.0054,lod<1?.0013/lod:.0013);
    const spacing=1.95/Math.max(.5,lod),rPow=Math.min(1.6,Math.pow(cm.scale,.5));
    const CH=lod<1?4:12,chunks=[];
    for(let i=0;i<rings.length;i++){
      const r=rings[i],isHead=r.u<HEADU;
      const cn=Math.floor(i/CH);
      const ch=chunks[cn]||(chunks[cn]={z:0,n:0,dots:[],L:[],R:[],head:r.u<.16,tail:r.u>.78,lifted:(P.lift??0)>.3&&r.u>LIFTA+.02,headOnly:isHead});
      const fadeNeck=r.u>.76?mix(1,neck,sm((r.u-.76)/.1)):1;
      const nk=isHead?0:cl((r.u-HEADU)/.05),span=PI,n=Math.max(9,Math.round((r.w+r.h)*.5*span*2/mix(.82/Math.max(.5,lod),spacing,nk)));
      const cc=cm.proj(r.C[0],r.C[1],r.C[2]),nb=rings[Math.min(rings.length-1,i+1)],pb=rings[Math.max(0,i-1)];
      const c1=cm.proj(nb.C[0],nb.C[1],nb.C[2]),c0=cm.proj(pb.C[0],pb.C[1],pb.C[2]);
      const dx=c1[0]-c0[0],dy=c1[1]-c0[1],dl=Math.hypot(dx,dy)||1,rw=Math.max(r.w,r.h)*cc[3];
      const hw=isHead?Math.min(r.h*1.2,r.w)*cc[3]:rw;
      const pr=[cc[0]-dy/dl*hw,cc[1]+dx/dl*hw],pl=[cc[0]+dy/dl*hw,cc[1]-dx/dl*hw];
      ch.L.push(pr);ch.R.push(pl);ch.z+=cc[2];ch.n++;ch.umax=r.u;
      if(i%CH===0&&i>0){const pc=chunks[cn-1];if(pc){pc.L.push(pr);pc.R.push(pl);}}
      if(fadeNeck<=.01)continue;
      for(let j=0;j<=n;j++){
        const psi=-span+2*span*(j+(i%2?.5:0))/n;
        const cp=Math.cos(psi),sp=Math.sin(psi);
        const fl=isHead?Math.sign(cp)*Math.pow(Math.abs(cp),.62):cp;
        const nv=[r.Up[0]*cp+r.B[0]*sp,r.Up[1]*cp+r.B[1]*sp,r.Up[2]*cp+r.B[2]*sp];
        const nview=cm.rot(nv[0],nv[1],nv[2]);
        if(nview[2]>.08)continue;
        let x=r.C[0]+r.Up[0]*r.h*fl+r.B[0]*r.w*sp,y=r.C[1]+r.Up[1]*r.h*fl+r.B[1]*r.w*sp,z=r.C[2]+r.Up[2]*r.h*fl+r.B[2]*r.w*sp;
        if(isHead&&gape>0){
          // Раскрытие: нижняя челюсть отходит вниз от шарнира, верхняя чуть поднимается.
          const v=r.u/HEADU,hk=cl((JAWV+.1-v)/(JAWV+.1)),d=Math.abs(psi)>1.5?-gape*GAPE*hk:gape*GAPE*.22*hk;
          x+=r.Up[0]*d;y+=r.Up[1]*d;z+=r.Up[2]*d;
        }
        const p=cm.proj(x,y,z);
        const seed=H(i*3.17+j*7.31);
        const pat=snakePattern(r.u,psi,seed);
        const lit=.36+.96*Math.max(0,dot3(nv,LIGHTW)),rim=Math.pow(1+nview[2],2.2)*.6;
        const keel=(j%2===0)?1:.74;
        ch.dots.push([p[0],p[1],mix(.25,.36+.14*seed,nk)*rPow,cl((lit+rim)*pat*keel*1.3)*vis*fadeNeck*head]);
      }
    }
    chunks.forEach(c=>{c.z/=Math.max(1,c.n);});
    const order=chunks.filter(c=>c).sort((a,b)=>(a.head===b.head)?b.z-a.z:(a.head?1:-1));
    const hr=rings.filter(r=>r.u<HEADU+.014);
    const at=v=>hr[Math.min(hr.length-1,Math.round(v*(hr.length-1)*HEADU/(HEADU+.014)))];
    // Рог над глазом и чуть за ним: пучок из четырёх тонких чешуй, кончики разной длины расходятся. Контура нет.
    const HORNV=.3,HORNB=.42,hornR=at(HORNB),hHead=Math.max(...hr.map(r=>r.h))*2;
    const horns=[-1,1].map(side=>{
      const rr=hornR,s0=.5,cp=Math.cos(s0),base0=add(add(rr.C,rr.B,side*rr.w*Math.sin(s0)),rr.Up,rr.h*Math.pow(cp,.62)-.7);
      const D0=[rr.Up[0]+rr.B[0]*side*.24+rr.T[0]*.16,rr.Up[1]+rr.B[1]*side*.24+rr.T[1]*.16,rr.Up[2]+rr.B[2]*side*.24+rr.T[2]*.16];
      const leaves=HORN_S.map(([off,lat,lean,splay,len,wid],j)=>{
        const sd=j*2.1+side*1.3,base=add(add(base0,rr.T,off),rr.B,side*lat),L=hHead*.44*len;
        const D=nrm(D0[0]+rr.T[0]*lean+rr.B[0]*side*splay,D0[1]+rr.T[1]*lean+rr.B[1]*side*splay,D0[2]+rr.T[2]*lean+rr.B[2]*side*splay);
        const AX=14,axis=[];for(let k=0;k<=AX;k++){const q=k/AX,w=add(add(base,D,L*q),rr.T,1.2*q*q);axis.push(cm.proj(w[0],w[1],w[2]));}
        const L0=[],R0=[],dots=[];
        axis.forEach((p,k)=>{
          const a=axis[Math.max(0,k-1)],b=axis[Math.min(AX,k+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,q=k/AX;
          const hw=wid*p[3]*(1-Math.pow(q,1.7))*(1+.24*Math.sin(q*11+sd)+.14*Math.sin(q*23+sd*2));
          L0.push([p[0]-dy/l*hw,p[1]+dx/l*hw]);R0.push([p[0]+dy/l*hw*.8,p[1]-dx/l*hw*.8]);
          dots.push([p[0],p[1],.3*rPow,cl(.72+.5*q)]);
          if(k<AX-2)dots.push([p[0]-dy/l*hw*.6,p[1]+dx/l*hw*.6,.25*rPow,.62+.3*q],[p[0]+dy/l*hw*.5,p[1]-dx/l*hw*.5,.25*rPow,.48+.3*q]);
        });
        return {poly:L0.concat(R0.slice().reverse()),dots};
      });
      return {near:cm.rot(rr.B[0]*side,rr.B[1]*side,rr.B[2]*side)[2]<0,leaves};
    });
    const hornSvg=h=>{
      let out='';
      for(const c of h.leaves){
        // Ближний рог лежит поверх головы: полная чёрная заливка читалась провалом. Светлее только оси чешуй, иначе пучок сливается в клин.
        if(o.occl>0)out+=blackPoly(c.poly,o.occl*(h.near?.3:1));
        out+=`<path d="M${c.poly.map(p=>f2(p[0])+' '+f2(p[1])).join('L')}Z" fill="#fff" opacity="${f3(.07*vis*head)}"/>`+cloud(c.dots.map(d=>[d[0],d[1],d[2],(h.near?cl(d[3]*(d[2]>.27*rPow?1.6:.85)):d[3])*vis*head]));
      }
      return out;
    };
    // Контур головы: клин, шире всего у челюстей, с узкой шеей.
    const outL=[],outR=[];
    for(let i=0;i<hr.length;i+=2){
      const r=hr[i],a=hr[Math.max(0,i-2)],b=hr[Math.min(hr.length-1,i+2)];
      const pa=cm.proj(a.C[0],a.C[1],a.C[2]),pb=cm.proj(b.C[0],b.C[1],b.C[2]),c=cm.proj(r.C[0],r.C[1],r.C[2]);
      const dx=pb[0]-pa[0],dy=pb[1]-pa[1],dl=Math.hypot(dx,dy)||1,nx=-dy/dl,ny=dx/dl;
      let mx=-1e9,mn=1e9,pmx=null,pmn=null;
      const v=r.u/HEADU,lift=gape*GAPE*.22*cl((JAWV+.1-v)/(JAWV+.1));
      for(let k=0;k<24;k++){
        // Пока пасть открыта, силуэт идёт по верхней челюсти: чёрное не заливает просвет между челюстями.
        const psi=k/24*TAU,cp=Math.cos(psi),sp=Math.sin(psi),fl=Math.sign(cp)*Math.pow(Math.abs(cp),.62);
        if(gape>.02&&cp<.07)continue;
        const q=add(add(r.C,r.Up,r.h*fl+lift),r.B,r.w*sp),pj=cm.proj(q[0],q[1],q[2]),d=(pj[0]-c[0])*nx+(pj[1]-c[1])*ny;
        if(d>mx){mx=d;pmx=pj;}if(d<mn){mn=d;pmn=pj;}
      }
      outL.push([pmx[0],pmx[1]]);outR.push([pmn[0],pmn[1]]);
    }
    const headPoly=outL.concat(outR.slice().reverse());
    let s='',bodyGlow=[],headDone=false;
    for(const c of order){
      if(c.headOnly&&!headDone){
        headDone=true;
        for(const h of horns)if(!h.near)s+=hornSvg(h);
        if(o.occl>0)s+=blackPoly(headPoly,o.occl);
        s+=lines([outL,outR,[outL[0],outR[0]]],.34*rPow,.62*vis*head*(o.occl>0?1:.6));
      }
      if(o.occl>0&&(!c.headOnly||c.umax>HEADU)&&c.L.length>1&&(c.L[0])){
        const poly=c.L.concat(c.R.slice().reverse());
        s+=c.lifted?`<path d="M${poly.map(p=>f2(p[0])+' '+f2(p[1])).join('L')}Z" fill="#000" stroke="#000" stroke-width="${f2(3.4*rPow)}" stroke-linejoin="round" opacity="${f3(o.occl)}"/>`:blackPoly(poly,o.occl);
      }
      s+=cloud(c.dots);
      if(o.edge&&!c.headOnly)s+=lines([c.L,c.R],.32*rPow,o.edge*(c.tail?neck:1));
      if(o.glow)for(let i=0;i<c.dots.length;i+=7)if(c.dots[i][3]>.34)bodyGlow.push(c.dots[i]);
    }
    if(o.glow)s+=`<g filter="url(#un-soft)" opacity="${f3(o.glow)}">${cloud(bodyGlow)}</g>`;
    if(lod<1&&!o.detail)return {svg:s,rings};
    // Голова: линия пасти, глаз со щелевым зрачком, ближний рог поверх.
    const jaw=[[],[]],low=[[],[]];
    for(let k=0;k<=30;k++){
      const v=k/30*JAWV,r=at(v),hk=cl((JAWV+.1-v)/(JAWV+.1));
      [-1,1].forEach((side,idx)=>{
        const psi=side*1.5,cp=Math.cos(psi),sp=Math.sin(psi);
        const up=-.26+.46*Math.sin(cl(v/JAWV)*PI*.5)-.3*Math.pow(cl((v-.44)/.18),2);
        const gk=cl(gape*5),q=add(add(r.C,r.Up,r.h*mix(cp+up,Math.max(cp+up,.2),gk)),r.B,r.w*sp),q2=add(add(r.C,r.Up,r.h*mix(cp+up,Math.min(cp+up,-.1),gk)),r.B,r.w*sp);
        const n=cm.rot(r.B[0]*side,r.B[1]*side,r.B[2]*side);
        // У раскрытой пасти линия только на видимой стороне: у дальней стороны нет точек, она висела бы нитью.
        if(n[2]<mix(.25,-.02,cl(gape*4))){
          const u=add(q,r.Up,gape*GAPE*.22*hk),l=add(q2,r.Up,-gape*GAPE*hk);
          jaw[idx].push(cm.proj(u[0],u[1],u[2]));low[idx].push(cm.proj(l[0],l[1],l[2]));
        }
      });
    }
    if(gape>.01)for(let i=0;i<2;i++)if(jaw[i].length===31){
      // Чёрная перепонка только у шарнира: вогнутый край идёт по контуру челюстей, спереди пасть открыта.
      const from=15,up=jaw[i].slice(from),lo=low[i].slice(from),hinge=[(up[up.length-1][0]+lo[lo.length-1][0])/2,(up[up.length-1][1]+lo[lo.length-1][1])/2];
      const mid=[(up[0][0]+lo[0][0])/2,(up[0][1]+lo[0][1])/2],ct=[mix(mid[0],hinge[0],.82),mix(mid[1],hinge[1],.82)],edge=[];
      for(let k=1;k<10;k++){const q=k/10,m=1-q;edge.push([m*m*lo[0][0]+2*m*q*ct[0]+q*q*up[0][0],m*m*lo[0][1]+2*m*q*ct[1]+q*q*up[0][1]]);}
      s+=blackPoly(up.concat(lo.slice().reverse(),edge),.98*vis*head);
      s+=lines([low[i]],.5*rPow,.72*vis*head);
    }
    s+=lines(jaw,.5*rPow,.72*vis*head);
    for(const h of horns)if(h.near)s+=hornSvg(h);
    for(const side of [-1,1]){
      const er=at(HORNV),e0=.98,ec=add(add(er.C,er.B,side*er.w*Math.sin(e0)),er.Up,er.h*Math.pow(Math.cos(e0),.62));
      const en=nrm(er.B[0]*side+er.Up[0]*.7,er.B[1]*side+er.Up[1]*.7,er.B[2]*side+er.Up[2]*.7);
      if(cm.rot(en[0],en[1],en[2])[2]<-.02){
        const c=cm.proj(ec[0],ec[1],ec[2]),r=1.75*c[3];
        const up=[cm.rot(er.Up[0],er.Up[1],er.Up[2])];
        const ang=Math.atan2(up[0][0],-up[0][1])*180/PI;
        const a=vis*head;
        s+=`<circle cx="${f2(c[0])}" cy="${f2(c[1])}" r="${f2(r*1.2)}" fill="#000" opacity="${f3(a)}"/><circle cx="${f2(c[0])}" cy="${f2(c[1])}" r="${f2(r)}" fill="#fff" opacity="${f3(.26*a)}"/><ellipse cx="${f2(c[0])}" cy="${f2(c[1])}" rx="${f2(r*.28)}" ry="${f2(r*.86)}" transform="rotate(${f2(ang)} ${f2(c[0])} ${f2(c[1])})" fill="#000" opacity="${f3(a)}"/><circle cx="${f2(c[0]-r*.34)}" cy="${f2(c[1]-r*.42)}" r="${f2(r*.15)}" fill="#fff" opacity="${f3(a)}"/>`;
      }
    }
    return {svg:s,rings};
  }
  /* Приманка: утолщение из двух частей и восемь длинных чешуй, как ноги паука. */
  const LOBE=[{c:[-3.9,0,0],r:[6,3.5,4.6]},{c:[5.95,-.3,0],r:[3.25,2.5,3]},{c:[2.55,-.15,0],r:[1.3,.62,.8]}];
  const LURE=(()=>{
    const pts=[];
    const lump=(q,k)=>1+.01*Math.sin(q[0]*3+k)*Math.sin(q[1]*2.6+k*.6);
    const inside=(p,e)=>((p[0]-e.c[0])/e.r[0])**2+((p[1]-e.c[1])/e.r[1])**2+((p[2]-e.c[2])/e.r[2])**2<.94;
    [[3900,.4],[2100,1.7],[260,.9]].forEach(([n,k],l)=>{
      const e=LOBE[l];
      for(const q of fibo(n)){
        const a=[q[1],q[2],q[0]],m=lump(a,k),p=[e.c[0]+a[0]*e.r[0]*m,e.c[1]+a[1]*e.r[1]*m,e.c[2]+a[2]*e.r[2]*m],n2=nrm(a[0]/e.r[0],a[1]/e.r[1],a[2]/e.r[2]);
        if(LOBE.some((o,i)=>i!==l&&inside(p,o)))continue;
        let b=.92;
        if(l===0){
          // Рисунок как у брюшка паука: тёмный фолиум, светлые бока, две цепочки пятен.
          const v=a[0],wide=.6*Math.sqrt(Math.max(0,1-v*v))*(1+.3*Math.sin(v*6+.5)),z=Math.abs(a[2]);
          b=z<wide?.62:1.05;
          if(Math.abs(z-wide)<.06)b=1.14;
          const sk=Math.round((v+.72)/.29);
          if(z<wide&&sk>=0&&sk<=5&&Math.hypot(z-.24,(v+.72-sk*.29))<.075)b=1.16;
        }else if(l===1)b=Math.abs(a[2])<.09?.6:.98;
        pts.push({p,n:n2,l,b:b*(.82+.18*H(pts.length*.73))});
      }
    });
    return pts;
  })();
  /* Решётка приманки в состоянии plain: кольца со сдвигом через одно, шаг как у точек хвоста. */
  const LURE_GRID=(()=>{
    const pts=[],STEP=1.5;
    const inside=(p,e)=>((p[0]-e.c[0])/e.r[0])**2+((p[1]-e.c[1])/e.r[1])**2+((p[2]-e.c[2])/e.r[2])**2<.94;
    [0,1].forEach(l=>{
      const e=LOBE[l],nr=Math.round(PI*e.r[0]/STEP);
      for(let i=1;i<nr;i++){
        const th=i/nr*PI,ca=Math.cos(th),sa=Math.sin(th),m=Math.max(5,Math.round(TAU*sa*Math.max(e.r[1],e.r[2])/STEP));
        for(let j=0;j<m;j++){
          const an=(j+(i%2?.5:0))/m*TAU,a=[ca,sa*Math.cos(an),sa*Math.sin(an)];
          const p=[e.c[0]+a[0]*e.r[0],e.c[1]+a[1]*e.r[1],e.c[2]+a[2]*e.r[2]];
          if(!inside(p,LOBE[1-l])&&!inside(p,LOBE[2]))pts.push({p,n:nrm(a[0]/e.r[0],a[1]/e.r[1],a[2]/e.r[2]),l});
        }
      }
    });
    return pts;
  })();
  const SCALES=[{x:8,az:.5,L:18,b:.5},{x:6.9,az:1.05,L:16.5,b:.42},{x:5.3,az:1.95,L:13,b:-.42},{x:3.9,az:2.62,L:16.5,b:-.52}];
  function lureBlades(gait,move,far=0){
    const out=[];
    for(const side of [-1,1])for(let i=0;i<4;i++){
      const s=SCALES[i],ph=(i%2)*PI+(side>0?PI:0);
      const sw=Math.sin(gait+ph)*move,up=Math.max(0,sw);
      const az=s.az+.2*sw,pts=[];
      let x=s.x,y=-.8,z=side*2.3;
      for(let k=0;k<=60;k++){
        const q=k/60,dr=s.L/60;
        const a=az+s.b*(q<.42?1:mix(1,-.5,sm((q-.42)/.14)));
        if(k){x+=Math.cos(a)*dr;z+=side*Math.sin(a)*dr;
          y+=(q<.4?-(.5+.16*up)*(1-q*1.1)*1.05:(q<.56?mix(-.14,1.02,(q-.4)/.16):1.02-.28*q))*.4333*(side===far&&q>.4?.42:1);}
        pts.push({p:[x,y,z],q});
      }
      pts.side=side;pts.i=i;
      out.push(pts);
    }
    return out;
  }
  function lureDraw(t,cm,C,T,Up,o={}){
    // plain: приманка как продолжение хвоста, без белого контура и рисунка брюшка; droop: чешуи свисают.
    const alpha=o.alpha??1,move=o.move??1,tilt=o.tilt??0,plain=o.plain??0,droop=o.droop??0,gait=o.gait??t*14;
    const B0=nrm(...cross(T,Up)),cr=Math.cos(tilt),sr=Math.sin(tilt);
    const U1=[Up[0]*cr+B0[0]*sr,Up[1]*cr+B0[1]*sr,Up[2]*cr+B0[2]*sr];
    const B1=nrm(...cross(T,U1));
    const W=p=>[C[0]+T[0]*p[0]-U1[0]*p[1]+B1[0]*p[2],C[1]+T[1]*p[0]-U1[1]*p[1]+B1[1]*p[2],C[2]+T[2]*p[0]-U1[2]*p[1]+B1[2]*p[2]];
    const Wn=n=>[T[0]*n[0]-U1[0]*n[1]+B1[0]*n[2],T[1]*n[0]-U1[1]*n[1]+B1[1]*n[2],T[2]*n[0]-U1[2]*n[1]+B1[2]*n[2]];
    const vb=cm.rot(B1[0],B1[1],B1[2]);
    const blades=lureBlades(gait,move,vb[2]>0?1:-1);
    let s='';
    const zOf=b=>{const a=W(b[28].p);return cm.proj(a[0],a[1],a[2])[2];};
    const order=blades.map(b=>[zOf(b),b]).sort((a,b)=>b[0]-a[0]);
    const rs=Math.pow(cm.scale,.42);
    for(const [,b] of order){
      const left=[],right=[],keel=[],dt=[],sc0=SCALES[b.i],root=W(b[0].p);
      const az=sc0.az+.5*sc0.b,out0=[T[0]*Math.cos(az)*.9+B1[0]*b.side*Math.sin(az),0,T[2]*Math.cos(az)*.9+B1[2]*b.side*Math.sin(az)];
      for(const pt of b){
        let W0=W(pt.p);
        if(droop>0){
          // Чешуя отходит от утолщения и свисает веером по обе стороны оси хвоста.
          const q=pt.q,hang=sc0.L*.6,sw=Math.sin(gait+b.i*1.7+b.side)*2.2*move*q*q;
          const H0=[root[0]+out0[0]*hang*.7*Math.sin(q*PI*.5)+sw,root[1]+hang*(.06*q+.8*Math.pow(q,1.45)),root[2]+out0[2]*hang*.7*Math.sin(q*PI*.5)];
          W0=vmix(W0,H0,droop);
        }
        const sc=cm.proj(W0[0],W0[1],W0[2]);
        const wd=(pt.q<.08?mix(.36,.68,pt.q/.08):mix(.68,.06,Math.pow((pt.q-.08)/.92,1.5)))*sc[3];
        keel.push({x:sc[0],y:sc[1],w:wd});
      }
      for(let i=0;i<keel.length;i++){
        const a=keel[Math.max(0,i-1)],c=keel[Math.min(keel.length-1,i+1)];
        const dx=c.x-a.x,dy=c.y-a.y,l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,k=keel[i];
        left.push([k.x+nx*k.w,k.y+ny*k.w]);right.push([k.x-nx*k.w,k.y-ny*k.w]);
        if(cm.scale>3||i%3===0){
          const count=Math.max(1,Math.round(k.w/(1.05*rs)));
          for(let j=-count;j<=count;j++){
            const off=(j+(i%2?.5:0))/(count+.6)*k.w;
            dt.push([k.x+nx*off,k.y+ny*off,.25*rs,cl((.5+.5*Math.cos(j/count*1.5))*(.6+.4*H(i*3.1+j*9)))]);
          }
        }
      }
      s+=blackPoly(left.concat(right.slice().reverse()),.96);
      s+=cloud(dt);
      s+=lines([left,right.slice().reverse()],Math.max(.2,.07*rs),mix(.55,.4,plain));
      s+=lines([keel.map(k=>[k.x,k.y])],Math.max(.3,.12*rs),mix(.8,.74,plain));
    }
    // Плотность растёт с приближением плавно: вдали каждая третья точка, вблизи все.
    const groups=[[],[],[]],fine=ramp(cm.scale,2.6,5),rq=Math.sqrt(cm.scale);
    for(let i=0;i<LURE.length;i++){
      const dens=(i%3?fine:1)*(1-plain);
      if(dens<=0)continue;
      const q=LURE[i],n=cm.rot(...Wn(q.n));
      if(n[2]>.05)continue;
      const w=W(q.p),p=cm.proj(w[0],w[1],w[2]),nw=Wn(q.n);
      const lit=.66+.9*Math.max(0,dot3(nw,LIGHTW)),rim=Math.pow(1+n[2],2.4)*.62;
      groups[q.l].push([p[0],p[1],(.2+.12*q.b)*rq,cl((lit+rim)*q.b)*dens]);
    }
    // plain: приманка как продолжение хвоста, та же решётка, контур на половинном уровне.
    if(plain>0)for(const q of LURE_GRID){
      const n=cm.rot(...Wn(q.n));
      if(n[2]>.05)continue;
      const w=W(q.p),p=cm.proj(w[0],w[1],w[2]),nw=Wn(q.n);
      const lit=.66+.9*Math.max(0,dot3(nw,LIGHTW)),rim=Math.pow(1+n[2],2.4)*.31;
      groups[q.l].push([p[0],p[1],.36*Math.min(1.6,rq),cl((.3+.72*lit)*cl(-n[2]*1.8)+rim)*plain]);
    }
    const parts=[0,1].map(l=>{const c=W(LOBE[l].c),p=cm.proj(c[0],c[1],c[2]);return {l,p};}).sort((a,b)=>b.p[2]-a.p[2]);
    const ang=Math.atan2(parts[1].p[1]-parts[0].p[1],parts[1].p[0]-parts[0].p[0])*180/PI;
    // o.fit: линза зрачка сжимает модель сильнее, чем говорит масштаб точки, и овал накрывал соседнюю долю. Заслон — по самим точкам.
    const occ=(l,pp)=>o.fit?(groups[l].length>2?blackPoly(hull(groups[l]),1):''):`<ellipse cx="${f2(pp[0])}" cy="${f2(pp[1])}" rx="${f2(LOBE[l].r[0]*.98*pp[3])}" ry="${f2(Math.max(LOBE[l].r[1],LOBE[l].r[2]*.86)*pp[3])}" transform="rotate(${f2(ang)} ${f2(pp[0])} ${f2(pp[1])})" fill="#000"/>`;
    const draw=g=>(plain<.98?`<g filter="url(#un-soft)" opacity="${f3(.4*(1-plain))}">${cloud(g.filter((_,i)=>i%4===0))}</g>`:'')+cloud(g);
    s+=occ(parts[0].l,parts[0].p)+draw(groups[parts[0].l])+cloud(groups[2])+occ(parts[1].l,parts[1].p)+draw(groups[parts[1].l]);
    return fade(alpha,s);
  }

  /* ───────────── Славка: круглая голова, тонкий клюв, сомкнутые маховые, кроющие, хвост от надхвостья ───────────── */
  const BIRD=(()=>{
    const parts=[{c:[0,-.5,0],r:[26,12,12],n:1250},{c:[12,-2,0],r:[15,11,11],n:520},{c:[20,4.5,0],r:[11,8.6,8.4],n:320},{c:[29,8,0],r:[9.4,9,8.8],n:620},{c:[-20,1.4,0],r:[13.5,5.4,6.4],n:300}];
    const inside=(p,skip)=>parts.some((b,i)=>i!==skip&&((p[0]-b.c[0])/b.r[0])**2+((p[1]-b.c[1])/b.r[1])**2+((p[2]-b.c[2])/b.r[2])**2<.92);
    const pts=[];
    parts.forEach((b,idx)=>{
      for(const q of fibo(b.n)){
        const p=[b.c[0]+q[0]*b.r[0],b.c[1]+q[1]*b.r[1],b.c[2]+q[2]*b.r[2]];
        if(inside(p,idx))continue;
        const n=nrm(q[0]/b.r[0],q[1]/b.r[1],q[2]/b.r[2]);
        const belly=cl((.2-n[1])*1.4),cap=(p[0]>21&&p[1]>12.4)?.72:1;
        const brow=(p[0]>23&&p[0]<37&&Math.abs(p[1]-11.2)<1.05)?1.3:1;
        pts.push({p,n,b:mix(.86,1.24,belly)*cap*brow*(.78+.22*H(pts.length*.53))});
      }
    });
    return pts;
  })();
  const BEAK=[46.5,7.2,.3];
  /* Клюв птицы на экране: откуда она влетает и где стоит высоко над приманкой. Пике: разгон, полёт, короткое торможение. */
  const BIRD_IN=[334,-40],BIRD_HI=[297,72];
  const DIVE=(()=>{const n=64,o=[0];let c=0;for(let i=0;i<n;i++){const q=(i+.5)/n;c+=sm(q/.55)*(1-ramp(q,.76,1));o.push(c);}return o.map(v=>v/c);})();
  const diveAt=q=>{const x=cl(q)*(DIVE.length-1),i=Math.min(DIVE.length-2,Math.floor(x));return mix(DIVE[i],DIVE[i+1],x-i);};
  function drawBird(o){
    const {x,y,s,pitch=0,yaw=.2,flap=0,fold=0,alpha=1,burst=0,lod=1,mirror=false}=o;
    const cp=Math.cos(pitch),sp=Math.sin(pitch),cy=Math.cos(yaw),sy=Math.sin(yaw);
    // Модель: x вперёд, y вверх, z к зрителю. Поворот: рысканье, затем тангаж.
    const R=p=>{const x1=p[0]*cy-p[2]*sy,z1=p[0]*sy+p[2]*cy;return [x1*cp-p[1]*sp,x1*sp+p[1]*cp,z1];};
    const S=p=>{const r=R(p);return [x+r[0]*s,y-r[1]*s,r[2]];};
    const sw=Math.max(.2,.24*Math.sqrt(s));
    // Ряд перьев без просветов: граница с соседом идёт посередине, расходятся только самые концы.
    const row=(F,tone,op)=>{
      let out='';
      for(let i=F.length-1;i>=0;i--){
        const f=F[i],a=F[Math.max(0,i-1)],b=F[Math.min(F.length-1,i+1)];
        const r0=vmix(f.root,a.root,.5),r1=vmix(f.root,b.root,.5),e0=vmix(vmix(f.tip,a.tip,.5),r0,.1),e1=vmix(vmix(f.tip,b.tip,.5),r1,.1);
        const P=[r0,e0,f.tip,e1,r1].map(S),n=[(P[1][0]+P[3][0])/2,(P[1][1]+P[3][1])/2];
        const d=`M${f2(P[0][0])} ${f2(P[0][1])}L${f2(P[1][0])} ${f2(P[1][1])}Q${f2((P[1][0]+P[2][0])/2+(P[1][0]-n[0])*.3)} ${f2((P[1][1]+P[2][1])/2+(P[1][1]-n[1])*.3)} ${f2(P[2][0])} ${f2(P[2][1])}Q${f2((P[3][0]+P[2][0])/2+(P[3][0]-n[0])*.3)} ${f2((P[3][1]+P[2][1])/2+(P[3][1]-n[1])*.3)} ${f2(P[3][0])} ${f2(P[3][1])}L${f2(P[4][0])} ${f2(P[4][1])}Z`;
        out+=`<path d="${d}" fill="${tone}" stroke="#fff" stroke-width="${f2(sw)}" stroke-opacity="${op}" stroke-linejoin="round"/>`;
      }
      return out;
    };
    let back='',front='';
    for(const side of [-1,1]){
      const near=side>0,ca=Math.cos(flap),sa=Math.sin(flap);
      const span=[-.28,sa,side*ca],chord=[-1,0,0],sh=[11,8.8,side*9.5],arm=mix(31,6,fold);
      const fan=q=>mix(0,1.15,Math.pow(q,1.5))*(1-fold*.88);
      const dirAt=(q,f)=>{const a=fan(q);return nrm(chord[0]*Math.cos(a)+span[0]*Math.sin(a),chord[1]*Math.cos(a)+span[1]*Math.sin(a)-.05,chord[2]*Math.cos(a)+span[2]*Math.sin(a));};
      const rootAt=q=>add(sh,span,arm*Math.pow(q,.9));
      const prim=[],cov=[],les=[];
      for(let i=0;i<10;i++){
        const q=i/9,len=mix(28,38,Math.pow(q,.8))*(i>7?mix(1,.88,(i-7)/2):1),r=rootAt(q),d=dirAt(q);
        prim.push({root:r,tip:add(r,d,len)});cov.push({root:add(r,[1.2,.5,0]),tip:add(r,d,len*.48)});les.push({root:add(r,[2.4,.8,0]),tip:add(r,d,len*.24)});
      }
      const svg=row(prim,near?'#242424':'#141414',near?.62:.42)+row(cov,near?'#3c3c3c':'#1e1e1e',near?.56:.34)+row(les,near?'#585858':'#262626',near?.42:.26);
      if(near)front+=svg;else back+=svg;
    }
    const tailF=[];
    for(let i=0;i<7;i++){const q=(i-3)/3;tailF.push({root:[-23,1.2+q*3.2,q*5],tip:[-66+Math.abs(q)*3.5,-1.4+q*7,q*8.5]});}
    const tail=row(tailF,'#2c2c2c',.5);
    const dots=[],rs=Math.sqrt(s),L=[-.3,.72,.62],step=Math.max(1,Math.round(1/lod));
    for(let i=0;i<BIRD.length;i+=step){
      const q=BIRD[i],n=R(q.n);if(n[2]<-.05)continue;
      const c=S(q.p),lit=.54+.62*Math.max(0,dot3(n,L)),rim=Math.pow(1-n[2],2.4)*.42;
      let px=c[0],py=c[1];
      if(burst>0){const a=H(i*.77)*TAU,d=burst*(20+H(i*1.1)*48)*s;px+=Math.cos(a)*d;py+=Math.sin(a)*d+burst*burst*22;}
      dots.push([px,py,(.46+.2*q.b)*rs*Math.sqrt(step)*.86,cl((lit+rim)*q.b)]);
    }
    const bill=[S([37.2,8.6,1]),S(BEAK),S([37.2,6,1])];
    const occ=[];
    for(let i=0;i<34;i++){const a=i/34*TAU;occ.push(S([-1+Math.cos(a)*25,Math.sin(a)*12.8-.6,0]));}
    const occH=[];for(let i=0;i<24;i++){const a=i/24*TAU;occH.push(S([29+Math.cos(a)*9,8+Math.sin(a)*8.6,0]));}
    const eye=S([33.4,9.8,7.2]),er=Math.max(.62,1.9*s);
    let head=`<path d="M${f2(bill[0][0])} ${f2(bill[0][1])}L${f2(bill[1][0])} ${f2(bill[1][1])}L${f2(bill[2][0])} ${f2(bill[2][1])}Z" fill="#fff" opacity=".72"/>`;
    head+=`<circle cx="${f2(eye[0])}" cy="${f2(eye[1])}" r="${f2(er*1.32)}" fill="#fff" opacity=".42"/><circle cx="${f2(eye[0])}" cy="${f2(eye[1])}" r="${f2(er)}" fill="#000"/><circle cx="${f2(eye[0]-er*.3)}" cy="${f2(eye[1]-er*.3)}" r="${f2(er*.24)}" fill="#fff"/>`;
    const glow=dots.filter((_,i)=>i%4===0);
    const bodySvg=burst>0?cloud(dots):blackPoly(occ,.92)+blackPoly(occH,.92)+`<g filter="url(#un-soft)" opacity=".36">${cloud(glow)}</g>`+cloud(dots)+head;
    const svg=(burst>0?'':back+tail)+bodySvg+(burst>0?'':front);
    return fade(alpha*(1-burst),mirror?`<g transform="translate(${f2(2*x)} 0) scale(-1 1)">${svg}</g>`:svg);
  }

  /* Круг-зрачок птицы с отражением хвоста. */
  function birdEye(t,K,a){
    if(a<=0)return '';
    const U=UN,cx=180+Math.sin(t*.7)*1.6,cy=194+Math.cos(t*.53)*1.2,R=124,pup=R*(.585+.018*Math.sin(t*.9));
    let s='';
    const fea=[];
    for(let i=0;i<300;i++){
      const an=H(i*.9)*TAU,r=R*(1.05+.72*Math.pow(H(i*1.7),.8)),l=7+H(i*2.3)*13;
      const sweep=an+.5;
      fea.push([[cx+Math.cos(an)*r,cy+Math.sin(an)*r],[cx+Math.cos(an)*r+Math.cos(sweep)*l,cy+Math.sin(an)*r+Math.sin(sweep)*l]]);
    }
    s+=lines(fea,.5,.3);
    const ring=rr=>{const o=[];for(let i=0;i<=72;i++){const q=i/72*TAU;o.push([cx+Math.cos(q)*rr,cy+Math.sin(q)*rr]);}return o;};
    s+=lines([ring(R*1.015)],1,.75)+lines([ring(R*1.015)],3.2,.25,true)+lines([ring(R*.965)],.45,.4);
    const fib=[];
    for(let i=0;i<170;i++){
      const an=i/170*TAU+Math.sin(i*1.7)*.03,r0=pup+1+H(i*.7)*9,r1=R*(.86+.1*H(i*1.1));
      fib.push([[cx+Math.cos(an)*r0,cy+Math.sin(an)*r0],[cx+Math.cos(an+.015)*(r0+r1)/2,cy+Math.sin(an+.015)*(r0+r1)/2],[cx+Math.cos(an)*r1,cy+Math.sin(an)*r1]]);
    }
    s+=lines(fib,.44,.42);
    const ir=[];
    for(let i=0;i<1100;i++){
      const an=H(i*1.13)*TAU,r=mix(pup,R*.96,Math.pow(H(i*2.1),.9));
      const lit=.55+.45*Math.cos(an+2.2);
      ir.push([cx+Math.cos(an)*r,cy+Math.sin(an)*r,.42+H(i*.3)*.34,lit*(.25+.45*H(i*.61))]);
    }
    s+=cloud(ir);
    s+=`<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${f2(pup)}" fill="#000" stroke="#fff" stroke-opacity=".5" stroke-width=".7"/>`;
    // Отражение: хвост с приманкой, натянутый на сферу глаза.
    const reveal=ramp(t,K.g_eyes+.1,K.g_eyes+.7);
    const lens=(px,py)=>{const dx=(px-180)/118,dy=(py-180)/118,r=Math.hypot(dx,dy)||1e-3,k=Math.tanh(r*1.1)/r*.77*pup;return [cx+dx*k+pup*.13,cy+dy*k+pup*.16];};
    const cm0=camera({cx:160,cy:156,f:620,distance:620,yaw:.08,pitch:.5,scale:4.7});
    const fish={scale:4.7,rot:cm0.rot,proj:(x,y,z)=>{const p=cm0.proj(x,y,z),q=lens(p[0],p[1]);return [q[0],q[1],p[2],p[3]*.8];}};
    const tailDots=[],edgeA=[],edgeB=[];
    for(let i=0;i<=46;i++){
      const q=i/46,c=bez([7,0,0],[20,0,0],[31,5,8],[26,34,26],q),r=mix(1.6,3.9,q),m=8;
      const ca=fish.proj(c[0],c[1]-r,c[2]),cb=fish.proj(c[0],c[1]+r,c[2]);
      edgeA.push(ca);edgeB.push(cb);
      for(let j=0;j<=m;j++){const a=j/m*PI-PI/2,pj=fish.proj(c[0],c[1]-Math.cos(a)*r,c[2]-Math.sin(a)*r);tailDots.push([pj[0],pj[1],.5,cl(.42+.5*(1-Math.abs(a))*(i%6<3?1:.55))]);}
    }
    let reflected=lines([edgeA,edgeB],.42,.62)+cloud(tailDots);
    reflected+=fade(.74,lureDraw(t,fish,[0,0,0],[-1,0,0],[0,-1,0],{move:.8,tilt:-.8,fit:true}));
    s+=fade(reveal*.9,reflected);
    // Блик влажного глаза.
    const glare=[];for(let i=0;i<=20;i++){const q=mix(3.5,4.3,i/20);glare.push([cx+Math.cos(q)*pup*.88,cy+Math.sin(q)*pup*.88]);}
    s+=lines([glare],6,.26,true)+lines([glare],1.2,.5);
    s+=U.sphere(cx-pup*.58,cy-pup*.5,3.4,{opacity:.7,glow:.7,highlight:false});
    return fade(a,s);
  }

  /* Перебежки приманки: рывок около .16 с, затем замирание .24–.54 с. Таблица считается один раз, дальше только t. */
  const DASHES=(()=>{
    const o=[];let T=0,x=0,y=0;
    for(let i=0;i<40;i++){
      const hold=.24+.3*H(i*3.7+.4),run=.13+.05*H(i*1.9+.2),a=H(i*7.3+1.1)*TAU,r=1.7+1.1*H(i*2.7+.9);
      const x1=cl(x*.3+Math.cos(a)*r,-2.6,2.6),y1=cl(y*.3+Math.sin(a)*r*.7,-1.6,1.6);
      o.push({a:T+hold,b:T+hold+run,x0:x,y0:y,x1,y1});
      T+=hold+run;x=x1;y=y1;
    }
    return o;
  })();
  function scuttle(u){
    let i=0;
    while(i<DASHES.length-1&&DASHES[i].b<=u)i++;
    const d=DASHES[i],e=sm((u-d.a)/(d.b-d.a));
    return {x:mix(d.x0,d.x1,e),y:mix(d.y0,d.y1,e),run:ramp(u,d.a-.03,d.a+.04)*(1-ramp(u,d.b-.04,d.b+.03)),gait:(i+e)*TAU*1.25};
  }

  function snakeBody(t,K){
    const U=UN;
    const lift=ramp(t,K.g_tail-.42,K.g_tail+.3)*(1-ramp(t,K.g_never+.05,K.g_never+1));
    // Пасть доходит до цели к hitAt+.2: это K.g_mouth, на нём звук удара.
    const hitAt=K.g_mouth-.2,hitT=hitAt+.2,strikeOut=ramp(t,hitAt,hitT),strikeBack=ramp(t,hitAt+.34,hitAt+1.25);
    const reveal=ramp(t,K.g_snake-.05,K.g_snake+.4),hide=ramp(t,K.g_never+.1,K.g_never+.95);
    // Полный наезд стоит от K.g_copy-.3 до K.g_bird-.06: не меньше 1,2 с.
    const close=ramp(t,K.g_tail-.36,K.g_copy-.3),open=ramp(t,K.g_bird-.06,K.g_bird+.85);
    const wide=hide;
    const dash=scuttle(t-K.g_tail+.2),amp=lift*(1-hide)*mix(.62,1.8,open);
    const tipBase=[TIP0[0]+dash.x*amp,TIP0[1]+dash.y*amp,TIP0[2]];
    const P0={lift,tip:tipBase};
    const headRest=cpos(.03,P0);
    // Камера смотрит на покой приманки, а не на неё саму: иначе перебежек не видно.
    const home=cpos(.9875,{lift,tip:TIP0});
    const aim=add(home,[-3,-16,0]),birdEnd=add(aim,[4,-5,0]);
    const sq=strikeOut*(1-strikeBack),gape=ramp(t,hitAt-.05,hitAt+.05)*(1-ramp(t,hitAt+.24,hitAt+.44));
    const sN=cpos(STRIKEU,P0),sN1=cpos(STRIKEU+.01,P0),sNT=nrm(sN1[0]-sN[0],sN1[1]-sN[1],sN1[2]-sN[2]);
    const P={lift,tip:tipBase,strike:{q:sq,tip:birdEnd,dir:nrm(.78,-.5,-.2),l1:24,l2:30,N:sN,NT:sNT}};
    const q1=ramp(t,K.g_snake+.25,K.g_tail+.3),CLOSEZ=7.6,CLOSEX=236,CLOSEY=215,WIDEZ=2.3;
    let F=vmix(add(headRest,[-12,0,0]),[0,-12,-26],q1),X=mix(172,180,q1),Y=mix(236,240,q1),ln=Math.log(mix(2.25,1.9,q1));
    if(close>0){const e=close;F=vmix(F,home,e);X=mix(X,CLOSEX,e);Y=mix(Y,CLOSEY,e);ln=mix(ln,Math.log(CLOSEZ),e);}
    if(open>0){const e=open;F=vmix(home,[0,-16,-26],e);X=mix(CLOSEX,180,e);Y=mix(CLOSEY,238,e);ln=mix(Math.log(CLOSEZ),Math.log(WIDEZ),e);}
    if(wide>0){const e=wide;F=vmix(F,[0,-10,-22],e);X=mix(X,180,e);Y=mix(Y,240,e);ln=mix(ln,Math.log(1.7),e);}
    // Камера низко, у земли: камни стоят, змея лежит между ними. Крупный план приманки чуть выше, ноги раскрыты.
    const PV=.37,pitch=mix(mix(PV,.42,close),PV,open);
    const c={f:640,distance:640,yaw:-.08+.02*Math.sin(t*.3),pitch,scale:Math.exp(ln)};
    const cm=aimed(c,F,X,Y);
    const zoomed=cl((Math.exp(ln)-2.8)/2.6);
    let s=groundDraw(cm,1-zoomed);
    // Крупно приманка стоит на камне: тело змеи ещё не видно, виден только «паук».
    const rock=zoomed*(1-ramp(open,.1,.55));
    if(rock>0){
      const y0=TIP0[1]+13.5,pts=[];
      const Rk=(x,z)=>[home[0]+x,y0+1.5*Math.sin(x*.21+z*.17)+.9*Math.sin(x*.47-z*.33)+.5*Math.sin(x*1.1+z*.9)+.01*(x*x+z*z),home[2]+z];
      for(let i=0;i<900;i++){const x=(H(i*1.3)-.5)*88,z=(H(i*2.1)-.5)*54,a=Rk(x,z),b=cm.proj(a[0],a[1],a[2]);pts.push([b[0],b[1],.34+H(i*.7)*.42,(.12+.3*H(i*.4))*(.6+.4*Math.sin(x*.5+z*.4))]);}
      s+=fade(rock,cloud(pts));
    }
    const far=cl((Math.exp(ln)-3.4)/2.6)*(1-open);
    const vis=(mix(mix(.2,.8,reveal),.2,hide)+.2*close*(1-hide))*(1-far);
    const neck=mix(1,0,close*(1-ramp(open,0,.34)));
    const live=reveal*(1-hide);
    const snake=snakeDraw(t,cm,P,{vis,neck,occl:live,glow:.2*live,edge:.34*live*(1-far),gape});
    s+=snake.svg;
    const last=snake.rings[snake.rings.length-1];
    // Ноги-чешуи шевелятся только в рывке, между рывками приманка замирает, как паук.
    const moveL=(.1+.9*dash.run)*lift*(1-hide),plainL=Math.max(open,ramp(t,K.g_never+.05,K.g_never+.95));
    const dorsal=nrm(...(()=>{const u=[0,-.72,-1],d=dot3(u,last.T);return [u[0]-last.T[0]*d,u[1]-last.T[1]*d,u[2]-last.T[2]*d];})());
    s+=lureDraw(t,cm,last.C,last.T,vmix(last.Up,dorsal,cl(lift*1.6)),{move:moveL,gait:dash.gait,tilt:0,alpha:cl(mix(mix(.2,.8,reveal),.2,hide)*mix(.42,1.4,lift)),plain:plainL,droop:.5*open*lift});
    // «хвост» стоит на отъезде: в крупном плане зритель видит паука, снаружи узнаёт, что это хвост. Нить идёт к кончику, мимо тела.
    const lab=ramp(t,K.g_bird+.62,K.g_bird+.94)*(1-ramp(t,K.g_bird+1.18,K.g_bird+1.5));
    if(lab>0){
      const lp=cm.proj(last.C[0],last.C[1],last.C[2]),lx=Math.min(308,lp[0]+74),ly=lp[1]-34;
      s+=lines([[[lx-22,ly+6],[lp[0]+7,lp[1]-5]]],.5,.8*lab)+U.italic(lx,ly,'хвост',{size:25,anchor:'middle',opacity:lab,glow:true});
    }
    const tIn=K.g_bird-.2,tD=hitAt-.6,tBr=hitAt-.13,tH=hitAt+.04;
    if(t>tIn&&t<hitAt+.5){
      // К K.g_bird+.2 птица в кадре и гасит скорость высоко над приманкой, крылья работают, голова клонится к цели.
      // Почти весь путь — пике за последние .6 с до удара: разгон до 5–6 px на кадр, поперёк оси хвоста.
      // Только на последних .13 с она раскрывает крылья и выравнивается, клюв останавливается над приманкой.
      const A=cm.proj(aim[0],aim[1],aim[2]),hov=cl((t-tIn)/(tD-tIn)),ex=1-Math.pow(1-hov,2.6),ey=1-Math.pow(1-hov,3.4),e=diveAt((t-tD)/(tH-tD));
      const brake=ramp(t,tBr,tBr+.13),aimB=ramp(t,tD-.42,tD+.04);
      const hx=mix(BIRD_IN[0],BIRD_HI[0],ex),hy=mix(BIRD_IN[1],BIRD_HI[1],ey)+6*aimB+1.6*Math.sin(t*5.2)*hov;
      const px=mix(hx,A[0],e),py=mix(hy,A[1],e),s0=mix(mix(.58,.66,ex),.8,e);
      const pitchB=-mix(mix(mix(.42,.62,ey),.98,aimB),.6,brake),yawB=.24;
      const flap=mix(.86+.5*Math.sin(t*30),1.14+.1*Math.sin(t*44),brake),fold=mix(.16,.28,brake);
      const burst=ramp(t,hitT,hitT+.21);
      // Клюв попадает точно в цель: начало координат птицы отнесено назад на его длину, зеркально.
      const cy=Math.cos(yawB),sy=Math.sin(yawB),x1=BEAK[0]*cy-BEAK[2]*sy,cp=Math.cos(pitchB),sp=Math.sin(pitchB);
      const off=[(x1*cp-BEAK[1]*sp)*s0,-(x1*sp+BEAK[1]*cp)*s0];
      s+=drawBird({x:px+off[0],y:py-off[1]+1.2*Math.sin(t*30)*(1-brake),s:s0,pitch:pitchB,yaw:yawB,flap,fold,burst,mirror:true});
    }
    // Вспышка только после контакта: атака .05 с, спад .2 с, лучи идут наружу и назад не возвращаются.
    const flT=t-hitT,fl=flT>0?cl(flT/.05)*(1-cl((flT-.05)/.2)):0;
    if(fl>0){
      const w=cm.proj(birdEnd[0],birdEnd[1],birdEnd[2]);
      s+=`<circle cx="${f2(w[0])}" cy="${f2(w[1])}" r="${f2(30+36*fl)}" fill="url(#un-halo)" opacity="${f3(fl)}"/>`;
      const rays=[];for(let i=0;i<14;i++){const a=H(i+.3)*TAU,r0=8+22*cl(flT/.25),r1=r0+12+H(i)*20;rays.push([[w[0]+Math.cos(a)*r0,w[1]+Math.sin(a)*r0],[w[0]+Math.cos(a)*r1,w[1]+Math.sin(a)*r1]]);}
      s+=lines(rays,.6,fl*.6);
    }
    const eyeA=ramp(t,K.g_eyes-.25,K.g_eyes+.35);
    if(eyeA>=1)return birdEye(t,K,1);
    return dissolve(s,birdEye(t,K,1),eyeA);
  }

  /* ───────────── Башня и дуги: decode, layers, third, god ─────────────
   * Правая башня un_towers: x=248, y=62..376, ширина 36 → 14,5, 20 плит по 4 на уровень.
   * Издалека (w=1) рисуем её так же, с сужением; вблизи (w=0) уровни равны и прямы,
   * потому что камера стоит на их высоте. Координаты: y от центра башни, 0 ↔ y=219. */
  const LV=[157,66,-7.7,-67.7,-116.7,-157],FIGH=26;
  const NAMES=['ХИМИЯ','ОРГАНИКА','КЛЕТКИ','ОРГАНИЗМЫ','БИОСФЕРА'];
  /* Поза башни при w=1: fl — 21 плита снизу вверх, h0/h1 — полуширина верха и низа. BASE для layers/third/god;
   * decode строит свою из towerFit, плита в плиту с un_towers: col — стойки внутри плит, rim — выступ плиты, op — наклон. */
  const BASE={fl:Array.from({length:21},(_,n)=>n===20?LV[5]:mix(LV[n>>2],LV[(n>>2)+1],(n&3)/4)),h0:7.25,h1:18,col:1,rim:1,op:null,yaw:null};
  const flY=(n,w,T=BASE)=>mix(157-15.7*n,T.fl[n],w);
  const lvY=(i,w,T=BASE)=>flY(i*4,w,T);
  const floorY=(i,w=0,T=BASE)=>(lvY(i,w,T)+lvY(i+1,w,T))/2;
  const hwAt=(y,w,T=BASE)=>mix(18,T.h0+(T.h1-T.h0)*(y+157)/314,w);
  const tCam=(Z,ax,ay,fy,t,w=0,T=BASE)=>{
    const y0=-.1+.012*Math.sin(t*.4);
    return camera({cx:ax,cy:ay-fy*Z,f:1200,distance:1200,yaw:T.yaw?mix(y0,T.yaw(t),w):y0,pitch:T.op?mix(.04,0,w):.04,scale:Z});
  };
  /* Две плотности фигур идут наплывом: новая встаёт поверх старой, потом старая уходит. Порогов по масштабу нет. */
  const lodMix=(d,lo,hi)=>d<=0?lo():d>=1?hi():fade(1-ramp(d,.4,1),lo())+fade(ramp(d,0,.6),hi());
  function floorInside(i,t,cm,alpha,w,T=BASE){
    const Z=cm.scale,yc=floorY(i,w,T),half=(lvY(i,w,T)-lvY(i+1,w,T))/2,hw=hwAt(yc,w,T);
    const P=(u,v,z=0)=>cm.proj(u*hw*.9,yc+v*half*.84,z),k=Z*hw/18,rs=Math.sqrt(Math.max(.3,k)),dens=ramp(k,1.35,1.85);
    let s='';
    if(i===0){
      const d=[],l=[];
      for(let a=0;a<4;a++)for(let b=0;b<5;b++){
        const u=-.72+a*.48,v=-.74+b*.37+Math.sin(t*.7+a+b)*.03;
        const c=P(u,v),h1=P(u-.13,v+.1),h2=P(u+.13,v+.1);
        l.push([h1,c,h2]);d.push([c[0],c[1],.62*rs,.95],[h1[0],h1[1],.34*rs,.8],[h2[0],h2[1],.34*rs,.8]);
      }
      s+=lines(l,.3*rs,.45)+cloud(d);
    }else if(i===1){
      const pts=[];for(let n=0;n<15;n++){const q=n/14,v=-.8+q*1.6;pts.push(P(Math.sin(q*9+t*.3)*.56,v));}
      s+=lines([pts],.32*rs,.5);
      s+=cloud(pts.map((p,n)=>[p[0],p[1],(.55+.26*H(n))*rs,.92]));
    }else if(i===2){
      const c=[];
      for(let n=0;n<6;n++){
        const u=(n%2?.38:-.38),v=-.66+n*.26,r=(.26+.05*Math.sin(t*1.1+n))*hw*.9*Z,o=[];
        const m=P(u,v);
        for(let a=0;a<=20;a++){const q=a/20*TAU;o.push([m[0]+Math.cos(q)*r,m[1]+Math.sin(q)*r*.94]);}
        c.push(o);
        s+=cloud([[m[0]+Math.cos(n*2)*.1*r,m[1]+Math.sin(n*2)*.1*r,.55*rs,.9]]);
      }
      s=lines(c,.34*rs,.6)+s;
    }else if(i===3){
      const m=P(.14,-.68),sp=P(0,.32);
      s+=drawMidge({x:m[0],y:m[1],s:.21*k,ang:2.3+Math.sin(t*.8)*.1,wing:.6+.2*Math.sin(t*5),stuck:.4});
      const sp1=lod=>()=>drawSpider({x:sp[0],y:sp[1],s:.15*k,ang:Math.sin(t*.5)*.05,gait:t*2,move:.12,lod,tilt:.2});
      s+=lodMix(dens,sp1(.3),sp1(.6));
    }else{
      const b=P(-.06,-.54),sn=P(.02,.5);
      const b1=lod=>()=>drawBird({x:b[0],y:b[1],s:.25*k,pitch:-.16+.05*Math.sin(t),yaw:.2,flap:.8+.5*Math.sin(t*3.2),fold:.3,lod});
      s+=lodMix(dens,b1(.3),b1(.7));
      const c2=camera({cx:sn[0],cy:sn[1],f:640,distance:640,yaw:-.1,pitch:.42,scale:.26*k});
      const P1={lift:1,tip:[TIP0[0]+Math.sin(t*2)*2,TIP0[1],TIP0[2]]};
      // Заливка, контур и приманка входят вместе с плотной змеёй, отдельных порогов у них нет.
      s+=lodMix(dens,()=>snakeDraw(t,c2,P1,{vis:1,neck:1,occl:0,lod:.3,edge:0,detail:true}).svg,()=>{
        const sv=snakeDraw(t,c2,P1,{vis:1,neck:1,occl:1,lod:.6,edge:.34,detail:true}),last=sv.rings[sv.rings.length-1];
        return sv.svg+lureDraw(t,c2,last.C,last.T,last.Up,{move:.2,plain:1,droop:.5});
      });
    }
    return fade(alpha,s);
  }
  function towerDraw(t,cm,o={}){
    const Z=cm.scale,a=o.alpha??1,lab=o.labels??0,fill=o.fill??1,w=o.w??0,figA=o.figure??1,T=o.T??BASE;
    if(a<=0)return '';
    // У un_towers наклон плиты зависит от её высоты: вдали повторяем его, вблизи камера одна на всю башню.
    const lw=.42*Math.sqrt(Z),P=(x,y,z)=>cm.proj(x,T.op&&w>0?y-cm.rot(x,0,z)[2]*T.op(y)*w:y,z);
    const col=mix(1,T.col,w),over=mix(1,T.rim,w),band=T.op?1-w:1;
    const plate=(y,k,d)=>[P(-k,y,-d),P(k,y,-d),P(k,y,d),P(-k,y,d),P(-k,y,-d)];
    const rims=[],sub=[],bars=[],pins=[];
    for(let i=0;i<5;i++){
      const y0=lvY(i,w,T),y1=lvY(i+1,w,T),h1=hwAt(y1,w,T)*col,h0=hwAt(y0,w,T)*col;
      for(const dy of [-1.3,1.3]){const y=y1+dy+1.3*band,k=hwAt(y,w,T)+1.7*over;rims.push(plate(y,k,k*.72));}
      for(let e=1;e<4;e++){const y=flY(i*4+e,w,T);for(const dy of [-.8,.8]){const yy=y+dy+.8*band,k=hwAt(yy,w,T)+1.4*over;sub.push(plate(yy,k,k*.72));}}
      for(const sx of [-1,1])for(const sz of [-1,1])bars.push([P(sx*h0,y0,sz*h0*.72),P(sx*h1,y1,sz*h1*.72)]);
      for(let n=1;n<5;n++){const x=-1+n*2/5;bars.push([P(x*h0,y0,h0*.72),P(x*h1,y1,h1*.72)]);}
      for(let u=0;u<6;u++)for(let v=0;v<8;v++){
        const y=mix(y0,y1,(v+.5)/8),hh=hwAt(y,w,T)*col,q=P((-1+u*.4)*hh,y,hh*.72);pins.push([q[0],q[1],.34*Math.sqrt(Z),.3]);
      }
    }
    {const k=hwAt(lvY(0,w,T),w,T)+1.7*over;rims.push(plate(lvY(0,w,T),k,k*.72));}
    let s=lines(bars,lw,.34)+cloud(pins)+lines(rims,lw*1.3,.86)+lines(rims,lw*4,.22,true);
    if(w>.02)s+=fade(w,lines(sub,lw*1.1,.72)+lines(sub,lw*3.6,.16,true));
    if(fill>0)for(let i=0;i<5;i++)s+=floorInside(i,t,cm,fill,w,T);
    // Точечная фигурка «ТЫ» на вершине.
    const top=lvY(5,w,T),fig=[],hf=FIGH*mix(1,.82,w);
    const px=(x,y)=>{const q=P(x,y,0);return [q[0],q[1]];};
    const rr=Math.sqrt(Z);
    for(let i=0;i<40;i++){const a2=i/40*TAU;const q=px(Math.cos(a2)*hf*.11,top-hf*.87+Math.sin(a2)*hf*.11);fig.push([q[0],q[1],.4*rr,.95]);}
    for(let i=0;i<80;i++){
      const f=H(i*1.1),y=top-f*hf*.74,wd=f>.48?hf*.15*(1-Math.abs(f-.72)*1.6):hf*.1;
      const q=px((H(i*1.9)-.5)*2*wd,y);fig.push([q[0],q[1],.36*rr,.85]);
    }
    s+=fade(figA,cloud(fig));
    if(lab>0){
      for(let i=0;i<5;i++){
        const yy=floorY(i,w,T),r=P(hwAt(yy,w,T)+4,yy,0);
        const on=(o.only?(o.only.includes(i)?1:mix(.32,1,o.rest??0)):1)*sm((r[1]-22)/30)*sm((392-r[1])/30);
        if(on>.01)s+=UN.mono(Math.min(r[0]+4,356-NAMES[i].length*6.1),r[1]+3.4,NAMES[i],{size:9.6,opacity:lab*on*.92});
      }
      const r=P(hwAt(top,w,T)+4,top-hf*.5,0),on=sm((r[1]-22)/30);
      if(on>.01)s+=UN.mono(r[0]+4,r[1]+3.4,'ТЫ',{size:9.6,opacity:lab*on*.92});
    }
    return fade(a,s);
  }

  /* Дуги: один рисунок на всю сцену. 15 дуг шести опорных точек, как на t=50 оригинала. */
  const TOK=[{w:'Что',x:64,pw:45},{w:'такое',x:124,pw:62},{w:'Chat',x:187.5,pw:53},{w:'G',x:233.5,pw:27},{w:'PT',x:271,pw:36},{w:'?',x:306.5,pw:23}];
  const VAL=['0,46','0,12','0,21','0,08','0,13'],WT=[.46,.12,.21,.08,.13];
  const ARCS=[[0,5,2.5],[1,5,1.0],[2,5,1.4],[3,5,.85],[4,5,1.05],[0,1,1.5],[1,2,.9],[2,3,1.1],[3,4,.8],[0,2,.75],[1,3,1.25],[2,4,1.3],[0,3,.7],[1,4,.9],[0,4,.7]];
  const arcH=c=>14.5+.496*c;
  /* Дуга — всегда одно аффинное изображение синусоиды: один горб на любом этапе, без S и петель. */
  function arcPts(a,b,N,h,rev=1,V=null){
    const o=[],n=48,c=Math.max(2,Math.round(n*rev));
    const vx=V?V[0]:N[0]*h,vy=V?V[1]:N[1]*h;
    for(let i=0;i<=c;i++){
      const m=i/n,sn=Math.pow(Math.sin(PI*m),.92);
      o.push([mix(a[0],b[0],m)+vx*sn,mix(a[1],b[1],m)+vy*sn]);
    }
    return o;
  }
  const pill=(x,y,w,h,txt,o={})=>{
    const fill=o.fill??'#fff',size=o.size??13;
    return `<g opacity="${f3(o.opacity??1)}"><rect x="${f2(x-w/2)}" y="${f2(y-h/2)}" width="${f2(w)}" height="${f2(h)}" rx="${f2(h/2)}" fill="${fill}" stroke="#fff" stroke-width=".6"/><text x="${f2(x)}" y="${f2(y+size*.36)}" fill="#000" font-family="Plex" font-weight="600" font-size="${size}" text-anchor="middle">${txt}</text></g>`;
  };
  /* Вход decode стоит ровно там, где башня из un_towers: правая остаётся, левая уходит с наплывом. */
  function towerFit(K){
    const r=SCENES.un_towers?.state?.(K.g1,K)?.right;
    if(!r||!r.top||!r.base)return {x:248,y:219,Z:1,T:BASE};
    // Плиты по той же формуле, что prep/fy в un_towers: степень q=.12 и точка схода из ширины верха и низа.
    const y0=(r.top.y+r.base.y)/2,h=r.base.y-r.top.y,Z=h/314,q=.12,vp=r.base.y-h/(1-r.wTop/r.w),ub=r.base.y-vp;
    const A=Math.pow(ub,-q),B=(Math.pow(ub-h,-q)-A)/20,yh=430,f=1000;
    const fl=Array.from({length:21},(_,n)=>(vp+Math.pow(A+B*n,-1/q)-y0)/Z);
    const T={fl,h0:r.wTop/2/Z,h1:r.w/2/Z,col:.8,rim:0,op:y=>cl((y0+y*Z-yh)/f,-.42,.42),yaw:u=>.075+.03*Math.sin(u*.33)};
    return {x:r.x,y:y0,Z,T};
  }
  function decodeBody(t,K){
    const U=UN,t0=K.g1-.05,fit=towerFit(K);
    // Сначала уходит башня, потом встают пилюли: за пилюлями нет ни этажа, ни паука.
    const near=ramp(t,K.g_where-.3,K.g_where+.85),gone=ramp(t,K.g_gpt-.5,K.g_gpt-.08);
    const lnZ=mix(Math.log(fit.Z),Math.log(2.9),near),Z=Math.exp(lnZ)*(1+.006*(t-t0)*near),w=1-near;
    const ax=mix(fit.x,166,near),ay=mix(fit.y,190,near),fy=mix(0,(floorY(2)+floorY(3))/2,near);
    let s='';
    if(gone<1)s+=towerDraw(t,tCam(Z,ax,ay,fy,t,w,fit.T),{alpha:1-gone,labels:near,only:[2,3],fill:mix(.3,.85,near),w,figure:near,T:fit.T});
    const y0=272,h=26,up=K.g_gpt-.14;
    const rise=i=>ramp(t,up+i*.035,up+.3+i*.035);
    if(rise(0)<=0)return s;
    // Вся сетка стоит к K.g_token: пять главных дуг от «?» справа налево, затем остальные десять.
    const sel=ramp(t,K.g_token-.66,K.g_token-.34),sw0=K.g_token-.62,sw1=K.g_token-.3;
    const hit=i=>mix(sw0,sw1,(TOK[4].x-TOK[i].x)/(TOK[4].x-TOK[0].x));
    // «оценивает»: взгляд идёт по дугам от ближней к дальней, на «остальные» светлеет вся сетка.
    const scan=(t-K.g_token-.08)/Math.max(.4,K.g_others-K.g_token-.12)*4;
    const focus=i=>(t<K.g_token+.08?0:Math.exp(-Math.pow((scan-(4-i))/.62,2)));
    const all=ramp(t,K.g_others-.06,K.g_others+.26)*(1-ramp(t,K.g_others+.45,K.g_others+1));
    ARCS.forEach((A,i)=>{
      const primary=i<5,start=K.g_token-.5+(i-5)*.025;
      if(primary&&t<hit(i))return;
      const born=primary?ramp(t,hit(i),hit(i)+.3):1,rev=primary?born:ramp(t,start,start+.26);
      if(rev<=0)return;
      const a=[TOK[A[0]].x,y0-h/2],b=[TOK[A[1]].x,y0-h/2],c=Math.abs(b[0]-a[0]),f=primary?focus(i):0;
      const wd=(primary?mix(1.1,.5+4.4*(K.tok_wt?.[i]??WT[i]),born):A[2]*.5)*(1+.1*all)+.5*f;
      const op=primary?mix(.82,.96,born):.5+.16*all;
      const pts=arcPts(b,a,[0,-1],arcH(c),rev);
      s+=lines([pts],wd,cl(op+.04*f))+lines([pts],wd+2.2,.14+.2*f,true);
      if(primary&&rev>=1){
        const ph=(t*.55+i*.21)%1,n=Math.floor(ph*(pts.length-1)),e=pts[n];
        s+=U.sphere(e[0],e[1],1.1+wd*.32,{opacity:Math.sin(ph*PI)*.9,glow:1.1,highlight:false});
      }
    });
    TOK.forEach((tk,i)=>{
      const r=rise(i),isSel=i===5,g=Math.round(mix(255,176,sel));
      const fill=isSel||sel<=0?'#fff':`rgb(${g},${g},${g})`,pulse=isSel?1+.05*sel*Math.sin(t*3.4):1;
      if(isSel&&sel>0)s+=`<circle cx="${tk.x}" cy="${y0}" r="${f2(30*sel)}" fill="url(#un-halo)" opacity="${f3(sel*.9)}"/>`;
      s+=pill(tk.x,y0+(1-r)*16,tk.pw*pulse,h*pulse,K.tok_text?.[i]??tk.w,{fill,opacity:r});
      if(i<5){
        const v=ramp(t,hit(i)+.1,hit(i)+.34);
        if(v>0)s+=U.mono(tk.x,y0+h/2+15,K.tok_val?.[i]??VAL[i],{size:9.4,anchor:'middle',opacity:v*(.74+.26*Math.max(focus(i),all))});
      }
    });
    return s;
  }

  const WORLD_P=[-92,-292],ROWY=300,NET_TOP=20;   // точка над башней в координатах башни, ряд пилюль в god, верхняя кромка
  // Сверху вниз: дуга встаёт, когда оба её этажа уже в кадре. NET_ON — доля пути от K.g_layer к K.g_between.
  const NET_ORDER=[8,7,11,4,3,2,6,10,13,1,5,9,12,14,0],NET_ON=[0,.15,.24,.36,.4,.44,.46,.5,.54,.58,.74,.76,.79,.82,.84];
  function netBody(t,K,o={}){
    const U=UN,t0=K.g4-.05;
    const q0=ramp(t,t0,K.g_select+.6),q1=ramp(t,K.g_layer-.5,K.g_between-.1),q2=ramp(t,K.g_third-.1,K.g6+.1);
    const dark=ramp(t,K.g6-.1,K.g6+1.1),spread=ramp(t,K.g6-.05,K.g_what+1.2);
    const lnZ=mix(mix(Math.log(3.2),Math.log(2.8),q0),0,q1)+mix(0,Math.log(.7),q2);
    const Z=Math.exp(lnZ)*(1+.004*Math.sin(t*.5)),w=q1;
    const focus=mix(lvY(4,0),0,q1);
    const ax=mix(mix(186,196,q0),mix(248,226,q2),q1);
    const ay=mix(188,mix(219,242,q2),q1);
    const cm=tCam(Z,ax,ay,focus,t);
    const lab=(1-ramp(t,K.g_layer+.3,K.g_between-.4))+ramp(t,K.g_between-.2,K.g_between+.5)*(1-q2);
    let s='';
    s+=towerDraw(t,cm,{alpha:(1-dark)*mix(1,.5,ramp(t,K.g_third,K.g_creator)),labels:cl(lab),only:[3,4],rest:ramp(q1,.3,.7),fill:mix(1,.5,q1),w});
    const P=(x,y)=>cm.proj(x,y,0);
    const Pw=P(WORLD_P[0],WORLD_P[1]);
    // Точка пока над кромкой кадра: вершины идут к ней только вверх и не возвращаются вниз вместе с камерой.
    const breath=dark*Math.sin(t*.9)*1.2;
    const pxy=[mix(Pw[0],180,dark),mix(Math.max(Pw[1],NET_TOP),84,dark)+breath];
    // Наклон: ноги стоят на этажах, вершины идут к точке. Ноги сходят с башни только в god.
    const lean=ramp(t,K.g_third-.05,K.g_third+1.7);
    // Дуги внутри этажей: мошка → паук, птица → змея.
    const yA=floorY(3,0),yB=floorY(4,0),half=31.4*.84,hwp=18*.9;
    const pairA=[P(hwp*.04,yA-half*.68),P(-hwp*.02,yA+half*.04)];
    const pairB=[P(-hwp*.2,yB-half*.42),P(hwp*.02,yB+half*.2)];
    const sel=ramp(t,K.g_select-.1,K.g_select+.55),judge=ramp(t,K.g_judge-.1,K.g_judge+.4);
    const sel2=(1-ramp(t,K.g_layer+.15,K.g_layer+1.15));
    if(sel>0&&sel2>0){
      [[pairA,.46,0],[pairB,.21,1]].forEach(([p,wt,i])=>{
        const c=Math.hypot(p[1][0]-p[0][0],p[1][1]-p[0][1]);
        const rev=ramp(t,K.g_select+i*.3-.05,K.g_select+i*.3+.6);
        const pts=arcPts(p[0],p[1],[-1,0],arcH(c)*1.25,rev);
        const wd=mix(.7,.8+5.2*wt,judge);
        s+=lines([pts],wd,.92*sel2)+lines([pts],wd+2.6,.16*sel2,true);
        if(rev>=1){const ph=((t-K.g_select)*.8+i*.4)%1,e=pts[Math.floor(ph*(pts.length-1))];s+=U.sphere(e[0],e[1],1.4+wd*.3,{opacity:Math.sin(ph*PI)*sel2,glow:1.2,highlight:false});}
      });
    }
    // Этаж к этажу: шесть опор вдоль грани, тот же рисунок, что в decode, повёрнутый на 90°.
    const anchors=[];
    for(let i=0;i<6;i++){
      const y=i<5?floorY(i,w):lvY(5,w)-FIGH*.5,hh=hwAt(Math.max(y,-157),w);
      anchors.push(P(-hh-1.5,y));
    }
    const layerOn=K.g_layer+.05,span=Math.max(.5,K.g_between-layerOn);
    const opA=mix(.78,.6,dark);
    let net='';const glow=[];
    NET_ORDER.forEach((idx,n)=>{
      const A=ARCS[idx],on=layerOn+NET_ON[n]*span;
      const rev=ramp(t,on,on+.6);
      if(rev<=0)return;
      // Этажи → ряд пилюль: одна дуга всю дорогу, ни одного наплыва между двумя рисунками.
      const a0=anchors[A[0]],b0=anchors[A[1]],c0=Math.hypot(b0[0]-a0[0],b0[1]-a0[1]);
      const a=[mix(a0[0],TOK[A[0]].x,spread),mix(a0[1],ROWY,spread)],b=[mix(b0[0],TOK[A[1]].x,spread),mix(b0[1],ROWY,spread)];
      const M=[(a[0]+b[0])/2,(a[1]+b[1])/2],M0=[(a0[0]+b0[0])/2,(a0[1]+b0[1])/2];
      const h=Math.min(arcH(c0)*mix(.82,1.06,q2),Math.max(16,Math.min(a0[0],b0[0])-9));
      // На этажах: вектор вершины уходит вверх к точке, но не ложится на хорду. Один горб, без крюков.
      const k=mix(.3,.6,cl(c0/210)),to=[(pxy[0]-M0[0]+h)*k,(pxy[1]-M0[1])*k];
      const V0=[-h+to[0]*lean,Math.max(to[1],-c0*.3)*lean];
      // На ряду: рисунок decode в масштабе, дальние дуги приходят в точку, ближние только наклоняются к ней.
      const c1=TOK[A[1]].x-TOK[A[0]].x,M1=(TOK[A[0]].x+TOK[A[1]].x)/2,hg=arcH(c1)*1.62,conv=sm((c1-112)/76);
      const inner=[cl(pxy[0]-M1,-.22*c1,.22*c1),-hg],toP=[pxy[0]-M1,pxy[1]-ROWY];
      const V1=[mix(inner[0],toP[0],conv),mix(inner[1],toP[1],conv)];
      const pts=arcPts(a,b,[-1,0],h,rev,[mix(V0[0],V1[0],spread),mix(V0[1],V1[1],spread)]);
      const wd=mix(A[2]*.56,A[2]*.5,dark)+.08;
      net+=lines([pts],wd,opA);
      glow.push(pts);
      // Тихие бусины ползут по дуге вверх и после наклона: кадр не замирает.
      if(rev>=1&&idx<5){
        const ph=((t-on)*.3+idx*.23)%1,e=pts[Math.floor(ph*24)];
        net+=U.sphere(e[0],e[1],1.5,{opacity:Math.sin(ph*PI)*mix(.8,.4,dark),glow:1,highlight:false});
      }
    });
    s+=lines(glow,2.2,.09,true)+net;
    // Шесть пилюль на местах токенов: зритель вспоминает decode. Их подхватывает ряд un_tokens.
    // На наплыве un_tokens o.row ведёт контуры вместе с новым рядом, o.text гасит их слова раньше: двух рядов нет.
    const pillA=ramp(t,K.g_what+.25,K.g_what+1.2)*(o.pills??1),textA=pillA*(o.text??1);
    if(pillA>0)TOK.forEach((tk,i)=>{
      const b=o.row?.[i]??{x:tk.x,y:ROWY+13,w:tk.pw,h:26};
      s+=`<rect x="${f2(b.x-b.w/2)}" y="${f2(b.y-b.h/2)}" width="${f2(b.w)}" height="${f2(b.h)}" rx="${f2(b.h/2)}" fill="#000" stroke="#fff" stroke-width=".7" opacity="${f3(.42*pillA)}"/>`;
      if(textA>.002)s+=`<text x="${f2(b.x)}" y="${f2(b.y+4.7)}" fill="#fff" font-family="Plex" font-weight="600" font-size="13" text-anchor="middle" opacity="${f3(.3*textA)}">${K.tok_text?.[i]??tk.w}</text>`;
    });
    // Огромная дуга над всей башней: идёт от левой ноги к правой.
    const hg=ramp(t,K.g_third+.3,K.g_third+1.75);
    if(hg>0){
      // Ноги сразу в поле x=10..352: идти к нему из-за края кадра дуге некуда.
      const a=[10,mix(P(-258,157)[1],332,dark)],b=[352,mix(P(258,157)[1],332,dark)];
      const M=[(a[0]+b[0])/2,(a[1]+b[1])/2],V=[pxy[0]-M[0],pxy[1]-M[1]];
      const pts=arcPts(a,b,[0,-1],0,hg,V);
      const op=mix(.86,.34,dark);
      s+=lines([pts],1.5,op)+lines([pts],3.4,.16*op/.86,true);
    }
    // Точка: чёрный диск отделяет её от линий, короткое тихое разгорание на K.g_creator, ядро чисто белое и ярче любой линии.
    const seen=ramp(t,K.g_creator-.05,K.g_creator+.28);
    if(seen>0){
      const fl=seen*Math.exp(-Math.max(0,t-K.g_creator-.2)*2.4),haloR=mix(16,20,dark);
      s+=`<circle cx="${f2(pxy[0])}" cy="${f2(pxy[1])}" r="${f2(5.2*seen*mix(1,1.15,dark))}" fill="#000"/>`;
      s+=`<circle cx="${f2(pxy[0])}" cy="${f2(pxy[1])}" r="${f2(haloR+10*fl)}" fill="url(#un-halo)" opacity="${f3(seen*mix(.8,1,dark))}"/>`;
      s+=`<circle cx="${f2(pxy[0])}" cy="${f2(pxy[1])}" r="${f2(mix(2.8,3.2,dark))}" fill="#fff" opacity="${f3(seen)}"/>`;
    }
    if(o.word!==false)s+=godWord(t,K);
    return s;
  }
  /* «Бог?»: своя функция, потому что слово живёт дольше наплыва сетки: un_tokens гасит его к K.next. */
  function godWord(t,K0){
    const K=keys(K0),a=ramp(t,K.g_god-.04,K.g_god+.5)*(1-ramp(t,(K0.s13a??t+9)+.06,(K0.next??t+9)-.02));
    if(a<=0)return '';
    return `<text x="180" y="196" fill="none" stroke="#000" stroke-width="9" stroke-linejoin="round" font-family="UNSerif" font-style="italic" font-size="44" text-anchor="middle" opacity="${f3(a*.92)}">Бог?</text>`+UN.italic(180,196,'Бог?',{size:44,anchor:'middle',opacity:a,glow:true});
  }

  const ORDER=['decode','spider','snake','layers','third','god'];
  const START=K=>[K.g1,K.g2,K.g3,K.g4,K.g5,K.g6];
  function modeAt(t,K){const s=START(K);let m=0;for(let i=0;i<6;i++)if(t>=s[i]-.05)m=i;return ORDER[m];}
  function body(t,K0={},mode,o={}){
    const K=keys(K0),m=ORDER.includes(mode)?mode:modeAt(t,K);
    if(m==='decode'){
      const a=ramp(t,K.g1-.05,K.g1+.55);
      const prev=a<1?(SCENES.un_towers?.body?.(t,K0,'universe')??''):'';
      return dissolve(prev,decodeBody(t,K),a);
    }
    if(m==='spider'){
      const a=ramp(t,K.g2-.05,K.g2+.35);
      return dissolve(a<1?decodeBody(t,K):'',spiderBody(t,K),a);
    }
    if(m==='snake'){
      const a=ramp(t,K.g3-.05,K.g3+.45);
      return dissolve(a<1?spiderBody(t,K):'',snakeBody(t,K),a);
    }
    if(m==='layers'){
      const a=ramp(t,K.g4-.05,K.g4+.55);
      return dissolve(a<1?snakeBody(t,K):'',netBody(t,K,o),a);
    }
    return netBody(t,K,o);
  }
  SCENES.un_observer=function(u,p={},d,t){return UN.wrap(body(t,p.K||{},p.mode));};
  SCENES.un_observer.body=body;
  SCENES.un_observer.word=godWord;
  /* Ряд пилюль кадра god: центр и размер каждой, отсюда собирается ряд un_tokens. */
  SCENES.un_observer.row=TOK.map(k=>({x:k.x,y:ROWY+13,w:k.pw,h:26}));
})();
