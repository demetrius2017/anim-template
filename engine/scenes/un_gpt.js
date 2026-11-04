/* un_gpt — «как собрать ChatGPT с нуля»: хук hn и блок c1–c11 части 1 «Сеть внутри сети» (04.11).
 * Своя анимация в стиле ролика (UN: шары, нити, кольца-веса, пилюли, стеклянные плиты), без чужих кадров.
 * Одна траектория абсолютного t: режимы шотов (hook, brick, sum, neuron, net, learn, tokens, attention,
 * blocks, train, billions) — только подписи; кадр считается от t и p.K.
 *   hook  hn: две башни ChatGPT и Вселенная, этажи вспыхивают вместе на «собраны», между ними кирпич «?»
 *             на «рецепту», на «Собери» правая уходит, левая — в центр и разбирается до нижней плиты на «нуля».
 *   c1:  башня собирается заново (ChatGPT); на «кирпич» наезд в плиту — кирпич: шар-число 0,7, кольцо-вес ×2,
 *        выход 1,4; на «важность» кольцо дышит — больше вес, ярче выход.
 *   c2:  пять кирпичей сходятся в один узел Σ, бусины-сигналы по нитям — ВЗВЕШЕННАЯ СУММА.
 *   c3:  узел — стеклянный шар с уровнем внутри, ПОРОГ; уровень доходит — вспышка, сигнал на выход — НЕЙРОН.
 *   c4:  ряд нейронов — СЛОЙ, слои встают друг на друга — НЕЙРОСЕТЬ.
 *   c5:  веса дрожат случайно, слои — этажи из стекла; ответ на «2 + 2 =» прыгает: кот, 17, синий.
 *   c6:  сеть уходит влево, справа долина ОШИБКА с шаром; веса подкручиваются, шар скатывается, ×1 000 000, ответ 4.
 *   c7:  строка «Кот сел на окно.» режется на токены, под каждым — столбик чисел.
 *   c8:  «сел» смотрит на всех, потом все на всех; на «решает» толще всех дуга к «Кот» — ВНИМАНИЕ.
 *   c9:  под дугами сеть, вокруг стеклянный БЛОК ТРАНСФОРМЕРА; блок садится плитой, на него — десяток этажей.
 *   c10: над башней «Кот сел на ▯» → «окно»; поток страниц интернета; люди ставят ✓; башня зажигается — ChatGPT.
 *   c11: наезд в нижний этаж — тот же кирпич 0,7 × 2; на «миллиарды» отъезд: башня из крошечных кирпичей.
 * Выход: с K.gpt_out (t1−.65) кадр наплывом отдаёт SCENES.un_towers.body(t,K,'intro') — башню ChatGPT анфас,
 * её шот начинается на t1−.05 (K.hook_cut=K.gpt_out); без un_towers — гаснет в чёрное.
 * SCENES.un_gpt.attention(t,K,o) — ряд токенов с дугами внимания для o1 части 2 (o: {x,y,looks,others,decide,label}).
 * Камера движка нейтральна {z0:1,z1:1,drift:0,kicks:0}; наезды и отъезды — внутри сцены.
 * Важное y=20..335, x=20..340 (story.safe ужимает сцену в зону площадок). Детерминизм: только t и K.
 */
