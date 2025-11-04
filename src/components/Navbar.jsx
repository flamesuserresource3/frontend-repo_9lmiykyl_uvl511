import { ShoppingCart, ShieldCheck, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 via-fuchsia-600 to-pink-500 grid place-items-center text-white shadow-md">
              <Sparkles size={18} />
            </div>
            <span className="text-xl font-semibold tracking-tight text-slate-900">
              DealSage
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-900 transition">Discover</a>
            <a href="#" className="hover:text-slate-900 transition">Categories</a>
            <a href="#" className="hover:text-slate-900 transition">Partners</a>
            <a href="#" className="hover:text-slate-900 transition">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 text-emerald-600 text-xs font-medium">
              <ShieldCheck size={16} />
              <span>Verified deals</span>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-3 py-2 text-sm font-medium shadow hover:shadow-md hover:bg-slate-800 transition">
              <ShoppingCart size={18} />
              <span>Cart</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
