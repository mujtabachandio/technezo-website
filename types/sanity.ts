// /types/sanity.ts
export interface LaptopDeal {
  _id: string;
  title: string;
  description?: string;
  discountPercentage?: number;
  originalPrice: number;
  discountedPrice: number;
  startDate: string;
  endDate: string;
  slug: {
    current: string;
  };
  dealBanner?: {
    asset: {
      url: string;
    };
  };
  dealImages?: {
    asset: {
      url: string;
    };
  }[];
  products?: {
    _id: string;
    title: string;
    price: number;
    slug: { current: string };
    image?: {
      asset: {
        url: string;
      };
    };
  }[];
}



// In types/sanity.ts
export type LaptopAccessory = {
  _id: string;
  title: string;
  slug: { current: string };
  images: { _key: string; asset: { url: string } }[];  // Array of image objects
  price: number;
  brand: string;
  type: string;
}
