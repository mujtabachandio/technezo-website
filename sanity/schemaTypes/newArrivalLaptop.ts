// /schemas/newArrivalLaptop.ts

export default {
    name: 'newArrivalLaptop',
    title: 'New Arrival Laptop',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
      { name: 'brand', title: 'Brand', type: 'string' },
      { name: 'model', title: 'Model', type: 'string' },
      { name: 'generation', title: 'Generation', type: 'string' },
      { name: 'processor', title: 'Processor', type: 'string' },
      { name: 'ram', title: 'RAM', type: 'string' },
      { name: 'memory', title: 'Memory (Storage)', type: 'string' },
      { name: 'screenSize', title: 'Screen Size', type: 'string' },
      { name: 'condition', title: 'Condition', type: 'string' },
      { name: 'os', title: 'Operating System', type: 'string' },
      { name: 'warranty', title: 'Warranty', type: 'string' },
      { name: 'price', title: 'Price', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'image', options: { hotspot: true } }],
      },
      { name: 'createdAt', title: 'Created At', type: 'datetime', readOnly: true, hidden: true },
    ],
    initialValue: () => ({ createdAt: new Date().toISOString() }),
  };
  