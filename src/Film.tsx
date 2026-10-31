import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import timing from './timing.json';

const C = {ink:'#263d3b', cream:'#fff5dc', green:'#78bd58', mint:'#d4e7bd', teal:'#257c85', gold:'#efb84d', orange:'#dc784b'};
const clamp = {extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const titles = ['Satu kota.\nDua tanggal?','Kembali ke\npesisir Telukbetung','Sebuah catatan\ndari abad ke-17','Dari catatan,\nmenjadi hari jadi','Dua nama yang\nmasih kita kenal','Lalu, namanya\nresmi berubah','Dua penanda.\nBeda makna.','Kota tumbuh.\nCerita berlanjut.'];
const labels = ['SEJARAH BANDAR LAMPUNG','JEJAK AWAL','MENELUSURI ARSIP','HARI JADI KOTA','NAMA SEBELUMNYA','17 JUNI 1983','RANGKUMAN','GHU BERKISAH'];
type Word = {text:string;start:number;end:number};

const Cloud = ({x,y,s=1}:{x:number;y:number;s?:number}) => <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity=".65"><ellipse rx="90" ry="28"/><ellipse cx="-25" cy="-20" rx="46" ry="32"/><ellipse cx="30" cy="-28" rx="43" ry="39"/></g>;
const House = ({x,y,s=1,color=C.cream}:{x:number;y:number;s?:number;color?:string}) => <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.ink} strokeWidth="5" strokeLinejoin="round"><rect x="-86" y="-145" width="172" height="145" fill={color}/><path d="M-112-145 0-225 112-145Z" fill={C.orange}/><path d="M-20 0V-90H26V0" fill="#886b50"/><path d="M-66-115H-35V-69H-66ZM43-115H72V-69H43Z" fill="#a6d1cc"/><path d="M-85 15H85"/></g>;
const Boat = ({x,y,s=1,f}:{x:number;y:number;s?:number;f:number}) => <g transform={`translate(${x} ${y+Math.sin(f/14)*7}) scale(${s})`} stroke={C.ink} strokeWidth="5" strokeLinejoin="round"><path d="M-170 0H170L115 65H-112Z" fill="#af6a45"/><path d="M0 0V-235L130-25H8Z" fill={C.cream}/><path d="M-13-193-122-22H-13Z" fill={C.gold}/><path d="M-150 20H147"/></g>;

const Backdrop = ({index,f}:{index:number;f:number}) => <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position:'absolute'}}>
  <defs><linearGradient id="sky" x2="0" y2="1"><stop stopColor={index===2?'#ead5aa':'#b8dcd5'}/><stop offset="1" stopColor="#f9f1cf"/></linearGradient></defs>
  <path fill="url(#sky)" d="M0 0H1080V1920H0Z"/>
  <circle cx="875" cy="475" r="116" fill="#fff1b0"/>
  <Cloud x={150+f*.09} y={400}/><Cloud x={700+f*.06} y={240} s={.7}/><Cloud x={970+f*.07} y={720} s={.8}/>
  <path d="M0 980Q150 720 340 920Q540 590 750 900Q920 660 1080 850V1920H0Z" fill="#99b99a"/>
  <path d="M0 1090Q230 820 440 1060Q730 850 1080 1040V1920H0Z" fill="#6a9b83"/>
  {index===1 || index===2 ? <>
    <path d="M0 1150Q440 1060 1080 1200V1920H0Z" fill="#4e9da5"/>
    {[0,1,2,3,4,5].map(i=><path key={i} d={`M-80 ${1250+i*95}Q140 ${1220+i*95} 400 ${1250+i*95}T1160 ${1250+i*95}`} stroke="#acd8cf" strokeWidth="5" fill="none" transform={`translate(${Math.sin(f/28+i)*25} 0)`}/>)}
    <House x={160} y={1130} s={.68}/><House x={385} y={1140} s={.55}/><Boat x={790-f*.12} y={1390} s={.85} f={f}/>
    <path d="M0 1580Q130 1540 410 1620V1920H0Z" fill="#d8bb87"/>
  </> : <>
    <path d="M0 1190Q400 1090 1080 1170V1920H0Z" fill="#a5cd78"/>
    <path d="M0 1370Q450 1240 1080 1380V1920H0Z" fill="#7eb764"/>
    <path d="M410 1920 570 1250H650L1050 1920Z" fill="#e5cf9d"/>
    {[100,320,810,1010].map((x,i)=><House key={x} x={x} y={1260+i%2*90} s={.65+i%2*.12}/>)}
  </>}
  <path d="M0 1820Q400 1700 1080 1830V1920H0Z" fill="#426e57"/>
