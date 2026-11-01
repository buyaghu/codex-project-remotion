import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import timing from './timing.json';
const P={bg:'#f6f2e8',ink:'#202724',red:'#c6304c',green:'#158f74',muted:'#77796e',line:'#deddd1'};
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const terms=['Audiens','Bahasa','Warna','Format'];
const heads=[["Jelaskan gaya brand","dari nol lagi?"],["Simpan panduannya.","AGENTS.md"],["Taruh di folder","utama proyek."],["Isi aturan brand.","Singkat. Jelas."],["Sebelum bekerja,","Codex membacanya."],["Episode berikutnya?","Cukup brief khusus."],["Penting diingat:","berlaku di proyek."],["Simpan gaya brand.","Lanjut berkarya."]];
type W={text:string;start:number;end:number};
const enter=(f:number,delay=0)=>spring({frame:f-delay,fps:30,config:{damping:18,stiffness:130}});

const Kodey=({f,x=540,y=1360,s=1,pose=0,talk=true}:{f:number;x?:number;y?:number;s?:number;pose?:number;talk?:boolean})=>{
 const bob=Math.sin(f/15)*6;const blink=f%109<5;const wave=Math.sin(f/10)*12;const mouth=talk?Math.abs(Math.sin(f*.5)):0;
 return <g transform={`translate(${x} ${y+bob}) scale(${s})`} stroke={P.ink} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
 <ellipse cy="280" rx="148" ry="23" fill="#20272412" stroke="none"/>
 <path d="M-55 110-65 249M55 110 70 249" strokeWidth="14"/>
 <path d="M-65 235Q-102 235-112 269H-38V247M70 235Q108 234 118 269H42V247" fill={P.green}/>
 <path d={`M-111 10Q-172 ${pose===1?-25:65}-163 ${pose===1?-94:133}`} fill="none" strokeWidth="11"/>
 <circle cx="-163" cy={pose===1?-98:139} r="19" fill="#fffdf7"/>
 <g transform={`rotate(${(pose===0?-25:pose===2?30:-5)+wave} 110 0)`}><path d="M111 0Q166 32 181-70" fill="none" strokeWidth="11"/><circle cx="181" cy="-81" r="20" fill="#fffdf7"/><path d="M175-101V-124" strokeWidth="7"/></g>
 <circle r="139" fill="#d9e6da" stroke="none"/>
 {[0,1,2,3,4,5].map(i=><g key={i} transform={`rotate(${i*60})`}><path d="M-24-113C-90-151-157-79-118-22L-44 22 3-5-78-53C-91-62-89-85-74-91L-25-63 20-89Z" fill="#fffdf7" strokeWidth="6"/></g>)}
 <circle r="63" fill="#fffdf7" stroke="none"/>
 {blink?<path d="M-39-13H-19M19-13H39" strokeWidth="6"/>:<><ellipse cx="-29" cy="-16" rx="8" ry="13" fill={P.ink} stroke="none"/><ellipse cx="29" cy="-16" rx="8" ry="13" fill={P.ink} stroke="none"/></>}
 <path d={pose===1?'M-43-42-16-48M17-48 43-40':'M-43-43Q-29-51-17-44M17-44Q30-51 43-43'} fill="none" strokeWidth="4"/>
 {mouth>.25?<ellipse cy="29" rx="18" ry={7+mouth*10} fill={P.red} strokeWidth="4"/>:<path d="M-18 25Q0 43 18 25" fill="none" strokeWidth="4"/>}
 <ellipse cx="-49" cy="14" rx="10" ry="6" fill="#eab5b0" stroke="none"/><ellipse cx="49" cy="14" rx="10" ry="6" fill="#eab5b0" stroke="none"/>
 </g>;
};
const Shell=({children,top=580,height=660,label='ILUSTRASI',f=60}:{children:React.ReactNode;top?:number;height?:number;label?:string;f?:number})=><div style={{position:'absolute',top,left:92,right:92,height,background:'#fffdf8',border:`2px solid ${P.line}`,borderRadius:30,boxShadow:'0 18px 40px #242a2310',overflow:'hidden',transform:`translateY(${(1-enter(f))*40}px)`,opacity:interpolate(f,[0,10],[0,1],clamp)}}><div style={{height:64,borderBottom:`2px solid ${P.line}`,padding:'0 25px',display:'flex',alignItems:'center',gap:10}}>{[0,1,2].map(i=><span key={i} style={{width:10,height:10,borderRadius:20,background:i===0?P.red:P.line}}/>)}<span style={{marginLeft:'auto',fontSize:19,letterSpacing:3,color:P.muted,fontWeight:700}}>{label}</span></div>{children}</div>;
const Chip=({text,n,f,delay=0,style={}}:{text:string;n?:number;f:number;delay?:number;style?:React.CSSProperties})=><div style={{padding:'20px 27px',border:`2px solid ${P.line}`,borderRadius:20,background:'#fffdf8',fontSize:35,fontWeight:800,display:'flex',alignItems:'center',gap:22,opacity:interpolate(f,[delay,delay+9],[0,1],clamp),transform:`translateY(${(1-enter(f,delay))*30}px)`,...style}}>{n!==undefined&&<span style={{width:46,height:46,display:'inline-flex',justifyContent:'center',alignItems:'center',borderRadius:14,color:'#fff',background:P.red,fontSize:25}}>{n}</span>}{text}</div>;
const Arrow=({top=1100}:{top?:number})=><div style={{position:'absolute',top,left:0,right:0,textAlign:'center',color:P.green,fontSize:80,fontWeight:900}}>↓</div>;

