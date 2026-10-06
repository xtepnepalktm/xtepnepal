"use client";

import { DynamicHero } from "../dynamic-hero";
import { DynamicContent } from "../dynamic-content";

export function DynamicView({ content }) {
  const { banner_image, title, description, featured_image } = content;

  return (
    <>
      <DynamicHero bannerImage={banner_image} title={title} />

      <DynamicContent
        title={title}
        description={description}
        featuredImage={featured_image}
      />
    </>
  );
}
