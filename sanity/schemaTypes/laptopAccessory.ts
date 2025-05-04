import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'laptopAccessory',
  title: 'Laptop Accessory',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Accessory Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'type',
      title: 'Accessory Type',
      type: 'string',
      options: {
        list: [
          'Charger', 'Bag', 'Cooling Pad', 'Mouse', 'Keyboard', 'USB Hub',
          'Stand', 'Screen Protector', 'Cleaning Kit', 'Docking Station',
          'External HDD', 'Other'
        ]
      }
    }),
    defineField({ name: 'brand', title: 'Brand', type: 'string' }),
    defineField({
      name: 'compatibleWith',
      title: 'Compatible With',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'price',
      title: 'Price (PKR)',
      type: 'number',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'available',
      title: 'In Stock?',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      hidden: ({ parent }) => parent?.available === false,
      validation: Rule => Rule.min(0)
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString()
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      subtitle: 'brand'
    }
  }
})
