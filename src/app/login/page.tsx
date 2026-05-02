'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const url = isLogin ? '/api/auth/login' : '/api/auth/register'
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setMsg(data.message || data.error)
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#1d5bff11,#6c3fff11)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{background:'white',borderRadius:'24px',padding:'40px',width:'100%',maxWidth:'420px',boxShadow:'0 20px 60px rgba(0,0,0,0.1)'}}>
        
        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'40px',marginBottom:'8px'}}>🛍️</div>
          <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0f172a'}}>MyMarket</h1>
          <p style={{color:'#94a3b8',fontSize:'14px'}}>Your trusted marketplace</p>
        </div>

        {/* Toggle */}
        <div style={{display:'flex',background:'#f1f5f9',borderRadius:'12px',padding:'4px',marginBottom:'28px'}}>
          <button onClick={() => setIsLogin(true)}
            style={{flex:1,padding:'10px',borderRadius:'10px',border:'none',cursor:'pointer',fontWeight:'600',fontSize:'14px',
              background: isLogin ? 'white' : 'transparent',
              color: isLogin ? '#1d5bff' : '#94a3b8',
              boxShadow: isLogin ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'}}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)}
            style={{flex:1,padding:'10px',borderRadius:'10px',border:'none',cursor:'pointer',fontWeight:'600',fontSize:'14px',
              background: !isLogin ? 'white' : 'transparent',
              color: !isLogin ? '#1d5bff' : '#94a3b8',
              boxShadow: !isLogin ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'}}>
            Register
          </button>
        </div>

        {/* Form */}
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {!isLogin && (
            <div>
              <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Full Name</label>
              <input
                type="text" placeholder="உன் பெயர்"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                style={{width:'100%',padding:'12px 16px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',boxSizing:'border-box'}}/>
            </div>
          )}

          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Email</label>
            <input
              type="email" placeholder="email@example.com"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              style={{width:'100%',padding:'12px 16px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',boxSizing:'border-box'}}/>
          </div>

          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Password</label>
            <input
              type="password" placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              style={{width:'100%',padding:'12px 16px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none',boxSizing:'border-box'}}/>
          </div>

          {msg && (
            <div style={{padding:'12px 16px',borderRadius:'10px',fontSize:'13px',
              background: msg.includes('success') || msg.includes('successfully') ? '#d1fae5' : '#fee2e2',
              color: msg.includes('success') || msg.includes('successfully') ? '#065f46' : '#991b1b'}}>
              {msg}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading}
            style={{width:'100%',padding:'14px',background:'linear-gradient(135deg,#1d5bff,#6c3fff)',color:'white',border:'none',borderRadius:'12px',fontSize:'16px',fontWeight:'700',cursor:'pointer',marginTop:'8px',opacity: loading ? 0.7 : 1}}>
            {loading ? '...' : isLogin ? 'Login →' : 'Create Account →'}
          </button>
        </div>

        {/* Back */}
        <p style={{textAlign:'center',marginTop:'24px',fontSize:'13px',color:'#94a3b8'}}>
          <a href="/" style={{color:'#1d5bff',textDecoration:'none',fontWeight:'500'}}>← Back to Home</a>
        </p>
      </div>
    
    </div>
  )
}                                                                                                                                                                                                                                                                                                                                                                                                                       