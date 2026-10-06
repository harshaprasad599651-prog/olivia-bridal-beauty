import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  // Check whether customer is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("customerToken")
  );

  // =========================
  // AUTHENTICATION STATUS
  // =========================
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("customerToken"));
    };

    // For changes from another browser tab
    window.addEventListener("storage", checkLogin);

    // For login/logout changes in the current tab
    window.addEventListener("authChanged", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("authChanged", checkLogin);
    };
  }, []);

  // =========================
  // SCROLL EFFECT
  // =========================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================
  // BOOKING BUTTON
  // =========================
  const handleBookingClick = () => {
    const token = localStorage.getItem("customerToken");

    if (token) {
      navigate("/booking");
    } else {
      navigate("/login");
    }

    setIsOpen(false);
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customer");

    setIsLoggedIn(false);
    setIsOpen(false);

    // Tell other components that authentication changed
    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
  };

  // =========================
  // NAVIGATION LINKS
  // =========================
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/#about",
    },
    {
      name: "Gallery",
      href: "/#gallery",
    },
    {
      name: "Contact",
      href: "/#contact",
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-serif tracking-wide selection:bg-rose-100 selection:text-slate-900 transition-all duration-300">

      {/* =====================================================
          TOP UTILITY BAR
      ====================================================== */}
      <div className="bg-slate-900 text-slate-300 text-[10px] uppercase tracking-[0.25em] py-2.5 px-6 sm:px-8 border-b border-slate-800">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Phone Contact */}
          <div className="flex items-center space-x-6">

            <a
              href="tel:+1234567890"
              className="flex items-center space-x-2 text-slate-300 hover:text-amber-200 transition-colors duration-300 font-sans"
            >
              <svg
                className="w-3 h-3 fill-current text-amber-200/80"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>

              <span className="font-light tracking-widest">
                +1 (234) 567-890
              </span>
            </a>

            <span className="hidden md:inline text-slate-700">
              •
            </span>

            <span className="hidden md:inline font-sans text-[9px] tracking-[0.3em] text-slate-400 uppercase">
              Haute Couture Bridal & Beauty
            </span>

          </div>

          {/* Status Tagline */}
          <div className="flex items-center space-x-4">

            <span className="text-[9px] text-amber-200/90 font-sans tracking-[0.3em] uppercase font-light">
              By Appointment Only
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN NAVIGATION BAR
      ====================================================== */}
      <nav
        className={`w-full bg-white/90 backdrop-blur-md border-b border-stone-200/60 transition-all duration-500 ${
          scrolled
            ? "py-3.5 shadow-md shadow-stone-900/5"
            : "py-5"
        }`}
      >

        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">

          {/* =================================================
              LOGO
          ================================================== */}
          <Link
            to="/"
            className="flex flex-col group focus:outline-none"
          >

            <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.2em] font-normal text-slate-900 group-hover:text-amber-900 transition-colors duration-500 uppercase">
              Olivia
            </h1>

            <p className="text-[8px] tracking-[0.5em] font-sans font-light text-stone-400 uppercase -mt-0.5">
              Bridal & Beauty
            </p>

          </Link>


          {/* =================================================
              DESKTOP NAVIGATION LINKS
          ================================================== */}
          <div className="hidden lg:flex items-center space-x-8">

            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>

                <Link
                  to={link.href}
                  className="font-sans text-[11px] uppercase tracking-[0.25em] text-slate-600 hover:text-slate-900 transition-all duration-300 relative py-1 group"
                >
                  {link.name}

                  <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-slate-900 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                </Link>

                {index < navLinks.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                )}

              </React.Fragment>
            ))}

          </div>


          {/* =================================================
              DESKTOP RIGHT ACTION AREA
          ================================================== */}
          <div className="hidden md:flex items-center space-x-6">

            {/* LOGIN / LOGOUT */}
            {!isLoggedIn ? (

              <Link
                to="/login"
                className="font-sans text-[11px] uppercase tracking-[0.25em] text-slate-600 hover:text-slate-900 transition-colors duration-300 relative py-1 group"
              >
                Login

                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-slate-900 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>

            ) : (

              <button
                onClick={handleLogout}
                className="font-sans text-[11px] uppercase tracking-[0.25em] text-stone-500 hover:text-rose-900 transition-colors duration-300"
              >
                Logout
              </button>

            )}


            {/* RESERVE DATE */}
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center justify-center text-[10px] font-sans uppercase tracking-[0.25em] font-medium rounded-full bg-slate-900 border border-slate-900 text-stone-100 hover:bg-stone-800 hover:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2.5 hover:-translate-y-[1px]"
            >
              Reserve Date
            </button>

          </div>


          {/* =================================================
              MOBILE MENU TOGGLE
          ================================================== */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-900 focus:outline-none p-2"
            aria-label="Toggle Menu"
          >

            {isOpen ? (

              <span className="text-2xl font-light text-slate-900">
                ✕
              </span>

            ) : (

              <div className="space-y-1.5 w-6">

                <span className="block w-full h-[1px] bg-slate-900"></span>

                <span className="block w-2/3 h-[1px] bg-slate-900 ml-auto"></span>

                <span className="block w-full h-[1px] bg-slate-900"></span>

              </div>

            )}

          </button>

        </div>


        {/* =====================================================
            MOBILE MENU DRAWER
        ====================================================== */}
        {isOpen && (

          <div className="md:hidden bg-white/98 backdrop-blur-2xl border-t border-stone-100 px-8 py-8 space-y-6 shadow-xl">

            {/* Navigation Links */}
            <div className="space-y-4">

              {navLinks.map((link) => (

                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block font-sans text-xs uppercase tracking-[0.3em] font-light text-slate-700 hover:text-slate-900 transition-colors py-1"
                >
                  {link.name}
                </Link>

              ))}

            </div>


            {/* Login / Logout + Booking */}
            <div className="pt-6 border-t border-stone-100 space-y-4">

              {/* LOGIN */}
              {!isLoggedIn ? (

                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center font-sans text-xs uppercase tracking-[0.25em] text-slate-700 hover:text-slate-900 py-2"
                >
                  Login
                </Link>

              ) : (

                /* LOGOUT */
                <button
                  onClick={handleLogout}
                  className="w-full text-center font-sans text-xs uppercase tracking-[0.25em] text-rose-800 py-2"
                >
                  Logout
                </button>

              )}


              {/* RESERVE DATE */}
              <button
                onClick={handleBookingClick}
                className="w-full block text-center font-sans bg-slate-900 text-stone-100 text-xs uppercase tracking-[0.25em] font-medium py-3.5 rounded-full shadow-md hover:bg-stone-800 transition-colors"
              >
                Reserve Date
              </button>

            </div>

          </div>

        )}

      </nav>

    </header>
  );
}

export default Navbar;