// ----------------------------------------------------------------------

// The cart/order APIs return `item_image` without the `/storage` segment
// that every other endpoint (products, variants, wishlist, etc.) includes
// — e.g. ".../uploads/..." instead of ".../storage/uploads/...". Patch it
// here until the backend response is fixed.
export function fixItemImageUrl(url) {
  if (!url) return url;

  return url.replace(/^(https?:\/\/[^/]+)\/uploads\//, "$1/storage/uploads/");
}
