
"use client";

import { AboutHero } from "../about-hero";
import { AboutMission } from "../about-mission";
import { AboutOwner } from "../about-owner";
import { AboutStory } from "../about-story";
import { AboutStats } from "../about-stats";
import { AboutTypes } from "../about-types";
import { AboutTech } from "../about-tech";
import { AboutFeatures } from "../about-features";
import { AboutTeam } from "../about-team";
import { AboutCta } from "../about-cta";
import AboutContact from "../about-contact";

// ----------------------------------------------------------------------

export function AboutUsView() {
  return (
    <main>
      <div className="">
        {/* Hero Section */}
        <AboutHero />

        {/* <AboutStats /> */}


        {/* Mission, Vision, Values */}
        <AboutStory />

        {/* Featured Collection — horizontal scroll cards */}
        <AboutTypes />

        {/* Xstep Technology showcase */}
        {/* <AboutTech /> */}

        {/* <AboutOwner />

        <AboutMission /> */}

        {/* Company Owner */}

        {/* Our Story */}

        {/* Stats Section */}

        {/* Features / Why Choose Us */}
        {/* <AboutFeatures /> */}

        {/* Team Section */}
        {/* <AboutTeam /> */}

        {/* Call to Action */}
        {/* <AboutCta /> */}
        <AboutContact />
      </div>
    </main>
  );
}