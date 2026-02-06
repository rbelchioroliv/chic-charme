import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore'; // <--- 1. Importar o Store

const ProductCard = ({ product }) => {
  // 2. Pegar as funções do Carrinho
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  // 3. Função para adicionar sem entrar na página do produto
  const handleAddToCart = (e) => {
    e.preventDefault(); // Impede que o Link abra a página de detalhes
    e.stopPropagation(); // Garante que o clique não "vaze" para elementos pai
    
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: 1
    });
    
    toggleCart(); // Abre o carrinho para feedback visual imediato
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          
          {/* Ações Rápidas (aparecem no hover) */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-4 z-10">
            <button 
              onClick={handleAddToCart} // <--- 4. Conectar a função aqui
              className="flex-1 bg-white/90 backdrop-blur text-brand-dark py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-brand hover:text-white transition-colors shadow-lg text-sm font-medium"
            >
              <ShoppingBag size={16} /> Adicionar
            </button>
            
            {/* Botão de Favorito (Apenas visual por enquanto) */}
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="p-3 bg-white/90 backdrop-blur rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-lg"
            >
              <Heart size={18} />
            </button>
          </div>
          
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-brand text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Novo
            </span>
          )}
        </div>

        <div className="text-center">
          <h3 className="text-lg font-serif text-dark-900 group-hover:text-brand transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 font-medium">
            R$ {Number(product.price).toFixed(2).replace('.', ',')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;