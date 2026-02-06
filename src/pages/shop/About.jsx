import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Gem, Users } from 'lucide-react';

const About = () => {
  // Animação de entrada suave para os elementos
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const values = [
    { icon: Gem, title: "Design Autoral", desc: "Cada peça é desenhada à mão em nosso atelier, garantindo exclusividade e sofisticação em cada detalhe." },
    { icon: Globe, title: "Sustentabilidade", desc: "Trabalhamos com metais reciclados e pedras de origem ética, respeitando o meio ambiente e as comunidades." },
    { icon: Heart, title: "Feito com Amor", desc: "Acreditamos que uma joia carrega sentimentos. Por isso, nosso processo é humanizado do início ao fim." },
    { icon: Users, title: "Foco em Você", desc: "Nossa missão não é apenas vender acessórios, mas realçar a beleza única que já existe em você." },
  ];

  return (
    <div className="bg-white">
      
      {/* 1. Header Hero Simples */}
      <div className="relative py-24 bg-brand-bg/50 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.span 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="text-brand font-bold tracking-widest uppercase text-sm"
          >
            Nossa História
          </motion.span>
          <motion.h1 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-serif font-bold text-dark-900 mt-4 mb-6"
          >
            Redefinindo a elegância moderna.
          </motion.h1>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Nascemos do desejo de criar peças que não sejam apenas acessórios, mas extensões da sua personalidade. A Chic & Charm é sobre brilhar todos os dias.
          </motion.p>
        </div>
      </div>

      {/* 2. Seção História (Texto + Imagem) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Workshop" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Elemento decorativo flutuante */}
            <div className="absolute -bottom-10 -right-10 bg-white p-6 shadow-xl rounded-lg max-w-xs hidden md:block">
              <p className="font-serif italic text-xl text-dark-900">"A simplicidade é o último grau de sofisticação."</p>
              <p className="text-right text-xs text-brand font-bold mt-2 uppercase tracking-widest">— Leonardo da Vinci</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-dark-900">Do Sonho à Realidade</h2>
            <div className="w-20 h-1 bg-brand rounded-full"></div>
            <p className="text-gray-600 leading-relaxed">
              Tudo começou em 2024, em um pequeno estúdio, com uma ideia simples: criar semijoias de alta qualidade que fossem acessíveis, mas que tivessem o acabamento e a durabilidade da alta joalheria.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nossa fundadora, apaixonada por design e moda, percebeu que faltava no mercado uma marca que unisse o clássico ao contemporâneo. Peças que você pudesse usar em uma reunião importante e também em um jantar romântico.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Hoje, a **Chic & Charm** envia para todo o Brasil, mas mantemos o mesmo cuidado artesanal do primeiro dia. Cada caixa que sai do nosso centro de distribuição leva não apenas um produto, mas um convite para você se sentir mais poderosa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Nossos Valores (Grid) */}
      <section className="bg-dark-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-light font-bold tracking-widest uppercase text-sm">Nossos Pilares</span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2">Por que somos diferentes?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-center"
              >
                <div className="inline-flex p-4 bg-brand/20 text-brand rounded-full mb-6">
                  <val.icon size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4">{val.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Imagem Full Width (Parallax Feeling) */}
      <div className="h-96 relative bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop")' }}>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h2 className="text-4xl font-serif italic mb-4">"Jóias têm o poder de ser aquela pequena coisa que faz você se sentir única."</h2>
            <p className="uppercase tracking-widest text-sm">— Jennie Kwon</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;