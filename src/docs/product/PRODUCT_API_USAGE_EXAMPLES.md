# Product API Usage Examples

This document provides practical examples of how the frontend products API integration is implemented in the application.

---

## Table of Contents
1. [Client-Side Hooks](#client-side-hooks)
2. [Server-Side Functions](#server-side-functions)
3. [Complete Integration Examples](#complete-integration-examples)
4. [Filter Query Builder](#filter-query-builder)

---

## Client-Side Hooks

### 1. useGetProducts Hook

The `useGetProducts` hook fetches a paginated list of products with comprehensive filtering.

```javascript
import { useGetProducts, buildProductFilterQuery } from '@/api';

function ProductList() {
  // Build filter query
  const filterQuery = buildProductFilterQuery({
    search: 'laptop',
    category_id: 5,
    price_min: 500,
    price_max: 2000,
    sort_by: 'price',
    sort_order: 'asc',
    page: 1,
    per_page: 20,
  });

  const { products, pagination, isLoading, error, appliedFilters, filterValues } = useGetProducts(filterQuery);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <h2>Products ({pagination?.total || 0})</h2>
      {products.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
      {/* Pagination component */}
      <Pagination 
        current={pagination?.current_page} 
        total={pagination?.last_page} 
      />
    </div>
  );
}
```

### 2. useGetProductDetails Hook

The `useGetProductDetails` hook fetches detailed information about a single product.

```javascript
import { useGetProductDetails } from '@/api';

function ProductDetailsClient({ slug }) {
  const { product, isLoading, error } = useGetProductDetails(slug);

  if (isLoading) return <div>Loading product details...</div>;
  if (error) return <div>Product not found</div>;
  if (!product) return <div>No product data</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">${product.selling_price}</p>
      
      {/* Flash Sale Badge */}
      {product.flash_sale_products?.length > 0 && (
        <span className="badge">
          {product.flash_sale_products[0].discount_percentage}% OFF
        </span>
      )}

      {/* Product Variants */}
      {product.variants?.map(variant => (
        <div key={variant.variant_id}>
          <span>{variant.variant_name}</span>
          <span>${variant.price}</span>
        </div>
      ))}
    </div>
  );
}
```

### 3. useGetRelatedProducts Hook

The `useGetRelatedProducts` hook fetches products related to a specific product.

```javascript
import { useGetRelatedProducts } from '@/api';

function RelatedProductsSection({ productSlug }) {
  const { relatedProducts, isLoading } = useGetRelatedProducts(productSlug);

  if (isLoading) return <div>Loading related products...</div>;
  if (!relatedProducts?.length) return null;

  return (
    <div className="related-products">
      <h3>Related Products</h3>
      <div className="product-grid">
        {relatedProducts.map(product => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

---

## Server-Side Functions

### 1. getProductDetails (Server-Side)

Use this for SSR/SSG with Next.js App Router.

```javascript
// src/app/product/[slug]/page.jsx
import { getProductDetails, getRelatedProducts } from '@/api';
import { ProductDetailsView } from '@/sections/product/view';

export default async function Page({ params }) {
  const { slug } = await params;

  // Fetch product details on the server
  const product = await getProductDetails(slug);
  const relatedProducts = await getRelatedProducts(slug);

  return (
    <ProductDetailsView 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductDetails(slug);

  return {
    title: product?.name || 'Product',
    description: product?.description?.replace(/<[^>]*>/g, '').substring(0, 155),
    openGraph: {
      title: product?.name,
      description: product?.description,
      images: [product?.featured_image],
    },
  };
}
```

### 2. Server-Side Product List

```javascript
// src/app/product/page.jsx
import { getProducts } from '@/api';
import { ProductView } from '@/sections/product/view';

export default async function Page({ searchParams }) {
  // Build query from URL search params
  const params = await searchParams;
  const filterQuery = new URLSearchParams(params).toString();
  
  // Fetch products on server
  const productsData = await getProducts(filterQuery);

  return <ProductView initialData={productsData} />;
}
```

---

## Complete Integration Examples

### Full Product Listing with Filters

This example shows the complete implementation from `product-view.jsx`:

```javascript
"use client";

import { useEffect, useState } from "react";
import { useBoolean, useSetState } from "minimal-shared/hooks";
import { useSearchParams } from "next/navigation";
import { Container, Stack, Typography } from "@mui/material";

import { useGetCategories, useGetProducts, useGetBrands, buildProductFilterQuery } from "@/api";
import { ProductList } from "../product-list";
import { ProductFiltersDrawer } from "../product-filters-drawer";

const PRODUCT_SORT_OPTIONS = [
  { value: "created_at", label: "Newest", sortBy: "created_at", sortOrder: "desc" },
  { value: "name-asc", label: "Name: A - Z", sortBy: "name", sortOrder: "asc" },
  { value: "name-desc", label: "Name: Z - A", sortBy: "name", sortOrder: "desc" },
  { value: "price-desc", label: "Price: High - Low", sortBy: "price", sortOrder: "desc" },
  { value: "price-asc", label: "Price: Low - High", sortBy: "price", sortOrder: "asc" },
];

export function ProductView() {
  const openFilters = useBoolean();
  const searchParams = useSearchParams();

  // Fetch initial data for filters
  const { categories } = useGetCategories();
  const { brands } = useGetBrands();
  const { products: productList } = useGetProducts("");

  // State management
  const [sortBy, setSortBy] = useState("created_at");
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate price limits
  const minPrice = 0;
  const maxPrice = Math.max(...(productList?.map((p) => p.selling_price) || [0]));

  // Filter state
  const filters = useSetState({
    name: "",
    brand: [],
    category: "",
    priceRange: [minPrice, maxPrice],
  });

  const { state: currentFilters, setState: updateFilters } = filters;

  // Build query using helper function
  const currentSortOption = PRODUCT_SORT_OPTIONS.find(opt => opt.value === sortBy) || PRODUCT_SORT_OPTIONS[0];
  
  const productFilterQuery = buildProductFilterQuery({
    name: currentFilters.name,
    brand_id: currentFilters.brand?.length > 0 ? currentFilters.brand : undefined,
    category_id: currentFilters.category || undefined,
    price_min: currentFilters.priceRange[0] !== minPrice ? currentFilters.priceRange[0] : undefined,
    price_max: currentFilters.priceRange[1] !== maxPrice ? currentFilters.priceRange[1] : undefined,
    sort_by: currentSortOption.sortBy,
    sort_order: currentSortOption.sortOrder,
    page: currentPage,
    per_page: 20,
  });

  // Fetch filtered products
  const { products, isLoading, pagination, appliedFilters, filterValues } = useGetProducts(productFilterQuery);

  // Sync with URL params
  useEffect(() => {
    const urlName = searchParams.get("name");
    if (urlName) {
      updateFilters({ name: urlName });
      setCurrentPage(1);
    }
  }, [searchParams]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h1">Shop</Typography>
 <CustomBreadcrumbs
        links={[{ name: "Home", href: paths.home }, { name: "Shop", href: paths.product.root }, { name: name }]}
        sx={{ mb: 5 }}
      />
      <Stack spacing={3}>
        <ProductFiltersDrawer
          filters={filters}
          open={openFilters.value}
          onClose={openFilters.onFalse}
          brands={brands}
          categories={categories}
        />

        <ProductList
          products={products}
          loading={isLoading}
          pagination={pagination}
          onPageChange={setCurrentPage}
        />
      </Stack>
    </Container>
  );
}
```

---

## Filter Query Builder

### Using buildProductFilterQuery Helper

The `buildProductFilterQuery` helper function makes it easy to construct query parameters:

```javascript
import { buildProductFilterQuery } from '@/api';

// Basic usage
const query1 = buildProductFilterQuery({
  search: 'laptop',
  page: 1,
  per_page: 20,
});
// Result: "search=laptop&page=1&per_page=20"

// With multiple filters
const query2 = buildProductFilterQuery({
  search: 'wireless headphones',
  category_id: 5,
  brand_id: [1, 3, 5], // Multiple brands
  price_min: 100,
  price_max: 500,
  featured: true,
  sort_by: 'price',
  sort_order: 'asc',
  page: 1,
  per_page: 24,
});
// Result: "search=wireless+headphones&category_id=5&brand_id=1,3,5&price_min=100&price_max=500&featured=true&sort_by=price&sort_order=asc&page=1&per_page=24"

// Flash sale products only
const query3 = buildProductFilterQuery({
  flash_sale: true,
  sort_by: 'price',
  sort_order: 'asc',
});
// Result: "flash_sale=true&sort_by=price&sort_order=asc"

// New arrivals
const query4 = buildProductFilterQuery({
  new_arrivals: true,
  sort_by: 'created_at',
  sort_order: 'desc',
});
// Result: "new_arrivals=true&sort_by=created_at&sort_order=desc"
```

### Manual Query Building

If you prefer to build queries manually:

```javascript
const params = new URLSearchParams();

// Add search
if (searchTerm) params.append('search', searchTerm);

// Add category
if (categoryId) params.append('category_id', categoryId);

// Add multiple brands
if (brandIds.length > 0) params.append('brand_id', brandIds.join(','));

// Add price range
if (minPrice) params.append('price_min', minPrice);
if (maxPrice) params.append('price_max', maxPrice);

// Add sorting
params.append('sort_by', 'price');
params.append('sort_order', 'asc');

// Add pagination
params.append('page', 1);
params.append('per_page', 20);

const queryString = params.toString();
```

---

## Advanced Usage Examples

### Dynamic Filter Updates

```javascript
function ProductFilterPanel() {
  const [filters, setFilters] = useState({
    search: '',
    category_id: null,
    brand_id: [],
    price_min: 0,
    price_max: 10000,
    featured: false,
    flash_sale: false,
    sort_by: 'created_at',
    sort_order: 'desc',
    page: 1,
    per_page: 20,
  });

  // Update single filter
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      ...filters,
      search: '',
      category_id: null,
      brand_id: [],
      price_min: 0,
      price_max: 10000,
      featured: false,
      flash_sale: false,
      page: 1,
    });
  };

  const queryString = buildProductFilterQuery(filters);
  const { products, isLoading, pagination } = useGetProducts(queryString);

  return (
    <div>
      <input 
        value={filters.search}
        onChange={(e) => updateFilter('search', e.target.value)}
        placeholder="Search products..."
      />
      
      <button onClick={() => updateFilter('featured', !filters.featured)}>
        {filters.featured ? 'All Products' : 'Featured Only'}
      </button>

      <button onClick={clearFilters}>Clear Filters</button>

      {/* Product list */}
      {products.map(product => <ProductCard key={product.product_id} product={product} />)}
    </div>
  );
}
```

### Caching and Performance

```javascript
import { useGetProducts } from '@/api';

function ProductListOptimized() {
  const [query, setQuery] = useState('');

  // SWR automatically caches results
  const { products, isLoading, mutate } = useGetProducts(query);

  // Manually revalidate data
  const refreshProducts = () => {
    mutate();
  };

  // Prefetch next page
  const prefetchNextPage = (currentPage) => {
    const nextQuery = buildProductFilterQuery({ page: currentPage + 1 });
    // SWR will cache this for instant loading
    useGetProducts(nextQuery);
  };

  return (
    <div>
      <button onClick={refreshProducts}>Refresh</button>
      {products.map(product => <ProductCard key={product.product_id} product={product} />)}
    </div>
  );
}
```

### URL State Synchronization

```javascript
import { useRouter, useSearchParams } from 'next/navigation';

function ProductsWithURLSync() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filters from URL
  const filters = {
    search: searchParams.get('search') || '',
    category_id: searchParams.get('category_id') || null,
    page: parseInt(searchParams.get('page') || '1'),
  };

  const queryString = buildProductFilterQuery(filters);
  const { products, pagination } = useGetProducts(queryString);

  // Update URL when filters change
  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(newFilters);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div>
      <input
        value={filters.search}
        onChange={(e) => updateFilters({ ...filters, search: e.target.value, page: 1 })}
      />
      {products.map(product => <ProductCard key={product.product_id} product={product} />)}
    </div>
  );
}
```

---

## API Response Structure

### Products List Response

```javascript
{
  status: true,
  message: "Products fetched successfully",
  data: [
    {
      product_id: 123,
      name: "Premium Wireless Headphones",
      slug: "premium-wireless-headphones",
      sku: "WH-001",
      description: "High-quality wireless headphones",
      featured_image: "https://example.com/image.jpg",
      price: 299.99,
      selling_price: 254.99,
      product_type: "variable",
      is_featured: true,
      categories: [...],
      brand: {...},
      variants: [...],
      flash_sale_products: [...]
    }
  ],
  pagination: {
    total: 150,
    per_page: 20,
    current_page: 1,
    last_page: 8,
    from: 1,
    to: 20
  },
  applied_filters: {...},
  filter_values: {...}
}
```

### Product Details Response

```javascript
{
  status: true,
  message: "Product details loaded successfully",
  data: {
    product_id: 123,
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    // ... complete product information
    descriptions: [...],
    variants: [...],
    product_galleries: [...],
    flash_sale_products: [...],
    membership_plans: [...]
  }
}
```

---

## Error Handling

```javascript
function ProductListWithErrorHandling() {
  const { products, isLoading, error } = useGetProducts(queryString);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h3>Failed to load products</h3>
        <p>{error.message || 'Please try again later'}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty">
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
}
```

---

## Best Practices

1. **Use buildProductFilterQuery**: Always use the helper function to ensure consistent query formatting
2. **Handle Loading States**: Always show loading indicators while fetching
3. **Error Boundaries**: Implement error handling for failed requests
4. **Pagination**: Reset to page 1 when filters change
5. **URL Sync**: Sync filter state with URL for shareable links
6. **SWR Caching**: Leverage SWR's automatic caching and revalidation
7. **Type Safety**: Use TypeScript interfaces for product data structures

---

**Document Version**: 1.0.0  
**Last Updated**: January 18, 2026  
**Related Files**:
- `src/api/product.js` - Client-side hooks
- `src/api/product.server.js` - Server-side functions
- `src/sections/product/view/product-view.jsx` - Main implementation
