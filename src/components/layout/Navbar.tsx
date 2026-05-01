export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 border-b">
      <h1>MyMarket</h1>
      <div>
        <a href="/products">Products</a>
        <a href="/cart">Cart</a>
      </div>
    </nav>
  )
}