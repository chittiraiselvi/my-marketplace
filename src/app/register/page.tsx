'use client'
import { useState } from 'react'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister() {
    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setLoading(false)

    if (data.message?.includes('successfully')) {
      // Register success → Login page
      window.location.href = '/login'
    } else {
      setMsg(data.error || 'Something went wrong')
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#1d5bff11,#6c3fff11)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',fontFamily:'sans-serif'}}>
      <div style={{background:'white',borderRadius:'24px',padding:'40px',width:'100%',maxWidth:'420px',boxShadow:'0 20px 60px rgba(0,0,0,0.1)'}}>

        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'40px',marginBottom:'8px'}}>🛍️</div>
          <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0f172a'}}>MyMarket</h1>
          <p style={{color:'#94a3b8',fontSize:'14px'}}>Create your account</p>
        </div>

        {/* Progress */}
        <div style={{display:'flex',alignItems:'center',marginBottom:'28px'}}>
          <div style={{flex:1,textAlign:'center'}}>
            <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#1d5bff',color:'white',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 4px',fontWeight:'700'}}>1</div>
            <p style={{fontSize:'11px',fontWeight:'700',color:'#1d5bff'}}>Register</p>
          </div>
          <div style={{flex:1,height:'2px',background:'#e2e8f0'}}></div>
          <div style={{flex:1,textAlign:'center'}}>
            <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#e2e8f0',color:'#94a3b8',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 4px',fontWeight:'700'}}>2</div>
            <p style={{fontSize:'11px',color:'#94a3b8'}}>Login</p>
          </div>
          <div style={{flex:1,height:'2px',background:'#e2e8f0'}}></div>
          <div style={{flex:1,textAlign:'center'}}>
            <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#e2e8f0',color:'#94a3b8',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 4px',fontWeight:'700'}}>3</div>
            <p style={{fontSize:'11px',color:'#94a3b8'}}>Shop</p>
          </div>
        </div>

        {/* Form */}
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Full Name *</label>
            <input type="text" placeholder="உன் பெயர்" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              style={{width:'100%',padding:'12px 16px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',boxSizing:'border-box'}}/>
          </div>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Email *</label>
            <input type="email" placeholder="email@example.com" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              style={{width:'100%',padding:'12px 16px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',boxSizing:'border-box'}}/>
          </div>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Password *</label>
            <input type="password" placeholder="••••••••" value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              style={{width:'100%',padding:'12px 16px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',boxSizing:'border-box'}}/>
          </div>

          {msg && (
            <div style={{padding:'12px',borderRadius:'10px',background:'#fee2e2',color:'#991b1b',fontSize:'13px'}}>
              {msg}
            </div>
          )}

          <button onClick={handleRegister} disabled={loading}
            style={{width:'100%',padding:'14px',background:'linear-gradient(135deg,#1d5bff,#6c3fff)',color:'white',border:'none',borderRadius:'12px',fontSize:'16px',fontWeight:'700',cursor:'pointer',opacity:loading?0.7:1}}>
            {loading ? 'Creating...' : 'Create Account →'}
          </button>

          <p style={{textAlign:'center',fontSize:'13px',color:'#94a3b8'}}>
            Already have account?{' '}
            <a href="/login" style={{color:'#1d5bff',fontWeight:'600',textDecoration:'none'}}>Login here</a>
          </p>
        </div>
      </div>
    </div>
  )
}