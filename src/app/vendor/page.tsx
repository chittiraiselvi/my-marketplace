'use client'
import { useState } from 'react'

const stats = [
  { label: 'Total Sales', value: 'Rs.45,230', icon: '💰', change: '+12%', color: '#22c55e' },
  { label: 'Total Orders', value: '234', icon: '📦', change: '+8%', color: '#3b82f6' },
  { label: 'Products', value: '18', icon: '🛍️', change: '+3', color: '#a855f7' },
  { label: 'Rating', value: '4.8★', icon: '⭐', change: '+0.2', color: '#f59e0b' },
]

const orders = [
  { id:'#1234', product:'Wireless Earbuds', buyer:'Ravi Kumar', price:1299, status:'delivered', date:'02 May' },
  { id:'#1235', product:'Smart Watch', buyer:'Priya S', price:3999, status:'shipped', date:'02 May' },
  { id:'#1236', product:'Cotton T-Shirt', buyer:'Karthik M', price:499, status:'pending', date:'01 May' },
  { id:'#1237', product:'Running Shoes', buyer:'Meena R', price:2499, status:'paid', date:'01 May' },
  { id:'#1238', product:'Coffee Mug', buyer:'Suresh P', price:299, status:'delivered', date:'30 Apr' },
]

const products = [
  { name:'Wireless Earbuds', price:1299, stock:45, status:'approved', sales:89 },
  { name:'Smart Watch', price:3999, stock:12, status:'approved', sales:67 },
  { name:'Bluetooth Speaker', price:1899, stock:0, status:'pending', sales:0 },
  { name:'Phone Case', price:299, stock:150, status:'rejected', sales:0 },
]

const statusColors: Record<string, {bg:string,color:string}> = {
  delivered: { bg:'#d1fae5', color:'#065f46' },
  shipped:   { bg:'#dbeafe', color:'#1e40af' },
  paid:      { bg:'#ede9fe', color:'#5b21b6' },
  pending:   { bg:'#fef3c7', color:'#92400e' },
  approved:  { bg:'#d1fae5', color:'#065f46' },
  rejected:  { bg:'#fee2e2', color:'#991b1b' },
}

