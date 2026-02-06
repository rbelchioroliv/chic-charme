import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Configuração inicial das seções da Home
const INITIAL_SECTIONS = [
  { id: 'hero', label: 'Banner Principal (Hero)', active: true },
  { id: 'featured', label: 'Produtos em Destaque', active: true },
  { id: 'promo', label: 'Banner Promocional', active: true },
  { id: 'newsletter', label: 'Newsletter', active: true },
];

export const useLayoutStore = create(
  persist(
    (set) => ({
      sections: INITIAL_SECTIONS,

      // Atualizar a ordem das seções
      setSections: (newSections) => set({ sections: newSections }),

      // Ligar/Desligar uma seção
      toggleSection: (id) => set((state) => ({
        sections: state.sections.map((s) => 
          s.id === id ? { ...s, active: !s.active } : s
        )
      })),
    }),
    { name: 'chic-charm-layout' }
  )
);