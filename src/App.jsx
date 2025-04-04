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
import { CartProvider } from "./context/CartContext";
import Checkout from "./Pages/checkout";
import PaymentConfirmation from "./Pages/paymentConfirmation";
import MyOrders from "./Pages/MyOrders";

function App() {
  return (
    <CartProvider>
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
