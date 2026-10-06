# Frontend Products API Integration Guide

This document provides comprehensive details for integrating the products-related API endpoints in your frontend application.

---

## Table of Contents
1. [Overview](#overview)
2. [Authentication & Headers](#authentication--headers)
3. [API Endpoints](#api-endpoints)
   - [Get Products List](#1-get-products-list)
   - [Get Product Details](#2-get-product-details)
   - [Get Related Products](#3-get-related-products)
4. [Response Structure](#response-structure)
5. [Error Handling](#error-handling)
6. [Integration Examples](#integration-examples)

---

## Overview

The Products API provides three main endpoints for managing product display in your e-commerce frontend:

- **Products List**: Browse and filter all available products
- **Product Details**: Get comprehensive information about a single product
- **Related Products**: Find products related to a specific product

All endpoints require vendor verification via the `vendor.verify` middleware.

---

## Authentication & Headers

### Required Headers

```http
X-Requested-With: XMLHttpRequest
Content-Type: application/json
```

### Vendor Identification

The vendor is automatically identified through the middleware using:
- Domain-based identification
- Subdomain routing
- Custom vendor headers (implementation specific)

**Note**: The vendor is attached to the request by the `vendor.verify` middleware and does not need to be passed explicitly.

---

## API Endpoints

### 1. Get Products List

Retrieve a paginated list of products with comprehensive filtering and sorting options.

#### Endpoint
```
GET /products
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | - | Search in product name, SKU, or description |
| `category` or `category_id` | integer | - | Filter by category ID (includes subcategories). Note: Products can belong to multiple categories |
| `brand` or `brand_id` | string/array | - | Filter by brand ID(s). Multiple brands: comma-separated |
| `product_type` | string | - | Filter by type: `simple`, `variable`, or `service` |
| `name` | string | - | Filter by product name (alternative to search) |
| `price_min` or `min_price` | number | - | Minimum price filter |
| `price_max` or `max_price` | number | - | Maximum price filter |
| `featured` | boolean | false | Show only featured products |
| `flash_sale` | boolean | false | Show only products in active flash sales |
| `new_arrivals` | boolean | false | Show products from last 30 days |
| `sort_by` or `order_by` | string | `created_at` | Sort field: `created_at`, `product_id`, `name`, `price`, `sku` |
| `sort_order` | string | `desc` | Sort direction: `asc` or `desc` |
| `per_page` | integer | 15 | Items per page (1-100) |
| `page` | integer | 1 | Current page number |

#### Legacy `order_by` Values

The API also supports legacy ordering formats:

| Value | Equivalent |
|-------|------------|
| `price-asc` or `price_asc` | Sort by price ascending |
| `price-desc` or `price_desc` | Sort by price descending |
| `name-asc` or `name_asc` | Sort by name A-Z |
| `name-desc` or `name_desc` | Sort by name Z-A |
| `newest` | Sort by newest first |
| `oldest` | Sort by oldest first |
| `popular` | Sort by popularity (defaults to newest) |

#### Example Requests

**Basic request:**
```http
GET /products?per_page=20&page=1
```

**Search with filters:**
```http
GET /products?search=laptop&category_id=5&price_min=500&price_max=2000&sort_by=price&sort_order=asc
```

**Multiple brands filter:**
```http
GET /products?brand_id=1,3,5&featured=true
```

**Flash sale products:**
```http
GET /products?flash_sale=true&sort_by=price&sort_order=asc
```

#### Success Response (200)

```json
{
  "status": 200,
  "success": true,
  "message": "Products fetched successfully",
  "data": {
    "data": [
    {
      "product_id": 123,
      "name": "Premium Wireless Headphones",
      "slug": "premium-wireless-headphones",
      "sku": "WH-001",
      "description": "High-quality wireless headphones with noise cancellation",
      "descriptions": [
        {
          "id": 1,
          "title": "Features",
          "description": "Active noise cancellation, 30-hour battery life",
          "is_active": true
        }
      ],
      "featured_image": "https://example.com/uploads/products/headphones.jpg",
      "price": "299.99",
      "taxable_amount": "270.00",
      "vat": "29.99",
      "selling_price": {
        "flashSalePrice": "254.99",
        "regularPrice": "299.99"
      },
      "product_type": "variable",
      "is_active": true,
      "is_featured": true,
      "created_at": "2026-01-15T10:30:00.000000Z",
      "categories": [
        {
          "category_id": 5,
          "category_name": "Electronics",
          "web_image": "https://example.com/uploads/categories/electronics.jpg",
          "mobile_image": "https://example.com/uploads/categories/electronics-mobile.jpg",
          "is_primary": true
        }
      ],
      "brand": {
        "brand_id": 12,
        "brand_name": "AudioTech",
        "brand_image": "https://example.com/uploads/brands/audiotech.jpg"
      },
      "unit": {
        "id": 1,
        "name": "Piece",
        "short_name": "pc"
      },
      "variants": [
        {
          "variant_id": 456,
          "variant_name": "Black - Large",
          "variant_sku": "WH-001-BL-L",
          "price": "299.99",
          "taxable_amount": "270.00",
          "vat": "29.99",
          "image": "https://example.com/uploads/variants/wh-black.jpg",
          "is_active": true
        }
      ],
      "product_galleries": [
        {
          "id": 789,
          "image": "https://example.com/uploads/galleries/wh-gallery-1.jpg"
        }
      ],
      "flash_sale_products": [
        {
          "id": 101,
          "flash_sale_id": 15,
          "discount_percentage": "15.00",
          "discount_amount": "45.00",
          "quantity": 100,
          "sold_count": 23,
          "available_quantity": 77
        }
      ]
    }
    ],
    "pagination": {
      "current_page": 1,
      "last_page": 8,
      "per_page": 20,
      "total": 150,
      "from": 1,
      "to": 20,
      "has_more_pages": true
    },
    "filters_applied": {
    "search": null,
    "category_id": null,
    "brand_id": null,
    "product_type": null,
    "min_price": null,
    "max_price": null,
    "featured": null,
    "flash_sale": null,
    "new_arrivals": null,
      "sort_by": "created_at",
      "sort_order": "desc"
    },
    "filter_values": {
      "categories": [
        {
          "category_id": 1,
          "category_name": "Electronics"
        },
        {
          "category_id": 12,
          "category_name": "Audio"
        }
      ],
      "brands": [
        {
          "brand_id": 1,
          "brand_name": "AudioTech"
        }
      ],
      "product_types": [
        "simple",
        "variable",
        "service"
      ],
      "price_range": {
        "min": "0.00",
        "max": "10000000.00"
      }
    }
  }
}
```

#### Notes

- **Multi-Category Support**: Products can belong to multiple categories. Each product has one primary category (`is_primary: true`) and can have additional secondary categories
- **Product Type Filtering**: Products must have at least one active variant to appear in results (for variable type products)
- **Category Filtering**: When filtering by category, all subcategories are automatically included. The filter will match any product that has the specified category (primary or secondary)
- **Flash Sales**: Only shows products in active flash sales with available quantity
- **Price**: The `selling_price` is an object containing `flashSalePrice` (price after flash sale discount if applicable) and `regularPrice` (original price). All price values are returned as strings
- **Pagination**: Results are paginated with a maximum of 100 items per page

---

### 2. Get Product Details

Retrieve comprehensive details for a single product by its slug.

#### Endpoint
```
GET /product-details/{slug}
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | string | Yes | Unique product slug identifier |

#### Example Request

```http
GET /product-details/premium-wireless-headphones
```

#### Success Response (200)

```json
{
  "status": 200,
  "success": true,
  "message": "Product details loaded successfully",
  "data": {
    "product_id": 123,
    "name": "Premium Wireless Headphones",
    "slug": "premium-wireless-headphones",
    "sku": "WH-001",
    "description": "High-quality wireless headphones with active noise cancellation, premium sound quality, and long battery life. Perfect for music lovers and professionals.",
    "descriptions": [
      {
        "id": 1,
        "title": "Key Features",
        "description": "- Active Noise Cancellation\n- 30-hour battery life\n- Bluetooth 5.0\n- Premium sound quality",
        "is_active": true
      },
      {
        "id": 2,
        "title": "Technical Specifications",
        "description": "Driver Size: 40mm\nFrequency Response: 20Hz-20kHz\nImpedance: 32 Ohm",
        "is_active": true
      }
    ],
    "featured_image": "https://example.com/uploads/products/headphones-main.jpg",
    "price": "299.99",
    "taxable_amount": "270.00",
    "vat": "29.99",
    "selling_price": {
      "flashSalePrice": "254.99",
      "regularPrice": "299.99"
    },
    "product_type": "variable",
    "is_active": true,
    "is_featured": true,
    "created_at": "2026-01-15T10:30:00.000000Z",
    "categories": [
      {
        "category_id": 5,
        "category_name": "Electronics",
        "web_image": "https://example.com/uploads/categories/electronics.jpg",
        "mobile_image": "https://example.com/uploads/categories/electronics-mobile.jpg",
        "is_primary": true
      },
      {
        "category_id": 12,
        "category_name": "Audio",
        "web_image": "https://example.com/uploads/categories/audio.jpg",
        "mobile_image": "https://example.com/uploads/categories/audio-mobile.jpg",
        "is_primary": false
      }
    ],
    "brand": {
      "brand_id": 12,
      "brand_name": "AudioTech",
      "brand_image": "https://example.com/uploads/brands/audiotech.jpg"
    },
    "unit": {
      "id": 1,
      "name": "Piece",
      "short_name": "pc"
    },
    "variants": [
      {
        "variant_id": 456,
        "variant_name": "Black - Large",
        "variant_sku": "WH-001-BL-L",
        "price": "299.99",
        "taxable_amount": "270.00",
        "vat": "29.99",
        "image": "https://example.com/uploads/variants/wh-black.jpg",
        "is_active": true
      },
      {
        "variant_id": 457,
        "variant_name": "White - Large",
        "variant_sku": "WH-001-WH-L",
        "price": "299.99",
        "taxable_amount": "270.00",
        "vat": "29.99",
        "image": "https://example.com/uploads/variants/wh-white.jpg",
        "is_active": true
      }
    ],
    "product_galleries": [
      {
        "id": 789,
        "image": "https://example.com/uploads/galleries/wh-gallery-1.jpg"
      },
      {
        "id": 790,
        "image": "https://example.com/uploads/galleries/wh-gallery-2.jpg"
      },
      {
        "id": 791,
        "image": "https://example.com/uploads/galleries/wh-gallery-3.jpg"
      }
    ],
    "flash_sale_products": [
      {
        "id": 101,
        "flash_sale_id": 15,
        "discount_percentage": "15.00",
        "discount_amount": "45.00",
        "quantity": 100,
        "sold_count": 23,
        "available_quantity": 77
      }
    ]
  }
}
```

#### Error Responses

**Product Not Found (404):**
```json
{
  "status": 404,
  "success": false,
  "message": "Sorry, the product you are looking for could not be found.",
  "data": null
}
```

**Product Unavailable (Variable product without active variants):**
```json
{
  "status": 404,
  "success": false,
  "message": "This product is currently unavailable.",
  "data": null
}
```

#### Notes

- **Slug**: The slug is a URL-friendly unique identifier (e.g., `premium-wireless-headphones`)
- **Active Variants**: Variable products must have at least one active variant to be viewable
- **Flash Sale**: The `selling_price.flashSalePrice` reflects flash sale discounts if the product is in an active flash sale, while `selling_price.regularPrice` shows the original price
- **Multi-Category**: Products can belong to multiple categories with one marked as primary
- **Product Galleries**: Contains additional product images for display
- **Descriptions**: Multiple description blocks for features, specifications, etc.

---

### 3. Get Related Products

Retrieve products related to a specific product based on shared categories.

#### Endpoint
```
GET /related-products/{slug}
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | string | Yes | Slug of the reference product |

#### Example Request

```http
GET /related-products/premium-wireless-headphones
```

#### Success Response (200)

```json
{
  "status": 200,
  "success": true,
  "message": "Related products loaded successfully",
  "data": [
    {
      "product_id": 124,
      "name": "Wireless Earbuds Pro",
      "slug": "wireless-earbuds-pro",
      "sku": "WE-002",
      "description": "Compact wireless earbuds with crystal clear sound",
      "descriptions": [],
      "featured_image": "https://example.com/uploads/products/earbuds.jpg",
      "price": "149.99",
      "taxable_amount": "135.00",
      "vat": "14.99",
      "selling_price": {
        "flashSalePrice": "149.99",
        "regularPrice": "149.99"
      },
      "product_type": "simple",
      "is_active": true,
      "is_featured": false,
      "created_at": "2026-01-14T08:20:00.000000Z",
      "categories": [
        {
          "category_id": 5,
          "category_name": "Electronics",
          "web_image": "https://example.com/uploads/categories/electronics.jpg",
          "mobile_image": "https://example.com/uploads/categories/electronics-mobile.jpg",
          "is_primary": true
        }
      ],
      "brand": {
        "brand_id": 12,
        "brand_name": "AudioTech",
        "brand_image": "https://example.com/uploads/brands/audiotech.jpg"
      },
      "unit": {
        "id": 1,
        "name": "Piece",
        "short_name": "pc"
      },
      "variants": [],
      "product_galleries": [
        {
          "id": 792,
          "image": "https://example.com/uploads/galleries/we-gallery-1.jpg"
        }
      ],
      "flash_sale_products": [],
      "membership_plans": []
    },
    {
      "product_id": 125,
      "name": "Bluetooth Speaker Mini",
      "slug": "bluetooth-speaker-mini",
      "sku": "BS-003",
      "description": "Portable Bluetooth speaker with powerful bass",
      "descriptions": [],
      "featured_image": "https://example.com/uploads/products/speaker.jpg",
      "price": "79.99",
      "taxable_amount": "72.00",
      "vat": "7.99",
      "selling_price": {
        "flashSalePrice": "79.99",
        "regularPrice": "79.99"
      },
      "product_type": "simple",
      "is_active": true,
      "is_featured": true,
      "created_at": "2026-01-13T15:45:00.000000Z",
      "categories": [
        {
          "category_id": 12,
          "category_name": "Audio",
          "web_image": "https://example.com/uploads/categories/audio.jpg",
          "mobile_image": "https://example.com/uploads/categories/audio-mobile.jpg",
          "is_primary": true
        }
      ],
      "brand": {
        "brand_id": 13,
        "brand_name": "SoundWave",
        "brand_image": "https://example.com/uploads/brands/soundwave.jpg"
      },
      "unit": {
        "id": 1,
        "name": "Piece",
        "short_name": "pc"
      },
      "variants": [],
      "product_galleries": [],
      "flash_sale_products": [],
      "membership_plans": []
    }
  ]
}
```

#### Error Responses

**Product Not Found:**
```json
{
  "status": 404,
  "success": false,
  "message": "Sorry, the product you are looking for could not be found.",
  "data": null
}
```

**No Related Products:**
```json
{
  "status": 200,
  "success": true,
  "message": "No related products available at this time.",
  "data": []
}
```

#### Notes

- **Matching Logic**: Products are matched based on shared categories (including subcategories)
- **Exclusion**: The original product is excluded from results
- **Limit**: Maximum of 12 related products returned
- **Active Only**: Only active products with available variants (for variable type) are shown
- **No Pagination**: Results are not paginated (fixed limit of 12)
- **Same Vendor**: Related products are always from the same vendor

---

## Response Structure

### Product Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `product_id` | integer | Unique product identifier |
| `name` | string | Product name |
| `slug` | string | URL-friendly unique identifier |
| `sku` | string | Stock Keeping Unit |
| `description` | string | Main product description |
| `descriptions` | array | Additional description blocks |
| `featured_image` | string\|null | Main product image URL |
| `price` | number | Base product price |
| `taxable_amount` | string | Price before tax |
| `vat` | string | VAT/tax amount |
| `selling_price` | object | Object containing `flashSalePrice` and `regularPrice` (both strings) |
| `product_type` | string | Type: `simple`, `variable`, or `service` |
| `is_active` | boolean | Product active status |
| `is_featured` | boolean | Featured product flag |
| `created_at` | string | ISO 8601 timestamp |
| `categories` | array | Associated categories (one primary, others secondary) |
| `brand` | object\|null | Product brand information |
| `unit` | object\|null | Measurement unit |
| `variants` | array | Product variants (for variable products) |
| `product_galleries` | array | Additional product images |
| `flash_sale_products` | array | Active flash sale information |

### Standard API Response Format

```json
{
  "status": number,
  "success": boolean,
  "message": string,
  "data": object|array|null
}
```

### Paginated Response Format

```json
{
  "status": number,
  "success": boolean,
  "message": string,
  "data": {
    "data": array,
    "pagination": {
      "current_page": integer,
      "last_page": integer,
      "per_page": integer,
      "total": integer,
      "from": integer,
      "to": integer,
      "has_more_pages": boolean
    },
    "filters_applied": object,
    "filter_values": object
  }
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (invalid parameters) |
| 403 | Forbidden (vendor verification failed) |
| 404 | Not Found (product doesn't exist) |
| 500 | Internal Server Error |

### Error Response Format

```json
{
  "status": number,
  "success": false,
  "message": "User-friendly error message",
  "data": null,
  "error": "Detailed error message (development only)"
}
```

### Common Error Scenarios

1. **Invalid Vendor**: Vendor verification fails
   ```json
   {
     "status": 403,
     "success": false,
     "message": "Vendor not found or inactive",
     "data": null
   }
   ```

2. **Product Not Found**: Product slug doesn't exist
   ```json
   {
     "status": 404,
     "success": false,
     "message": "Sorry, the product you are looking for could not be found.",
     "data": null
   }
   ```

3. **Product Unavailable**: Variable product without active variants
   ```json
   {
     "status": 404,
     "success": false,
     "message": "This product is currently unavailable.",
     "data": null
   }
   ```

4. **Server Error**: Internal error occurred
   ```json
   {
     "status": 500,
     "success": false,
     "message": "Unable to load products. Please try again later.",
     "data": null,
     "error": "Detailed error (development only)"
   }
   ```

---

## Integration Examples

### JavaScript/Fetch API

#### Get Products List

```javascript
async function getProducts(filters = {}) {
  const params = new URLSearchParams({
    per_page: filters.perPage || 20,
    page: filters.page || 1,
    ...(filters.search && { search: filters.search }),
    ...(filters.categoryId && { category_id: filters.categoryId }),
    ...(filters.brandId && { brand_id: filters.brandId }),
    ...(filters.minPrice && { price_min: filters.minPrice }),
    ...(filters.maxPrice && { price_max: filters.maxPrice }),
    ...(filters.featured && { featured: true }),
    ...(filters.flashSale && { flash_sale: true }),
    ...(filters.sortBy && { sort_by: filters.sortBy }),
    ...(filters.sortOrder && { sort_order: filters.sortOrder }),
  });

  try {
    const response = await fetch(`/api/products?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const result = await response.json();
    
    if (result.success) {
      return {
        products: result.data.data,
        pagination: result.data.pagination,
        filters: result.data.filter_values,
        appliedFilters: result.data.filters_applied,
      };
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Usage
getProducts({
  search: 'laptop',
  categoryId: 5,
  minPrice: 500,
  maxPrice: 2000,
  sortBy: 'price',
  sortOrder: 'asc',
  page: 1,
  perPage: 20,
})
  .then(({ products, pagination, filters }) => {
    console.log('Products:', products);
    console.log('Total:', pagination.total);
  })
  .catch(error => console.error(error));
```

#### Get Product Details

```javascript
async function getProductDetails(slug) {
  try {
    const response = await fetch(`/api/product-details/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
}

// Usage
getProductDetails('premium-wireless-headphones')
  .then(product => {
    console.log('Product:', product);
    console.log('Price:', product.selling_price);
    console.log('Variants:', product.variants);
  })
  .catch(error => console.error(error));
```

#### Get Related Products

```javascript
async function getRelatedProducts(slug) {
  try {
    const response = await fetch(`/api/related-products/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw error;
  }
}

// Usage
getRelatedProducts('premium-wireless-headphones')
  .then(products => {
    console.log('Related products:', products);
  })
  .catch(error => console.error(error));
```

### React Example

```jsx
import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    sortBy: 'created_at',
    sortOrder: 'desc',
    page: 1,
    perPage: 20,
  });
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const params = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== null && value !== '') {
            acc[key] = value;
          }
          return acc;
        }, {})
      );

      const response = await fetch(`/api/products?${params}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data.data);
        setPagination(result.data.pagination);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
        />
        
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="created_at">Newest</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>

          {pagination && (
            <Pagination
              currentPage={pagination.current_page}
              lastPage={pagination.last_page}
              onPageChange={(page) => setFilters({ ...filters, page })}
            />
          )}
        </>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  const hasFlashSale = product.flash_sale_products.length > 0;
  const displayPrice = product.selling_price.flashSalePrice;
  const regularPrice = product.selling_price.regularPrice;
  
  return (
    <div className="product-card">
      <img src={product.featured_image} alt={product.name} />
      <h3>{product.name}</h3>
      <div className="price">
        <span className="current-price">${displayPrice}</span>
        {hasFlashSale && displayPrice !== regularPrice && (
          <span className="regular-price">${regularPrice}</span>
        )}
      </div>
      {hasFlashSale && (
        <span className="badge">
          {product.flash_sale_products[0].discount_percentage}% OFF
        </span>
      )}
      <a href={`/product/${product.slug}`}>View Details</a>
    </div>
  );
}
```

### Vue.js Example

```vue
<template>
  <div>
    <div class="filters">
      <input
        v-model="filters.search"
        type="text"
        placeholder="Search products..."
        @input="debouncedFetch"
      />
      
      <select v-model="filters.sortBy" @change="fetchProducts">
        <option value="created_at">Newest</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </div>

    <div v-if="loading">Loading...</div>
    
    <div v-else class="product-grid">
      <div
        v-for="product in products"
        :key="product.product_id"
        class="product-card"
      >
        <img :src="product.featured_image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <div class="price">
          <span class="current-price">${{ product.selling_price.flashSalePrice }}</span>
          <span
            v-if="product.flash_sale_products.length > 0 && product.selling_price.flashSalePrice !== product.selling_price.regularPrice"
            class="regular-price"
          >
            ${{ product.selling_price.regularPrice }}
          </span>
        </div>
        <span
          v-if="product.flash_sale_products.length > 0"
          class="badge"
        >
          {{ product.flash_sale_products[0].discount_percentage }}% OFF
        </span>
        <router-link :to="`/product/${product.slug}`">
          View Details
        </router-link>
      </div>
    </div>

    <div v-if="pagination" class="pagination">
      <button
        v-for="page in pagination.last_page"
        :key="page"
        :class="{ active: page === pagination.current_page }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { debounce } from 'lodash';

export default {
  setup() {
    const products = ref([]);
    const loading = ref(true);
    const pagination = ref(null);
    const filters = reactive({
      search: '',
      categoryId: null,
      minPrice: null,
      maxPrice: null,
      sortBy: 'created_at',
      sortOrder: 'desc',
      page: 1,
      perPage: 20,
    });

    async function fetchProducts() {
      loading.value = true;
      
      try {
        const params = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== null && value !== '') {
              acc[key] = value;
            }
            return acc;
          }, {})
        );

        const response = await fetch(`/api/products?${params}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });

        const result = await response.json();
        
        if (result.success) {
          products.value = result.data.data;
          pagination.value = result.data.pagination;
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        loading.value = false;
      }
    }

    const debouncedFetch = debounce(fetchProducts, 300);

    function changePage(page) {
      filters.page = page;
      fetchProducts();
    }

    onMounted(() => {
      fetchProducts();
    });

    return {
      products,
      loading,
      pagination,
      filters,
      fetchProducts,
      debouncedFetch,
      changePage,
    };
  },
};
</script>
```

### Axios Example

```javascript
import axios from 'axios';

// Configure axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Products API
export const productsAPI = {
  // Get products list
  async getProducts(filters = {}) {
    try {
      const response = await api.get('/products', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get product details
  async getProductDetails(slug) {
    try {
      const response = await api.get(`/product-details/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get related products
  async getRelatedProducts(slug) {
    try {
      const response = await api.get(`/related-products/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Usage examples
async function example() {
  try {
    // Get products with filters
    const productsData = await productsAPI.getProducts({
      search: 'laptop',
      category_id: 5,
      price_min: 500,
      price_max: 2000,
      sort_by: 'price',
      sort_order: 'asc',
      page: 1,
      per_page: 20,
    });
    console.log('Products:', productsData.data);
    console.log('Pagination:', productsData.pagination);

    // Get product details
    const productDetails = await productsAPI.getProductDetails('premium-wireless-headphones');
    console.log('Product:', productDetails.data);

    // Get related products
    const relatedProducts = await productsAPI.getRelatedProducts('premium-wireless-headphones');
    console.log('Related:', relatedProducts.data);
  } catch (error) {
    console.error('API Error:', error.message);
  }
}
```

---

## Best Practices

### 1. Caching

Implement client-side caching to reduce API calls:

```javascript
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getCachedProducts(filters) {
  const cacheKey = JSON.stringify(filters);
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await getProducts(filters);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
}
```

### 2. Debouncing Search

Debounce search input to avoid excessive API calls:

```javascript
import { debounce } from 'lodash';

const debouncedSearch = debounce((searchTerm) => {
  getProducts({ search: searchTerm });
}, 300);
```

### 3. Error Handling

Always handle errors gracefully:

```javascript
async function fetchWithErrorHandling() {
  try {
    const data = await getProducts();
    return data;
  } catch (error) {
    if (error.success === false) {
      // API returned error
      showNotification(error.message, 'error');
    } else {
      // Network or other error
      showNotification('Unable to load products. Please check your connection.', 'error');
    }
    return null;
  }
}
```

### 4. Loading States

Show loading indicators during API calls:

```javascript
function ProductList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(data => setProducts(data.products))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  return <ProductGrid products={products} />;
}
```

### 5. URL State Management

Sync filters with URL parameters for shareable links:

```javascript
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const filters = {
    search: searchParams.get('search') || '',
    category_id: searchParams.get('category_id') || null,
    page: searchParams.get('page') || 1,
  };

  function updateFilters(newFilters) {
    setSearchParams(new URLSearchParams(newFilters));
  }

  // URL will update to: /products?search=laptop&category_id=5&page=1
}
```

---

## Support & Additional Resources

- **API Base URL**: Configured via vendor verification middleware
- **Rate Limiting**: Follow vendor-specific rate limits
- **Support**: Contact your vendor administrator for API access issues

---

**Document Version**: 1.0.0  
**Last Updated**: January 18, 2026  
**Maintained By**: Development Team

