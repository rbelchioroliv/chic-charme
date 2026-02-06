import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingBag, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useProductStore } from '../../store/useProductStore'; // <--- Importamos o Store de Produtos
import ProductCard from '../../components/ui/ProductCard';

const ProductDetails = () => {
  const { id } = useParams(); // Pega o ID da URL (ex: 2)
  const navigate = useNavigate();
  
  // Busca os produtos do nosso "banco de dados"
  const { products } = useProductStore();
  
  // Encontra o produto específico (convertendo id da URL para número)
  const product = products.find(p => p.id === Number(id));

  // Estados locais
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  // Se o produto não for encontrado (ex: ID inválido), mostra erro ou volta
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Produto não encontrado</h2>
        <button onClick={() => navigate('/')} className="text-brand mt-4 hover:underline">Voltar para a loja</button>
      </div>
    );
  }

  // Define imagens (usa a imagem do produto + algumas placeholders se não tiver array de imagens)
  const productImages = product.images || [
    product.image,
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887&auto=format&fit=crop"
  ];

  // Filtra produtos relacionados (todos menos o atual)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    // Adiciona o produto REAL ao carrinho
    addItem({ 
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity 
    });
    toggleCart();
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb e Voltar */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <button onClick={() => navigate(-1)} className="hover:text-brand flex items-center gap-1">
             <ArrowLeft size={14}/> Voltar
          </button> 
          <span>/</span>
          <span className="text-dark-900 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Coluna da Esquerda: Galeria */}
          <div className="space-y-4">
            <motion.div 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square overflow-hidden rounded-lg bg-gray-100"
            >
              <img src={productImages[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Coluna da Direita: Informações */}
          <div>
            <span className="text-brand text-sm font-bold tracking-widest uppercase mb-2 block">{product.category}</span>
            <h1 className="text-4xl font-serif text-dark-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm text-gray-500">(Avaliações simuladas)</span>
            </div>

            <p className="text-3xl text-brand font-medium mb-8">
                R$ {Number(product.price).toFixed(2).replace('.', ',')}
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description || "Uma peça exclusiva da coleção Chic & Charm, desenhada para realçar sua elegância natural com materiais de alta qualidade."}
            </p>

            {/* Controles de Quantidade e Botão */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-brand"><Minus size={16}/></button>
                <span className="font-medium w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-brand"><Plus size={16}/></button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-brand-dark text-white py-3.5 px-8 rounded-full font-medium hover:bg-brand transition-all shadow-lg hover:shadow-brand/30 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} /> Adicionar à Sacola
              </button>
            </div>

            {/* Infos Extras */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck size={18} className="text-brand" />
                <span>Frete Grátis para compras acima de R$ 299</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck size={18} className="text-brand" />
                <span>Garantia de 1 ano no banho</span>
              </div>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="mb-20">
          <div className="flex justify-center border-b border-gray-200 mb-8">
            <button onClick={() => setActiveTab('details')} className={`pb-4 px-8 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'details' ? 'border-b-2 border-brand text-brand' : 'text-gray-400'}`}>Detalhes</button>
            <button onClick={() => setActiveTab('reviews')} className={`pb-4 px-8 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'reviews' ? 'border-b-2 border-brand text-brand' : 'text-gray-400'}`}>Avaliações</button>
          </div>
          <div className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-center">
             {activeTab === 'details' ? (
                 <p>Peça desenvolvida com tecnologia hipoalergênica. Acabamento premium em ouro 18k ou Ródio Branco.</p>
             ) : (
                 <p>Ainda não há avaliações para este produto.</p>
             )}
          </div>
        </div>

        {/* Produtos Relacionados Reais */}
        <div>
           <h3 className="text-2xl font-serif text-center mb-10">Você também pode gostar</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;