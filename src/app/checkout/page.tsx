'use client'
import { useState } from 'react'

declare global {
  interface Window {
    Razorpay: any
  }
}

const cartItems = [
  { name: 'Wireless Earbuds', price: 1299, qty: 1, vendor: 'TechStore' },
  { name: 'Cotton T-Shirt', price: 499, qty: 2, vendor: 'FashionHub' },
]

export default function CheckoutPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal > 2000 ? 0 : 99
  const total = subtotal + shipping

  async function handlePayment() {
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill all required fields!')
      return
    }

    setLoading(true)

    try {
      // Create order
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      })
      const order = await res.json()

      // Load Razorpay script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          amount: order.amount,
          currency: 'INR',
          name: 'MyMarket',
          description: 'Order Payment',
          order_id: order.orderId,
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          theme: { color: '#1d5bff' },
          handler: function(response: any) {
            console.log('Payment success:', response)
            setSuccess(true)
            setLoading(false)
          },
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
        setLoading(false)
      }
    } catch (error) {
      console.error('Payment error:', error)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f8fafc',fontFamily:'sans-serif'}}>
        <div style={{background:'white',borderRadius:'24px',padding:'48px',textAlign:'center',boxShadow:'0 20px 60px rgba(0,0,0,0.1)',maxWidth:'400px'}}>
          <div style={{fontSize:'64px',marginBottom:'16px'}}>🎉</div>
          <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0f172a',marginBottom:'8px'}}>Payment Successful!</h2>
          <p style={{color:'#94a3b8',marginBottom:'24px'}}>Your order has been placed successfully!</p>
          <div style={{background:'#f0fdf4',borderRadius:'12px',padding:'16px',marginBottom:'24px'}}>
            <p style={{color:'#16a34a',fontWeight:'700',fontSize:'18px'}}>Rs.{total} Paid ✓</p>
          </div>
          <a href="/" style={{display:'block',background:'linear-gradient(135deg,#1d5bff,#6c3fff)',color:'white',padding:'14px',borderRadius:'12px',textDecoration:'none',fontWeight:'700'}}>
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'sans-serif'}}>
      <div style={{background:'linear-gradient(135deg,#1d5bff,#6c3fff)',padding:'32px 24px'}}>
        <h1 style={{color:'white',fontSize:'28px',fontWeight:'800'}}>Checkout</h1>
        <p style={{color:'#ffffff99',fontSize:'14px'}}>Complete your order</p>
      </div>

      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'24px',display:'grid',gridTemplateColumns:'1fr 360px',gap:'24px',alignItems:'start'}}>

        {/* Left - Form */}
        <div style={{background:'white',borderRadius:'20px',padding:'24px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <h2 style={{fontSize:'18px',fontWeight:'700',marginBottom:'20px',color:'#0f172a'}}>Delivery Details</h2>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
            <div>
              <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Full Name *</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Your name"
                style={{width:'100%',padding:'10px 14px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',boxSizing:'border-box'}}/>
            </div>
            <div>
              <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Phone *</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="10-digit number"
                style={{width:'100%',padding:'10px 14px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',boxSizing:'border-box'}}/>
            </div>
          </div>

          <div style={{marginBottom:'14px'}}>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Email *</label>
            <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              placeholder="email@example.com"
              style={{width:'100%',padding:'10px 14px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',boxSizing:'border-box'}}/>
          </div>

          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Delivery Address *</label>
            <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})}
              placeholder="Full address with pincode"
              rows={3}
              style={{width:'100%',padding:'10px 14px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',resize:'vertical',boxSizing:'border-box'}}/>
          </div>

          {/* Payment Methods */}
          <div style={{marginTop:'20px',padding:'16px',background:'#f8fafc',borderRadius:'12px'}}>
            <p style={{fontSize:'13px',fontWeight:'700',color:'#374151',marginBottom:'12px'}}>Payment Method</p>
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
              {['UPI', 'Credit/Debit Card', 'Net Banking', 'Wallets'].map(method => (
                <span key={method} style={{padding:'6px 14px',background:'white',border:'1px solid #e2e8f0',borderRadius:'20px',fontSize:'12px',fontWeight:'500',color:'#475569'}}>
                  {method}
                </span>
              ))}
            </div>
            <p style={{fontSize:'11px',color:'#94a3b8',marginTop:'8px'}}>Powered by Razorpay — 100% Secure</p>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div style={{background:'white',borderRadius:'20px',padding:'24px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',position:'sticky',top:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'700',marginBottom:'16px',color:'#0f172a'}}>Order Summary</h2>

          {cartItems.map(item => (
            <div key={item.name} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #f1f5f9'}}>
              <div>
                <p style={{fontSize:'13px',fontWeight:'600',color:'#0f172a'}}>{item.name}</p>
                <p style={{fontSize:'11px',color:'#94a3b8'}}>by {item.vendor} × {item.qty}</p>
              </div>
              <p style={{fontSize:'13px',fontWeight:'700',color:'#1d5bff'}}>Rs.{item.price * item.qty}</p>
            </div>
          ))}

          <div style={{marginTop:'16px',display:'flex',flexDirection:'column',gap:'8px'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',color:'#475569'}}>
              <span>Subtotal</span>
              <span>Rs.{subtotal}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',color:'#475569'}}>
              <span>Shipping</span>
              <span style={{color: shipping===0?'#22c55e':'#0f172a'}}>{shipping===0?'FREE':`Rs.${shipping}`}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'18px',fontWeight:'800',color:'#0f172a',borderTop:'2px solid #f1f5f9',paddingTop:'12px',marginTop:'4px'}}>
              <span>Total</span>
              <span style={{color:'#1d5bff'}}>Rs.{total}</span>
            </div>
          </div>

          <button onClick={handlePayment} disabled={loading}
            style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#1d5bff,#6c3fff)',color:'white',border:'none',borderRadius:'14px',fontSize:'16px',fontWeight:'700',cursor:'pointer',marginTop:'20px',opacity:loading?0.7:1}}>
            {loading ? 'Processing...' : `Pay Rs.${total} →`}
          </button>

          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',marginTop:'12px'}}>
            <span style={{fontSize:'12px',color:'#94a3b8'}}>🔒 Secured by Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  )
}