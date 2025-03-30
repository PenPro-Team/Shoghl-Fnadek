import { React } from "react";


const Navbar = () => {
    return (
        <nav className="bg-green-900 text-white py-4 px-8">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">متجر السيراميك</div>

                {/* Links */}
                <div className="flex items-center space-x-4">
                    <a
                        href="#home"
                        className="text-white hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                    >
                        الرئيسية
                    </a>
                    <a
                        href="#about"
                        className="text-white hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                    >
                        من نحن
                    </a>
                    <a
                        href="#shop"
                        className="text-white hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                    >
                        المتجر
                    </a>
                    <a
                        href="#contact"
                        className="txt text-white hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                    >
                        تواصل معنا
                    </a>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;