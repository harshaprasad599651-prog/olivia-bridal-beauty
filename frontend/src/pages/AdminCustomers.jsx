import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Load customers
  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication required.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/admin/customers`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load customers.");
          return;
        }

        setCustomers(data);
      } catch (error) {
        console.error("Error loading customers:", error);
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.trim().toLowerCase();

    const name = customer.name?.toLowerCase() || "";
    const phone = customer.phone?.toLowerCase() || "";
    const email = customer.email?.toLowerCase() || "";

    const matchesSearch =
      search === "" ||
      name.includes(search) ||
      phone.includes(search) ||
      email.includes(search);

    let matchesDate = true;

    if (dateFilter) {
      if (!customer.createdAt) {
        matchesDate = false;
      } else {
        const customerDate = new Date(customer.createdAt)
          .toISOString()
          .slice(0, 10);

        matchesDate = customerDate === dateFilter;
      }
    }

    return matchesSearch && matchesDate;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setDateFilter("");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Olivia Bridal & Beauty
            </p>

            <h1 className="text-2xl font-serif text-slate-900 mt-1">
              Manage Customers
            </h1>
          </div>

          <Link
            to="/admin/dashboard"
            className="text-xs uppercase tracking-[0.2em]
                       text-slate-600
                       border border-slate-300
                       px-4 py-2.5
                       rounded-md
                       transition-all duration-300
                       hover:bg-slate-900
                       hover:text-white
                       hover:border-slate-900"
          >
            ← Dashboard
          </Link>

        </div>
      </header>


      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Page heading */}
        <div className="mb-8">

          <h2 className="text-3xl font-serif text-slate-900">
            Customers
          </h2>

          <p className="mt-2 text-slate-600">
            View and manage registered salon customers.
          </p>

        </div>


        {/* Search and Filter */}
        <div className="bg-white border border-slate-200 p-5 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Search */}
            <div className="md:col-span-2">

              <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                Search Customers
              </label>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, phone or email..."
                className="w-full border border-slate-300
                           px-4 py-3
                           rounded-md
                           text-sm text-slate-700
                           focus:outline-none
                           focus:ring-1
                           focus:ring-slate-900
                           focus:border-slate-900"
              />

            </div>


            {/* Date */}
            <div>

              <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                Registration Date
              </label>

              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full border border-slate-300
                           px-4 py-3
                           rounded-md
                           text-sm text-slate-700
                           focus:outline-none
                           focus:ring-1
                           focus:ring-slate-900
                           focus:border-slate-900"
              />

            </div>

          </div>


          {/* Filter information */}
          <div className="flex flex-wrap items-center justify-between mt-5 gap-3">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-800">
                {filteredCustomers.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-800">
                {customers.length}
              </span>{" "}
              customers
            </p>


            {/* Clear */}
            {(searchTerm || dateFilter) && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs uppercase tracking-[0.2em]
                           text-slate-600
                           border border-slate-300
                           px-4 py-2
                           rounded-md
                           hover:bg-slate-900
                           hover:text-white
                           hover:border-slate-900
                           transition-all duration-300"
              >
                Clear Filters
              </button>
            )}

          </div>

        </div>


        {/* Loading */}
        {loading && (
          <div className="bg-white border border-slate-200 p-8 text-center">

            <p className="text-slate-600">
              Loading customers...
            </p>

          </div>
        )}


        {/* Error */}
        {!loading && error && (
          <div className="bg-white border border-red-200 p-8 text-center">

            <p className="text-red-600">
              {error}
            </p>

          </div>
        )}


        {/* Customers */}
        {!loading && !error && (

          <div className="bg-white border border-slate-200 overflow-hidden">

            {/* ================= DESKTOP ================= */}
            <div className="hidden md:block overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50 border-b border-slate-200">

                  <tr>

                    <th className="text-left px-6 py-4
                                   text-xs uppercase
                                   tracking-[0.2em]
                                   text-slate-500
                                   font-medium">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4
                                   text-xs uppercase
                                   tracking-[0.2em]
                                   text-slate-500
                                   font-medium">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4
                                   text-xs uppercase
                                   tracking-[0.2em]
                                   text-slate-500
                                   font-medium">
                      Email
                    </th>

                    <th className="text-left px-6 py-4
                                   text-xs uppercase
                                   tracking-[0.2em]
                                   text-slate-500
                                   font-medium">
                      Registered
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredCustomers.length === 0 ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="px-6 py-12 text-center"
                      >

                        <p className="text-slate-500">
                          No customers found.
                        </p>

                        {(searchTerm || dateFilter) && (
                          <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-3 text-xs uppercase
                                       tracking-[0.2em]
                                       text-slate-700
                                       underline"
                          >
                            Clear filters
                          </button>
                        )}

                      </td>

                    </tr>

                  ) : (

                    filteredCustomers.map((customer) => (

                      <tr
                        key={customer._id}
                        className="border-b border-slate-100
                                   hover:bg-slate-50
                                   transition"
                      >

                        <td className="px-6 py-5">

                          <p className="font-medium text-slate-900">
                            {customer.name}
                          </p>

                        </td>


                        <td className="px-6 py-5 text-slate-600">
                          {customer.phone}
                        </td>


                        <td className="px-6 py-5 text-slate-600">
                          {customer.email || "—"}
                        </td>


                        <td className="px-6 py-5 text-slate-600">

                          {customer.createdAt
                            ? new Date(
                                customer.createdAt
                              ).toLocaleDateString()
                            : "—"}

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>


            {/* ================= MOBILE ================= */}
            <div className="md:hidden">

              {filteredCustomers.length === 0 ? (

                <div className="p-8 text-center">

                  <p className="text-slate-500">
                    No customers found.
                  </p>

                  {(searchTerm || dateFilter) && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-3 text-xs uppercase
                                 tracking-[0.2em]
                                 text-slate-700
                                 underline"
                    >
                      Clear filters
                    </button>
                  )}

                </div>

              ) : (

                filteredCustomers.map((customer) => (

                  <div
                    key={customer._id}
                    className="p-5 border-b border-slate-200"
                  >

                    <h3 className="text-lg font-serif text-slate-900">
                      {customer.name}
                    </h3>


                    <div className="mt-4 space-y-2 text-sm">

                      <p className="text-slate-600">

                        <span className="font-medium text-slate-800">
                          Phone:
                        </span>{" "}

                        {customer.phone}

                      </p>


                      <p className="text-slate-600 break-all">

                        <span className="font-medium text-slate-800">
                          Email:
                        </span>{" "}

                        {customer.email || "—"}

                      </p>


                      <p className="text-slate-600">

                        <span className="font-medium text-slate-800">
                          Registered:
                        </span>{" "}

                        {customer.createdAt
                          ? new Date(
                              customer.createdAt
                            ).toLocaleDateString()
                          : "—"}

                      </p>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default AdminCustomers;