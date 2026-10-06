"use client";

import { useAppSelector } from "@/redux/hooks";
import { useGetAboutData } from "@/api/about";
import { Markdown } from "@/components/markdown";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

const getInitials = (name) => {
  if (!name) return "??";
  return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
};

export function AboutOwner() {
  const { aboutData } = useGetAboutData();
  const { vendor } = useAppSelector((state) => state.vendor);

  const messages = aboutData?.message || [];

  if (!messages.length) return null;

  return (
    <section className="bg-surface-alt py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="space-y-24">
        {messages.map((person, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={person.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center"
            >
              {/* Content Side */}
              <div className={`lg:col-span-5 ${isReversed ? "order-2 lg:order-2" : "order-2 lg:order-1"}`}>
                {/* Label */}
                <p className="font-label-caps text-label-caps text-secondary mb-4 block">
                  {index === 0 ? "MEET OUR FOUNDER" : "LEADERSHIP TEAM"}
                </p>

                <h2 className="font-headline-lg text-headline-lg mb-8 leading-none">
                  {person.name?.toUpperCase() || "TEAM MEMBER"}
                </h2>

                {person.designation && (
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-6">
                    {person.designation.toUpperCase()}
                  </p>
                )}

                <Markdown className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
                  {person.message || person.description || "Leading with passion and dedication."}
                </Markdown>

                {/* Feature Card */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4 p-4 bg-on-primary border border-outline-variant">
                    <Iconify
                      icon="solar:verified-check-bold-duotone"
                      width={24}
                      className="text-secondary shrink-0 mt-0.5"
                    />
                    <div>
                      <h5 className="font-headline-md text-body-lg font-bold mb-1">
                        {vendor?.name || "Our Brand"}
                      </h5>
                      <p className="text-on-surface-variant text-body-md">
                        {index === 0
                          ? "Visionary leadership driving innovation and growth."
                          : "Excellence through dedication and strategic vision."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className={`lg:col-span-7 h-[500px] ${isReversed ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}>
                {person.featured_image ? (
                  <img
                    src={person.featured_image}
                    alt={person.name}
                    className="w-full h-full object-cover shadow-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container flex items-center justify-center shadow-xl">
                    <span className="font-display-hero text-[80px] text-on-surface-variant/30">
                      {getInitials(person.name)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}