"use client";

import { useRouter } from "next/navigation";
import ImageViewer from "@/components/commerce-ui/image-viewer-basic";
// import PriceFormat from "@/components/commerce-ui/price-format-basic";
import StarRatingFractions from "@/components/commerce-ui/star-rating-fractions";
import { Button } from "@/components/ui/button";

// const DEFAULT_IMAGE_URL =
//   "/logo.png";

interface ProductCard_02Props {
  id?: number;
  imageUrl?: string;
  discount?: string | null;
  title?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  inStock?: boolean;
  stockCount?: number;
  hasShipping?: boolean;
  shippingText?: string;
  price?: number;
  prefix?: string;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

function ProductCard_02({
  id,
  description = "Experience next-level audio with the AeroTune X9...",
  discount = "20% OFF",
  hasShipping = true,
  imageUrl,
  // inStock = true,
  // onAddToCart = () => { },
  onBuyNow,
  prefix = "$",
  price = 39.59,
  rating = 4.45,
  reviewCount = 362,
  shippingText = "Free Shipping",
  // stockCount = 256,
  title = "AeroTune X9",
}: ProductCard_02Props = {}) {
  const router = useRouter();

  const handleCardClick = () => {
    if (id) {
      router.push(`/product/${id}`);
    }
  };

  const handleBuyNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 防止冒泡触发卡片跳转
    if (id) {
      router.push(`/product/${id}`);
    }
    if (onBuyNow) {
      onBuyNow(); // 可选调用
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white dark:bg-zinc-900 max-w-4xl mx-auto rounded-2xl border p-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl">
        {discount && (
          <div className="absolute top-2 left-2 z-10 w-fit rounded-lg bg-purple-500/80 px-3 py-1 text-xs font-semibold text-white">
            {discount}
          </div>
        )}
        {imageUrl && <ImageViewer imageUrl={imageUrl} className="w-full h-full object-cover" />}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">{title}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <StarRatingFractions readOnly value={rating} />
            <span>({rating})</span>
            <span>· {reviewCount} reviews</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-3xl font-semibold text-primary">{prefix}{price}</div>
            <div className="text-3xl font-semibold text-gray-500 line-through">{prefix}{price / 0.8}</div>
            <div className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">Save 20%</div>
          </div>

          {/* <PriceFormat
            prefix={prefix}
            value={price}
            className="text-3xl font-semibold text-primary"
          /> */}
          <p className="text-muted-foreground text-base whitespace-pre-line leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {hasShipping && (
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">
                {shippingText}
              </div>
              <p className="text-muted-foreground text-sm">on all orders</p>
            </div>
          )}
          {/* {inStock ? (
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">
                In Stock
              </div>
              <p className="text-muted-foreground text-sm">+{stockCount} in stock</p>
            </div>
          ) : (
            <div className="rounded-md bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
              Out of Stock
            </div>
          )}

          {hasShipping && (
            <p className="text-sm text-muted-foreground">
              <a
                href="#"
                className="font-semibold underline underline-offset-2 hover:opacity-100 opacity-80"
              >
                {shippingText}
              </a>{" "}
              on all orders
            </p>
          )} */}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Button size="lg" className="w-full" onClick={handleBuyNowClick}>
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard_02;
export type { ProductCard_02Props };
