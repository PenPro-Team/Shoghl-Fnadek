import { React, useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import Cart from "./Cart/Cart";
import { useCart } from "../context/CartContext";
import { getFromLocalStorage, logout } from "../Network/local/localstorage";
import { Link, useNavigate } from "react-router-dom";
// here my navBar
const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const homeBage = useNavigate();
  useEffect(() => {
    const authData = getFromLocalStorage("auth");
    setIsAuthenticated(authData?.isAuthenticated || false);
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  return (
    <>
      <nav className="bg-black text-white py-4 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">شغل فنادق</div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <div
              className="relative cursor-pointer mr-4"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
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
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 hover:scale-105 transition duration-300 ease-in-out"
                >
                  <span className="text-white">تسجيل الدخول</span>
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 hover:scale-105 transition duration-300 ease-in-out"
                >
                  <span className="text-white">إنشاء حساب</span>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 hover:scale-105 transition duration-300 ease-in-out"
              >
                تسجيل الخروج
              </button>
            )}
            <Link
              to="/contactus"
              className="text-white hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
            >
              <span className="text-white">تواصل معنا</span>
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
            >
              <span className="text-white">المتجر</span>
            </Link>
            <Link
              to="/aboutus"
              className="text-white hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
            >
              <span className="text-white">من نحن</span>
            </Link>
            <Link
              to="/"
              className="text-white hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
            >
              <span className="text-white">الرئيسية</span>
            </Link>
            {/* Shopping Cart Icon - Desktop */}
            {isAuthenticated && (
              <Link
                to="/my-orders"
                className="text-white hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                طلباتي
              </Link>
            )}
            <div
              className="relative cursor-pointer flex items-center"
              onClick={() => setIsCartOpen(!isCartOpen)}
              >
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
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="text-white bg-blue-600 px-4 py-2 rounded-md w-full text-center hover:bg-blue-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/register"
                    className="text-white bg-green-600 px-4 py-2 rounded-md w-full text-center hover:bg-green-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    إنشاء حساب
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white bg-red-600 px-4 py-2 rounded-md w-full text-center hover:bg-red-700"
                >
                  تسجيل الخروج
                </button>
              )}
              <Link
                to="/"
                className="!text-white no-underline block w-full text-center py-2 bg-transparent hover:text-white visited:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/aboutus"
                className="!text-white no-underline block w-full text-center py-2 bg-transparent hover:text-white visited:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                من نحن
              </Link>
              <Link
                to="/products"
                className="!text-white no-underline block w-full text-center py-2 bg-transparent hover:text-white visited:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                المتجر
              </Link>
              <Link
                to="/contactus"
                className="!text-white no-underline block w-full text-center py-2 bg-transparent hover:text-white visited:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                تواصل معنا
              </Link>
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
