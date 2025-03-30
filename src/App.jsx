// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Aboutus from "./Pages/aboutus"
import Contactus from "./Pages/contactus"
import Navbar from "./components/navbar";
import Hero from "./Pages/hero";
import AboutSection from "./Pages/aboutSection";
import ProductCategorySection from "./Pages/ProductsCategory";
function App() {
  // const [count, setCount] = useState(0);

  return (

    <div>
      <Router>
        <Routes>
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
        </Routes>
      </Router>
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      <AboutSection />

      <ProductCategorySection />
    </div>
  )
}

export default App;
