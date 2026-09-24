import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function Hero() {
  const slides = [
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero1.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* Background Images */}
      {slides.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url("${image}")` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Content */}
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#book"
              className="px-8 py-3 bg-slate-900 text-white text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition rounded-sm"
            >
              Book Appointment
            </a>

            <Link
              to ="/services"
              className="px-8 py-3 bg-white/90 text-slate-900 text-xs uppercase tracking-[0.2em] hover:bg-white transition rounded-sm"
            >
              Our Services
            </Link>
          </div>

        </div>
      </div>

     

      {/* Indicators */}
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
    </section>
  );
}

export default Hero;