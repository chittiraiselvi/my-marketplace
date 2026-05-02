"use client"
import { useState } from "react"

export default function ModeratePage() {
  const [form, setForm] = useState({ title: "", description: "", category: "Electronics" })
  const [result, setResult] = useState(null as any)
  const [loading, setLoading] = useState(false)

  const categories = ["Electronics", "Fashion", "Home", "Food", "Sports"]

  const examples = [
    { title: "Wireless Earbuds", description: "High quality bluetooth earbuds with 20hr battery", category: "Electronics" },
    { title: "Fake Rolex Watch", description: "Replica luxury watch looks exactly like original", category: "Fashion" },
    { title: "Organic Rice 5kg", description: "Pure organic basmati rice from Punjab farms", category: "Food" },
  ]

  async function handleCheck() {
    if (!form.title) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ error: "Something went wrong" })
    }
    setLoading(false)
  }

  return (
    <div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"sans-serif",padding:"32px 24px"}}>
      <div style={{maxWidth:"800px",margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{fontSize:"48px",marginBottom:"12px"}}>AI</div>
          <h1 style={{fontSize:"28px",fontWeight:"800",color:"#0f172a",marginBottom:"8px"}}>AI Product Moderation</h1>
          <p style={{color:"#94a3b8",fontSize:"15px"}}>Gemini AI - product safe check</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",alignItems:"start"}}>
          <div style={{background:"white",borderRadius:"20px",padding:"24px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
            <h2 style={{fontSize:"16px",fontWeight:"700",marginBottom:"16px"}}>Product Details</h2>
            <div style={{marginBottom:"16px"}}>
              <p style={{fontSize:"12px",fontWeight:"600",color:"#94a3b8",marginBottom:"8px"}}>Quick Examples:</p>
              {examples.map((ex, i) => (
                <button key={i} onClick={() => setForm(ex)}
                  style={{display:"block",width:"100%",padding:"8px 12px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"8px",fontSize:"12px",cursor:"pointer",textAlign:"left",color:"#475569",marginBottom:"6px"}}>
                  {i === 1 ? "FAKE" : "OK"} - {ex.title}
                </button>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
              <div>
                <label style={{fontSize:"13px",fontWeight:"600",color:"#374151",marginBottom:"6px",display:"block"}}>Product Title</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  placeholder="eg: Wireless Earbuds"
                  style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e2e8f0",borderRadius:"10px",fontSize:"14px",outline:"none",boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{fontSize:"13px",fontWeight:"600",color:"#374151",marginBottom:"6px",display:"block"}}>Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  placeholder="Product description..." rows={3}
                  style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e2e8f0",borderRadius:"10px",fontSize:"14px",outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{fontSize:"13px",fontWeight:"600",color:"#374151",marginBottom:"6px",display:"block"}}>Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  style={{width:"100%",padding:"10px 14px",border:"1.5px solid #e2e8f0",borderRadius:"10px",fontSize:"14px",outline:"none",background:"white",boxSizing:"border-box"}}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={handleCheck} disabled={loading || !form.title}
                style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#1d5bff,#6c3fff)",color:"white",border:"none",borderRadius:"12px",fontSize:"15px",fontWeight:"700",cursor:"pointer",opacity:loading||!form.title?0.6:1}}>
                {loading ? "AI Analyzing..." : "Check with AI"}
              </button>
            </div>
          </div>
          <div>
            {!result && !loading && (
              <div style={{background:"white",borderRadius:"20px",padding:"32px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)",textAlign:"center"}}>
                <div style={{fontSize:"48px",marginBottom:"12px"}}>Search</div>
                <p style={{color:"#94a3b8",fontSize:"14px"}}>Product details enter பண்ணி Check பண்ணு</p>
              </div>
            )}
            {loading && (
              <div style={{background:"white",borderRadius:"20px",padding:"32px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)",textAlign:"center"}}>
                <p style={{color:"#475569",fontWeight:"600"}}>AI Analyzing...</p>
              </div>
            )}
            {result && !result.error && (
              <div style={{background:"white",borderRadius:"20px",padding:"24px",boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
                <div style={{textAlign:"center",marginBottom:"20px",padding:"20px",borderRadius:"14px",
                  background:result.approved?"linear-gradient(135deg,#d1fae5,#a7f3d0)":"linear-gradient(135deg,#fee2e2,#fecaca)"}}>
                  <h3 style={{fontSize:"20px",fontWeight:"800",color:result.approved?"#065f46":"#991b1b",marginBottom:"4px"}}>
                    {result.approved?"APPROVED":"REJECTED"}
                  </h3>
                  <p style={{fontSize:"13px",color:result.approved?"#047857":"#dc2626"}}>{result.reason}</p>
                </div>
                <div style={{marginBottom:"16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
                    <span style={{fontSize:"13px",fontWeight:"600"}}>Safety Score</span>
                    <span style={{fontSize:"13px",fontWeight:"800",color:result.score>70?"#22c55e":result.score>40?"#f59e0b":"#ef4444"}}>{result.score}/100</span>
                  </div>
                  <div style={{background:"#f1f5f9",borderRadius:"8px",height:"12px"}}>
                    <div style={{background:result.score>70?"#22c55e":result.score>40?"#f59e0b":"#ef4444",height:"12px",borderRadius:"8px",width:result.score+"%"}}></div>
                  </div>
                </div>
                {result.flags && result.flags.length > 0 && (
                  <div style={{background:"#fff5f5",borderRadius:"10px",padding:"12px"}}>
                    <p style={{fontSize:"12px",fontWeight:"700",color:"#ef4444",marginBottom:"8px"}}>Issues Found:</p>
                    {result.flags.map((flag: string, i: number) => (
                      <p key={i} style={{fontSize:"12px",color:"#dc2626",marginBottom:"4px"}}>- {flag}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
            {result && result.error && (
              <div style={{background:"#fff5f5",borderRadius:"20px",padding:"24px",border:"1px solid #fecaca",textAlign:"center"}}>
                <p style={{color:"#ef4444",fontWeight:"600"}}>Error: {result.error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
