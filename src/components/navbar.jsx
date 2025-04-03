import { React, useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-black text-white py-4 px-4 md:px-8">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">شغل فنادق</div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden flex items-center"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Navigation Links - Desktop */}
                <div className="hidden md:flex items-center space-x-4 text-right">
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
                </div>

                {/* Navigation Links - Mobile */}
                <div
                    className={`${isMenuOpen ? 'block' : 'hidden'
                        } w-full md:hidden mt-4`}
                >
                    <div className="flex flex-col items-end space-y-3">
                        <a
                            href="/"
                            className="text-white hover:text-gray-300 block w-full text-right py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            الرئيسية
                        </a>
                        <a
                            href="aboutus"
                            className="text-white hover:text-gray-300 block w-full text-right py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            من نحن
                        </a>
                        <a
                            href="products"
                            className="text-white hover:text-gray-300 block w-full text-right py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            المتجر
                        </a>
                        <a
                            href="contactus"
                            className="text-white hover:text-gray-300 block w-full text-right py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            تواصل معنا
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;