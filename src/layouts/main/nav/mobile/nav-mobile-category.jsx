
import { forwardRef, useState } from "react";
import { useBoolean } from "minimal-shared/hooks";
import { mergeClasses } from "minimal-shared/utils";

import { useAppDispatch } from "@/redux/hooks";
import { setCategory, setBrand } from "@/redux/actions";

import { useRouter } from "@/routes/hooks";
import { paths } from "@/routes/paths";

import { Iconify } from "@/components/iconify";
import { navSectionClasses } from "@/components/nav-section";

// ----------------------------------------------------------------------

export function CategoryNavList({ data }) {
  const { value: open, onToggle } = useBoolean();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleClick = (event, id) => {
    event.stopPropagation();
    dispatch(setCategory(id));
    dispatch(setBrand([]));
    router.push(paths.product.root);
  };

  const renderCategories = (categories) =>
    categories?.map((category) => {
      const isOpen = openCategories[category.category_id];

      return (
        <div key={category.category_id}>
          {/* Row: category name + arrow */}
          <button
            type="button"
            onClick={() =>
              category.has_sub_cat && toggleCategory(category.category_id)
            }
            className={mergeClasses([
              "w-full flex items-center justify-between gap-2 px-2",
              category.has_sub_cat ? "cursor-pointer" : "cursor-default",
              "bg-transparent border-none outline-none p-0",
            ])}
          >
            <span
              onClick={(e) => handleClick(e, category.category_id)}
              className={mergeClasses([
                "py-3 text-sm font-medium truncate max-w-full text-left",
                isOpen
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]",
              ])}
            >
              {category.name}
            </span>

            {category.has_sub_cat && (
              <Iconify
                icon={
                  isOpen
                    ? "eva:arrow-ios-downward-fill"
                    : "eva:arrow-ios-forward-fill"
                }
                width={16}
                className={
                  isOpen
                    ? "text-[var(--text-primary)] flex-shrink-0"
                    : "text-[var(--text-secondary)] flex-shrink-0"
                }
              />
            )}
          </button>

          {/* Sub-categories collapse */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isOpen && category.has_sub_cat ? "9999px" : "0px",
              opacity: isOpen && category.has_sub_cat ? 1 : 0,
            }}
          >
            <div className="pl-4">
              {renderCategories(category.subCategories)}
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      {/* Main nav item toggle */}
      <CategoryNavItem
        title={data.title}
        icon={data.icon}
        open={open}
        onToggle={onToggle}
      />

      {/* Collapse: category list */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? "9999px" : "0px",
          opacity: open ? 1 : 0,
          paddingLeft: open ? "20px" : "20px",   // pl-[20px] = spacing(2.5)
          paddingRight: open ? "12px" : "12px",  // pr-[12px] = spacing(1.5)
        }}
      >
        {renderCategories(data.categories)}
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

export const CategoryNavItem = forwardRef((props, ref) => {
  const { icon, title, open, onToggle, className, ...other } = props;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-label={title}
      className={mergeClasses(
        [
          navSectionClasses.item.root,
          "mobile-category-nav",
          // Base layout
          "flex items-center justify-start gap-2 py-2",
          "px-5 w-full",
          "outline-none border-none",
          "transition-colors duration-200 cursor-pointer no-underline",
          // Default colour
          !open && "text-[var(--text-secondary)] bg-transparent hover:bg-[var(--action-hover)]",
          // Open colour
          open && "text-[var(--text-primary)] bg-[var(--action-hover)]",
        ],
        className
      )}
      {...other}
    >
      {/* Icon slot */}
      <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6">
        {icon}
      </span>

      {/* Title slot */}
      <span className="flex-1 text-left truncate text-sm font-semibold leading-snug px-2">
        {title}
      </span>

      {/* Arrow slot */}
      <Iconify
        icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
        className="w-4 h-4 flex-shrink-0 ml-auto opacity-60"
      />
    </button>
  );
});