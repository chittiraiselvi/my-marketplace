'use client'
import { useState } from 'react'

const products = [
  {id:'1', name:'Wireless Earbuds', price:1299, originalPrice:2499, vendor:'TechStore', category:'Electronics', emoji:'🎧', rating:4.5, reviews:128},
  {id:'2', name:'Cotton T-Shirt', price:499, originalPrice:999, vendor:'FashionHub', category:'Fashion', emoji:'👕', rating:4.2, reviews:89},
  {id:'3', name:'Coffee Mug', price:299, originalPrice:599, vendor:'HomeDecor', category:'Home', emoji:'☕', rating:4.7, reviews:234},
  {id:'4', name:'Running Shoes', price:2499, originalPrice:4999, vendor:'SportZone', category:'Fashion', emoji:'👟', rating:4.4, reviews:156},
  {id:'5', name:'Smart Watch', price:3999, originalPrice:7999, vendor:'TechStore', category:'Electronics', emoji:'⌚', rating:4.6, reviews:312},
  {id:'6', name:'Yoga Mat', price:799, originalPrice:1599, vendor:'SportZone', category:'Home', emoji:'🧘', rating:4.3, reviews:67},
  {id:'7', name:'Sunglasses', price:899, originalPrice:1799, vendor:'FashionHub', category:'Fashion', emoji:'🕶️', rating:4.1, reviews:43},
  {id:'8', name:'Rice Cooker', price:1899, originalPrice:3499, vendor:'HomeDecor', category:'Home', emoji:'🍚', rating:4.5, reviews:198},
]

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Food']

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')

  let filtered = products
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  if (sort === 'low') filtered = [...filtered].sort((a,b) => a.price - b.price)
  if (sort === 'high') filtered = [...filtered].sort((a,b) => b.price - a.price)

  const discount = (p: typeof products[0]) => Math.round((1 - p.price/p.originalPrice)*100)

  return (
    <div style={{minHeight:'100vh',background:'#f8fafc',fontFamily:'sans-serif'}}>
      
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1d5bff,#6c3fff)',padding:'40px 24px',textAlign:'center'}}>
        <h1 style={{color:'white',fontSize:'32px',fontWeight:'800',marginBottom:'8px'}}>All Products 🛍️</h1>
        <p style={{color:'#ffffff99',fontSize:'16px',marginBottom:'24px'}}>{products.length} products available</p>
        
        {/* Search */}
        <div style={{maxWidth:'500px',margin:'0 auto',position:'relative'}}>
          <span style={{position:'absolute',left:'16px',top:'50%',transform:'translateY(-50%)',fontSize:'18px'}}>🔍</span>
          <input
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{width:'100%',padding:'14px 16px 14px 48px',borderRadius:'50px',border:'none',fontSize:'15px',outline:'none',boxSizing:'border-box',boxShadow:'0 4px 20px rgba(0,0,0,0.15)'}}
          />
        </div>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'24px'}}>
        
        {/* Filters */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px',flexWrap:'wrap',gap:'12px'}}>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                style={{padding:'8px 20px',borderRadius:'20px',border:'none',cursor:'pointer',fontWeight:'600',fontSize:'13px',
                  background: category===cat ? '#1d5bff' : 'white',
                  color: category===cat ? 'white' : '#475569',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
                {cat}
              </button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{padding:'8px 16px',borderRadius:'10px',border:'1px solid #e2e8f0',fontSize:'13px',fontWeight:'500',cursor:'pointer',outline:'none',background:'white'}}>
            <option value="default">Sort: Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Results count */}
        <p style={{color:'#94a3b8',fontSize:'14px',marginBottom:'20px'}}>
          Showing {filtered.length} products
          {category !== 'All' && ` in ${category}`}
          {search && ` for "${search}"`}
        </p>

        {/* Products Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'20px'}}>
          {filtered.map(p => (
            <a key={p.id} href={`/product/${p.id}`} style={{textDecoration:'none'}}>
              <div style={{background:'white',borderRadius:'16px',overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',transition:'transform .2s,box-shadow .2s',cursor:'pointer'}}
                onMouseEnter={e => {(e.currentTarget as HTMLElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLElement).style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'}}
                onMouseLeave={e => {(e.currentTarget as HTMLElement).style.transform='translateY(0)';(e.currentTarget as HTMLElement).style.boxShadow='0 2px 12px rgba(0,0,0,0.06)'}}>
                
                {/* Image */}
                <div style={{background:'linear-gradient(135deg,#f1f5f9,#e2e8f0)',height:'180px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'64px',position:'relative'}}>
                  {p.emoji}
                  <span style={{position:'absolute',top:'12px',right:'12px',background:'#ef4444',color:'white',fontSize:'11px',fontWeight:'700',padding:'3px 8px',borderRadius:'10px'}}>
                    -{discount(p)}%
                  </span>
                </div>

                {/* Info */}
                <div style={{padding:'16px'}}>
                  <div style={{fontSize:'11px',color:'#94a3b8',marginBottom:'4px',fontWeight:'500'}}>{p.vendor} • {p.category}</div>
                  <h3 style={{fontSize:'15px',fontWeight:'600',color:'#0f172a',marginBottom:'8px'}}>{p.name}</h3>
                  
                  {/* Rating */}
                  <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'10px'}}>
                    <span style={{color:'#f59e0b',fontSize:'13px'}}>{'★'.repeat(Math.floor(p.rating))}{'☆'.repeat(5-Math.floor(p.rating))}</span>
                    <span style={{fontSize:'12px',color:'#94a3b8'}}>({p.reviews})</span>
                  </div>

                  {/* Price */}
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}>
                    <span style={{fontSize:'20px',fontWeight:'700',color:'#1d5bff'}}>₹{p.price}</span>
                    <span style={{fontSize:'13px',color:'#94a3b8',textDecoration:'line-through'}}>₹{p.originalPrice}</span>
                  </div>

                  <button style={{width:'100%',padding:'10px',background:'linear-gradient(135deg,#1d5bff,#6c3fff)',color:'white',border:'none',borderRadius:'10px',fontWeight:'600',fontSize:'13px',cursor:'pointer'}}>
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:'60px 24px'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🔍</div>
            <h3 style={{color:'#475569',fontSize:'18px'}}>No products found</h3>
            <p style={{color:'#94a3b8'}}>Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  )
}