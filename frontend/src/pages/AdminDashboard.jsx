import React,{useEffect,useState} from "react";
import {API_BASE_URL} from "../config";
import { Link } from "react-router-dom";







function AdminDashboard() {

  const [stats, setStats] = useState({
  customers: 0,
  services: 0,
  packages: 0,
  bookings: 0,
  pendingBookings: 0,
  });

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setStats(data);
    })
    .catch((error) => {
      console.error("Error loading dashboard statistics:", error);
    });
  } , []);





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
              Admin Dashboard
            </h1>
          </div>

          <button className="text-xs uppercase tracking-[0.2em] text-slate-600">
            Logout
          </button>

        </div>
      </header>


      {/* Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-3xl font-serif text-slate-900">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-600">
          Manage your salon services, packages and bookings.
        </p>


        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white border border-slate-200 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Services
            </p>

            <h3 className="text-3xl font-serif mt-3">
              {stats.services}
            </h3>

            <Link to="/admin/services">

             <button
            className="mt-5 inline-flex items-center gap-2
             text-xs uppercase tracking-[0.2em]
             text-slate-300
             border border-slate-900
             bg-slate-900
             px-4 py-2.5
             rounded-md
             transition-all duration-300
             hover:bg-slate-300
             hover:text-slate-900
             hover:border-slate-300"
            >
              Manage Services
              <span className="text-sm"></span>
            </button>
            </Link>
          </div>


          <div className="bg-white border border-slate-200 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Packages
            </p>

            <h3 className="text-3xl font-serif mt-3">
              {stats.packages}
            </h3>

            <Link to ="/admin/packages">

             <button
            className="mt-5 inline-flex items-center gap-2
             text-xs uppercase tracking-[0.2em]
             text-slate-300
             border border-slate-900
             bg-slate-900
             px-4 py-2.5
             rounded-md
             transition-all duration-300
             hover:bg-slate-300
             hover:text-slate-900
             hover:border-slate-300"
            >
              Manage Packages
              <span className="text-sm"></span>
            </button>
            </Link>
          </div>


          <div className="bg-white border border-slate-200 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Bookings
            </p>

            <h3 className="text-3xl font-serif mt-3">
              {stats.bookings}
            </h3>

            

            <button
            className="mt-5 inline-flex items-center gap-2
             text-xs uppercase tracking-[0.2em]
             text-slate-300
             border border-slate-900
             bg-slate-900
             px-4 py-2.5
             rounded-md
             transition-all duration-300
             hover:bg-slate-300
             hover:text-slate-900
             hover:border-slate-300"
            >
              Manage Bookings
              <span className="text-sm"></span>
            </button>
          </div>

           <div className="bg-white border border-slate-200 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              customers
            </p>

            <h3 className="text-3xl font-serif mt-3">
              {stats.customers}
            </h3>

            <Link to ="/adminCustomers">

            <button
            className="mt-5 inline-flex items-center gap-2
                text-xs uppercase tracking-[0.2em]
                text-slate-300
                border border-slate-900
                bg-slate-900
                px-4 py-2.5
                rounded-md
                transition-all duration-300
                hover:bg-slate-300
                hover:text-slate-900
                hover:border-slate-300"
                type="button"
            >
              Manage Customers
            </button>
            </Link>
          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;