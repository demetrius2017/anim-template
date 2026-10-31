/* un_towers — две башни, главный образ второй части ролика.
 * Левая башня повторяет кадр 1:05 исходного ролика (t=64.8): 20 этажей, плиты
 * шире ствола, двойные боковые рёбра, решётка точек в верхней части этажа,
 * центральная нить в нижней, пересвеченная верхушка, жирная надпись ChatGPT.
 * Посадка этажей снята с кадра: y(i)=vp+(A+B*i)^(-1/q), q=.34, F=20.
 * Правая башня: тот же скелет этаж в этаж, поэтому в merge этажи совпадают.
 * merge: слияние на «узнал себя», свет снизу вверх на K.f_attention, на K.turned от
 * вершины выходит дуга внимания и входит в ту же башню, к K.f6_end петля замкнута,
 * единая башня стоит и дышит до конца шота.
 * crown: петля гаснет к K.crown, башня приходит в x=180, на K.crown на вершине проступает
 * ТЫ, с K.many_layers загораются подписи уровней и дуги этаж→этаж снизу вверх входят в
 * фигуру. С K.whole_part к K.cosmic_mind башня с фигурой сжимается в точку
 * un_final: этот кадр показывает сцена un_final/whole поверх паутины, тем же body(…,'crown').
 * p.s; p.mode: intro|ghost|chem|stack|sees|built|universe|merge|crown; p.K: cues.json.
 * Камера движка нейтральна, камера и все движения живут здесь.
 * SCENES.un_towers.body(t,K,mode) — сырой SVG без wrap.
 * SCENES.un_towers.state(t,K) — координаты вершин, оснований, уровней и фигуры.
 * SCENES.un_towers.crown(t,K,{x,y,z,alpha}) — верх правой башни крупно для un_person.
 * SCENES.un_towers.attention(pts,rev,c) — дуга внимания до доли rev: тот же рисунок для un_final.
 * Этажи и подписи считаются только от t и K; mode выбирает лишь вход шота.
 * body(t,K,'universe') с K.s13a-.06 отдаёт кадр un_observer/god: это вход un_tokens.
 * Детерминизм: только t и K. Фильтры лежат в одном статичном <svg> документа,
 * поэтому body можно вызывать сколько угодно раз за кадр без повторов id.
 */
