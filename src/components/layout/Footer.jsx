import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-bg pt-16 pb-8 border-t border-brand-light/20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Identidade da Loja */}
        <h2 className="text-3xl font-serif text-brand mb-4">Chic & Charm</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Elegância atemporal em cada detalhe. Semijoias exclusivas selecionadas para realçar sua beleza natural com sofisticação.
        </p>

        {/* Links Sociais (Placeholder visual) */}
        <div className="flex justify-center gap-6 mb-12 opacity-50">
          <div className="w-8 h-8 rounded-full bg-brand/10 hover:bg-brand hover:text-white transition-colors cursor-pointer flex items-center justify-center">IG</div>
          <div className="w-8 h-8 rounded-full bg-brand/10 hover:bg-brand hover:text-white transition-colors cursor-pointer flex items-center justify-center">FB</div>
          <div className="w-8 h-8 rounded-full bg-brand/10 hover:bg-brand hover:text-white transition-colors cursor-pointer flex items-center justify-center">WA</div>
        </div>

        {/* Linha Divisória e Créditos */}
        <div className="border-t border-brand-light/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-gray-400">
          
          {/* Copyright da Loja */}
          <span>© 2026 Chic & Charm. Todos os direitos reservados.</span>

          {/* Sua Assinatura de Desenvolvedor */}
          <a 
            href="https://www.rbelchior.com.br/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-brand-dark transition-all duration-300 group"
            title="Visitar portfólio do desenvolvedor"
          >

            <span>Feito por </span>
            <span className="font-mono text-brand font-bold text-sm group-hover:scale-110 transition-transform">
               {'</>'}
            </span>
            <span className="group-hover:underline decoration-brand/30 underline-offset-4">
              <span className="font-bold">Renan Belchior</span>
            </span>
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;