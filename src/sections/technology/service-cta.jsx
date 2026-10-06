
"use client";

import { useAppSelector } from "@/redux/hooks";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function ServiceCta() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#7C3AED";
  const secondaryColor = vendor?.secondary_color || "#5B21B6";

  return (
    <section className="py-6 md:py-10 mb-10">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className="relative overflow-hidden rounded-[32px] px-6 py-10 text-center md:px-12 md:py-16"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          }}
        >
          {/* Decorative Background Elements */}
          <div
            className="pointer-events-none absolute -right-[20%] -top-[50%] h-[200%] w-[80%]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 60%)",
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-[50%] -left-[20%] h-[150%] w-[60%]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 50%)",
            }}
          />

          {/* Floating Cart Icon */}
          <div className="absolute right-[8%] top-[15%] opacity-20 animate-float">
            <Iconify
              icon="solar:cart-large-2-bold-duotone"
              width={60}
              className="text-white"
            />
          </div>

          {/* Floating Bag Icon */}
          <div
            className="absolute left-[6%] bottom-[20%] opacity-15 animate-float-delayed"
          >
            <Iconify
              icon="solar:bag-4-bold-duotone"
              width={50}
              className="text-white"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <Iconify
              icon="solar:rocket-2-bold-duotone"
              width={64}
              className="text-white opacity-90"
            />

            <h2 className="text-[1.5rem] font-extrabold text-white drop-shadow-lg md:text-[2.5rem]">
              Ready to Experience Premium Shopping?
            </h2>

            <p className="max-w-[450px] leading-7 text-white/90">
              Join our community today and enjoy all the benefits of our
              exceptional services. Start shopping smarter!
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <RouterLink
                href={paths.category}
                className="inline-flex items-center justify-center gap-2  bg-white px-6 py-3 font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  color: primaryColor,
                }}
              >
                Start Shopping
                <Iconify icon="solar:arrow-right-bold" width={18} />
              </RouterLink>

              <RouterLink
                href={paths.about}
                className="inline-flex items-center justify-center  border-2 border-white px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Learn More
              </RouterLink>
            </div>
          </div>

          {/* Animation Styles */}
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-15px) rotate(10deg);
              }
            }

            .animate-float {
              animation: float 5s ease-in-out infinite;
            }

            .animate-float-delayed {
              animation: float 6s ease-in-out infinite 0.5s;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}