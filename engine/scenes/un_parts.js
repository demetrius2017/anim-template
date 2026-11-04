/* un_parts — швы двух частей «Сеть внутри сети» (04.11): новые тексты на старых сценах, без правки самих сцен.
 * SCENES.un_x12  p.mode="universe", фраза 12 части 1 (новый текст, ≈10 с): кадр SCENES.un_towers.body(t,K,'universe')
 *   и поверх него по словам: K.u_deep — свет у основания правой башни («на самом глубоком уровне»), K.u_net — внутри
 *   правой башни встаёт сеть (узлы по этажам, нити), K.u_learn — по ней снизу вверх идут волны обучения, нити
 *   меняют толщину; с K.u_if камера мягко подъезжает к правой башне; K.u_view — ореол вокруг неё; «интеллект» рисует
 *   сама un_towers на K.intellect. Подпись-источник — плашка движка (story.py), своя мелкая надпись сцены не включается.
 * SCENES.un_q  p.mode="question", фраза q части 1: наплыв .55 с из un_x12 в паутину хука SCENES.un_hook.body(t,K,'hook');
 *   K.h_fades=«гаснет» — паутина гаснет волной, K.h_why=«зачем» — «зачем?», K.h_you=«ты» — остаётся одна точка;
 *   K.h_build далеко за концом ролика — башня не растёт. Под карточкой «ЧАСТЬ 2» точка дышит.
 * SCENES.un_o1  p.mode="hook"|"vanchurin"|"attention", фраза o1 части 2 — одна траектория t:
 *   hook: хук un_hook («Вселенная гаснет. Зачем ей ты?»); vanchurin: с K.o_phys наплыв в паутину un_cosmos/return
 *   (K переназначены на слова o1: «глубоком» — наезд, «нейросетью» — два шара с кольцом), затем башни
 *   un_towers/universe на K.o_uni; attention: с K.o_trick ряд токенов SCENES.un_gpt.attention — «каждое слово
 *   смотрит на остальные» (K.o_each/K.o_others), «решает, какие ему важны» (K.o_decide).
 * SCENES.un_g1  p.mode="decode", g1 части 2: наплыв .5 с из ряда токенов o1 в SCENES.un_observer.body(t,K,'decode').
 * Камера движка нейтральна; детерминизм — только t и K. Важное y=20..335 (story.safe ужимает сцену в зону).
 * Стили карточки и подписи-источника (.un-card, .un-src) — здесь же, только при #un-world.
 */
