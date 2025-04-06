import React from 'react';
import image3 from "../images/1.jpg";

const StaticHeroSection = () => {
    return (
        <div
            className="relative h-96 md:h-screen max-h-[600px] w-full overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('${image3}')`,
                backgroundAttachment: 'fixed'
            }}
        >
            {/* White box overlaid on the image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-8 md:p-12 max-w-xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-medium text-teal-800 mb-4 leading-tight">
                        Begin Your Ceramic Journey Explore Our Stunning Collections
                    </h2>
                    <p className="text-teal-600 mb-6">
                        Starting from just $149.00
                    </p>
                    <button className="border border-teal-800 text-white px-8 py-3 uppercase text-sm tracking-wider hover:bg-teal-800 transition-colors duration-300">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaticHeroSection;