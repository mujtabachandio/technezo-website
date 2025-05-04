'use client'

import Link from 'next/link'

interface SidebarProps {
  categories: string[]
  basePath: string
  selected?: string
}

export default function CategorySidebar({ categories, basePath, selected }: SidebarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 sticky top-20">
      <h3 className="font-bold text-lg mb-2">Categories</h3>
      <ul className="space-y-1">
        <li>
          <Link
            href={basePath}
            className={`block px-2 py-1 rounded ${
              !selected ? 'bg-red-600 text-white' : 'hover:bg-gray-100'
            }`}
          >
            All
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat}>
            <Link
              href={`${basePath}?category=${encodeURIComponent(cat)}`}
              className={`block px-2 py-1 rounded ${
                selected === cat ? 'bg-red-600 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
