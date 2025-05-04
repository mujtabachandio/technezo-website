// 5. RamCard Component (components/RamCard.tsx)
import Link from 'next/link'
import { Ram } from '@/types/sanity'

export default function RamCard({ ram }: { ram: Ram }) {
return (
<Link
  href={`/ram/${ram.slug.current}`}
  className="block bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-4"
>
  <div>
	{ram.brand} {ram.capacity}GB {ram.type} @ {ram.speed}MHz
	<br />
	PKR {ram.price}
	<br />
	{!ram.inStock && <span>Out of Stock</span>}
  </div>
</Link>
  )
}