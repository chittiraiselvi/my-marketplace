export default function HomePage() {
  return (
    <main>
      <section className="bg-blue-600 text-white text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to MyMarket</h1>
        <p className="text-lg mb-8">1000+ Vendors • AI Moderated</p>
        <a href="/product" className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full mr-4">
          Shop Now
        </a>
        <a href="/vendor" className="border-2 border-white text-white font-bold px-8 py-3 rounded-full">
          Sell With Us
        </a>
      </section>

      <section className="py-12 px-6 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
          {["Electronics", "Fashion", "Home", "Food"].map((cat) => (
            <div key={cat} className="bg-white rounded-xl p-6 border cursor-pointer hover:border-blue-400">
              {cat}
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            {name:"Wireless Earbuds", price:1299, vendor:"TechStore"},
            {name:"Cotton T-Shirt", price:499, vendor:"FashionHub"},
            {name:"Coffee Mug", price:299, vendor:"HomeDecor"},
            {name:"Running Shoes", price:2499, vendor:"SportZone"},
          ].map((p) => (
            <div key={p.name} className="border rounded-xl overflow-hidden hover:shadow-lg cursor-pointer">
              <div className="bg-gray-100 h-40 flex items-center justify-center text-5xl">
                🛍️
              </div>
              <div className="p-4 text-left">
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-blue-600 font-bold text-lg">₹{p.price}</p>
                <p className="text-sm text-gray-500">by {p.vendor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}