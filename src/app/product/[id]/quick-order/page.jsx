import { ProductQuickOrderView } from "@/sections/product/view";
import { getProductDetails, getRelatedProducts } from "@/api";

// ----------------------------------------------------------------------

export const metadata = { title: "Product Quick Order" };

export default async function Page({ params }) {
  const { id } = await params;

  const product = await getProductDetails(id);

  const relatedProducts = await getRelatedProducts(id);

  return (
    <ProductQuickOrderView
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
