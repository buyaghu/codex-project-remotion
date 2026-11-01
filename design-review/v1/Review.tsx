import React,{useEffect,useState} from 'react';
import {AbsoluteFill,Audio,Sequence,continueRender,delayRender,cancelRender,interpolate,spring,staticFile,useCurrentFrame} from 'remotion';
import {KodeyHost} from '../../episodes/03-skills/KodeyHost';
import timing from '../../episodes/03-skills/timing.json';
const voiceStart=timing.scenes[2].from;
const safe={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const styles=[
 {name:'Editorial Blueprint',font:'ReviewInter',bg:'#fff',ink:'#172337',accent:'#346ce8',muted:'#69788f',line:'#e2e8f2'},
 {name:'Host-first Studio',font:'ReviewJakarta',bg:'#f5f3ec',ink:'#192b36',accent:'#167b73',muted:'#74818a',line:'#dce4df'},
 {name:'Contrast Motion',font:'ReviewManrope',bg:'#0f182b',ink:'#f4f8ff',accent:'#76baff',muted:'#9aaec8',line:'#2b3c54'}
];
const terms=['Baca brief','Storyboard','Animasi','Periksa','Ekspor'];
const Fonts=()=>{
 const [handle]=useState(()=>delayRender('Load review typography'));
 useEffect(()=>{let live=true;Promise.all([['ReviewInter','Inter.ttf'],['ReviewJakarta','Jakarta.ttf'],['ReviewManrope','Manrope.ttf']].map(async([name,file])=>{const face=new FontFace(name,`url(${staticFile('fonts/review/'+file)})`,{weight:'100 900'});const loaded=await face.load();(document.fonts as FontFaceSet & {add:(face:FontFace)=>void}).add(loaded);})).then(()=>{if(live)continueRender(handle);}).catch(e=>cancelRender(e));return()=>{live=false;};},[handle]);
 return null;
};
const Glyph=({i,color,size=56}:{i:number;color:string;size?:number})=><svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{i===0?<><path d="M15 7H41L51 17V57H15Z"/><path d="M41 7V18H51M24 29H42M24 39H42M24 49H35"/></>:i===1?<>{[0,1,2,3].map(k=><rect key={k} x={9+k%2*26} y={9+Math.floor(k/2)*26} width="20" height="20" rx="4"/>)}</>:i===2?<><rect x="7" y="11" width="50" height="42" rx="9"/><path d="M26 22 43 32 26 42Z"/></>:i===3?<><circle cx="32" cy="32" r="24"/><path d="M19 32 28 41 45 24"/></>:<><path d="M32 6V40M20 28 32 40 44 28M10 43V56H54V43"/></>}</svg>;
const Caption=({variant}:{variant:number})=>{
 const f=useCurrentFrame();const s=styles[variant];const words=timing.words;const t=(voiceStart+f)/30;const active=words.findIndex(w=>t>=w.start&&t<w.end);const group=active>=0?words.slice(Math.floor(active/5)*5,Math.floor(active/5)*5+5):[];
 return <div style={{position:'absolute',left:90,right:90,top:1570,minHeight:132,padding:'18px 20px',borderRadius:variant===1?24:16,background:variant===1?'#ffffff':variant===2?'#15243c':'#ffffffed',border:variant===1?'1px solid #dce4df':'none',display:'flex',justifyContent:'center',alignContent:'center',flexWrap:'wrap',gap:'4px 9px',fontSize:44,lineHeight:1.35,fontWeight:500,color:s.ink,boxShadow:variant===1?'0 12px 32px #17302708':undefined}}>{group.map((w,i)=>{const on=t>=w.start&&t<w.end;return <span key={i} style={{padding:'2px 4px',color:on?s.accent:s.ink,fontWeight:on?700:500,borderBottom:on?`3px solid ${s.accent}`:'3px solid transparent'}}>{w.text}</span>;})}</div>;
};
const Host=({variant}:{variant:number})=>{
 const f=useCurrentFrame();const enter=spring({frame:f,fps:30,config:{damping:18,stiffness:115}});
 const slide=interpolate(f,[35,75,110],[0,-38,0],safe);
 const lean=interpolate(f,[32,54,77,110],[0,-4,2,0],safe);
 const hop=Math.sin(Math.min(1,Math.max(0,(f-38)/36))*Math.PI)*-24;
 const x=[590,60,615][variant], y=[1130,860,1165][variant], width=[440,650,390][variant];
 return <div style={{position:'absolute',inset:0,transform:`translate(${(1-enter)*155+slide}px,${(1-enter)*25+hop}px) rotate(${lean}deg)`,transformOrigin:`${x+width*.5}px ${y+width*.65}px`}}><KodeyHost left={x} top={y} width={width} frameOffset={voiceStart}/></div>;
};
export const DesignFrame=({variant=0}:{variant?:number})=>{
 const f=useCurrentFrame();const s=styles[variant];
 return <AbsoluteFill style={{background:s.bg,fontFamily:s.font,color:s.ink}}><Fonts/>
 {variant===0&&<><AbsoluteFill style={{backgroundImage:'linear-gradient(#dce4ef44 1px,transparent 1px),linear-gradient(90deg,#dce4ef44 1px,transparent 1px)',backgroundSize:'36px 36px'}}/><div style={{position:'absolute',left:67,top:0,bottom:0,width:3,background:'#dce7fb'}}/><div style={{position:'absolute',left:67,top:0,height:600+f*3,width:3,background:s.accent}}/></>}
 {variant===1&&<div style={{position:'absolute',top:815,left:100,width:610,height:610,borderRadius:700,background:'#e5ece3'}}/>}
 {variant===2&&<><div style={{position:'absolute',right:-250,top:250,width:1000,height:1000,borderRadius:1000,background:'radial-gradient(#23518c4d,transparent 70%)'}}/><div style={{position:'absolute',inset:0,opacity:.17,backgroundImage:'linear-gradient(#3b5170 1px,transparent 1px),linear-gradient(90deg,#3b5170 1px,transparent 1px)',backgroundSize:'90px 90px'}}/></>}
 <div style={{position:'absolute',left:120,right:100,top:125,display:'flex',justifyContent:'space-between',fontSize:21,fontWeight:600,letterSpacing:1.5,color:s.muted}}><span>GHU BERKISAH</span><span>CODEX UNTUK KREATOR / 03</span></div>
 <div style={{position:'absolute',left:120,top:240,fontSize:23,fontWeight:600,letterSpacing:3,color:s.accent}}>PROSES YANG BISA DIPAKAI ULANG</div>
 <div style={{position:'absolute',left:120,right:90,top:310,fontSize:variant===2?88:80,lineHeight:1.08,letterSpacing:variant===0?-3:-2,fontWeight:variant===0?600:750}}>Satu skill.<br/><span style={{color:s.accent}}>Lima langkah.</span></div>
 {variant===0&&<>
  <svg width="1080" height="1920" style={{position:'absolute'}}><path d="M260 760H830V1055H260" stroke="#adc2ed" strokeWidth="3" fill="none"/><path d="M817 1037 830 1055 843 1037" stroke={s.accent} strokeWidth="3" fill="none"/><path d="M278 1042 260 1055 278 1068" stroke={s.accent} strokeWidth="3" fill="none"/></svg>
  {terms.map((t,i)=>{const pos=[[140,650],[425,650],[710,650],[425,950],[140,950]][i];return <div key={t} style={{position:'absolute',left:pos[0],top:pos[1],width:230,height:190,border:`1.5px solid ${s.line}`,background:'white',borderRadius:22,padding:25,boxSizing:'border-box',boxShadow:'0 9px 24px #24395605'}}><Glyph i={i} color={s.accent}/><div style={{fontSize:25,fontWeight:600,marginTop:22}}>{t}</div><div style={{position:'absolute',right:20,top:22,fontSize:18,color:s.muted}}>0{i+1}</div></div>;})}
  <div style={{position:'absolute',left:140,top:1220,width:375,fontSize:32,lineHeight:1.45,color:s.muted}}>Satu alur kerja.<br/>Dipakai di episode berikutnya.</div>
 </>}
 {variant===1&&<div style={{position:'absolute',left:630,top:650,width:340,padding:'20px 28px',background:'#ffffffeb',border:'1px solid #dde5df',borderRadius:30,boxShadow:'0 18px 50px #19372c09'}}>{terms.map((t,i)=><div key={t} style={{display:'flex',alignItems:'center',gap:21,padding:'25px 0',borderBottom:i===4?'none':`1px solid ${s.line}`}}><Glyph i={i} color={s.accent} size={43}/><span style={{fontSize:28,fontWeight:600}}>{t}</span></div>)}</div>}
 {variant===2&&<div style={{position:'absolute',left:120,right:110,top:620,display:'grid',gap:14}}>{terms.map((t,i)=><div key={t} style={{height:88,border:`1px solid ${s.line}`,borderRadius:18,display:'flex',alignItems:'center',gap:26,padding:'0 28px',background:i===2?'#193963':'#152238'}}><span style={{color:s.muted,fontSize:21}}>0{i+1}</span><Glyph i={i} color={s.accent} size={40}/><span style={{fontSize:30,fontWeight:600}}>{t}</span>{i===2&&<span style={{marginLeft:'auto',fontSize:18,color:s.accent}}>AKTIF</span>}</div>)}</div>}
 <Host variant={variant}/>
 <Caption variant={variant}/>
 <div style={{position:'absolute',left:120,right:100,top:1790,display:'flex',justifyContent:'space-between',color:s.muted,fontSize:19,letterSpacing:1}}><span>DEMONSTRASI BERUPA ILUSTRASI</span><span>{['A','B','C'][variant]} · {s.name}</span></div>
 </AbsoluteFill>;
};
export const ReviewBoard=()=> <AbsoluteFill style={{background:'#e6eaf0'}}>{[0,1,2].map(i=><div key={i} style={{position:'absolute',left:i*540,top:0,width:1080,height:1920,transform:'scale(.5)',transformOrigin:'top left'}}><DesignFrame variant={i}/></div>)}</AbsoluteFill>;
export const MotionReview=()=> <AbsoluteFill>{[0,1,2].map(i=><Sequence key={i} from={i*120} durationInFrames={120}><DesignFrame variant={i}/><Audio src={staticFile('episodes/03-skills/narration.mp3')} startFrom={voiceStart}/></Sequence>)}</AbsoluteFill>;
