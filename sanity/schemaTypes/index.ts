import { type SchemaTypeDefinition } from 'sanity'
import laptop from './laptop'
import slider from './slider'
import laptopAccessory from './laptopAccessory'
import laptopDeal from './laptopDeal'
import newArrivalLaptop from './newArrivalLaptop'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    laptop, 
    slider,
    laptopAccessory,
    laptopDeal,
    newArrivalLaptop
  ],
}
