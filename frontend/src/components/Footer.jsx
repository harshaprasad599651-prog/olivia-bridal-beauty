import React from 'react';

function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-serif tracking-[0.15em] font-light text-slate-800 uppercase">Olivia</h2>
          <p className="text-[8px] tracking-[0.45em] font-light text-slate-400 uppercase mt-1">Bridal & Beauty</p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-xs uppercase tracking-[0.1em] text-slate-400 hover:text-slate-900">Instagram</a>
          <a href="#" className="text-xs uppercase tracking-[0.1em] text-slate-400 hover:text-slate-900">Pinterest</a>
          <a href="#" className="text-xs uppercase tracking-[0.1em] text-slate-400 hover:text-slate-900">Contact</a>
        </div>
        
        <div className="text-xs text-slate-400 font-light tracking-wide">
          © {new Date().getFullYear()} Olivia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;