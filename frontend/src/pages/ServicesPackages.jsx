import React from "react";

function ServicesPackages() {
  return (
    <div className="min-h-screen bg-white">

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-4">
          Olivia Bridal & Beauty
        </p>

        <h1 className="text-4xl md:text-6xl font-serif font-light text-slate-900">
          Services & Packages
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-slate-600 font-serif italic">
          Discover our carefully designed beauty services and bridal
          packages created to make your special moments unforgettable.
        </p>
      </section>


      {/* Services */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">

        <div className="max-w-7xl mx-auto">

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              What We Offer
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-light text-slate-900 mt-2">
              Our Services
            </h2>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Service 1 */}
            <div className="group border border-slate-200 bg-white overflow-hidden">
              <div className="h-64 bg-slate-100">
                {/* Service image will go here */}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif text-slate-900">
                  Facials
                </h3>

                <p className="mt-3 text-sm text-slate-600">
                  ..................................
                </p>

                <button className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-900">
                  View Details
                </button>
              </div>
            </div>


            {/* Service 2 */}
            <div className="group border border-slate-200 bg-white overflow-hidden">
              <div className="h-64 bg-slate-100">
                {/* Service image will go here */}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif text-slate-900">
                  Body Scrub & Polish
                </h3>

                <p className="mt-3 text-sm text-slate-600">
                  ....................................
                </p>

                <button className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-900">
                  View Details
                </button>
              </div>
            </div>


            {/* Service 3 */}
            <div className="group border border-slate-200 bg-white overflow-hidden">
              <div className="h-64 bg-slate-100">
                {/* Service image will go here */}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif text-slate-900">
                  Waxing
                </h3>

                <p className="mt-3 text-sm text-slate-600">
                  .................................
                </p>

                <button className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-900">
                  View Details
                </button>
              </div>
              

            </div>

            {/* Service 3 */}
            <div className="group border border-slate-200 bg-white overflow-hidden">
              <div className="h-64 bg-slate-100">
                {/* Service image will go here */}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif text-slate-900">
                  Waxing
                </h3>

                <p className="mt-3 text-sm text-slate-600">
                  .................................
                </p>

                <button className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-900">
                  View Details
                </button>
              </div>
              

            </div>




          </div>
        </div>
      </section>


      {/* Packages */}
      <section className="bg-slate-50 px-6 md:px-12 lg:px-20 py-20">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              For Your Special Day
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-light text-slate-900 mt-2">
              Bridal Packages
            </h2>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Package 1 */}
            <div className="bg-white border border-slate-200 p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Classic
              </p>

              <h3 className="text-2xl font-serif text-slate-900 mt-3">
                Classic Bridal
              </h3>

              <p className="text-2xl mt-6 text-slate-900">
                Rs. 35,000
              </p>

              <div className="border-t border-slate-200 my-6"></div>

              <ul className="space-y-3 text-sm text-slate-600">
                <li>✓ Bridal Makeup</li>
                <li>✓ Hairstyling</li>
                <li>✓ Dressing</li>
                <li>✓ Basic Accessories</li>
              </ul>

              <button className="w-full mt-8 py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition">
                Book Package
              </button>
            </div>


            {/* Package 2 */}
            <div className="bg-slate-900 text-white p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">
                Premium
              </p>

              <h3 className="text-2xl font-serif mt-3">
                Premium Bridal
              </h3>

              <p className="text-2xl mt-6">
                Rs. 50,000
              </p>

              <div className="border-t border-white/20 my-6"></div>

              <ul className="space-y-3 text-sm text-slate-300">
                <li>✓ Bridal Makeup</li>
                <li>✓ Hairstyling</li>
                <li>✓ Dressing</li>
                <li>✓ Trial Makeup</li>
                <li>✓ Premium Accessories</li>
              </ul>

              <button className="w-full mt-8 py-3 bg-white text-slate-900 text-xs uppercase tracking-[0.2em] hover:bg-slate-100 transition">
                Book Package
              </button>
            </div>


            {/* Package 3 */}
            <div className="bg-white border border-slate-200 p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Luxury
              </p>

              <h3 className="text-2xl font-serif text-slate-900 mt-3">
                Luxury Bridal
              </h3>

              <p className="text-2xl mt-6 text-slate-900">
                Rs. 75,000
              </p>

              <div className="border-t border-slate-200 my-6"></div>

              <ul className="space-y-3 text-sm text-slate-600">
                <li>✓ Complete Bridal Makeup</li>
                <li>✓ Hairstyling</li>
                <li>✓ Dressing</li>
                <li>✓ Trial Session</li>
                <li>✓ Premium Accessories</li>
                <li>✓ Pre-Bridal Beauty Care</li>
              </ul>

              <button className="w-full mt-8 py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition">
                Book Package
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default ServicesPackages;