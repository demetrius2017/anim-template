// sf_index — schematic company weights inside the S&P 500 frame.
// p.mode weights | large | grow | refresh; p.detail emphasizes largest bar.
// p.growAt, refreshAt: absolute event seconds; omitted means event is active.
// Cameras z 1–1.06, ox 0, oy -100. Bar heights are illustrative, not market data.
(() => {
  SCENES.sf_index=function(u,p={},d,t){
    const {tx,box,coin,field,path,gold,cyan,dim,active,note}=SF;
    let g=field(t,'03 / ИНДЕКС');
    g+=box(39,143,282,173,cyan)+tx(180,170,'S&P 500',22,cyan);
    const gr=p.mode==='grow'?active(t,p.growAt):0,rf=p.mode==='refresh'?active(t,p.refreshAt,1.5):0;
    const heights=[39,60,79,105];
    for(let i=0;i<4;i++){
      let h=heights[i]+(i===3?gr*14:0),x=64+i*63,alpha=1;
      if(p.mode==='refresh'&&i===0){h=39*(1-rf)+65*rf;alpha=.35+.65*Math.abs(1-2*rf);}
      const highlight=(p.mode==='large'||p.detail)&&i===3;
      g+=R(x,292-h,43,h,highlight?'#b3833d':'#205266',`rx="4" opacity="${alpha}"`)+L(x,292-h,x+43,292-h,i===3?gold:cyan,2);
      g+=tx(x+21,308,p.mode==='refresh'&&i===0&&rf>.5?'НОВАЯ':String.fromCharCode(65+i),9,dim);
      const count=i+2;
      g+=path([[x+21,181],[x+21,288-h]],t+i,count,i===3?gold:cyan);
      if(highlight)g+=coin(x+21,280-h,7,true);
    }
    if(p.mode==='refresh')g+=tx(180,338,'Состав меняет комитет',10,cyan);
    else if(p.mode==='grow')g+=tx(180,338,'Компания растёт → её вес растёт',11,gold);
    else g+=note('Столбики компаний · условные размеры');
    return g;
  };
})();
