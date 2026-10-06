
import { paths } from "@/routes/paths";

import { ProductItem } from "./product-item";
import { ProductItemSkeleton } from "./product-skeleton";

// ----------------------------------------------------------------------

export function ProductList({ products = [], loading, pagination, onPageChange, className, ...other }) {
  const handlePageChange = (value) => {
    onPageChange(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderLoading = () => <ProductItemSkeleton />;

  const renderList = () => {
    if (!Array.isArray(products) || products.length === 0) {
      return null;
    }
    return products.map((product) => (
      <ProductItem
        key={product.product_id}
        product={product}
        detailsHref={paths.product.details(product.slug)}
      />
    ));
  };

  return (
    <>
      <div
        className={`grid gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 ${className || ""}`}
        {...other}
      >
        {loading ? renderLoading() : renderList()}
      </div>

      {pagination && pagination.last_page > 1 && (
        <div className="mt-3 md:mt-3 flex justify-center">
          {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 w-5 h-5 rounded-full text-sm font-medium transition-colors
                ${page === pagination.current_page
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </>
  );
}