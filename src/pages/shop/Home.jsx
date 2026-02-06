import React from 'react';
import Hero from '../../components/home/Hero';
import ProductCard from '../../components/ui/ProductCard';
import { useProductStore } from '../../store/useProductStore';
import { useLayoutStore } from '../../store/useLayoutStore'; // Importar layout store

const Home = () => {
  const products = useProductStore((state) => state.products);
  const sections = useLayoutStore((state) => state.sections); // Ler seções

  // Dicionário de Componentes: Mapeia o ID (string) para o Componente React real
  const SECTION_COMPONENTS = {
    hero: <Hero key="hero" />,
    
    featured: (
      <section key="featured" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand text-sm font-bold tracking-widest uppercase">Nossa Seleção</span>
          <h2 className="text-4xl font-serif text-dark-900 mt-2">Favoritos da Semana</h2>
          <div className="w-20 h-1 bg-brand mx-auto mt-6 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    ),

    promo: (
      <section key="promo" className="bg-brand-bg py-20 my-10">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif italic text-dark-800 mb-6">"A simplicidade é o último grau de sofisticação."</h2>
            <button className="text-brand-dark border-b-2 border-brand-dark pb-1 hover:text-brand hover:border-brand transition-all uppercase tracking-widest text-sm font-bold">
              Ler nossa história
            </button>
         </div>
      </section>
    ),

    newsletter: (
      <section key="newsletter" className="py-20 bg-dark-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Newsletter Chic & Charm</h2>
          <p className="text-white/60 mb-8">Receba ofertas exclusivas e novidades em primeira mão.</p>
          <div className="flex max-w-md mx-auto gap-4">
            <input type="email" placeholder="Seu melhor email" className="flex-1 px-4 py-3 rounded-lg text-dark-900 focus:outline-none" />
            <button className="bg-brand text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-light transition-colors">Assinar</button>
          </div>
        </div>
      </section>
    )
  };

  return (
    <div className="bg-white">
      {/* Mapeia as seções baseadas na ordem do Admin */}
      {sections.map(section => {
        if (!section.active) return null; // Se estiver oculto, não renderiza
        return SECTION_COMPONENTS[section.id];
      })}
    </div>
  );
};

export default Home;