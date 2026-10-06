
import Autoplay from "embla-carousel-autoplay";

import { useAppDispatch } from "@/redux/hooks";
import { setCategory } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";
import { useRouter } from "@/routes/hooks";

export function HomeFeaturedCategories({ categories }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = (id) => {
    dispatch(setCategory(id));
    router.push(paths.product.root);
  };

  const visibleCategories =
    categories?.filter((c) => c.show_in_footer === false && c.show_in_navbar === true && c.show_in_home === true) ?? [];

  // First category is the hero (large), rest fill the grid
  const [hero, ...rest] = visibleCategories;

  return (
    <section className="py-8 md:py-16 md:pt-0! pt-0 px-3 md:px-5 lg:px-5 container mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start md:items-end gap-3 mb-6 md:mb-12">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold uppercase  leading-tight">
            The World of Xtep
          </h2>
          <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-base">
            Engineered for every dimension of your movement.
          </p>
        </div>
        <RouterLink
          href={paths.category}
          className="shrink-0 text-xs md:text-sm font-bold uppercase border-b-2 border-black pb-0.5 md:pb-1 hover:opacity-60 transition-opacity mt-1"
        >
          <span className="hidden md:inline">View All Categories</span>
          <span className="md:hidden">View All</span>
          {" →"}
        </RouterLink>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-2 md:gap-3 md:h-[780px]">
        {/* Hero cell — full width on mobile, left 2 cols + 2 rows on desktop */}
        {hero && (
          <CategoryCard
            category={hero}
            onClick={() => handleClick(hero.category_id)}
            className="col-span-2 md:col-span-2 md:row-span-2 h-[240px] md:h-full"
            headlineSize="text-xl md:text-5xl"
          />
        )}

        {/* Remaining cells — 1 col each on mobile, 1 col on desktop */}
        {rest.slice(0, 4).map((category) => (
          <CategoryCard
            key={category.category_id}
            category={category}
            onClick={() => handleClick(category.category_id)}
            className="col-span-1 md:col-span-1 h-[150px] md:h-full"
            headlineSize="text-sm md:text-3xl"
          />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  onClick,
  className = "",
  headlineSize = "text-2xl",
}) {
  const { name, web_image } = category;

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden bg-gray-100 cursor-pointer ${className}`}
    >
      {/* Background image */}
      <img
        src={web_image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Persistent gradient so text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Dark overlay — deepens on hover */}
      <div className="absolute inset-0 group-hover:bg-black/30 transition-all duration-300" />

      {/* Label */}
      <div className="absolute bottom-3 left-3 md:bottom-8 md:left-8 text-white z-10">
        <h3
          className={`${headlineSize} font-extrabold uppercase leading-tight drop-shadow`}
        >
          {name}
        </h3>

        {/* Shop CTA — slides up on hover, desktop only */}
        <button className="hidden md:block mt-4 bg-white text-black px-6 py-3 text-sm font-bold uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Shop {name}
        </button>
      </div>
    </div>
  );
}
