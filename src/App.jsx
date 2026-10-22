import { useEffect, useState } from 'react';

export default function App() {
  const [price, setPrice] = useState('1057.37');
  const [digits, setDigits] = useState([]);
  const [selected, setSelected] = useState(5);

  useEffect(() => {
    const ws = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
    ws.onopen = () => ws.send(JSON.stringify({ ticks: 'R_100', subscribe: 1 }));
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.tick) {
        const p = data.tick.quote;
        const last = parseInt(p.toString().slice(-1));
        if (!isNaN(last)) {
          setPrice(p);
          setDigits(prev => {
            const next = [...prev, last];
            return next.length > 100 ? next.slice(-100) : next;
          });
        }
      }
    };
    return () => ws.close();
  }, []);

  const counts = Array(10).fill(0);
  digits.forEach(d => counts[d]++);
  const total = digits.length || 100;
  const getPct = (i) => total ? ((counts[i] / total) * 100).toFixed(1) : (8 + Math.random()*3).toFixed(1);

  return (
    <div style={{background:'#fff', minHeight:'100vh', fontFamily:'system-ui', color:'#000'}}>
      <div style={{background:'#2c3542', color:'#fff', padding:'10px 14px', display:'flex', justifyContent:'space-between', fontSize:'13px'}}>
        <div>☰ 📞 ↻</div>
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <span style={{background:'#3bb7a5', padding:'6px 14px', borderRadius:'20px', fontWeight:700, color:'#fff'}}>Cashier</span>
          <span>🇺🇸 0.10 USD</span>
        </div>
      </div>
      <div style={{background:'#3a4554', display:'flex'}}>
        <div style={{flex:1, padding:'14px', textAlign:'center', fontSize:'12px', color:'#a0a9b6'}}>Analysis Tool</div>
        <div style={{flex:1, padding:'14px', textAlign:'center', fontSize:'12px', background:'#1e3a8a', color:'#fff', fontWeight:700}}>Manual Trader</div>
        <div style={{flex:1, padding:'14px', textAlign:'center', fontSize:'12px', color:'#a0a9b6'}}>Bulk Trade</div>
      </div>
      <div style={{background:'#f8f9fa', margin:'12px', border:'1px solid #e5e7eb', borderRadius:'12px', padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div><b style={{fontSize:'15px'}}>Volatility 100 (1s) Index</b><div style={{fontSize:'12px', color:'#6b7280'}}>{price} - Live digit: {digits[digits.length-1] ?? '-'}</div></div><div>▾</div>
      </div>
      <div style={{textAlign:'center', fontSize:'11px', padding:'6px', background:'#f0fdf4', color:'#16a34a', fontWeight:600}}>● LIVE: {digits.length} ticks | EXACT KAISER CLONE</div>

      <div style={{padding:'10px 8px'}}>
        <div style={{display:'flex', justifyContent:'space-between', margin:'14px 0'}}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{width:'18%', display:'flex', flexDirection:'column', alignItems:'center'}}>
              <div onClick={()=>setSelected(i)} style={{width:'58px', height:'58px', borderRadius:'50%', border:'2.5px solid #e5e7eb', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background: selected===i ? '#000' : '#fff', color: selected===i ? '#fff' : '#000', cursor:'pointer'}}>
                <div style={{fontWeight:900, fontSize:'18px'}}>{i}</div><div style={{fontSize:'10px', color: selected===i ? '#fff' : '#6b7280'}}>{getPct(i)}%</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex', justifyContent:'space-between', margin:'14px 0'}}>
          {[5,6,7,8,9].map(i => (
            <div key={i} style={{width:'18%', display:'flex', flexDirection:'column', alignItems:'center'}}>
              <div onClick={()=>setSelected(i)} style={{width:'58px', height:'58px', borderRadius:'50%', border:'2.5px solid #e5e7eb', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background: selected===i ? '#000' : '#fff', color: selected===i ? '#fff' : '#000', cursor:'pointer'}}>
                <div style={{fontWeight:900, fontSize:'18px'}}>{i}</div><div style={{fontSize:'10px', color: selected===i ? '#fff' : '#6b7280'}}>{getPct(i)}%</div>
              </div>
              {i===7 && <div style={{width:0, height:0, borderLeft:'7px solid transparent', borderRight:'7px solid transparent', borderTop:'9px solid #6b7280', marginTop:'6px'}}></div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'0 12px', display:'flex', justifyContent:'space-between', color:'#9ca3af'}}><span>«</span><span>»</span></div>
      <div style={{margin:'10px 16px', fontSize:'12px', borderBottom:'1px dotted #000', display:'inline-block'}}>Learn about this trade type</div>
      <div style={{display:'flex', justifyContent:'space-between', padding:'12px 16px', borderTop:'1px solid #f0f0f0', borderBottom:'1px solid #f0f0f0', marginTop:'8px'}}><b>Over/Under</b><span>›</span></div>
      
      <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', border:'1px solid #e5e7eb', margin:'12px', borderRadius:'12px', overflow:'hidden'}}>
        {Array.from({length:10}).map((_, i) => (
          <div key={i} onClick={()=>setSelected(i)} style={{padding:'12px', textAlign:'center', fontSize:'15px', borderRight:'1px solid #e5e7eb', borderBottom:'1px solid #e5e7eb', background: selected===i ? '#e5e7eb' : '#fff', fontWeight: selected===i ? 800 : 400, cursor:'pointer'}}>{i}</div>
        ))}
      </div>

      <div style={{display:'flex', justifyContent:'space-between', padding:'12px 16px', alignItems:'center'}}>
        <div style={{background:'#facc15', padding:'8px 12px', borderRadius:'8px', fontSize:'12px', fontWeight:700}}>⚠️ Risk Disclaimer</div>
        <div><b>1.00 USD</b></div>
        <div style={{color:'#6b7280', fontSize:'12px'}}>Stake</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', padding:'0 12px 20px'}}>
        <button style={{borderRadius:'10px', padding:'14px 10px', color:'#fff', border:'none', background:'#3aa99e', textAlign:'left'}}><b>↗️ Over</b><div style={{fontSize:'11px', marginTop:'4px'}}>Payout  2.22 USD</div></button>
        <button style={{borderRadius:'10px', padding:'14px 10px', color:'#fff', border:'none', background:'#e23e3e', textAlign:'left'}}><b>↘️ Under</b><div style={{fontSize:'11px', marginTop:'4px'}}>Payout  1.82 USD</div></button>
      </div>
    </div>
  );
    }
