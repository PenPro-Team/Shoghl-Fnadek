{/* <Navbar />

      {/* Hero Section */}
// <Hero />

// <AboutSection />

// <ProductCategorySection /> */}

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Hero from './hero';
import AboutSection from './aboutSection';
import ProductCategorySection from './ProductsCategory';

const HomePage = () => {
    return (
        <>
            {/* <Navbar /> */}
            <Hero />
            <AboutSection />
            <ProductCategorySection />
        </>
    )
};


export default HomePage;