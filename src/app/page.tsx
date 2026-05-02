export default function HomePage() {
  return (
    <main style={{fontFamily:'sans-serif'}}>
      <section style={{background:'linear-gradient(135deg,#1d5bff,#6c3fff)',color:'white',textAlign:'center',padding:'80px 24px'}}>
        <h1 style={{fontSize:'42px',fontWeight:'800',marginBottom:'16px'}}>Welcome to MyMarket 🛍️</h1>
        <p style={{fontSize:'18px',marginBottom:'32px',opacity:0.9}}>1000+ Vendors • AI Moderated • Trusted Shopping</p>
        <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/product" style={{background:'white',color:'#1d5bff',padding:'14px 36px',borderRadius:'50px',fontWeight:'700',textDecoration:'none',fontSize:'16px'}}>Shop Now</a>
          <a href="/vendor" style={{border:'2px solid white',color:'white',padding:'14px 36px',borderRadius:'50px',fontWeight:'700',textDecoration:'none',fontSize:'16px'}}>Sell With Us</a>
        </div>
      </section>

      <section style={{padding:'60px 24px',background:'#f8fafc',textAlign:'center'}}>
        <h2 style={{fontSize:'28px',fontWeight:'700',marginBottom:'32px',color:'#0f172a'}}>Shop by Category</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',maxWidth:'800px',margin:'0 auto'}}>
          {[{icon:'📱',name:'Electronics'},{icon:'👗',name:'Fashion'},{icon:'🏠',name:'Home'},{icon:'🍎',name:'Food'}].map((cat) => (
            <div key={cat.name} style={{background:'white',borderRadius:'16px',padding:'28px 16px',border:'1px solid #e2e8f0',cursor:'pointer',boxShadow:'0 2px 8px #0001'}}>
              <div style={{fontSize:'36px',marginBottom:'8px'}}>{cat.icon}</div>
              <div style={{fontWeight:'600',color:'#334155'}}>{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'60px 24px',textAlign:'center'}}>
        <h2 style={{fontSize:'28px',fontWeight:'700',marginBottom:'32px',color:'#0f172a'}}>Featured Products</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'24px',maxWidth:'1000px',margin:'0 auto'}}>
          {[
            {name:'Wireless Earbuds',price:1299,vendor:'TechStore',emoji:'🎧'},
            {name:'Cotton T-Shirt',price:499,vendor:'FashionHub',emoji:'👕'},
            {name:'Coffee Mug',price:299,vendor:'HomeDecor',emoji:'☕'},
            {name:'Running Shoes',price:2499,vendor:'SportZone',emoji:'👟'},
          ].map((p) => (
            <div key={p.name} style={{border:'1px solid #e2e8f0',borderRadius:'16px',overflow:'hidden',cursor:'pointer',boxShadow:'0 2px 12px #0001',background:'white',transition:'transform .2s'}}>
              <div style={{background:'linear-gradient(135deg,#f1f5f9,#e2e8f0)',height:'160px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'56px'}}>
                {p.emoji}
              </div>
              <div style={{padding:'16px',textAlign:'left'}}>
                <h3 style={{fontWeight:'600',marginBottom:'4px',color:'#0f172a'}}>{p.name}</h3>
                <p style={{color:'#1d5bff',fontWeight:'700',fontSize:'20px',marginBottom:'4px'}}>₹{p.price}</p>
                <p style={{color:'#94a3b8',fontSize:'13px'}}>by {p.vendor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{background:'linear-gradient(135deg,#fff7ed,#fef3c7)',borderTop:'1px solid #fed7aa',padding:'32px 24px',textAlign:'center'}}>
        <p style={{fontSize:'18px',fontWeight:'600',color:'#92400e'}}>🤖 AI Moderated Platform — Every product verified for safety & quality</p>
      </section>
    </main>
  )
}