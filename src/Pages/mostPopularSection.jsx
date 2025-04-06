import React from 'react';
import image1 from "../assets/Image3.jpeg";
import image2 from "../assets/Image11.jpeg";
import image3 from "../assets/Image16.jpeg";
const MostPopularSection = () => {
    // Product data with local image paths
    const products = [
        {
            id: 1,
            name: 'Ceramic Cup',
            category: 'Ceramic',
            image: image1,
            regularPrice: 237.00,
            salePrice: 189.00,
            rating: 0,
        },
        {
            id: 2,
            name: 'Ceramic Planter',
            category: 'Ceramic',
            image: image2,
            regularPrice: 349.00,
            salePrice: 299.00,
            rating: 0,
        },
        {
            id: 3,
            name: 'Ceramic Plates',
            category: 'Ceramic',
            image: image3,
            regularPrice: 179.00,
            salePrice: 119.00,
            rating: 0,
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

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-8">
                <p className="uppercase text-sm tracking-widest text-gray-600 mb-2">MOST POPULAR</p>
                <h2 className="text-4xl font-medium text-teal-800 mb-6">
                    Discover the Latest Additions at Your Top<br />
                    Choice Flower Shop
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="group">
                        <div className="relative overflow-hidden mb-4">
                            <span className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-xs text-gray-700 z-10">
                                Sale!
                            </span>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover transition duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-gray-500 text-sm">{product.category}</p>
                            <h3 className="text-teal-800 font-medium text-lg mb-1">
                                <a href="#" className="hover:text-teal-600">{product.name}</a>
                            </h3>
                            <StarRating rating={product.rating} />
                            <div className="mt-2">
                                <span className="text-gray-400 line-through mr-2">${product.regularPrice.toFixed(2)}</span>
                                <span className="text-teal-800 font-medium">${product.salePrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostPopularSection;