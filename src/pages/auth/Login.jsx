import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
  
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      
     
      if (email.includes('admin')) {
        navigate('/admin'); 
      } else {
        navigate('/'); 
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Lado Esquerdo - Imagem (Escondido no mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop" 
          alt="Jóias elegantes" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/40 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:text-brand-light transition-colors w-fit">
            <ArrowLeft size={20} /> Voltar para a Loja
          </button>
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4">Chic & Charm</h2>
            <p className="max-w-md text-white/90 leading-relaxed">
              Acesse sua conta para acompanhar pedidos, salvar favoritos e receber ofertas exclusivas de nossa curadoria.
            </p>
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
        {/* Botão de voltar (só aparece no mobile) */}
        <button onClick={() => navigate('/')} className="absolute top-8 left-8 lg:hidden text-gray-500">
            <ArrowLeft size={24} />
        </button>

        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif font-bold text-dark-900 mb-2">
              {isLogin ? 'Bem-vinda de volta' : 'Crie sua conta'}
            </h1>
            <p className="text-gray-500">
              {isLogin ? 'Preencha seus dados para entrar' : 'Preencha seus dados para começar'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Seu Nome Completo"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                  />
                </div>
              </motion.div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha secreta"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-brand hover:underline font-medium">Esqueceu a senha?</a>
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full bg-brand-dark text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand transition-all shadow-lg hover:shadow-brand/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Cadastrar'} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-brand font-bold hover:underline"
              >
                {isLogin ? 'Cadastre-se' : 'Faça Login'}
              </button>
            </p>
          </div>
          
       
          <div className="mt-8 p-4 bg-blue-50 text-blue-800 text-xs rounded-lg text-center">
            <p className="font-bold">Modo de Desenvolvimento:</p>
            <p>Use um email com <strong>admin</strong> para testar o painel administrativo.</p>
            <p>Ex: <em>renan@admin.com</em></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;