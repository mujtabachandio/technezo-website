import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ram',
  title: 'RAM Module',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'brand', title: 'Brand', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'capacity', title: 'Capacity (GB)', type: 'number', validation: Rule => Rule.required().min(1) }),
    defineField({ name: 'type', title: 'DDR Type', type: 'string', options: { list: ['DDR3', 'DDR4', 'DDR5'] }, validation: Rule => Rule.required() }),
    defineField({ name: 'speed', title: 'Speed (MHz)', type: 'number' }),
    defineField({ name: 'price', title: 'Price (PKR)', type: 'number', validation: Rule => Rule.required().min(0) }),
    defineField({ name: 'inStock', title: 'In Stock?', type: 'boolean', initialValue: true }),
    defineField({ name: 'stockQuantity', title: 'Stock Quantity', type: 'number', hidden: ({ parent }) => parent?.inStock === false, validation: Rule => Rule.min(0) }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: doc => `${doc.brand}-${doc.capacity}GB-${doc.type}`, maxLength: 96 }, validation: Rule => Rule.required() }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'brand' },
  },
})
