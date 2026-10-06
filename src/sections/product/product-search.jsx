
"use client";

import { useState, useCallback, useEffect } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useDebounce } from "minimal-shared/hooks";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { Iconify } from "@/components/iconify";
import { SearchNotFound } from "@/components/search-not-found";

// ----------------------------------------------------------------------

export function ProductSearch({
  products,
  productsLoading,
  filters,
  className = "",
}) {
  const { setState: updateFilters } = filters;

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(searchQuery);

  useEffect(() => {
    updateFilters({ name: debouncedQuery });
  }, [debouncedQuery]);

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
    setIsOpen(true);
  };

  const handleChange = useCallback(
    (item) => {
      setSelectedItem(item);

      if (item) {
        router.push(paths.product.details(item.slug));
        setIsOpen(false);
      }
    },
    [router]
  );

  const filteredProducts = products?.filter((product) => {
    const searchText =
      `${product.name} ${product.sku}`.toLowerCase();

    return searchText.includes(searchQuery.toLowerCase());
  });

  return (
    <div
      className={`relative w-full sm:w-[260px] ${className}`}
    >
      {/* Input */}
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400">
          <Iconify
            icon="eva:search-fill"
            className="h-5 w-5"
          />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQuery}
          onFocus={() => setIsOpen(true)}
          placeholder="Search..."
          className="h-11 w-full  border border-gray-300 bg-white pl-11 pr-10 text-sm outline-none transition-all focus:border-black"
        />

        {/* Loader */}
        {productsLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Iconify
              icon="svg-spinners:8-dots-rotate"
              className="h-5 w-5"
            />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && searchQuery && (
        <div className="absolute z-50 mt-2 max-h-[360px] w-full overflow-y-auto border border-gray-200 bg-white shadow-xl">
          {filteredProducts?.length ? (
            <ul className="py-2">
              {filteredProducts.map((product) => {
                const matches = match(
                  product.name,
                  searchQuery
                );

                const parts = parse(
                  product.name,
                  matches
                );

                return (
                  <li
                    key={product.product_id}
                    onClick={() => handleChange(product)}
                    className="cursor-pointer px-3 py-2 transition hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      {/* Image */}
                      <img
                        src={
                          product.featured_image
                            ? product.featured_image
                            : ""
                        }
                        alt={product.name}
                        className="h-12 w-12 flex-shrink-0  object-cover"
                      />

                      {/* Product Name */}
                      <div className="flex flex-wrap text-sm">
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            className={`${part.highlight
                              ? "font-semibold text-black"
                              : "font-medium text-gray-700"
                              }`}
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-4">
              <SearchNotFound query={debouncedQuery} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}