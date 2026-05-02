'use client'
import { useState } from 'react'

const initialItems = [
  { id:'1', name:'Wireless Earbuds', price:1299, originalPrice:2499, vendor:'TechStore', emoji:'🎧', qty:1 },
  { id:'2', name:'Cotton T-Shirt', price:499, originalPrice:999, vendor:'FashionHub', emoji:'👕', qty:2 },
  { id:'3', name:'Smart Watch', price:3999, originalPrice:7999, vendor:'TechStore', emoji:'⌚', qty:1 },
]

export default function CartPage() {
  const [items, setItems] = useState(initialItems)
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponMsg, setCouponMsg] = useState('')
  const [ordered, setOrdered] = useState(false)

  const updateQty = (id: string, delta: number) => {
    setItems(items.map(i => i.id === id
      ? { ...i, qty: Math.max(1, i.qty + delta) }
      : i
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id))
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shipping = subtotal > 2000 ? 0 : 99
  const discountAmt = Math.round(subtotal * discount / 100)
  const total = subtotal + shipping - discountAmt

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'SAVE10') {
      setDiscount(10)
      setCouponMsg('10% discount applied!')
    } else if (coupon.toUpperCase() === 'SAVE20') {
      setDiscount(20)
      setCouponMsg('20% discount applied!')
    } else {
      setDiscount(0)
      setCouponMsg('Invalid coupon code')
    }
  }

  if (ordered) {
    return (
      <div style={{minHeight:'100vh',background:'#f8fafc',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
        <div style={{background:'white',borderRadius:'24px',padding:'48px',textAlign:'center',boxShadow:'0 20px 60px rgba(0,0,0,0.1)',maxWidth:'400px'}}>
          <div style={{fontSize:'64px',marginBottom:'16px'}}>🎉</div>
          <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0f172a',marginBottom:'8px'}}>Order Placed!</h2>
          <p style={{color:'#94a3b8',marginBottom:'24px'}}>Your order has been placed successfully. Thank you for shopping!</p>
          <div style={{background:'#f1f5f9',borderRadius:'12px',padding:'16px',marginBottom:'24px'}}>
            <p style={{fontSize:'13px',color:'#475569'}}>Order Total</p>
            <p style={{fontSize:'28px',fontWeight:'800',color:'#1d5bff'}}>Rs.{total}</p>
          </div>
          <a href="/product" style={{display:'block',background:'linear-gradient(135deg,#1d5bff,#6c3fff)',color:'white',padding:'14px',borderRadius:'12px',textDecoration:'none',fontWeight:'700',fontSize:'16px'}}>
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div style={{minHeight:'100vh',background:'#f8fafc',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'80px',marginBottom:'16px'}}>🛒</div>
          <h2 style={{fontSize:'24px',fontWeight:'700',color:'#0f172a',marginBottom:'8px'}}>Cart is Empty!</h2>
          <p style={{color:'#94a3b8',marginBottom:'24px'}}>Add some products to your cart</p>
          <a href="/product" style={{background:'linear-gradient(135deg,#1d5bff,#6c3fff)',color:'white',padding:'14px 32px',borderRadius:'12px',textDecoration:'none',fontWeight:'700'}}>
            Shop Now
          </a>
        </div>
      </div>
    )
  }

  // vendor-wise group
  const vendors = [...new Set(items.map(i => i.vendor))]

  return (
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'sans-serif'}}>
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1d5bff,#6c3fff)',padding:'32px 24px'}}>
        <h1 style={{color:'white',fontSize:'28px',fontWeight:'800',marginBottom:'4px'}}>Shopping Cart</h1>
        <p style={{color:'#ffffff99',fontSize:'14px'}}>{items.reduce((s,i)=>s+i.qty,0)} items from {vendors.length} vendors</p>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'24px',display:'grid',gridTemplateColumns:'1fr 340px',gap:'24px',alignItems:'start'}}>

        {/* Left — Cart Items */}
        <div>
          {vendors.map(vendor => (
            <div key={vendor} style={{marginBottom:'16px'}}>
              {/* Vendor label */}
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
                <span style={{fontSize:'16px'}}>🏪</span>
                <span style={{fontSize:'14px',fontWeight:'700',color:'#475569'}}>{vendor}</span>
                <span style={{fontSize:'12px',color:'#94a3b8'}}>({items.filter(i=>i.vendor===vendor).length} items)</span>
              </div>

              {items.filter(i => i.vendor === vendor).map(item => (
                <div key={item.id} style={{background:'white',borderRadius:'16px',padding:'16px',marginBottom:'8px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',display:'flex',alignItems:'center',gap:'16px'}}>
                  {/* Emoji */}
                  <div style={{width:'80px',height:'80px',background:'linear-gradient(135deg,#f1f5f9,#e2e8f0)',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'36px',flexShrink:0}}>
                    {item.emoji}
                  </div>

                  {/* Info */}
                  <div style={{flex:1}}>
                    <h3 style={{fontSize:'15px',fontWeight:'600',color:'#0f172a',marginBottom:'4px'}}>{item.name}</h3>
                    <p style={{fontSize:'12px',color:'#94a3b8',marginBottom:'8px'}}>by {item.vendor}</p>
                    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                      <span style={{fontSize:'18px',fontWeight:'700',color:'#1d5bff'}}>Rs.{item.price}</span>
                      <span style={{fontSize:'12px',color:'#94a3b8',textDecoration:'line-through'}}>Rs.{item.originalPrice}</span>
                    </div>
                  </div>

                  {/* Qty */}
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <button onClick={() => updateQty(item.id, -1)}
                      style={{width:'32px',height:'32px',borderRadius:'8px',border:'1px solid #e2e8f0',background:'white',fontSize:'18px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700'}}>-</button>
                    <span style={{fontSize:'16px',fontWeight:'700',minWidth:'24px',textAlign:'center'}}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}
                      style={{width:'32px',height:'32px',borderRadius:'8px',border:'none',background:'#1d5bff',color:'white',fontSize:'18px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700'}}>+</button>
                  </div>

                  {/* Total + Remove */}
                  <div style={{textAlign:'right',minWidth:'80px'}}>
                    <p style={{fontSize:'16px',fontWeight:'700',color:'#0f172a',marginBottom:'8px'}}>Rs.{item.price * item.qty}</p>
                    <button onClick={() => removeItem(item.id)}
                      style={{background:'#fee2e2',color:'#ef4444',border:'none',padding:'4px 12px',borderRadius:'8px',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Free shipping notice */}
          {shipping > 0 && (
            <div style={{background:'#fffbeb',border:'1px solid #fde68a',borderRadius:'12px',padding:'12px 16px',fontSize:'13px',color:'#92400e'}}>
              Add Rs.{2000 - subtotal} more for <strong>FREE shipping!</strong>
            </div>
          )}
          {shipping === 0 && (
            <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:'12px',padding:'12px 16px',fontSize:'13px',color:'#166534'}}>
              🎉 You get <strong>FREE shipping!</strong>
            </div>
          )}
        </div>

        {/* Right — Order Summary */}
        <div style={{background:'white',borderRadius:'20px',padding:'24px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',position:'sticky',top:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'700',color:'#0f172a',marginBottom:'20px'}}>Order Summary</h2>

          <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'14px',color:'#475569'}}>
              <span>Subtotal ({items.reduce((s,i)=>s+i.qty,0)} items)</span>
              <span style={{fontWeight:'600'}}>Rs.{subtotal}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'14px',color:'#475569'}}>
              <span>Shipping</span>
              <span style={{fontWeight:'600',color: shipping===0 ? '#22c55e' : '#0f172a'}}>
                {shipping === 0 ? 'FREE' : `Rs.${shipping}`}
              </span>
            </div>
            {discount > 0 && (
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'14px',color:'#22c55e'}}>
                <span>Discount ({discount}%)</span>
                <span style={{fontWeight:'600'}}>-Rs.{discountAmt}</span>
              </div>
            )}
          </div>

          {/* Coupon */}
          <div style={{marginBottom:'20px'}}>
            <div style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
              <input
                placeholder="Coupon code"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                style={{flex:1,padding:'10px 12px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'13px',outline:'none'}}
              />
              <button onClick={applyCoupon}
                style={{background:'#1d5bff',color:'white',border:'none',padding:'10px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
                Apply
              </button>
            </div>
            {couponMsg && (
              <p style={{fontSize:'12px',color: discount>0 ? '#22c55e' : '#ef4444',fontWeight:'500'}}>{couponMsg}</p>
            )}
            <p style={{fontSize:'11px',color:'#94a3b8'}}>Try: SAVE10 or SAVE20</p>
          </div>

          <div style={{borderTop:'2px solid #f1f5f9',paddingTop:'16px',marginBottom:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'18px',fontWeight:'800',color:'#0f172a'}}>
              <span>Total</span>
              <span style={{color:'#1d5bff'}}>Rs.{total}</span>
            </div>
          </div>

          <button onClick={() => setOrdered(true)}
            style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#1d5bff,#6c3fff)',color:'white',border:'none',borderRadius:'14px',fontSize:'16px',fontWeight:'700',cursor:'pointer',marginBottom:'12px'}}>
            Place Order Rs.{total} →
          </button>

          <a href="/product"
            style={{display:'block',textAlign:'center',color:'#94a3b8',fontSize:'13px',textDecoration:'none'}}>
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  )
}