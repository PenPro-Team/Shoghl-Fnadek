import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Hero from './hero';
import AboutSection from './aboutSection';
import ProductCategorySection from './ProductsCategory';
import MostPopularSection from './mostPopularSection';
import StaticHeroSection from './staticSection';
import TrendingSection from './trendingSection';
import TestimonialSection from './testmunialSection';
import BeforeFooter from './beforFooter';
import Footer from './Footer';

const HomePage = () => {
    return (
        <>
            {/* <Navbar /> */}
            <Hero />
            <AboutSection />
            <ProductCategorySection />
            <MostPopularSection />
            <StaticHeroSection />
            <TrendingSection />
            <TestimonialSection />
            <BeforeFooter />
            <Footer />
        </>
    )
};


export default HomePage;