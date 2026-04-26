export default function Home() {
  return (
    <main className="bg-white text-gray-900">

      {/* TOP BAR */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-xs">
          <span className="font-semibold tracking-wide">
            ROOFFLOW DEMAND ENGINE
          </span>
          <span className="text-red-600 font-semibold">
            Territory-based contractor access system
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <p className="text-sm text-gray-500 uppercase tracking-wider">
            Exclusive roofing demand system
          </p>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
            Booked Roofing Jobs <br />
            Delivered to Your Calendar
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            RoofFlow delivers verified homeowners actively requesting roofing estimates in your territory.
            No shared leads. No PPC waste. No cold traffic.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/apply"
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold"
            >
              Check Territory Availability →
            </a>

            <a
              href="#how"
              className="border px-8 py-4 rounded-xl font-medium"
            >
              How it works
            </a>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Territory approval required • Limited contractor density per region
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

          <div>
            <p className="text-3xl font-bold">+217%</p>
            <p className="text-gray-500 text-sm mt-2">
              Average revenue increase in first 90 days
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold">4.9/5</p>
            <p className="text-gray-500 text-sm mt-2">
              Contractor satisfaction rating
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold">0</p>
            <p className="text-gray-500 text-sm mt-2">
              Shared leads — all exclusive
            </p>
          </div>

        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold">
            Why most contractors waste budget on leads
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Traditional lead sources prioritize volume, not intent or booking readiness.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-8 text-left">

            <div className="border p-6 rounded-xl">
              <p className="font-semibold">Paid Ads</p>
              <p className="text-gray-500 text-sm mt-2">
                High cost per click, low booking intent, unpredictable ROI.
              </p>
            </div>

            <div className="border p-6 rounded-xl">
              <p className="font-semibold">Shared Leads</p>
              <p className="text-gray-500 text-sm mt-2">
                3–7 contractors competing per homeowner inquiry.
              </p>
            </div>

            <div className="border p-6 rounded-xl">
              <p className="font-semibold">Low Intent Forms</p>
              <p className="text-gray-500 text-sm mt-2">
                Most users are price shopping, not ready to book.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold">
            How RoofFlow works
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-8 text-left">

            <div className="bg-white p-6 rounded-xl border">
              <p className="font-bold">1. Intent Capture</p>
              <p className="text-gray-500 text-sm mt-2">
                Homeowners submit verified roofing request signals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <p className="font-bold">2. Lead Scoring</p>
              <p className="text-gray-500 text-sm mt-2">
                Each lead is filtered by urgency, roof age, and intent.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <p className="font-bold">3. Booking Delivery</p>
              <p className="text-gray-500 text-sm mt-2">
                Only appointment-ready opportunities are delivered.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold">
            Contractors using RoofFlow
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-8 text-left">

            <div className="border p-6 rounded-xl">
              <p className="text-sm text-gray-600">
                “First 3 leads turned into $38K in booked jobs.”
              </p>
              <p className="mt-4 font-semibold">— Calgary Roofing Co.</p>
            </div>

            <div className="border p-6 rounded-xl">
              <p className="text-sm text-gray-600">
                “Way higher intent than Google Ads ever gave us.”
              </p>
              <p className="mt-4 font-semibold">— Edmonton Exteriors</p>
            </div>

            <div className="border p-6 rounded-xl">
              <p className="text-sm text-gray-600">
                “We stopped using shared leads completely.”
              </p>
              <p className="mt-4 font-semibold">— Rockies Roofing</p>
            </div>

          </div>
        </div>
      </section>

      {/* OBJECTION HANDLING */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center">
            Common questions
          </h2>

          <div className="mt-10 space-y-6">

            <div>
              <p className="font-semibold">Do I share leads with other contractors?</p>
              <p className="text-gray-500 text-sm mt-1">No. Territory access is exclusive.</p>
            </div>

            <div>
              <p className="font-semibold">How fast do leads come in?</p>
              <p className="text-gray-500 text-sm mt-1">Most contractors receive leads within 24–72 hours of activation.</p>
            </div>

            <div>
              <p className="font-semibold">Is this PPC or ads?</p>
              <p className="text-gray-500 text-sm mt-1">No. This is intent-based homeowner demand, not click traffic.</p>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-bold">
            Check if your territory is available
          </h2>

          <p className="mt-4 text-gray-600">
            Only a limited number of contractors are activated per region to maintain lead quality.
          </p>

          <div className="mt-10">
            <a
              href="/apply"
              className="bg-black text-white px-10 py-4 rounded-xl font-semibold text-lg"
            >
              Check Availability →
            </a>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            No commitment • Approval within 24 hours • Performance-based system
          </p>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center text-xs text-gray-400">
        RoofFlow Demand Engine © 2026
      </footer>

    </main>
  );
}
