export default function ProductPage({ params }) {
  // params.id = product ID from URL
  // /products/123 → params.id = "123"
  return <div>Product Detail: {params.id}</div>
}
