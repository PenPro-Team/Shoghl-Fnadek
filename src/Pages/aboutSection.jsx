import React from "react";
import Image1 from "../assets/IMG_20250226_140833.jpg";
import Image2 from "../assets/IMG_20250226_141719.jpg";

const AboutSection = () => {
    return (
        <div className="bg-white py-16 px-8">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Image */}
                <div>
                    <img
                        src={Image1}
                        alt="Hands holding a ceramic cup"
                        className="rounded-lg shadow-lg"
                    />
                </div>

                {/* Right Content */}
                <div className="flex flex-col">
                    {/* Top Image */}
                    <div>
                        <img
                            src={Image2}
                            alt="Ceramic cups and bowls"
                            className="rounded-lg shadow-lg mb-6"
                        />
                    </div>
                    {/* Text Content */}
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                            The versatility of ceramics is what makes them truly remarkable.
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Welcome to Ceramic Shop, where passion meets craftsmanship to
                            bring you a world of timeless beauty and creativity. Our journey
                            is steeped in the art of ceramics, where each piece tells a unique
                            story. Get to know the heart and soul behind our store.
                        </p>
                        <button className="bg-green-800 text-white py-2 px-6 rounded hover:bg-green-700 transition duration-300">
                            READ MORE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
