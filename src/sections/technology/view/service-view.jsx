
"use client";

import { ServiceHero } from "../service-hero";
import { ServiceProcess } from "../service-process";
import { ServiceBenefits } from "../service-benefits";
import { ServiceFaq } from "../service-faq";
import { ServiceCta } from "../service-cta";
import { ServiceList } from "../service-list";
import { AboutTech } from "@/sections/about-us";

// ----------------------------------------------------------------------

export function ServiceView() {
  return (
    <main>
      {/* Hero Section */}
      {/* <div className="mx-auto max-w-7xl px-4 pt-2 md:pt-4">
        <ServiceHero />
      </div> */}

      {/* Core Services */}
      {/* <ServiceList /> */}

      <AboutTech />
      {/* How It Works */}
      <ServiceProcess />

      {/* Benefits */}
      {/* <ServiceBenefits /> */}

      {/* FAQ Section */}
      {/* <ServiceFaq /> */}

      {/* Call to Action */}
      <ServiceCta />
    </main>
  );
}