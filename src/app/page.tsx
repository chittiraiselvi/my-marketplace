export default function HomePage() {
  return (
    <div>
      // Hero Section
      <section className="bg-blue-600 text-white p-16 text-center">
        <h1>Best Marketplace</h1>
        <p>1000+ Vendors, AI Moderated</p>
        <button>Shop Now</button>
      </section>

      // Products Grid
      <section className="grid grid-cols-4 gap-4 p-8">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </div>
  )
}