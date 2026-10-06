"use client";

import { useState, useEffect } from "react";

// ----------------------------------------------------------------------

export function ContactActions({ className = "", ...other }) {
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    function updateLiveStatus() {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();

      let open = false;
      if (day >= 0 && day <= 5) {
        // Sun - Fri
        if (hour >= 10 && hour < 20) open = true;
      } else if (day === 6) {
        // Saturday
        if (hour >= 11 && hour < 18) open = true;
      }
      setIsOpen(open);
    }

    updateLiveStatus();
    const interval = setInterval(updateLiveStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={[
        "grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(200px,_auto)]",
        className,
      ].join(" ")}
      {...other}
    >
      {/* LARGE MOTION BLOCK: Sprinter */}
      <div className="md:col-span-8 md:row-span-2 relative overflow-hidden group action-card">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 transition-opacity group-hover:opacity-10" />
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="High-intensity, motion-blurred action shot of a professional sprinter exploding off the starting blocks on a vibrant red running track."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAssxyK7DWJqJtb5NbwbfQeevYdA-jp--GwcDZ1-Sd2kxhRqHAgcgsmaC8bWROplcu6jwdh3wDGRAwT8H5vF2pdVSJPePx7yhnX4mkRuFdKynBjTBcboA18Kvo_a_u4PKcXbeCXH72FPB1wLvjIBl25DWKZG_SIM4eQJEM_RlatWncDH6CLDh82qJHXle1TB0hGLiLAhLMndzpbJVcR9GHS3pkqyIXhJD9b_ZOkrhUqcOksbj2CQCul-D9DKINvMErvVQa78Slc05HY"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
        <div className="relative z-30 h-full flex flex-col justify-end p-8 md:p-12">
          <h2 className="font-headline-xl text-headline-xl text-white leading-[0.9] italic mb-4">
            RACE TOWARD
            <br />
            SOLUTIONS
          </h2>
          <div className="w-16 h-2 bg-primary" />
        </div>
      </div>

      {/* CONTACT FORM BLOCK */}
      <div className="md:col-span-4 md:row-span-2 bg-surface-container-lowest p-8 flex flex-col justify-center border-t-4 border-primary shadow-sm action-card">
        <h3 className="font-headline-lg text-headline-lg mb-6 uppercase">
          Quick Entry
        </h3>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="group">
            <label className="font-label-md text-label-md text-secondary block mb-1">
              YOUR NAME
            </label>
            <input
              type="text"
              placeholder="Athlete Name"
              className="w-full bg-surface-container border-none border-b-2 border-transparent focus:border-on-surface focus:ring-0 px-4 py-3 font-body-md transition-all"
            />
          </div>
          <div className="group">
            <label className="font-label-md text-label-md text-secondary block mb-1">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="runner@example.com"
              className="w-full bg-surface-container border-none border-b-2 border-transparent focus:border-on-surface focus:ring-0 px-4 py-3 font-body-md transition-all"
            />
          </div>
          <div className="group">
            <label className="font-label-md text-label-md text-secondary block mb-1">
              MESSAGE
            </label>
            <textarea
              rows={4}
              placeholder="How can we help you perform better?"
              className="w-full bg-surface-container border-none border-b-2 border-transparent focus:border-on-surface focus:ring-0 px-4 py-3 font-body-md transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-on-background hover:bg-primary text-white py-4 font-button text-button uppercase tracking-widest transition-colors duration-300 active:scale-95"
          >
            Submit Request
          </button>
        </form>
      </div>

      {/* WHATSAPP BLOCK */}
      <div className="md:col-span-4 bg-surface-container-low p-8 flex flex-col justify-between action-card">
        <div>
          <span className="material-symbols-outlined text-primary text-4xl mb-4">
            chat
          </span>
          <h4 className="font-headline-lg text-headline-lg leading-tight uppercase">
            Instant Support
          </h4>
          <p className="font-body-md text-secondary mt-2">
            Chat directly with our tech experts.
          </p>
        </div>
        <div className="mt-6">
          <a
            href="#"
            className="font-label-md text-headline-lg text-on-surface hover:text-primary transition-colors"
          >
            +977 9801234567
          </a>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-500 active-dot" />
            <span className="font-label-md text-label-md text-green-600 uppercase">
              Experts Online
            </span>
          </div>
        </div>
      </div>

      {/* HOURS BLOCK */}
      <div className="md:col-span-4 bg-inverse-surface text-white p-8 flex flex-col justify-between action-card">
        <div>
          <h4 className="font-headline-lg text-headline-lg leading-tight uppercase text-primary">
            Retail Hours
          </h4>
          <ul className="mt-6 space-y-2 font-body-md opacity-80">
            <li className="flex justify-between border-b border-white/10 pb-1">
              <span>Sun - Fri</span> <span>10:00 - 20:00</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-1">
              <span>Saturday</span> <span>11:00 - 18:00</span>
            </li>
          </ul>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span
            className={[
              "font-label-md text-label-md px-3 py-1 uppercase tracking-tighter",
              isOpen === null
                ? "bg-white/10"
                : isOpen
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white",
            ].join(" ")}
          >
            {isOpen === null
              ? "Calculating..."
              : isOpen
                ? "Store Open Now"
                : "Currently Closed"}
          </span>
          <span className="material-symbols-outlined opacity-40">schedule</span>
        </div>
      </div>

      {/* MAP BLOCK */}
      <div className="md:col-span-4 relative group overflow-hidden action-card">
        <div className="absolute inset-0 bg-primary/10 pointer-events-none z-10 group-hover:bg-transparent transition-colors" />
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCq7H8hBWA-vTAn7zTRueWv7U2jvM_U386byz_eHn0UK92wSwpk966Fnib1mznIqqwFWMxrUKJD_0Q6aVwrfnXQTgu8TsKxa0lJlxgqneOqgddryORQb2LtM1rssTDJQEOCej2J3NWrxNyW_ccSLiE-roF3ApdKsYNmQNCa_EYA6K7jiUYth4eeQzwcyPiD0LuGidPKNLIaRVrnRAxkj-Nm603lWBXYaqQOtZATMm6mI6FsrxIHAcItQgnAxBKukrjRds5EkLCmQKlD')",
          }}
        />
        <div className="relative z-20 p-6 bg-white/90 backdrop-blur-md absolute bottom-4 left-4 right-4">
          <p className="font-label-md text-label-md text-on-surface uppercase font-bold">
            Xtep Flagship, Durbar Marg
          </p>
          <p className="font-body-md text-secondary text-sm">
            Kathmandu, Nepal
          </p>
          <a
            href="#"
            className="mt-2 inline-flex items-center font-label-md text-primary hover:underline uppercase text-xs tracking-widest"
          >
            Get Directions{" "}
            <span className="material-symbols-outlined text-xs ml-1">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
