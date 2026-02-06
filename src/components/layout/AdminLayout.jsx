import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Produtos', path: '/admin/products' },
    { icon: ShoppingBag, label: 'Pedidos', path: '/admin/orders' },
    { icon: Users, label: 'Clientes', path: '/admin/customers' },
    { icon: Settings, label: 'Config. Loja', path: '/admin/settings' }, // Aqui faremos o Drag & Drop depois
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar Fixa */}
      <aside className="w-64 bg-dark-900 text-white flex flex-col fixed h-full z-20">
        <div className="p-8">
          <h2 className="text-2xl font-serif font-bold text-brand">Chic & Admin</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Painel de Controle</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-brand text-white shadow-lg shadow-brand/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 w-full hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;