
"use client";

import { Iconify } from "@/components/iconify";
import { useGetAboutData } from "@/api/about";

// ----------------------------------------------------------------------

const getIconAndColor = (type, index) => {
  const typeMap = {
    mission: { icon: "solar:target-bold-duotone" },
    vision: { icon: "solar:eye-bold-duotone" },
    values: { icon: "solar:heart-pulse-bold-duotone" },
    goal: { icon: "solar:flag-bold-duotone" },
  };

  const fallbackIcons = [
    "solar:target-bold-duotone",
    "solar:eye-bold-duotone",
    "solar:heart-pulse-bold-duotone",
    "solar:flag-bold-duotone",
    "solar:star-bold-duotone",
  ];

  if (type && typeMap[type.toLowerCase()]) {
    return typeMap[type.toLowerCase()];
  }

  return { icon: fallbackIcons[index % fallbackIcons.length] };
};

export function AboutMission() {
  const { aboutData } = useGetAboutData();
  const missionVisions = aboutData?.mission_visions || [];

  return (
    <section className="bg-black text-on-primary py-section-gap px-margin-mobile md:px-margin-desktop">
      {/* Header */}

      <div className="container mx-auto py-20 lg:px-8 px-2">


        <div className="text-center mb-20">
          <span className=" text-[#d1ff00] mb-2 block">
            THE ENGINEERING WING
          </span>
          <h2 className="font-headline-lg text-white font-bold text-headline-lg lg:text-5xl text-2xl">
            XTEP LAB TECHNOLOGY
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {missionVisions.map((item, index) => {
            const { icon } = getIconAndColor(item.type, index);

            return (
              <div
                key={item.id || index}
                className="p-10 border border-asphalt-gray hover:border-performance-neon transition-colors group border border-gray-600 hover:border-[#d1ff00]
                "
              >
                <Iconify
                  icon={icon}
                  width={48}
                  className="text-performance-neon mb-8 block" style={{ color: "#d1ff00" }}
                />

                <h3 className=" mb-4 lg:text-2xl text-xl font-bold leading-tight" style={{ color: "#ffffff" }}>
                  {item.title?.toUpperCase()}
                </h3>

                <p className="font-body-md text-surface-dim opacity-80 mb-8" style={{ color: "#ffffff" }}>
                  {item.description}
                </p>

                {/* Hover underline */}
                <div className="h-1 w-0 bg-performance-neon group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <button
            type="button"
            className="border-2 uppercase border-white text-white py-5 px-12 font-label-caps text-label-caps hover:bg-on-primary hover:text-primary transition-all"
          >
            Discover Xtep Lab
          </button>
        </div>
      </div>
    </section>
  );
}