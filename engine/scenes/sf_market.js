// sf_market — one market, capital-weighted arithmetic and cost outflow.
// p.mode cost | before | after | control; p.detail highlights costs/control.
// No event parameters. Cameras z 1–1.06, ox 0, oy -100.
// Sector sizes schematic. The market circle is not identified with SPY/world.
(() => {
  SCENES.sf_market=function(u,p={},d,t){
    const {tx,box,coin,field,path,gold,cyan,white,dim,active,note}=SF;
    let g=field(t,'05 / АРИФМЕТИКА');
    if(p.mode==='control'){
      g+=box(37,163,138,145,cyan,p.detail?'#153949':'#102439')+box(187,163,136,145,gold,p.detail?'#3b3023':'#102439');
      g+=P('M57 188 L78 208 L95 202 L114 245 L147 245','none',`stroke="#ff7272" stroke-width="2.5"`)+L(58,250,153,250,cyan,3);
      g+=Ci(112+Math.sin(t*1.4)*22,250,4,cyan);
      g+=P('M215 192 H297 L286 220 H226 Z','#886831')+R(232,220,47,32,'#b98b3e','rx="5"')+coin(256,235,10,true);
      g+=tx(106,282,'Просадка',15,cyan)+tx(255,282,'Издержки',15,gold);
      g+=tx(180,334,'УПРАВЛЯЙТЕ ТЕМ, ЧТО МОЖЕТЕ',10,white);
    }else{
      const costs=p.mode==='cost'||p.mode==='after',cx=costs?128:180,cy=235,r=75;
      let ang=-Math.PI/2;
      const sizes=[.28,.23,.19,.30],colors=['#206174','#28516d','#173d58','#836739'];
      sizes.forEach((s,i)=>{
        const a=ang,b=ang+s*Math.PI*2;
        g+=P(`M${cx} ${cy} L${cx+r*Math.cos(a)} ${cy+r*Math.sin(a)} A${r} ${r} 0 0 1 ${cx+r*Math.cos(b)} ${cy+r*Math.sin(b)} Z`,colors[i],`stroke="${SF.bg}" stroke-width="2"`);ang=b;
      });
      g+=Ci(cx,cy,44,SF.bg,`stroke="${cyan}" stroke-width=".7"`)+tx(cx,cy-3,'ВЕСЬ',15,white)+tx(cx,cy+17,'РЫНОК',15,white);
      const angle=t*.65;
      g+=coin(cx+63*Math.cos(angle),cy+63*Math.sin(angle),6,true);
      if(costs){
        g+=path([[205,235],[242,235]],t,3);
        g+=box(246,199,79,72,gold)+tx(285,225,'ИЗДЕРЖКИ',8,gold)+coin(285,246,10,true);
        g+=tx(180,333,p.mode==='after'?'Результат участников − издержки':'Часть результата уходит',11,gold);
      }else{
        g+=tx(180,145,p.detail?'ВЫ — ЧАСТЬ РЫНКА':'УЧАСТНИКИ ОДНОГО РЫНКА',11,p.detail?gold:dim);
        g+=tx(180,332,'Среднее по капиталу · один рынок',10,white);
      }
    }
    return g;
  };
})();
