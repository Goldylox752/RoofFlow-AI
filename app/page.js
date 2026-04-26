export default function Home() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO — PREMIUM HOOK */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
            Limited contractor access per city
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            Roofing Leads That Turn Into Booked Jobs — Not Clicks
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            RoofFlow connects roofing contractors with verified homeowners actively requesting estimates in your service area.
            No cold traffic. No shared leads. Just high-intent demand.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              href="/apply"
              className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Check Availability
            </a>

            <a
              href="#system"
              className="px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-400 transition"
            >
              See How It Works
            </a>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Territories assigned per region • Approval required
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-semibold">
            Why Contractors Waste Thousands on Leads
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6 text-left">

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <p className="font-medium">Click-based ads</p>
              <p className="text-gray-600 mt-2 text-sm">
                Pay for traffic with no guarantee of real intent.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <p className="font-medium">Shared lead lists</p>
              <p className="text-gray-600 mt-2 text-sm">
                Compete with multiple contractors on the same homeowner.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <p className="font-medium">Low conversion rate</p>
              <p className="text-gray-600 mt-2 text-sm">
                Most inquiries are unqualified or price shoppers.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section id="system" className="py-28">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center">
            The RoofFlow Demand Engine
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-8">

            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <p className="font-semibold">1. Capture Intent</p>
              <p className="text-gray-600 mt-2 text-sm">
                Homeowners actively request roofing estimates in your area.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <p className="font-semibold">2. Filter Demand</p>
              <p className="text-gray-600 mt-2 text-sm">
                Every lead is screened for urgency, intent, and location.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <p className="font-semibold">3. Deliver Booked Jobs</p>
              <p className="text-gray-600 mt-2 text-sm">
                You receive appointment-ready opportunities, not raw leads.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-[#0B0F19] text-white py-28">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center">
            Traditional Leads vs RoofFlow
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-6">

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="font-semibold">Google Ads</p>
              <p className="text-gray-300 mt-2 text-sm">
                Pay per click with no guaranteed intent.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="font-semibold">Lead Brokers</p>
              <p className="text-gray-300 mt-2 text-sm">
                Same lead sold to multiple contractors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-500 text-black">
              <p className="font-semibold">RoofFlow</p>
              <p className="mt-2 text-sm">
                Exclusive homeowner requests with verified intent.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-semibold">
            Contractors Getting Results
          </h2>

          <div className="mt-12 grid md:grid-cols-2 gap-6 text-left">

            <div className="p-6 rounded-2xl border border-gray-100">
              <p className="text-gray-700">
                “Every lead is real homeowner intent. It completely changed our close rate.”
              </p>
              <p className="text-sm text-gray-500 mt-4">
                — Roofing Contractor, Alberta
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100">
              <p className="text-gray-700">
                “We booked inspections within the first week.”
              </p>
              <p className="text-sm text-gray-500 mt-4">
                — Roofing Business Owner
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SCARCITY */}
      <section className="bg-gray-50 py-24 text-center">
        <h2 className="text-3xl font-semibold">
          Territory Availability
        </h2>

        <p className="mt-4 text-gray-600">
          We limit contractor access per region to maintain lead quality.
        </p>

        <div className="mt-6 text-lg font-semibold text-red-600">
          Only 2 contractor spots remaining in your area
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 text-center">
        <h2 className="text-3xl font-semibold">
          Ready to take exclusive roofing leads?
        </h2>

        <p className="text-gray-600 mt-4">
          Start receiving booked jobs instead of random inquiries.
        </p>

        <div className="mt-10">
          <a
            href="/apply"
            className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition"
          >
            Apply Now
          </a>
        </div>
      </section>

    </main>
  );
}
