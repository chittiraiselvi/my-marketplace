'use client'
import { useState } from 'react'

const stats = [
  { label:'Total Revenue', value:'Rs.2,45,890', icon:'💰', change:'+18%', color:'#22c55e' },
  { label:'Total Orders', value:'1,234', icon:'📦', change:'+12%', color:'#3b82f6' },
  { label:'Active Vendors', value:'89', icon:'🏪', change:'+5', color:'#a855f7' },
  { label:'Total Users', value:'4,521', icon:'👥', change:'+234', color:'#f59e0b' },
  { label:'Products Listed', value:'567', icon:'🛍️', change:'+45', color:'#ec4899' },
  { label:'AI Flags', value:'12', icon:'🤖', change:'-3', color:'#ef4444' },
]

const vendors = [
  { name:'TechStore', email:'tech@store.com', products:45, sales:'Rs.89,200', status:'active', trust:92 },
  { name:'FashionHub', email:'fashion@hub.com', products:78, sales:'Rs.45,600', status:'active', trust:87 },
  { name:'HomeDecor', email:'home@decor.com', products:34, sales:'Rs.23,400', status:'active', trust:79 },
  { name:'SportZone', email:'sport@zone.com', products:23, sales:'Rs.34,100', status:'suspended', trust:45 },
  { name:'FoodMart', email:'food@mart.com', products:12, sales:'Rs.12,300', status:'pending', trust:60 },
]

const flagged = [
  { id:'P001', name:'Fake Designer Bag', vendor:'FashionHub', reason:'Counterfeit product', score:12, date:'02 May' },
  { id:'P002', name:'Cheap Medicine', vendor:'HealthPlus', reason:'Prohibited item', score:5, date:'02 May' },
  { id:'P003', name:'Copied Software', vendor:'TechStore', reason:'Copyright violation', score:8, date:'01 May' },
]

const orders = [
  { id:'#5001', buyer:'Ravi K', vendor:'TechStore', product:'Smart Watch', amount:3999, status:'delivered' },
  { id:'#5002', buyer:'Priya S', vendor:'FashionHub', product:'Dress', amount:1299, status:'shipped' },
  { id:'#5003', buyer:'Karthik M', vendor:'HomeDecor', product:'Lamp', amount:899, status:'pending' },
  { id:'#5004', buyer:'Meena R', vendor:'SportZone', product:'Shoes', amount:2499, status:'paid' },
]

const statusColors: Record<string, {bg:string,color:string}> = {
  active:    { bg:'#d1fae5', color:'#065f46' },
  suspended: { bg:'#fee2e2', color:'#991b1b' },
  pending:   { bg:'#fef3c7', color:'#92400e' },
  delivered: { bg:'#d1fae5', color:'#065f46' },
  shipped:   { bg:'#dbeafe', color:'#1e40af' },
  paid:      { bg:'#ede9fe', color:'#5b21b6' },
}