const Panel=({index,f}:{index:number;f:number})=>{
 if(index===0)return <><div style={{position:'absolute',top:580,left:110,right:110,display:'grid',gap:20}}>{['Pakai warna brand…','Bahasanya santai…','Audiensnya pemula…'].map((x,i)=><Chip key={x} text={x} f={f} delay={i*12} style={{transform:`translateX(${Math.sin(f/24+i)*7}px)`}}/>)}</div><div style={{position:'absolute',top:1010,left:0,right:0,textAlign:'center',fontSize:66,color:P.red,fontWeight:900}}>Ulang. Ulang. Ulang.</div></>;
 if(index===1)return <><Shell top={575} height={520} f={f} label="PANDUAN PROYEK"><div style={{padding:38,textAlign:'center'}}><div style={{margin:'0 auto 25px',width:100,height:125,border:`4px solid ${P.ink}`,borderRadius:13,background:'#e4eee4',fontSize:52,lineHeight:'120px',fontWeight:900,color:P.green}}>≡</div><div style={{fontSize:68,fontFamily:'monospace',fontWeight:800}}>AGENTS.md</div><div style={{fontSize:27,color:P.muted,marginTop:20}}>AGENTS kapital · .md kecil</div></div></Shell><div style={{position:'absolute',top:1110,left:0,right:0,textAlign:'center',fontSize:33,color:P.green,fontWeight:800}}>Satu tempat untuk aturan proyek.</div></>;
 if(index===2)return <Shell top={560} height={610} f={f} label="ILUSTRASI FOLDER"><div style={{padding:40,fontFamily:'monospace',fontSize:35,lineHeight:1.8}}><div style={{fontWeight:900,color:P.green}}>▣ proyek-konten/</div><div style={{margin:'20px 0 20px 25px',padding:'12px 20px',border:`3px solid ${P.red}`,borderRadius:14,fontWeight:900,color:P.red}}>├─ AGENTS.md</div><div style={{paddingLeft:45,color:P.muted}}>├─ aset/</div><div style={{paddingLeft:45,color:P.muted}}>├─ naskah/</div><div style={{paddingLeft:45,color:P.muted}}>└─ video/</div><div style={{fontFamily:'Arial',fontSize:27,marginTop:22,color:P.ink}}>Simpan di folder utama proyek.</div></div></Shell>;
 if(index===3)return <Shell top={560} height={655} f={f} label="CONTOH ISI AGENTS.md"><div style={{padding:30}}><div style={{fontSize:30,fontWeight:900,marginBottom:18}}>Panduan konten kanal</div>{[['Audiens','Kreator pemula'],['Bahasa','Santai dan jelas'],['Warna','Krem + aksen merah'],['Format','Video vertikal']].map(([a,b],i)=><div key={a} style={{display:'grid',gridTemplateColumns:'170px 1fr',padding:'23px 5px',borderBottom:`1px solid ${P.line}`,fontSize:31,opacity:interpolate(f,[i*8,i*8+8],[0,1],clamp)}}><b style={{color:P.red}}>{a}</b><span>{b}</span></div>)}</div></Shell>;
 if(index===4)return <><Shell top={560} height={530} f={f} label="ALUR ILUSTRATIF"><div style={{padding:35,textAlign:'center'}}><Chip text="1. Baca panduan proyek" f={f}/><div style={{fontSize:49,color:P.green,margin:'8px 0'}}>↓</div><Chip text="2. Pahami tugas episode" f={f} delay={17}/><div style={{fontSize:49,color:P.green,margin:'8px 0'}}>↓</div><Chip text="3. Mulai mengerjakan" f={f} delay={34}/></div></Shell><div style={{position:'absolute',top:1150,left:190,right:190,fontSize:31,textAlign:'center',color:P.green,fontWeight:800}}>Panduan menjadi konteks kerja.</div></>;
 if(index===5)return <Shell top={560} height={620} f={f} label="ILUSTRASI PERCAKAPAN"><div style={{padding:30}}><div style={{background:P.red,color:'white',padding:27,borderRadius:24,fontSize:35,lineHeight:1.4}}>“Buat storyboard episode baru<br/>tentang kalender konten.”</div><div style={{marginTop:25,padding:25,borderRadius:24,background:'#e4eee4',fontSize:31,lineHeight:1.5,opacity:interpolate(f,[20,32],[0,1],clamp)}}><b style={{color:P.green}}>Panduan proyek tersedia:</b><br/>Audiens: kreator pemula<br/>Bahasa: santai<br/>Visual: krem + merah<br/>Format: vertikal</div></div></Shell>;
 if(index===6)return <><div style={{position:'absolute',top:585,left:110,right:110,display:'grid',gap:28}}><Chip text="✓ Berlaku pada proyek ini" f={f} style={{color:P.green,background:'#e4eee4'}}/><Chip text="Bukan ingatan semua chat" f={f} delay={18} style={{color:P.red}}/></div><Shell top={930} height={225} f={f} label="PANDUAN IKUT PROYEK"><div style={{fontSize:34,padding:28,textAlign:'center',lineHeight:1.4}}>Buka folder atau repo<br/>yang memuat panduannya.</div></Shell></>;
 return <><Shell top={560} height={430} f={f} label="MULAI DARI SINI"><div style={{padding:35,textAlign:'center'}}><div style={{fontFamily:'monospace',fontSize:62,fontWeight:900,color:P.green}}>AGENTS.md</div><div style={{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center',marginTop:35}}>{terms.map((x,i)=><Chip key={x} text={x} f={f} delay={i*7} style={{fontSize:27,padding:'14px 20px'}}/>)}</div></div></Shell><div style={{position:'absolute',top:1050,left:155,right:155,padding:'25px 20px',background:P.red,color:'white',borderRadius:24,textAlign:'center',fontSize:38,fontWeight:900}}>Kurangi instruksi berulang.</div></>;
};
const Scene=({index,duration}:{index:number;duration:number})=>{
 const f=useCurrentFrame();const title=heads[index];const opacity=interpolate(f,[0,6,duration-6,duration],[0,1,1,0],clamp);
 return <AbsoluteFill style={{opacity}}>
 <div style={{position:'absolute',left:78,right:78,top:235,transform:`translateY(${(1-enter(f))*25}px)`}}><div style={{fontSize:89,lineHeight:1.07,fontWeight:900,letterSpacing:-3}}>{title[0]}<br/><span style={{color:P.red}}>{title[1]}</span></div></div>
 <Panel index={index} f={f}/>
 <svg viewBox="0 0 1080 1920" style={{position:'absolute',width:1080,height:1920}}><Kodey f={f} x={index===6?260:540} y={index===0?1320:index===2?1350:1380} s={index===0?1.22:index===2?.93:1} pose={index===0||index===1?1:index===7?2:0}/></svg>
 {index===7&&<div style={{position:'absolute',left:0,right:0,top:1170,textAlign:'center',fontSize:25,color:P.muted}}>KODEY · MASKOT KREASI KANAL</div>}
 </AbsoluteFill>;
};
export const AgentsFilm=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const seconds=f/fps;const words=timing.words as W[];const active=words.findIndex(w=>seconds>=w.start&&seconds<w.end);const group=active<0?[]:words.slice(Math.floor(active/5)*5,Math.floor(active/5)*5+5);
 return <AbsoluteFill style={{background:P.bg,color:P.ink,fontFamily:'Arial, sans-serif'}}>
 <AbsoluteFill style={{backgroundImage:'radial-gradient(#a6a39722 .8px, transparent .8px)',backgroundSize:'18px 18px',opacity:.4}}/>
 <div style={{position:'absolute',top:104,left:65,right:65,height:58,border:'1px solid #dddcd3',borderRadius:50,background:'#fffdf9',display:'flex',alignItems:'center',padding:'0 24px',fontSize:20,fontWeight:800,letterSpacing:2}}><span style={{width:15,height:15,background:P.red,borderRadius:4,marginRight:14}}/>GHU BERKISAH<span style={{marginLeft:'auto',color:P.muted,fontSize:18}}>CODEX UNTUK KREATOR · 02</span></div>
 <Audio src={staticFile('episodes/02-agents/narration.mp3')}/><Audio src={staticFile('episodes/02-agents/music.wav')} volume={.12}/>
 {timing.scenes.map((s,i)=><Sequence key={i} from={s.from} durationInFrames={s.duration}><Scene index={i} duration={s.duration}/></Sequence>)}
 <div style={{position:'absolute',left:78,right:78,bottom:176,minHeight:108,display:'flex',justifyContent:'center',alignContent:'center',gap:'4px 7px',flexWrap:'wrap',fontSize:34,fontWeight:800,lineHeight:1.4,textAlign:'center'}}>{group.map((w,i)=><span key={i} style={{padding:'4px 7px',borderRadius:7,color:seconds>=w.start&&seconds<w.end?'white':P.ink,background:seconds>=w.start&&seconds<w.end?P.red:'#f6f2e8e8'}}>{w.text}</span>)}</div>
 <div style={{position:'absolute',left:80,right:80,bottom:100,display:'flex',justifyContent:'space-between',fontSize:18,letterSpacing:2,color:P.muted}}><span>DEMONSTRASI BERUPA ILUSTRASI</span><span>02 / 10</span></div>
 <div style={{position:'absolute',bottom:0,height:7,left:0,width:`${f/timing.durationInFrames*100}%`,background:P.red}}/>
 </AbsoluteFill>;
};
