import React from "react";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBrand, setCategory } from "@/redux/actions";

import { FacebookIcon, LinkedinIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/assets/icons";

import { Logo } from "@/components/logo";

import { useGetBrands, useGetHomeRecentProducts } from "@/api";
import { useGetSocialMediaData } from "@/api/social-media";
import EmailInboxIcon from "@/assets/icons/email-inbox-icon";

// ----------------------------------------------------------------------

const LEGAL_SECTIONS = [
  { name: "Terms & Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

// ----------------------------------------------------------------------

export function Footer({ className = "", layoutQuery = "md", pages, categories, ...other }) {
  const dispatch = useAppDispatch();
  const { vendor } = useAppSelector((state) => state.vendor);
  const { brands } = useGetBrands();
  const { recentProducts } = useGetHomeRecentProducts();
  const { socialMediaData } = useGetSocialMediaData();

  const handleClickBrand = (brandId) => {
    dispatch(setBrand([brandId]));
    dispatch(setCategory(""));
  };

  const handleClickCategory = (categoryId) => {
    dispatch(setCategory(categoryId));
  };

  const footerBg =
    vendor?.secondary_color && vendor?.primary_color
      ? `linear-gradient(135deg, ${vendor.secondary_color} 0%, ${vendor.primary_color} 100%)`
      : vendor?.secondary_color
        ? `linear-gradient(135deg, ${vendor.secondary_color} 0%, ${vendor.secondary_color}dd 100%)`
        : `linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)`;

  // Shared footer link style with smooth slide-right arrow animation
  const footerLinkClass = "group flex items-center text-sm font-medium text-white/80 no-underline transition-all duration-300 hover:text-white";

  // Shared section heading style
  const FooterHeading = ({ children }) => (
    <h3 className="relative mb-6 pb-2 inline-block text-sm font-bold uppercase tracking-widest text-white">
      {children}
      <span className="absolute bottom-0 left-0 h-[2px] w-8 rounded-full bg-white transition-all duration-300 group-hover:w-full" />
    </h3>
  );

  return (
    <footer
      className={`relative overflow-hidden pb-[var(--layout-nav-mobile-bottom-height,0px)] ${className} pt-16 pb-5`}
      style={{ background: footerBg, color: "white" }}
      {...other}
    >
      {/* --- Ambient Background Overlays --- */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          background: "radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 40%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-full w-[60%]"
        style={{
          background: "radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)",
        }}
      />

      {/* --- Main Container --- */}
      <div className="container relative z-10 mx-auto px-6 md:px-8 flex flex-col gap-12">

        {/* ── Row 1: Logo & Info + Links Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12">

          {/* Column 1: Logo, Description & Socials (Span 4) */}
          <div className="md:col-span-4 flex flex-col items-center text-center md:items-start md:text-left gap-6">

            {/* Logo box */}
            <div
              className="inline-flex "
              style={{
                // backgroundColor: "rgba(255, 255, 255, 0.95)",
                filter: "brightness(0) invert(1)"
              }}
            >
              <Logo />
            </div>

            {/* Description */}
            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              We're dedicated to providing a smooth and reliable shopping
              experience with a wide selection of quality products, fast
              delivery, and customer service you can count on. Shop with
              confidence and convenience.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {socialMediaData?.filter(social => social.platform !== "Email").map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  title={social.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_8px_20px_rgba(255,255,255,0.2)]"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)";
                    e.currentTarget.style.color = vendor?.primary_color || "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.color = "white";
                  }}
                >
                  {social.platform === "Facebook" && <FacebookIcon size={18} />}
                  {social.platform === "Instagram" && <InstagramIcon size={18} />}
                  {social.platform === "Linkedin" && <LinkedinIcon size={18} />}
                  {social.platform === "TikTok" && <TikTokIcon size={18} />}
                  {social.platform === "WhatsApp" && <WhatsAppIcon size={18} />}

                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links (Span 8) */}
          <div className="md:col-span-8 w-full grid grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Brands */}
            <div className="flex flex-col">
              <FooterHeading>Top Brands</FooterHeading>
              <div className="flex flex-col gap-3">
                {brands?.slice(0, 5)?.map((brand) => (
                  <RouterLink
                    key={brand.brand_id}
                    href={paths.product.root}
                    title={brand.brand_name}
                    onClick={() => handleClickBrand(brand.brand_id)}
                    className={footerLinkClass}
                  >
                    <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100">→</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">{brand.brand_name}</span>
                  </RouterLink>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col">
              <FooterHeading>Company</FooterHeading>
              <div className="flex flex-col gap-3">
                <RouterLink href={paths.blog.root} title="Blogs" className={footerLinkClass}>
                  <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100">→</span>
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1">Blogs</span>
                </RouterLink>

                {pages?.map((link) => {
                  if (link.show_in_footer === "0" || !link.path) return null;
                  return (
                    <RouterLink key={link.title} href={link.path} className={footerLinkClass}>
                      <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100">→</span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">{link.title}</span>
                    </RouterLink>
                  );
                })}
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-col">
              <FooterHeading>Categories</FooterHeading>
              <div className="flex flex-col gap-3">
                {categories
                  ?.filter((category) => category.show_in_home)
                  ?.slice(0, 5)
                  ?.map((category) => (
                    <RouterLink
                      key={category.category_id}
                      href={paths.product.root}
                      onClick={() => handleClickCategory(category.category_id)}
                      className={footerLinkClass}
                    >
                      <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100">→</span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">{category.name}</span>
                    </RouterLink>
                  ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col">
              <FooterHeading>Contact Us</FooterHeading>
              <p className="text-sm leading-relaxed text-white/80 pr-4">
                {vendor?.contact_info}
              </p>
              {socialMediaData
                ?.filter((social) => social.platform === "Email")
                .map((social, index) => (
                  <p key={index} className="text-sm leading-relaxed text-white/80 pr-4">
                    {social.url}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* ── Row 2: Latest Products Chips ── */}
        {recentProducts && recentProducts.length > 0 && (
          <div className="w-full flex flex-col md:flex-row items-center gap-4 py-6 border-t border-b border-white/10">
            <span className="text-sm font-bold uppercase tracking-widest text-white whitespace-nowrap">
              Latest Arrivals
            </span>
            <div className="h-4 w-px bg-white/20 hidden md:block" />
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
              {recentProducts?.slice(0, 8)?.map((product) => (
                <RouterLink
                  key={product.product_id}
                  href={paths.product.details(product.slug)}
                  className="group rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:shadow-lg"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)")}
                >
                  {product.name}
                </RouterLink>
              ))}
            </div>
          </div>
        )}

        {/* ── Row 3: Bottom Copyright Bar ── */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-2">
          <p className="text-xs text-white/60 font-medium">
            © {new Date().getFullYear()} {vendor?.vendor_name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {LEGAL_SECTIONS.map((link, index) => (
              <React.Fragment key={link.name}>
                <RouterLink
                  href={link.href}
                  className="text-xs font-medium text-white/60 transition-colors duration-200 hover:text-white"
                >
                  {link.name}
                </RouterLink>
                {index < LEGAL_SECTIONS.length - 1 && (
                  <span className="h-3 w-px bg-white/20" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}