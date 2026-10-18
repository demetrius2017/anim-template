// sf_risk — illustrative stock trajectories, then observed maximum drawdowns.
// p.mode tail | drawdown; p.detail highlights losses. p.riskAt absolute.
// Cameras z 1–1.06, ox 0, oy -100. Fan is schematic, not a historical price chart.
(() => {
  SCENES.sf_risk=function(u,p={},d,t){
    const {tx,box,coin,field,gold,cyan,dim,active,note}=SF;
    let g=field(t,'04 / РИСК');
    if(p.mode==='drawdown'){
      g+=tx(180,150,'МАКСИМАЛЬНАЯ ПРОСАДКА',12,dim);
      const a=active(t,p.riskAt);
      g+=box(39,173,137,139,'#ff7272',p.detail?'#392231':'#102439')+box(187,173,134,139,cyan);
      g+=tx(107,198,'Волатильные 40',10)+tx(254,198,'SPY',13,cyan);
      g+=tx(107,246,'−55%',35,'#ff7272')+tx(254,246,'−34%',35,cyan);
      g+=L(61,266,153,266,'#674457',1)+L(207,266,300,266,'#365565',1);
      g+=R(61,270,92,8+18*a,'#bd3c4d','rx="3"')+R(207,270,93,8+8*a,'#338293','rx="3"');
      g+=note('Horizon · FULL · 2011–2026');
    }else{
      g+=tx(180,145,'ОТДЕЛЬНЫЕ АКЦИИ',11,dim);
      for(let i=0;i<28;i++){
        const rare=i<2,end=rare?167+i*18:242+hash(i+10)*72;
        let points=[];
        for(let j=0;j<=12;j++){
          const f=j/12,x=44+269*f,y=265+(end-265)*f+(Math.sin(f*10+i)*10+noise1(i*2+f*8)*8)*f*(1-f)*3;
          points.push([x,y]);
        }
        g+=P(points.map(([x,y],j)=>`${j?'L':'M'}${f1(x)} ${f1(y)}`).join(' '),'none',`stroke="${rare?gold:'#3b778a'}" stroke-width="${rare?2:1}" opacity="${rare?.9:.42}"`);
        const k=Math.floor(((t*.23+i*.031)%1)*12),v=points[k];
        g+=Ci(v[0],v[1],rare?2.6:1.2,rare?gold:cyan);
      }
      g+=coin(44,265,8,true)+tx(279,164,'Редкие',10,gold)+tx(180,338,'Условные пути · не прогноз',10,dim);
    }
    return g;
  };
})();
