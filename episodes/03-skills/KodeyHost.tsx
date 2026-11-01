import React, {useId} from 'react';
import {AbsoluteFill,Audio,Img,staticFile,useCurrentFrame} from 'remotion';
import motion from './host-motion.json';
const blinkCenters=[75,167,281,376,493,605,724,849,971,1093,1217,1340,1471,1608,1620];
export const eyeOpenness=(frame:number)=>{
  const distance=Math.min(...blinkCenters.map(x=>Math.abs(frame-x)));
  return distance>=4?1:Math.max(.035,Math.sin(distance/4*Math.PI/2));
};
export const KodeyHost=({width=410,left=610,top=1395,frameOffset=0}:{width?:number;left?:number;top?:number;frameOffset?:number})=>{
 const local=useCurrentFrame();const frame=local+frameOffset;
 const sample=motion.mouth[Math.min(frame,motion.mouth.length-1)] ?? {shape:'rest',open:0};
 const energy=sample.open;const blink=eyeOpenness(frame);const shape=sample.shape;
 const round=shape==='O'||shape==='U';const narrow=shape==='I'||shape==='E';
 const rw=round?(shape==='U'?35:49):narrow?94:83;
 const rh=3+energy*(round?50:narrow?27:45);
 const mouthX=742,mouthY=352;
 const uid=useId().replace(/[^a-zA-Z0-9]/g,'');
 const tag=(x:string)=>x+uid;
 const url=(x:string)=>`url(#${tag(x)})`;
 const glance=Math.sin(frame/110)*3;
 return <div style={{position:'absolute',left,top,width,height:width*1123/1401,transform:`translateY(${Math.sin(frame/22)*3-energy*3}px) rotate(${Math.sin(frame/110)*.6}deg)`,transformOrigin:'50% 80%'}}>
  <Img src={staticFile('mascot/kodey-body.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%'}}/>
  <svg viewBox="0 0 1401 1123" style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible'}}>
   <defs>
    <radialGradient id={tag('white')} cx="35%" cy="25%" r="80%"><stop stopColor="#ffffff"/><stop offset=".66" stopColor="#eaf3f3"/><stop offset="1" stopColor="#a6b9bd"/></radialGradient>
    <radialGradient id={tag('iris')} cx="30%" cy="20%" r="90%"><stop stopColor="#4c6669"/><stop offset=".65" stopColor="#182c31"/><stop offset="1" stopColor="#08171c"/></radialGradient>
    <linearGradient id={tag('lip')} x2="0" y2="1"><stop stopColor="#526064"/><stop offset=".24" stopColor="#253337"/><stop offset="1" stopColor="#0c191f"/></linearGradient>
    <linearGradient id={tag('mouth')} x2="0" y2="1"><stop stopColor="#110f17"/><stop offset="1" stopColor="#502932"/></linearGradient>
    <clipPath id={tag('mouthClip')}><ellipse cx={mouthX} cy={mouthY} rx={rw} ry={rh}/></clipPath>
   </defs>
   {[{x:617,y:218,angle:-9},{x:850,y:224,angle:10}].map((e,i)=><g key={i} transform={`translate(${e.x} ${e.y}) rotate(${e.angle})`}>
    <g transform={`scale(1 ${blink})`}>
     <ellipse cy="6" rx="77" ry="91" fill="#07151acc"/>
     <ellipse rx="72" ry="86" fill={url('white')} stroke="#345055" strokeWidth="7"/>
     <g transform={`translate(${glance+(i===0?6:-6)} 5)`}><ellipse rx="47" ry="59" fill={url('iris')}/><ellipse rx="31" ry="43" fill="#061419"/><circle cx="-15" cy="-23" r="19" fill="white"/><circle cx="18" cy="27" r="9" fill="#fff" opacity=".9"/></g>
     <path d="M-53-45Q-14-82 37-58" fill="none" stroke="white" strokeWidth="4" opacity=".48"/>
    </g>
    {blink<.25&&<path d="M-67 2Q0 27 67 2" stroke="#82989c" strokeWidth="8" fill="none" strokeLinecap="round"/>}
   </g>)}
   <g>
    {energy<.075||shape==='closed'?<><path d="M657 345Q742 390 827 345" stroke="#0e1c21" strokeWidth="16" fill="none" strokeLinecap="round"/><path d="M664 347Q742 385 820 347" stroke="#aabfc0" strokeWidth="4" opacity=".8" fill="none"/></>:<>
     <ellipse cx={mouthX} cy={mouthY+4} rx={rw+10} ry={rh+10} fill={url('lip')}/>
     <ellipse cx={mouthX} cy={mouthY} rx={rw} ry={rh} fill={url('mouth')}/>
     <g clipPath={url('mouthClip')}>
      {shape!=='U'&&<path d={`M${mouthX-rw-3} ${mouthY-rh}Q${mouthX} ${mouthY-rh+20} ${mouthX+rw+3} ${mouthY-rh}V${mouthY-rh+17}Q${mouthX} ${mouthY-rh+30} ${mouthX-rw-3} ${mouthY-rh+17}Z`} fill="#f3f8f7"/>}
      <ellipse cx={mouthX+4} cy={mouthY+rh+6} rx={rw*.62} ry={rh*.66} fill="#bd6b7e"/>
      <path d={`M${mouthX-20} ${mouthY+rh-10}Q${mouthX} ${mouthY+rh-17} ${mouthX+25} ${mouthY+rh-9}`} stroke="#e2929f" strokeWidth="3" fill="none"/>
     </g>
     <path d={`M${mouthX-rw*.8} ${mouthY-rh-4}Q${mouthX} ${mouthY-rh-12} ${mouthX+rw*.7} ${mouthY-rh-3}`} stroke="#8b9da0" strokeWidth="3" opacity=".6" fill="none"/>
    </>}
   </g>
  </svg>
 </div>;
};
export const HostDemo=()=> <AbsoluteFill style={{background:'#f5f8fc',fontFamily:'Arial',color:'#25313a'}}><div style={{position:'absolute',top:160,left:80,right:80,fontSize:65,fontWeight:700,textAlign:'center'}}>Kodey sebagai host</div><div style={{position:'absolute',top:280,left:100,right:100,fontSize:32,textAlign:'center',color:'#6e7e8b'}}>Kedipan mata + gerak mulut mengikuti VO</div><KodeyHost width={980} left={40} top={520}/><Audio src={staticFile('episodes/03-skills/narration.mp3')}/></AbsoluteFill>;
