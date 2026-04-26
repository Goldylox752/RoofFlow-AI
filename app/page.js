export default function Home() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Roofing Leads That Turn Into Booked Jobs — Not Clicks
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          RoofFlow delivers high-intent homeowners actively requesting roofing estimates in your service area. No cold traffic. No shared leads. Just real demand.
        </p>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <a
            href="/apply"
            className="bg-black text-white px-6 py-3 rounded-lg font-medium"
          >
            Apply for Access
          </a>

          <a
            href="#how-it-works"
            className="border border-gray-300 px-6 py-3 rounded-lg font-medium"
          >
            See System
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Exclusive territories only. Limited contractor access per region.
        </p>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-gray-50 py-10 px-6 text-center text-gray-600">
        <p className="max-w-3xl mx-auto">
          Built for roofing contractors across Canada & the U.S. focused on verified homeowner intent — not paid ads or recycled lead lists.
        </p>
      </section>

      {/* VALUE LOGIC */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center">
          Why RoofFlow Converts Better Than Traditional Leads
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold mb-2">Intent-Based Demand</h3>
            <p className="text-gray-600">
              Every lead comes from homeowners actively requesting roofing estimates.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold mb-2">No Shared Leads</h3>
            <p className="text-gray-600">
              You are not competing with multiple contractors for the same homeowner.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold mb-2">Appointment Focused</h3>
            <p className="text-gray-600">
              We optimize for booked inspections, not raw lead lists.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            How RoofFlow Works
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            <div className="p-6 bg-white border rounded-xl">
              <h3 className="font-semibold mb-2">1. Capture Demand</h3>
              <p className="text-gray-600">
                Homeowners in your area request roofing estimates through our system.
              </p>
            </div>

            <div className="p-6 bg-white border rounded-xl">
              <h3 className="font-semibold mb-2">2. Qualify Leads</h3>
              <p className="text-gray-600">
                Each request is filtered by intent, urgency, and location.
              </p>
            </div>

            <div className="p-6 bg-white border rounded-xl">
              <h3 className="font-semibold mb-2">3. You Close Jobs</h3>
              <p className="text-gray-600">
                Receive ready-to-book appointments, not unqualified inquiries.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="bg-gray-900 text-white py-20 px-6">
        <h2 className="text-3xl font-bold text-center">
          The Old Way vs RoofFlow
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="font-semibold mb-2">Google Ads</h3>
            <p className="text-gray-300">
              You pay for clicks with no guarantee of intent.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="font-semibold mb-2">Lead Brokers</h3>
            <p className="text-gray-300">
              Same lead sold to multiple contractors.
            </p>
          </div>

          <div className="p-6 bg-green-600 rounded-xl">
            <h3 className="font-semibold mb-2">RoofFlow</h3>
            <p>
              Exclusive homeowner requests with verified intent.
            </p>
          </div>

        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center">
          Contractor Results
        </h2>

        <div className="mt-10 grid md:grid-cols-2 gap-6">

          <div className="p-6 border rounded-xl">
            <p className="text-gray-700">
              “We stopped chasing junk leads. Every inquiry now has real buying intent.”
            </p>
            <span className="text-sm text-gray-500 mt-3 block">
              — Roofing Contractor, Alberta
            </span>
          </div>

          <div className="p-6 border rounded-xl">
            <p className="text-gray-700">
              “Booked inspections within the first week of joining.”
            </p>
            <span className="text-sm text-gray-500 mt-3 block">
              — Roofing Business Owner
            </span>
          </div>

        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold">
          Active Service Areas
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-blue-600">
          <a href="/roofing-leads/edmonton">Edmonton</a>
          <a href="/roofing-leads/calgary">Calgary</a>
          <a href="/roofing-leads/leduc">Leduc</a>
          <a href="/roofing-leads/red-deer">Red Deer</a>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center">
          Simple Monthly Access
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold">Starter</h3>
            <p className="text-gray-600">$499 / month</p>
          </div>

          <div className="p-6 border-2 border-black rounded-xl">
            <h3 className="font-semibold">Growth</h3>
            <p className="text-gray-600">$999 / month</p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold">Domination</h3>
            <p className="text-gray-600">$1,999 / month</p>
          </div>

        </div>

        <div className="text-center mt-10">
          <a
            href="/apply"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Apply for Access
          </a>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-24 px-6">
        <h2 className="text-3xl font-bold">
          Ready to stop chasing leads?
        </h2>

        <a
          href="/apply"
          className="mt-6 inline-block bg-black text-white px-8 py-3 rounded-lg"
        >
          Get Exclusive Roofing Leads
        </a>

        <p className="text-xs text-gray-500 mt-4">
          Start receiving booked roofing opportunities in your area.
        </p>
      </section>

    </main>
  );
}
