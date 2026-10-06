
import { useCallback } from "react";
import { usePopover, usePopoverHover } from "minimal-shared/hooks";

import { useRouter } from "@/routes/hooks";
import { paths } from "@/routes/paths";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCategory, setBrand } from "@/redux/actions";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function CategoryPopover({ categories }) {
  const { open, anchorEl, onClose, onOpen } = usePopover();
  const { vendor } = useAppSelector((state) => state.vendor);

  const renderButton = () => (
    <div
      onClick={onOpen}
      className="flex w-[200px] cursor-pointer items-center justify-between bg-gray-500/[0.08] p-2"
    >
      {/* gap: 0.5 (4px) → gap-1 */}
      <div className="flex items-center gap-2">
        {/*
          IconButton disableRipple → plain <button> with no ring/ripple
          color: vendor?.primary_color || primary.main → inline style via CSS var
        */}
        <button
          type="button"
          tabIndex={-1}
          className=" shrink-0 appearance-none items-center justify-center border-0 bg-transparent p-0 outline-none"
          style={{ color: vendor?.primary_color || "var(--color-primary, #1976d2)" }}
        >
          {/* width={18} → h-[18px] w-[18px] */}
          <Iconify icon="iconamoon:category-light" className="h-[18px] w-[18px]" />
        </button>

        {/* Typography variant="p", fontWeight 600, fontSize 14px */}
        <span className="text-[14px] font-semibold leading-none text-[#000000]">Categories</span>
      </div>

      <Iconify icon="eva:chevron-right-outline" className="h-5 w-5 shrink-0" />
    </div>
  );

  const renderList = () =>
    open && (
      <CategoryDropdown anchorEl={anchorEl} onClose={onClose}>
        <ul className="w-[250px] py-1">
          {categories?.map((category) => (
            <CategoryItem
              key={category.category_id}
              category={category}
            />
          ))}
        </ul>
      </CategoryDropdown>
    );

  return (
    <>
      {renderButton()}
      {renderList()}
    </>
  );
}

// ----------------------------------------------------------------------
// Main dropdown panel — replaces <CustomPopover> (no arrow, anchored below)

function CategoryDropdown({ anchorEl, onClose, children }) {
  const rect = anchorEl?.getBoundingClientRect?.();
  const top = rect ? rect.bottom + window.scrollY + 4 : 0; // mt: 0.5 → 4px
  const left = rect ? rect.left + window.scrollX : 0;

  return (
    <>
      {/* Invisible backdrop closes the popover on outside click */}
      <div className="fixed inset-0 z-[1200]" onClick={onClose} />

      <div
        style={{ top, left }}
        className="fixed z-[1300] overflow-hidden border border-black/[0.06] bg-white shadow-[0_8px_16px_0_rgba(145,158,171,0.24)] border-white/[0.08] bg-neutral-800"
      >
        {children}
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

function CategoryItem({ category }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { category_id, has_sub_cat, subCategories } = category;

  const { open, onOpen, onClose, elementRef, anchorEl } = usePopoverHover();

  const handleOpenMenu = useCallback(() => {
    if (has_sub_cat) onOpen();
  }, [has_sub_cat, onOpen]);

  const handleSelectCategory = (categoryId) => {
    dispatch(setCategory(categoryId));
    dispatch(setBrand([]));
    router.push(paths.product.root);
  };

  const renderDropdown = () =>
    open && (
      <SubCategoryDropdown
        anchorEl={anchorEl}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <ul className="p-2">
          {subCategories?.map((subCategory) => (

            <li
              key={subCategory.category_id}
              onClick={() => handleSelectCategory(subCategory.category_id)}
              className="cursor-pointer px-2 py-2 text-sm font-medium transition-colors bg-white/10"
            >
              {subCategory.name}
            </li>
          ))}
        </ul>
      </SubCategoryDropdown>
    );

  const renderItem = () => (
    /*
      MenuItem → <li>
      height: 48 → h-12
      Avatar width:24 height:24 → h-6 w-6 rounded-full object-cover
      Box span flexGrow:1 fontWeightMedium → <span class="grow font-medium">
    */
    <li
      ref={elementRef}
      onMouseEnter={handleOpenMenu}
      onMouseLeave={onClose}
      onClick={() => handleSelectCategory(category_id)}
      className="flex h-10 cursor-pointer items-center gap-2 px-2  bg-white/10"
    >
      <img
        alt={category.name}
        title={category.name}
        src={category.web_image}
        className="h-8 w-8 shrink-0 shadow-md object-cover"
      />

      <span className="grow text-sm font-medium">{category.name}</span>

      {has_sub_cat && (
        <Iconify icon="mingcute:right-line" className="h-4 w-4 shrink-0 text-gray-400" />
      )}
    </li>
  );

  return (
    <>
      {renderItem()}
      {renderDropdown()}
    </>
  );
}

function SubCategoryDropdown({ anchorEl, onMouseEnter, onMouseLeave, children }) {
  const rect = anchorEl?.getBoundingClientRect?.();
  const top = rect ? rect.top + window.scrollY : 0;
  const left = rect ? rect.right + window.scrollX : 0;

  return (
    <div
      style={{ top, left }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed z-[1400] min-w-[180px] overflow-hidden pb-2 border border-black/[0.06] bg-white shadow-[0_8px_16px_0_rgba(145,158,171,0.24)] bg-neutral-800"
    >
      {children}
    </div>
  );
}