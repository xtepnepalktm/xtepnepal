"use client";

import { useEffect, useState } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { setCategory } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { Iconify } from "@/components/iconify";

import { ProductItem } from "../product/product-item";

import { useGetProducts } from "@/api";

export function CategoryList({ categories, className = "", ...other }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const productFilterQuery = generateQueryParams();

  const { products } = useGetProducts(productFilterQuery);

  useEffect(() => {
    setSelectedCategories(categories);
  }, [categories]);

  function generateQueryParams() {
    const params = new URLSearchParams();

    if (selectedCategory?.category_id) {
      params.append("category", selectedCategory.category_id);
    }

    return params;
  }

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedCategories(categories);
  };

  const handleClick = (category) => {
    const { category_id, has_sub_cat, subCategories } = category;

    if (has_sub_cat) {
      setSelectedCategory(category);
      setSelectedCategories(subCategories);
    } else {
      dispatch(setCategory(category_id));
      router.push(paths.product.root);
    }
  };

  return (
    <div className={`space-y-6 ${className}`} {...other}>
      {selectedCategory && (
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2  border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Iconify icon="eva:arrow-ios-back-fill" />
          Back to Main Categories
        </button>
      )}

      {/* Categories Grid */}
      <div
        className="
          grid gap-6
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
        "
      >
        {selectedCategories
          ?.filter(
            (c) =>
              c.show_in_home === true &&
              c.show_in_navbar === true &&
              c.show_in_footer === false
          )
          .map((category) => (
            <CategoryItem
              key={category.category_id}
              category={category}
              onClick={() => handleClick(category)}
            />
          ))}
      </div>

      {/* Products */}
      {selectedCategory && !!products?.length && (
        <>
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategory.name} Products
          </h2>

          <div
            className="
              grid gap-6
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
            "
          >
            {products?.map((product) => (
              <ProductItem
                key={product.product_id}
                product={product}
                detailsHref={paths.product.details(product.slug)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CategoryItem({ category, onClick }) {
  const { name, web_image, has_sub_cat } = category;

  return (
    <div
      onClick={onClick}
      className="group relative flex h-48 cursor-pointer flex-col justify-end overflow-hidden  shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-gray-900/10 md:h-56"
    >
      <img
        alt={name}
        src={web_image || ""}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Content at the bottom */}
      <div className="relative z-10 flex w-full items-center justify-between p-4 md:p-5">
        <h3 className="line-clamp-2 text-sm font-bold leading-tight text-white md:text-base">
          {name}
        </h3>
        {has_sub_cat && (
          <Iconify
            icon="mingcute:right-line"
            className="h-5 w-5 flex-shrink-0 text-white/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
          />
        )}
      </div>
    </div>
  );
}