(() => {
  const n=v=>(+v).toFixed(2);
  const mix=(a,b,q)=>a+(b-a)*q, cl=x=>Math.max(0,Math.min(1,x));
  const sm=x=>{x=cl(x);return x*x*(3-2*x);};
  const ramp=(t,a,b)=>sm((t-a)/Math.max(.001,b-a));
  const bump=(t,a,b,c,d)=>ramp(t,a,b)*(1-ramp(t,c,d));
  const H=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  // Measured on Brian 1.22 (part 1, 04.11): fallbacks for scene_test.py; story.py passes the real cues.
  const D={hn:.05,hn_uni:.87,hn_built:1.39,hn_recipe:1.95,hn_collect:2.87,hn_gpt2:3.37,hn_zero:4.05,hn_compare:4.63,
    c1:5.57,c1_tower:6.83,c1_brick:7.91,c1_number:8.57,c1_mult:9.01,c1_weight:9.69,c1_imp:10.33,c1_imp2:11.05,
    c2:12.07,c2_bricks:12.61,c2_stack:13.33,c2_sum:14.33,c3:15.9,c3_thr:16.28,c3_fill:16.8,c3_enough:17.34,
    c3_fire:18.6,c3_neuron:19.7,c4:20.56,c4_layer:21.56,c4_layers:22.18,c4_net:23.78,c5:24.79,c5_random:25.85,
    c5_tower:26.47,c5_wrong:27.07,c6:28.48,c6_err:29.66,c6_tweak:31.28,c6_less:32.32,c6_mill:34.38,c7:35.78,
    c7_text:37.12,c7_cut:38.58,c7_tokens:38.96,c7_nums:40.44,c8:42.03,c8_trick:42.51,c8_looks:44.35,c8_others:44.99,
    c8_decide:45.71,c8_imp:46.29,c8_att:47.59,c9:48.61,c9_net:49.33,c9_block:50.45,c9_many:51.71,c9_floors:52.83,
    c10:54.21,c10_next:55.11,c10_net:56.01,c10_people:57.45,c10_gpt:58.73,c10_name:59.57,c11:60.99,c11_brick:61.69,
    c11_number:62.93,c11_weight:64.01,c11_only:64.47,c11_bill:64.85,gpt_out:65.69};
  let K={};
  const k=key=>K[key]??D[key];
  const at=(t,key,d=.4,off=0)=>ramp(t,k(key)+off,k(key)+off+d);

  /* ---------- small vocabulary on top of UN ---------- */
  const line=(a,b,op=.4,w=.6,glow=false)=>UN.thread(a,b,{opacity:op,width:w,glow});
  const ball=(x,y,r,op=1,glow=1)=>op>.004?UN.sphere(x,y,r,{opacity:n(op),glow}):'';
  const bead=(x,y,r,op)=>op>.004?UN.sphere(x,y,r,{opacity:n(op),glow:1.3,highlight:false}):'';
  const mono=(x,y,s,size,op=.9,anchor='middle')=>op>.004?UN.mono(x,y,s,{size,anchor,opacity:n(op)}):'';
  const ital=(x,y,s,size,op=1)=>op>.004?UN.italic(x,y,s,{size,anchor:'middle',opacity:n(op),glow:true}):'';
  const ring=(x,y,r,op,angle=90)=>op>.004?UN.weight(x,y,r,Math.max(2.4,r*.26),{opacity:n(op),angle}):'';
  function title(x,y,text,size,op){
    if(op<=.004)return '';
    const a=`x="${n(x)}" y="${n(y)}" text-anchor="middle" font-family="Mont" font-weight="700" font-size="${n(size)}" letter-spacing="${n(-.01*size)}"`;
    return `<g opacity="${n(op)}"><text ${a} fill="#fff" stroke="#fff" stroke-width="${n(size*.05)}" opacity=".55" filter="url(#un-soft)">${text}</text><text ${a} fill="#f2f2f2">${text}</text></g>`;
  }
  const pill=(x,y,text,o={})=>(o.opacity??1)>.004?UN.token(x,y,text,{w:o.w,h:o.h??23,size:o.size??11,opacity:n(o.opacity??1)}):'';
  // Glass slab: front face y-h..y, top face recedes up-right. light fills it, dots run along the front.
  function slab(cx,y,w,h,o={}){
    const a=o.a??1;if(a<=.004)return '';
    const d=o.d??w*.5,dx=d*.4,dy=-d*.26,L=cl(o.light??0),dash=o.dash?' stroke-dasharray="3 2.4"':'';
    const P=(x,yy)=>`${n(x)} ${n(yy)}`,x0=cx-w,x1=cx+w,yt=y-h;
    const outline=`M${P(x0,y)}L${P(x1,y)}L${P(x1,yt)}L${P(x0,yt)}ZM${P(x0,yt)}L${P(x0+dx,yt+dy)}L${P(x1+dx,yt+dy)}L${P(x1,yt)}M${P(x1,y)}L${P(x1+dx,y+dy)}L${P(x1+dx,yt+dy)}`;
    let s=`<g opacity="${n(a)}">`;
    if(L>.01)s+=`<rect x="${n(x0)}" y="${n(yt)}" width="${n(2*w)}" height="${n(h)}" fill="#fff" opacity="${n(.2*L)}" filter="url(#un-soft)"/>`;
    s+=`<path d="${outline}" fill="none" stroke="#fff" stroke-width="1.6" opacity="${n(.22+.3*L)}" filter="url(#un-soft)"${dash}/>`;
    s+=`<path d="${outline}" fill="none" stroke="#fff" stroke-width="${n(.5+.25*L)}" opacity="${n(.62+.3*L)}" stroke-linejoin="round"${dash}/>`;
    const m=o.dots??Math.max(3,Math.round(w/7));
    if(m>0){let dots='';for(let i=0;i<m;i++){const x=x0+(i+.5)/m*2*w,yy=y-h*.5+Math.sin(i*1.7+(o.phase??0))*h*.12;
      dots+=`<circle cx="${n(x)}" cy="${n(yy)}" r="${n(Math.max(.45,h*.05))}" fill="#fff" opacity="${n(.45+.5*L)}"/>`;}s+=dots;}
    return s+'</g>';
  }
  function tower(cx,base,N,o={}){
    const fh=o.fh??20,gap=o.gap??4,w0=o.w0??44,w1=o.w1??30;
    let s='';
    for(let i=0;i<N;i++){
      const a=o.alpha?o.alpha(i):1;if(a<=.004)continue;
      const q=N>1?i/(N-1):0;
      s+=slab(cx,base-i*(fh+gap),mix(w0,w1,q),fh,{a,light:o.light?o.light(i):0,dash:o.dash,dots:o.dots,phase:i*.9+(o.phase??0)});
    }
    return s;
  }
  const towerTop=(base,N,o={})=>base-(N-1)*((o.fh??20)+(o.gap??4))-(o.fh??20);
  // Web tower of the Universe: same silhouette, stars and threads inside dashed floors.
  function webTower(cx,base,N,t,o={}){
    const fh=o.fh??20,gap=o.gap??4,w0=o.w0??44,w1=o.w1??30;
    let s=tower(cx,base,N,{...o,dash:true,dots:0});
    const pts=[];
    for(let i=0;i<N;i++){const q=i/(N-1),w=mix(w0,w1,q),y=base-i*(fh+gap)-fh/2;
      for(let j=0;j<4;j++){const id=i*7+j;pts.push([cx+(H(id)-.5)*1.7*w+Math.sin(t*.6+id)*1.2,y+(H(id+50)-.5)*fh*.8,o.light?o.light(i):0,o.alpha?o.alpha(i):1]);}}
    for(let i=0;i+4<pts.length;i++){const a=pts[i],b=pts[i+4+(i%3)%2];if(b&&a[3]*b[3]>.01)s+=line(a,b,.25*a[3]*b[3],.4);}
    for(const p of pts)s+=`<circle cx="${n(p[0])}" cy="${n(p[1])}" r="${n(1+.8*p[2])}" fill="#fff" opacity="${n((.55+.45*p[2])*p[3])}"/>`;
    return s;
  }
  // Brick: number ball → thread with a weight ring → output dot. Horizontal, centred at x,y.
  function brick(x,y,z,o={}){
    const a=o.a??1;if(a<=.004)return '';
    const bx=x-62*z,rx=x+2*z,ox=x+64*z,w=o.w??1,t=o.t??0;
    let s=`<g opacity="${n(a)}">`;
    s+=line([bx,y],[ox,y],.55,.7)+line([bx,y],[ox,y],.18,2.2,true);
    s+=ball(bx,y,9*z,1,1);
    s+=ring(rx,y,8.5*z*w,.8)+ring(rx,y,8.5*z*w,.35);
    const ph=(t*.7)%1,bxp=mix(bx,ox,ph);
    s+=bead(bxp,y,(bxp<rx?1.2:1.2*w)*z,Math.sin(ph*Math.PI)*.95);
    const out=cl(.35+.4*w);
    s+=`<circle cx="${n(ox)}" cy="${n(y)}" r="${n(18*z*out)}" fill="url(#un-halo)" opacity="${n(out)}"/>`+ball(ox,y,(2.6+2.4*w)*z,out,.8);
    if(o.labels){
      const L=o.labels;
      s+=mono(bx,y+27*z,'число',11,.9*(L.number??0));
      s+=mono(bx,y-17*z,'0,7',12,.95*(L.number??0));
      s+=mono((bx+rx)/2,y+4,'×',14,.9*(L.mult??0));
      s+=mono(rx,y+27*z,'вес',11,.9*(L.weight??0));
      s+=mono(rx,y-17*z-6*(w-1),'×'+(o.wtext??'2'),12,.95*(L.weight??0));
      s+=mono(ox,y-17*z-4*(w-1),o.otext??'1,4',12,.95*(L.out??0));
      s+=mono(rx,y-38*z-8*(w-1),'ВАЖНОСТЬ',11,.9*(L.imp??0));
    }
    return s+'</g>';
  }
  function person(x,y,s,op){
    if(op<=.004)return '';
    const q=(dx,dy)=>[x+dx*s,y+dy*s];
    const c=[q(-2.5,-7),q(-5,-4),q(-6,4),q(-3,3),q(-2,14),q(0,14),q(.5,5),q(2,14),q(4,14),q(3,2),q(6,4),q(5,-4),q(2.5,-7)];
    const h=q(0,-12);
    return `<g opacity="${n(op)}">${UN.polyline(c,{close:true,opacity:.8,width:.7})}${UN.polyline(c,{close:true,opacity:.3,width:1.8,glow:true})}${ball(h[0],h[1],2.6*s,.85,.5)}</g>`;
  }
  const zoomG=(svg,cx,cy,z,tx=cx,ty=cy)=>Math.abs(z-1)<1e-4&&tx===cx&&ty===cy?svg:
    `<g transform="translate(${n(tx)} ${n(ty)}) scale(${(+z).toFixed(4)}) translate(${n(-cx)} ${n(-cy)})">${svg}</g>`;

  /* ---------- hook hn and the rebuilt tower of c1 ---------- */
  const TB=312,TN=10;
  function hookPart(t){
    const T={fh:21,gap:4,w0:48,w1:33};
    const top=towerTop(TB,TN,T);
    const collect=at(t,'hn_collect',.6),zero=ramp(t,k('hn_gpt2'),k('hn_zero')+.25);
    const lx=mix(112,180,collect),rx=mix(248,312,collect),ra=mix(1,.22,collect)*(1+.9*bump(t,k('hn_compare')-.1,k('hn_compare')+.25,k('hn_compare')+.6,k('c1')));
    // Light: a slow pulse climbs both towers; on «собраны» all floors flash together, bottom to top.
    const built=k('hn_built');
    const light=i=>.25*Math.max(0,Math.sin(t*2.2-i*.55))**6+bump(t,built+i*.05,built+.15+i*.05,built+.35+i*.05,built+.8+i*.05);
    // «с нуля»: floors leave from the top down; c1 builds them again from the bottom up, then lights them.
    const rebuild=i=>ramp(t,k('c1')-.1+i*.11,k('c1')+.15+i*.11);
    const leftA=i=>{const gone=ramp(t,k('hn_gpt2')+(TN-1-i)*.07,k('hn_gpt2')+.25+(TN-1-i)*.07);return i===0?1:Math.max(1-gone,rebuild(i));};
    let s='';
    if(ra>.004&&t<k('c1')+.6)s+=`<g opacity="${n(ra*(1-at(t,'c1',.5)))}">${webTower(rx,TB,TN,t,{...T,light})}${ital(rx,top-12,'Вселенная',20,1)}</g>`;
    const blue=zero*(1-ramp(t,k('c1')+.3,k('c1_tower')));
    s+=tower(lx,TB,TN,{...T,light:i=>light(i)+.5*bump(t,k('c1_tower')-.2+i*.03,k('c1_tower')+i*.03,k('c1_tower')+.3,k('c1_tower')+.9),alpha:leftA,dash:blue>.5});
    const tA=(1-zero)+ramp(t,k('c1')+.2,k('c1')+.6);
    s+=title(lx,top-12,'ChatGPT',22,cl(tA));
    // «рецепту?»: the same brick sits between the towers, a dashed thread to the base of each.
    const rec=bump(t,k('hn_recipe')-.1,k('hn_recipe')+.3,k('hn_collect')-.1,k('hn_collect')+.3);
    if(rec>.004){
      const y=TB-60;
      s+=`<g opacity="${n(rec)}">${line([150,y],[lx+30,TB-10],.35,.5)}${line([210,y],[rx-30,TB-10],.35,.5)}${brick(180,y,.34,{t})}${ital(180,y-22,'?',26,1)}</g>`;
    }
    // «нуля»: the last plate glows alone.
    const z0=bump(t,k('hn_zero')-.1,k('hn_zero')+.3,k('c1')-.1,k('c1')+.4);
    if(z0>.004)s+=`<ellipse cx="${n(lx)}" cy="${TB-9}" rx="60" ry="22" fill="url(#un-halo)" opacity="${n(.9*z0)}"/>`;
    return s;
  }

  /* ---------- stage B: brick → weighted sum → neuron (c1 «кирпич» … c4) ---------- */
  const IN_X=70,NODE={x:250,y:205};
  const inY=i=>205+(i-2)*48;
  const W5=[1.45,.55,1,.4,.85],V5=['0,3','0,9','0,7','0,2','0,5'];
  function stageB(t){
    let s='';
    const many=at(t,'c2',.7),neuron=at(t,'c3',.6),toRow=ramp(t,k('c4')-.05,k('c4')+.8);
    const sumOn=at(t,'c2_sum',.4)*(1-at(t,'c3',.4));
    // The input of c1 is the middle brick: ball (70,205), ring at the thread's middle, node at (250,205).
    for(let i=0;i<5;i++){
      const a=(i===2?1:many*ramp(t,k('c2')+.1*Math.abs(i-2),k('c2')+.5+.1*Math.abs(i-2)))*(1-toRow);
      if(a<=.004)continue;
      const y=inY(i),w=i===2?(1+.9*Math.sin(Math.max(0,t-k('c1_imp2'))*3)*bump(t,k('c1_imp2'),k('c1_imp2')+.2,k('c2')-.2,k('c2')+.2)):W5[i];
      const ww=mix(i===2?1:w,W5[i],many);
      const mid=[mix(IN_X,NODE.x,.5),mix(y,NODE.y,.5)];
      s+=`<g opacity="${n(a)}">`+line([IN_X,y],[NODE.x,NODE.y],.5,.6)+line([IN_X,y],[NODE.x,NODE.y],.15,2,true);
      const ang=Math.atan2(NODE.y-y,NODE.x-IN_X)*180/Math.PI+90;
      s+=ring(mid[0],mid[1],8.5*(i===2&&many<1?mix(w,ww,many):ww),.8,ang);
      s+=ball(IN_X,y,i===2?mix(9,7,many):7,1,1);
      // signals: stronger rings pass brighter beads
      const ph=(t*.8+i*.23)%1,px=mix(IN_X,NODE.x,ph),py=mix(y,NODE.y,ph);
      s+=bead(px,py,ph<.5?1.1:1.1*ww,Math.sin(ph*Math.PI)*.95*(i===2?1:ramp(t,k('c2_stack')-.2,k('c2_stack')+.3)));
      if(i!==2||many>0)s+=mono(IN_X-22,y+4,V5[i],10,.75*many,'end');
      s+='</g>';
    }
    // c1 labels on the middle brick (camera is close then)
    const solo=1-many;
    if(solo>.004){
      const y=inY(2),mx=(IN_X+NODE.x)/2;
      const L={number:at(t,'c1_number',.3),mult:at(t,'c1_mult',.3),weight:at(t,'c1_weight',.3),out:at(t,'c1_weight',.3,.35),imp:at(t,'c1_imp2',.3)};
      const w=1+.9*Math.sin(Math.max(0,t-k('c1_imp2'))*3)*L.imp;
      s+=`<g opacity="${n(solo)}">${mono(IN_X,y+30,'число',11,.9*L.number)}${mono(IN_X,y-17,'0,7',12,.95*L.number)}${mono((IN_X+mx)/2,y-8,'×',14,.9*L.mult)}`+
        `${mono(mx,y+30,'вес',11,.9*L.weight)}${mono(mx,y-20-8*(w-1),'×2',12,.95*L.weight)}${mono(NODE.x,y-22-6*(w-1),(1.4*w).toFixed(1).replace('.',','),12,.95*L.out)}`+
        `${mono(mx,y-44-8*(w-1),'ВАЖНОСТЬ',11,.9*L.imp)}</g>`;
    }
    // node: output of the brick → Σ → glass neuron with a level and a threshold
    const R=mix(mix(4+2.2,10,many),24,neuron)*(1-toRow)+9*toRow;
    const nx=mix(NODE.x,180,toRow),ny=mix(NODE.y,292,toRow);
    const fill=neuron*(ramp(t,k('c3_fill')-.1,k('c3_enough')+.35)*.66+ramp(t,k('c3_fire')-.25,k('c3_fire'))*.34);
    const fire=bump(t,k('c3_fire'),k('c3_fire')+.08,k('c3_fire')+.25,k('c3_fire')+.9);
    const outA=solo>.5?.6+.4*L1(t):1;
    s+=`<circle cx="${n(nx)}" cy="${n(ny)}" r="${n(R*2.6)}" fill="url(#un-halo)" opacity="${n(.5+.5*fire)}"/>`;
    const glass=neuron*(1-toRow);
    s+=ball(nx,ny,R,outA*(1-.85*glass),1+fire);
    if(glass>.004)s+=`<circle cx="${n(nx)}" cy="${n(ny)}" r="${n(R)}" fill="#000" fill-opacity="${n(.55*glass)}" stroke="#fff" stroke-width="1.1" opacity="${n(glass)}"/><circle cx="${n(nx)}" cy="${n(ny)}" r="${n(R)}" fill="none" stroke="#fff" stroke-width="3" opacity="${n(.3*glass)}" filter="url(#un-soft)"/>`;
    if(neuron>.004&&toRow<1){
      const lv=ny+R-fill*2*R;
      s+=`<defs><clipPath id="ung-neuron"><circle cx="${n(nx)}" cy="${n(ny)}" r="${n(R*.96)}"/></clipPath></defs>`;
      s+=`<g clip-path="url(#ung-neuron)" opacity="${n(neuron*(1-toRow))}"><rect x="${n(nx-R)}" y="${n(lv)}" width="${n(2*R)}" height="${n(2*R)}" fill="#fff" opacity="${n(.62+.38*fire)}"/>`+
        `<path d="M${n(nx-R)} ${n(lv)}Q${n(nx)} ${n(lv-2*Math.sin(t*4))} ${n(nx+R)} ${n(lv)}" stroke="#fff" stroke-width=".8" fill="none"/></g>`;
      const thr=at(t,'c3_thr',.35)*(1-toRow),ty=ny+R-.62*2*R;
      s+=`<path d="M${n(nx-R-14)} ${n(ty)}H${n(nx+R+14)}" stroke="#fff" stroke-width="1.3" stroke-dasharray="4 2.5" opacity="${n(thr)}"/>`;
      s+=mono(nx,ny-R-14,'ПОРОГ',11,.9*thr*(1-at(t,'c3_neuron',.3)));
      // output thread fires to the right on «срабатывает»
      const oa=neuron*(1-toRow);
      s+=line([nx+R,ny],[345,ny],.35*oa,.6);
      const q=ramp(t,k('c3_fire'),k('c3_fire')+.55);
      if(q>0&&q<1)s+=bead(mix(nx+R,345,q),ny,2.6,oa);
      s+=mono(nx,ny+R+20,'НЕЙРОН',12,.95*at(t,'c3_neuron',.3)*(1-toRow));
    }
    s+=mono(NODE.x,NODE.y+5,'Σ',13,.95*many*(1-neuron));
    if(sumOn>.004)s+=mono(NODE.x,NODE.y+34,'ВЗВЕШЕННАЯ',11,.9*sumOn)+mono(NODE.x,NODE.y+49,'СУММА',11,.9*sumOn);
    return s;
  }
  function L1(t){return at(t,'c1_weight',.3,.35);}

  /* ---------- stage C: layers → network → random tower → learning (c4 … c6) ---------- */
  const RX=i=>60+i*60,RY=j=>292-j*64;
  function weightAt(t,a,b,j){
    // c5: random, re-rolled 4 times a second; from «подкручивать» they slide to their learnt value.
    const id=a*31+b*7+j*101,slot=Math.floor(t*4);
    const rnd=.25+1.9*H(id+slot*13),learnt=.3+1.5*H(id+999);
    const r=at(t,'c5_random',.3)*(1-ramp(t,k('c6_tweak'),k('c6_mill')+.4));
    const tuned=ramp(t,k('c6_tweak'),k('c6_mill')+.4);
    return mix(mix(.6,rnd,r),learnt,tuned);
  }
  function netPicture(t){
    let s='';
    const rowOn=j=>j===0?at(t,'c4',.7):ramp(t,k('c4_layers')+(j-1)*.3,k('c4_layers')+.4+(j-1)*.3);
    const floors=at(t,'c5_tower',.6);
    // floors of glass around the rows: the network becomes a tower
    for(let j=0;j<4;j++)if(floors>.004)s+=slab(180,RY(j)+16,150,32,{a:floors*rowOn(j),light:.15+.2*Math.max(0,Math.sin(t*2-j)),dots:0,d:40});
    for(let j=1;j<4;j++){
      const a=rowOn(j);if(a<=.004)continue;
      for(let i=0;i<5;i++)for(let m=0;m<5;m++){
        const w=weightAt(t,i,m,j);
        s+=line([RX(i),RY(j-1)],[RX(m),RY(j)],.16*a*(.5+.4*w),.32*w+.1);
      }
      // signals flow upward
      for(let i=0;i<5;i++){const m=(i*3+j)%5,ph=(t*.9+i*.31+j*.17)%1;
        if(at(t,'c4_net',.3)>0)s+=bead(mix(RX(i),RX(m),ph),mix(RY(j-1),RY(j),ph),1.1,Math.sin(ph*Math.PI)*.9*a*at(t,'c4_net',.4));}
    }
    // tuning knobs on six connections while weights are being turned
    const knob=bump(t,k('c6_tweak')-.1,k('c6_tweak')+.3,k('c6_mill'),k('c6_mill')+.6);
    if(knob>.004)for(let q=0;q<6;q++){const i=q%5,m=(q*2+1)%5,j=1+q%3,x=mix(RX(i),RX(m),.5),y=mix(RY(j-1),RY(j),.5);
      s+=ring(x,y,5+2*Math.sin(t*5+q),.85*knob,(t*160+q*40)%180);}
    for(let j=0;j<4;j++){
      const a=rowOn(j);if(a<=.004)continue;
      for(let i=0;i<5;i++){const fl=.6+.4*Math.max(0,Math.sin(t*2.4-i*.8-j*1.3))**4;s+=ball(RX(i),RY(j),j===0&&i===2?9:8,a*fl,.8);}
    }
    const lay=at(t,'c4_layer',.3)*(1-at(t,'c4_layers',.4));
    if(lay>.004)s+=`<path d="M38 318H322" stroke="#fff" stroke-width=".8" opacity="${n(.7*lay)}"/>`+mono(180,334,'СЛОЙ',12,.95*lay);
    s+=mono(180,52,'НЕЙРОСЕТЬ',12,.95*at(t,'c4_net',.3)*(1-at(t,'c5_tower',.4)));
    // question and answers: «2 + 2 =» at the foot, the top floor answers
    const qa=at(t,'c5_tower',.5,.3);
    if(qa>.004){
      s+=pill(180,330,'2 + 2 =',{w:70,opacity:qa});
      const right=at(t,'c6_mill',.3,.3),words=['кот','17','синий','ой','лук','9','сыр'];
      const idx=Math.floor((t-k('c5_wrong')+.5)*(t<k('c6')?3.2:1.6));
      const word=t<k('c5_wrong')-.5?'?':words[((idx%words.length)+words.length)%words.length];
      s+=pill(180,52,right>.5?'4':word,{w:58,opacity:qa*(right>.5?1:.92)});
      if(right>.004)s+=`<circle cx="180" cy="52" r="${n(30*right)}" fill="url(#un-halo)" opacity="${n(right*(1-ramp(t,k('c6_mill')+.6,k('c6_mill')+1.4))*.9)}"/>`;
    }
    return s;
  }
  function learnPanel(t){
    const a=at(t,'c6',.6)*(1-at(t,'c7',.6));if(a<=.004)return '';
    const cx=292,half=46,yb=232,ye=162;
    const y=x=>ye+(yb-ye)*(1-Math.pow((x-cx)/half,2));
    const pts=[];for(let i=0;i<=40;i++){const x=cx-half+i/40*2*half;pts.push([x,y(x)]);}
    let s=`<g opacity="${n(a)}">`+UN.polyline(pts,{opacity:.75,width:.8})+UN.polyline(pts,{opacity:.25,width:2.4,glow:true});
    // the ball walks down in small steps: each «подкручивание» is one step
    const steps=ramp(t,k('c6_tweak')-.2,k('c6_mill')+.5),stair=Math.floor(steps*7)/7,sub=sm((steps*7)%1);
    const p=cl(stair+sub/7),bx=mix(cx-half+6,cx,p)+Math.sin(t*9)*.6*(1-p),by=y(bx)-6;
    const err=at(t,'c6_err',.4);
    s+=`<path d="M${n(bx)} ${n(by+6)}V${yb}" stroke="#fff" stroke-width=".8" stroke-dasharray="2.5 2.5" opacity="${n(.8*err*(1-p*.9))}"/>`;
    s+=ball(bx,by,6,1,1.1);
    s+=mono(cx,ye-14,'ОШИБКА',12,.95*err);
    const mill=at(t,'c6_mill',.3,-.3);
    const count=Math.round(Math.pow(10,6*ramp(t,k('c6_mill')-.3,k('c6_mill')+.7)));
    s+=mono(cx,yb+24,'× '+count.toLocaleString('ru-RU').replace(/ /g,' '),12,.95*mill);
    return s+'</g>';
  }
  function stageC(t){
    const learn=at(t,'c6',.7),leave=ramp(t,k('c7'),k('c7')+.9);
    const z=mix(1,.78,learn),tx=mix(180,118,learn),ty=mix(196,190,learn)-leave*60;
    return `<g opacity="${n(1-leave)}">${zoomG(netPicture(t),180,196,z*(1-.3*leave),tx,ty)}</g>`+learnPanel(t);
  }

  /* ---------- stage D: tokens → numbers → attention (c7, c8), used again in part 2 ---------- */
  const TOK=['Кот','сел','на','ок','но','.'],TW=[46,46,36,34,34,24],NUMS=[['0,3','−1,2','0,8'],['1,1','0,4','−0,6'],['−0,2','0,9','0,1'],['0,7','−0,5','1,3'],['−1,0','0,2','0,6'],['0,0','0,8','−0,3']];
  const tokX=(x0=180)=>{const gap=8,tot=TW.reduce((a,b)=>a+b,0)+gap*(TW.length-1);let x=x0-tot/2;return TW.map(w=>{const c=x+w/2;x+=w+gap;return c;});};
  const IMP=[3.2,0,.9,.45,.45,.3];
  // Attention arcs over a row of pills. o.looks: «сел» looks at all; o.others: everyone at everyone; o.decide: weights.
  function attention(t,K0,o={}){
    if(K0)K=K0;
    const xs=tokX(o.x??180),y=o.y??250,h=23,top=y-h/2;
    let s='';
    const looks=o.looks??0,others=o.others??0,decide=o.decide??0,flash=o.flash??0;
    const arc=(i,j,w,op,rev=1)=>{
      const a=xs[i],b=xs[j],c=Math.abs(b-a),hh=16+.42*c;
      const pts=[];for(let q=0;q<=36;q++){const u=q/36*rev;pts.push([mix(a,b,u),top-Math.sin(Math.PI*u)*hh]);}
      return UN.polyline(pts,{opacity:op,width:w})+UN.polyline(pts,{opacity:op*.3,width:w+2.2,glow:true});
    };
    // everyone at everyone: faint
    if(others>.004)for(let i=0;i<6;i++)for(let j=0;j<6;j++){if(i===j||i===1)continue;
      const r=sm(others*1.6-(i*.1+j*.03));if(r>0)s+=arc(i,j,.45,.22*(1-.6*decide),r);}
    // «сел» at the others; on «решает» the arc to «Кот» thickens, the rest thin out
    for(let j=0;j<6;j++){if(j===1)continue;
      const r=sm(looks*1.5-Math.abs(j-1)*.12);if(r<=0)continue;
      const w=mix(.9,.25+IMP[j]*1.1,decide)+(j===0?1.4*flash:0),op=mix(.75,j===0?1:.45,decide);
      s+=arc(1,j,w,op,r);
      if(r>=1){const ph=(t*.6+j*.2)%1,u=ph,c=Math.abs(xs[j]-xs[1]),hh=16+.42*c;
        s+=bead(mix(xs[1],xs[j],u),top-Math.sin(Math.PI*u)*hh,1+.4*w,Math.sin(ph*Math.PI)*.8*(j===0?1:1-.6*decide));}
    }
    const sel=Math.max(looks>0?1:0,0);
    xs.forEach((x,i)=>{
      if(i===1&&looks>0)s+=`<circle cx="${n(x)}" cy="${n(y)}" r="${n(28)}" fill="url(#un-halo)" opacity="${n(.8*sm(looks*3))}"/>`;
      if(i===0&&decide>0)s+=`<circle cx="${n(x)}" cy="${n(y)}" r="${n(26)}" fill="url(#un-halo)" opacity="${n(.7*decide)}"/>`;
      s+=pill(x,y,TOK[i],{w:TW[i],opacity:o.pills??1,size:12});
    });
    if(o.label)s+=ital(o.x??180,o.labelY??(y-120),'внимание',26,o.label);
    return s;
  }
  function stageD(t){
    const on=at(t,'c7',.5,.6)*(1-ramp(t,k('c9_many')-.1,k('c9_many')+.5));if(on<=.004)return '';
    let s='';
    const xs=tokX(),textA=at(t,'c7_text',.35,-.2)*(1-at(t,'c7_tokens',.3)),cut=bump(t,k('c7_cut'),k('c7_cut')+.12,k('c7_tokens'),k('c7_tokens')+.3);
    const tok=at(t,'c7_tokens',.4);
    // pills move up for the arcs in c8, and higher again in c9 to make room for the network under them
    const up=ramp(t,k('c8_trick')-.2,k('c8_looks')-.2),up9=ramp(t,k('c9'),k('c9_net'));
    const y=mix(mix(196,250,up),205,up9);
    if(textA>.004)s+=ital(180,206,'Кот сел на окно.',34,textA);
    if(cut>.004)for(let i=0;i<5;i++){const x=180+((xs[i]+xs[i+1])/2-180)*1.22;s+=`<path d="M${n(x)} 176V226" stroke="#fff" stroke-width="1" opacity="${n(.9*cut)}"/>`;}
    if(tok>.004){
      const nums=at(t,'c7_nums',.3,-.4)*(1-at(t,'c8_trick',.4));
      const looks=ramp(t,k('c8_looks'),k('c8_looks')+.9),others=ramp(t,k('c8_others'),k('c8_others')+.9),decide=ramp(t,k('c8_decide'),k('c8_decide')+.6);
      const flash=bump(t,k('c8_imp'),k('c8_imp')+.15,k('c8_imp')+.4,k('c8_imp')+1);
      const label=at(t,'c8_att',.35)*(1-at(t,'c9',.4));
      const z=mix(1.22,1,up9);
      const att=attention(t,null,{y,looks,others,decide,flash,label,labelY:y-128,pills:tok});
      s+=zoomG(att,180,y,z,180,y);
      // a column of numbers under every token
      if(nums>.004)xs.forEach((x,i)=>{const X=180+(x-180)*z;for(let r=0;r<3;r++){const a=sm(nums*3-i*.25-r*.12);s+=mono(X,y+34+r*16,NUMS[i][r],11,.9*a);}});
      // c9: the network under the attention row, then the glass block around both
      const net=at(t,'c9_net',.5);
      if(net>.004){
        const X=i=>70+i*44,Y=[262,300];
        for(let i=0;i<6;i++)for(let m=0;m<6;m++)s+=line([X(i),Y[0]],[X(m),Y[1]],.14*net,.4);
        for(let i=0;i<6;i++){s+=line([xs[i]*z+180*(1-z),y+12],[X(i),Y[0]],.25*net,.5);s+=ball(X(i),Y[0],5,net,.7)+ball(X(i),Y[1],5,net,.7);}
        const ph=(t*.9)%1;for(let i=0;i<3;i++)s+=bead(X(i*2),mix(Y[0],Y[1],ph),1.1,Math.sin(ph*Math.PI)*net);
      }
      const box=at(t,'c9_block',.4);
      if(box>.004){
        s+=`<rect x="28" y="${n(y-140)}" width="304" height="${n(330-(y-140))}" rx="14" fill="none" stroke="#fff" stroke-width="1.8" opacity="${n(.3*box)}" filter="url(#un-soft)"/>`+
           `<rect x="28" y="${n(y-140)}" width="304" height="${n(330-(y-140))}" rx="14" fill="none" stroke="#fff" stroke-width=".7" opacity="${n(.85*box)}"/>`;
        s+=mono(180,y-150,'БЛОК ТРАНСФОРМЕРА',12,.95*box);
      }
    }
    return `<g opacity="${n(on)}">${s}</g>`;
  }

  /* ---------- stage E: blocks become floors; training; ChatGPT; back to a brick (c9 … c11) ---------- */
  const EB=318,EN=10;
  function stageE(t){
    const on=ramp(t,k('c9_many')-.1,k('c9_many')+.4);if(on<=.004)return '';
    const T={fh:19,gap:4,w0:62,w1:44};
    const top=towerTop(EB,EN,T);
    const rise=i=>ramp(t,k('c9_many')+i*.1,k('c9_many')+.3+i*.1);
    const gpt=k('c10_gpt'),lit=i=>.12+.2*Math.max(0,Math.sin(t*1.8-i*.6))**4+.55*ramp(t,gpt+i*.06,gpt+.25+i*.06);
    // inside every floor a tiny attention row: the floor is a transformer block
    let inner='';
    for(let i=0;i<EN;i++){const a=rise(i);if(a<=.004)continue;
      const y=EB-i*(T.fh+T.gap)-T.fh*.62,w=mix(T.w0,T.w1,i/(EN-1))*.8;
      for(let q=0;q<3;q++){const x0=180-w+q*w*.62,x1=x0+w*.55;
        inner+=UN.polyline(Array.from({length:13},(_,m)=>[mix(x0,x1,m/12),y-Math.sin(Math.PI*m/12)*4.5]),{opacity:.42*a,width:.45});}}
    let s=tower(180,EB,EN,{...T,alpha:rise,light:lit})+inner;
    // c10: guess the next token above the tower
    const guess=at(t,'c10',.4)*(1-ramp(t,gpt-.2,gpt+.2));
    if(guess>.004){
      const y=top-24,xs=[118,166,206,256],tx=['Кот','сел','на',''];
      const fillA=ramp(t,k('c10_next')+.35,k('c10_next')+.6);
      xs.forEach((x,i)=>{s+=pill(x,y,i<3?tx[i]:(fillA>.5?'окно':''),{w:i<3?[42,42,32][i]:54,opacity:guess,size:12});});
      const blink=(Math.sin(t*9)>0?1:0)*(1-fillA);
      s+=`<path d="M256 ${n(y-6)}V${n(y+6)}" stroke="#fff" stroke-width="1" opacity="${n(guess*blink)}"/>`;
      if(fillA>.004)s+=`<circle cx="256" cy="${n(y)}" r="${n(26*fillA)}" fill="url(#un-halo)" opacity="${n(guess*fillA*(1-ramp(t,k('c10_next')+.6,k('c10_next')+1.4)))}"/>`;
    }
    // the internet pours in: small pages fly along two curves into the top floor
    const pour=bump(t,k('c10_net')-.3,k('c10_net')+.2,k('c10_people')+.6,k('c10_people')+1.2);
    if(pour>.004){
      for(let i=0;i<22;i++){
        const side=i%2?1:-1,ph=(t*.55+H(i)*1)%1,sx=180+side*(120+H(i+7)*40),sy=40+H(i+3)*60;
        const ex=180+side*12,ey=top+8,x=mix(sx,ex,ph),yy=mix(sy,ey,ph)-Math.sin(ph*Math.PI)*22;
        const a=pour*Math.sin(ph*Math.PI);
        s+=`<g opacity="${n(a*.85)}"><rect x="${n(x-6)}" y="${n(yy-4)}" width="12" height="8" rx="1" fill="none" stroke="#fff" stroke-width=".5"/>`+
          `<path d="M${n(x-4)} ${n(yy-1.5)}H${n(x+4)}M${n(x-4)} ${n(yy+1)}H${n(x+2)}" stroke="#fff" stroke-width=".4"/></g>`;
      }
      s+=mono(64,34,'ИНТЕРНЕТ',11,.9*pour*at(t,'c10_net',.3));
    }
    // people check the answers
    const ppl=bump(t,k('c10_people')-.2,k('c10_people')+.3,gpt+.3,gpt+.8);
    if(ppl>.004){
      [[46,300,0],[314,300,1],[314,236,2]].forEach(([x,y,i])=>{
        s+=person(x,y,1.5,ppl);
        const mk=ramp(t,k('c10_people')+.25+i*.22,k('c10_people')+.45+i*.22);
        s+=mono(x,y-30,i===1?'✗':'✓',15,ppl*mk);
      });
    }
    s+=title(180,top-14,'ChatGPT',26,at(t,'c10_name',.3,-.15));
    // c11: dolly into the bottom floor; the brick comes back, then billions of them
    const into=ramp(t,k('c11')-.05,k('c11_brick')+.1);
    const bill=ramp(t,k('c11_only')-.1,k('c11_bill')+.3);
    const zIn=Math.exp(mix(0,Math.log(3.4),into)*(1-bill));
    let out=zoomG(s,180,EB-9,zIn,180,mix(EB-9,205,into*(1-bill)));
    const towerA=on*(1-ramp(t,k('c11_brick')-.3,k('c11_brick')+.1));
    let res=`<g opacity="${n(towerA)}">${out}</g>`;
    const br=ramp(t,k('c11_brick')-.3,k('c11_brick')+.2)*(1-bill);
    if(br>.004){
      const L={number:at(t,'c11_number',.3),mult:at(t,'c11_number',.3,.25),weight:at(t,'c11_weight',.3),out:at(t,'c11_weight',.3,.3)};
      res+=brick(180,205,1.15,{a:br,t,labels:L});
    }
    if(bill>.004){
      // the tower of billions: tiny bricks fill the silhouette of the ChatGPT tower of un_towers
      let g='';
      for(let r=0;r<26;r++){const y=66+r*10.4,hw=mix(14,64,r/25);
        for(let c=0;c<Math.round(hw/5.5);c++){const x=180-hw+(c+.5)*(2*hw)/Math.round(hw/5.5);
          const a=bill*sm(bill*2.2-H(r*40+c)*1.2)*(.55+.45*Math.max(0,Math.sin(t*2.5-r*.4+c)));
          if(a>.01)g+=`<path d="M${n(x-2)} ${n(y)}H${n(x+2)}" stroke="#fff" stroke-width=".5" opacity="${n(a*.7)}"/><circle cx="${n(x-2)}" cy="${n(y)}" r=".9" fill="#fff" opacity="${n(a)}"/>`;}}
      res+=g+brick(180,mix(205,320,bill),mix(1.15,.08,bill),{a:1-bill*.9,t})+mono(180,40,'× МИЛЛИАРДЫ',13,.95*at(t,'c11_bill',.3));
    }
    return res;
  }

  /* ---------- the whole trajectory ---------- */
  function body(t,K0={}){
    K=K0||{};
    let s=UN.bokeh(t,{seed:23,count:22,opacity:.35});
    // hook and the rebuilt tower; on «кирпич» the camera goes into its bottom floor
    const intoBrick=ramp(t,k('c1_brick')-.55,k('c1_brick')+.25);
    const hookA=1-ramp(t,k('c1_brick')-.15,k('c1_brick')+.2);
    if(hookA>.004)s+=`<g opacity="${n(hookA)}">${zoomG(hookPart(t),180,TB-9,Math.exp(Math.log(3.2)*intoBrick),180,mix(TB-9,205,intoBrick))}</g>`;
    const bA=ramp(t,k('c1_brick')-.2,k('c1_brick')+.25);
    if(bA>.004&&t<k('c4')+1){
      // stage B camera: close on the middle brick in c1, opens on «Много таких»
      const z=mix(1.42,1,at(t,'c2',.9));
      const cB=1-ramp(t,k('c4')+.5,k('c4')+.9);
      s+=`<g opacity="${n(bA*cB)}">${zoomG(stageB(t),160,205,z,180,205)}</g>`;
    }
    if(t>=k('c4')-.1&&t<k('c7')+1)s+=stageC(t);
    if(t>=k('c7')+.4)s+=stageD(t);
    if(t>=k('c9_many')-.2)s+=stageE(t);
    // exit: the ChatGPT tower of un_towers takes the frame
    const out=k('gpt_out'),ex=ramp(t,out,out+.6);
    if(ex>0){
      const tw=SCENES.un_towers?.body?.(t,{...K,hook_cut:out},'intro')??'';
      s=`<g opacity="${n(1-ex)}">${s}</g>`+tw;
    }
    return s;
  }
  SCENES.un_gpt=function(u,p={},d,t){return UN.wrap(body(t,p.K||{}));};
  SCENES.un_gpt.body=body;
  SCENES.un_gpt.attention=(t,K0,o)=>attention(t,K0||{},o);
  SCENES.un_gpt.tokens=TOK;
})();
