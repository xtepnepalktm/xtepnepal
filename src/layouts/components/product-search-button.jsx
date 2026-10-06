
import { useDebounce } from "minimal-shared/hooks";
import { useState, useCallback, useRef, useEffect } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Combobox } from "@headlessui/react";

import { useRouter } from "@/routes/hooks";
import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { useGetProducts } from "@/api";

import { Iconify } from "@/components/iconify";
import { SearchNotFound } from "@/components/search-not-found";

// ----------------------------------------------------------------------

export function ProductSearchButton({ className = "", sx, ...other }) {
  const popoverRef = useRef(null);
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const router = useRouter();

  const debouncedQuery = useDebounce(searchQuery);
  const searchParams = debouncedQuery ? `name=${encodeURIComponent(debouncedQuery)}` : "";
  const { products, isLoading } = useGetProducts(searchParams);

  // Close popover on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleChange = useCallback(
    (item) => {
      if (!item) return;
      setSelectedItem(item);
      if (item.isViewAllOption) {
        router.push(`${paths.product.root}?name=${encodeURIComponent(item.searchQuery)}`);
      } else {
        router.push(paths.product.details(item.slug));
      }
      setOpen(false);
    },
    [router]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`${paths.product.root}?name=${encodeURIComponent(searchQuery.trim())}`);
      setOpen(false);
    }
  };

  // Build filtered options list with "View all results" prepended
  const filteredOptions = (() => {
    if (!searchQuery.trim()) return [];
    return [
      {
        isViewAllOption: true,
        searchQuery: searchQuery.trim(),
        name: searchQuery.trim(),
        product_id: "view-all",
      },
      ...(products || []),
    ];
  })();

  return (
    <div className="relative lg:hidden flex items-center" {...other}>
      {/* Trigger button */}
      <button
        ref={anchorRef}
        onClick={() => setOpen((v) => !v)}
        aria-label="Product Search button"
        className={`inline-flex items-center justify-center p-2  bg-transparent border-none cursor-pointer text-current outline-none
          focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          hover:opacity-80 transition-opacity ${className}`}
      >
        <Iconify icon="mingcute:search-line" width={24} />
      </button>

      {/* Popover panel */}
      {open && (
        <div
          ref={popoverRef}
          className="fixed left-4 right-4 top-[72px] sm:absolute sm:top-auto sm:-right-1 sm:left-auto sm:mt-4 sm:w-80  bg-white shadow-2xl z-[1300] overflow-hidden"
        >
          <Combobox value={selectedItem} onChange={handleChange}>
            {/* Search input */}
            <div className="flex items-center border-b border-gray-100 px-3">
              <span className="text-gray-400 mr-2 flex-shrink-0">
                <Iconify icon="eva:search-fill" width={20} />
              </span>

              <Combobox.Input
                autoFocus
                placeholder="Search for products..."
                displayValue={(item) => item?.name ?? ""}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full py-3 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none"
              />

              {isLoading && (
                <span className="ml-2 text-blue-500 flex-shrink-0">
                  <Iconify icon="svg-spinners:8-dots-rotate" width={18} />
                </span>
              )}
            </div>

            {/* Options list */}
            <Combobox.Options static className="max-h-72 overflow-y-auto py-1 focus:outline-none">
              {filteredOptions.length === 0 && debouncedQuery ? (
                <li className="px-2 py-1">
                  <SearchNotFound query={debouncedQuery} />
                </li>
              ) : (
                filteredOptions.map((product) => {
                  if (product.isViewAllOption) {
                    return (
                      <Combobox.Option
                        key="view-all"
                        value={product}
                        className={({ active }) =>
                          `mx-1 my-0.5  cursor-pointer ${active ? "bg-gray-50" : ""}`
                        }
                      >
                        <RouterLink
                          href={`${paths.product.root}?name=${encodeURIComponent(product.searchQuery)}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-1 p-1 no-underline text-inherit w-full"
                        >
                          <span className="flex items-center justify-center w-6 h-6  bg-blue-50 text-blue-600 flex-shrink-0">
                            <Iconify icon="eva:search-fill" width={18} />
                          </span>
                          <span className="text-sm font-semibold text-blue-600 truncate">
                            {product.name}
                          </span>
                        </RouterLink>
                      </Combobox.Option>
                    );
                  }

                  const matches = match(product.name, searchQuery);
                  const parts = parse(product.name, matches);

                  return (
                    <Combobox.Option
                      key={product.product_id}
                      value={product}
                      className={({ active }) =>
                        `mx-1 my-0.5  cursor-pointer ${active ? "bg-gray-50" : ""}`
                      }
                    >
                      <RouterLink
                        href={paths.product.details(product.slug)}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-1 p-2 no-underline text-inherit w-full"
                      >
                        <img
                          src={product.featured_image || ""}
                          alt={product.name}
                          className="w-5 h-5  object-cover flex-shrink-0 bg-gray-100"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-snug truncate">
                            {parts.map((part, index) => (
                              <span
                                key={index}
                                className={
                                  part.highlight
                                    ? "font-semibold text-blue-600"
                                    : "font-medium text-gray-800"
                                }
                              >
                                {part.text}
                              </span>
                            ))}
                          </p>
                        </div>
                      </RouterLink>
                    </Combobox.Option>
                  );
                })
              )}
            </Combobox.Options>
          </Combobox>
        </div>
      )}
    </div>
  );
}