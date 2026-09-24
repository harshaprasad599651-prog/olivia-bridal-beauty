import React from "react";

function AdminDashboard() {
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
              0
            </h3>

            <button className="mt-5 text-xs uppercase tracking-[0.2em]">
              Manage Services →
            </button>
          </div>


          <div className="bg-white border border-slate-200 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Packages
            </p>

            <h3 className="text-3xl font-serif mt-3">
              0
            </h3>

            <button className="mt-5 text-xs uppercase tracking-[0.2em]">
              Manage Packages →
            </button>
          </div>


          <div className="bg-white border border-slate-200 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Bookings
            </p>

            <h3 className="text-3xl font-serif mt-3">
              0
            </h3>

            <button className="mt-5 text-xs uppercase tracking-[0.2em]">
              Manage Bookings →
            </button>
          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;