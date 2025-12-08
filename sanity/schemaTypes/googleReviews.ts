import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'googleReviews',
  title: 'Google Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'overallRating',
      title: 'Overall Rating',
      type: 'number',
      description: 'Overall rating (e.g., 4.6, 4.7, 4.9)',
      validation: (Rule) => Rule.min(0).max(5).precision(1).required(),
      initialValue: 4.7,
    }),
    defineField({
      name: 'totalReviews',
      title: 'Total Review Count',
      type: 'number',
      description: 'Total number of reviews (e.g., 16787)',
      validation: (Rule) => Rule.min(0).required(),
      initialValue: 0,
    }),
    defineField({
      name: 'googleReviewUrl',
      title: 'Google Review URL',
      type: 'url',
      description: 'URL to your Google Reviews page (for "Review us on Google" button)',
    }),
    defineField({
      name: 'reviews',
      title: 'Individual Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'profilePicture',
              title: 'Profile Picture',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'name',
              title: 'Reviewer Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isVerified',
              title: 'Verified Review?',
              type: 'boolean',
              description: 'Show verified badge (blue checkmark)',
              initialValue: true,
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5).integer().required(),
              initialValue: 5,
            }),
            defineField({
              name: 'reviewText',
              title: 'Review Text',
              type: 'text',
              validation: (Rule) => Rule.required(),
              rows: 4,
            }),
            defineField({
              name: 'date',
              title: 'Review Date',
              type: 'datetime',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'reviewText',
              media: 'profilePicture',
              rating: 'rating',
            },
            prepare({ title, subtitle, media, rating }) {
              return {
                title: `${title} - ${rating} stars`,
                subtitle: subtitle?.substring(0, 50) + '...',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      rating: 'overallRating',
      count: 'totalReviews',
    },
    prepare({ rating, count }) {
      return {
        title: `Google Reviews - ${rating} ⭐ (${count?.toLocaleString() || 0} reviews)`,
      }
    },
  },
})

