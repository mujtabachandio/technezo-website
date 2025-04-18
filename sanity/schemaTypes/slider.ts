// schemas/slider.ts
export default {
  name: 'slider',
  title: 'Homepage Media',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'link', title: 'Link URL', type: 'url' },
    { name: 'order', title: 'Order', type: 'number' },
    {
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Slider', value: 'hero' },
          { title: 'Image Grid', value: 'grid' },
        ],
        layout: 'radio',
      },
    },
  ],
};
