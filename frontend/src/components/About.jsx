import React from 'react';

function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80" 
            alt="About Olivia Salon" 
            className="w-full h-auto object-cover rounded-sm shadow-2xl shadow-slate-200/50"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-slate-400 mb-4">About Olivia</span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-slate-900 tracking-wide mb-6">Our Story</h2>
          <p className="text-slate-500 font-light leading-relaxed mb-8">
            Founded on the belief that every bride deserves to feel unconditionally beautiful, Olivia Salon merges high-end couture techniques with personalized care. Our studio is a sanctuary of calm, designed to prepare you for the most memorable moments of your life with pure elegance and refined grace.
          </p>
          <a href="#about" className="inline-block border-b border-slate-300 pb-1 text-xs uppercase tracking-[0.2em] text-slate-700 hover:text-slate-900 hover:border-slate-900 transition-colors">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;