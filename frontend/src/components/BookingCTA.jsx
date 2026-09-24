import React from 'react';

function BookingCTA() {
  return (
    <section id="book" className="py-32 bg-slate-900 text-center px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-wide mb-8">
          Ready for Your Day?
        </h2>
        <p className="text-slate-400 font-light mb-12 max-w-md mx-auto">
          Secure your date with our elite styling team and let us bring your bridal vision to life.
        </p>
        <button className="px-10 py-4 bg-white text-slate-900 font-sans text-xs uppercase tracking-[0.25em] hover:bg-slate-100 transition-colors rounded-sm shadow-lg shadow-white/10">
          Book Now
        </button>
      </div>
    </section>
  );
}

export default BookingCTA;