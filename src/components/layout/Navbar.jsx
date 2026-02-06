import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const items = useCartStore((state) => state.items);
    const toggleCart = useCartStore((state) => state.toggleCart);

    const { user, isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">



                    {/* Logo */}
                    <Link to="/" className="text-2xl font-serif font-bold text-brand tracking-tight">
                        Chic<span className="text-dark-900">&</span>Charm
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-dark-800 hover:text-brand transition-colors text-sm uppercase tracking-wider">Início</Link>
                        <Link to="/shop" className="text-dark-800 hover:text-brand transition-colors text-sm uppercase tracking-wider">Coleção</Link>
                        <Link to="/about" className="text-dark-800 hover:text-brand transition-colors text-sm uppercase tracking-wider">Sobre</Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-dark-800 hover:text-brand transition-colors"><Search size={20} /></button>

                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-dark-800 hover:text-brand">
                                    <User size={20} />
                                    <span className="text-sm font-medium hidden md:block">Olá, {user.name.split(' ')[0]}</span>
                                </button>
                                {/* Menu Dropdown Simples */}
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                                    {user.role === 'admin' && (
                                        <Link to="/admin" className="block px-4 py-2 text-sm text-dark-800 hover:bg-gray-50 hover:text-brand">Painel Admin</Link>
                                    )}
                                    <Link to="/orders" className="block px-4 py-2 text-sm text-dark-800 hover:bg-gray-50 hover:text-brand">Meus Pedidos</Link>
                                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">Sair</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="text-dark-800 hover:text-brand transition-colors"><User size={20} /></Link>
                        )}

                        <div className="relative cursor-pointer group" onClick={toggleCart}>
                            <ShoppingBag size={20} className="text-dark-800 group-hover:text-brand transition-colors" />
                            {items.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                                    {items.length}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-dark-800">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white absolute w-full shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-dark-800 hover:text-brand">INÍCIO</Link>
                        <Link to="/shop" onClick={() => setIsOpen(false)} className="block py-2 text-dark-800 hover:text-brand">COLEÇÃO</Link>
                        <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 text-dark-800 hover:text-brand">MINHA CONTA</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;