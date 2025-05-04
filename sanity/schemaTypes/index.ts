import { type SchemaTypeDefinition } from 'sanity'
import laptop from './laptop'
import slider from './slider'
import laptopAccessory from './laptopAccessory'
import laptopDeal from './laptopDeal'
import newArrivalLaptop from './newArrivalLaptop'
import ram from './ram'
import storage from './storage'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    laptop, 
    slider,
    laptopAccessory,
    laptopDeal,
    newArrivalLaptop,
    ram,
    storage,  
  ],
}
