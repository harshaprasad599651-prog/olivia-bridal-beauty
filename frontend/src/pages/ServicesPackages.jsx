import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

function ServicesPackages() {
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesResponse, packagesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/services`),
          fetch(`${API_BASE_URL}/packages`),
        ]);

        if (!servicesResponse.ok || !packagesResponse.ok) {
          throw new Error("Failed to load services or packages");
        }

        const servicesData = await servicesResponse.json();
        const packagesData = await packagesResponse.json();

        setServices(
          Array.isArray(servicesData) ? servicesData : []
        );

        setPackages(
          Array.isArray(packagesData) ? packagesData : []
        );
      } catch (error) {
        console.error("Error loading services and packages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* =========================
          PAGE HEADER
      ========================== */}
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


      {/* =========================
          SERVICES
      ========================== */}
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


          {/* Loading */}
          {loading && (
            <div className="text-center py-16">
              <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">
                Loading our services...
              </p>
            </div>
          )}


          {/* No Services */}
          {!loading && services.length === 0 && (
            <div className="text-center py-16 border border-slate-200">
              <p className="text-slate-500">
                No services are currently available.
              </p>
            </div>
          )}


          {/* Service Cards */}
          {!loading && services.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {services.map((service) => (
                <div
                  key={service._id}
                  className="group border border-slate-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-500"
                >

                  {/* Image */}
                  <div className="h-64 bg-slate-100 overflow-hidden">

                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          Olivia Bridal & Beauty
                        </span>
                      </div>
                    )}

                  </div>


                  {/* Service Details */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-2">
                          {service.category}
                        </p>

                        <h3 className="text-xl font-serif text-slate-900">
                          {service.name}
                        </h3>
                      </div>

                    </div>


                    <p className="mt-3 text-sm text-slate-600 leading-6">
                      {service.description}
                    </p>


                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                          Price
                        </p>

                        <p className="text-lg font-serif text-slate-900 mt-1">
                          Rs. {Number(service.price).toLocaleString()}
                        </p>
                      </div>


                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                          Duration
                        </p>

                        <p className="text-sm text-slate-700 mt-1">
                          {service.duration} min
                        </p>
                      </div>

                    </div>


                    <Link
                      to="/booking"
                      className="block text-center mt-6 w-full py-3 border border-slate-300 text-slate-700 text-xs uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300"
                    >
                      Book Service
                    </Link>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </section>


      {/* =========================
          BRIDAL PACKAGES
      ========================== */}
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


          {/* No Packages */}
          {!loading && packages.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200">
              <p className="text-slate-500">
                No packages are currently available.
              </p>
            </div>
          )}


          {/* Package Cards */}
          {!loading && packages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {packages.map((pkg, index) => (

                <div
                  key={pkg._id}
                  className={`relative overflow-hidden ${
                    index === 1
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-900 border border-slate-200"
                  }`}
                >

                  {/* Package Image */}
                  {pkg.image && (
                    <div className="h-56 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}


                  <div className="p-8">

                    {/* Package Label */}
                    <p
                      className={`text-xs uppercase tracking-[0.25em] ${
                        index === 1
                          ? "text-slate-300"
                          : "text-slate-500"
                      }`}
                    >
                      {index === 1 ? "Featured Package" : "Bridal Package"}
                    </p>


                    {/* Package Name */}
                    <h3
                      className={`text-2xl font-serif mt-3 ${
                        index === 1
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      {pkg.name}
                    </h3>


                    {/* Description */}
                    <p
                      className={`mt-4 text-sm leading-6 ${
                        index === 1
                          ? "text-slate-300"
                          : "text-slate-600"
                      }`}
                    >
                      {pkg.description}
                    </p>


                    {/* Price */}
                    <p
                      className={`text-2xl mt-6 ${
                        index === 1
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      Rs. {Number(pkg.price).toLocaleString()}
                    </p>


                    {/* Duration */}
                    <p
                      className={`text-xs uppercase tracking-[0.15em] mt-2 ${
                        index === 1
                          ? "text-slate-400"
                          : "text-slate-500"
                      }`}
                    >
                      Duration: {pkg.duration}
                    </p>


                    <div
                      className={`border-t my-6 ${
                        index === 1
                          ? "border-white/20"
                          : "border-slate-200"
                      }`}
                    ></div>


                    {/* Package Content */}
                    <ul className="space-y-3">

                      {pkg.content?.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className={`flex items-start gap-3 text-sm ${
                            index === 1
                              ? "text-slate-300"
                              : "text-slate-600"
                          }`}
                        >

                          <span
                            className={
                              index === 1
                                ? "text-white"
                                : "text-slate-900"
                            }
                          >
                            ✓
                          </span>

                          <span>
                            {item}
                          </span>

                        </li>
                      ))}

                    </ul>


                    {/* Book Button */}
                    <Link
                      to="/booking"
                      className={`block w-full mt-8 py-3 text-center text-xs uppercase tracking-[0.2em] transition ${
                        index === 1
                          ? "bg-white text-slate-900 hover:bg-slate-100"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      Book Package
                    </Link>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </section>

    </div>
  );
}

export default ServicesPackages;