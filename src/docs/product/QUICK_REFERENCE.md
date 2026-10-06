# Product API Quick Reference

Quick reference guide for the frontend products API integration.

---

## 🚀 Quick Start

### 1. Import the API
```javascript
import { 
  useGetProducts, 
  useGetProductDetails, 
  useGetRelatedProducts,
  buildProductFilterQuery 
} from '@/api';
```

### 2. Basic Product List
```javascript
const query = buildProductFilterQuery({ page: 1, per_page: 20 });
const { products, isLoading } = useGetProducts(query);
```

### 3. Product Details
```javascript
const { product, isLoading } = useGetProductDetails('product-slug');
```

### 4. Related Products
```javascript
const { relatedProducts } = useGetRelatedProducts('product-slug');
```

---

## 📋 Filter Options

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `search` | string | `'laptop'` | Search products |
| `category_id` | number | `5` | Filter by category |
| `brand_id` | number/array | `[1,3,5]` | Filter by brand(s) |
| `product_type` | string | `'variable'` | Filter by type |
| `price_min` | number | `500` | Min price |
| `price_max` | number | `2000` | Max price |
| `featured` | boolean | `true` | Featured only |
| `flash_sale` | boolean | `true` | Flash sale only |
| `new_arrivals` | boolean | `true` | New products |
| `sort_by` | string | `'price'` | Sort field |
| `sort_order` | string | `'asc'` | Sort direction |
| `page` | number | `1` | Page number |
| `per_page` | number | `20` | Items per page |

---

## 🔤 Sort Options

```javascript
const SORT_OPTIONS = [
  { sortBy: 'created_at', sortOrder: 'desc' }, // Newest first
  { sortBy: 'name', sortOrder: 'asc' },        // A to Z
  { sortBy: 'name', sortOrder: 'desc' },       // Z to A
  { sortBy: 'price', sortOrder: 'asc' },       // Low to High
  { sortBy: 'price', sortOrder: 'desc' },      // High to Low
];
```

---

## 💡 Common Patterns

### Search with Filters
```javascript
const query = buildProductFilterQuery({
  search: 'wireless',
  category_id: 5,
  price_min: 100,
  price_max: 500,
  sort_by: 'price',
  sort_order: 'asc',
  page: 1,
  per_page: 20,
});
const { products, pagination } = useGetProducts(query);
```

### Featured Products
```javascript
const query = buildProductFilterQuery({
  featured: true,
  sort_by: 'created_at',
  sort_order: 'desc',
  per_page: 10,
});
const { products } = useGetProducts(query);
```

### Flash Sale Products
```javascript
const query = buildProductFilterQuery({
  flash_sale: true,
  sort_by: 'price',
  sort_order: 'asc',
});
const { products } = useGetProducts(query);
```

### Category with Brands
```javascript
const query = buildProductFilterQuery({
  category_id: 5,
  brand_id: [1, 3, 5],
  page: 1,
});
const { products } = useGetProducts(query);
```

---

## 📦 Response Structure

### Products List
```javascript
{
  products: [...],          // Array of products
  pagination: {
    total: 150,
    per_page: 20,
    current_page: 1,
    last_page: 8,
    from: 1,
    to: 20
  },
  appliedFilters: {...},    // Current filters
  filterValues: {...},      // Available filter options
  isLoading: false,
  error: null,
  mutate: fn()              // Revalidate function
}
```

### Product Object
```javascript
{
  product_id: 123,
  name: "Product Name",
  slug: "product-name",
  sku: "SKU-001",
  description: "...",
  featured_image: "url",
  price: 299.99,
  selling_price: 254.99,
  product_type: "variable",
  is_featured: true,
  categories: [...],
  brand: {...},
  variants: [...],
  product_galleries: [...],
  flash_sale_products: [...]
}
```

---

## 🎯 Use Cases

### 1. Product Listing Page
```javascript
function ProductsPage() {
  const [page, setPage] = useState(1);
  const query = buildProductFilterQuery({ page, per_page: 20 });
  const { products, pagination, isLoading } = useGetProducts(query);
  
  return (
    <>
      {products.map(p => <ProductCard key={p.product_id} product={p} />)}
      <Pagination page={page} total={pagination?.last_page} onChange={setPage} />
    </>
  );
}
```

### 2. Category Page
```javascript
function CategoryPage({ categoryId }) {
  const query = buildProductFilterQuery({ 
    category_id: categoryId,
    page: 1,
    per_page: 24 
  });
  const { products, isLoading } = useGetProducts(query);
  
  return <ProductGrid products={products} loading={isLoading} />;
}
```

### 3. Search Results
```javascript
function SearchResults({ searchTerm }) {
  const query = buildProductFilterQuery({ 
    search: searchTerm,
    per_page: 20 
  });
  const { products, pagination } = useGetProducts(query);
  
  return (
    <>
      <h2>Search Results ({pagination?.total || 0})</h2>
      <ProductList products={products} />
    </>
  );
}
```

