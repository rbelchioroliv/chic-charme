import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Colares',
    stock: '',
    image: ''
  });

  // Preenche o formulário se for edição
  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({ name: '', price: '', category: 'Colares', stock: '', image: '' });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Converte preço e estoque para número
    onSave({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-serif font-bold text-dark-900">
            {productToEdit ? 'Editar Produto' : 'Novo Produto'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
            <input 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand"
              placeholder="Ex: Colar de Pérolas"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
              <input 
                required
                type="number"
                step="0.01"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand"
                placeholder="0,00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
              <input 
                required
                type="number"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand bg-white"
            >
              <option>Colares</option>
              <option>Brincos</option>
              <option>Anéis</option>
              <option>Pulseiras</option>
              <option>Conjuntos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
            <div className="flex gap-2">
              <input 
                required
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand"
                placeholder="https://..."
              />
              <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <Upload size={20} className="text-gray-400"/>}
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-3 bg-brand-dark text-white font-bold rounded-lg hover:bg-brand transition-colors shadow-lg shadow-brand/20">
              {productToEdit ? 'Salvar Alterações' : 'Criar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;