import { React } from "react";


const Navbar = () => {
    return (
        <nav className="bg-black text-white py-4 px-8">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">شغل فنادق</div>

                {/* Links */}
                <div className="flex items-center space-x-4">
                    <a
                        href="/"
                        className=" hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                    >
                        <span className="text-white">الرئيسية</span>
                    </a>
                    <a
                        href="aboutus"
                        className="text-white hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                    >
                        <span className="text-white">من نحن</span>
                    </a>
                    <a
                        href="products"
                        className="text-white hover:text-white hover:scale-110 transition duration-300 ease-in-out"
                    >
                        <span className="text-white">المتجر</span>
                    </a>
                    <a
                        href="contactus"
                        className=" text-white hover:text-gray hover:scale-110 transition duration-300 ease-in-out"
                    >
                        <span className="text-white">تواصل معنا</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;