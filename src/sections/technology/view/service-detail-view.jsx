"use client";

import { useAppSelector } from "@/redux/hooks";
import { useGetServiceDetail, useGetServiceData } from "@/api/service";

import { Iconify } from "@/components/iconify";
import { Markdown } from "@/components/markdown";
import { EmptyContent } from "@/components/empty-content";

import { ServiceInquiryForm } from "../service-inquiry-form";
import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

// ---------------- ICON MAP ----------------
const FA_TO_SOLAR_ICON_MAP = {
  "fa-star": "solar:star-bold-duotone",
  "fa-lightbulb": "solar:lightbulb-bolt-bold-duotone",
  "fa-headset": "solar:headphones-round-sound-bold-duotone",
  "fa-users-cog": "solar:users-group-rounded-bold-duotone",
  "fa-shield": "solar:shield-check-bold-duotone",
  "fa-rocket": "solar:rocket-bold-duotone",
  "fa-cog": "solar:settings-bold-duotone",
  "fa-check": "solar:verified-check-bold-duotone",
  "fa-heart": "solar:heart-bold-duotone",
  "fa-clock": "solar:clock-circle-bold-duotone",
  "fa-truck": "solar:delivery-bold-duotone",
  "fa-dollar-sign": "solar:tag-price-bold-duotone",
  "fa-box": "solar:box-bold-duotone",
  "fa-shopping-cart": "solar:cart-bold-duotone",
  "fa-credit-card": "solar:card-bold-duotone",
  "fa-globe": "solar:global-bold-duotone",
  "fa-phone": "solar:phone-bold-duotone",
  "fa-envelope": "solar:letter-bold-duotone",
};

const getSolarIcon = (icon) =>
  FA_TO_SOLAR_ICON_MAP[icon] || icon || "solar:star-bold-duotone";

const SERVICE_COLORS = ["primary", "info", "success", "warning", "secondary", "error"];

function SkeletonBox({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export function ServiceDetailView({ slug }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#6366f1";
  const secondaryColor = vendor?.secondary_color || "#06b6d4";

  const { serviceDetail, isLoading, error } = useGetServiceDetail(slug);
  const { serviceData } = useGetServiceData();

  const relatedServices = (serviceData || [])
    .filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s, i) => ({
      ...s,
      color: SERVICE_COLORS[i % SERVICE_COLORS.length],
    }));

  if (isLoading) {
    return (
      <div>
        <div className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 space-y-3">
            <SkeletonBox className="h-6 w-32" />
            <SkeletonBox className="h-10 w-2/3" />
            <SkeletonBox className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !serviceDetail) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <EmptyContent
          title="Service Not Found"
          description="The service you're looking for isn't available."
          action={
            <RouterLink
              href={paths.service.root}
              className="mt-4 inline-flex items-center gap-2 text-blue-600"
            >
              <Iconify icon="solar:arrow-left-bold" />
              Back to Technologies
            </RouterLink>
          }
        />
      </div>
    );
  }

  const { title, short_description, description, icon } = serviceDetail;

  return (
    <main className="w-full">
      {/* HERO */}
      <section
        className="relative py-20 text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#fff1_1px,transparent_1px),linear-gradient(90deg,#fff1_1px,transparent_1px)] bg-[40px_40px]" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <RouterLink
            href={paths.service.root}
            className="inline-flex items-center gap-2 mb-6 opacity-90"
          >
            <Iconify icon="solar:arrow-left-bold" />
            Back to Technologies
          </RouterLink>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              {/* <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                Our Service
              </span> */}

              <h1 className="text-3xl md:text-5xl ">{title}</h1>

              <Markdown className="opacity-90 max-w-xl" children={short_description} />
            </div>

            <div className="md:col-span-4">
              <div className="p-6  bg-white/10 border border-white/20 text-center backdrop-blur">
                <Iconify icon={getSolarIcon(icon)} width={60} />
                <p className="mt-3 text-sm opacity-90">
                  Premium service for your convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-12 gap-10">
        {/* LEFT */}
        <div className="md:col-span-8 space-y-10">
          <div>
            <h2 className="text-xl  mb-4">About This Technology</h2>
            <div className="text-gray-600 leading-relaxed">
              <Markdown children={description} />
            </div>
          </div>

          {/* CTA */}
          <div
            className="p-6  border flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{
              background: `${primaryColor}10`,
              borderColor: `${primaryColor}40`,
            }}
          >
            <div>
              <h3 className="font-semibold">Ready to get started?</h3>
              <p className="text-sm text-gray-500">
                Experience this service today
              </p>
            </div>

            <RouterLink
              href={paths.category}
              className="px-6 py-3  text-white font-semibold"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              }}
            >
              Start Shopping
            </RouterLink>
          </div>

          {/* FORM */}
          {/* <div>
            <h3 className="text-lg  mb-4">Have Any Questions?</h3>
            <ServiceInquiryForm serviceTitle={title} serviceSlug={slug} />
          </div> */}
        </div>

        {/* RIGHT */}
        <div className="md:col-span-4">
          <div className="sticky top-24">
            <div
              className="p-5  text-white"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              }}
            >
              <Iconify icon="solar:chat-round-call-bold-duotone" width={40} />
              <h4 className=" mt-2">Need Help?</h4>
              <p className="text-sm opacity-90 mt-1">
                Our support team is here to help
              </p>

              <button className="mt-4 w-full bg-white text-black py-2  font-semibold">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <h3 className="text-xl ">Related Technologies</h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedServices.map((item) => (
              <RouterLink
                key={item.slug}
                href={paths.service.details(item.slug)}
                className="p-5 bg-white border  hover:-translate-y-1 transition block"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center  mb-3"
                  style={{ background: `${item.color}20` }}
                >
                  <Iconify icon={getSolarIcon(item.icon)} width={20} />
                </div>

                <h4 className="font-semibold">{item.title}</h4>
                <Markdown className="text-sm text-gray-500 line-clamp-2 mt-1"
                  children={item.short_description}
                />
              </RouterLink>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}