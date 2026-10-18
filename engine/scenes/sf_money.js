// sf_money — credit, first recipients, salary, and channels back to funds.
// p.mode: credit | first | salary | return | overview; p.detail highlights route.
// p.creditAt, firstAt, salaryAt, returnAt: absolute event seconds. Omitted = on.
// Cameras z 1–1.06, ox 0, oy -100. Flow counts/widths are schematic, not shares.
(() => {
  SCENES.sf_money=function(u,p={},d,t){
    const {tx,box,coin,field,path,gold,cyan,white,dim,active,note}=SF;
    let g=field(t,'02 / ПОТОК');
    const node=(x,y,w,title,sub,c=cyan)=>box(x,y,w,57,c)+tx(x+w/2,y+23,title,13,c)+(sub?tx(x+w/2,y+42,sub,10,white):'');
    const bank=(x,y)=>P(`M${x-27} ${y} L${x} ${y-15} L${x+27} ${y} Z`,cyan)+[-18,0,18].map(a=>R(x+a-3,y+5,6,25,'#6dabb9')).join('')+R(x-30,y+34,60,5,cyan);
    if(p.mode==='credit'||!p.mode){
      g+=bank(91,174)+tx(91,235,'БАНК',16,cyan);
      g+=node(210,157,112,'СЧЁТ','заёмщика');
      g+=tx(181,267,'КРЕДИТ → НОВЫЕ ДЕНЬГИ',15,gold);
      const a=active(t,p.creditAt);
      g+=G(path([[118,191],[207,191]],t,5),'',`opacity="${.15+.85*a}"`);
      for(let i=0;i<5;i++)g+=G(coin(231+i*16,299+Math.sin(t*2+i)*4,7,i===2),'',`opacity="${a}"`);
      g+=note('На счёте появляются новые деньги');
    }else if(p.mode==='first'||p.mode==='salary'){
      const salary=p.mode==='salary',a=active(t,salary?p.salaryAt:p.firstAt);
      g+=tx(180,147,'ПЕРВЫЕ ПОЛУЧАТЕЛИ',11,dim);
      const names=['Банки','Компании','Активы'];
      for(let i=0;i<3;i++){
        const x=34+i*101;
        g+=box(x,174,90,52,salary?'#3a5366':p.detail&&i===1?cyan:gold)+tx(x+45,205,names[i],p.detail&&i===1?13:11,salary?dim:p.detail&&i===1?cyan:gold);
        g+=path([[x+45,154],[x+45,170]],t+i,2);
      }
      g+=G(path([[180,229],[180,277]],t,3),'',`opacity="${salary?.25+.75*a:.3}"`);
      g+=node(110,280,140,'ВЫ','зарплата — позже',salary?gold:'#48657a');
      if(salary)g+=coin(282,307+Math.sin(t*2)*7,12,true);
    }else if(p.mode==='return'){
      const a=active(t,p.returnAt);
      g+=node(35,143,130,'ЧАСТЬ ПРИБЫЛИ','компаний',gold)+node(195,143,130,'ВЗНОСЫ','из зарплаты',gold);
      g+=tx(100,223,'Выкуп · дивиденды',10,dim);
      g+=G(path([[100,231],[100,257],[180,257],[180,281]],t,7)+path([[260,209],[260,257],[180,257],[180,281]],t+1,7),'',`opacity="${.3+.7*a}"`);
      g+=box(69,282,222,50,cyan,p.detail?'#173c4b':'#102439')+tx(180,303,'ФОНД ИНДЕКСА',10,dim)+tx(180,322,'S&P 500',18,cyan);
    }else{
      g+=node(38,141,124,'КРЕДИТ','новые деньги',gold)+node(198,141,124,'ПОЛУЧАТЕЛИ','банки · компании',gold);
      g+=path([[164,169],[196,169]],t,2);
      g+=path([[260,200],[260,234],[180,234],[180,271]],t,7);
      g+=tx(124,227,'Прибыль',11,white)+tx(114,246,'Взносы',11,white);
      g+=box(72,273,216,52,cyan)+tx(180,295,'ОБЩИЙ ПОТОК',11,dim)+tx(180,316,'S&P 500',19,cyan);
      if(p.detail)g+=coin(260,235,10,true);
      g+=note('Упрощённая схема · не прогноз роста');
    }
    return g;
  };
})();
