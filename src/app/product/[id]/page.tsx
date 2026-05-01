export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Product Detail</h1>
      <p className="text-gray-500">Product ID: {params.id}</p>
    </main>
  )
}