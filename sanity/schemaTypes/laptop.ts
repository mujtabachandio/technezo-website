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

    // Core Specs
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: {
        list: [
          'HP',
          'Dell',
          'Lenovo',
          'Asus',
          'Acer',
          'MSI',
          'Apple',
          'Toshiba',
        ],
      },
    },
    { name: 'model', title: 'Model', type: 'string' },
    { name: 'processor', title: 'Processor', type: 'string' },
    { name: 'generation', title: 'Generation', type: 'string' },
    { name: 'ram', title: 'RAM', type: 'string' },
    { name: 'storage', title: 'Storage', type: 'string' },

    // Graphics
    { name: 'gpu', title: 'Graphics Card', type: 'string' },

    // Display Size
    {
      name: 'displaySize',
      title: 'Display Size (inches)',
      type: 'string',
      options: {
        list: [
          '11.6"',
          '12.5"',
          '13.3"',
          '14"',
          '15.6"',
          '16"',
          '17.3"',
          '18.4"',
        ],
      },
    },

    // Resolution
    {
      name: 'resolution',
      title: 'Screen Resolution',
      type: 'string',
      options: {
        list: [
          '1366×768',
          '1920×1080',
          '2560×1440',
          '3200×1800',
          '3840×2160',
        ],
      },
    },

    // Touchscreen
    {
      name: 'touchScreen',
      title: 'Touch Screen?',
      type: 'boolean',
      description: 'Check if this laptop has a touchscreen',
    },

    // Other Specs
    { name: 'os', title: 'Operating System', type: 'string' },
    { name: 'warranty', title: 'Warranty Info', type: 'string' },

    // Condition & Availability
    {
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: { list: ['New', 'Used', 'Refurbished'] },
    },
    {
      name: 'price',
      title: 'Price (PKR)',
      type: 'number',
      description: 'Numeric price for range filtering',
    },

    // Media & Description
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

    // Flags
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

    // Metadata
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    },
  ],
};
