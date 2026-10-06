
import { Nav, NavUl } from "../components";
import { NavList, NavCategoryList } from "./nav-desktop-list";

import { CategoryPopover } from "../../../components/category-popover";

// ----------------------------------------------------------------------

export function NavDesktop({
  categories,
  mainNavData,
  trailingNavData,
  secondaryNavData,
  className,
  ...other
}) {
  return (
    <Nav
      className={[
        // !important overrides any default flex-col the Nav component may apply
        "lg:!flex lg:!flex-row items-center justify-between hidden w-full lg:px-5 lg:pr-1 py-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...other}
    >
      {/* <CategoryPopover categories={categories} /> */}

      {/* gap: 5 (5×8=40px), height: 1 (100%), flex-row, items-center */}
      <NavUl className="!flex !flex-row h-full items-center gap-10">
        {mainNavData.map((list) => (
          <NavList key={list.title} data={list} />
        ))}

        {categories?.filter((c) => c.show_in_navbar).map((category) => (
          <NavCategoryList key={category.category_id} category={category} />
        ))}

      </NavUl>

      {/* Same layout as the main NavUl */}
      <NavUl className="!flex !flex-row h-full items-center !justify-center gap-10">
        {secondaryNavData.map((list) => (
          <NavList key={list.title} data={list} />
        ))}

        {trailingNavData?.map((list) => (
          <NavList
            key={list.title}
            data={list}
            // Solid brand button: it carries its own colours, so the shared
            // active treatment (brand text + underline) would be invisible.
            disableActiveStyle
            itemClassName="!bg-[#E60012] px-4 py-2 text-xs font-semibold uppercase text-white transition-all active:scale-95 hover:brightness-110"
          />
        ))}
      </NavUl>
    </Nav>
  );
}