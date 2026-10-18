// Shared SVG vocabulary for sf_*: navy field, cyan index, gold dollar.
// All motion uses absolute t. No state, timers, randomness, assets or logos.
const SF = (() => {
  const gold='#f8c769', cyan='#81e7ee', white='#e9f2f6', dim='#8ca8ba', bg='#071322';
  const tx=(x,y,s,size=13,c=white,extra='') => T(x,y,String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'),size,c,`${extra.includes("text-anchor")?"":"text-anchor=\"middle\""} font-family="Mont" font-weight="600" ${extra}`);
  const box=(x,y,w,h,c=cyan,fill='#102439')=>R(x,y,w,h,fill,`rx="10" stroke="${c}" stroke-width="1.2"`);
  const coin=(x,y,r=7,hero=false)=>Ci(x,y,r*2.4,'url(#glowW)')+Ci(x,y,r,gold)+Ci(x,y,r*.72,'none',`stroke="#967038" stroke-width=".6"`)+(hero?tx(x,y+r*.36,'$',r*1.2,'#604322'):'');
  const field=(t,tag)=>R(-250,-350,900,1300,bg)+Ci(180,200,180,'url(#glowC)','opacity=".10"')+L(32,120,328,120,'#244055',.6)+tx(33,49,'ДЕНЬГИ / РЫНОК',8,dim,'text-anchor="start" letter-spacing="2"')+tx(327,49,tag,8,dim,'text-anchor="end" letter-spacing="1"')+L(32,356,328,356,'#244055',.6)+coin(42+((t*19)%276),356,3);
  const path=(points,t,n=5,c=gold)=>{
    let g='';
    for(let k=0;k<points.length-1;k++)g+=L(...points[k],...points[k+1],'#385165',1.2);
    for(let i=0;i<n;i++){
      const q=((t*.31+i/n)%1+1)%1, at=q*(points.length-1), j=Math.min(points.length-2,Math.floor(at)), f=at-j;
      const x=mix(points[j][0],points[j+1][0],f),y=mix(points[j][1],points[j+1][1],f);
      g+=Ci(x,y,7,'url(#glowW)')+Ci(x,y,i===0?3.2:1.8,c);
    }return g;
  };
  const active=(t,at,span=.8)=>at===undefined?1:eout(lin(t,at,at+span));
  const note=(s)=>tx(180,342,s,9,dim);
  return {gold,cyan,white,dim,bg,tx,box,coin,field,path,active,note};
})();