export default function AdminPanel() {
  const [tab, setTab] = useState('overview')
  const [vendorList, setVendorList] = useState(vendors)
  const [flagList, setFlagList] = useState(flagged)

  const tabs = ['overview','vendors','orders','ai-flags','analytics']

  return (
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'sans-serif'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#0f172a,#1e293b)',padding:'24px 32px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px',marginBottom:'20px'}}>
          <div>
            <h1 style={{color:'white',fontSize:'24px',fontWeight:'800',marginBottom:'4px'}}>
              🛡️ Admin Control Panel
            </h1>
            <p style={{color:'#94a3b8',fontSize:'13px'}}>MyMarket Platform Management</p>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <span style={{background:'#22c55e22',color:'#22c55e',padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>
              ● System Online
            </span>
            <span style={{background:'#3b82f622',color:'#60a5fa',padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>
              🤖 AI Active
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{padding:'8px 18px',borderRadius:'8px',border:'none',cursor:'pointer',fontWeight:'600',fontSize:'13px',textTransform:'capitalize',
                background: tab===t ? 'white' : 'transparent',
                color: tab===t ? '#0f172a' : '#94a3b8',
              }}>
              {t === 'ai-flags' ? '🤖 AI Flags' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:'1300px',margin:'0 auto',padding:'24px'}}>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'14px',marginBottom:'24px'}}>
              {stats.map(s => (
                <div key={s.label} style={{background:'white',borderRadius:'14px',padding:'18px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                    <span style={{fontSize:'24px'}}>{s.icon}</span>
                    <span style={{fontSize:'11px',fontWeight:'700',color:s.color,background:s.color+'22',padding:'2px 8px',borderRadius:'10px'}}>{s.change}</span>
                  </div>
                  <div style={{fontSize:'20px',fontWeight:'800',color:'#0f172a',marginBottom:'2px'}}>{s.value}</div>
                  <div style={{fontSize:'12px',color:'#94a3b8'}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Stats Row */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'16px'}}>
              {/* Recent Orders */}
              <div style={{background:'white',borderRadius:'14px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>Recent Orders</h3>
                {orders.map(o => (
                  <div key={o.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #f1f5f9'}}>
                    <div>
                      <p style={{fontSize:'13px',fontWeight:'600',color:'#0f172a'}}>{o.id} — {o.product}</p>
                      <p style={{fontSize:'11px',color:'#94a3b8'}}>{o.buyer} • {o.vendor}</p>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <p style={{fontSize:'13px',fontWeight:'700',color:'#1d5bff'}}>Rs.{o.amount}</p>
                      <span style={{fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'8px',...statusColors[o.status]}}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Flags Summary */}
              <div style={{background:'white',borderRadius:'14px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'14px'}}>🤖 AI Flagged Products</h3>
                {flagList.slice(0,3).map(f => (
                  <div key={f.id} style={{padding:'10px',background:'#fff5f5',borderRadius:'10px',marginBottom:'8px',border:'1px solid #fecaca'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                      <p style={{fontSize:'13px',fontWeight:'600',color:'#0f172a'}}>{f.name}</p>
                      <span style={{fontSize:'11px',fontWeight:'700',color:'#ef4444'}}>Score: {f.score}/100</span>
                    </div>
                    <p style={{fontSize:'11px',color:'#94a3b8'}}>{f.reason} • {f.vendor}</p>
                  </div>
                ))}
                <button onClick={() => setTab('ai-flags')}
                  style={{width:'100%',padding:'8px',background:'#fef2f2',color:'#ef4444',border:'1px solid #fecaca',borderRadius:'8px',fontSize:'12px',fontWeight:'600',cursor:'pointer',marginTop:'4px'}}>
                  View All Flags →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VENDORS */}
        {tab === 'vendors' && (
          <div style={{background:'white',borderRadius:'14px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
              <h2 style={{fontSize:'18px',fontWeight:'700'}}>Vendor Management</h2>
              <span style={{fontSize:'13px',color:'#94a3b8'}}>{vendorList.length} vendors</span>
            </div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid #f1f5f9'}}>
                    {['Vendor','Email','Products','Sales','Trust Score','Status','Action'].map(h => (
                      <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:'#94a3b8',textTransform:'uppercase'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vendorList.map((v,i) => (
                    <tr key={v.name} style={{borderBottom:'1px solid #f1f5f9'}}>
                      <td style={{padding:'12px',fontWeight:'600',fontSize:'14px'}}>{v.name}</td>
                      <td style={{padding:'12px',fontSize:'13px',color:'#64748b'}}>{v.email}</td>
                      <td style={{padding:'12px',fontSize:'13px'}}>{v.products}</td>
                      <td style={{padding:'12px',fontSize:'13px',fontWeight:'600',color:'#1d5bff'}}>{v.sales}</td>
                      <td style={{padding:'12px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                          <div style={{flex:1,background:'#f1f5f9',borderRadius:'4px',height:'6px',minWidth:'60px'}}>
                            <div style={{background: v.trust>80?'#22c55e':v.trust>60?'#f59e0b':'#ef4444',height:'6px',borderRadius:'4px',width:`${v.trust}%`}}></div>
                          </div>
                          <span style={{fontSize:'12px',fontWeight:'700'}}>{v.trust}</span>
                        </div>
                      </td>
                      <td style={{padding:'12px'}}>
                        <span style={{fontSize:'11px',fontWeight:'700',padding:'3px 10px',borderRadius:'10px',...statusColors[v.status]}}>
                          {v.status}
                        </span>
                      </td>
                      <td style={{padding:'12px'}}>
                        <div style={{display:'flex',gap:'6px'}}>
                          {v.status === 'active' ? (
                            <button onClick={() => setVendorList(vendorList.map((x,j) => j===i ? {...x,status:'suspended'} : x))}
                              style={{background:'#fee2e2',color:'#ef4444',border:'none',padding:'4px 10px',borderRadius:'6px',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
                              Suspend
                            </button>
                          ) : (
                            <button onClick={() => setVendorList(vendorList.map((x,j) => j===i ? {...x,status:'active'} : x))}
                              style={{background:'#d1fae5',color:'#065f46',border:'none',padding:'4px 10px',borderRadius:'6px',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
                              Activate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div style={{background:'white',borderRadius:'14px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <h2 style={{fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>All Orders</h2>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid #f1f5f9'}}>
                    {['Order','Buyer','Vendor','Product','Amount','Status'].map(h => (
                      <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'11px',fontWeight:'700',color:'#94a3b8',textTransform:'uppercase'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={{borderBottom:'1px solid #f1f5f9'}}>
                      <td style={{padding:'12px',fontWeight:'600',color:'#1d5bff',fontSize:'13px'}}>{o.id}</td>
                      <td style={{padding:'12px',fontSize:'13px'}}>{o.buyer}</td>
                      <td style={{padding:'12px',fontSize:'13px',color:'#64748b'}}>{o.vendor}</td>
                      <td style={{padding:'12px',fontSize:'13px'}}>{o.product}</td>
                      <td style={{padding:'12px',fontSize:'13px',fontWeight:'700'}}>Rs.{o.amount}</td>
                      <td style={{padding:'12px'}}>
                        <span style={{fontSize:'11px',fontWeight:'700',padding:'3px 10px',borderRadius:'10px',...statusColors[o.status]}}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI FLAGS */}
        {tab === 'ai-flags' && (
          <div>
            <div style={{background:'linear-gradient(135deg,#fff5f5,#fef2f2)',border:'1px solid #fecaca',borderRadius:'14px',padding:'20px',marginBottom:'16px'}}>
              <h2 style={{fontSize:'18px',fontWeight:'700',color:'#991b1b',marginBottom:'4px'}}>🤖 AI Moderation Queue</h2>
              <p style={{fontSize:'13px',color:'#ef4444'}}>{flagList.length} products flagged for review</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {flagList.map((f,i) => (
                <div key={f.id} style={{background:'white',borderRadius:'14px',padding:'20px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}>
                      <span style={{background:'#fee2e2',color:'#ef4444',fontSize:'11px',fontWeight:'700',padding:'2px 8px',borderRadius:'8px'}}>ID: {f.id}</span>
                      <span style={{fontSize:'14px',fontWeight:'700',color:'#0f172a'}}>{f.name}</span>
                    </div>
                    <p style={{fontSize:'13px',color:'#64748b',marginBottom:'4px'}}>Vendor: {f.vendor} • Date: {f.date}</p>
                    <p style={{fontSize:'13px',color:'#ef4444',fontWeight:'500'}}>⚠️ {f.reason}</p>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                    <div style={{textAlign:'center'}}>
                      <div style={{fontSize:'24px',fontWeight:'800',color:'#ef4444'}}>{f.score}</div>
                      <div style={{fontSize:'11px',color:'#94a3b8'}}>AI Score</div>
                    </div>
                    <div style={{display:'flex',gap:'8px'}}>
                      <button onClick={() => setFlagList(flagList.filter((_,j) => j!==i))}
                        style={{background:'#d1fae5',color:'#065f46',border:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                        ✓ Approve
                      </button>
                      <button onClick={() => setFlagList(flagList.filter((_,j) => j!==i))}
                        style={{background:'#fee2e2',color:'#ef4444',border:'none',padding:'8px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                        ✗ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {flagList.length === 0 && (
                <div style={{textAlign:'center',padding:'48px',background:'white',borderRadius:'14px'}}>
                  <div style={{fontSize:'48px',marginBottom:'12px'}}>✅</div>
                  <h3 style={{color:'#22c55e',fontSize:'18px',fontWeight:'700'}}>All Clear!</h3>
                  <p style={{color:'#94a3b8'}}>No flagged products</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {tab === 'analytics' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'16px'}}>
            <div style={{background:'white',borderRadius:'14px',padding:'24px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
              <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Monthly Revenue</h3>
              {[['Jan','Rs.45K',45],['Feb','Rs.52K',52],['Mar','Rs.48K',48],['Apr','Rs.61K',61],['May','Rs.78K',78]].map(([m,v,p]) => (
                <div key={m as string} style={{marginBottom:'10px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                    <span style={{fontSize:'13px',color:'#475569'}}>{m}</span>
                    <span style={{fontSize:'13px',fontWeight:'600'}}>{v}</span>
                  </div>
                  <div style={{background:'#f1f5f9',borderRadius:'4px',height:'8px'}}>
                    <div style={{background:'linear-gradient(90deg,#1d5bff,#6c3fff)',height:'8px',borderRadius:'4px',width:`${p}%`}}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:'white',borderRadius:'14px',padding:'24px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
              <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Top Categories</h3>
              {[['Electronics','Rs.89,200',45,'#3b82f6'],['Fashion','Rs.67,400',34,'#ec4899'],['Home','Rs.34,100',17,'#f59e0b'],['Food','Rs.8,900',4,'#22c55e']].map(([cat,rev,pct,color]) => (
                <div key={cat as string} style={{marginBottom:'12px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                    <span style={{fontSize:'13px',fontWeight:'500'}}>{cat}</span>
                    <span style={{fontSize:'13px',fontWeight:'600',color:color as string}}>{rev} ({pct}%)</span>
                  </div>
                  <div style={{background:'#f1f5f9',borderRadius:'4px',height:'6px'}}>
                    <div style={{background:color as string,height:'6px',borderRadius:'4px',width:`${pct}%`}}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:'white',borderRadius:'14px',padding:'24px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
              <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'16px'}}>Platform Health</h3>
              {[
                ['Active Vendors','89%','#22c55e'],
                ['Order Success Rate','96%','#3b82f6'],
                ['AI Approval Rate','94%','#a855f7'],
                ['Customer Satisfaction','4.7/5','#f59e0b'],
                ['Return Rate','2.1%','#ef4444'],
              ].map(([label,value,color]) => (
                <div key={label as string} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f1f5f9'}}>
                  <span style={{fontSize:'13px',color:'#475569'}}>{label}</span>
                  <span style={{fontSize:'13px',fontWeight:'700',color:color as string}}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}