</svg>;

const Guide = ({f,x=240,y=1510,scale=1,mood='talk'}:{f:number;x?:number;y?:number;scale?:number;mood?:string}) => {
  const blink = f%113<5;
  const mouth = Math.abs(Math.sin(f*.6));
  const hand = Math.sin(f/14)*7;
  return <g transform={`translate(${x} ${y+Math.sin(f/17)*3}) scale(${scale})`} stroke={C.ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="0" cy="307" rx="105" ry="18" fill="#234d4430" stroke="none"/>
    <path d="M-35 180-46 296M35 180 51 296M-46 296H-80M51 296H85" fill="none"/>
    <path d="M-66-5Q-104 68-118 143" fill="none"/>
    <circle cx="-118" cy="146" r="10" fill="#f8d7b0"/>
    <g transform={`rotate(${-25+hand} 65 0)`}><path d="M65 0Q125 28 155-50" fill="none"/><circle cx="155" cy="-54" r="12" fill="#f8d7b0"/></g>
    <path d="M-65-17Q0-48 65-17L77 146Q74 196 0 201Q-74 196-77 146Z" fill={C.teal}/>
    <path d="M-41-21 0 33 41-21" fill={C.cream}/><path d="M0 33V184" strokeWidth="3" opacity=".4"/>
    <path d="M-59 75H-15V122H-59Z" fill={C.gold} strokeWidth="3"/><path d="M-49 90H-25M-49 101H-33" strokeWidth="3"/>
    <circle cy="-120" r="98" fill="#f9dfbd"/>
    <path d="M-95-132Q-112-245 2-229Q112-233 97-132L64-172Q14-144-42-180L-78-124Z" fill="#3b3b36"/>
    <path d="M-84-115H-64M64-115H84M-7-112H7"/>
    <circle cx="-36" cy="-109" r="29" fill="#fff6" strokeWidth="4"/><circle cx="36" cy="-109" r="29" fill="#fff6" strokeWidth="4"/>
    {blink ? <path d="M-46-107H-26M26-107H46"/> : <><circle cx="-35" cy="-107" r="5" fill={C.ink}/><circle cx="37" cy="-107" r="5" fill={C.ink}/></>}
    <path d={mood==='wonder'?'M-55-150Q-35-167-18-151M18-156Q39-169 56-156':'M-54-151Q-35-160-18-149M18-149Q38-160 56-151'} fill="none" strokeWidth="4"/>
    <path d="M0-104-7-80H5" fill="none" strokeWidth="3"/>
    {mouth>.35 ? <ellipse cx="2" cy="-55" rx={mood==='wonder'?15:18} ry={5+mouth*10} fill="#77463b" strokeWidth="3"/> : <path d="M-15-57Q0-45 17-58" fill="none" strokeWidth="4"/>}
    <ellipse cx="-64" cy="-71" rx="13" ry="7" fill="#e8a17c" stroke="none" opacity=".5"/><ellipse cx="64" cy="-71" rx="13" ry="7" fill="#e8a17c" stroke="none" opacity=".5"/>
  </g>;
};

const Badge = ({children,top=590,color=C.cream}:{children:React.ReactNode;top?:number;color?:string}) => <div style={{position:'absolute',top,left:90,right:90,padding:'28px 36px',background:color,border:`5px solid ${C.ink}`,borderRadius:28,boxShadow:`8px 10px 0 ${C.ink}22`,textAlign:'center',fontSize:54,fontWeight:900,lineHeight:1.2}}>{children}</div>;
const Calendar = ({f,date,year}:{f:number;date:string;year:string}) => <g transform={`translate(630 1030) rotate(${Math.sin(f/45)*2})`} stroke={C.ink} strokeWidth="6"><rect x="-240" y="-180" width="480" height="400" rx="30" fill={C.cream}/><path d="M-240-125Q-240-180-190-180H190Q240-180 240-125V-70H-240Z" fill={C.orange}/><path d="M-130-215V-155M130-215V-155" strokeWidth="18" strokeLinecap="round"/><text textAnchor="middle" y="15" fill={C.ink} stroke="none" fontSize="51" fontWeight="700">{date}</text><text textAnchor="middle" y="150" fill={C.teal} stroke="none" fontSize="111" fontWeight="900">{year}</text></g>;
const Archive = ({f}:{f:number}) => <g transform={`translate(640 1000) rotate(${interpolate(f,[0,60],[-9,-3],clamp)})`} stroke={C.ink} strokeWidth="5"><path d="M-240-215H200L240-165V260H-240Z" fill="#f5dfab"/><path d="M200-215V-165H240" fill="#d4ba83"/><text x="0" y="-118" textAnchor="middle" fontSize="40" fontWeight="900" fill={C.ink} stroke="none">CATATAN 1682</text>{[0,1,2,3].map(i=><path key={i} d={`M-170 ${-55+i*48}H${130-i%2*60}`} opacity=".4"/>)}<circle cx="125" cy="175" r="48" fill={C.orange}/><path d="M100 176 118 195 152 155" fill="none" stroke={C.cream} strokeWidth="8"/></g>;
const Sign = ({f}:{f:number}) => <g transform={`translate(600 1050) rotate(${Math.sin(f/40)})`} stroke={C.ink} strokeWidth="5"><path d="M0-240V320" strokeWidth="24"/><path d="M-310-215H245L295-150 245-85H-310Z" fill={C.cream}/><path d="M310-40H-245L-295 25-245 90H310Z" fill={C.gold}/><text y="-132" textAnchor="middle" fontSize="48" fontWeight="800" fill={C.ink} stroke="none">TANJUNGKARANG</text><text y="42" textAnchor="middle" fontSize="48" fontWeight="800" fill={C.ink} stroke="none">TELUKBETUNG</text></g>;

const Caption = ({seconds}:{seconds:number}) => {
  const words = timing.words as Word[];
  const active = words.findIndex(w=>seconds>=w.start && seconds<w.end);
  if(active<0) return null;
  const group = words.slice(Math.floor(active/5)*5,Math.floor(active/5)*5+5);
  return <div style={{position:'absolute',left:72,right:72,bottom:218,display:'flex',justifyContent:'center',alignItems:'center',flexWrap:'wrap',gap:'5px 8px',minHeight:118,fontSize:40,lineHeight:1.35,fontWeight:800,textAlign:'center',color:'#fff',textShadow:'0 3px 4px #152f2e'}}>{group.map((w,i)=><span key={i} style={{padding:'5px 9px',borderRadius:9,background:seconds>=w.start&&seconds<w.end?'#85cd48':'#203b35df',color:seconds>=w.start&&seconds<w.end?C.ink:'#fff',textShadow:seconds>=w.start&&seconds<w.end?'none':undefined}}>{w.text}</span>)}</div>;
};
const Scene = ({index,duration}:{index:number;duration:number}) => {
  const f=useCurrentFrame(); const {fps}=useVideoConfig();
  const enter=spring({frame:f,fps,config:{damping:18,stiffness:100}});
  const opacity=interpolate(f,[0,8,duration-7,duration],[0,1,1,0],clamp);
  const show=interpolate(f,[0,22],[0,1],clamp);
  return <AbsoluteFill style={{opacity}}>
    <Backdrop index={index} f={f}/>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 40%,transparent 35%,#253e3524)'}}/>
    <div style={{position:'absolute',top:128,left:76,fontSize:23,fontWeight:800,letterSpacing:5,color:C.teal}}>GHU BERKISAH <span style={{color:C.ink,opacity:.5}}> / {String(index+1).padStart(2,'0')}</span></div>
    <div style={{position:'absolute',top:218,left:76,right:76,transform:`translateY(${(1-enter)*45}px)`}}><div style={{fontSize:23,fontWeight:900,letterSpacing:4,marginBottom:24}}>{labels[index]}</div><div style={{whiteSpace:'pre-line',fontSize:index===1?80:87,lineHeight:1.06,fontWeight:900,letterSpacing:-3}}>{titles[index]}</div></div>
    <div style={{opacity:show,transform:`translateY(${(1-enter)*60}px)`}}>
      {index===0&&<><Badge top={590}>1682 <span style={{fontSize:36,fontWeight:600}}>vs.</span> 1983</Badge><div style={{position:'absolute',top:815,left:0,right:0,textAlign:'center',fontSize:255,fontWeight:900,color:C.gold,textShadow:`6px 7px 0 ${C.ink}`}}>?</div></>}
      {index===1&&<Badge top={590}>TELUKBETUNG <div style={{fontSize:30,marginTop:10,fontWeight:600}}>Pesisir selatan Sumatra</div></Badge>}
      {index===2&&<><svg width="1080" height="1920" style={{position:'absolute'}}><Archive f={f}/></svg><Badge top={575} color="#f5dfab">17 JUNI 1682</Badge><div style={{position:'absolute',top:1310,left:470,right:80,fontSize:31,textAlign:'center',fontWeight:800,background:C.cream,borderRadius:20,padding:22}}>Dipati Temenggung<br/>Nata Negara</div></>}
      {index===3&&<><svg width="1080" height="1920" style={{position:'absolute'}}><Calendar f={f} date="17 JUNI" year="1682"/></svg><Badge top={585} color={C.gold}>HARI JADI KOTA</Badge></>}
      {index===4&&<svg width="1080" height="1920" style={{position:'absolute'}}><Sign f={f}/></svg>}
      {index===5&&<><Badge top={590} color={C.gold}>BANDAR LAMPUNG</Badge><svg width="1080" height="1920" style={{position:'absolute'}}><Calendar f={f} date="17 JUNI" year="1983"/></svg><div style={{position:'absolute',top:1330,left:440,right:90,textAlign:'center',fontSize:33,fontWeight:800,background:C.cream,padding:22,borderRadius:20}}>PP No. 24 Tahun 1983</div></>}
      {index===6&&<><Badge top={620}><span style={{fontSize:96,color:C.teal}}>1682</span><br/>Hari jadi kota</Badge><Badge top={910} color={C.gold}><span style={{fontSize:96}}>1983</span><br/>Perubahan nama</Badge></>}
      {index===7&&<><Badge top={605} color={C.gold}>BANDAR LAMPUNG<div style={{fontSize:33,marginTop:15,fontWeight:600}}>Satu kota, banyak lapisan cerita.</div></Badge><div style={{position:'absolute',top:850,left:440,right:75,padding:28,borderRadius:20,background:'#fff5dce8',fontSize:27,lineHeight:1.5}}><b>SUMBER CERITA</b><br/>Sejarah Kota · PPID Pemkot<br/>PP No. 24 Tahun 1983 · BPK<br/><span style={{fontSize:22}}>Tautan lengkap di README proyek.</span></div></>}
    </div>
    <svg width="1080" height="1920" style={{position:'absolute',pointerEvents:'none'}}><Guide f={f} x={index===0?480:240} y={index===0?1390:1410} scale={index===0?1.24:1.05} mood={index===0?'wonder':'talk'}/></svg>
    <div style={{position:'absolute',bottom:128,left:75,right:75,display:'flex',justifyContent:'space-between',fontSize:21,fontWeight:700,letterSpacing:2,color:'#fff8e4'}}>ILUSTRASI SEJARAH<span>BANDAR LAMPUNG</span></div>
    <div style={{position:'absolute',top:0,left:0,width:1080,height:1920,background:C.cream,transform:`translateX(${interpolate(f,[0,12],[0,1100],clamp)}px)`,pointerEvents:'none'}}/>
  </AbsoluteFill>;
};
export const Film = () => {
  const f=useCurrentFrame(); const {fps}=useVideoConfig();
  return <AbsoluteFill style={{background:C.cream,color:C.ink,fontFamily:'Arial, sans-serif'}}>
    <Audio src={staticFile('narration.mp3')}/><Audio src={staticFile('music.wav')} volume={.14}/>
    {timing.scenes.map((s,i)=><Sequence key={i} from={s.from} durationInFrames={s.duration}><Scene index={i} duration={s.duration}/></Sequence>)}
    <Caption seconds={f/fps}/>
    <div style={{position:'absolute',bottom:0,left:0,height:8,width:`${f/timing.durationInFrames*100}%`,background:C.gold}}/>
  </AbsoluteFill>;
};