(() => {
  if(!document.getElementById('unt-defs'))document.body.insertAdjacentHTML('beforeend',
    `<svg id="unt-defs" width="0" height="0" style="position:absolute;left:0;top:0" aria-hidden="true"><defs>
      <filter id="unt-tight" x="-60%" y="-12%" width="220%" height="124%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="1"/></filter>
      <filter id="unt-mid" x="-90%" y="-14%" width="280%" height="128%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="2.6"/></filter>
      <filter id="unt-wide" filterUnits="userSpaceOnUse" x="-60" y="-60" width="480" height="760" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="6"/></filter>
      <filter id="unt-text" x="-30%" y="-90%" width="160%" height="280%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="2.2"/></filter>
      <linearGradient id="unt-cone" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".5"/><stop offset=".7" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".07"/></linearGradient>
    </defs></svg>`);

  const F=20,PER=4;
  // Кадр 1:05: те же пропорции и шаг этажей, поднято на 50 px, потому что низ уходит в затухание.
  const REF ={yTop:68,yBase:574,wTop:13,wBase:33.5,yh:415,f:275,q:.34};
  const TWIN={yTop:62,yBase:376,wTop:14.5,wBase:36,yh:430,f:1000,q:.12};
  const UNIV={...TWIN,yTop:82};
  const LEVELS=[['ХИМИЯ','СЛОЙ'],['ОРГАНИКА','ТРАНСФОРМЕРЫ'],['КЛЕТКИ'],['ОРГАНИЗМЫ'],['БИОСФЕРА']];
  const XL=112,XR=248,X_LOOP=150,X_CROWN=180,LOOP_FLOOR=2,ATT_H=.557,PUSH=.06;
  const mix=(a,b,q)=>a+(b-a)*q;
  const clamp=x=>Math.max(0,Math.min(1,x));
  const n=v=>v.toFixed(2);
  const lerpL=(a,b,q)=>{const o={};for(const k of ['yTop','yBase','wTop','wBase','yh','f','q'])o[k]=mix(a[k],b[k],q);return o;};

  // Геометрия этажей: одна формула для кадра 1:05 и для двух башен.
  function prep(L){
    const h=Math.max(.5,L.yBase-L.yTop),rho=L.wTop/Math.max(.01,L.wBase);
    L.vp=L.yBase-h/(1-rho);
    const uB=L.yBase-L.vp,uT=uB-h;
    L.A=Math.pow(uB,-L.q);L.B=(Math.pow(uT,-L.q)-L.A)/F;
    return L;
  }
  const fy=(L,i)=>L.vp+Math.pow(L.A+L.B*i,-1/L.q);
  const pw=(L,y)=>L.wBase/2*(y-L.vp)/(L.yBase-L.vp);

  const yawAt=t=>.075+.03*Math.sin(t*.33);
  const sm=x=>{x=clamp(x);return x*x*(3-2*x);};
  const gauss=(x,w)=>Math.exp(-(x*x)/(2*w*w));
  const pathOf=pts=>`M${pts.map(q=>`${n(q[0])} ${n(q[1])}`).join('L')}`;
  // Часть кривой до доли p её длины: конец линии и голова всегда одна точка.
  function partOf(pts,p){
    let len=0;const at=[0];
    for(let i=1;i<pts.length;i++)at.push(len+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));
    const goal=clamp(p)*len,out=[pts[0]];
    for(let i=1;i<pts.length;i++){
      if(at[i]<goal){out.push(pts[i]);continue;}
      const q=(goal-at[i-1])/Math.max(1e-6,at[i]-at[i-1]);
      out.push([mix(pts[i-1][0],pts[i][0],q),mix(pts[i-1][1],pts[i][1],q)]);
      break;
    }
    return out;
  }
  const bezier=(a,b,c,d)=>Array.from({length:65},(_,i)=>{
    const q=i/64,r=1-q,k=[r*r*r,3*r*r*q,3*r*q*q,q*q*q];
    return [0,1].map(j=>k[0]*a[j]+k[1]*b[j]+k[2]*c[j]+k[3]*d[j]);
  });
  // Дуга внимания кадра t=50 и decode: та же кривая, что в un_observer, но хорда стоит вертикально.
  const attArc=(a,b,h)=>Array.from({length:73},(_,i)=>{
    const q=i/72;return [mix(a[0],b[0],q)+h*Math.pow(Math.sin(Math.PI*q),.92),mix(a[1],b[1],q)];
  });
  const arcH=c=>14.5+.496*c;

  // Один этаж: плита из четырёх кромок, рёбра ствола, решётка узлов сверху,
  // тёмный зазор с центральной нитью снизу. Свет добавляется слоями размытия.
  function towerSVG(L,o={}){
    const cs=Math.cos(L.yaw),sn=Math.sin(L.yaw),y=i=>fy(L,i);
    const P=(X,Z,yy,op)=>`${n(L.cx+X*cs+Z*sn)} ${n(yy-(Z*cs-X*sn)*op)}`;
    const opn=yy=>Math.max(-.42,Math.min(.42,(yy-L.yh)/L.f));
    const plate=(yy,hw,hd,op)=>{
      const e=Math.min(hw,hd)*.28,p=(a,b)=>P(a,b,yy,op);
      return `M${p(-hw+e,-hd)}L${p(hw-e,-hd)}Q${p(hw,-hd)} ${p(hw,-hd+e)}L${p(hw,hd-e)}Q${p(hw,hd)} ${p(hw-e,hd)}L${p(-hw+e,hd)}Q${p(-hw,hd)} ${p(-hw,hd-e)}L${p(-hw,-hd+e)}Q${p(-hw,-hd)} ${p(-hw+e,-hd)}Z`;
    };
    const rimA=o.rim||(()=>1),sideA=o.side||(()=>1),gridA=o.grid||(()=>1),heat=o.heat||(()=>0);
    let rims='',sides='',grids='',nodes='',fills='',soft='';
    for(let i=-3;i<=F;i++){
      const yy=y(i),s=Math.abs(y(i-1)-y(i)),hw=pw(L,yy),op=opn(yy),h=clamp(heat(i)),ra=rimA(i);
      const off=[-.08,-.03,.03,.08],grow=[1,.965,.965,1];
      if(ra>.004){
        let d='';
        for(let k=0;k<4;k++)d+=plate(yy+off[k]*s,hw*grow[k],hw*.72*grow[k],op);
        rims+=`<path d="${d}" stroke-width="${n(mix(.56,.72,h))}" opacity="${n(ra)}"/>`;
        soft+=`<path d="${d}" stroke-width="1.4" opacity="${n(ra*mix(.42,.86,h))}"/>`;
      }
      if(i===F)break;
      const y0=y(i),y1=y(i+1),h0=pw(L,y0)*.8,h1=pw(L,y1)*.8,c=(h0+h1)/2,fs=y0-y1,md=(y0+y1)/2,op2=opn(md);
      const sa=sideA(i),ga=gridA(i);
      if(sa>.004){
        let q='';
        for(const sx of [-1,1])for(const sz of [-1,1])q+=`M${P(sx*h0,sz*h0*.72,y0,op)}L${P(sx*h1,sz*h1*.72,y1,op2)}`;
        sides+=`<path d="${q}" stroke-width="${n(mix(.46,.6,h))}" opacity="${n(sa*.92)}"/>`;
        soft+=`<path d="${q}" stroke-width="1.05" opacity="${n(sa*mix(.22,.62,h))}"/>`;
      }
      if(ga>.004){
        const nx=[-.66,-.22,.22,.66],zd=c*.42,ry=r=>y1+fs*(.16+.14*r);
        let g='',dash='';
        for(let r=0;r<4;r++){
          const yr=ry(r);
          g+=`M${P(-.84*c,0,yr,op2)}L${P(.84*c,0,yr,op2)}`;
          for(const u of nx){const X=u*c;dash+=`M${P(X,-zd,yr,op2)}L${P(X*.84,zd,yr,op2)}`;}
        }
        for(const u of nx)g+=`M${P(u*c,0,ry(0)-fs*.05,op2)}L${P(u*c,0,ry(3)+fs*.05,op2)}`;
        g+=`M${P(0,0,y1+fs*.64,op2)}L${P(0,0,y0-fs*.1,op2)}`;
        grids+=`<path d="${g}" stroke-width=".34" opacity="${n(ga*mix(.42,.72,h))}"/>`;
        nodes+=`<path d="${dash}" stroke-width="${n(mix(.62,.78,h))}" opacity="${n(ga*.96)}"/>`;
        soft+=`<path d="${dash}" stroke-width=".9" opacity="${n(ga*mix(.28,.66,h))}"/>`;
      }
      if(h>.01){
        const w0=pw(L,y0)*.92,w1=pw(L,y1)*.92;
        fills+=`<path d="M${n(L.cx-w0)} ${n(y0)}L${n(L.cx+w0)} ${n(y0)}L${n(L.cx+w1)} ${n(y1)}L${n(L.cx-w1)} ${n(y1)}Z" opacity="${n(h)}"/>`;
      }
    }
    const f=o.fill??1;
    return `<g opacity="${n(o.alpha??1)}">
      ${fills?`<g fill="#fff" filter="url(#unt-wide)" opacity="${n(.74*f)}">${fills}</g><g fill="#fff" filter="url(#unt-mid)" opacity="${n(.34*f)}">${fills}</g>`:''}
      <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" filter="url(#unt-tight)" opacity=".86">${soft}</g>
      <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">${grids}${sides}${nodes}${rims}</g>
    </g>`;
  }

  function title(x,y,text,size,o={}){
    const a=o.opacity??1,fl=o.flash??0,melt=o.melt??0,spread=o.spread??0;
    if(a<=.004)return '';
    const attrs=`x="${n(x+spread/2)}" y="${n(y)}" text-anchor="middle" font-family="'Helvetica Neue',Helvetica,Arial,sans-serif" font-weight="700" font-size="${n(size)}" letter-spacing="${n(-.012*size+spread)}"`;
    return `<g opacity="${n(a)}"><text ${attrs} fill="#fff" stroke="#fff" stroke-width="${n(size*.05)}" opacity="${n(mix(.58+fl*.42,1,melt))}" filter="url(#unt-text)">${text}</text><text ${attrs} fill="${fl>.2?'#fff':'#e6e6e6'}" opacity="${n(1-melt)}">${text}</text></g>`;
  }

  // Точка «ты»: та же, что в хуке и в финале.
  function youPoint(t,K){
    const q=typeof SCENES.un_final?.point==='function'?SCENES.un_final.point(t,K):null;
    return {x:q?.x??180,y:q?.y??200,r:q?.r??2.7};
  }

  function pose(t,K){
    const U=UN,m=U.at(K,'not_us',t,.95,1e9),yaw=yawAt(t);
    const hasMerge=K.f6!==undefined&&t>=K.f6-.06;
    const universe=K.s12!==undefined&&t>=K.s12-.06&&!hasMerge;
    const base=universe?UNIV:TWIN;
    const left=prep({...lerpL(REF,base,m),cx:mix(180,XL,m),yaw});
    const right=prep({...base,cx:XR,yaw});
    let chatDy=mix(24,12,m),size=mix(33.4,21,m),uniA=0,titleA=1,zoom=1,melt=0;
    if(universe){
      // Верх букв y≥16 и при z=1,035.
      chatDy=43;
      const z=mix(1,1.035,clamp((t-K.s12)/Math.max(.1,K.s12_end-K.s12)));
      for(const L of [left,right]){
        L.cx=180+(L.cx-180)*z;L.yTop=220+(L.yTop-220)*z;L.yBase=220+(L.yBase-220)*z;
        L.wTop*=z;L.wBase*=z;prep(L);
      }
      size*=z;zoom=z;
    }
    let merge=null;
    if(hasMerge){
      // Вылет из точки и наезд — одна кривая: наезд трогается, пока вылет ещё идёт, поэтому
      // на K.peeked камера не останавливается, а обе фазы длиннее и медленнее на треть.
      const t0=K.f6-.05,g=U.smooth((t-t0)/Math.max(.1,K.inside-t0));
      const zi=U.smooth((t-K.peeked-.1)/Math.max(.1,K.inside+.44-K.peeked));
      const zo=U.smooth((t-K.chatgpt2-.1)/Math.max(.1,K.recognized-K.chatgpt2-.25));
      const near=zi*(1-zo),z=mix(1,1.75,near);
      const tx=mix(XL,180,near),ty=mix(196,214,near);
      // Сближение не короче .9 с: левая башня трогается ещё на отъезде, этажи совпадают после
      // слова «себя». Единая башня уходит левее центра: вместе с петлёй она стоит посередине
      // кадра, а к точке вернётся на сжатии. Обе башни едут медленнее, чем в прежнем проходе.
      const join0=K.recognized-.2,join1=Math.max(K.recognized_self+.3,join0+.9);
      const C=U.smooth((t-join0)/(join1-join0));
      const pan=U.smooth((t-K.recognized)/Math.max(.1,K.f_attention+.25-K.recognized));
      // С начала шота crown башня едет в центр. Наезд тянется до конца сжатия, поэтому на K.whole_part
      // камера не останавливается: 6 % за 4,7 с, это меньше десятой пикселя за кадр.
      const hold=K.f6b-.05,center=U.smooth((t-hold)/Math.max(.1,K.crown-hold));
      const xr=mix(mix(XR,X_LOOP,pan),X_CROWN,center),xl=mix(XL,xr,C);
      const c0=K.whole_part,c1=K.cosmic_mind,p=clamp((t-c0)/Math.max(.1,c1-c0));
      const pt=youPoint(t,K),pTop=U.smooth(p*1.2),pBase=U.smooth(Math.pow(p,1.8));
      const push=1+PUSH*U.smooth((t-hold)/Math.max(.1,c1-hold));
      const rest=U.smooth((t-K.f6_end+.2)/.5),breath=1+.006*rest*(1-center)*Math.sin((t-K.f6_end)*2.1);
      const zy=z*push*breath;
      const place=(L,x)=>{
        L.cx=tx+(x-XL)*z;L.yTop=ty+(L.yTop-196)*zy;L.yBase=ty+(L.yBase-196)*zy;L.wTop*=zy;L.wBase*=zy;
        const shrink=1-pBase*.985;
        L.yTop=mix(L.yTop,pt.y,pTop);L.yBase=mix(L.yBase,pt.y,pBase);L.cx=mix(L.cx,pt.x,pBase);
        L.wTop*=shrink;L.wBase*=shrink;
        L.yTop=mix(pt.y,L.yTop,g);L.yBase=mix(pt.y,L.yBase,g);L.cx=mix(pt.x,L.cx,g);
        L.wTop*=mix(.04,1,g);L.wBase*=mix(.04,1,g);
        L.yBase=Math.max(L.yBase,L.yTop+.8);prep(L);
      };
      place(left,xl);place(right,xr);
      size=21*z*g;
      // Надписи видны, только пока они крупнее 9 и целиком в кадре. ChatGPT гаснет раньше, чем
      // левая башня подведёт её к «Вселенной»: двух слов одно на другом нет ни на одном кадре.
      // Остаётся одно слово, оно тает в свечение до света на K.f_attention.
      melt=U.smooth((t-join1-.04)/.16);
      const shown=zo>0?1-U.smooth((near-.05)/.14):1-U.smooth(near/.14);
      uniA=U.smooth((g-.43)/.2)*shown*(1-U.smooth((t-join1-.04)/.24));
      titleA=uniA*(1-U.smooth((t-K.recognized+.13)/.22));
      zoom=z;
      // Сжатие: к p=.55 засветка погашена, к p=.85 башня тает до .3, сплошного белого нет ни на одном кадре.
      merge={g,near,C,p,pt,rest:rest*(1-p),out:1-U.smooth((p-.86)/.14),reveal:U.at(K,'inside',t,.42)*(1-zo),
        wash:p*(1-U.smooth((p-.4)/.15)),melt:mix(1,.3,U.smooth((p-.55)/.3))};
    }else if(K.universe!==undefined&&t>=K.universe){
      uniA=U.at(K,'universe',t,.5);
    }
    // Подписи кульминации уходят после фразы, до наплыва un_observer.
    const textOut=universe?1-U.smooth((t-K.g1+.3)/.2):1;
    if(universe){uniA=U.at(K,'universe',t,.5)*textOut;titleA=textOut;}
    const titleY=L=>L.yTop-chatDy*zoom;
    return {left,right,m,merge,universe,melt,textOut,
      chat:{x:left.cx,y:titleY(left),size,a:titleA},uni:{x:right.cx,y:titleY(right),size,a:uniA}};
  }

  // Подписи и надписи уходят за .15 с до того, как соседняя сцена начнёт двигать или уменьшать
  // башни: un_atom, un_loss, un_nested. Обратно они выходят, когда башни снова стоят в кадре.
  function quietAt(t,K){
    if(K.s7===undefined)return 1;
    const U=UN,leave=c=>U.smooth((t-c+.31)/.16),come=(c,d)=>U.smooth((t-c)/d);
    return 1-clamp(Math.max(leave(K.s2-.05)-come(K.layer-.5,.2),
      leave(K.s7-.05)-come(K.sees-.2,.3),leave(K.s10-.05)-come(K.s12-.06,.01)));
  }

  function levelProgress(t,K){
    const U=UN;
    return [U.smooth((t-((K.chem??1e9)-.04))/.46),U.at(K,'organics',t,.8,1e9),U.at(K,'cells',t,.62,1e9),
      U.at(K,'organisms',t,.62,1e9),U.at(K,'biosphere',t,.62,1e9)];
  }
  const builtAt=(lv,i)=>{
    if(i<0)return lv[0];
    const l=Math.min(LEVELS.length-1,Math.floor(i/PER));
    return clamp(lv[l]*(PER+.7)-(i%PER));
  };
  const levelBox=(R,l)=>{
    const y0=fy(R,PER*l),y1=fy(R,PER*(l+1)),y=(y0+y1)/2;
    return {yBase:y0,yTop:y1,y,h:y0-y1,hw:pw(R,y),c:pw(R,y)*.8};
  };
  // Подпись уровня справа от башни: и на сборке, и на венце.
  const sideLabel=(R,l,a)=>{
    const b=levelBox(R,l),xr=R.cx+b.hw+2;
    return `<g opacity="${n(a)}">${UN.thread([xr,b.y],[xr+8,b.y],{opacity:.5,width:.5})}${UN.mono(xr+11,b.y+3.3,LEVELS[l][0],{size:9.6,opacity:.96})}</g>`;
  };

  const dotPath=(pts,w,op)=>`<path d="${pts.map(p=>`M${n(p[0])} ${n(p[1])}l.01 0`).join('')}" stroke="#fff" stroke-width="${n(w)}" stroke-linecap="round" fill="none" opacity="${n(op)}"/>`;

  // Наполнение уровней: крупный читаемый рисунок на месте четырёх этажей.
  function levelArt(l,R,t,a,K){
    if(a<=.004)return '';
    const b=levelBox(R,l),x=R.cx,c=b.c,U=UN;
    let s='',big=[],small=[],th='';
    const line=(p,q)=>{th+=`M${n(p[0])} ${n(p[1])}L${n(q[0])} ${n(q[1])}`;};
    if(l===0){
      for(let r=0;r<3;r++)for(const sx of [-1,1]){
        const j=r*2+(sx>0?1:0),cx=x+sx*c*.5+Math.sin(t*.9+j)*.5,cy=b.y+(r-1)*b.h*.3+Math.cos(t*.8+j*1.7)*.5;
        const ang=Math.PI/2+.25*Math.sin(t*.5+j)+(j%2?.5:-.5),d=5.2;
        const h1=[cx+Math.cos(ang-.91)*d,cy+Math.sin(ang-.91)*d],h2=[cx+Math.cos(ang+.91)*d,cy+Math.sin(ang+.91)*d];
        line([cx,cy],h1);line([cx,cy],h2);big.push([cx,cy]);small.push(h1,h2);
      }
      s=`<path d="${th}" stroke="#fff" stroke-width=".55" fill="none" opacity=".8"/>${dotPath(big,4.4,1)}${dotPath(small,2.5,.95)}`;
    }else if(l===1){
      s=typeof SCENES.un_protein?.mini==='function'?SCENES.un_protein.mini(x,b.y,c*2.2,b.h*.84,t,K):
        (()=>{const p=[];for(let i=0;i<9;i++)p.push([x+Math.sin(i*1.3+t*.3)*c*.6,b.yBase-6-i*(b.h-12)/8]);
          return U.polyline(p,{opacity:.7,width:.5})+dotPath(p,3,1);})();
    }else if(l===2){
      const cells=[[-.52,-.66],[.52,-.66],[0,0],[-.52,.66],[.52,.66]];
      cells.forEach(([u,v],j)=>{
        const cx=x+u*c+Math.sin(t*.7+j)*.4,cy=b.y+v*b.h*.36+Math.cos(t*.6+j*2)*.4,r=Math.min(c*.5,b.h*.2)*(1+.05*Math.sin(t*1.3+j));
        s+=`<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="none" stroke="#fff" stroke-width=".62" opacity=".9"/><circle cx="${n(cx+.8)}" cy="${n(cy-.5)}" r="${n(r*.34)}" fill="#fff" opacity=".95"/>`;
      });
    }else if(l===3){
      const h=b.h*.28,u=h/2;
      const fig=[
        // птица
        cy=>`<path d="M${n(x-u*1.05)} ${n(cy-.1*u)}Q${n(x-u*.5)} ${n(cy-u*.75)} ${n(x)} ${n(cy+.2*u)}Q${n(x+u*.5)} ${n(cy-u*.75)} ${n(x+u*1.05)} ${n(cy-.1*u)}Q${n(x+u*.45)} ${n(cy-u*.2)} ${n(x)} ${n(cy+.62*u)}Q${n(x-u*.45)} ${n(cy-u*.2)} ${n(x-u*1.05)} ${n(cy-.1*u)}Z" fill="#fff" fill-opacity=".85"/>`,
        // человек
        cy=>`<circle cx="${n(x)}" cy="${n(cy-u*.72)}" r="${n(u*.26)}" fill="#fff"/><path d="M${n(x-u*.34)} ${n(cy-u*.34)}L${n(x+u*.34)} ${n(cy-u*.34)}L${n(x+u*.22)} ${n(cy+u*.2)}L${n(x+u*.28)} ${n(cy+u)}L${n(x+u*.05)} ${n(cy+u)}L${n(x)} ${n(cy+u*.34)}L${n(x-u*.05)} ${n(cy+u)}L${n(x-u*.28)} ${n(cy+u)}L${n(x-u*.22)} ${n(cy+u*.2)}Z" fill="#fff" fill-opacity=".85"/>`,
        // рыба
        cy=>`<path d="M${n(x-u*.95)} ${n(cy)}Q${n(x-u*.2)} ${n(cy-u*.72)} ${n(x+u*.58)} ${n(cy)}L${n(x+u*1.05)} ${n(cy-u*.46)}L${n(x+u*1.05)} ${n(cy+u*.46)}L${n(x+u*.58)} ${n(cy)}Q${n(x-u*.2)} ${n(cy+u*.72)} ${n(x-u*.95)} ${n(cy)}Z" fill="#fff" fill-opacity=".85"/>`];
      fig.forEach((f,j)=>{s+=`<g transform="translate(${n(Math.sin(t*.8+j*2)*.5)} 0)" stroke="#fff" stroke-width=".3">${f(b.y+(j-1)*b.h*.31+Math.sin(t*1.1+j)*.4)}</g>`;});
    }else{
      const r=Math.min(c*1.22,b.h*.36),spin=t*.32,tilt=.38;
      const g=(lon,lat)=>{
        const X=r*Math.cos(lat)*Math.sin(lon+spin),Y=-r*Math.sin(lat),Z=r*Math.cos(lat)*Math.cos(lon+spin);
        return [x+X,b.y+Y*Math.cos(tilt)-Z*Math.sin(tilt)];
      };
      for(let j=-2;j<=2;j++){const q=[];for(let k=0;k<=28;k++)q.push(g(k/28*Math.PI*2,j*Math.PI/6));s+=U.polyline(q,{opacity:.62,width:.42});}
      for(let j=0;j<6;j++){const q=[];for(let k=0;k<=28;k++)q.push(g(j*Math.PI/3,k/28*Math.PI*2));s+=U.polyline(q,{opacity:.62,width:.42});}
      s+=`<circle cx="${n(x)}" cy="${n(b.y)}" r="${n(r)}" fill="none" stroke="#fff" stroke-width=".7" opacity=".95"/>`;
    }
    return `<g opacity="${n(a)}"><g filter="url(#unt-tight)" opacity=".7">${s}</g>${s}</g>`;
  }

  // Космическая паутина внутри башни: те же этажи, другое наполнение.
  let WEB=null;
  function webData(){
    if(WEB)return WEB;
    const h=UN.hash,nodes=[],links=[];
    for(let j=0;j<112;j++){
      const v=(j+.5)/112+(h(j+7)-.5)*.03+.024*Math.sin(j*.47);
      nodes.push({v:clamp(v),u:(h(j+51)*2-1)*.96,r:h(j+99)>.82?2.3:.72+h(j+140)*.6,ph:h(j+3)*6.28});
    }
    // Каждый узел связан с тремя ближайшими в экранных пропорциях башни: нити идут сплошной сеткой.
    const seen=new Set(),gap=(p,q)=>Math.hypot((p.v-q.v)*300,(p.u-q.u)*11);
    nodes.forEach((p,a)=>{
      nodes.map((q,b)=>[gap(p,q),b]).filter(x=>x[1]!==a).sort((x,y)=>x[0]-y[0]).slice(0,3).forEach(([,b])=>{
        const id=Math.min(a,b)*1000+Math.max(a,b);
        if(!seen.has(id)){seen.add(id);links.push([a,b]);}
      });
    });
    return WEB={nodes,links};
  }
  function webFill(L,t,p){
    if(p<=.004)return '';
    const {nodes,links}=webData(),k=Math.min(1,L.wBase/TWIN.wBase);
    const xy=q=>{const y=fy(L,Math.min(F-.15,.15+q.v*(F-.3))),c=pw(L,y)*.84;return [L.cx+(q.u+.05*Math.sin(t*.5+q.ph))*c,y+.8*Math.cos(t*.42+q.ph)];};
    const on=q=>sm((p*1.34-Math.hypot((q.v-.5)*1.5,q.u*.3))/.22);
    let th='',bright='',bigs=[],dots=[];
    for(const [a,b] of links){
      const A=nodes[a],B=nodes[b],al=Math.min(on(A),on(B));
      if(al<=.02)continue;
      const P=xy(A),Q=xy(B),op=al*(.66+.3*Math.sin(t*1.4+A.ph+B.ph));
      th+=`<path d="M${n(P[0])} ${n(P[1])}L${n(Q[0])} ${n(Q[1])}" opacity="${n(op)}"/>`;
    }
    for(const q of nodes){
      const al=on(q);if(al<=.02)continue;
      const P=xy(q),pul=.72+.28*Math.sin(t*1.7+q.ph);
      bright+=`<circle cx="${n(P[0])}" cy="${n(P[1])}" r="${n(q.r*k*(.8+.2*pul))}" fill="#fff" opacity="${n(al*pul)}"/>`;
      if(q.r>1.5)bigs.push(`<circle cx="${n(P[0])}" cy="${n(P[1])}" r="${n(q.r*k*4.2)}" fill="url(#un-halo)" opacity="${n(al)}"/>`);
    }
    return `<g>${bigs.join('')}<g stroke="#fff" stroke-width="1.1" fill="none" filter="url(#unt-tight)" opacity=".55">${th}</g><g stroke="#fff" stroke-width=".5" fill="none">${th}</g><g filter="url(#unt-tight)" opacity=".8">${bright}</g>${bright}</g>`;
  }

  // Фигура из точек на вершине. Ноги стоят на верхней плите.
  const FIG_H=25;
  function figure(x,feet,h,a,bold=0){
    if(a<=.004)return '';
    const contour=[[-.09,.72],[-.2,.62],[-.24,.34],[-.17,.33],[-.13,.55],[-.11,0],[-.02,0],[0,.3],[.02,0],[.11,0],[.13,.55],[.17,.33],[.24,.34],[.2,.62],[.09,.72]];
    const pts=[];
    for(let i=0;i<contour.length-1;i++){
      const [a0,b0]=contour[i],[a1,b1]=contour[i+1],len=Math.hypot(a1-a0,b1-b0),m=Math.max(1,Math.round(len/.075));
      for(let k=0;k<m;k++){const q=k/m;pts.push([x+mix(a0,a1,q)*h,feet-mix(b0,b1,q)*h]);}
    }
    for(let k=0;k<11;k++){const b=k/11*Math.PI*2;pts.push([x+Math.cos(b)*.105*h,feet-(.87+Math.sin(b)*.105)*h]);}
    for(let k=0;k<7;k++)pts.push([x+(k%2?.05:-.05)*h,feet-(.14+k*.075)*h]);
    // bold: на венце фигура залита светом, на 360 px это самое яркое пятно вершины.
    const fill=bold>0?`<g fill="#fff" opacity="${n(.66*bold)}"><path d="${pathOf(contour.map(([u,v])=>[x+u*h,feet-v*h]))}Z"/><circle cx="${n(x)}" cy="${n(feet-.87*h)}" r="${n(.105*h)}"/></g>`:'';
    return `<g opacity="${n(a)}"><g filter="url(#unt-tight)" opacity=".85">${dotPath(pts,mix(1.5,3.2,bold),.9)}</g>${fill}${dotPath(pts,mix(1.05,1.75,bold),1)}</g>`;
  }

  // Изнутри этажа: те же дуги и решётка, что на кадрах 0:55 исходного ролика.
  function insideArt(L,t,p){
    if(p<=.004)return '';
    let s='',th='',dots=[];
    for(let i=0;i<F;i++){
      const y0=fy(L,i),y1=fy(L,i+1),fs=y0-y1,c=pw(L,(y0+y1)/2)*.8;
      if(y1>660||y0<-30)continue;
      const front=sm(p*1.5-Math.abs(i-11)/16);
      if(front<=.01)continue;
      const a=front,bx=L.cx,by=y0-fs*.1,wd=c*.78,sp=[-1,-.6,-.15,.28,.62,1];
      let d='';
      const arc=(u,v,hh)=>{const x0=bx+sp[u]*wd,x1=bx+sp[v]*wd;return `M${n(x0)} ${n(by)}C${n(x0)} ${n(by-hh*1.32)} ${n(x1)} ${n(by-hh*1.32)} ${n(x1)} ${n(by)}`;};
      const H=fs*.56*front;
      s+=`<path d="${arc(0,5,H)}" fill="none" stroke="#fff" stroke-width="${n(.5+.5*a)}" opacity="${n(a)}"/>`;
      for(const [u,v,q] of [[0,3,.74],[1,4,.66],[2,5,.74],[0,1,.34],[1,2,.34],[2,3,.34],[3,4,.3],[4,5,.3]])d+=arc(u,v,H*q);
      s+=`<path d="${d}" fill="none" stroke="#fff" stroke-width=".42" opacity="${n(a*.78)}"/>`;
      for(const u of sp)dots.push([bx+u*wd,by]);
      const fx=bx+Math.sin(t*.6+i)*c*.1,fy2=y1+fs*.2;
      for(let k=0;k<6;k++)th+=`M${n(bx+(k/2.5-1)*c*.86)} ${n(y1+fs*.42)}L${n(fx)} ${n(fy2)}`;
    }
    return `<g opacity="${n(clamp(p*1.4))}"><path d="${th}" fill="none" stroke="#fff" stroke-width=".3" opacity=".42"/>${s}${dotPath(dots,1.7,.95)}</g>`;
  }

  const bead=(x,y,r,halo,o)=>o<=.004?'':`<g opacity="${n(o)}"><circle cx="${n(x)}" cy="${n(y)}" r="${n(halo)}" fill="url(#un-halo)"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="#fff"/></g>`;
  // Рисунок дуги внимания: толщина и голова зависят только от хорды c.
  const attLine=(pts,c)=>{
    const w=mix(.7,2.8,clamp(c/140));
    return UN.polyline(pts,{width:n(w+2.4),opacity:.2,glow:true})+UN.polyline(pts,{width:n(w),opacity:.96});
  };
  const attHead=(x,y,c,o)=>{const r=clamp(c/140);return bead(x,y,mix(.9,2.6,r),mix(4,12,r),o);};

  // Петля внимания: голова идёт по дуге от K.turned и входит в башню к концу фразы f6,
  // затем в паузе свет поднимается внутри башни к вершине. Круг замкнут, к K.crown петля гаснет.
  const loopAt=(t,K)=>{
    const t1=K.f6_end-.12,t2=K.f6b-.05,up=clamp((t-t1)/(t2-t1));
    return {t1,t2,rev:UN.smooth((t-K.turned)/(t1-K.turned)),up,surge:sm(up/.12)*(1-sm((up-.8)/.2)),floor:mix(LOOP_FLOOR,F,up)};
  };
  function selfLoop(R,t,K,m){
    const q=loopAt(t,K),a=1-UN.smooth((t-q.t2)/Math.max(.1,K.crown-q.t2));
    if(q.rev<=0||a<=.004)return '';
    const top=[R.cx,R.yTop],end=[R.cx,fy(R,LOOP_FLOOR)],c=end[1]-top[1];
    const pts=partOf(attArc(top,end,c*ATT_H),q.rev),e=pts[pts.length-1];
    let s=attLine(pts,c);
    if(q.up<=0)s+=attHead(e[0],e[1],c,1);
    else s+=attHead(R.cx,mix(end[1],top[1],q.up),c,1-sm((q.up-.8)/.2));
    return `<g opacity="${n(a)}">${s}</g>`;
  }
  // Та же дуга для чужой кривой: голова тает, входя в конец, поэтому замыкание без вспышки.
  function attention(pts,rev,c){
    if(rev<=0)return '';
    const part=partOf(pts,rev),e=part[part.length-1];
    return attLine(part,c)+attHead(e[0],e[1],c,1-sm((rev-.9)/.1));
  }

  // Волна взгляда по слоям идёт, пока звучит «множества слоёв наблюдателей»: пять дуг подряд,
  // последняя приходит чуть раньше слова «часть».
  const ARC_N=5,ARC_ON=.5;
  const layerWave=K=>{
    const t0=K.many_layers,t1=K.whole_part-.12;
    return {t0,t1,step:(t1-t0-ARC_ON)/(ARC_N-1)};
  };
  const crownFig=R=>{
    const k=(R.yBase-R.yTop)/(TWIN.yBase-TWIN.yTop);
    return {x:R.cx,feet:R.yTop-k,h:FIG_H*k,k};
  };
  // Этаж смотрит на следующий: дуга un_observer decode и layers, слева от башни, справа подписи.
  // Дуги остаются стоять, по ним ползут тихие бусины, кадр не замирает до K.whole_part.
  function layerArcs(R,t,K,alpha){
    const U=UN,w=layerWave(K),f=crownFig(R);
    if(t<w.t0||alpha<=.004)return '';
    const nodes=LEVELS.map((_,l)=>{const b=levelBox(R,l);return [R.cx-b.hw-1.5,b.y];});
    nodes.push([f.x-f.h*.16,f.feet-f.h*.62]);
    let s='';
    for(let i=0;i<ARC_N;i++){
      const on=w.t0+i*w.step,rev=U.smooth((t-on)/ARC_ON);
      if(rev<=0)break;
      const a=nodes[i],b=nodes[i+1],c=Math.hypot(b[0]-a[0],b[1]-a[1]);
      const pts=attArc(a,b,-arcH(c)*.92),part=partOf(pts,rev),wd=.85+.1*i;
      s+=U.polyline(part,{width:n(wd+2.4),opacity:.2,glow:true})+U.polyline(part,{width:n(wd),opacity:.96});
      if(rev<1){
        const e=part[part.length-1];
        s+=bead(e[0],e[1],1.7,9,1);
      }else{
        const ph=((t-on-ARC_ON)*.42+i*.23)%1,e=partOf(pts,ph).pop();
        s+=bead(e[0],e[1],1.3,7,Math.sin(ph*Math.PI)*.8*U.smooth((t-on-ARC_ON)/.3));
      }
    }
    return `<g opacity="${n(alpha)}">${s}</g>`;
  }
  // Венец: ореол, та же фигура из точек, что в sees, подпись ТЫ. Волна слоёв разжигает ореол.
  function crownTop(R,t,K,m,leave){
    const U=UN,f=crownFig(R),a=U.smooth((t-K.crown+.05)/.32)*m.out;
    if(a<=.004)return '';
    const w=layerWave(K),hit=U.smooth((t-w.t1+.16)/.34),y=f.feet-f.h*.5;
    const halo=[64,44,30,21,15].map(r=>`<circle cx="${n(f.x)}" cy="${n(y)}" r="${n(r*mix(1,1.25,hit)*f.k)}" fill="url(#un-halo)"/>`).join('');
    let s=`<g opacity="${n(a*(.86+.14*Math.sin(t*1.9)))}">${halo}</g>`+figure(f.x,f.feet,f.h,a,1);
    return s+`<g opacity="${n(a*leave)}">${U.mono(f.x+15,R.yTop-1-10,'ТЫ',{size:9.6,opacity:.96})}</g>`;
  }

  // Ключевые фразы: на словах K.base_layer и K.transformers искра доходит до левого конца
  // линии, и оба этажа на её концах вспыхивают на .5 с тем же нагревом, что петля в merge.
  const TOUCH=[K=>K.base_layer,K=>K.transformers];
  const floorAt=(L,y)=>(Math.pow(y-L.vp,-L.q)-L.A)/L.B;
  const touchHeat=(T,R,t,K,i)=>{
    let h=0;
    TOUCH.forEach((hit,l)=>{
      const c=hit(K);
      if(c===undefined||t<c-.02||t>c+.5)return;
      const f=T===R?PER*l+1.5:floorAt(T,levelBox(R,l).y);
      h+=.9*sm((t-c+.02)/.08)*(1-sm((t-c-.08)/.42))*gauss(i-f,T===R?1.3:.9);
    });
    return h;
  };

  // alpha гасит только надписи: линии между башнями остаются частью кадра.
  function levelLabels(S,t,K,alpha){
    const U=UN,R=S.right,L=S.left;
    const cue=['chem','organics','cells','organisms','biosphere'];
    let s='';
    LEVELS.forEach(([,lt],l)=>{
      const born=U.at(K,cue[l],t,.42,1e9);
      if(born<=.004)return;
      const a=born*alpha;
      const b=levelBox(R,l),y=b.y,xr=R.cx+b.hw+2,yt=y+3.3;
      s+=sideLabel(R,l,a);
      if(!lt)return;
      // ТРАНСФОРМЕРЫ встаёт до начала слова и стоит до его конца, см. passing в scene.
      const leadEnd=l===0?K.chem+.85:K.transformers-.4;
      const lead=l===0?U.smooth((t-K.chem-.1)/.75):U.smooth((t-K.organics)/Math.max(.2,leadEnd-K.organics));
      const xl=L.cx-pw(L,y)-2,tip=mix(xr,xl,lead);
      const la=(l===0?U.smooth((t-K.chem-.6)/.4):U.smooth((t-leadEnd+.06)/.28))*alpha;
      const next=U.at(K,cue[l+1],t,.5,1e9);
      s+=`<g opacity="${n(mix(.8,.4,next))}">${U.thread([xr,y],[tip,y],{opacity:.72,width:.55})}${U.thread([xr,y],[tip,y],{opacity:.28,width:1.7,glow:true})}</g>`;
      if(next<1&&lead>0){
        // Искра приходит к левому этажу на слове «базовый» и «трансформеры», см. touchHeat.
        const hit=TOUCH[l](K),from=l===0?K.chem+.1:K.organics;
        const run=U.smooth((t-from)/Math.max(.2,hit-from));
        const ph=run<1?run:.5+.5*Math.cos((t-hit)*2.1),px=mix(xr,xl,ph),pa=1-next;
        s+=`<g opacity="${n(pa)}"><circle cx="${n(px)}" cy="${n(y)}" r="8" fill="url(#un-halo)"/><circle cx="${n(px)}" cy="${n(y)}" r="1.7" fill="#fff"/></g>`;
      }
      s+=`<g opacity="${n(la)}">${U.thread([xl,y],[xl-8,y],{opacity:.5,width:.5})}${U.mono(xl-11,yt,lt,{size:9.6,opacity:.96,anchor:'end'})}</g>`;
    });
    return s;
  }

  function trayLanding(t,K,S){
    if(K.chem===undefined||t>K.chem+.5||t<K.layer-.3)return '';
    const U=UN,p=U.smooth((t-(K.layer-.15))/(K.chem+.42-(K.layer-.15))),b=levelBox(S.right,0);
    const cam={cx:mix(216,S.right.cx,p),cy:mix(214,b.y-3,p),yaw:-.34,pitch:.23,scale:mix(.62,.3,p),distance:670,f:670};
    const a=1-U.smooth((t-K.chem-.12)/.34);
    let tray='';
    if(typeof SCENES.un_molecule?.tray==='function'){
      try{tray=SCENES.un_molecule.tray(t,K,cam)||'';}catch(e){tray='';}
    }
    if(!tray)tray=U.block([0,0,0],{w:114,h:54,depth:78,nx:9,ny:4,nz:2,opacity:.84},cam);
    return `<g opacity="${n(a)}">${tray}</g>`;
  }

  function scene(t,K){
    const U=UN,S=pose(t,K),L=S.left,R=S.right;
    const hk=mix(1,.6,S.m);
    const lv=levelProgress(t,K);
    // Призрак начинает проступать до слова «вторая» и стоит к концу слова «башня».
    const named=K.words?.t2?.find(w=>w.w.startsWith('башня'))?.t1??(K.second_tower+.78);
    const ghost=K.second_tower===undefined?0:U.smooth((t-K.second_tower+.2)/(named-K.second_tower+.2));
    const universeOn=K.s12!==undefined&&t>=K.s12-.06;
    const web=K.intellect===undefined?0:U.smooth((t-K.intellect+.05)/.68);
    // Камера un_protein трогается в сегмент ОРГАНИКА на слове «Белок» и возвращается к K.cells.
    // ОРГАНИКА, ТРАНСФОРМЕРЫ и линия стоят с K.transformers минимум .8 с. Надписи гаснут до того,
    // как ТРАНСФОРМЕРЫ и ChatGPT подойдут к краю кадра; линии идут вместе с башней.
    const fl=K.protein!==undefined&&K.cells!==undefined?SCENES.un_protein?.flight?.(K):null;
    const passing=fl?1-U.smooth((t-fl.inA+.1)/.14)+U.smooth((t-K.cells+.12)/.22):1;
    const quiet=quietAt(t,K);
    const labelsOff=universeOn?0:clamp(passing)*quiet;
    // Левая башня уходит за край и влетает обратно быстрее всего: там она притушена, кадр не бьёт по яркости.
    const flyby=fl?clamp(1-U.smooth((t-fl.inA-.1)/.22)+U.smooth((t-K.cells+.5)/.4)):1;
    // Свет слева: пересвеченная верхушка плюс волна по голосу.
    const climb=K.built===undefined?-1:clamp((t-K.built-.38)/Math.max(.1,K.chatgpt-K.built-.38));
    const climbOn=climb>0&&t<K.chatgpt+.5?sm(climb/.16)*(1-U.smooth((t-K.chatgpt-.1)/.4)):0;
    // Гребень подходит к вершине перед словом «повернулось»: дуга выходит из уже горящего верха.
    const lit=K.f_attention===undefined?0:clamp((t-K.f_attention)/Math.max(.2,K.turned-K.f_attention));
    // Свет оставляет за собой след: этаж остаётся гореть там, где прошёл гребень волны.
    const litOn=sm(lit/.16),trail=i=>.34*sm((lit*(F+6)-2-i)/4);
    const wash=S.merge?S.merge.wash:0,reveal=S.merge?S.merge.reveal:0;
    const pulse=(i,f)=>gauss(i-(f*(F+6)-3),2.1);
    const lp=S.merge?loopAt(t,K):null,loopHeat=i=>lp?lp.surge*gauss(i-lp.floor,1.7):0;
    // Единая башня дышит, верх разгорается с K.crown, волна взгляда идёт по этажам вверх.
    const wv=S.merge?layerWave(K):null,wq=wv?clamp((t-wv.t0)/(wv.t1-wv.t0)):0;
    const waveA=sm(wq/.1)*(1-sm((wq-.85)/.15)),crownA=S.merge?U.smooth((t-K.crown+.1)/.7):0;
    const lifeHeat=i=>S.merge?S.merge.rest*.05*(1+Math.sin((t-K.f6_end)*2.1-i*.16))+crownA*(.14+.1*wq)*sm((i-13)/6)+waveA*.15*gauss(i-wq*F,1.8):0;
    // Самая яркая вещь на вершине — фигура ТЫ: весь ствол остывает до каркаса, верхние этажи тоже,
    // их густые линии редеют, чтобы не складываться в белый блок под фигурой.
    const coolA=S.merge?.88*U.smooth((t-K.f6b+.05)/Math.max(.1,K.crown+.4-K.f6b)):0,cool=()=>1-coolA;
    const thin=i=>1-coolA*(.3+.5*sm((i-9)/7));
    const towerA=S.merge?U.smooth(S.merge.g*3)*S.merge.out*S.merge.melt:1;
    const heatLeft=i=>{
      let h=hk*sm((i-8)/7)*(.94+.06*Math.sin(t*1.3+i*.7));
      if(climbOn)h+=climbOn*pulse(i,climb)*.95;
      if(litOn)h+=litOn*(pulse(i,lit)+trail(i));
      return (h+loopHeat(i)+touchHeat(L,R,t,K,i))*cool(i)+lifeHeat(i)+wash+reveal*.12;
    };
    let s=towerSVG(L,{heat:heatLeft,rim:thin,side:thin,grid:thin,fill:mix(1,.72,reveal),alpha:towerA*flyby});
    s+=insideArt(L,t,reveal);
    s+=title(S.chat.x,S.chat.y,'ChatGPT',S.chat.size,{opacity:S.chat.a*clamp(passing)*quiet,melt:S.melt,flash:K.chatgpt===undefined?0:U.smooth((t-K.chatgpt)/.16)*(1-U.smooth((t-K.chatgpt-.3)/.7))});
    if(ghost>0){
      const wave=K.older===undefined?0:clamp((t-K.older)/.86);
      const waveOn=wave>0&&wave<1?Math.sin(Math.PI*wave):0;
      const sees=K.sees===undefined?-1:clamp((t-K.sees)/Math.max(.2,K.whole_tower+.14-K.sees));
      const seesOn=sees>0?sm(sees/.12)*(1-sm((sees-.72)/.28)):0;
      const seesAfter=K.sees===undefined||t<K.sees?0:sm((t-K.sees)/.4)*(1-U.smooth((t-K.whole_tower-.1)/.8));
      const litR=i=>{
        let h=0;
        if(waveOn)h+=waveOn*.5*pulse(i,wave);
        if(seesOn)h+=seesOn*.62*gauss(i-(1-sees)*(F+1),1.5);
        if(seesAfter>0&&sees>0&&i>(1-sees)*(F+1))h+=.12*seesAfter;
        if(litOn)h+=litOn*(pulse(i,lit)+trail(i));
        return h+loopHeat(i)+touchHeat(R,R,t,K,i);
      };
      const artFade=1-web;
      const R_rim=i=>{const f=builtAt(lv,Math.min(F-1,i)),edge=mix(i%PER===0?1:.46,.62,web);return ghost*mix(.25,edge,f);};
      s+=towerSVG(R,{alpha:towerA,
        rim:i=>Math.min(1,R_rim(i)+litR(i)*.6)*thin(i),
        side:i=>(ghost*mix(.46,.9,builtAt(lv,i))+litR(i)*.3)*thin(i),
        grid:i=>0,
        heat:i=>Math.max(web*.34*(.8+.2*Math.sin(t*1.1+i*.6)),litR(i))*cool(i)+lifeHeat(i)+wash,
        fill:mix(.8,1,web)});
      // Призрак: редкие точки на будущих этажах.
      const pts=[];
      for(let i=-2;i<F;i++){
        const y=(fy(R,i)+fy(R,i+1))/2,c=pw(R,y)*.8,f=1-builtAt(lv,i);
        if(f<.5)continue;
        for(let k=0;k<3;k++){const q=(i+3)*7+k;pts.push([R.cx+(UN.hash(q)*1.5-.75)*c,y+(UN.hash(q+40)-.5)*Math.abs(fy(R,i)-fy(R,i+1))]);}
      }
      if(pts.length)s+=dotPath(pts,1,ghost*.8);
      for(let l=0;l<LEVELS.length;l++)s+=levelArt(l,R,t,sm(lv[l]*1.1-.1)*artFade,K);
      s+=webFill(R,t,web);
      if(!universeOn)s+=levelLabels(S,t,K,labelsOff);
      s+=trayLanding(t,K,S);
      s+=title(S.uni.x,S.uni.y,'Вселенная',S.uni.size,{opacity:S.uni.a,melt:S.melt});
    }
    // ТЫ на вершине, конус взгляда, дуга к первой башне.
    if(K.sees!==undefined&&t>=K.sees-.06&&!universeOn){
      const top=R.yTop-1,figA=U.smooth((t-K.sees+.05)/.32),headY=top-FIG_H*.87;
      s+=figure(R.cx,top,FIG_H,figA);
      s+=`<g opacity="${n(figA*quiet)}">${U.mono(R.cx+15,top-10,'ТЫ',{size:9.6,opacity:.96})}</g>`;
      // Главный вопрос возвращается рядом с ТЫ: тот же курсив, тускло.
      const ask=K.s8_end===undefined?0:U.smooth((t-K.sees-.2)/.3)*(1-U.smooth((t-K.s8_end+.1)/.3));
      if(ask>.004)s+=U.italic(R.cx+33,top-10,'зачем?',{size:15,opacity:ask*.5});
      const q=clamp((t-K.sees)/Math.max(.2,K.whole_tower+.14-K.sees));
      const coneA=U.smooth((t-K.sees)/.2)*(1-U.smooth((t-K.whole_tower-.12)/.55));
      if(coneA>.004){
        const ys=mix(top+2,R.yBase,q*q*(3-2*q)),hw=pw(R,ys)*1.08;
        s+=`<g opacity="${n(coneA)}"><path d="M${n(R.cx)} ${n(headY)}L${n(R.cx+hw)} ${n(ys)}L${n(R.cx-hw)} ${n(ys)}Z" fill="url(#unt-cone)"/>
          <ellipse cx="${n(R.cx)}" cy="${n(ys)}" rx="${n(hw)}" ry="${n(hw*.2)}" fill="none" stroke="#fff" stroke-width=".8" filter="url(#unt-tight)"/>
          <ellipse cx="${n(R.cx)}" cy="${n(ys)}" rx="${n(hw)}" ry="${n(hw*.2)}" fill="none" stroke="#fff" stroke-width=".55"/></g>`;
      }
      if(K.built!==undefined&&t>=K.built){
        const p=clamp((t-K.built)/.42),fade=1-U.smooth((t-K.chatgpt-.15)/.6);
        const x0=R.cx-3,y0=headY,x3=L.cx,y3=L.yBase-8;
        const part=partOf(bezier([x0,y0],[x0-52,y0+70],[x3+62,y3+6],[x3,y3]),p),d=pathOf(part);
        s+=`<g opacity="${n(fade)}"><path d="${d}" fill="none" stroke="#fff" stroke-width="2.4" opacity=".55" filter="url(#unt-tight)"/><path d="${d}" fill="none" stroke="#fff" stroke-width=".95"/></g>`;
        if(p>0&&p<1){
          const [hx,hy]=part[part.length-1];
          s+=`<circle cx="${n(hx)}" cy="${n(hy)}" r="9" fill="url(#un-halo)"/><circle cx="${n(hx)}" cy="${n(hy)}" r="1.7" fill="#fff"/>`;
        }
      }
      if(K.chatgpt!==undefined&&t>=K.chatgpt){
        const a=U.at(K,'chatgpt',t,.34),y=R.yTop-2,xa=L.cx+pw(L,y)+3,xb=mix(xa,R.cx-9,a);
        s+=U.thread([xa,y],[xb,y],{opacity:.85,width:.6})+U.thread([xa,y],[xb,y],{opacity:.3,width:1.8,glow:true});
        const px=mix(xa,R.cx-9,.5-.5*Math.cos((t-K.chatgpt)*2.4));
        s+=`<g opacity="${n(a)}"><circle cx="${n(px)}" cy="${n(y)}" r="8" fill="url(#un-halo)"/><circle cx="${n(px)}" cy="${n(y)}" r="1.7" fill="#fff"/></g>`;
      }
    }
    if(universeOn&&!S.merge){
      const a=U.at(K,'vanchurin',t,.5,1e9)*S.textOut;
      if(a>0)s+=`<g opacity="${n(a)}">${U.mono(180,340,'Vanchurin,',{size:9.4,anchor:'middle',opacity:.82})}${U.mono(180,352,'Entropy 2020',{size:9.4,anchor:'middle',opacity:.82})}</g>`;
      const ia=U.at(K,'intellect',t,.36,1e9)*S.textOut;
      if(ia>0)s+=`<g opacity="${n(ia)}">${U.italic(S.uni.x,S.uni.y+29,'интеллект',{size:28,anchor:'middle',opacity:1,glow:true})}</g>`;
    }
    if(S.merge){
      const m=S.merge,pa=Math.max(1-m.g,U.smooth((m.p-.5)/.42));
      s+=selfLoop(R,t,K,m);
      // Подписи уходят на старте сжатия: пока башня едет в точку, никакой текст не движется.
      const leave=1-U.smooth((t-K.whole_part+.12)/.26);
      s+=layerArcs(R,t,K,(1-U.smooth((t-K.whole_part)/.4))*m.out);
      const step=(K.observers-K.many_layers)/LEVELS.length;
      if(leave>.004&&t>=K.many_layers)LEVELS.forEach((_,l)=>{s+=sideLabel(R,l,U.smooth((t-K.many_layers-l*step)/.34)*leave);});
      s+=crownTop(R,t,K,m,leave);
      // С K.cosmic_mind точку рисует un_final/whole, а этот кадр он уже не зовёт.
      const handed=typeof SCENES.un_final?.point==='function'&&t>=K.cosmic_mind;
      if(pa>.004&&!handed){
        // К K.cosmic_mind это уже точка un_final: тот же радиус, тот же ореол, то же ядро.
        const r=mix(1.6,m.pt.r,m.p);
        s+=`<circle cx="${n(m.pt.x)}" cy="${n(m.pt.y)}" r="${n(r*mix(4,7,m.p))}" fill="url(#un-halo)" opacity="${n(pa*mix(1,.9,m.p))}"/>`+
          U.sphere(m.pt.x,m.pt.y,r,{opacity:n(pa),glow:1.5,highlight:false});
      }
    }
    return s;
  }

  // Входящая сцена владеет наплывом. Если соседа нет, проявляемся из чёрного.
  // over: сосед к стыку уже рисует те же башни. Наплыв a и 1-a просаживает белое на белом,
  // две полные копии удваивают свечение, поэтому копию соседа убираем совсем: его вызов
  // un_towers.body отдаёт пустоту, башни стоят на яркости 1, сверху гаснет остальное.
  const ENTRY={
    intro:K=>({t0:K.hook_cut,dur:.6}),
    chem:K=>({scene:'un_molecule',mode:'layer',t0:K.t3-.05,dur:.55,over:true}),
    sees:K=>({scene:'un_person',mode:'brain',t0:K.sees-.05,dur:.5,over:true}),
    // Наплыв последовательный: сосед уходит за out, башни проступают с опозданием after. Подписи
    // соседа ≈10⁸⁰ и «вес» стоят там, где встанут башни, вместе они не видны ни на одном кадре.
    universe:K=>({scene:'un_cosmos',mode:'return',t0:K.s12-.05,dur:.6,out:.27,after:.22}),
    merge:K=>({scene:'un_aware',mode:'mirror',t0:K.f6-.05,dur:.45}),
  };
  let entering=false;
  function body(t,K={},mode){
    K=K||{};
    if(entering==='over')return '';
    // Отъезд из сегмента заканчивается внутри шота stack, до тех пор кадр рисует un_protein.
    if(mode==='stack'&&SCENES.un_protein?.owns?.(t,K))return SCENES.un_protein.body(t,K,'organics');
    // un_tokens при входе берёт 'universe', но с g1–g6 перед ним стоит un_observer: башен в кадре уже
    // нет, кадр отдаёт тот, кто стоит на самом деле. Когда un_tokens спросит un_observer сам, строка лишняя.
    if(mode==='universe'&&K.s13a!==undefined&&t>=K.s13a-.06)return window.UN_V2?.prev('un_observer',t,K,'god')??'';
    const inner=scene(t,K),e=ENTRY[mode]?.(K);
    const start=e?e.t0+(e.after??0):0;
    if(!e||!(t<start+e.dur))return inner;
    const a=UN.smooth((t-start)/e.dur);
    let prev='';
    if(e.scene&&!entering&&typeof SCENES[e.scene]?.body==='function'){
      entering=e.over?'over':true;
      try{prev=SCENES[e.scene].body(t,K,e.mode)||'';}finally{entering=false;}
    }
    if(e.over&&prev)return `${inner}<g opacity="${n(1-a)}">${prev}</g>`;
    const gone=e.out?UN.smooth((t-e.t0)/e.out):a;
    return `${prev?`<g opacity="${n(1-gone)}">${prev}</g>`:''}<g opacity="${n(a)}">${inner}</g>`;
  }
  function state(t,K={}){
    K=K||{};
    const S=pose(t,K),pack=L=>({x:L.cx,top:{x:L.cx,y:L.yTop},base:{x:L.cx,y:L.yBase},w:L.wBase,wTop:L.wTop,height:L.yBase-L.yTop});
    return {left:pack(S.left),right:pack(S.right),floors:F,perLevel:PER,
      levels:LEVELS.map((names,l)=>({name:names[0],pair:names[1]||null,...levelBox(S.right,l)})),
      figure:{x:S.right.cx,feet:S.right.yTop-1,h:FIG_H,head:{x:S.right.cx,y:S.right.yTop-1-FIG_H*.87}},
      title:{chat:S.chat,universe:S.uni},built:levelProgress(t,K)};
  }
  // Верх правой башни крупным планом: этажи пересчитаны в масштабе, поэтому линии
  // остаются тонкими, как в остальном ролике. Подписей и левой башни здесь нет.
  function crown(t,K={},o={}){
    const R=pose(t,K).right,lv=levelProgress(t,K),z=o.z??5,y=o.y??300,a=o.alpha??1;
    const L=prep({...R,cx:o.x??180,yTop:y,yBase:y+(R.yBase-R.yTop)*z,wTop:R.wTop*z,wBase:R.wBase*z,yh:y+(R.yh-R.yTop)*z,f:R.f*z});
    return `<g opacity="${n(a)}">${towerSVG(L,{
      rim:i=>i%PER===0?1:.46,side:()=>.9,grid:()=>0,heat:i=>.16*sm((i-13)/6),fill:.8
    })}${levelArt(4,L,t,sm(lv[4]*1.1-.1),K)}</g>`;
  }
  SCENES.un_towers=function(u,p={},d,t){return UN.wrap(body(t,p.K||{},p.mode));};
  SCENES.un_towers.body=body;
  SCENES.un_towers.state=state;
  SCENES.un_towers.crown=crown;
  SCENES.un_towers.attention=attention;
})();
