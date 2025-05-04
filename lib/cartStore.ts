import {create} from 'zustand';

type CartItem = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void; // Added remove function
  loadCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const newCart = [...state.cart, product];
    localStorage.setItem('cart', JSON.stringify(newCart)); // Save updated cart to localStorage
    return { cart: newCart };
  }),
  removeFromCart: (productId) => set((state) => {
    const newCart = state.cart.filter(item => item._id !== productId); // Remove the product by ID
    localStorage.setItem('cart', JSON.stringify(newCart)); // Save updated cart to localStorage
    return { cart: newCart };
  }),
  loadCart: () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    set({ cart }); // Load the cart from localStorage
  },
}));
