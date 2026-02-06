import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      isOpen: false, // Para controlar se o sidebar do carrinho está aberto

      // Abrir/Fechar carrinho
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      // Adicionar item
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),

      // Remover item
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),
      
      // Limpar
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'chic-charm-cart', // Nome no LocalStorage
    }
  )
);