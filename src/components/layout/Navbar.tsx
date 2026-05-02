export default function Navbar() {
  return (
    <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 32px',borderBottom:'1px solid #e2e8f0',background:'white',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
      <a href="/" style={{fontSize:'22px',fontWeight:'800',color:'#1d5bff',textDecoration:'none'}}>
        🛍️ MyMarket
      </a>
      <div style={{display:'flex',gap:'24px',alignItems:'center'}}>
        <a href="/product" style={{color:'#475569',textDecoration:'none',fontWeight:'500',fontSize:'15px'}}>Products</a>
        <a href="/vendor" style={{color:'#475569',textDecoration:'none',fontWeight:'500',fontSize:'15px'}}>Sell</a>
        <a href="/cart" style={{background:'#1d5bff',color:'white',padding:'8px 20px',borderRadius:'20px',textDecoration:'none',fontWeight:'600',fontSize:'14px'}}>
          <a href="/login" style={{color:'#475569',textDecoration:'none',fontWeight:'500',fontSize:'15px'}}>Login</a>
          🛒 Cart
        </a>
      </div>
    </nav>
  )
}