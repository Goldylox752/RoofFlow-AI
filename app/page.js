export default function Home() {
  return (
    <main className="bg-white text-gray-900">

      {/* TOP SYSTEM BAR */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between text-xs text-gray-500">
          <span>RoofFlow Demand Engine</span>
          <span className="text-red-600 font-medium">
            ⚠ Limited contractor slots per region
          </span>
        </div>
      </div>

      {/* HERO — PRODUCT DASHBOARD STYLE */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
              Live Demand Active
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Roofing Leads That Turn Into Booked Jobs — Not Clicks
            </h1>

            <p className="mt-5 text-gray-600 text-lg">
              RoofFlow is a demand engine that delivers verified homeowners actively requesting roofing estimates in your service area.
            </p>

            <div className="mt-8 flex gap-3 flex-wrap">
              <a className="bg-black text-white px-6 py-3 rounded-xl font-medium" href="/apply">
                Check Availability
              </a>

              <a className="border px-6 py-3 rounded-xl" href="#system">
                View Engine
              </a>
            </div>

            <p className="mt-5 text-xs text-gray-500">
              Territory-based access • Approval required per region
            </p>
          </div>

          {/* RIGHT — SYSTEM CARD (IMPORTANT UPGRADE) */}
          <div className="border rounded-2xl p-6 shadow-sm bg-gray-50">

            <p className="text-sm font-medium">Live Lead Intelligence</p>

            <div className="mt-5 space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">City</span>
                <span className="font-medium">Alberta Region</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Demand Level</span>
                <span className="text-emerald-600 font-medium">High 🔥</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Lead Score Avg</span>
                <span className="font-medium">87 / 100</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Available Slots</span>
                <span className="text-red-600 font-medium">2 remaining</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-semibold">
            Why Contractors Lose Money on Leads
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6 text-left">

            {[
              ["Pay-per-click ads", "Unpredictable intent and expensive acquisition cost."],
              ["Shared lead systems", "You compete with multiple contractors per lead."],
              ["Low intent traffic", "Most inquiries are price shoppers, not buyers."]
            ].map(([t, d]) => (
              <div key={t} className="bg-white p-6 rounded-2xl border">
                <p className="font-medium">{t}</p>
                <p className="text-gray-600 mt-2 text-sm">{d}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section id="system" className="py-28">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center">
            RoofFlow Demand Engine
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-6">

            {[
              ["Intent Capture", "Homeowners actively request roofing estimates."],
              ["Lead Scoring Engine", "Each lead is scored by urgency and conversion probability."],
              ["Booking Layer", "Only appointment-ready opportunities are delivered."]
            ].map(([t, d]) => (
              <div key={t} className="p-6 border rounded-2xl bg-white shadow-sm">
                <p className="font-semibold">{t}</p>
                <p className="text-gray-600 mt-2 text-sm">{d}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-[#0B0F19] text-white py-28">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center">
            System Comparison
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-6">

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <p className="font-semibold">Google Ads</p>
              <p className="text-gray-300 text-sm mt-2">Pay per click with no intent guarantee.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <p className="font-semibold">Lead Brokers</p>
              <p className="text-gray-300 text-sm mt-2">Shared leads across multiple contractors.</p>
            </div>

            <div className="p-6 bg-emerald-500 text-black rounded-2xl">
              <p className="font-semibold">RoofFlow Engine</p>
              <p className="text-sm mt-2">Scored, filtered, and exclusive homeowner demand.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SCARCITY SYSTEM */}
      <section className="py-24 bg-gray-50 text-center">

        <h2 className="text-3xl font-semibold">
          Live Territory System
        </h2>

        <p className="mt-4 text-gray-600">
          Access is controlled per region to maintain lead quality.
        </p>

        <div className="mt-10 max-w-md mx-auto border rounded-2xl p-6 bg-white">

          <div className="flex justify-between text-sm">
            <span>Alberta</span>
            <span className="text-red-600 font-medium">2 / 3 slots filled</span>
          </div>

          <div className="flex justify-between text-sm mt-3">
            <span>Calgary</span>
            <span className="text-red-600 font-medium">Full</span>
          </div>

          <div className="flex justify-between text-sm mt-3">
            <span>Edmonton</span>
            <span className="text-emerald-600 font-medium">1 slot open</span>
          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="py-28 text-center">

        <h2 className="text-3xl font-semibold">
          Activate Your Territory Access
        </h2>

        <p className="text-gray-600 mt-4">
          Start receiving booked roofing opportunities — not cold leads.
        </p>

        <a
          href="/apply"
          className="mt-10 inline-block bg-black text-white px-8 py-4 rounded-xl"
        >
          Apply for Access
        </a>

      </section>

    </main>
  );
}
