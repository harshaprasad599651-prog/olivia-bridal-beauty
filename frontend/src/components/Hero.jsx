import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const slides = [
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero1.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  // =========================
  // AUTO SLIDER
  // =========================
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // NEXT SLIDE
  // =========================
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // =========================
  // PREVIOUS SLIDE
  // =========================
  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  // =========================
  // BOOKING BUTTON
  // =========================
  const handleBookingClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/booking");
    } else {
      setShowLoginMessage(true);
    }
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const closeLoginMessage = () => {
    setShowLoginMessage(false);
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden"
    >

      {/* =====================================================
          BACKGROUND SLIDES
      ====================================================== */}
      {slides.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{
            backgroundImage: `url("${image}")`,
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}


      {/* =====================================================
          HERO CONTENT
      ====================================================== */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-5">

        <div className="max-w-4xl">

          <p className="text-xs uppercase tracking-[0.4em] text-white mb-6">
            Welcome to Olivia
          </p>

          <h1 className="text-4xl md:text-7xl font-serif font-light text-white mb-6">
            Elegance Begins Here
          </h1>

          <p className="text-base md:text-xl text-white italic mb-10 max-w-2xl mx-auto">
            Your beauty, our passion. Experience bespoke bridal styling
            tailored to your unique radiance.
          </p>


          {/* =================================================
              HERO BUTTONS
          ================================================== */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            {/* Book Appointment */}
            <button
              onClick={handleBookingClick}
              className="px-8 py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition rounded-sm"
            >
              Book Appointment
            </button>


            {/* Our Services */}
            <Link
              to="/services"
              className="px-8 py-3 bg-white/90 text-slate-900 text-xs uppercase tracking-[0.2em] hover:bg-white transition rounded-sm"
            >
              Our Services
            </Link>

          </div>

        </div>

      </div>


      {/* =====================================================
          SLIDER INDICATORS
      ====================================================== */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50"
            }`}
          ></button>
        ))}

      </div>


      {/* =====================================================
          LOGIN / REGISTER MODAL
      ====================================================== */}
      {showLoginMessage && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

          {/* =================================================
              BLURRED BACKGROUND
          ================================================== */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            onClick={closeLoginMessage}
          ></div>


          {/* =================================================
              MODAL BOX
          ================================================== */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">

            {/* Close Button */}
            <button
              onClick={closeLoginMessage}
              className="absolute top-4 right-5 text-slate-400 hover:text-slate-900 text-xl transition"
              aria-label="Close"
            >
              ✕
            </button>


            {/* Icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-5">

              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg">
                !
              </div>

            </div>


            {/* Brand */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
              Olivia Bridal & Beauty
            </p>


            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mt-3">
              Login Required
            </h2>


            {/* Message */}
            <p className="text-sm text-slate-600 leading-6 mt-4">
              Please login or create an account before making an appointment
              with Olivia Bridal & Beauty.
            </p>


            {/* Login / Register Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-7">

              {/* Login */}
              <Link
                to="/login"
                onClick={closeLoginMessage}
                className="py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.2em] rounded-md hover:bg-slate-800 transition"
              >
                Login
              </Link>


              {/* Register */}
              <Link
                to="/register"
                onClick={closeLoginMessage}
                className="py-3 border border-slate-300 text-slate-700 text-xs uppercase tracking-[0.2em] rounded-md hover:bg-slate-100 transition"
              >
                Register
              </Link>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default Hero;