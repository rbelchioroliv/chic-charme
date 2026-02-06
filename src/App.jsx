import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';
import Home from './pages/shop/Home';
import ProductDetails from './pages/shop/ProductDetails';
import Login from './pages/auth/Login';



function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen relative">
        <Navbar />
        <CartSidebar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<div className="pt-32 text-center">Loja (Em breve)</div>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<div className="pt-32 text-center">Checkout (Em breve)</div>} />
            <Route path="/login" element={<Login />} /> {/* NOVA ROTA */}
            <Route path="/admin" element={<div className="pt-32 text-center text-3xl text-brand font-serif">Bem-vindo ao Painel Admin</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;