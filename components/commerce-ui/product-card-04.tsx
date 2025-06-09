"use client";

import ImageViewer from "@/components/commerce-ui/image-viewer-basic";
// import PriceFormatSale from "@/components/commerce-ui/price-format-sale";
import StarRating_Fractions from "@/components/commerce-ui/star-rating-fractions";
import { Button } from "@/components/ui/button";

const DEFAULT_IMAGE_URL = ""

interface ProductCard_04Props {
  imageUrl?: string;
  tagText?: string;
  productName?: string;
  originalPrice?: number;
  salePrice?: number;
  rating?: number;
  maxRating?: number;
  reviewCount?: number;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  currencyPrefix?: string;
}

function ProductCard_04({
  currencyPrefix = "$",
  imageUrl = DEFAULT_IMAGE_URL,
  maxRating = 5,
  // onAddToCart = () => { },
  onBuyNow = () => { },
  // originalPrice = 299,
  productName = "Smart Watch Pro",
  rating = 4.5,
  reviewCount = 128,
  salePrice = 249,
  tagText = "LIMITED EDITION",
}: ProductCard_04Props = {}) {
  return (
    <div className="group relative flex w-[320px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* Gradient badge */}
      {tagText && (
        <div className="absolute top-3 left-3 z-10">
          <span className="relative inline-block rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            {tagText}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
            </span>
          </span>
        </div>
      )}

      {/* Image container with background glow effect */}
      <div className="relative bg-accent dark:bg-accent/30 p-6">
        <div className="absolute -bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 transform rounded-full bg-primary/20 blur-3xl" />
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg transition-transform duration-500 group-hover:scale-105">
          <ImageViewer
            imageUrl={imageUrl}
            classNameThumbnailViewer="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="mb-1 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {productName}
          </h3>

          <div className="mb-2 flex items-center">
            <StarRating_Fractions
              value={rating}
              maxStars={maxRating}
              readOnly
              iconSize={16}
              color="#f59e0b"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {rating} ({reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-1">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary dark:text-primary">{currencyPrefix}{salePrice}</div>
            <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">{currencyPrefix}{salePrice / 0.8}</div>
            <div className="rounded-sm bg-green-500/50 p-1 text-sm font-medium">Save 20%</div>
          </div>
          {/* <PriceFormatSale
            prefix={currencyPrefix}
            originalPrice={originalPrice}
            salePrice={salePrice}
            showSavePercentage
            className="text-lg font-semibold text-gray-600 dark:text-gray-300"
            classNameSalePrice="text-2xl font-bold text-primary dark:text-primary"
          /> */}
          <p className="mt-1 inline-flex items-center text-sm text-green-600 dark:text-green-400">
            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            Ships within 24 hours
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-2 flex flex-col gap-3">
          {/* <Button variant="outline" onClick={onAddToCart} className="w-full">
            Add to cart
          </Button> */}
          <Button
            onClick={onBuyNow}
            className="w-full bg-primary text-primary-foreground transition-all hover:bg-primary/90"
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard_04;
export type { ProductCard_04Props };
