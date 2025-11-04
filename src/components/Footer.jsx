export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-600">
          <div>
            <h4 className="text-slate-900 font-semibold mb-2">About DealSage</h4>
            <p>
              We surface discounted items from around the web, normalize pricing, and
              rank by savings and trust. Sources are clearly attributed and
              purchases may use affiliate partnerships.
            </p>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-2">Trust & Compliance</h4>
            <ul className="space-y-1">
              <li>• Affiliate links are marked and may earn us a commission.</li>
              <li>• We respect robots.txt, site terms, and applicable laws.</li>
              <li>• Scraping protections and anomaly checks reduce price manipulation.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold mb-2">Legal</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-slate-900">Terms of Service</a></li>
              <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900">Affiliate Disclosure</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} DealSage. All rights reserved.</div>
      </div>
    </footer>
  );
}
