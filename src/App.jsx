import React,{useState,useEffect} from 'react'
export default function App(){
const [digits,setDigits]=useState([]);const [lastDigit,setLastDigit]=useState(null)
const [strategy,setStrategy]=useState('EVEN');const [stake,setStake]=useState(1)
const [martingale,setMartingale]=useState(true);const [isRunning,setIsRunning]=useState(false)
const [profit,setProfit]=useState(0);const [balance]=useState(1000)
const [history,setHistory]=useState([]);const [stats,setStats]=useState(Array(10).fill(0))
const [selectedDigit,setSelectedDigit]=useState(3)
const strategies=[
{id:'EVEN',name:'Even',desc:'Digits 0,2,4,6,8'},
{id:'ODD',name:'Odd',desc:'Digits 1,3,5,7,9'},
{id:'OVER',name:'Over 4',desc:'Digits 5-9'},
{id:'UNDER',name:'Under 4',desc:'Digits 0-4'},
{id:'MATCH',name:'Matches',desc:`Digit=${selectedDigit}`},
{id:'DIFF',name:'Differs',desc:`Digit!=${selectedDigit}`},
{id:'RISE',name:'Rise',desc:'Next > last'},
{id:'FALL',name:'Fall',desc:'Next < last'},
]
useEffect(()=>{
const t=setInterval(()=>{
const d=Math.floor(Math.random()*10)
setLastDigit(d);setDigits(p=>[d,...p].slice(0,30))
setHistory(p=>[{digit:d,time:new Date().toLocaleTimeString(),win:Math.random()>0.45},...p].slice(0,50))
setStats(p=>{const n=[...p];n[d]++;return n})
if(isRunning){setProfit(p=>p+(Math.random()>0.5?stake*0.95:-stake))}
},1200)
return()=>clearInterval(t)
},[isRunning,stake])
const total=stats.reduce((a,b)=>a+b,0)||1
const winRate=history.length?Math.round(history.filter(h=>h.win).length/history.length*100):0
return(<div style={{background:'#070709',minHeight:'100vh',color:'white',padding:'12px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
<div style={{display:'flex',gap:8,alignItems:'center'}}><div style={{width:32,height:32,background:'#a3ff12',borderRadius:8,display:'grid',placeItems:'center',color:'black',fontWeight:900}}>T</div><div><div style={{fontWeight:800}}>MARKET SERIES PRO</div><div style={{fontSize:10,color:'#888'}}>TITAN DIGITS v2.4</div></div></div>
<div style={{background:'#111',padding:'6px 12px',borderRadius:20,fontSize:12}}>${(balance+profit).toFixed(2)}</div>
</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:12}}>
<div style={{background:'#111114',padding:10,borderRadius:12,border:'1px solid #222'}}><div style={{fontSize:10,color:'#666'}}>LAST DIGIT</div><div style={{fontSize:32,fontWeight:900}}>{lastDigit??'-'}</div></div>
<div style={{background:'#111114',padding:10,borderRadius:12,border:'1px solid #222'}}><div style={{fontSize:10,color:'#666'}}>WIN RATE</div><div style={{fontSize:24,fontWeight:800,color:'#a3ff12'}}>{winRate}%</div></div>
<div style={{background:'#111114',padding:10,borderRadius:12,border:'1px solid #222'}}><div style={{fontSize:10,color:'#666'}}>STRATEGY</div><div style={{fontSize:14,fontWeight:700}}>{strategy}</div><div style={{fontSize:10,background:isRunning?'#a3ff12':'#333',color:isRunning?'black':'white',padding:'2px 6px',borderRadius:10,display:'inline-block',marginTop:4}}>{isRunning?'RUNNING':'IDLE'}</div></div>
</div>
<div style={{background:'#111114',borderRadius:16,padding:12,border:'1px solid #222',marginBottom:12}}>
<div style={{fontSize:11,color:'#888',marginBottom:10}}>DIGIT ANALYSIS - LAST 100 TICKS</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8}}>
{Array.from({length:10},(_,i)=>{const pct=Math.round(stats[i]/total*100);return(<div key={i} style={{background:'#0a0a0c',border:`1px solid ${lastDigit===i?'#a3ff12':'#222'}`,borderRadius:12,padding:8,textAlign:'center'}}><div style={{fontSize:22,fontWeight:900}}>{i}</div><div style={{fontSize:10,color:'#a3ff12'}}>{pct}%</div></div>)})}
</div>
<div style={{display:'flex',gap:4,marginTop:10,overflowX:'auto'}}>{digits.map((d,i)=><div key={i} style={{minWidth:28,height:28,borderRadius:14,background:d%2===0?'#1a2e05':'#2e0a1a',border:'1px solid #333',display:'grid',placeItems:'center',fontSize:12,fontWeight:700}}>{d}</div>)}</div>
</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
<div style={{background:'#111114',borderRadius:16,padding:12,border:'1px solid #222'}}>
<div style={{fontSize:11,color:'#888',marginBottom:8}}>STRATEGY SELECT</div>
{strategies.map(s=><div key={s.id} onClick={()=>setStrategy(s.id)} style={{padding:'8px 10px',borderRadius:10,marginBottom:6,cursor:'pointer',background:strategy===s.id?'#a3ff12':'#1a1a1e',color:strategy===s.id?'black':'white',display:'flex',justifyContent:'space-between'}}><div><div style={{fontWeight:700,fontSize:13}}>{s.name}</div><div style={{fontSize:9,opacity:0.7}}>{s.desc}</div></div><div style={{width:14,height:14,borderRadius:7,border:'1px solid currentColor',background:strategy===s.id?'black':''}}/></div>)}
<div style={{marginTop:8}}><div style={{fontSize:10,color:'#888'}}>TARGET DIGIT</div><div style={{display:'flex',gap:4,marginTop:4}}>{Array.from({length:10},(_,i)=><div key={i} onClick={()=>setSelectedDigit(i)} style={{width:24,height:24,borderRadius:6,background:selectedDigit===i?'#a3ff12':'#222',color:selectedDigit===i?'black':'white',display:'grid',placeItems:'center',fontSize:12,cursor:'pointer'}}>{i}</div>)}</div></div>
<div style={{marginTop:12,display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
<div><div style={{fontSize:10,color:'#888'}}>STAKE $</div><input type="number" value={stake} onChange={e=>setStake(parseFloat(e.target.value)||1)} style={{width:'100%',background:'#000',border:'1px solid #333',color:'white',padding:8,borderRadius:8}} /></div>
<div><div style={{fontSize:10,color:'#888'}}>MARTINGALE</div><div onClick={()=>setMartingale(!martingale)} style={{background:martingale?'#a3ff12':'#333',color:martingale?'black':'white',padding:8,borderRadius:8,textAlign:'center',fontSize:12,fontWeight:700,cursor:'pointer'}}>{martingale?'ON x2.1':'OFF'}</div></div>
</div>
<button onClick={()=>setIsRunning(!isRunning)} style={{width:'100%',marginTop:12,padding:14,borderRadius:12,border:'none',fontWeight:900,background:isRunning?'#ff3b3b':'#a3ff12',color:isRunning?'white':'black'}}>{isRunning?'STOP BOT ■':'START BOT ▶'}</button>
</div>
<div style={{background:'#111114',borderRadius:16,padding:12,border:'1px solid #222'}}>
<div style={{fontSize:11,color:'#888',marginBottom:8}}>LIVE TRADE HISTORY</div>
<div style={{maxHeight:320,overflowY:'auto'}}>
{history.map((h,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #1a1a1a',fontSize:12}}><span style={{color:h.win?'#a3ff12':'#ff3b3b'}}>{h.digit} {h.win?'WIN':''}</span><span style={{color:'#555'}}>{h.time}</span><span style={{color:h.win?'#a3ff12':'#ff3b3b'}}>{h.win?'+':''}{(h.win?stake*0.95:-stake).toFixed(2)}</span></div>)}
</div>
</div>
</div>
<div style={{textAlign:'center',padding:16,fontSize:10,color:'#444'}}>MARKET SERIES PRO • TITAN DIGITS • DERIV READY</div>
</div>)
  }
