import { createContext } from 'react';

export interface CartItem {
  productId: string;
  quantity: number;
  // Add other properties as needed
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

// ...existing code...