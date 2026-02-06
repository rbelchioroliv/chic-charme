import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import ProductCard from '../../components/ui/ProductCard';


// Mock de dados (Simulando o banco de dados)
const PRODUCT_MOCK = {
  id: 1,
  name: "Colar Ponto de Luz",
  price: 129.90,
  description: "Um clássico atemporal. Este colar ponto de luz traz delicadeza e sofisticação para qualquer look. Banhado a ouro 18k com zircônia de alto brilho.",
  images: [
    "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1887&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop", // Imagem extra simulada
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887&auto=format&fit=crop"  // Imagem extra simulada
  ],
  reviews: [
    { id: 1, user: "Ana Silva", rating: 5, text: "Simplesmente perfeito! O brilho é incrível." },
    { id: 2, user: "Carla Dias", rating: 4, text: "Lindo, mas a corrente poderia ser um pouco maior." }
  ]
};

const RELATED_PRODUCTS = [
  { id: 2, name: "Brincos Dourados Elegance", price: "R$ 89,90", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 3, name: "Anel Solitário Classic", price: "R$ 159,90", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1770&auto=format&fit=crop", isNew: false },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // 'details' ou 'reviews'
  
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const handleAddToCart = () => {
    addItem({ ...PRODUCT_MOCK, quantity });
    toggleCart(); // Abre o carrinho para mostrar que adicionou
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb simples */}
        <div className="text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-brand">Início</Link> / <Link to="/shop" className="hover:text-brand">Colares</Link> / <span className="text-dark-900">{PRODUCT_MOCK.name}</span>
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
              <img src={PRODUCT_MOCK.images[activeImage]} alt={PRODUCT_MOCK.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {PRODUCT_MOCK.images.map((img, idx) => (
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
            <h1 className="text-4xl font-serif text-dark-900 mb-2">{PRODUCT_MOCK.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm text-gray-500">(12 avaliações)</span>
            </div>

            <p className="text-3xl text-brand font-medium mb-8">R$ {PRODUCT_MOCK.price.toFixed(2).replace('.', ',')}</p>
            
            <p className="text-gray-600 leading-relaxed mb-8">{PRODUCT_MOCK.description}</p>

            {/* Controles */}
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

        {/* Abas: Detalhes e Comentários */}
        <div className="mb-20">
          <div className="flex justify-center border-b border-gray-200 mb-8">
            <button 
              onClick={() => setActiveTab('details')}
              className={`pb-4 px-8 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'details' ? 'border-b-2 border-brand text-brand' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Detalhes
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-8 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'reviews' ? 'border-b-2 border-brand text-brand' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Avaliações
            </button>
          </div>

          <div className="max-w-3xl mx-auto">
            {activeTab === 'details' ? (
              <div className="text-gray-600 space-y-4 leading-relaxed animate-in fade-in duration-500">
                <p>Nossas peças são desenvolvidas com tecnologia antialérgica e possuem acabamento impecável.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Banho de Ouro 18k (10 milésimos)</li>
                  <li>Verniz Diamond para maior durabilidade</li>
                  <li>Livre de Níquel (Hipoalergênico)</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in duration-500">
                {PRODUCT_MOCK.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-bold text-dark-900">{review.user}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />)}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.text}</p>
                  </div>
                ))}
                
                {/* Pequeno Form de Comentário */}
                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                  <h4 className="font-serif font-bold mb-4">Deixe sua avaliação</h4>
                  <textarea className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-brand mb-4 text-sm" rows="3" placeholder="O que achou do produto?"></textarea>
                  <button className="bg-dark-900 text-white px-6 py-2 rounded-full text-sm hover:bg-brand transition-colors">Enviar Comentário</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Produtos Relacionados */}
        <div>
           <h3 className="text-2xl font-serif text-center mb-10">Você também pode gostar</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {RELATED_PRODUCTS.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;