### 4. Product Detail Page (Client)
```javascript
function ProductDetail({ slug }) {
  const { product, isLoading } = useGetProductDetails(slug);
  const { relatedProducts } = useGetRelatedProducts(slug);
  
  if (isLoading) return <Loading />;
  
  return (
    <>
      <ProductInfo product={product} />
      <RelatedProducts products={relatedProducts} />
    </>
  );
}
```

### 5. Product Detail Page (Server)
```javascript
// app/product/[slug]/page.jsx
export default async function Page({ params }) {
  const { slug } = await params;
  const product = await getProductDetails(slug);
  const relatedProducts = await getRelatedProducts(slug);
  
  return <ProductDetailsView product={product} relatedProducts={relatedProducts} />;
}
```

---

## 🛠️ Helper Functions

### Build Query String
```javascript
const query = buildProductFilterQuery({
  search: 'laptop',
  category_id: 5,
  page: 1
});
// Returns: "search=laptop&category_id=5&page=1"
```

### Multiple Brands
```javascript
const query = buildProductFilterQuery({
  brand_id: [1, 3, 5]
});
// Returns: "brand_id=1,3,5"
```

### Price Range
```javascript
const query = buildProductFilterQuery({
  price_min: 100,
  price_max: 500
});
// Returns: "price_min=100&price_max=500"
```

---

## ⚠️ Error Handling

```javascript
const { products, isLoading, error } = useGetProducts(query);

if (isLoading) return <Loading />;
if (error) return <Error message={error.message} />;
if (!products?.length) return <Empty />;

return <ProductList products={products} />;
```

---

## 🔄 Revalidation

```javascript
const { products, mutate } = useGetProducts(query);

// Manually refresh data
const refresh = () => mutate();

// Auto-revalidate on interval
useEffect(() => {
  const interval = setInterval(mutate, 60000); // Every minute
  return () => clearInterval(interval);
}, [mutate]);
```

---

## 📱 Responsive Pagination

```javascript
function ResponsivePagination({ pagination, onChange }) {
  const itemsPerPage = useMediaQuery('(max-width:600px)') ? 12 : 20;
  
  const query = buildProductFilterQuery({
    page: pagination.current_page,
    per_page: itemsPerPage
  });
  
  const { products } = useGetProducts(query);
  
  return <ProductGrid products={products} />;
}
```

---

## 🎨 Loading States

```javascript
function ProductList() {
  const { products, isLoading } = useGetProducts(query);
  
  if (isLoading) {
    return (
      <div className="grid">
        {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
      </div>
    );
  }
  
  return products.map(p => <ProductCard key={p.product_id} product={p} />);
}
```

---

## 🔍 Filter Combinations

### New Arrivals in Category
```javascript
buildProductFilterQuery({
  category_id: 5,
  new_arrivals: true,
  sort_by: 'created_at',
  sort_order: 'desc'
})
```

### Featured Flash Sale Products
```javascript
buildProductFilterQuery({
  featured: true,
  flash_sale: true,
  sort_by: 'price',
  sort_order: 'asc'
})
```

### Budget Products
```javascript
buildProductFilterQuery({
  price_max: 100,
  sort_by: 'price',
  sort_order: 'asc'
})
```

### Premium Products
```javascript
buildProductFilterQuery({
  price_min: 1000,
  featured: true,
  sort_by: 'price',
  sort_order: 'desc'
})
```

---

## 📊 Filter Values

Access available filter options from the API:

```javascript
const { filterValues } = useGetProducts(query);

// filterValues contains:
{
  categories: [...],        // Available categories
  brands: [...],           // Available brands
  product_types: [...],    // Available product types
  price_range: {           // Price range
    min: 10.00,
    max: 9999.99
  }
}
```

---

## 🚦 Status Flags

Check product status:

```javascript
const product = {
  is_active: true,         // Product is active
  is_featured: true,       // Featured product
  flash_sale_products: [], // Has flash sale
  variants: []             // Has variants
};

// Check flash sale
const hasFlashSale = product.flash_sale_products?.length > 0;

// Get discount
const discount = product.flash_sale_products?.[0]?.discount_percentage;

// Check availability
const isAvailable = product.is_active && 
  (product.product_type === 'simple' || product.variants?.length > 0);
```

---

## 📄 Files Reference

- **Hooks**: `src/api/product.js`
- **Server**: `src/api/product.server.js`
- **View**: `src/sections/product/view/product-view.jsx`
- **Docs**: `src/docs/product/PRODUCT_API_USAGE_EXAMPLES.md`

---

**Quick Reference Version**: 1.0.0  
**Last Updated**: January 18, 2026
