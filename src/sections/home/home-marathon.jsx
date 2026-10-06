import { useGetHomeCommitments } from "@/api";
import { useEffect, useState } from "react";
import { CONFIG } from "@/global-config";

const DEFAULT_ACCENT = "rgba(59,130,246,0.4)";
function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)"); // Tailwind's `lg` breakpoint
    setIsLarge(mq.matches);
    const handler = (e) => setIsLarge(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isLarge;
}

export function HomeMarathon({ activeRunner, onSelectRunner }) {
  const [hoveredId, setHoveredId] = useState(null);
  const isLargeScreen = useIsLargeScreen();

  const { commitments } = useGetHomeCommitments();
  const runnerData = Array.isArray(commitments) ? commitments : [];
  const currentRunner = activeRunner ?? (runnerData.length > 0 ? runnerData[0] : {});
  const accentColor = currentRunner?.accentColor || DEFAULT_ACCENT;

  return (
    <section className="relative overflow-hidden lg:py-10 py-10 lg:my-6 my-2 container mx-auto lg:px-5 px-2 ">

      {/* <div className="w-full py-8 px-4 md:px-8 border-b border-white/5 relative overflow-hidden"> */}
      <div className="px-4 pb-4 md:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase ">
          The wonderful performance
        </h2>
      </div>

      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute inset-0 opacity-15 blur-[150px] transition-all duration-1000 ease-in-out pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor.replace("0.4", "1")}, transparent 60%)`,
        }}
      />

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Responsive runner grid: 1 col on mobile, 2 on tablets, 5 on large screens */}
        <div className="w-full relative grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-px lg:overflow-hidden  lg:bg-white/99 lg:h-[500px]">
          {runnerData?.map((runner, index) => {
            const isHovered = hoveredId === runner.id;
            const isActive = currentRunner.id === runner.id;
            const runnerAccentColor = runner.accentColor || DEFAULT_ACCENT;

            return (
              <div
                key={runner.id}
                id={`runner-panel-${runner.id}`}
                className="relative overflow-hidden cursor-pointer select-none group bg-black  lg:rounded-none lg:flex-1"
                style={{
                  aspectRatio: isLargeScreen ? undefined : "3 / 4",
                  transition: "transform 0.35s ease, opacity 0.35s ease",
                  opacity: hoveredId !== null && !isHovered ? 0.8 : 1,
                  ...(isLargeScreen && {
                    height: "100%",
                    clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
                    marginLeft: index === 0 ? 0 : "-10%",
                    zIndex: isHovered ? 20 : index + 1,
                  }),
                }}
                onMouseEnter={() => setHoveredId(runner.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectRunner?.(runner)}
              >
                {/* Runner Image */}
                {/* <img
                  src={runner.imageUrl}
                  alt={runner.name}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                /> */}

                <div className="absolute inset-0 h-full w-full overflow-hidden">
                  <img
                    src={`${runner.featured_image}`}
                    alt={runner.title}
                    title={runner.title}
                    className={`absolute left-0 w-full transition-transform duration-[1400ms] ease-out ${isLargeScreen
                      ? "h-[130%] object-cover object-top group-hover:translate-y-[-15%]"
                      : "h-full object-cover object-top"
                      }`}
                    style={{ top: 0 }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Light color overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: isActive
                      ? `linear-gradient(to top, rgba(255,255,255,0.04) 15%, ${runnerAccentColor} 60%, rgba(255,255,255,0.03) 100%)`
                      : isHovered
                        ? `linear-gradient(to top, rgba(255,255,255,0.03) 20%, ${runnerAccentColor.replace("0.4", "0.25")} 70%, rgba(255,255,255,0.02) 100%)`
                        : "linear-gradient(to top, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.01) 80%, rgba(255,255,255,0.02) 100%)",
                  }}
                />

                {/* Highlight active indicator line at the top */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-30" />
                )}

                {/* Runner Overlay Details */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-end text-white z-20 h-[65%] bg-gradient-to-t from-black/50 via-black/15 to-transparent">
                  {/* Country Badge */}
                  {runner.country && (
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <span className="text-[12px] sm:text-xs font-mono text-gray-400">
                        {runner.country}
                      </span>
                    </div>
                  )}

                  {/* Athlete Name */}
                  <h3 className="text-lg sm:text-xl lg:text-lg xl:text-xl font-sans   mb-1.5 sm:mb-2 group-hover:text-blue-300 transition-colors truncate">
                    {runner.title}
                  </h3>

                  {/* Event Details */}
                  <div className="flex flex-col gap-1">
                    {/* Custom styled dash spacer */}
                    <div className="w-12 sm:w-16 h-[2px] bg-white/20 my-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                    </div>

                    {/* Event Description */}
                    {runner.description && (
                      <div
                        className="text-[11px] sm:text-xs md:text-sm text-gray-300 font-sans tracking-wide truncate [&>p]:truncate [&>p]:m-0"
                        dangerouslySetInnerHTML={{ __html: runner.description }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section >
  );
}