export default function VendorDashboard() {
  const [tab, setTab] = useState('overview')

  return (
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'sans-serif'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1d5bff,#6c3fff)',padding:'32px 32px 24px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <h1 style={{color:'white',fontSize:'26px',fontWeight:'800',marginBottom:'4px'}}>
              Vendor Dashboard
            </h1>
            <p style={{color:'#ffffff99',fontSize:'14px'}}>Welcome back, TechStore!</p>
          </div>
          <button style={{background:'white',color:'#1d5bff',padding:'10px 24px',borderRadius:'20px',border:'none',fontWeight:'700',cursor:'pointer',fontSize:'14px'}}>
            + Add Product
          </button>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:'8px',marginTop:'24px',flexWrap:'wrap'}}>
          {['overview','orders','products','analytics'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{padding:'8px 20px',borderRadius:'20px',border:'none',cursor:'pointer',fontWeight:'600',fontSize:'13px',textTransform:'capitalize',
                background: tab===t ? 'white' : 'transparent',
                color: tab===t ? '#1d5bff' : 'white',
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'24px'}}>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div>
            {/* Stat Cards */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'16px',marginBottom:'24px'}}>
              {stats.map(s => (
                <div key={s.label} style={{background:'white',borderRadius:'16px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                    <span style={{fontSize:'28px'}}>{s.icon}</span>
                    <span style={{fontSize:'12px',fontWeight:'700',color:s.color,background:s.color+'22',padding:'3px 8px',borderRadius:'10px'}}>{s.change}</span>
                  </div>
                  <div style={{fontSize:'24px',fontWeight:'800',color:'#0f172a',marginBottom:'4px'}}>{s.value}</div>
                  <div style={{fontSize:'13px',color:'#94a3b8'}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div style={{background:'white',borderRadius:'16px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:'24px'}}>
              <h2 style={{fontSize:'18px',fontWeight:'700',color:'#0f172a',marginBottom:'16px'}}>Recent Orders</h2>
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{borderBottom:'2px solid #f1f5f9'}}>
                      {['Order ID','Product','Buyer','Price','Status','Date'].map(h => (
                        <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'12px',fontWeight:'700',color:'#94a3b8',textTransform:'uppercase'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id} style={{borderBottom:'1px solid #f1f5f9'}}>
                        <td style={{padding:'12px',fontSize:'13px',fontWeight:'600',color:'#1d5bff'}}>{o.id}</td>
                        <td style={{padding:'12px',fontSize:'13px',color:'#0f172a'}}>{o.product}</td>
                        <td style={{padding:'12px',fontSize:'13px',color:'#475569'}}>{o.buyer}</td>
                        <td style={{padding:'12px',fontSize:'13px',fontWeight:'700',color:'#0f172a'}}>Rs.{o.price}</td>
                        <td style={{padding:'12px'}}>
                          <span style={{fontSize:'11px',fontWeight:'700',padding:'4px 10px',borderRadius:'10px',...statusColors[o.status]}}>
                            {o.status}
                          </span>
                        </td>
                        <td style={{padding:'12px',fontSize:'13px',color:'#94a3b8'}}>{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Alert */}
            <div style={{background:'linear-gradient(135deg,#fff7ed,#fef3c7)',border:'1px solid #fed7aa',borderRadius:'16px',padding:'20px'}}>
              <h3 style={{fontSize:'16px',fontWeight:'700',color:'#92400e',marginBottom:'8px'}}>🤖 AI Moderation Alerts</h3>
              <p style={{fontSize:'13px',color:'#92400e',marginBottom:'12px'}}>1 product needs attention</p>
              <div style={{background:'white',borderRadius:'10px',padding:'12px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <p style={{fontSize:'13px',fontWeight:'600',color:'#0f172a'}}>Phone Case</p>
                  <p style={{fontSize:'12px',color:'#ef4444'}}>Rejected — prohibited content detected</p>
                </div>
                <button style={{background:'#ef4444',color:'white',border:'none',padding:'6px 16px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <div style={{background:'white',borderRadius:'16px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
            <h2 style={{fontSize:'18px',fontWeight:'700',marginBottom:'16px'}}>All Orders</h2>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'2px solid #f1f5f9'}}>
                    {['Order ID','Product','Buyer','Price','Status','Date'].map(h => (
                      <th key={h} style={{padding:'10px 12px',textAlign:'left',fontSize:'12px',fontWeight:'700',color:'#94a3b8',textTransform:'uppercase'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={{borderBottom:'1px solid #f1f5f9'}}>
                      <td style={{padding:'12px',fontSize:'13px',fontWeight:'600',color:'#1d5bff'}}>{o.id}</td>
                      <td style={{padding:'12px',fontSize:'13px'}}>{o.product}</td>
                      <td style={{padding:'12px',fontSize:'13px',color:'#475569'}}>{o.buyer}</td>
                      <td style={{padding:'12px',fontSize:'13px',fontWeight:'700'}}>Rs.{o.price}</td>
                      <td style={{padding:'12px'}}>
                        <span style={{fontSize:'11px',fontWeight:'700',padding:'4px 10px',borderRadius:'10px',...statusColors[o.status]}}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{padding:'12px',fontSize:'13px',color:'#94a3b8'}}>{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <div style={{background:'white',borderRadius:'16px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
              <h2 style={{fontSize:'18px',fontWeight:'700'}}>My Products</h2>
              <button style={{background:'linear-gradient(135deg,#1d5bff,#6c3fff)',color:'white',border:'none',padding:'8px 20px',borderRadius:'10px',fontWeight:'600',cursor:'pointer'}}>
                + Add New
              </button>
            </div>
            <div style={{display:'grid',gap:'12px'}}>
              {products.map(p => (
                <div key={p.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px',border:'1px solid #f1f5f9',borderRadius:'12px',flexWrap:'wrap',gap:'8px'}}>
                  <div>
                    <p style={{fontWeight:'600',color:'#0f172a',marginBottom:'4px'}}>{p.name}</p>
                    <p style={{fontSize:'13px',color:'#94a3b8'}}>Stock: {p.stock} units • Sales: {p.sales}</p>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                    <span style={{fontSize:'16px',fontWeight:'700',color:'#1d5bff'}}>Rs.{p.price}</span>
                    <span style={{fontSize:'11px',fontWeight:'700',padding:'4px 10px',borderRadius:'10px',...statusColors[p.status]}}>
                      {p.status}
                    </span>
                    <button style={{background:'#f1f5f9',border:'none',padding:'6px 14px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {tab === 'analytics' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'16px'}}>
              <div style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'16px',color:'#0f172a'}}>Sales This Month</h3>
                {[['Week 1','Rs.8,200',65],['Week 2','Rs.12,400',85],['Week 3','Rs.9,800',72],['Week 4','Rs.14,830',100]].map(([w,v,p]) => (
                  <div key={w as string} style={{marginBottom:'12px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                      <span style={{fontSize:'13px',color:'#475569'}}>{w}</span>
                      <span style={{fontSize:'13px',fontWeight:'600'}}>{v}</span>
                    </div>
                    <div style={{background:'#f1f5f9',borderRadius:'4px',height:'8px'}}>
                      <div style={{background:'linear-gradient(90deg,#1d5bff,#6c3fff)',height:'8px',borderRadius:'4px',width:`${p}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'16px',color:'#0f172a'}}>Top Products</h3>
                {products.filter(p=>p.sales>0).sort((a,b)=>b.sales-a.sales).map((p,i) => (
                  <div key={p.name} style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
                    <span style={{width:'24px',height:'24px',background:'#1d5bff',color:'white',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',flexShrink:0}}>{i+1}</span>
                    <div style={{flex:1}}>
                      <p style={{fontSize:'13px',fontWeight:'600',marginBottom:'2px'}}>{p.name}</p>
                      <p style={{fontSize:'12px',color:'#94a3b8'}}>{p.sales} sales</p>
                    </div>
                    <span style={{fontSize:'14px',fontWeight:'700',color:'#1d5bff'}}>Rs.{p.price*p.sales}</span>
                  </div>
                ))}
              </div>

              <div style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'16px',color:'#0f172a'}}>Trust Score</h3>
                <div style={{textAlign:'center',marginBottom:'16px'}}>
                  <div style={{fontSize:'48px',fontWeight:'800',color:'#22c55e'}}>87</div>
                  <div style={{fontSize:'14px',color:'#94a3b8'}}>out of 100</div>
                </div>
                {[['Fulfilment Rate','96%','#22c55e'],['Review Score','4.8/5','#3b82f6'],['Response Time','2hrs','#a855f7'],['Return Rate','2%','#f59e0b']].map(([l,v,c]) => (
                  <div key={l as string} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f1f5f9'}}>
                    <span style={{fontSize:'13px',color:'#475569'}}>{l}</span>
                    <span style={{fontSize:'13px',fontWeight:'700',color:c as string}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}