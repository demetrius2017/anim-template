// sf_backtest — current-membership bias and honest historical comparison.
// p.mode: headline | future | honest; p.detail: emphasize warning/results.
// p.context: plain-language SPY question in headline; omitted preserves legacy art.
// No event parameters. All data from spy_flow/source, FULL 2011–2026.
// Cameras: z 1–1.06, ox 0, oy -100. Content y 135–345, captions below 372.
(() => {
  SCENES.sf_backtest=function(u,p={},d,t){
    const {tx,box,coin,field,gold,cyan,white,dim,note}=SF;
    let g=field(t,'01 / СОСТАВ');
    if(p.mode==='honest'){
      g+=tx(180,145,'ГОДОВОЙ РЕЗУЛЬТАТ ТЕСТА',10,dim);
      const rows=[['SPY','14,1%',cyan],['Волатильные 40','13,2%',gold],['Моментум 40','14,7%',gold]];
      rows.forEach(([name,value,c],i)=>{
        const y=163+i*50;
        g+=box(35,y,290,43,i===0||p.detail?c:'#2d475a')+tx(49,y+27,name,12,white,'text-anchor="start"')+tx(310,y+29,value,24,c,'text-anchor="end"');
        g+=L(36,y+42,36+289*(.45+.025*Math.sin(t*1.7+i)),y+42,c,1);
      });
      g+=note('Horizon · FULL · 2011–2026 · в год');
    }else if(p.mode==='future'){
      g+=box(191,145,131,74,cyan)+tx(257,170,'СЕГОДНЯ',12,cyan)+tx(257,192,'Победители',12);
      g+=box(38,231,132,72,gold)+tx(104,257,'ПРОШЛОЕ',12,gold)+tx(104,280,'Тест стратегии',11);
      g+=SF.path([[232,218],[232,267],[177,267]],-t,5);
      g+=P('M180 262 L173 267 L180 272','none',`stroke="${gold}" stroke-width="2"`);
      for(let i=0;i<3;i++)g+=R(48+i*34,167+Math.sin(t*1.5+i)*2,25,35,'#16354b','rx="3"')+L(53+i*34,190,67+i*34,178,gold,2);
      g+=tx(180,326,'ЗНАНИЕ БУДУЩЕГО',p.detail?19:17,gold);
    }else if(p.context){
      g+=box(41,141,278,161,gold);
      g+=tx(180,177,'Стратегия выросла',16);
      g+=tx(180,239,'в 100 раз?',40,gold);
      g+=tx(180,276,'Нынешний состав · 2011–2026',11);
      g+=coin(300+Math.sin(t*2)*3,213+Math.cos(t*2)*5,7,true);
      g+=tx(180,329,'КТО УЖЕ ЗНАЛ ПОБЕДИТЕЛЕЙ?',11,cyan);
    }else{
      g+=box(41,141,278,161,gold)+tx(180,169,'КРАСИВЫЙ БЭКТЕСТ',11,dim);
      g+=tx(180,240,'×100?',67,gold);
      g+=tx(180,276,'Нынешний состав · 2011–2026',11);
      g+=coin(282+Math.sin(t*2)*6,226+Math.cos(t*2)*13,12,true);
      g+=tx(180,329,'КТО УЖЕ ЗНАЛ ПОБЕДИТЕЛЕЙ?',11,cyan);
    }
    return g;
  };
})();
