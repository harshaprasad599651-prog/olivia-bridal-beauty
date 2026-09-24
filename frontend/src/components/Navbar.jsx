import React, { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-serif tracking-wide selection:bg-slate-100 selection:text-slate-900">
      
      {/* 1. Top Utility Bar — Crisp White Translucent Finish */}
      <div className="bg-white/90 backdrop-blur-md text-slate-500 text-[10px] uppercase tracking-[0.25em] py-2 px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Contact Details */}
          <div className="flex items-center space-x-6">
            <a
              href="tel:+1234567890"
              className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-colors duration-300"
            >
              <svg className="w-3 h-3 fill-current text-slate-400" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span className="font-light">+1 (234) 567-890</span>
            </a>
            <span className="hidden md:inline text-gray-200">•</span>
            <span className="hidden md:inline font-extralight tracking-[0.3em] text-slate-400">
              Haute Couture Bridal & Beauty
            </span>
          </div>

          {/* Social / Tagline */}
          <div className="flex items-center space-x-4">
            <span className="text-[9px] text-slate-500 font-medium tracking-[0.3em]">
              BY APPOINTMENT ONLY
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Translucent Navigation Bar */}
      <nav
        className={`w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-500 ${
          scrolled ? "py-3 shadow-lg shadow-gray-200/40" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          
          {/* Brand Logo with Soft Charcoal Gradient */}
          <a href="#" className="flex flex-col group">
            <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.15em] font-light bg-gradient-to-r from-slate-800 via-slate-600 to-slate-900 bg-clip-text text-transparent group-hover:from-slate-600 group-hover:to-slate-900 transition-all duration-500 uppercase">
              Olivia
            </h1>
            <p className="text-[8px] tracking-[0.45em] font-light text-slate-400 uppercase -mt-0.5">
              Bridal & Beauty
            </p>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <a
                  href={link.href}
                  className="font-sans text-[11px] uppercase tracking-[0.25em] text-slate-500 hover:text-slate-900 transition-all duration-300 relative py-1 group"
                >
                  {link.name}
                  {/* Subtle Expanding Slate Line under links */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-slate-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                </a>
                {/* Minimal Accent Dot between items */}
                {index < navLinks.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Minimalist Chic CTA Button */}
          <div className="hidden md:block">
            <a
              href="#book"
              className="inline-flex items-center justify-center text-[10px] font-sans uppercase tracking-[0.25em] font-semibold rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-500 px-7 py-2.5 hover:-translate-y-[1px]"
            >
              Reserve Date
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-800 focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <span className="text-xl font-light">✕</span>
            ) : (
              <div className="space-y-1.5 w-6">
                <span className="block w-full h-[1px] bg-slate-800"></span>
                <span className="block w-2/3 h-[1px] bg-slate-800 ml-auto"></span>
                <span className="block w-full h-[1px] bg-slate-800"></span>
              </div>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-gray-100 px-8 py-8 space-y-5 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block font-sans text-xs uppercase tracking-[0.3em] font-light text-slate-500 hover:text-slate-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <a
                href="#book"
                onClick={() => setIsOpen(false)}
                className="block text-center font-sans bg-slate-900 text-white text-xs uppercase tracking-[0.25em] font-medium py-3.5 rounded-full shadow-lg shadow-slate-200 hover:bg-slate-800 transition-colors"
              >
                Reserve Date
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;