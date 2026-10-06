// "use client";

// import { useState, useEffect, useRef } from "react";

// import { useAppSelector } from "@/redux/hooks";
// import { useGetAboutData } from "@/api/about";

// // ----------------------------------------------------------------------

// function AnimatedCounter({ value, duration = 2000, symbol = "" }) {
//   const [count, setCount] = useState(0);
//   const [hasAnimated, setHasAnimated] = useState(false);
//   const ref = useRef(null);

//   const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
//   const isDecimal = numericValue % 1 !== 0;

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && !hasAnimated) {
//             setHasAnimated(true);
//             animateCounter();
//           }
//         });
//       },
//       { threshold: 0.3 }
//     );

//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [hasAnimated, numericValue]);

//   const animateCounter = () => {
//     const startTime = Date.now();

//     const updateCounter = () => {
//       const elapsed = Date.now() - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const easeOutQuart = 1 - Math.pow(1 - progress, 4);
//       const currentValue = easeOutQuart * numericValue;

//       setCount(isDecimal ? currentValue : Math.floor(currentValue));

//       if (progress < 1) {
//         requestAnimationFrame(updateCounter);
//       } else {
//         setCount(numericValue);
//       }
//     };

//     requestAnimationFrame(updateCounter);
//   };

//   const formatNumber = (num) =>
//     isDecimal ? num.toFixed(1) : Math.floor(num).toLocaleString();

//   return (
//     <span ref={ref}>
//       {formatNumber(count)}
//       {symbol}
//     </span>
//   );
// }

// // ----------------------------------------------------------------------

// export function AboutStats() {
//   const { aboutData, aboutLoading } = useGetAboutData();
//   const counters = aboutData?.counters || [];

//   if (aboutLoading || !counters.length) return null;

//   return (
//     <section className="bg-black text-on-primary py-16  border-b border-asphalt-gray">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-gutter text-center container mx-auto">
//         {counters.map((stat, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <span className="font-display-hero text-white font-bold text-[40px] md:text-[64px] leading-none mb-2">
//               <AnimatedCounter
//                 value={stat.count}
//                 duration={2500}
//                 symbol={stat.symbol || ""}
//               />
//             </span>
//             <span className="font-label-caps text-label-caps text-white uppercase tracking-widest">
//               {stat.title}
//             </span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetAboutData } from "@/api/about";

// ----------------------------------------------------------------------

function AnimatedCounter({ value, duration = 2000, symbol = "" }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
  const isDecimal = numericValue % 1 !== 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, numericValue]);

  const animateCounter = () => {
    const startTime = Date.now();
    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeOutQuart * numericValue;
      setCount(isDecimal ? currentValue : Math.floor(currentValue));
      if (progress < 1) requestAnimationFrame(updateCounter);
      else setCount(numericValue);
    };
    requestAnimationFrame(updateCounter);
  };

  const formatNumber = (num) =>
    isDecimal ? num.toFixed(1) : Math.floor(num).toLocaleString();

  return (
    <span ref={ref}>
      {formatNumber(count)}
      {symbol}
    </span>
  );
}

// ----------------------------------------------------------------------

export function AboutStats() {
  const { aboutData, aboutLoading } = useGetAboutData();
  const counters = aboutData?.counters || [];

  if (aboutLoading || !counters.length) return null;

  return (
    <section
      style={{
        backgroundColor: "#000000",
        position: "relative",
        overflow: "hidden",
        // borderBottom: "1px solid #333333",
      }}
    >
      {/* Dot grid texture */}
      {/* <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      /> */}

      {/* Top neon rule */}
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(to right, transparent, #D1FF00 30%, #E60012 70%, transparent)",
        }}
      /> */}

      <div className="lg:py-10 py-4"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          // padding: "5rem clamp(20px, 5vw, 64px)",
        }}
      >
        {/* Section label */}
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "3.5rem",
            justifyContent: "center",
          }}
        >
          <span
            style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: "#D1FF00" }}
          />
          <span
            style={{
              fontFamily: "Helvetica",
              fontSize: "11px",
              letterSpacing: "0.2em",
              fontWeight: 600,
              color: "#D1FF00",
              textTransform: "uppercase",
            }}
          >
            By The Numbers
          </span>
          <span
            style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: "#D1FF00" }}
          />
        </div> */}

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(counters.length, 4)}, 1fr)`,
            gap: "0",
          }}
        >
          {counters.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              total={counters.length}
            />
          ))}
        </div>
      </div>

      {/* Bottom neon rule */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(209,255,0,0.3), transparent)",
        }}
      />
    </section>
  );
}

// ----------------------------------------------------------------------

function StatCard({ stat, index, total }) {
  const [hovered, setHovered] = useState(false);
  const isLast = index === total - 1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-3"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.08)",
        cursor: "default",
        transition: "background-color 300ms",
        backgroundColor: hovered ? "rgba(255,255,255,0.03)" : "transparent",
      }}
    >
      {/* Neon accent top bar — animates in on hover */}
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: "2px",
          backgroundColor: "#D1FF00",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)",
          transformOrigin: "center",
        }}
      /> */}

      {/* Index label */}
      <span
        style={{
          fontFamily: "Helvetica",
          fontSize: "10px",
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.2)",
          marginBottom: "1.25rem",
          textTransform: "uppercase",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Counter */}
      <span className="lg:text-6xl text-4xl"
        style={{
          fontFamily: "Sora, sans-serif",
          // fontSize: "clamp(3rem, 5vw, 5rem)",
          lineHeight: 1,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: hovered ? "#fed5d5ff" : "#ffffff",
          marginBottom: "1rem",
          transition: "color 300ms",
          display: "block",
        }}
      >
        <AnimatedCounter
          value={stat.count}
          duration={2500}
          symbol={stat.symbol || ""}
        />
      </span>

      {/* Divider */}
      <div
        style={{
          width: "24px",
          height: "2px",
          backgroundColor: "#E60012",
          marginBottom: "0.875rem",
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily: "Helvetica",
          fontSize: "11px",
          lineHeight: "16px",
          letterSpacing: "0.12em",
          fontWeight: 600,
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
        }}
      >
        {stat.title}
      </span>
    </div>
  );
}