import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Aboutus from "./Pages/aboutus";
import Contactus from "./Pages/contactus";
import Register from "./Pages/register";
import Login from "./Pages/login";
import Products from "./Pages/products";
import ProductDetails from "./Pages/productDetails";
import HomePage from "./Pages/homePage";
import Navbar from "./components/navbar";
function App() {

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
