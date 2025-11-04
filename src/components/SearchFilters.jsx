import { Search, Filter, TrendingUp, Shield } from "lucide-react";

export default function SearchFilters({ query, onQueryChange, sortBy, onSortChange, tags, selectedTags, onToggleTag, minTrust, onTrustChange }) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search products, brands, or categories..."
                className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 bg-white/80"
              />
            </div>
          </div>
          <div className="lg:col-span-3 flex items-center gap-3">
            <div className="relative w-full">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                aria-label="Sort deals"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-300 pl-10 pr-8 py-3 text-slate-900 bg-white/80 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
              >
                <option value="savings">Best Savings</option>
                <option value="trust">Most Trustworthy</option>
                <option value="ending">Ending Soon</option>
                <option value="new">Newest</option>
              </select>
            </div>
          </div>
          <div className="lg:col-span-3 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/80 border border-slate-300 rounded-xl px-3 py-2 w-full">
              <Shield size={18} className="text-emerald-600" />
              <input
                type="range"
                min={0}
                max={100}
                value={minTrust}
                onChange={(e) => onTrustChange(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-slate-600 whitespace-nowrap">Trust {minTrust}%+</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-500 mr-1">Popular:</span>
          {tags.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-indigo-600 text-white border-indigo-600 shadow"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                }`}
              >
                <TrendingUp size={14} />
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
