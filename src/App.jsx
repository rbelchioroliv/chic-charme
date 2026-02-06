import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';
import Home from './pages/shop/Home';
import ProductDetails from './pages/shop/ProductDetails';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/layout/AdminLayout';
import { useAuthStore } from './store/useAuthStore';
import Products from './components/admin/Products';

// Componente Wrapper para layout público (com Navbar/Footer)
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen relative">
    <Navbar />
    <CartSidebar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

// Componente de Rota Protegida (Só admin entra)
const ProtectedAdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROTAS PÚBLICAS */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/shop" element={<PublicLayout><div className="pt-32 text-center">Loja</div></PublicLayout>} />
        <Route path="/product/:id" element={<PublicLayout><ProductDetails /></PublicLayout>} />

        {/* ROTA LOGIN (Sem layout padrão) */}
        <Route path="/login" element={<Login />} />

        {/* ROTAS ADMIN (Protegidas e com Layout Próprio) */}
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        } />

        {/* Placeholder para as próximas rotas admin */}
        <Route path="/admin/products" element={
          <ProtectedAdminRoute>
            <Products />
          </ProtectedAdminRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;