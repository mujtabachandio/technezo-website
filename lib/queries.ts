export const allAccessoriesQuery = `
  *[_type == "laptopAccessory"]{
    _id,
    title,
    slug,
    images,
    price,
    brand,
    type
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
    type
  }
`

export const allAccessoryCategoriesQuery = `
  *[_type == "laptopAccessory"].type
`

export const singleAccessoryQuery = `*[_type == "laptopAccessory" && slug.current == $slug][0]{
  _id,
  title,
  price,
  brand,
  type,
  description,
  images
}`

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

