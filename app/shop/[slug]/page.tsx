//app/shop/[slug]/page.tsx
import  client  from "@/sanity/lib/client";
import Link from "next/link";
import dynamic from "next/dynamic";
import DescriptionSpecsToggle from "@/app/components/DescriptionSpecsToggle";
import CartDemo from "@/app/cart/page";
import ProductClientSide from "./ProductClientSide";



const ImageGallery = dynamic(() => import("@/app/components/ImageGallery"));



// ─── Static Params (SSG) ─────────────────────────────── //
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await client.fetch(
    `*[_type == "laptop"]{ "slug": slug.current }`
  );
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

// ─── Product Page ────────────────────────────────────── //
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await client.fetch(
    `*[_type == "laptop" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn&apos;t find the product you&apos;re looking for.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const specs: Record<string,string> = {
    Title:           product.title,
    Brand:           product.brand,
    Model:           product.model,
    Processor:       product.processor,
    Generation:      product.generation,
    RAM:             product.ram,
    Storage:         product.storage,
    "Graphics Card": product.gpu,
    "Screen Size":   product.screenSize,
    "Screen Res.":    product.resolution,
    "OS":             product.os,
    "Warranty":       product.warranty,
    Condition:       product.condition,
    Available:       product.available ? "Yes" : "No",
    Price:           `Rs ${product.price}`,
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ─── Breadcrumb Navigation ─────────────────────────── */}
      <nav className="flex items-center text-sm font-medium text-gray-500 mb-8">
        <Link
          href="/"
          className="hover:text-gray-900 transition-colors duration-200"
        >
          Home
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mx-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <Link
          href="/shop"
          className="hover:text-gray-900 transition-colors duration-200"
        >
          Shop
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mx-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* ─── Product Header Section ─────────────────────────── */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
          <div className="flex items-center mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 ml-auto">
              {product.condition}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* ─── Images Section ───────────────────────────────── */}
          <div className="p-6 border-r border-gray-200">
            {product.images?.length > 0 ? (
              <ImageGallery images={product.images} title={product.title} />
            ) : (
              <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center h-80">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>

          {/* ─── Product Info Section ───────────────────────── */}
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <p className="text-3xl font-bold text-gray-900">
                  Rs{product.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
              </div>

              <div className="text-green-600 text-sm font-medium flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                In Stock - Ready to Ship
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <dl className="grid grid-cols-1 gap-y-4">
                {[
                  ["Brand", product.brand],
                  ["Processor", product.processor || "Not specified"],
                  ["GPU", product.gpu],
                  ["RAM", product.ram],
                  ["Storage", product.storage || "Not specified"],
                  ["Screen Size", product.screenSize || "Not specified"],
                  ["OS", product.os || "Not specified"],
                  ["Warranty", product.warranty || "None"],
                ].map(([label, value], idx) => (
                  <div className="grid grid-cols-3 gap-4" key={idx}>
                    <dt className="text-sm font-medium text-gray-500">
                      {label}
                    </dt>
                    <dd className="text-sm text-gray-900 col-span-2 font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-4">
            <ProductClientSide product={product} />

              <Link
                href="https://wa.me/03332568818?text=Hi%2C%20I%27m%20interested%20in%20your%20laptop%20listed%20on%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-100 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
                Contact Seller
              </Link>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                  Shipping All Over Pakistan
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>

        <DescriptionSpecsToggle
  description={product.description}
  specs={specs}
/>
<CartDemo />
      </div>
    </div>
  );
}
