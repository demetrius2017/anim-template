/* Universe Net v2, phrase 10: a single exponential dolly through three parent nets.
 * p.s: s10; p.mode: nested; p.K: absolute nested_2/3, s10/s11 cues.
 * Neutral external camera. Entry: SCENES.un_towers.body(t,K,'built') stays exact
 * at zoom 1, then both towers shrink as one object and become the central node
 * of the first parent; without un_towers the node stands there from black.
 * Every parent contains the previous network at its central node; no scene
 * swaps or cyclic resets. Three parent scales, continuous absolute-time
 * projection across the frame. SCENES.un_nested.body(t,K,mode) is raw SVG. The
 * dolly comes to rest on K.s11-.05 at the exact pose un_cosmos opens from, so
 * that dissolve is between two matching pictures, not two scales of one net.
 */
(() => {
  const clamp=x=>Math.max(0,Math.min(1,x));
  const f=x=>x.toFixed(3);
  const ratio=6.5;
  // One central child and an asymmetric cloud with true perspective depth.
  const clouds=Array.from({length:3},(_,level)=>{
    const h=n=>{const q=Math.sin(n*127.1+311.7)*43758.5453;return q-Math.floor(q);};
    const vertices=[[0,0,0]];
    for(let i=0;i<43;i++) {
      const angle=i*2.3999632297+level*.73,r=23+112*Math.sqrt(h(i+40+level*137));
      vertices.push([Math.cos(angle)*r,Math.sin(angle)*r*.92,(h(i+561+level*37)-.5)*135]);
    }
    const links=[];
    for(let i=0;i<vertices.length;i++) {
      const nearest=vertices.map((p,j)=>({j,d:p.reduce((a,v,k)=>a+(v-vertices[i][k])**2,0)}))
        .filter(p=>p.j!==i).sort((a,b)=>a.d-b.d).slice(0,i===0?5:3);
      for(const n of nearest)if(n.j>i)links.push([i,n.j]);
    }
    return {vertices,links};
  });
  function net(level,scale,t,appear) {
    if(scale>16||scale<.007)return '';
    const {vertices,links}=clouds[level-1];
    const weighted=links.filter(([a])=>a===0).slice(0,2).map(([,b])=>b);
    const far=1-UN.smooth((scale-4)/12);
    const detail=UN.smooth((scale-.12)/.20);
    const alpha=appear*far*detail;
    const c={cx:180,cy:184,scale,f:800,distance:800,
      yaw:-.28+.07*Math.sin(t*.15)+level*.22,pitch:.10*Math.sin(t*.14+level)};
    const pts=vertices.map(v=>UN.project(v,c));
    let s='';
    for(let j=0;j<links.length;j++) {
      const [a,b]=links[j],pa=pts[a],pb=pts[b];
      if(Math.max(pa.x,pb.x)<-20||Math.min(pa.x,pb.x)>380||Math.max(pa.y,pb.y)<-20||Math.min(pa.y,pb.y)>660)continue;
      s+=UN.thread(pa,pb,{width:Math.max(.25,Math.min(.65,.48*Math.sqrt(scale))),opacity:.36*alpha});
      if(j%8===0 && scale<3.6) {
        const q=(t*.24+j*.13)%1;
        s+=UN.sphere(pa.x+(pb.x-pa.x)*q,pa.y+(pb.y-pa.y)*q,Math.max(.3,Math.min(1.4,scale)),{opacity:.55*alpha*(1-UN.smooth((scale-2.8)/.8))*Math.sin(Math.PI*q)**2,glow:.7});
      }
    }
    const order=pts.map((p,i)=>({p,i})).sort((a,b)=>b.p.z-a.p.z);
    for(const {p,i} of order) {
      if(i===0||p.x<-120||p.x>480||p.y<-120||p.y>760)continue;
      const r=(2.4+1.8*UN.hash(i+level*17))*p.s;
      s+=UN.sphere(p.x,p.y,Math.min(38,r),{opacity:alpha*(.72+.14*Math.sin(i+t*.4)),glow:.9});
      if(weighted.includes(i)&&scale>.15&&scale<3) {
        const b=pts[0],x=p.x*.65+b.x*.35,y=p.y*.65+b.y*.35;
        s+=UN.weight(x,y,9*scale,1.6*scale,{opacity:.35*alpha*UN.smooth((scale-.15)/.2)*(1-UN.smooth((scale-2.2)/.8)),angle:(i%3-1)*25});
      }
    }
    // Fine remnants stay visible inside the central child's luminous ball.
    const collapse=1-detail;
    s+=UN.sphere(180,184,Math.max(.4,57*scale),{opacity:collapse*appear*.78,glow:1});
    return s;
  }
  function bodyAt(t,K={},mode) {
    const begin=(K.s10??0)-.05,end=(K.s11??begin+2.7)-.05;
    // K's three spoken 'сеть' occurrences pace the route through parent scales.
    // Monotonic cubic Hermite interpolation keeps velocity continuous at cues.
    const times=[begin,K.nested_2??begin+.71,K.nested_3??begin+1.65,end];
    const values=[0,1,2,2.92],slopes=times.map((v,i)=> i===0||i===3?0:2/(times[i+1]-times[i-1]));
    let logZoom=values[3];
    if(t<=times[0])logZoom=0;
    else for(let i=0;i<3;i++)if(t<=times[i+1]) {
      const span=times[i+1]-times[i],q=clamp((t-times[i])/span),q2=q*q,q3=q2*q;
      logZoom=(2*q3-3*q2+1)*values[i]+(q3-2*q2+q)*span*slopes[i]
        +(-2*q3+3*q2)*values[i+1]+(q3-q2)*span*slopes[i+1];break;
    }
    const zoom=Math.pow(ratio,-logZoom);
    const appear=UN.smooth((t-begin)/.6);
    const towerOpacity=1-UN.smooth((logZoom-.7)/.65);
    const towers=towerOpacity>.001?UN_V2.prev('un_towers',t,K,'built'):null;
    const shown=UN_V2.towers(t,K);
    const cy=(shown.right.top.y+shown.right.base.y)/2;
    let s=UN.bokeh(t,{count:23,opacity:.6*appear,seed:48});
    // Far parents first, near child last; all levels coexist for the whole move.
    for(let i=3;i>=1;i--)s+=net(i,zoom*Math.pow(ratio,i),t,appear);
    // Zoom about (180,184): identity at the seam, the towers' middle at the node.
    if(towers!==null)s+=`<g opacity="${f(towerOpacity)}" transform="translate(180 184) scale(${zoom.toFixed(5)}) translate(-180 -184)">${towers}</g>`;
    const towerNode=typeof SCENES.un_towers?.body==='function'?UN.smooth((logZoom-.55)/.65):appear;
    s+=UN.sphere(180,184+(cy-184)*zoom,Math.max(.5,40*zoom),{opacity:towerNode,glow:1.1});
    return s;
  }
  SCENES.un_nested=function(u,p={},d,t) {return UN.wrap(bodyAt(t,p.K||{},p.mode));};
  SCENES.un_nested.body=bodyAt;
})();
