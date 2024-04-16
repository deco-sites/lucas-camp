import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description Adicione um link
   */
  href: string;
  carregamento: "lazy" | "eager";
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  description?: string;
  /**
   * @maxItems 4
   * @minItems 4
   */
  banners?: Banner[];
  layout?: {
    /**
     * @description Aplique borda a sua imagem
     */
    borderRadius?: {
      /** @default none */
      mobile?: BorderRadius;
      /** @default none */
      desktop?: BorderRadius;
    };
    headerAlignment?: "center" | "left";
    mobile?: "Asymmetric" | "Symmetrical";
    desktop?: "Asymmetric" | "Symmetrical";
  };
}

const RADIUS: Record<string, Record<BorderRadius, string>> = {
  mobile: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  },
  desktop: {
    none: "sm:rounded-none",
    sm: "sm:rounded-sm",
    md: "sm:rounded-md",
    lg: "sm:rounded-lg",
    xl: "sm:rounded-xl",
    "2xl": "sm:rounded-2xl",
    "3xl": "sm:rounded-3xl",
    full: "sm:rounded-full",
  },
};

function Banner(
  props: Banner & {
    borderRadius?: {
      /** @default none */
      mobile?: BorderRadius;
      /** @default none */
      desktop?: BorderRadius;
    };
  },
) {
  const { borderRadius, srcMobile, srcDesktop, alt, carregamento } = props;
  const radiusDesktop = RADIUS.desktop[borderRadius?.desktop ?? "none"];
  const radiusMobile = RADIUS.mobile[borderRadius?.desktop ?? "none"];

  return (
    <a
      href={props.href}
      class={`overflow-hidden ${radiusDesktop} ${radiusMobile}`}
    >
      <Picture>
        <Source
          width={190}
          height={190}
          media="(max-width: 767px)"
          src={srcMobile}
        />
        <Source
          width={640}
          height={420}
          media="(min-width: 768px)"
          src={srcDesktop || srcMobile}
        />
        <img
          width={640}
          class="w-full h-full object-cover"
          src={srcMobile}
          alt={alt}
          decoding="async"
          loading={carregamento}
        />
      </Picture>
    </a>
  );
}

export default function Gallery(props: Props) {
  const { title, description, banners, layout } = {
    ...props,
  };

  const mobileItemLayout = (index: number) =>
    layout?.mobile === "Symmetrical"
      ? "row-span-3"
      : index === 0 || index === 3
      ? "row-span-3"
      : "row-span-2";

  const desktopItemLayout = (index: number) =>
    layout?.desktop === "Symmetrical"
      ? "sm:row-span-3"
      : index === 0 || index === 3
      ? "sm:row-span-3"
      : "sm:row-span-2";

  return (
    <section class="p-4 flex flex-col gap-4">
      <Header
        title={title}
        description={description}
        alignment={layout?.headerAlignment || "center"}
      />
      <ul class="flex flex-col sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-6 gap-4 list-none">
        {banners?.map((banner, index) => (
          <li class={`${mobileItemLayout(index)} ${desktopItemLayout(index)}`}>
            <Banner {...banner} borderRadius={props.layout?.borderRadius} />
          </li>
        ))}
      </ul>
    </section>
  );
}
