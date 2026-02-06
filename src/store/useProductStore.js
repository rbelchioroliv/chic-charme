import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Dados iniciais para não começar vazio
const INITIAL_PRODUCTS = [
  { id: 1, name: "Colar Ponto de Luz", price: 129.90, category: "Colares", stock: 15, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1887&auto=format&fit=crop", isNew: true },
  { id: 2, name: "Brincos Dourados Elegance", price: 89.90, category: "Brincos", stock: 8, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 3, name: "Anel Solitário Classic", price: 159.90, category: "Anéis", stock: 24, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1770&auto=format&fit=crop", isNew: false },
  { id: 4, name: "Pulseira Charm", price: 199.90, category: "Pulseiras", stock: 5, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop", isNew: true },
];

export const useProductStore = create(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,

      // Adicionar Produto
      addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: Date.now(), isNew: true }]
      })),

      // Editar Produto
      updateProduct: (id, updatedData) => set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
      })),

      // Deletar Produto
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      })),
    }),
    { name: 'chic-charm-products' }
  )
);