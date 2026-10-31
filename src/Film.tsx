import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
const ink = '#352a20';
const scenes = [
  {eyebrow: 'JEJAK SEBUAH KOTA', title: 'Bandar Lampung', sub: 'Tempo dulu', note: 'Sebuah perjalanan visual menuju ingatan kota.'},
  {eyebrow: 'DARI ARAH LAUT', title: 'Telukbetung', sub: 'Kisah dari pesisir', note: 'Laut, perahu, dan pertemuan manusia membentuk denyut kehidupan pesisir.'},
  {eyebrow: 'MENELUSURI DARATAN', title: 'Tanjungkarang', sub: 'Jalan dan perjumpaan', note: 'Di jalan dan ruang niaga, kisah kehidupan kota terus bertaut.'},
  {eyebrow: 'DUA NAMA, SATU INGATAN', title: 'Jejak yang bertaut', sub: 'Telukbetung · Tanjungkarang', note: 'Dua nama yang melekat pada perjalanan Bandar Lampung.'},
  {eyebrow: 'MERAWAT INGATAN', title: 'Kota berubah.', sub: 'Cerita tetap tinggal.', note: 'Bandar Lampung Tempo Dulu'}
];
const Art = ({kind}: {kind: number}) => {
  const f = useCurrentFrame();
  return <svg viewBox="0 0 1000 650" style={{width: '100%', height: 650}} fill="none" stroke={ink} strokeWidth={3}>
    <circle cx="760" cy="160" r="70" fill="#c69b61" stroke="none" opacity=".55"/>
    <path d="M0 390 Q170 200 330 380 Q500 120 690 370 Q850 270 1000 390" fill="#c9b696" stroke="none"/>
    {kind === 1 ? <>
      {[0,1,2,3,4].map(i => <path key={i} d={`M0 ${440+i*35} Q250 ${420+i*35} 500 ${440+i*35} T1000 ${440+i*35}`} transform={`translate(${Math.sin(f/25+i)*12} 0)`} opacity=".45"/>)}
      <g transform={`translate(0 ${Math.sin(f/22)*5})`}><path d="M270 400 L650 400 L600 450 L320 450 Z" fill={ink}/><path d="M460 400 V155 L610 365 H470" fill="#e8d6b5"/><path d="M445 205 L330 365 H445 Z" fill="#d2b17a"/></g>
    </> : <>
      {[100,300,535,750].map((x,i)=><g key={x}><path d={`M${x} 450 V${310-i%2*35} L${x+90} ${245-i%2*35} L${x+180} ${310-i%2*35} V450 Z`} fill={i%2 ? '#c3a77e':'#dbc5a2'}/><path d={`M${x+65} 450 V360 H${x+115} V450 M${x+25} 330 H${x+55} V360 H${x+25} Z M${x+125} 330 H${x+155} V360 H${x+125} Z`}/></g>)}
      <path d="M0 460 H1000 M350 650 L470 460 M720 650 L580 460" opacity=".55"/>
    </>}
    <text x="40" y="610" fill={ink} stroke="none" fontSize="18" letterSpacing="4">ILUSTRASI ARTISTIK · BUKAN FOTO ARSIP</text>
  </svg>;
};
const Scene = ({index}: {index:number}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entry = spring({frame:f, fps, config:{damping:200}});
  const opacity = interpolate(f,[0,15,160,180],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const s = scenes[index];
  return <AbsoluteFill style={{opacity, padding:'150px 88px', transform:`translateY(${(1-entry)*35}px)`}}>
    <div style={{fontFamily:'sans-serif',fontSize:22,letterSpacing:7,borderBottom:`1px solid ${ink}`,paddingBottom:30}}>{s.eyebrow}</div>
    <div style={{fontSize:106,lineHeight:1.05,marginTop:76,fontWeight:700}}>{s.title}</div>
    <div style={{fontSize:48,fontStyle:'italic',marginTop:26,color:'#805c35'}}>{s.sub}</div>
    <div style={{margin:'80px -40px 40px',transform:`scale(${1+f/6000})`}}><Art kind={index}/></div>
    <div style={{fontSize:34,lineHeight:1.6,maxWidth:800}}>{s.note}</div>
    <div style={{position:'absolute',bottom:110,left:88,right:88,display:'flex',justifyContent:'space-between',fontFamily:'sans-serif',fontSize:20,letterSpacing:3}}><span>LAMPUNG / INGATAN KOTA</span><span>0{index+1} / 05</span></div>
  </AbsoluteFill>;
};
export const Film = () => <AbsoluteFill style={{backgroundColor:'#ebdfc7',color:ink,fontFamily:'Georgia, serif'}}>
  <AbsoluteFill style={{backgroundImage:'radial-gradient(ellipse at center, transparent 30%, #8e704644 100%)'}}/>
  {scenes.map((_,index)=><Sequence key={index} from={index*180} durationInFrames={180}><Scene index={index}/></Sequence>)}
</AbsoluteFill>;
