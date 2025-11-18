import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import ArticleCard from './components/ArticleCard'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [p, a] = await Promise.all([
          fetch(`${API}/api/products${query?`?q=${encodeURIComponent(query)}`:''}`).then(r=>r.json()),
          fetch(`${API}/api/articles`).then(r=>r.json()),
        ])
        setProducts(p)
        setArticles(a)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [query])

  const categories = useMemo(() => {
    const set = new Set(products.map(p=>p.category))
    return ['Semua', ...Array.from(set)]
  }, [products])

  const [cart, setCart] = useState([])
  const addToCart = (prod) => {
    setCart((prev)=>{
      const idx = prev.findIndex(i=>i.id===prod.id)
      if (idx>=0) {
        const copy=[...prev]; copy[idx]={...copy[idx], quantity: copy[idx].quantity+1}; return copy
      }
      return [...prev, {id: prod.id, name: prod.name, price: prod.price, quantity:1}]
    })
  }

  const total = cart.reduce((s,i)=>s+i.price*i.quantity,0)

  const checkout = async () => {
    if (!cart.length) return alert('Keranjang kosong')
    const order = {
      items: cart.map(i=>({product_id: i.id, name: i.name, price: i.price, quantity: i.quantity})),
      customer: { name: 'Tamu', address: 'Alamat belum diisi' },
      total
    }
    try {
      const res = await fetch(`${API}/api/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(order) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Gagal checkout')
      alert('Pesanan dibuat! ID: '+data.id)
      setCart([])
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100/60">
      <Navbar onSearch={setQuery} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="text-center py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800">Toko Herbal Alami</h1>
          <p className="mt-2 text-emerald-700/80">Belanja produk herbal pilihan dan pelajari manfaatnya.</p>
        </section>

        <section id="products" className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-emerald-800">Produk</h2>
            <div className="text-sm text-emerald-700/70">{products.length} produk</div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({length:8}).map((_,i)=> (
                <div key={i} className="h-64 rounded-xl bg-emerald-200/40 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(p=> (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>

        <section id="edu" className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-emerald-800">Edukasi Herbal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map(a=> (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="rounded-2xl border border-emerald-200 bg-white/70 backdrop-blur p-4">
            <h3 className="font-semibold text-emerald-800 mb-2">Ringkasan Keranjang</h3>
            {cart.length===0 ? (
              <p className="text-emerald-700/70">Belum ada produk di keranjang.</p>
            ) : (
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-emerald-900">
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rp { (item.price*item.quantity).toLocaleString('id-ID') }</span>
                  </div>
                ))}
                <div className="border-t border-emerald-200 pt-2 flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>Rp { total.toLocaleString('id-ID') }</span>
                </div>
                <button onClick={checkout} className="w-full mt-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Checkout</button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
