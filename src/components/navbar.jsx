import { React, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart/Cart";
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartCount } = useCart();

    return (
        <>
            <nav className="bg-black text-white py-4 px-8">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold">شغل فنادق</div>

                    {/* Links */}
                    <div className="flex items-center space-x-4">
                        <a
                            href="#home"
                            className=" hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                        >
                            <span className="text-white">الرئيسية</span>
                        </a>
                        <a
                            href="#about"
                            className="text-white hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                        >
                            <span className="text-white">من نحن</span>
                        </a>
                        <a
                            href="#shop"
                            className="text-white hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                        >
                            <span className="text-white">المتجر</span>
                        </a>
                        <a
                            href="#contact"
                            className=" text-white hover:text-gray hover:scale-110 transition duration-300 ease-in-out"
                        >
                            <span className="text-white">تواصل معنا</span>
                        </a>
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
            </nav>
            {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
        </>
    );
};

export default Navbar;