/* Style contact sheet. p.mode: 0 pair,1 network,2 sigmoid,3 block,4 loss,5 tower/tokens.
 * Without mode, advances each 3 sec, for QA only. p.K: optional absolute cues.
 * Recommended camera {z0:1,z1:1,drift:0,kicks:0}. All content above y=370.
 */
(() => {
  SCENES.un_style=function(u,p,d,t){
    const U=UN,m=p.mode??Math.floor(t/3)%6;
    let s=U.bokeh(t,{opacity:m===0?.15:.5});
    const drift=Math.sin(t*.4)*1.8;
    if(m===0){
      s+=U.thread([182+drift,80],[180,342]);
      s+=U.weight(181,230,36,5.2);
      s+=U.sphere(182+drift,80,9)+U.sphere(180,342,6);
      s+=U.italic(89,233,'Число,',{size:21,glow:true});
    }else if(m===1){
      for(let i=0;i<6;i++){
        const x=62+i*47,y=290+(i%2)*39;
        s+=U.thread([180,76],[x,y],{opacity:.5});
        s+=U.weight(180+(x-180)*.54,76+(y-76)*.54,18,4,{angle:(i-2)*7,opacity:.5});
        s+=U.sphere(x,y,4.7)+U.mono(x-12,195+i%2*24,`×${(i*.3+.5).toFixed(1)}`,{size:7});
      }s+=U.sphere(180,76,7.5)+U.mono(192,79,'1,88',{size:9});
    }else if(m===2){
      s+=U.sphere(180,195,105,{glow:.55,highlight:false});
      s+=`<ellipse cx="143" cy="153" rx="25" ry="31" fill="#fff" opacity=".8" transform="rotate(40 143 153)" filter="url(#un-soft)"/>`;
      s+=U.thread([102,195],[264,195],{opacity:.2})+U.thread([180,110],[180,281],{opacity:.2});
      const points=[];for(let x=-79;x<=79;x+=2)points.push([180+x,195-66*Math.tanh(x/24)]);
      s+=U.polyline(points,{opacity:1,width:1.5})+U.polyline(points,{opacity:.45,width:3,glow:true});
      for(let i=0;i<5;i++)s+=U.thread([180,195],[65+i*59,367],{opacity:.35});
    }else if(m===3){
      s+=U.block([0,0,0],{w:205,h:160,depth:150,nx:20,ny:16,nz:4},{cy:215,yaw:-.52+t*.009,pitch:.27});
    }else if(m===4){
      s+=U.block([0,-104,25],{w:160,h:90,depth:85,nx:15,ny:8,nz:3},{cy:217,yaw:-.2,pitch:.13});
      s+=U.surface((x,z)=>24*Math.sin(x/65)*Math.cos(z/60)+18,{span:310,steps:29},{cy:283,yaw:.1,pitch:.45});
      s+=U.sphere(178+drift,299,4.8)+U.mono(138,297,'0,81',{size:8});
    }else{
      for(let i=0;i<6;i++)s+=U.block([0,120-i*43,0],{w:54,h:40,depth:45,nx:6,ny:5,nz:3},{cy:196,yaw:-.35,pitch:.15});
      s+=U.token(180,43,'Это',{w:37,h:20});
      s+=U.token(79,320,'Атом',{w:51,h:22})+U.token(271,320,'Ты?',{w:43,h:22});
      const arc=[];for(let i=0;i<=40;i++){const a=i/40;arc.push([79+a*192,320-Math.sin(Math.PI*a)*70]);}
      s+=U.polyline(arc,{opacity:.7,width:.8});
    }
    return U.wrap(s);
  };
})();
