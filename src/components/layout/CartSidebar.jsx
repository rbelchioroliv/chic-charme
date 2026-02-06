import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, cartTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Escuro (Fundo) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Painel Lateral */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold text-dark-900 flex items-center gap-2">
                Sua Sacola <span className="text-sm font-sans font-normal text-gray-400">({items.length} itens)</span>
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Lista de Produtos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag size={48} className="text-gray-200" />
                  <p className="text-gray-500">Sua sacola está vazia.</p>
                  <button onClick={toggleCart} className="text-brand font-bold hover:underline">
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Imagem */}
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image || item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Detalhes */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-dark-900 font-medium line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-gray-500">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Seletor de Quantidade */}
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 px-2 text-gray-500 hover:text-brand hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 px-2 text-gray-500 hover:text-brand hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Botão Remover */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Remover item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Rodapé (Total e Checkout) */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-xl font-serif font-bold text-dark-900">
                    R$ {cartTotal().toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-xs text-gray-400 text-center mb-4">Taxas e frete calculados no checkout.</p>
                <Link 
                  to="/checkout" // Ainda vamos criar, mas já deixamos o link
                  onClick={toggleCart}
                  className="block w-full bg-brand-dark text-white text-center py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand transition-all shadow-lg hover:shadow-brand/30"
                >
                  Finalizar Compra
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;