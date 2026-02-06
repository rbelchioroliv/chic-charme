import React from 'react';
import Hero from '../../components/home/Hero';
import ProductCard from '../../components/ui/ProductCard';
import { useProductStore } from '../../store/useProductStore';



const Home = () => {
    const products = useProductStore((state) => state.products);

    return (
        <div className="bg-white">
            <Hero />

            {/* Seção de Destaques */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-brand text-sm font-bold tracking-widest uppercase">Nossa Seleção</span>
                    <h2 className="text-4xl font-serif text-dark-900 mt-2">Favoritos da Semana</h2>
                    <div className="w-20 h-1 bg-brand mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
                    {products.slice(0, 4).map((product) => ( // Pega apenas os 4 primeiros ou todos
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Banner Promocional Intermediário */}
            <section className="bg-brand-bg py-20 my-10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif italic text-dark-800 mb-6">"A simplicidade é o último grau de sofisticação."</h2>
                    <button className="text-brand-dark border-b-2 border-brand-dark pb-1 hover:text-brand hover:border-brand transition-all uppercase tracking-widest text-sm font-bold">
                        Ler nossa história
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;