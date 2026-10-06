"use client";

import { useEffect, useState } from "react";
import { ContactForm } from "../contact-form";
import { ContactMap } from "../contact-map";

// ----------------------------------------------------------------------

export function ContactView() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function updateLiveStatus() {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();

      let openStatus = false;

      if (day >= 0 && day <= 5) { // Sun - Fri
        if (hour >= 10 && hour < 20) openStatus = true;
      } else if (day === 6) { // Sat
        if (hour >= 11 && hour < 18) openStatus = true;
      }

      setIsOpen(openStatus);
    }

    updateLiveStatus();
    const interval = setInterval(updateLiveStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <div className="container mx-auto px-4 lg:px-5 pt-8 pb-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase  mb-2">Connect with Performance</h1>
          <p className="text-base md:text-lg text-secondary max-w-2xl">We move fast, and so does our support. Reach out for gear advice, order status, or local retail inquiries.</p>
        </header>

        {/* Action Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(200px,_auto)]">
          {/* LARGE MOTION BLOCK: Sprinter */}
          <div className="md:col-span-8 md:row-span-2 relative overflow-hidden group action-card hover:-translate-y-1 transition-transform duration-300 min-h-[400px] md:min-h-0 ">
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 transition-opacity group-hover:opacity-10"></div>
            <img
              className="absolute inset-0 w-full h-full object-cover"
              alt="Sprinter"
              src="/assets/images/contact/contacthero.jpeg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20"></div>
            <div className="relative z-30 h-full flex flex-col justify-end p-8 md:p-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-[1] italic mb-4">RACE TOWARD<br />SOLUTIONS</h2>
              <div className="w-16 h-2 bg-primary"></div>
            </div>
          </div>

          {/* CONTACT FORM BLOCK */}
          <div className="md:col-span-4 md:row-span-2 bg-surface-container-lowest p-6 md:p-8 flex flex-col justify-center border-t-4 border-primary shadow-sm action-card hover:-translate-y-1 transition-transform duration-300 ">
            <h3 className="text-xl md:text-2xl font-extrabold mb-6 uppercase ">Quick Entry</h3>
            <ContactForm />
          </div>

          {/* WHATSAPP BLOCK */}
          <div className="md:col-span-4 bg-surface-container-low p-6 md:p-8 flex flex-col justify-between action-card hover:-translate-y-1 transition-transform duration-300 ">
            <div>
              <span className="material-symbols-outlined text-primary text-2xl mb-4">Chat</span>
              <h4 className="text-xl md:text-xl font-bold leading-tight uppercase">Instant Support</h4>
              <p className="text-sm md:text-base text-secondary mt-2">Chat directly with our tech experts.</p>
            </div>
            <div className="mt-6">
              <a className="text-xl md:text-2xl font-bold text-on-surface hover:text-primary transition-colors block mb-2" href="#">+977 9801234567</a>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                <span className="text-xs md:text-sm font-bold text-green-600 uppercase tracking-wide">Experts Online</span>
              </div>
            </div>
          </div>

          {/* HOURS BLOCK */}
          <div className="md:col-span-4 bg-inverse-surface text-white p-6 md:p-8 flex flex-col justify-between action-card hover:-translate-y-1 transition-transform duration-300 ">
            <div>
              <h4 className="text-xl md:text-2xl font-bold leading-tight uppercase text-primary">Retail Hours</h4>
              <ul className="mt-6 space-y-2 text-sm md:text-base opacity-80">
                <li className="flex justify-between border-b border-white/10 pb-1"><span>Sun - Fri</span> <span>10:00 - 20:00</span></li>
                <li className="flex justify-between border-b border-white/10 pb-1"><span>Saturday</span> <span>11:00 - 18:00</span></li>
              </ul>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className={`text-xs md:text-sm font-bold px-3 py-1 uppercase tracking-wide ${isOpen ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                {isOpen ? 'Store Open Now' : 'Currently Closed'}
              </span>
              <span className="material-symbols-outlined opacity-40">schedule</span>
            </div>
          </div>

          {/* MAP BLOCK */}
          <div className="md:col-span-4 relative group overflow-hidden action-card hover:-translate-y-1 transition-transform duration-300 bg-surface-container ">
            <ContactMap />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none z-10 group-hover:bg-transparent transition-colors"></div>
            <div className="absolute z-20 p-6 bg-white/90 backdrop-blur-md bottom-4 left-4 right-4 rounded-md">
              <p className="text-sm md:text-base text-on-surface uppercase font-bold tracking-wide">Xtep Flagship, Durbar Marg</p>
              <p className="text-xs md:text-sm text-secondary">Kathmandu, Nepal</p>
              <a className="mt-2 inline-flex items-center text-primary hover:underline uppercase text-[12px] md:text-xs font-bold tracking-widest" href="#">
                Get Directions <span className="material-symbols-outlined text-xs ml-1">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}