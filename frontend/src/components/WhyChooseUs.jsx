import React from 'react';

function WhyChooseUs() {
  const points = [
    { title: "Experienced", icon: "✧" },
    { title: "Quality", icon: "✦" },
    { title: "Premium", icon: "✧" },
    { title: "Personalized", icon: "✦" }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-serif font-light text-slate-800 tracking-wide mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {points.map((point, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-3">
              <span className="text-2xl text-slate-300">{point.icon}</span>
              <span className="text-sm font-sans uppercase tracking-[0.2em] text-slate-600">{point.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;