import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'storage',
  title: 'Storage Device',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Storage Type',
      type: 'string',
      options: {
        list: ['SSD', 'HDD', 'NVMe'],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity (GB)',
      type: 'number',
      validation: Rule => Rule.required().min(64),
    }),
    defineField({
      name: 'interface',
      title: 'Interface',
      type: 'string',
      options: {
        list: ['SATA', 'NVMe (PCIe)', 'M.2 SATA', 'USB 3.0'],
      },
    }),
    defineField({
      name: 'readSpeed',
      title: 'Read Speed (MB/s)',
      type: 'number',
    }),
    defineField({
      name: 'writeSpeed',
      title: 'Write Speed (MB/s)',
      type: 'number',
    }),
    defineField({
      name: 'price',
      title: 'Price (PKR)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
      hidden: ({ parent }) => parent?.inStock === false,
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: doc => `${doc.brand}-${doc.capacity}GB-${doc.type}`,
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'brand',
      media: 'image',
    },
  },
})
