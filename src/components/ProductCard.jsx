export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border border-emerald-100 bg-white/70 backdrop-blur p-4 hover:shadow-lg transition">
      <div className="aspect-square w-full rounded-lg overflow-hidden bg-emerald-50">
        {product.image ? (
          <img src={product.image+"&auto=format&fit=crop&w=600&q=60"} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="w-full h-full grid place-items-center text-emerald-500">{product.name[0]}</div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-semibold text-emerald-800">{product.name}</h3>
        <p className="text-sm text-emerald-700/70 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-emerald-700">Rp {product.price.toLocaleString('id-ID')}</span>
          <button onClick={()=>onAdd?.(product)} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700">Tambah</button>
        </div>
      </div>
    </div>
  );
}