(() => {
  const css=document.createElement('style');
  css.textContent='#root:has(#un-world) .part .un-src{display:inline-block;font-family:UNSerif,serif;font-style:italic;color:#e6e6e6;'+
    'text-shadow:0 0 4px #000,0 0 8px #000;white-space:nowrap;background:rgba(0,0,0,.78);padding:2px 7px 1px;border-radius:3px;box-shadow:0 0 10px 6px rgba(0,0,0,.6)}'+
    '#root:has(#un-world) .part .un-card{display:inline-block;border:1px solid rgba(255,255,255,.7);padding:9px 12px 7px;line-height:1.18;'+
    'letter-spacing:.5px;box-shadow:0 0 14px rgba(255,255,255,.18),inset 0 0 14px rgba(255,255,255,.08);background:rgba(0,0,0,.55)}';
  document.head.appendChild(css);
  const n=v=>(+v).toFixed(2);
  const mix=(a,b,q)=>a+(b-a)*q, cl=x=>Math.max(0,Math.min(1,x));
  const sm=x=>{x=cl(x);return x*x*(3-2*x);};
  const ramp=(t,a,b)=>sm((t-a)/Math.max(.001,b-a));
  const H=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  const zoomG=(svg,cx,cy,z,tx=cx,ty=cy)=>Math.abs(z-1)<1e-4&&tx===cx&&ty===cy?svg:
    `<g transform="translate(${n(tx)} ${n(ty)}) scale(${(+z).toFixed(4)}) translate(${n(-cx)} ${n(-cy)})">${svg}</g>`;
  const dissolve=(a,b,q)=>q<=0?a:q>=1?b:`<g opacity="${n(1-q)}">${a}</g><g opacity="${n(q)}">${b}</g>`;

  /* a network that lives inside the right tower: nodes by floor, threads, learning waves */
  function towerNet(t,K){
    const st=SCENES.un_towers?.state?.(t,K);if(!st)return '';
    const R=st.right,top=R.top.y,base=R.base.y,cx=R.x;
    const net=ramp(t,K.u_net-.1,K.u_net+.6);
    const deep=ramp(t,K.u_deep,K.u_deep+.4)*(1-ramp(t,K.u_net,K.u_net+.8));
    let s='';
    if(deep>.004)s+=`<ellipse cx="${n(cx)}" cy="${n(base-12)}" rx="${n(R.w*1.4)}" ry="18" fill="url(#un-halo)" opacity="${n(deep)}"/>`;
    if(net<=.004)return s;
    const rows=7,node=[];
    for(let j=0;j<rows;j++){
      const q=j/(rows-1),y=mix(base-16,top+14,q),hw=mix(R.w/2,R.wTop/2,q)*.72;
      node.push([-1,0,1].map(c=>[cx+c*hw+Math.sin(t*.7+j+c)*.8,y]));
    }
    const learn=t>=K.u_learn-.1;
    const period=1.15,ph=learn?((t-K.u_learn+.1)/period)%1:-1,pass=learn?Math.floor((t-K.u_learn+.1)/period):0;
    const stop=1-ramp(t,K.intellect-.3,K.intellect+.2);
    const waveY=mix(base,top,ph);
    for(let j=1;j<rows;j++)for(let a=0;a<3;a++)for(let b=0;b<3;b++){
      const w=learn?.25+.8*H(j*9+a*3+b+pass*17):.45;
      const p=node[j-1][a],q=node[j][b],near=learn?Math.exp(-Math.pow((((p[1]+q[1])/2)-waveY)/18,2))*stop:0;
      s+=UN.thread(p,q,{opacity:n(net*(.22+.5*near)),width:n(w*(1+.6*near))});
    }
    for(let j=0;j<rows;j++)for(const p of node[j]){
      const near=learn?Math.exp(-Math.pow((p[1]-waveY)/16,2))*stop:0;
      s+=`<circle cx="${n(p[0])}" cy="${n(p[1])}" r="${n(1.6+1.4*near)}" fill="#fff" opacity="${n(net*(.7+.3*near))}"/>`;
      if(near>.05)s+=`<circle cx="${n(p[0])}" cy="${n(p[1])}" r="9" fill="url(#un-halo)" opacity="${n(net*near)}"/>`;
    }
    return s;
  }
  function x12(t,K){
    const st=SCENES.un_towers?.state?.(t,K),R=st?.right;
    let s=(SCENES.un_towers?.body?.(t,K,'universe')??'')+towerNet(t,K);
    const view=ramp(t,K.u_view-.1,K.u_view+.6);
    if(R&&view>.004)s+=`<ellipse cx="${n(R.x)}" cy="${n((R.top.y+R.base.y)/2)}" rx="${n(R.w*1.6)}" ry="${n((R.base.y-R.top.y)*.62)}" fill="url(#un-halo)" opacity="${n(.55*view)}"/>`;
    const push=ramp(t,K.u_if-.1,(K.s12_end??K.intellect+1)+.3);
    return R?zoomG(s,R.x,220,1+.09*push,mix(R.x,R.x-10,push),220):s;
  }
  SCENES.un_x12=function(u,p={},d,t){return UN.wrap(x12(t,p.K||{}));};
  SCENES.un_x12.body=x12;

  function q(t,K){
    const a=ramp(t,K.q-.05,K.q+.5);
    const hook=SCENES.un_hook?.body?.(t,K,'hook')??'';
    return dissolve(a<1?x12(t,K):'',hook,a);
  }
  SCENES.un_q=function(u,p={},d,t){return UN.wrap(q(t,p.K||{}));};
  SCENES.un_q.body=q;

  /* part 2, o1: hook → Vanchurin's universe → attention row */
  function o1(t,K){
    const hook=SCENES.un_hook?.body?.(t,K,'hook')??'';
    const toCosmos=ramp(t,K.o_phys-.25,K.o_phys+.45);
    // un_cosmos on the words of o1: web, dolly on «глубоком», two balls with the ring on «нейросетью»
    const KC={...K,s11:K.o_phys-1,cosmos:K.o_phys+.3,beginning:K.o_deep,number_return:1e6,weight_return:1e6,
      power:1e6,atoms_count:1e6,s11_end:K.o_trick-.3,s12:K.o_trick+20};
    const cosmos=toCosmos>0?(SCENES.un_cosmos?.body?.(t,KC,'return')??''):'';
    let s=dissolve(hook,cosmos,toCosmos);
    const toTok=ramp(t,K.o_trick-.2,K.o_trick+.4);
    if(toTok>0){
      const looks=ramp(t,K.o_each,K.o_each+.9),others=ramp(t,K.o_others,K.o_others+.8),decide=ramp(t,K.o_decide,K.o_decide+.6);
      const flash=ramp(t,K.o_imp,K.o_imp+.15)*(1-ramp(t,K.o_imp+.4,K.o_imp+1));
      const att=SCENES.un_gpt?.attention?.(t,K,{y:mix(236,226,looks),looks,others,decide,flash,
        label:ramp(t,K.o_att,K.o_att+.35),labelY:104})??'';
      const ci=`${UN.mono(180,312,'ChatGPT',12,{anchor:'middle',opacity:n(.8*ramp(t,K.o_gpt,K.o_gpt+.3)*(1-ramp(t,K.o_each-.2,K.o_each+.3)))})}`;
      s=dissolve(s,zoomG(att,180,232,1.22)+ci,toTok);
    }
    return s;
  }
  SCENES.un_o1=function(u,p={},d,t){return UN.wrap(o1(t,p.K||{}));};
  SCENES.un_o1.body=o1;

  /* part 2, g1: the attention row of o1 dissolves into un_observer/decode (its own entry is the towers of un_towers). */
  function g1(t,K){
    const a=ramp(t,K.g1-.05,K.g1+.45);
    const dec=SCENES.un_observer?.body?.(t,K,'decode')??'';
    return dissolve(a<1?o1(t,K):'',dec,a);
  }
  SCENES.un_g1=function(u,p={},d,t){return UN.wrap(g1(t,p.K||{}));};
  SCENES.un_g1.body=g1;
})();
