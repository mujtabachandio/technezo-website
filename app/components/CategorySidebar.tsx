'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function AccessorySidebar({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  const handleClick = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === activeCategory) {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`/accessories?${params.toString()}`);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    router.push(`/accessories?${params.toString()}`);
  };

  return (
    <aside className="w-full p-5 border bg-white shadow-sm rounded-xl sticky top-4">
      <h2 className="text-xl font-bold mb-6 border-b pb-2 border-gray-200">Categories</h2>
      <ul className="space-y-2 mb-4">
        <li
          onClick={handleReset}
          className={`cursor-pointer px-3 py-2 rounded-md transition ${
            !activeCategory ? 'bg-red-600 text-white font-medium' : 'hover:bg-gray-50'
          }`}
        >
          All Accessories
        </li>
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <li
              key={cat}
              onClick={() => handleClick(cat)}
              className={`cursor-pointer px-3 py-2 rounded-md transition ${
                isActive ? 'bg-red-600 text-white font-medium' : 'hover:bg-gray-50'
              }`}
            >
              {cat}
            </li>
          );
        })}
      </ul>

      {activeCategory && (
        <button
          onClick={handleReset}
          className="flex items-center text-sm text-red-600 hover:text-red-700 hover:underline transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear Filters
        </button>
      )}
    </aside>
  );
}