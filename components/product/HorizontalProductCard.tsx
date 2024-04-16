import Image from "apps/website/components/Image.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import { Product } from "apps/commerce/types.ts";
import { formatPrice } from "$sdk/format.ts";
import { useOffer } from "$sdk/useOffer.ts";
import LikeButtonIsland from "deco-sites/lucas-camp/islands/LikeButtonIsland.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

interface HorizontalProductCardProps {
  product: Product;
  animation?: boolean;
}

export const HorizontalProductCard = (
  { product, animation }: HorizontalProductCardProps,
) => {
  const productID = product.productID;
  const url = product.url;
  const image = product.image?.[0];
  const name = product.name;
  const description = product.description;
  const { listPrice, price } = useOffer(product.offers);

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: undefined,
    price,
    listPrice,
  });

  return (
    <a
      key={`horizontal-product-card-${productID}`}
      href={url}
      aria-label={`Ver produto ${name}`}
      class="flex gap-2 sm:gap-4 md:gap-8 p-2 sm:p-4 md:p-6 rounded-xl bg-neutral-content relative"
    >
      {!!image && (
        <div
          class={`w-40 md:w-48 h-40 md:h-48 flex justify-center items-center overflow-hidden rounded`}
        >
          <Image
            width={200}
            height={279}
            sizes="(max-width: 640px) 100vw, 30vw"
            src={image.url!}
            alt={image.alternateName}
            decoding="async"
            loading="lazy"
            class={`duration-300 ${
              animation ? "hover:scale-110" : ""
            }`}
          />
        </div>
      )}

      {!image && (
        <div class="w-40 md:w-48 h-40 md:h-48 rounded bg-gray-300" />
      )}

      <div class="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-8 flex-1 ">
        <div class="flex flex-col gap-1 md:gap-8 flex-1 sm:pr-20 md:pr-0">
          <h2 class="line-clamp-2 md:line-clamp-3 text-base md:text-lg text-base-content uppercase font-normal">
            {name}
          </h2>
          {!!description && (
            <span class="line-clamp-1 md:line-clamp-3 text-base-content text-xs md:text-sm font-light">
              {description}
            </span>
          )}
        </div>

        <div class="flex flex-col gap-1 md:gap-8 md:pl-8 md:border-l md:border-solid md:border-gray-300">
          <div class="flex flex-col gap-1">
            {!!listPrice && (
              <span class="line-through text-sm hidden md:inline-flex">
                {formatPrice(listPrice)}
              </span>
            )}
            {!!price && (
              <span class="text-sm text-primary">
                {formatPrice(price)}
              </span>
            )}
          </div>

          {!price && <span class="text-sm">Indisponível</span>}

          <div class="flex flex-col gap-2 mt-auto max-w-48 md:max-w-none">
            {!!price && (
              <AddToCartButtonVTEX
                eventParams={{ items: [eventItem] }}
                productID={productID}
                seller={"1"}
              />
            )}
            <button class="btn btn-block hidden md:inline-flex">
              Ver produto
            </button>
          </div>
        </div>
      </div>

      <LikeButtonIsland productID={productID} />
    </a>
  );
};
