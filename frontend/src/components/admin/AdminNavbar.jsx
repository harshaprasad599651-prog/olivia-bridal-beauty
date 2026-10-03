import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="text-left"
          >
            <h1 className="text-xl font-semibold text-slate-900">
              Olivia
            </h1>

            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
              Admin Panel
            </p>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">

            <button
              onClick={() => navigate("/admin/dashboard")}
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/adminCustomers")}
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              Customers
            </button>

            <button
              onClick={() => navigate("/admin/services")}
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              Services
            </button>

            <button
              onClick={() => navigate("/admin/packages")}
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              Packages
            </button>

            <button
              onClick={() => navigate("/admin/bookings")}
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              Bookings
            </button>

          </nav>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs uppercase tracking-[0.15em]
                       border border-slate-300
                       px-4 py-2.5
                       rounded-md
                       text-slate-700
                       hover:bg-slate-900
                       hover:text-white
                       hover:border-slate-900
                       transition"
          >
            Logout
          </button>

        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;