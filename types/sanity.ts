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
// types/sanity.ts

// Represents an image asset in Sanity
export interface SanityImage {
  _key: string
  asset: {
    _ref: string
    _type: 'reference'
    url?: string // optional, populated by your image URL builder (e.g. urlFor)
  }
}

// The main LaptopAccessory type matching your schema
export interface LaptopAccessory {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  images: SanityImage[]
  type?: string
  brand?: string
  compatibleWith?: string[]
  description?: string
  price: number
  available: boolean
  stock?: number
}

// If you have other document types, you can add them here, for example:
export interface AccessoryCategory {
  _id: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
}


// 2. TypeScript types (types/sanity.ts)
export interface Ram {
  _id: string;
  title?: string;
  slug: { _type: 'slug'; current: string };
  brand: string;
  capacity: number;
  type: 'DDR3' | 'DDR4' | 'DDR5';
  speed: number;
  price: number;
  inStock: boolean;
  stockQuantity?: number;
  description?: string;
  image?: any;
}
