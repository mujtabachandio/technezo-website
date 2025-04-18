// schemas/laptop.ts
export default {
  name: 'laptop',
  title: 'Laptop',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: {
        list: ['HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Apple'],
      },
    },
    { name: 'model', title: 'Model', type: 'string' },
    { name: 'processor', title: 'Processor', type: 'string' },
    { name: 'generation', title: 'Generation', type: 'string' },
    { name: 'ram', title: 'RAM', type: 'string' },
    { name: 'storage', title: 'Storage', type: 'string' },
    { name: 'gpu', title: 'Graphics Card', type: 'string' },
    { name: 'screenSize', title: 'Screen Size', type: 'string' },
    { name: 'resolution', title: 'Screen Resolution', type: 'string' },
    { name: 'os', title: 'Operating System', type: 'string' },
    { name: 'warranty', title: 'Warranty Info', type: 'string' },
    {
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: ['New', 'Used', 'Refurbished'],
      },
    },
    { name: 'price', title: 'Price (PKR)', type: 'string' },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
    },
    {
      name: 'description',
      title: 'Detailed Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'available',
      title: 'Available in Stock?',
      type: 'boolean',
    },
    {
      name: 'featured',
      title: 'Featured Product?',
      type: 'boolean',
    },
    {
      name: 'isGaming',
      title: 'Is Gaming Laptop?',
      type: 'boolean',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    },
  ],
}
