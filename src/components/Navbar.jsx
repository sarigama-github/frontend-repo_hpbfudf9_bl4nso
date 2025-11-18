import { ShoppingCart, BookOpen, Leaf, Search } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-emerald-200/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 font-semibold text-emerald-700">
          <Leaf className="w-6 h-6" />
          <span>Herbalista</span>
        </div>
        <div className="ml-auto hidden md:flex items-center gap-6 text-sm text-emerald-700/80">
          <a href="#products" className="hover:text-emerald-800">Produk</a>
          <a href="#edu" className="hover:text-emerald-800">Edukasi</a>
        </div>
        <div className="flex-1 md:flex-none" />
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
          <input
            value={q}
            onChange={(e)=>{setQ(e.target.value); onSearch?.(e.target.value)}}
            placeholder="Cari produk herbal..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button className="ml-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:block">Keranjang</span>
        </button>
      </div>
    </header>
  );
}
