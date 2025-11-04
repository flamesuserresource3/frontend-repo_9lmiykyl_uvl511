import { ExternalLink, ShoppingCart, BadgeCheck, Clock, Shield } from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value);
}

export default function DealCard({ deal }) {
  const savings = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);
  const expires = deal.expiresAt ? new Date(deal.expiresAt) : null;
  const expLabel = expires ? expires.toLocaleString() : "—";
  const canCheckoutHere = Boolean(deal.directCheckout);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {deal.imageUrl ? (
          <img
            src={deal.imageUrl}
            alt={deal.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-slate-400">No image</div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-900 leading-tight line-clamp-2">
            {deal.title}
          </h3>
          {deal.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-1 text-xs font-medium border border-emerald-200">
              <BadgeCheck size={14} /> Verified
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900">{formatCurrency(deal.price)}</span>
          <span className="text-sm text-slate-400 line-through">{formatCurrency(deal.originalPrice)}</span>
          <span className="ml-2 inline-flex items-center rounded-full bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 text-xs font-semibold">
            -{savings}%
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">{deal.merchant}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Shield size={14} className={`${deal.trustScore >= 80 ? 'text-emerald-600' : deal.trustScore >= 50 ? 'text-amber-600' : 'text-rose-600'}`} />{deal.trustScore}% trust</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Clock size={14} />
            <span>Ends {expLabel}</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {deal.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[11px] font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={deal.affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
          >
            <ExternalLink size={16} /> View Deal
          </a>
          <button
            disabled={!canCheckoutHere}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white transition ${
              canCheckoutHere ? "bg-slate-900 hover:bg-slate-800" : "bg-slate-300 cursor-not-allowed"
            }`}
            title={canCheckoutHere ? "Checkout on DealSage" : "Checkout via merchant"}
          >
            <ShoppingCart size={16} /> {canCheckoutHere ? "Buy Now" : "Merchant Checkout"}
          </button>
        </div>

        <p className="mt-3 text-[11px] text-slate-500">
          Source: <span className="font-medium text-slate-700">{deal.source}</span> • Prices and availability change rapidly. Always check merchant page.
        </p>
      </div>
    </article>
  );
}
