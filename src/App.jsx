import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import SearchFilters from "./components/SearchFilters";
import DealsGrid from "./components/DealsGrid";
import Footer from "./components/Footer";

const MOCK_DEALS = [
  {
    id: "1",
    title: "Sony WH-1000XM5 Noise Cancelling Headphones",
    merchant: "Amazon",
    source: "Amazon Deals Page",
    imageUrl: "https://images.unsplash.com/photo-1518443895914-6dfb9f87d36f?q=80&w=1200&auto=format&fit=crop",
    price: 299.99,
    originalPrice: 399.99,
    trustScore: 92,
    verified: true,
    affiliateUrl: "https://example.com/amazon?affid=dealsage",
    tags: ["Electronics", "Audio", "Headphones"],
    rating: 4.8,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    directCheckout: false,
  },
  {
    id: "2",
    title: "Nike Pegasus 40 Running Shoes",
    merchant: "Nike",
    source: "Nike Promo Feed",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    price: 89.0,
    originalPrice: 130.0,
    trustScore: 85,
    verified: true,
    affiliateUrl: "https://example.com/nike?affid=dealsage",
    tags: ["Fashion", "Footwear", "Sports"],
    rating: 4.6,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
    directCheckout: true,
  },
  {
    id: "3",
    title: "KitchenAid Artisan Stand Mixer",
    merchant: "BestBuy",
    source: "BestBuy Open API",
    imageUrl: "https://images.unsplash.com/photo-1556912170-782162f20512?q=80&w=1200&auto=format&fit=crop",
    price: 279.99,
    originalPrice: 449.99,
    trustScore: 76,
    verified: true,
    affiliateUrl: "https://example.com/bestbuy?affid=dealsage",
    tags: ["Home", "Kitchen", "Appliances"],
    rating: 4.7,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    directCheckout: false,
  },
  {
    id: "4",
    title: "Apple Watch Series 9 (GPS, 45mm)",
    merchant: "Target",
    source: "Target Partner Network",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    price: 329.0,
    originalPrice: 429.0,
    trustScore: 88,
    verified: true,
    affiliateUrl: "https://example.com/target?affid=dealsage",
    tags: ["Wearables", "Electronics"],
    rating: 4.5,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
    directCheckout: false,
  },
  {
    id: "5",
    title: "Allbirds Wool Runners",
    merchant: "Allbirds",
    source: "Allbirds Affiliate",
    imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
    price: 84.0,
    originalPrice: 110.0,
    trustScore: 68,
    verified: false,
    affiliateUrl: "https://example.com/allbirds?affid=dealsage",
    tags: ["Fashion", "Footwear"],
    rating: 4.4,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    directCheckout: true,
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("savings");
  const [selectedTags, setSelectedTags] = useState([]);
  const [minTrust, setMinTrust] = useState(60);

  const tags = useMemo(() => {
    const t = new Set();
    for (const d of MOCK_DEALS) d.tags?.forEach((x) => t.add(x));
    return Array.from(t);
  }, []);

  const deals = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = MOCK_DEALS.filter((d) => d.trustScore >= minTrust);

    if (q) {
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.merchant.toLowerCase().includes(q) ||
          d.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedTags.length) {
      filtered = filtered.filter((d) => d.tags?.some((t) => selectedTags.includes(t)));
    }

    const bySavings = (a, b) =>
      (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice;
    const byTrust = (a, b) => b.trustScore - a.trustScore;
    const byEnding = (a, b) => new Date(a.expiresAt) - new Date(b.expiresAt);
    const byNew = (a, b) => new Date(b.expiresAt) - new Date(a.expiresAt); // proxy for freshness in mock

    const sorter = {
      savings: bySavings,
      trust: byTrust,
      ending: byEnding,
      new: byNew,
    }[sortBy];

    return filtered.slice().sort(sorter);
  }, [query, sortBy, selectedTags, minTrust]);

  function toggleTag(tag) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main>
        <section className="bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                A curated marketplace for trustworthy savings
              </h1>
              <p className="mt-3 text-slate-600 text-base">
                We continuously discover and deduplicate public offers, normalize pricing, and rank by savings
                and reliability. Every deal shows clear sources and affiliate disclosures.
              </p>
            </div>
          </div>
        </section>

        <SearchFilters
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          tags={tags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          minTrust={minTrust}
          onTrustChange={setMinTrust}
        />

        <DealsGrid deals={deals} />
      </main>

      <Footer />
    </div>
  );
}
