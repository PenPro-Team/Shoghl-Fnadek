import React from 'react';
import image1 from "../assets/Image15.jpeg";
import image2 from "../assets/Image9.jpeg";
import image3 from "../assets/Image12.jpeg";
const TrendingSection = () => {
    const products = [
        {
            id: 1,
            name: 'Ceramic Bottles',
            category: 'Ceramic',
            image: image1,
            regularPrice: null,
            salePrice: 249.00,
            rating: 0,
            onSale: false,
        },
        {
            id: 2,
            name: 'Ceramic Cup',
            category: 'Ceramic',
            image: image2,
            regularPrice: 237.00,
            salePrice: 189.00,
            rating: 0,
            onSale: true,
        },
        {
            id: 3,
            name: 'Ceramic Drink Coasters',
            category: 'Ceramic',
            image: image3,
            regularPrice: 157.00,
            salePrice: 99.00,
            rating: 0,
            onSale: true,
        },
    ];

    // Star rating component
    const StarRating = ({ rating }) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className="w-4 h-4 text-gray-300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.1-6.3-4.5-6.3 4.5 2.3-7.1-6-4.4h7.6L12 2z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ))}
            </div>
        );
    };

    // Cart icon component
    const CartIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-teal-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
        </svg>
    );

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mb-10">
                <p className="uppercase text-sm tracking-widest text-teal-600 mb-2">TRENDING NOW</p>
                <h2 className="text-4xl font-medium text-teal-800">Minimalist Ceramic Designs</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="group">
                        <div className="relative overflow-hidden mb-4">
                            {product.onSale && (
                                <span className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-xs text-gray-700 z-10">
                                    Sale!
                                </span>
                            )}
                            {/* Cart icon that appears on hover */}
                            <span className="absolute top-2 right-2 bg-white p-2 rounded-full z-10 hover:bg-teal-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <CartIcon />
                            </span>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover transition duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">{product.category}</p>
                            <h3 className="text-teal-800 font-medium text-lg mb-1">
                                <a href="#" className="hover:text-teal-600">{product.name}</a>
                            </h3>
                            <StarRating rating={product.rating} />
                            <div className="mt-2">
                                {product.regularPrice && (
                                    <span className="text-gray-400 line-through mr-2">${product.regularPrice.toFixed(2)}</span>
                                )}
                                <span className="text-teal-800 font-medium">${product.salePrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingSection;