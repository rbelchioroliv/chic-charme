import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, 
      isAuthenticated: false,

      login: (email, password) => {
        
        if (email.includes('admin')) {
          set({ 
            user: { name: 'Renan Admin', email, role: 'admin', avatar: 'https://github.com/shadcn.png' }, 
            isAuthenticated: true 
          });
          return true; 
        } 
      
        else {
          set({ 
            user: { name: 'Cliente Vip', email, role: 'customer' }, 
            isAuthenticated: true 
          });
          return true;
        }
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'chic-charm-auth' }
  )
);