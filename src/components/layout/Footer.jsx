import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-bg pt-16 pb-8 border-t border-brand-light/20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif text-brand mb-4">Chic & Charm</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">
          Elegância atemporal em cada detalhe. Semijoias exclusivas para realçar sua beleza natural.
        </p>
        <div className="text-xs text-gray-400 uppercase tracking-widest mt-12">
          © 2026 Chic & Charm. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;