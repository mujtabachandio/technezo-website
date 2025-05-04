// /schemas/laptopDeal.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'laptopDeal',
  title: 'Laptop Deal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Deal Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      validation: (Rule) =>
        Rule.min(0).max(100).warning('Should be between 0 and 100'),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price (PKR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'discountedPrice',
      title: 'Discounted Price (PKR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'startDate',
      title: 'Deal Start Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Deal End Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dealBanner',
      title: 'Deal Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'dealImages',
      title: 'Deal Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'dealBanner',
    },
  },
});
