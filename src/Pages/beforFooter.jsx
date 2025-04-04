import React from 'react';
import image1 from "../assets/IMG_20250226_140833.jpg";
const BeforeFooter = () => {
    return (
        <section className="w-full flex flex-col md:flex-row">
            {/* Left side */}
            <div className="w-full md:w-1/2 bg-amber-50">
                <img
                    src={image1}
                    alt="Collection of ceramic plates, dishes and wooden bowl"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/600x400?text=Ceramic+Collection";
                    }}
                />
            </div>

            {/* Right side */}
            <div className="w-full md:w-1/2 bg-green-800 text-white flex flex-col justify-center p-8 md:p-16">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                    Uncover the World of Ceramic Artistry Start Your Journey Here!
                </h1>
                <div>
                    <button className="border-2 border-white text-white px-6 py-2 uppercase font-medium tracking-wider hover:bg-white hover:text-green-800 transition-colors duration-300">
                        SHOP NOW
                    </button>
                </div>
            </div>

            {/* Optional scroll arrow at bottom right */}
            <div className="absolute bottom-4 right-4 text-white">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
};


export default BeforeFooter;