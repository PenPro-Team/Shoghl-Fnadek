import React from "react";
import Navbar from "../components/navbar"
import CeramicImage1 from "../assets/Image1.jpeg";
import CeramicImage2 from "../assets/Image2.jpeg";
const Hero = () => {
    return (
        <div className="bg-green-800 text-white py-16 px-8">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div className="text-center lg:text-left flex flex-col justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        مرحباً بكم في متجر شغل فنادق
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        ارتقِ بمساحتك مع أناقة السيراميك. الأسعار تبدأ من 149 جنيهًا.
                    </p>
                    <button className="w-50 bg-transparent border border-white text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out hover:bg-white">
                        تسوق الآن
                    </button>
                </div>

                {/* Image Content */}
                <div className="relative flex items-center justify-center">
                    <img
                        src={CeramicImage1}
                        alt="Ceramic Showcase 1"
                        className="rounded-lg shadow-lg max-w-full max-h-96"
                    />
                    <img
                        src={CeramicImage2}
                        alt="Ceramic Showcase 2"
                        className="rounded-lg shadow-md max-w-[70%] max-h-[70%] absolute top-[35px] left-[30px]"
                    />
                </div>
            </div>
        </div>
    );
};


export default Hero;
