import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + (product.quantity || 1) } 
                : item
            )
          };
        }
        return { items: [...state.items, { ...product, quantity: product.quantity || 1 }] };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      // NOVA FUNÇÃO: Atualizar quantidade específica
      updateQuantity: (productId, delta) => set((state) => ({
        items: state.items.map(item => {
          if (item.id === productId) {
            const newQuantity = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
      })),
      
      clearCart: () => set({ items: [] }),
      
      // Getter para o total (opcional, mas útil)
      cartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    { name: 'chic-charm-cart' }
  )
);