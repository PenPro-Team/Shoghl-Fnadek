// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Aboutus from "./Pages/aboutus"
import Contactus from "./Pages/contactus"
import Register from "./Pages/register";
import Login from "./Pages/login";
function App() {
  // const [count, setCount] = useState(0);

  return (
      <Router>
        <Routes>
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/contactus" element={<Contactus />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  )
}

export default App;
