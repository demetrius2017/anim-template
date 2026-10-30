/* Universe Net shared SVG vocabulary, v1. Logical frame 360×640, output 1080×1920.
 * All public drawing methods return SVG strings; no mutable animation state.
 * World: x right, y down, z away. project([x,y,z], camera) -> {x,y,z,s}.
 * camera: cx=180,cy=216,f=620,distance=620,yaw=-.35,pitch=.22,scale=1.
 * sphere(x,y,r,{opacity,glow,highlight}); thread(a,b,{opacity,width});
 * weight(x,y,rx=34,ry=5,{opacity,angle}); token(x,y,text,{w,h,size,opacity,cursor});
 * block([x,y,z],{w,h,depth,nx,ny,nz,opacity,rays,dots},camera);
 * surface(heightFn,{span,steps,opacity},camera); polyline(points,opts);
 * mono(x,y,text,{size,anchor,opacity}); italic(...same options);
 * bokeh(absoluteTime,{count,opacity,seed}); wrap(svg) adds black/defs/full-frame clip and a soft lower fade.
 * at(K,key,t,duration=.7,fallback=0) is eased progress since an ABSOLUTE cue.
 * Full frame: x=0..360,y=0..640; soft fade y=310..410. Captions: y=410..480. No scene may
 * write UI state. CSS scopes to #root:has(#un-world); other episodes unchanged.
 * render.py automatically loads engine/scenes/*.js (sorted). Functions may
 * reference UN at call time even when their file sorts before un_lib.js.
 */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    @font-face{font-family:UNSerif;src:url('../fonts/PTSerif-Italic.ttf');font-style:italic;font-weight:400}
    #root:has(#un-world){background:#000}
    #root:has(#un-world) #grain,#root:has(#un-world) #vig{display:none}
    #root:has(#un-world) #cap{top:410px;left:23px;right:23px;font-family:UNSerif,serif;
      font-style:italic;font-weight:400;font-size:24px;line-height:29px;letter-spacing:0;text-transform:none}
    #root:has(#un-world) #cap .w,#root:has(#un-world) #cap .w.on{color:#fff;text-shadow:0 0 5px #ffffff35;margin:0 2.5px}
    #root:has(#un-world) .part{font-family:UNSerif,serif;font-style:italic;font-weight:400;text-transform:none}
    #root:has(#un-world) .part .un-sources{font-family:Plex,monospace;font-style:normal;font-weight:500;color:#fff;line-height:1.55;display:inline-block;text-shadow:0 0 2px #ffffff30}
    #root:has(#un-world) .part i{font-family:Plex,monospace;font-style:normal;font-size:7px;color:#aaa}
  `;
  document.head.appendChild(style);
  const num = v => Number(v).toFixed(3);
  const esc = v => String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  const xy = p => Array.isArray(p) ? p : [p.x,p.y];
  const clamp01 = x => Math.max(0,Math.min(1,x));
  const smooth = x => {x=clamp01(x);return x*x*(3-2*x);};
  const hashN = n => {const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
  function project(point, c={}) {
    let [x,y,z]=point;
    const yaw=c.yaw??-.35,pitch=c.pitch??.22;
    [x,z]=[x*Math.cos(yaw)+z*Math.sin(yaw),-x*Math.sin(yaw)+z*Math.cos(yaw)];
    [y,z]=[y*Math.cos(pitch)-z*Math.sin(pitch),y*Math.sin(pitch)+z*Math.cos(pitch)];
    const s=(c.f??620)/Math.max(40,(c.distance??620)+z)*(c.scale??1);
    return {x:(c.cx??180)+x*s,y:(c.cy??216)+y*s,z,s};
  }
  function polyline(points,o={}) {
    if(!points.length)return '';
    return `<path d="${points.map((p,i)=>{const [x,y]=xy(p);return `${i?'L':'M'}${num(x)} ${num(y)}`;}).join(' ')}${o.close?' Z':''}" fill="none" stroke="#fff" stroke-width="${o.width??.55}" opacity="${o.opacity??.4}" stroke-linecap="round" stroke-linejoin="round"${o.glow?' filter="url(#un-soft)"':''}/>`;
  }
  function thread(a,b,o={}) {return polyline([a,b],o);}
  function sphere(x,y,r,o={}) {
    const op=o.opacity??1,g=o.glow??1;
    return `<g opacity="${op}"><circle cx="${num(x)}" cy="${num(y)}" r="${num(Math.min(r*3.6,r+55))}" fill="url(#un-halo)" opacity="${.65*g}"/>
      <circle cx="${num(x)}" cy="${num(y)}" r="${num(r*1.02)}" fill="none" stroke="#fff" stroke-width="${Math.max(1.5,r*.04)}" opacity="${.4*g}" filter="url(#un-soft)"/>
      <circle cx="${num(x)}" cy="${num(y)}" r="${num(r)}" fill="url(#un-ball)" stroke="#fff" stroke-opacity=".94" stroke-width="${Math.max(.5,r*.011)}"/>
      ${o.highlight===false?'':`<ellipse cx="${num(x-r*.30)}" cy="${num(y-r*.33)}" rx="${num(r*.3)}" ry="${num(r*.38)}" fill="#fff" opacity=".95" transform="rotate(36 ${num(x-r*.3)} ${num(y-r*.33)})"/>`}</g>`;
  }
  function weight(x,y,rx=34,ry=5,o={}) {
    return `<g opacity="${o.opacity??.65}" transform="rotate(${o.angle??0} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="#fff" stroke-width=".55"/>
      <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="#fff" stroke-width="1.3" opacity=".25" filter="url(#un-soft)"/></g>`;
  }
  function label(x,y,text,o={},italic=false) {
    return `<text x="${num(x)}" y="${num(y)}" fill="#fff" opacity="${o.opacity??.9}" font-family="${italic?'UNSerif':'Plex'}" font-style="${italic?'italic':'normal'}" font-weight="${italic?400:600}" font-size="${o.size??(italic?20:9)}" text-anchor="${o.anchor??'start'}"${o.glow?' filter="url(#un-text-glow)"':''}>${esc(text)}</text>`;
  }
  function token(x,y,text,o={}) {
    const w=o.w??Math.max(32,text.length*6+18),h=o.h??23;
    return `<g opacity="${o.opacity??1}"><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="#000" stroke="#fff" stroke-width=".9"/>
      ${label(x,y+3.5,text,{size:o.size??10,anchor:'middle'})}
      ${o.cursor?thread([x,y-5],[x,y+5],{width:.8,opacity:1}):''}</g>`;
  }
  function block(center=[0,0,0],o={},camera={}) {
    const w=o.w??172,h=o.h??96,d=o.depth??105;
    const pp=(x,y,z)=>project([x+center[0],y+center[1],z+center[2]],camera);
    const v=[];for(let z of [-d/2,d/2])for(let y of [-h/2,h/2])for(let x of [-w/2,w/2])v.push(pp(x,y,z));
    let svg='';
    for(const [a,b] of [[0,1],[0,2],[1,3],[2,3],[4,5],[4,6],[5,7],[6,7],[0,4],[1,5],[2,6],[3,7]])svg+=thread(v[a],v[b],{opacity:.45,width:.5});
    const nx=Math.max(2,o.nx??13),ny=Math.max(2,o.ny??8),nz=Math.max(1,o.nz??3),pts=[];
    for(let k=0;k<nz;k++)for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
      pts.push(pp((i/(nx-1)-.5)*w,(j/(ny-1)-.5)*h,(k/Math.max(1,nz-1)-.5)*d));
    }
    pts.sort((a,b)=>b.z-a.z);
    if(o.rays!==false){const focus=pp(0,h*.15,0);for(let i=0;i<pts.length;i+=4)svg+=thread(pts[i],focus,{opacity:.15,width:.38});}
    if(o.dots!==false){let dots='';for(const p of pts)dots+=`<circle cx="${num(p.x)}" cy="${num(p.y)}" r="${num(Math.max(.3,.8*p.s))}" fill="#fff" opacity="${clamp01(.72-p.z*.001)}"/>`;
      svg+=`<g filter="url(#un-soft)" opacity=".55">${dots}</g>${dots}`;}
    return `<g opacity="${o.opacity??1}">${svg}</g>`;
  }
  function surface(height=(x,z)=>18*Math.sin(x/65)*Math.cos(z/58),o={},camera={}) {
    const span=o.span??270,n=o.steps??27,coords=[];
    for(let j=0;j<=n;j++){const row=[];for(let i=0;i<=n;i++){
      const x=(i/n-.5)*span,z=(j/n-.5)*span;
      row.push(project([x,height(x,z),z],camera));
    }coords.push(row);}
    let out='';for(let i=0;i<=n;i++){
      out+=polyline(coords[i],{opacity:o.opacity??.24,width:.42});
      out+=polyline(coords.map(r=>r[i]),{opacity:o.opacity??.24,width:.42});
    }return out;
  }
  function bokeh(t,o={}) {
    let s='';const count=o.count??32,seed=o.seed??10;
    for(let i=0;i<count;i++){
      const k=i+seed*97,x=hashN(k)*400-20+Math.sin(t*.11+k)*3,y=hashN(k+90)*350+10;
      const r=2+hashN(k+170)*8,op=(.025+hashN(k+240)*.05)*(o.opacity??1);
      s+=`<circle cx="${num(x)}" cy="${num(y)}" r="${num(r)}" fill="#fff" fill-opacity="${op}" stroke="#fff" stroke-opacity="${op*.8}" stroke-width=".6" filter="url(#un-soft)"/>`;
    }return s;
  }
  const defs=`<defs>
    <radialGradient id="un-ball" cx="28%" cy="25%" r="83%"><stop stop-color="#fff" stop-opacity=".98"/><stop offset=".26" stop-color="#f8f8f8" stop-opacity=".75"/><stop offset=".7" stop-color="#999" stop-opacity=".5"/><stop offset="1" stop-color="#ddd" stop-opacity=".6"/></radialGradient>
    <radialGradient id="un-halo"><stop stop-color="#fff" stop-opacity=".3"/><stop offset=".34" stop-color="#fff" stop-opacity=".13"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <filter id="un-soft" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.25"/></filter>
    <filter id="un-text-glow" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <clipPath id="un-safe"><rect x="0" y="0" width="360" height="640"/></clipPath>
    <linearGradient id="un-bottom-fade" gradientUnits="userSpaceOnUse" x1="0" y1="310" x2="0" y2="410">
      <stop stop-color="#fff" stop-opacity="1"/><stop offset=".2" stop-color="#fff" stop-opacity=".96"/>
      <stop offset=".45" stop-color="#fff" stop-opacity=".72"/><stop offset=".7" stop-color="#fff" stop-opacity=".28"/>
      <stop offset=".9" stop-color="#fff" stop-opacity=".025"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="un-bottom-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="360" height="640" style="mask-type:alpha"><rect width="360" height="640" fill="url(#un-bottom-fade)"/></mask>
  </defs>`;
  function wrap(svg) {return `<g id="un-world" mask="url(#un-bottom-mask)"><rect x="-400" y="-640" width="1160" height="1920" fill="#000"/>${defs}<g clip-path="url(#un-safe)">${svg}</g></g>`;}
  function at(K,key,t,duration=.7,fallback=0) {return smooth((t-(K?.[key]??fallback))/Math.max(.001,duration));}
  window.UN=Object.freeze({project,polyline,thread,sphere,weight,block,surface,token,bokeh,wrap,at,smooth,hash:hashN,
    mono:(x,y,s,o)=>label(x,y,s,o),italic:(x,y,s,o)=>label(x,y,s,o,true)});
})();
