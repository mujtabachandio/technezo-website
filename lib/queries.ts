export const allDealsQuery = `*[_type == "laptopDeal" && startDate <= now() && endDate >= now()] | order(_createdAt desc) {
  _id,
  title,
  description,
  discountPercentage,
  originalPrice,
  discountedPrice,
  startDate,
  endDate,
  slug,
  dealBanner {
    asset->{
      url
    }
  }
}`;

export const dealsByCategoryQuery = `*[_type == "laptopDeal" && references(*[_type == "laptop" && brand == $category]._id)] {
  _id,
  title,
  description,
  discountPercentage,
  originalPrice,
  discountedPrice,
  startDate,
  endDate,
  slug,
  dealBanner {
    asset->{
      url
    }
  }
}`;

export const singleDealQuery = (slug: string) => `*[_type == "laptopDeal" && slug.current == "${slug}"][0]{
  _id,
  title,
  description,
  discountPercentage,
  originalPrice,
  discountedPrice,
  startDate,
  endDate,
  slug,
  dealBanner {
    asset->{
      url
    }
  },
  dealImages[]{
    asset->{
      url
    }
  },
  products[]->{
    _id,
    title,
    price,
    slug,
    image {
      asset->{
        url
      }
    }
  }
}`;



export const allAccessoriesQuery = `
  *[_type == "laptopAccessory"]{
    _id,
    title,
    slug,
    images,
    price,
    brand,
    type,
    available,
    stock
  }
`

export const accessoriesByCategoryQuery = `
  *[_type == "laptopAccessory" && type == $category]{
    _id,
    title,
    slug,
    images,
    price,
    brand,
    type,
    available,
    stock
  }
`

export const singleAccessoryQuery = `
  *[_type == "laptopAccessory" && slug.current == $slug][0]{
    _id,
    title,
    description,
    slug,
    images,
    price,
    brand,
    type,
    available,
    stock
  }
`


export const allRamsQuery = `
  *[_type=='ram']{
    _id, title, brand, capacity, type, speed, price, inStock, stockQuantity, slug, image
  }
`

// Example for lib/queries.ts
export const singleRamQuery = `*[_type == "ram" && slug.current == $slug][0]{
  _id,
  title,
  brand,
  capacity,
  type,
  speed,
  price,
  inStock,
  stockQuantity,
  description,
  image,
  slug
}`


// lib/queries.ts
export const getAllStorageDevicesQuery = `
*[_type == "storage"]{
  _id,
  title,
  brand,
  type,
  capacity,
  interface,
  readSpeed,
  writeSpeed,
  price,
  inStock,
  stockQuantity,
  description,
  "imageUrl": image.asset->url,
  "slug": slug.current
}
`
