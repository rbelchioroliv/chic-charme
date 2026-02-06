import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin, CheckCircle, Lock, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = Form, 2 = Success

  // Se o carrinho estiver vazio, volta pra loja
  if (items.length === 0 && step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-serif font-bold text-dark-900 mb-4">Sua sacola está vazia</h2>
        <button onClick={() => navigate('/')} className="text-brand hover:underline font-bold">Voltar a comprar</button>
      </div>
    );
  }

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simula processamento do gateway (2 segundos)
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      clearCart();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header Simplificado */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center">
        <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-dark-900 transition-colors">
          <ChevronLeft size={20} /> Voltar para a loja
        </button>
        <div className="mx-auto font-serif text-2xl font-bold text-brand">Chic & Charm <span className="text-gray-300">Secure</span></div>
        <div className="w-20"></div> {/* Espaçador para centralizar */}
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          
          {step === 1 ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              
              {/* COLUNA ESQUERDA: Formulários */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Endereço */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-dark-900 flex items-center gap-2 mb-6">
                    <MapPin className="text-brand" size={20} /> Endereço de Entrega
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="CEP" className="p-3 border rounded-lg w-full focus:border-brand outline-none" />
                    <input type="text" placeholder="Rua / Avenida" className="p-3 border rounded-lg w-full focus:border-brand outline-none" />
                    <input type="text" placeholder="Número" className="p-3 border rounded-lg w-full focus:border-brand outline-none" />
                    <input type="text" placeholder="Complemento" className="p-3 border rounded-lg w-full focus:border-brand outline-none" />
                    <input type="text" placeholder="Cidade" className="p-3 border rounded-lg w-full focus:border-brand outline-none" />
                    <input type="text" placeholder="Estado" className="p-3 border rounded-lg w-full focus:border-brand outline-none" />
                  </div>
                </div>

                {/* Pagamento */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-dark-900 flex items-center gap-2 mb-6">
                    <CreditCard className="text-brand" size={20} /> Pagamento
                  </h3>
                  
                  {/* Cartão Visual */}
                  <div className="mb-8 p-6 bg-gradient-to-br from-dark-800 to-black rounded-xl text-white shadow-xl max-w-sm mx-auto transform hover:scale-105 transition-transform duration-500">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-8 bg-yellow-500/80 rounded flex items-center justify-center">
                        <div className="w-8 h-5 border border-white/30 rounded"></div>
                      </div>
                      <span className="font-mono text-xl tracking-widest">VISA</span>
                    </div>
                    <div className="font-mono text-2xl tracking-widest mb-4">•••• •••• •••• 4242</div>
                    <div className="flex justify-between text-xs uppercase tracking-widest text-gray-400">
                      <span>Titular</span>
                      <span>Validade</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>RENAN CLIENTE</span>
                      <span>12/28</span>
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-4">
                    <input required type="text" placeholder="Nome no Cartão" className="w-full p-3 border rounded-lg focus:border-brand outline-none" />
                    <input required type="text" placeholder="Número do Cartão" className="w-full p-3 border rounded-lg focus:border-brand outline-none" />
                    <div className="grid grid-cols-2 gap-4">
                       <input required type="text" placeholder="MM/AA" className="w-full p-3 border rounded-lg focus:border-brand outline-none" />
                       <input required type="text" placeholder="CVV" className="w-full p-3 border rounded-lg focus:border-brand outline-none" />
                    </div>
                    
                    <button 
                      disabled={loading}
                      className="w-full bg-brand-dark text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-brand transition-all mt-6 shadow-lg hover:shadow-brand/20 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Lock size={18} /> Pagar R$ {cartTotal().toFixed(2).replace('.', ',')}
                        </>
                      )}
                    </button>
                    <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1 mt-4">
                      <Lock size={12} /> Pagamento 100% Seguro e Criptografado
                    </p>
                  </form>
                </div>
              </div>

              {/* COLUNA DIREITA: Resumo */}
              <div className="lg:col-span-5">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
                  <h3 className="text-lg font-bold text-dark-900 mb-6">Resumo do Pedido</h3>
                  <div className="max-h-80 overflow-y-auto space-y-4 mb-6 pr-2">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                          <img src={item.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-sm font-medium">{item.name}</h4>
                          <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                          <p className="text-sm font-medium text-brand mt-1">R$ {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>R$ {cartTotal().toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Frete</span>
                      <span className="text-green-600 font-medium">Grátis</span>
                    </div>
                    <div className="flex justify-between text-xl font-serif font-bold text-dark-900 pt-4 border-t border-gray-100 mt-4">
                      <span>Total</span>
                      <span>R$ {cartTotal().toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            
            /* TELA DE SUCESSO */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center py-20"
            >
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-3xl font-serif font-bold text-dark-900 mb-2">Pedido Confirmado!</h2>
              <p className="text-gray-500 mb-8">
                Obrigado por comprar na Chic & Charm. Enviamos um email com os detalhes da entrega.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8 text-left">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Código do Pedido</p>
                <p className="text-xl font-mono font-bold text-dark-900">#CC-{Math.floor(Math.random() * 10000)}</p>
              </div>

              <div className="space-y-3">
                 <button onClick={() => navigate('/shop')} className="w-full bg-brand text-white py-3 rounded-lg font-bold hover:bg-brand-dark transition-colors">
                   Continuar Comprando
                 </button>
                 <button onClick={() => navigate('/')} className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                   Voltar ao Início
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Checkout;