import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import ProductModal from './ProductModal';

const Products = () => {
  const { products, deleteProduct, addProduct, updateProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filtrar produtos
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setEditingProduct(null);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Header da Página */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-dark-900">Meus Produtos</h1>
          <p className="text-gray-500 mt-1">Gerencie seu catálogo de forma simples.</p>
        </div>
        <button 
          onClick={openNew}
          className="bg-brand-dark text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-brand transition-all shadow-lg hover:shadow-brand/20"
        >
          <Plus size={20} /> Novo Produto
        </button>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nome..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand"
          />
        </div>
        <div className="text-sm text-gray-500 font-medium">
          {filteredProducts.length} produtos encontrados
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 font-medium text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Preço</th>
                <th className="px-6 py-4">Estoque</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-dark-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-dark-900">
                    R$ {Number(product.price).toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${product.stock < 5 ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                      {product.stock} un.
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        productToEdit={editingProduct}
      />
    </div>
  );
};

export default Products;