import { type SchemaTypeDefinition } from 'sanity'
import laptop from './laptop'
import slider from './slider'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    laptop, 
    slider,
  ],
}
