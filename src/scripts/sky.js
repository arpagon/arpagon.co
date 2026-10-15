// Starry-night sky (after Van Gogh's "The Starry Night", MoMA): a flow field of faint strokes
// around a few vortices, painted once and left still, plus moon, halo stars and a subtle cypress.
// Respects prefers-reduced-motion (paints instantly, no animation).
export function sky(c,o){o=Object.assign({n:800,frames:480,wa:.045,ga:.08,goldRatio:.1,lw:.8,glw:1.1,speed:1.5,life:[50,210],
wind:.55,wave:.35,stars:70,moon:[.24,.13],moonR:22,vortices:[[.2,.32,.26,1],[.38,.7,.16,-1],[.08,.82,.12,1]]},o||{});
const x=c.getContext('2d'),dpr=Math.min(devicePixelRatio||1,2),still=matchMedia('(prefers-reduced-motion: reduce)').matches,G='201,162,74';
let W,H,V,P,f=0,raf,mv=null,tm=0;const BG=o.bg||'11,11,13';
function sp(){return{x:Math.random()*W,y:Math.random()*H*(o.skyH||1),l:o.life[0]+Math.random()*(o.life[1]-o.life[0]),g:Math.random()<o.goldRatio}}
function init(){cancelAnimationFrame(raf);W=c.clientWidth;H=c.clientHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
x.fillStyle=`rgb(${BG})`;x.fillRect(0,0,W,H);const m=Math.min(W,H);V=o.vortices.map(v=>({x:W*v[0],y:H*v[1],r:m*v[2],s:v[3]}));
P=Array.from({length:o.n},sp);f=0;stars();loop()}
function fld(px,py){let vx=o.wind,vy=Math.sin(px*.0045+py*.0021+tm)*o.wave;const vs=mv?V.concat([mv]):V;
for(const v of vs){const dx=px-v.x,dy=py-v.y,d=Math.hypot(dx,dy)+.001,k=Math.exp(-d*d/(2*v.r*v.r))*2.4;vx+=-dy/d*k*v.s;vy+=dx/d*k*v.s}
const n=Math.hypot(vx,vy);return[vx/n,vy/n]}
function step(){x.lineCap='round';if(o.live){x.fillStyle=`rgba(${BG},${o.fade||.02})`;x.fillRect(0,0,W,H);tm+=.0015}
for(const p of P){const[a,b]=fld(p.x,p.y),nx=p.x+a*o.speed,ny=p.y+b*o.speed;
x.strokeStyle=p.g?`rgba(${G},${o.ga})`:`rgba(232,232,240,${o.wa})`;x.lineWidth=p.g?o.glw:o.lw;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(nx,ny);x.stroke();
p.x=nx;p.y=ny;if(--p.l<0||nx<0||nx>W||ny<0||ny>H*(o.skyH||1))Object.assign(p,sp())}
if(o.live&&f%3==0){stars(true);decor()}f++}
function decor(){halos();if(o.mountains)mountains();if(o.cypress)cypress();moon()}
function stars(soft){const N=soft?6:o.stars;for(let i=0;i<N;i++){const sx=Math.random()*W,sy=Math.random()*H*.75,r=Math.random()*1.1+.2;
x.fillStyle=`rgba(255,255,255,${soft?.15:.25+Math.random()*.5})`;x.beginPath();x.arc(sx,sy,r,0,7);x.fill()}
}
function halos(){if(!o.haloStars)return;for(const s of o.haloStars){const sx=W*s[0],sy=H*s[1],r=s[2];for(let i=1;i<=6;i++){x.strokeStyle=`rgba(${i%2?G:'240,236,220'},${(.16-i*.02)*(o.haloA||1)})`;x.lineWidth=1.2;x.beginPath();x.arc(sx,sy,r+i*(o.haloGap||7),0,7);x.stroke()}
const g=x.createRadialGradient(sx,sy,0,sx,sy,r*1.6);g.addColorStop(0,'#fff8e0');g.addColorStop(.6,`rgba(233,217,174,${.5*(o.haloA||1)})`);g.addColorStop(1,'rgba(233,217,174,0)');x.fillStyle=g;x.beginPath();x.arc(sx,sy,r*1.6,0,7);x.fill()}}
function moon(){if(!o.moon)return;const mx=W*o.moon[0],my=H*o.moon[1],r=o.moonR;
if(!o.live)for(let i=6;i>0;i--){x.strokeStyle=`rgba(${G},${.035*i/6})`;x.lineWidth=1;x.beginPath();x.arc(mx,my,r+i*9,0,7);x.stroke()}
const g=x.createRadialGradient(mx-r*.3,my-r*.3,r*.1,mx,my,r);g.addColorStop(0,'#fbf6e6');g.addColorStop(1,'#d9cfb2');x.fillStyle=g;x.beginPath();x.arc(mx,my,r,0,7);x.fill()}
function mountains(){const base=H*.965,X=W*.62;for(let k=0;k<6;k++){x.beginPath();for(let px=0;px<=X;px+=4){const py=base-k*9-Math.sin(px*.007+k*1.3)*14-Math.sin(px*.019+k*2)*6-Math.max(0,Math.sin(px/X*3.1))*26;px?x.lineTo(px,py):x.moveTo(px,py)}
x.strokeStyle=k==2?`rgba(${G},.45)`:`rgba(230,230,240,${.22-k*.025})`;x.lineWidth=k==2?1.3:1;x.stroke()}
for(let i=0;i<70;i++){const hx=Math.random()*X,hy=base+4+Math.random()*(H-base-6);x.fillStyle=`rgba(${G},${.35+Math.random()*.5})`;x.beginPath();x.arc(hx,hy,Math.random()*1.3+.5,0,7);x.fill()}}
function cypress(){const cx=W*o.cypress[0],by=H,top=H*o.cypress[1];x.lineCap='round';const CA=o.cypA||1;for(let i=0;i<(o.cypN||520);i++){const t=Math.random(),y=by-(by-top)*t,w=(1-t)*(o.cypW||90)+8,
xx=cx+(Math.random()-.5)*w+Math.sin(y*.03)*6;x.strokeStyle=Math.random()<.25?`rgba(${G},${.30*CA})`:Math.random()<.5?`rgba(232,232,240,${.16*CA})`:'rgba(4,4,6,.9)';x.lineWidth=2.2;x.beginPath();x.moveTo(xx,y);x.lineTo(xx+Math.sin(y*.05)*4,y-14-Math.random()*16);x.stroke()}}
const MAX=o.frames;function loop(){const k=still?MAX:(o.live?1:4);for(let i=0;i<k&&(o.live||f<MAX);i++)step();
if(still){decor();return}if(o.live||f<MAX)raf=requestAnimationFrame(loop);else decor()}
if(o.mouse){addEventListener('pointermove',ev=>{const m=Math.min(W,H);mv={x:ev.clientX,y:ev.clientY,r:m*.12,s:1}});addEventListener('pointerleave',()=>mv=null)}
let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(init,200)});init()}

export const FINAL = {"haloStars": [[0.07, 0.1, 4], [0.42, 0.3, 3.5], [0.22, 0.6, 4.5], [0.45, 0.88, 3], [0.1, 0.94, 3]], "haloA": 0.55, "haloGap": 6, "cypress": [0.025, 0.34], "cypA": 0.55, "cypN": 380, "cypW": 64};
