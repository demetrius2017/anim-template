/* s18 — a child grows, balances over a living landscape, becomes a web node.
 * p.s="s18", p.mode="growth", p.K: absolute s18, child_again, growth, adult,
 * survive, changing, environment, s18_end, card/end. No local u/d clock.
 * Neutral engine camera. Slow 3D orbit, then a continuous two-second pullback.
 * The first frame is un_reverse.body at that same absolute t; no cut/reset.
 * All important objects y=16..370; surface fades into the subtitle clearance.
 * From K.card exactly UN.wrap(''): the card belongs only to story.py.
 */
(() => {
  const mix=(a,b,q)=>a+(b-a)*q,n=x=>x.toFixed(3);
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*x*(10+x*(-15+6*x));};
  const ramp=(t,a,b)=>ease((t-a)/Math.max(.001,b-a));
  const hash=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  const samples=[];
  function ellipsoid(child,adult,rc,ra,count,seed,part='body'){
    for(let i=0;i<count;i++){
      const z=1-2*(i+.5)/count,a=i*2.3999632297+seed,r=Math.sqrt(1-z*z);
      const unit=[r*Math.cos(a),z,r*Math.sin(a)];
      if(part==='head'){
        unit[0]*=1-.20*ease((z-.05)/.85);
        // A shallow jaw and nose preserve the anatomical point-cloud style.
        if(unit[2]<0)unit[2]-=.18*Math.exp(-(unit[0]**2)*35-(z-.15)**2*18);
      }
      samples.push({c:child.map((v,k)=>v+rc[k]*unit[k]),a:adult.map((v,k)=>v+ra[k]*unit[k]),h:hash(i+seed*13),part});
    }
  }
  ellipsoid([0,-89,0],[0,-166,0],[10.5,13.3,10.5],[11.6,16,12.7],900,31,'head');
  function tube(child,adult,count,seed,side=1,part='body'){
    const surface=(keys,q,scale,head,a)=>{
      const y=mix(keys[0][0],keys[keys.length-1][0],q);let j=1;
      while(j<keys.length-1&&keys[j][0]<y)j++;
      const k=keys[j-1],l=keys[j],v=ease((y-k[0])/(l[0]-k[0]));
      return [side*(mix(k[1],l[1],v)+mix(k[2],l[2],v)*Math.cos(a))*scale,
        y*scale+head,mix(k[3],l[3],v)*Math.sin(a)*scale];
    };
    for(let i=0;i<count;i++){
      const q=hash(i+seed),a=i*2.3999632297;
      samples.push({c:surface(child,q,.48,-89,a),a:surface(adult,q,.62,-166,a),h:hash(i+seed*13),part});
    }
  }
  tube([[21,0,7,7],[32,0,19,10],[40,0,24,12],[57,0,22,13],[79,0,18,11],[94,0,21,12],[103,0,20,11]],
    [[17,0,8,8],[29,0,15,10],[37,0,34,13],[46,0,37,15],[61,0,32,17],[84,0,26,15],[104,0,23,13],[121,0,29,15],[137,0,27,15],[147,0,22,13]],1100,51);
  for(const side of [-1,1]){
    tube([[94,11,10.5,10],[115,12,10,10],[137,12,7,8],[148,12,6,6.5],[168,13,6.7,7],[186,13,4,4.5]],
      [[132,15,13,13],[153,16,13,13],[179,17,10.4,11],[199,17,7.4,8],[220,17,9,9],[244,18,6,6.5],[263,18,4.7,5]],600,111+side,side,'leg');
    tube([[34,22,6,7],[49,28,7,7],[70,30,5.8,6],[90,32,4.5,5],[105,33,3.7,4]],
      [[36,32,8,9],[48,36,10,10],[72,39,8,8],[90,42,6.4,7],[107,44,7.3,7.5],[131,45,4.5,5]],430,141+side,side,'arm');
    ellipsoid([side*15.8,-35.7,-.4],[side*27.9,-79.8,-.6],[2.2,3.9,2.1],[3.4,7.4,3.3],90,181+side,'arm');
    ellipsoid([side*6.2,1.2,-2.4],[side*11.2,-3,-3.7],[2.6,2.2,4.8],[4,3.1,8.7],90,191+side,'leg');
  }
  function geometry(t,K={}){
    const start=K.s18??0,child=K.child_again??start+.96,growth=K.growth??start+2;
    const adult=K.adult??growth+.38,survive=K.survive??start+3.66;
    const changing=K.changing??start+4.68,environment=K.environment??start+5.34;
    const card=K.card??start+6.312;
    const enter=ramp(t,start-.05,child+.36),grown=ramp(t,growth,adult+.83);
    const pull=ramp(t,survive+.08,environment+.48);
    // A linear change of world scale under a quintic camera envelope keeps
    // the changing landscape readable until the last spoken comparison.
    const scale=mix(1,.018,pull),phase=t-start;
    const ridgeX=-47+31*Math.sin(phase*.83-.5);
    const ridgeZ=-10+8*Math.sin(phase*.53);
    // The bright ball is exactly attached to the moving Gaussian ridge. No
    // numerical integration or sampled maxima: random access stays identical.
    const height=(x,z)=>-10-36*Math.exp(-((x-ridgeX)**2/2000+(z-ridgeZ)**2/3400))
      +7*(1-Math.cos((x-ridgeX)/45))*Math.sin((z-ridgeZ)/37+phase*.9);
    const cam={cx:180,cy:284,yaw:-.22+.065*Math.sin(phase*.38),pitch:.43,f:900,distance:900,scale:1};
    const pp=(x,y,z)=>UN.project([x,y,z],cam);
    const ball=pp(ridgeX,height(ridgeX,ridgeZ)-6.5,ridgeZ);
    return {start,child,growth,adult,survive,changing,environment,card,enter,grown,pull,scale,phase,ridgeX,ridgeZ,height,cam,pp,ball};
  }
  function human(t,g){
    const U=UN,{grown,phase}=g;
    const camera={cx:194,cy:257,yaw:-.20+.04*Math.sin(phase*.4),pitch:0,f:900,distance:900,scale:1};
    let dots='',soft='';
    for(let i=0;i<samples.length;i++){
      const v=samples[i],p=v.c.map((x,k)=>mix(x,v.a[k],grown));
      // Breathing and a quiet balancing gesture continue through the growth.
      if(v.part==='body')p[0]*=1+.008*Math.sin(phase*1.6);
      if(v.part==='arm'){
        p[0]+=Math.sign(p[0])*(2+3*grown)*Math.sin(phase*.85);
        p[1]+=.8*Math.sin(phase*.85+.4);
      }
      const pt=U.project(p,camera),front=clamp((15-pt.z)/30);
      const op=(.25+.48*front)*(.66+.34*v.h),r=.27+.23*v.h;
      const dot=`<circle cx="${n(pt.x)}" cy="${n(pt.y)}" r="${n(r)}" fill="#fff" opacity="${n(op)}"/>`;
      dots+=dot;if(i%8===0)soft+=dot;
    }
    let brain='';
    const headY=mix(-89,-166,grown),nodes=[];
    for(let i=0;i<23;i++){
      const a=i*2.399963,z=1-2*(i+.5)/23,r=Math.sqrt(1-z*z);
      nodes.push(U.project([8*r*Math.cos(a),headY-2+9*z,8*r*Math.sin(a)],camera));
    }
    const h=U.project([0,headY-2,0],camera);
    brain+=`<ellipse cx="${n(h.x)}" cy="${n(h.y)}" rx="19" ry="17" fill="url(#un-halo)" opacity=".55"/>`;
    for(let i=0;i<nodes.length;i++){
      const a=nodes[i],b=nodes[(i+5)%nodes.length];
      brain+=U.thread(a,b,{opacity:.18+.14*Math.sin(t*1.5-i*.41)**2,width:.35});
      brain+=U.sphere(a.x,a.y,.5,{opacity:.6,glow:.65,highlight:false});
    }
    return `<g filter="url(#un-soft)" opacity=".4">${soft}</g>${dots}${brain}`;
  }
  function landscape(t,g){
    const U=UN,{pp,height,ridgeX,ridgeZ,ball}=g;
    const rows=[],nx=32,nz=23;
    for(let j=0;j<=nz;j++){
      const row=[];for(let i=0;i<=nx;i++){
        const x=-142+i/nx*284,z=-63+j/nz*126;
        row.push(pp(x,height(x,z),z));
      }rows.push(row);
    }
    let s='';
    for(let j=0;j<=nz;j++)s+=U.polyline(rows[j],{opacity:.13+.12*j/nz,width:.4});
    for(let i=0;i<=nx;i++)s+=U.polyline(rows.map(r=>r[i]),{opacity:.19,width:.4});
    const crest=[];
    for(let i=0;i<=56;i++){
      const x=ridgeX-35+i/56*70;
      crest.push(pp(x,height(x,ridgeZ)-.5,ridgeZ));
    }
    s+=U.polyline(crest,{width:1.5,opacity:.27,glow:true})+U.polyline(crest,{width:.55,opacity:.54});
    const contact=pp(ridgeX,height(ridgeX,ridgeZ),ridgeZ);
    s+=`<ellipse cx="${n(contact.x)}" cy="${n(contact.y+1)}" rx="7" ry="2.2" fill="#000" opacity=".7"/>`;
    s+=U.sphere(ball.x,ball.y,5.3*ball.s,{glow:1.25});
    s+=U.weight(ball.x,ball.y,6*ball.s,1.7*ball.s,{opacity:.19,angle:g.phase*18});
    return s;
  }
  function body(t,K={}){
    const U=UN,g=geometry(t,K);
    if(t>=g.card)return '';
    const fade=1-ramp(t,g.environment+.12,g.card);
    const previous=g.enter<1&&SCENES.un_reverse?.body?SCENES.un_reverse.body(t,K):'';
    if(g.enter<1e-9&&previous)return previous;
    const outside=ease((g.pull-.24)/.76);
    // One continuous dolly: the whole little world shrinks around its centre.
    const cy=190,ty=mix(0,-10,g.pull);
    let local=`<defs><radialGradient id="un-child-shade"><stop stop-color="#000" stop-opacity=".9"/><stop offset=".68" stop-color="#000" stop-opacity=".75"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs><ellipse cx="194" cy="181" rx="61" ry="105" fill="url(#un-child-shade)" opacity="${n(outside)}"/>`+landscape(t,g)+human(t,g);
    local=`<g transform="translate(180 ${n(cy+ty)}) scale(${n(g.scale)}) translate(-180 -${cy})">${local}</g>`;
    let s=U.bokeh(t,{seed:48,count:23,opacity:.48})+local;
    if(SCENES.un_reverse?.web){
      const network=SCENES.un_reverse.web(t,K,{camera:{cx:180,cy:198,scale:1.1-.12*g.pull},opacity:.7*outside});
      s=U.bokeh(t,{seed:48,count:23,opacity:.48})+network+local;
    }
    const node=ramp(t,g.environment,g.environment+.48);
    s+=U.sphere(180,cy+ty,1.8,{opacity:.85*node,glow:1.1});
    return `<g opacity="${n(fade)}"><g opacity="${n(1-g.enter)}">${previous}</g><g opacity="${n(g.enter)}">${s}</g></g>`;
  }
  SCENES.un_child=function(u,p={},d,t){return UN.wrap(body(t,p.K||{}));};
  SCENES.un_child.body=body;
  SCENES.un_child.geometry=geometry;
})();
