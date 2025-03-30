import React from "react";
import image1 from "../assets/IMG_20250226_140833.jpg";
import image2 from "../assets/IMG_20250226_141719.jpg";

const ProductCategorySection = () => {
  return (
    <div className="bg-gray-50" style={{ backgroundColor: "#f9f7f4" }}>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="uppercase text-sm tracking-widest text-gray-600 mb-2">THE BEST OF CERAMICS</p>
          <h2 className="text-4xl font-medium text-gray-800 mb-6">Our Products Category</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Explore our exquisite collection of ceramic treasures that elevate your
            spaces and celebrate the artistry of craftsmanship. From dinnerware to
            decor, each piece in our product range is a testament to quality, style, and
            the timeless beauty of ceramics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Ceramic Home Decor */}
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <img
              src={image1}
              alt="Stylish Ceramic Home Decor"
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-xl font-medium text-gray-800">Stylish Ceramic Home Decor</h3>
              <p className="text-gray-600 text-sm mt-1">Starting from just $99.00</p>
            </div>
          </div>

          {/* Right Column - Two stacked items */}
          <div className="space-y-8">
            {/* Top Item - Trending Ceramic Dinnerware */}
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img
                src={image1}
                alt="Trending Ceramic Dinnerware"
                className="w-full h-44 object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white p-5 rounded-md shadow-sm">
                <h3 className="text-xl font-medium text-gray-800">Trending Ceramic Dinnerware</h3>
                <p className="text-gray-600 text-sm mt-1">starting from just $299.00</p>
              </div>
            </div>

            {/* Bottom Item - Garden and Outdoor Accents */}
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img
                src={image2}
                alt="Garden and Outdoor Accents"
                className="w-full h-44 object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white p-5 rounded-md shadow-sm">
                <h3 className="text-xl font-medium text-gray-800">Garden and Outdoor Accents</h3>
                <p className="text-gray-600 text-sm mt-1">Starting from just $79.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <div className="flex justify-end mt-6">
          <button className="bg-teal-700 text-white p-2 rounded-full shadow-md hover:bg-teal-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategorySection;
