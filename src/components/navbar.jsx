import { React, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import Cart from "./Cart/Cart";
import { useCart } from '../context/CartContext';
import { getFromLocalStorage } from '../Network/local/localstorage';

const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const currentUser = getFromLocalStorage('auth');
    const isAuthenticated = !!currentUser?.access;

    return (
        <>
            <nav className="bg-black text-white py-4 px-4 md:px-8">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold">شغل فنادق</div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <div className="relative cursor-pointer mr-4" onClick={() => setIsCartOpen(!isCartOpen)}>
                            <FaShoppingCart className="text-2xl hover:scale-110 transition duration-300 ease-in-out" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ?
                                <FaTimes className="text-2xl" /> :
                                <FaBars className="text-2xl" />
                            }
                        </button>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href="contactus"
                            className="text-white hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
                        >
                            <span className="text-white">تواصل معنا</span>
                        </a>
                        <a
                            href="products"
                            className="text-white hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
                        >
                            <span className="text-white">المتجر</span>
                        </a>
                        <a
                            href="aboutus"
                            className="text-white hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
                        >
                            <span className="text-white">من نحن</span>
                        </a>
                        <a
                            href="/"
                            className="text-white hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
                        >
                            <span className="text-white">الرئيسية</span>
                        </a>

                        {isAuthenticated && (
                            <a
                                href="/my-orders"
                                className="text-white hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
                            >
                                <span className="text-white">طلباتي</span>
                            </a>
                        )}

                        {/* Shopping Cart Icon - Desktop */}
                        <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                            <FaShoppingCart className="text-2xl hover:scale-110 transition duration-300 ease-in-out" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pt-4 pb-2 border-t border-gray-700 mt-4">
                        <div className="flex flex-col items-end space-y-3">
                            <a
                                href="/"
                                className="text-white hover:text-gray-300 block w-full text-right py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                الرئيسية
                            </a>
                            <a
                                href="aboutus"
                                className="text-white hover:text-gray-300 block w-full text-right py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                من نحن
                            </a>
                            <a
                                href="products"
                                className="text-white hover:text-gray-300 block w-full text-right py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                المتجر
                            </a>
                            <a
                                href="contactus"
                                className="text-white hover:text-gray-300 block w-full text-right py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                تواصل معنا
                            </a>
                            {isAuthenticated && (
                                <a
                                    href="/my-orders"
                                    className="text-white hover:text-gray-300 block w-full text-right py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    طلباتي
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Cart Component */}
            {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
        </>
    );
};

export default Navbar;